"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Callout } from "@/components/editorial/Callout";
import { AllocationBreakdownLegend } from "@/components/tools/AllocationBreakdownLegend";
import {
  type JapanCityType,
  type JapanCommute,
  type JapanEatingStyle,
  type JapanHousehold,
  type JapanHousing,
  type JapanMonthlyCostBreakdown,
  type JapanMonthlyCostForm,
  type JapanResidentLifestyle,
  JAPAN_MONTHLY_COST_DEFAULTS,
  buildJapanMonthlyCostSummaryText,
  computeJapanMonthlyCost,
  formatYenJpy,
  japanMonthlyCostFormsEqual,
  normalizeJapanMonthlyCostQueryString,
  parseJapanMonthlyCostSearchParams,
  serializeJapanMonthlyCostQuery,
} from "@/lib/japan-monthly-cost-calculator";
import { siteUrl } from "@/lib/site";
import {
  toolCheckboxAddonLayout,
  toolCheckboxLabelClass,
  toolSegmentClass,
  toolSegmentLayout,
} from "@/lib/tool-choice-classes";

const controlLabel =
  "mb-2 block font-sans text-xs font-bold uppercase tracking-widest text-rust";

const segmentWrap = "flex flex-wrap gap-2";

const shareBtnBase =
  "inline-flex min-h-[2.5rem] flex-1 items-center justify-center rounded-md border border-paper-edge bg-paper-elevated/90 px-3 py-2 font-sans text-xs font-bold uppercase tracking-widest text-dark transition-colors duration-150 hover:border-rust/45 hover:bg-paper sm:text-[0.7rem]";

const checkboxLabel = `${toolCheckboxLabelClass} ${toolCheckboxAddonLayout}`;

const CITY_OPTIONS: { value: JapanCityType; label: string }[] = [
  { value: "tokyo-central", label: "Tokyo central" },
  { value: "tokyo-suburbs", label: "Tokyo suburbs" },
  { value: "osaka-kyoto", label: "Osaka / Kyoto" },
  { value: "regional", label: "Regional city" },
  { value: "rural", label: "Rural Japan" },
];

const HOUSEHOLD_OPTIONS: { value: JapanHousehold; label: string }[] = [
  { value: "single", label: "Single" },
  { value: "couple", label: "Couple" },
  { value: "family-child", label: "Family with child" },
];

const HOUSING_OPTIONS: { value: JapanHousing; label: string }[] = [
  { value: "share-house", label: "Share house" },
  { value: "1k-studio", label: "1K / studio" },
  { value: "1ldk", label: "1LDK" },
  { value: "2ldk-plus", label: "2LDK+" },
];

const LIFESTYLE_OPTIONS: { value: JapanResidentLifestyle; label: string }[] = [
  { value: "frugal", label: "Frugal" },
  { value: "normal", label: "Normal" },
  { value: "comfortable", label: "Comfortable" },
];

const COMMUTE_OPTIONS: { value: JapanCommute; label: string }[] = [
  { value: "walk-bike", label: "Walk / bike" },
  { value: "local-train", label: "Local train" },
  { value: "long-commute", label: "Long commute" },
  { value: "car", label: "Car" },
];

const EATING_OPTIONS: { value: JapanEatingStyle; label: string }[] = [
  { value: "mostly-cook", label: "Mostly cook" },
  { value: "mixed", label: "Mixed" },
  { value: "eat-out-often", label: "Eat out often" },
];

function Segmented<T extends string>({
  value,
  onChange,
  options,
  name,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
  name: string;
}) {
  return (
    <div className={segmentWrap} role="group" aria-label={name}>
      {options.map((opt) => {
        const on = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            className={toolSegmentClass(on, toolSegmentLayout)}
            onClick={() => onChange(opt.value)}
            aria-pressed={on}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function optionLabel<V extends string>(
  options: { value: V; label: string }[],
  value: V,
): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

function LineItem({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="border-b border-paper-edge py-3 last:border-b-0">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-sans text-sm font-semibold uppercase tracking-wide text-muted">
          {label}
        </span>
        <span className="font-sans text-lg font-bold tabular-nums text-dark sm:text-xl">
          {value}
        </span>
      </div>
      {hint ? (
        <p className="mt-1 font-serif text-sm leading-snug text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

type AllocationRow = {
  key: string;
  label: string;
  yen: number;
  pct: number;
  barClass: string;
  swatchClass: string;
};

function allocationRows(b: JapanMonthlyCostBreakdown): AllocationRow[] {
  const total = b.totalMonthlyYen > 0 ? b.totalMonthlyYen : 1;
  const comms = b.phoneYen + b.internetYen;
  const extras =
    b.insurancePensionYen + b.schoolChildcareYen + b.lifestyleBufferYen;
  return [
    {
      key: "rent",
      label: "Rent",
      yen: b.rentYen,
      pct: (b.rentYen / total) * 100,
      barClass: "bg-maroon/78",
      swatchClass: "bg-maroon",
    },
    {
      key: "food",
      label: "Food",
      yen: b.foodYen,
      pct: (b.foodYen / total) * 100,
      barClass: "bg-rust/70",
      swatchClass: "bg-rust",
    },
    {
      key: "utilities",
      label: "Utilities",
      yen: b.utilitiesYen,
      pct: (b.utilitiesYen / total) * 100,
      barClass: "bg-tan/88",
      swatchClass: "bg-tan",
    },
    {
      key: "transport",
      label: "Transport",
      yen: b.transportYen,
      pct: (b.transportYen / total) * 100,
      barClass: "bg-dark/28",
      swatchClass: "bg-dark/55",
    },
    {
      key: "comms",
      label: "Phone and internet",
      yen: comms,
      pct: (comms / total) * 100,
      barClass: "bg-maroon/42",
      swatchClass: "bg-maroon/60",
    },
    {
      key: "extras",
      label: "Insurance, childcare buffer, lifestyle",
      yen: extras,
      pct: (extras / total) * 100,
      barClass: "bg-dark/18",
      swatchClass: "bg-dark/45",
    },
  ];
}

function MonthlyBreakdownResults({
  breakdown,
}: {
  breakdown: JapanMonthlyCostBreakdown;
}) {
  const rows = useMemo(() => allocationRows(breakdown), [breakdown]);
  const largest = useMemo(
    () => rows.reduce((a, r) => (r.yen > a.yen ? r : a), rows[0]!),
    [rows],
  );

  return (
    <div className="border-t border-paper-edge px-5 py-5 sm:px-6">
      <h3 className="font-display text-lg font-bold italic text-dark sm:text-xl">
        Where the yen goes each month
      </h3>
      <p className="article-body-sm mt-1 text-muted">
        Share of your modeled running total. Phone and internet sit in one slice
        when both are on. The last slice bundles insurance (if toggled),
        school or childcare buffer (if toggled), and the lifestyle buffer.
      </p>

      <div
        className="mt-4 hidden h-10 w-full overflow-hidden rounded-md border border-paper-edge bg-paper/50 shadow-inner lg:flex"
        role="img"
        aria-label="Monthly cost allocation bar chart"
      >
        {rows.map((row, i) => (
          <div
            key={row.key}
            style={{ width: `${row.pct}%` }}
            title={`${row.label}: ${formatYenJpy(row.yen)} (${row.pct.toFixed(1)}%)`}
            className={`${row.barClass} min-w-[3px] transition-[width] duration-500 ease-out ${
              i === 0 ? "rounded-l-sm" : ""
            } ${i === rows.length - 1 ? "rounded-r-sm" : ""}`}
          />
        ))}
      </div>

      <AllocationBreakdownLegend rows={rows} formatYen={formatYenJpy} />

      <div className="mt-5 rounded-md border border-maroon/25 bg-maroon/[0.06] px-4 py-3.5">
        <p className="font-sans text-xs font-bold uppercase tracking-widest text-maroon">
          Largest slice this pass
        </p>
        <p className="mt-1 font-display text-xl font-bold text-dark">
          {largest.label}
        </p>
        <p className="mt-1 font-serif text-sm leading-snug text-muted">
          Roughly {largest.pct.toFixed(1)}% of this modeled month, about{" "}
          {formatYenJpy(largest.yen)}. Housing and commute choices usually move
          this bar the fastest.
        </p>
      </div>
    </div>
  );
}

function JapanMonthlyCostCalculatorClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [form, setForm] = useState<JapanMonthlyCostForm>(() => ({
    ...JAPAN_MONTHLY_COST_DEFAULTS,
  }));

  const breakdown = useMemo(() => computeJapanMonthlyCost(form), [form]);

  const serializedQuery = useMemo(
    () => serializeJapanMonthlyCostQuery(form),
    [form],
  );

  useLayoutEffect(() => {
    const next = parseJapanMonthlyCostSearchParams(searchParams);
    setForm((prev) => (japanMonthlyCostFormsEqual(prev, next) ? prev : next));
  }, [searchParams]);

  useEffect(() => {
    const urlNorm = normalizeJapanMonthlyCostQueryString(
      searchParams.toString(),
    );
    if (serializedQuery === urlNorm) return;
    router.replace(
      serializedQuery ? `${pathname}?${serializedQuery}` : pathname,
      { scroll: false },
    );
  }, [serializedQuery, searchParams, pathname, router]);

  const summaryLabels = useMemo(
    () => ({
      city: optionLabel(CITY_OPTIONS, form.cityType),
      household: optionLabel(HOUSEHOLD_OPTIONS, form.household),
      housing: optionLabel(HOUSING_OPTIONS, form.housing),
      lifestyle: optionLabel(LIFESTYLE_OPTIONS, form.lifestyle),
      commute: optionLabel(COMMUTE_OPTIONS, form.commute),
      eating: optionLabel(EATING_OPTIONS, form.eatingStyle),
    }),
    [form],
  );

  const summaryText = useMemo(
    () => buildJapanMonthlyCostSummaryText(form, breakdown, summaryLabels),
    [form, breakdown, summaryLabels],
  );

  const shareUrl = useMemo(() => {
    const origin =
      typeof window !== "undefined" ? window.location.origin : siteUrl();
    const base = `${origin}${pathname}`;
    return serializedQuery ? `${base}?${serializedQuery}` : base;
  }, [pathname, serializedQuery]);

  const [copied, setCopied] = useState<"summary" | "link" | null>(null);
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCopiedSoon = useCallback(() => {
    if (copiedTimer.current) clearTimeout(copiedTimer.current);
    copiedTimer.current = setTimeout(() => {
      setCopied(null);
      copiedTimer.current = null;
    }, 2200);
  }, []);

  const copyText = useCallback(
    async (text: string, kind: "summary" | "link") => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(kind);
        clearCopiedSoon();
      } catch {
        setCopied(null);
      }
    },
    [clearCopiedSoon],
  );

  useEffect(() => {
    return () => {
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
    };
  }, []);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col-reverse gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_min(100%,22rem)] lg:items-start lg:gap-10 xl:gap-10">
        <div className="min-w-0 space-y-8">
          <section
            className="rounded-lg border border-paper-edge bg-paper-card/80 p-5 shadow-editorial sm:p-7"
            aria-labelledby="monthly-inputs-heading"
          >
            <h2
              id="monthly-inputs-heading"
              className="editorial-heading mb-6 text-2xl sm:text-3xl"
            >
              Your household
            </h2>

            <div className="space-y-8">
              <fieldset className="min-w-0">
                <legend className={controlLabel}>City type</legend>
                <Segmented
                  name="City type"
                  value={form.cityType}
                  onChange={(cityType) => setForm((f) => ({ ...f, cityType }))}
                  options={CITY_OPTIONS}
                />
              </fieldset>

              <fieldset className="min-w-0">
                <legend className={controlLabel}>Household</legend>
                <Segmented
                  name="Household"
                  value={form.household}
                  onChange={(household) => setForm((f) => ({ ...f, household }))}
                  options={HOUSEHOLD_OPTIONS}
                />
              </fieldset>

              <fieldset className="min-w-0">
                <legend className={controlLabel}>Housing</legend>
                <Segmented
                  name="Housing"
                  value={form.housing}
                  onChange={(housing) => setForm((f) => ({ ...f, housing }))}
                  options={HOUSING_OPTIONS}
                />
              </fieldset>

              <fieldset className="min-w-0">
                <legend className={controlLabel}>Lifestyle</legend>
                <Segmented
                  name="Lifestyle"
                  value={form.lifestyle}
                  onChange={(lifestyle) => setForm((f) => ({ ...f, lifestyle }))}
                  options={LIFESTYLE_OPTIONS}
                />
              </fieldset>

              <fieldset className="min-w-0">
                <legend className={controlLabel}>Commute</legend>
                <Segmented
                  name="Commute"
                  value={form.commute}
                  onChange={(commute) => setForm((f) => ({ ...f, commute }))}
                  options={COMMUTE_OPTIONS}
                />
              </fieldset>

              <fieldset className="min-w-0">
                <legend className={controlLabel}>Eating style</legend>
                <Segmented
                  name="Eating style"
                  value={form.eatingStyle}
                  onChange={(eatingStyle) =>
                    setForm((f) => ({ ...f, eatingStyle }))
                  }
                  options={EATING_OPTIONS}
                />
              </fieldset>

              <fieldset className="min-w-0">
                <legend className={controlLabel}>Add-ons</legend>
                <p className="article-body-sm mb-4 text-muted">
                  Toggle what you want folded into the monthly total. Insurance
                  uses a rough planning band, not your real ward notice.
                </p>
                <div className="flex flex-col gap-3">
                  <label className={checkboxLabel}>
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 shrink-0 accent-tool-ink"
                      checked={form.addonMobile}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, addonMobile: e.target.checked }))
                      }
                    />
                    <span>Mobile phone plan</span>
                  </label>
                  <label className={checkboxLabel}>
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 shrink-0 accent-tool-ink"
                      checked={form.addonInternet}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          addonInternet: e.target.checked,
                        }))
                      }
                    />
                    <span>Home internet</span>
                  </label>
                  <label className={checkboxLabel}>
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 shrink-0 accent-tool-ink"
                      checked={form.addonInsurance}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          addonInsurance: e.target.checked,
                        }))
                      }
                    />
                    <span>Health insurance / pension reminder (yen estimate)</span>
                  </label>
                  <label className={checkboxLabel}>
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 shrink-0 accent-tool-ink"
                      checked={form.addonSchool}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, addonSchool: e.target.checked }))
                      }
                    />
                    <span>School / childcare buffer</span>
                  </label>
                  <label className={checkboxLabel}>
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 shrink-0 accent-tool-ink"
                      checked={form.addonCarParking}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          addonCarParking: e.target.checked,
                        }))
                      }
                    />
                    <span>Car parking / maintenance add-on</span>
                  </label>
                </div>
              </fieldset>
            </div>
          </section>

          <section className="max-w-2xl space-y-4" aria-labelledby="reality-heading">
            <h2
              id="reality-heading"
              className="editorial-heading text-2xl sm:text-3xl"
            >
              Reality check
            </h2>
            <div className="article-body space-y-4 text-lg leading-relaxed">
              <p>
                This model uses rounded 2026 style bands for rent pressure, food
                habits, and commute class. Your contract rent, summer cooling
                bills, and actual train pass tier will land above or below these
                lines.
              </p>
              <p>
                Use the output to sanity check a spreadsheet, not to argue with a
                landlord. If you are on employee social insurance, tax, and
                pension often move as a stack tied to salary, not to this
                toggle alone.
              </p>
            </div>
          </section>

          <section
            className="max-w-2xl space-y-4"
            aria-labelledby="shocks-heading"
          >
            <h2
              id="shocks-heading"
              className="editorial-heading text-2xl sm:text-3xl"
            >
              Common cost shocks for foreigners in Japan
            </h2>
            <ul className="article-body list-none space-y-3.5 pl-0 text-lg leading-relaxed">
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Move-in cash stacks beyond first month rent: deposit, key money,
                guarantor company fees, and agent commission on a fresh lease.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                August electric bills after weeks of AC, especially in older
                builds with weak insulation.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                National health insurance notices that arrive as a lump sum
                mental shock the first year you are self billed.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Car ownership: shaken, weight tax, insurance tiers, and a
                monthly stall when you do not get parking included.
              </li>
            </ul>
          </section>

          <Callout variant="warning" title="What this calculator does not include">
            <p>
              Income tax, resident tax timing, furniture moves, flights home,
              hobbies, pets, English school premiums, and one-off visa or
              relocation fees. It also does not know your employer subsidy for
              rent or commuter passes.
            </p>
          </Callout>
        </div>

        <aside className="min-w-0 space-y-6 lg:sticky lg:top-6">
          <section
            className="overflow-hidden rounded-lg border border-paper-edge bg-paper-card/80 shadow-editorial"
            aria-labelledby="monthly-results-heading"
          >
            <div className="border-b border-paper-edge px-5 py-5 sm:px-6">
              <h2
                id="monthly-results-heading"
                className="font-display text-xl font-bold italic text-dark sm:text-2xl"
              >
                Estimated monthly total
              </h2>
              <p className="article-body-sm mt-2 text-muted">
                Running costs only. Move-in and emergency targets are separate
                lines below.
              </p>
              <p className="mt-4 font-display text-3xl font-bold tabular-nums text-maroon sm:text-4xl">
                {formatYenJpy(breakdown.totalMonthlyYen)}
              </p>
            </div>

            <div className="border-b border-paper-edge px-5 py-4 sm:px-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                <button
                  type="button"
                  className={shareBtnBase}
                  onClick={() => void copyText(summaryText, "summary")}
                >
                  Copy summary
                </button>
                <button
                  type="button"
                  className={shareBtnBase}
                  onClick={() => void copyText(shareUrl, "link")}
                >
                  Copy share link
                </button>
              </div>
              <p
                className="mt-2 min-h-[1.25rem] font-sans text-xs font-semibold text-maroon transition-opacity duration-200"
                aria-live="polite"
              >
                {copied === "summary" ? "Copied summary." : null}
                {copied === "link" ? "Copied link." : null}
              </p>
            </div>

            <div className="px-5 py-4 sm:px-6">
              <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-rust">
                Line items
              </h3>
              <div className="mt-2">
                <LineItem label="Rent" value={formatYenJpy(breakdown.rentYen)} />
                <LineItem label="Food" value={formatYenJpy(breakdown.foodYen)} />
                <LineItem
                  label="Utilities"
                  value={formatYenJpy(breakdown.utilitiesYen)}
                />
                <LineItem
                  label="Transport"
                  value={formatYenJpy(breakdown.transportYen)}
                  hint={
                    breakdown.transportParkingExtraYen > 0
                      ? `Includes about ${formatYenJpy(breakdown.transportParkingExtraYen)} from the parking and maintenance add-on.`
                      : undefined
                  }
                />
                <LineItem
                  label="Mobile phone"
                  value={formatYenJpy(breakdown.phoneYen)}
                />
                <LineItem
                  label="Home internet"
                  value={formatYenJpy(breakdown.internetYen)}
                />
                <LineItem
                  label="Health insurance / pension (if modeled)"
                  value={formatYenJpy(breakdown.insurancePensionYen)}
                  hint={breakdown.insuranceReminderNote}
                />
                <LineItem
                  label="School / childcare buffer"
                  value={formatYenJpy(breakdown.schoolChildcareYen)}
                />
                <LineItem
                  label="Lifestyle buffer"
                  value={formatYenJpy(breakdown.lifestyleBufferYen)}
                />
                <LineItem
                  label="Move-in cost warning (one-time band)"
                  value={formatYenJpy(breakdown.moveInWarningYen)}
                  hint="Rough cash shape for deposit, key money, guarantor stack, and first bills. Not part of the monthly total."
                />
                <LineItem
                  label="Suggested emergency savings target"
                  value={formatYenJpy(breakdown.emergencySavingsTargetYen)}
                  hint="About a few months of this modeled running total as a cash cushion goal, not a bank product."
                />
              </div>
            </div>

            <MonthlyBreakdownResults breakdown={breakdown} />
          </section>

          <div className="rounded-lg border border-paper-edge bg-paper-elevated/80 p-5 shadow-inner sm:p-6">
            <h3 className="font-display text-lg font-bold text-dark">
              Quick links
            </h3>
            <ul className="mt-4 flex flex-col gap-2 font-sans text-sm font-semibold">
              <li>
                <Link
                  href="/tools"
                  className="text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
                >
                  All tools →
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/start-here-japan"
                  className="text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
                >
                  Start here: Japan trip checklist →
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

function CalculatorFallback() {
  return (
    <div
      className="rounded-lg border border-paper-edge bg-paper-card/80 p-8 text-center shadow-editorial"
      aria-busy="true"
    >
      <p className="font-serif text-muted">Loading calculator…</p>
    </div>
  );
}

export function JapanMonthlyCostCalculator() {
  return (
    <Suspense fallback={<CalculatorFallback />}>
      <JapanMonthlyCostCalculatorClient />
    </Suspense>
  );
}
