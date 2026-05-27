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
import {
  type BudgetStyle,
  type CityKey,
  type HotelType,
  type JapanTripBudgetBreakdown,
  type ShoppingLevel,
  type TransportStyle,
  computeJapanTripBudget,
  formatYenJpy,
} from "@/lib/japan-trip-budget-calculator";
import {
  type JapanTripBudgetCalculatorForm,
  JAPAN_TRIP_BUDGET_CALCULATOR_DEFAULTS,
  japanTripBudgetCalculatorFormsEqual,
  normalizeJapanTripBudgetCalculatorQueryString,
  parseJapanTripBudgetCalculatorSearchParams,
  serializeJapanTripBudgetCalculatorQuery,
} from "@/lib/japan-trip-budget-calculator-query";
import { AllocationBreakdownLegend } from "@/components/tools/AllocationBreakdownLegend";
import {
  toolCheckboxClass,
  toolCheckboxRowLayoutMd,
  toolScrollSegmentLayout,
  toolSegmentClass,
  toolSegmentLayout,
  toolSegmentScrollWrap,
} from "@/lib/tool-choice-classes";

const BUDGET_STYLE_OPTIONS: { value: BudgetStyle; label: string }[] = [
  { value: "budget", label: "Budget" },
  { value: "mid-range", label: "Mid-range" },
  { value: "comfortable", label: "Comfortable" },
  { value: "premium", label: "Premium" },
];

const CITY_OPTIONS: { value: CityKey; label: string }[] = [
  { value: "tokyo", label: "Tokyo" },
  { value: "osaka", label: "Osaka" },
  { value: "kyoto", label: "Kyoto" },
  { value: "rural", label: "Rural Japan" },
];

const TRANSPORT_OPTIONS: { value: TransportStyle; label: string }[] = [
  { value: "mostly-local", label: "Mostly local trains" },
  { value: "frequent-shinkansen", label: "Frequent Shinkansen" },
  { value: "taxi-heavy", label: "Taxi-heavy" },
];

const SHOPPING_OPTIONS: { value: ShoppingLevel; label: string }[] = [
  { value: "minimal", label: "Minimal" },
  { value: "moderate", label: "Moderate" },
  { value: "heavy", label: "Heavy" },
];

const HOTEL_OPTIONS: { value: HotelType; label: string }[] = [
  { value: "hostel", label: "Hostel" },
  { value: "business", label: "Business hotel" },
  { value: "mid-range", label: "Mid-range hotel" },
  { value: "luxury", label: "Luxury" },
];

const TRAVELER_COUNT_OPTIONS = [1, 2, 3, 4, 5, 6].map((n) => ({
  value: n,
  label: n === 1 ? "1 traveler" : `${n} travelers`,
}));

const controlLabel =
  "mb-2 block font-sans text-xs font-bold uppercase tracking-widest text-rust";
const segmentWrap = "flex flex-wrap gap-2";

const shareBtnBase =
  "inline-flex min-h-[2.5rem] flex-1 items-center justify-center rounded-md border border-paper-edge bg-paper-elevated/90 px-3 py-2 font-sans text-xs font-bold uppercase tracking-widest text-dark transition-colors duration-150 hover:border-rust/45 hover:bg-paper sm:text-[0.7rem]";

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

function allocationRows(b: JapanTripBudgetBreakdown): AllocationRow[] {
  const total = b.totalYen > 0 ? b.totalYen : 1;
  return [
    {
      key: "hotel",
      label: "Hotel",
      yen: b.hotelYen,
      pct: (b.hotelYen / total) * 100,
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
      key: "transport",
      label: "Transport",
      yen: b.transportYen,
      pct: (b.transportYen / total) * 100,
      barClass: "bg-tan/88",
      swatchClass: "bg-tan",
    },
    {
      key: "shopping",
      label: "Shopping",
      yen: b.shoppingYen,
      pct: (b.shoppingYen / total) * 100,
      barClass: "bg-dark/28",
      swatchClass: "bg-dark/55",
    },
    {
      key: "buffer",
      label: "Emergency buffer",
      yen: b.emergencyBufferYen,
      pct: (b.emergencyBufferYen / total) * 100,
      barClass: "bg-dark/18",
      swatchClass: "bg-dark/45",
    },
  ];
}

function BudgetBreakdownResults({
  breakdown,
}: {
  breakdown: JapanTripBudgetBreakdown;
}) {
  const rows = useMemo(() => allocationRows(breakdown), [breakdown]);
  const largest = useMemo(
    () => rows.reduce((a, r) => (r.yen > a.yen ? r : a), rows[0]!),
    [rows],
  );

  return (
    <div className="border-t border-paper-edge px-5 py-5 sm:px-6">
      <h3 className="font-display text-lg font-bold italic text-dark sm:text-xl">
        Where the yen goes
      </h3>
      <p className="article-body-sm mt-1 text-muted">
        Share of your estimated total, including the buffer. Bars resize as you
        change inputs.
      </p>

      <div
        className="mt-4 hidden h-10 w-full overflow-hidden rounded-md border border-paper-edge bg-paper/50 shadow-inner lg:flex"
        role="img"
        aria-label="Budget allocation bar chart"
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

      <div className="mt-5 space-y-4">
        <div className="rounded-md border border-maroon/25 bg-maroon/[0.06] px-4 py-3.5">
          <p className="font-sans text-xs font-bold uppercase tracking-widest text-maroon">
            Largest expense
          </p>
          <p className="mt-1 font-display text-xl font-bold text-dark">
            {largest.label}
          </p>
          <p className="mt-1 font-serif text-sm leading-snug text-muted">
            Roughly {largest.pct.toFixed(1)}% of this estimate, about{" "}
            {formatYenJpy(largest.yen)}. Tuning the related sliders above moves
            this slice the fastest.
          </p>
        </div>

        <aside className="border-l-2 border-rust/45 pl-3.5">
          <p className="font-sans text-xs font-bold uppercase tracking-widest text-rust">
            Typical tourist trap costs
          </p>
          <p className="article-body-sm mt-1.5 leading-relaxed text-muted">
            Airport souvenir corners, theme cafe set menus, and last minute
            mini-bar drinks rarely show up in a clean spreadsheet, but they
            love a tired wallet. Keep a little extra outside the big categories
            for those moments.
          </p>
        </aside>

        <div className="rounded-md border border-paper-edge bg-paper-elevated/80 px-4 py-3.5 shadow-editorial">
          <p className="font-sans text-xs font-bold uppercase tracking-widest text-rust">
            Ways travelers accidentally overspend
          </p>
          <ul className="article-body-sm mt-2 list-none space-y-2 pl-0 text-muted">
            <li className="before:mr-2 before:font-bold before:text-rust before:content-['›']">
              Defaulting to taxi when the last train still ran, three nights in
              a row.
            </li>
            <li className="before:mr-2 before:font-bold before:text-rust before:content-['›']">
              Booking the cute room far from the station, then paying delivery
              and late snacks every night.
            </li>
            <li className="before:mr-2 before:font-bold before:text-rust before:content-['›']">
              Saying yes to every limited collab drop without a daily cap in
              mind.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function optionLabel<V extends string>(
  options: { value: V; label: string }[],
  value: V,
): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

function cityNamesSorted(form: JapanTripBudgetCalculatorForm): string {
  const labels = form.cities.map((c) =>
    optionLabel(CITY_OPTIONS, c),
  );
  labels.sort((a, b) => a.localeCompare(b));
  return labels.join(", ");
}

function buildEstimateSummaryText(
  form: JapanTripBudgetCalculatorForm,
  breakdown: JapanTripBudgetBreakdown,
): string {
  const lines = [
    "Japan Trip Budget Calculator (estimate)",
    "",
    `Trip length: ${form.days} days`,
    `Travelers: ${form.travelers}`,
    `Cities: ${cityNamesSorted(form)}`,
    `Budget style: ${optionLabel(BUDGET_STYLE_OPTIONS, form.budgetStyle)}`,
    "",
    `Estimated total (with buffer): ${formatYenJpy(breakdown.totalYen)}`,
    `Daily average (group): ${formatYenJpy(breakdown.dailyAverageYen)}`,
    "",
    `Hotel: ${formatYenJpy(breakdown.hotelYen)}`,
    `Food: ${formatYenJpy(breakdown.foodYen)}`,
    `Transport: ${formatYenJpy(breakdown.transportYen)}`,
    `Shopping: ${formatYenJpy(breakdown.shoppingYen)}`,
    `Emergency buffer (12%): ${formatYenJpy(breakdown.emergencyBufferYen)}`,
    "",
    `Suggested cash to carry: ${formatYenJpy(breakdown.suggestedCashYen)}`,
  ];
  return lines.join("\n");
}

function ShareActions({
  form,
  breakdown,
}: {
  form: JapanTripBudgetCalculatorForm;
  breakdown: JapanTripBudgetBreakdown;
}) {
  const pathname = usePathname();
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

  const onCopySummary = useCallback(() => {
    void copyText(buildEstimateSummaryText(form, breakdown), "summary");
  }, [copyText, form, breakdown]);

  const onCopyLink = useCallback(() => {
    if (typeof window === "undefined") return;
    const qs = serializeJapanTripBudgetCalculatorQuery(form);
    const url = `${window.location.origin}${pathname}?${qs}`;
    void copyText(url, "link");
  }, [copyText, form, pathname]);

  useEffect(() => {
    return () => {
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
    };
  }, []);

  return (
    <div className="border-b border-paper-edge px-5 pb-4 pt-1 sm:px-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
        <button type="button" className={shareBtnBase} onClick={onCopySummary}>
          Copy estimate summary
        </button>
        <button type="button" className={shareBtnBase} onClick={onCopyLink}>
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
  );
}

function JapanTripBudgetCalculatorClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [form, setForm] = useState<JapanTripBudgetCalculatorForm>(() => ({
    ...JAPAN_TRIP_BUDGET_CALCULATOR_DEFAULTS,
  }));

  const toggleCity = useCallback((c: CityKey) => {
    setForm((prev) => {
      const has = prev.cities.includes(c);
      if (has && prev.cities.length === 1) return prev;
      const cities = has
        ? prev.cities.filter((x) => x !== c)
        : [...prev.cities, c];
      return { ...prev, cities };
    });
  }, []);

  const breakdown = useMemo(
    () =>
      computeJapanTripBudget({
        days: form.days,
        travelers: form.travelers,
        budgetStyle: form.budgetStyle,
        cities: form.cities,
        transportStyle: form.transportStyle,
        shoppingLevel: form.shoppingLevel,
        conbiniMealsPercent: form.conbiniMealsPercent,
        hotelType: form.hotelType,
      }),
    [form],
  );

  useLayoutEffect(() => {
    const next = parseJapanTripBudgetCalculatorSearchParams(searchParams);
    setForm((prev) =>
      japanTripBudgetCalculatorFormsEqual(prev, next) ? prev : next,
    );
  }, [searchParams]);

  const serializedQuery = useMemo(
    () => serializeJapanTripBudgetCalculatorQuery(form),
    [form],
  );

  useEffect(() => {
    const urlNorm = normalizeJapanTripBudgetCalculatorQueryString(
      searchParams.toString(),
    );
    if (serializedQuery === urlNorm) return;
    router.replace(`${pathname}?${serializedQuery}`, { scroll: false });
  }, [serializedQuery, searchParams, pathname, router]);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col-reverse gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_min(100%,22rem)] lg:items-start lg:gap-10 xl:gap-10">
        <div className="min-w-0 space-y-8">
          <section
            className="rounded-lg border border-paper-edge bg-paper-card/80 p-5 shadow-editorial sm:p-7"
            aria-labelledby="calc-inputs-heading"
          >
            <h2
              id="calc-inputs-heading"
              className="editorial-heading mb-6 text-2xl sm:text-3xl"
            >
              Your trip
            </h2>

            <div className="space-y-8">
              <div>
                <label className={controlLabel} htmlFor="trip-days">
                  Trip length: {form.days} days
                </label>
                <input
                  id="trip-days"
                  type="range"
                  min={3}
                  max={21}
                  step={1}
                  value={form.days}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      days: Number(e.target.value),
                    }))
                  }
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-paper-edge accent-maroon"
                />
                <p className="mt-1 font-serif text-sm text-muted">
                  Range 3 to 21 days. Extend mentally if you run a longer route.
                </p>
              </div>

              <fieldset className="min-w-0">
                <legend className={controlLabel}>Number of travelers</legend>
                <div
                  className={toolSegmentScrollWrap}
                  role="group"
                  aria-label="Number of travelers"
                >
                  {TRAVELER_COUNT_OPTIONS.map((opt) => {
                    const on = form.travelers === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        className={toolSegmentClass(on, toolScrollSegmentLayout)}
                        onClick={() =>
                          setForm((f) => ({ ...f, travelers: opt.value }))
                        }
                        aria-pressed={on}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-1 font-serif text-sm text-muted">
                  Hotel math assumes up to two adults per room when it helps
                  costs. Large groups may need extra rooms.
                </p>
              </fieldset>

              <fieldset className="min-w-0">
                <legend className={controlLabel}>Budget style</legend>
                <Segmented
                  name="Budget style"
                  value={form.budgetStyle}
                  onChange={(budgetStyle) => setForm((f) => ({ ...f, budgetStyle }))}
                  options={BUDGET_STYLE_OPTIONS}
                />
              </fieldset>

              <fieldset className="min-w-0">
                <legend className={controlLabel}>Cities you visit</legend>
                <div className="flex flex-wrap gap-3">
                  {CITY_OPTIONS.map(({ value, label }) => {
                    const on = form.cities.includes(value);
                    return (
                      <label
                        key={value}
                        className={toolCheckboxClass(on, toolCheckboxRowLayoutMd)}
                      >
                        <input
                          type="checkbox"
                          className="h-4 w-4 accent-tool-ink"
                          checked={on}
                          onChange={() => toggleCity(value)}
                        />
                        {label}
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset className="min-w-0">
                <legend className={controlLabel}>Transportation style</legend>
                <Segmented
                  name="Transportation"
                  value={form.transportStyle}
                  onChange={(transportStyle) =>
                    setForm((f) => ({ ...f, transportStyle }))
                  }
                  options={TRANSPORT_OPTIONS}
                />
              </fieldset>

              <fieldset className="min-w-0">
                <legend className={controlLabel}>Shopping level</legend>
                <Segmented
                  name="Shopping"
                  value={form.shoppingLevel}
                  onChange={(shoppingLevel) =>
                    setForm((f) => ({ ...f, shoppingLevel }))
                  }
                  options={SHOPPING_OPTIONS}
                />
              </fieldset>

              <div>
                <label className={controlLabel} htmlFor="conbini-slider">
                  Convenience store meals vs restaurant meals:{" "}
                  {form.conbiniMealsPercent}% conbini
                </label>
                <input
                  id="conbini-slider"
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={form.conbiniMealsPercent}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      conbiniMealsPercent: Number(e.target.value),
                    }))
                  }
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-paper-edge accent-maroon"
                />
                <p className="mt-1 font-serif text-sm text-muted">
                  Left is more sit-down meals. Right is more Lawson style meals
                  and snacks.
                </p>
              </div>

              <fieldset className="min-w-0">
                <legend className={controlLabel}>Hotel type</legend>
                <Segmented
                  name="Hotel type"
                  value={form.hotelType}
                  onChange={(hotelType) => setForm((f) => ({ ...f, hotelType }))}
                  options={HOTEL_OPTIONS}
                />
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
                This tool uses rounded 2026 style assumptions. Your real receipt
                total moves with hotel sales, how often you say yes to sushi
                counters, and whether you buy a rail pass or single tickets.
              </p>
              <p>
                Treat the total as a planning band, not a promise. If you move
                between cities often, Shinkansen and luggage fees climb fast. If you stay
                mostly in one metro, trains look cheaper than this model might
                imply for a mixed week.
              </p>
            </div>
          </section>

          <section
            className="max-w-2xl space-y-4"
            aria-labelledby="mistakes-heading"
          >
            <h2
              id="mistakes-heading"
              className="editorial-heading text-2xl sm:text-3xl"
            >
              Common budget mistakes in Japan
            </h2>
            <ul className="article-body list-none space-y-3.5 pl-0 text-lg leading-relaxed">
              <li className="before:content-['›'] before:font-bold before:text-rust before:mr-3">
                Forgetting ATM and card quirks, then panic withdrawing at the
                wrong machine on a Sunday night.
              </li>
              <li className="before:content-['›'] before:font-bold before:text-rust before:mr-3">
                Assuming one cheap hostel night fixes a week of taxi exits after
                midnight trains.
              </li>
              <li className="before:content-['›'] before:font-bold before:text-rust before:mr-3">
                Shopping tax-free on day one and blowing the daily average on
                gear before you buy breakfast.
              </li>
              <li className="before:content-['›'] before:font-bold before:text-rust before:mr-3">
                Ignoring coin lockers, snacks, and drink vending machines. Small
                yen drains add up across twelve hour walking days.
              </li>
            </ul>
          </section>

          <section aria-labelledby="guides-heading">
            <h2
              id="guides-heading"
              className="editorial-heading mb-5 text-2xl sm:text-3xl"
            >
              Read next on money, data, and trains
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Link
                href="/guides/sim-card-japan"
                className="group editorial-card block border border-paper-edge bg-white p-5 no-underline"
              >
                <h3 className="font-display text-xl font-bold text-dark group-hover:text-maroon">
                  SIM card guide
                </h3>
                <p className="article-body-sm mt-2 text-muted">
                  Pick eSIM or plastic before you need maps at the ticket machine.
                </p>
                <span className="editorial-chevron-link mt-3 font-sans text-xs font-bold uppercase tracking-widest text-rust">
                  Open guide
                </span>
              </Link>
              <Link
                href="/guides/money-payments-japan"
                className="group editorial-card block border border-paper-edge bg-white p-5 no-underline"
              >
                <h3 className="font-display text-xl font-bold text-dark group-hover:text-maroon">
                  Money and payments
                </h3>
                <p className="article-body-sm mt-2 text-muted">
                  Cash, IC, and cards: what actually happens at the register.
                </p>
                <span className="editorial-chevron-link mt-3 font-sans text-xs font-bold uppercase tracking-widest text-rust">
                  Open guide
                </span>
              </Link>
              <Link
                href="/guides/japan-trains"
                className="group editorial-card block border border-paper-edge bg-white p-5 no-underline sm:col-span-2 lg:col-span-1"
              >
                <h3 className="font-display text-xl font-bold text-dark group-hover:text-maroon">
                  Japan trains primer
                </h3>
                <p className="article-body-sm mt-2 text-muted">
                  IC basics, locals vs express, and why your first week feels loud.
                </p>
                <span className="editorial-chevron-link mt-3 font-sans text-xs font-bold uppercase tracking-widest text-rust">
                  Open guide
                </span>
              </Link>
            </div>
          </section>

          <p className="article-body-sm max-w-2xl pb-8 text-muted lg:pb-0">
            For a narrative breakdown of categories, see{" "}
            <Link
              href="/guides/japan-budget-breakdown"
              className="font-sans font-bold text-rust underline decoration-rust/30 underline-offset-2 hover:text-maroon"
            >
              Japan budget breakdown
            </Link>
            .
          </p>
        </div>

        <aside
          className="mt-0 lg:sticky lg:top-24 lg:mt-0 lg:self-start"
          aria-labelledby="results-heading"
        >
          <div className="rounded-lg border border-paper-edge bg-paper-card shadow-editorial">
            <div className="border-b border-paper-edge bg-paper-elevated/90 px-5 py-4 sm:px-6">
              <h2
                id="results-heading"
                className="font-display text-xl font-bold italic text-dark sm:text-2xl"
              >
                Estimate
              </h2>
              <p className="article-body-sm mt-1 text-muted">
                Yen totals for the whole group, unless noted.
              </p>
            </div>
            <ShareActions form={form} breakdown={breakdown} />
            <div className="px-5 pb-5 pt-2 sm:px-6">
              <p className="mb-1 font-sans text-xs font-bold uppercase tracking-widest text-muted">
                Trip total (with buffer)
              </p>
              <p className="font-display text-3xl font-bold tabular-nums text-maroon sm:text-4xl">
                {formatYenJpy(breakdown.totalYen)}
              </p>
              <p className="mt-2 font-serif text-lg text-muted">
                About {formatYenJpy(breakdown.dailyAverageYen)} per day for the
                group.
              </p>
            </div>
            <BudgetBreakdownResults breakdown={breakdown} />
            <div className="border-t border-paper-edge px-5 sm:px-6">
              <LineItem
                label="Hotels (rooms)"
                value={formatYenJpy(breakdown.hotelYen)}
                hint="Nights times rooms, scaled by cities you checked."
              />
              <LineItem
                label="Food"
                value={formatYenJpy(breakdown.foodYen)}
                hint="Blends conbini and restaurant style days using your slider."
              />
              <LineItem
                label="Transport"
                value={formatYenJpy(breakdown.transportYen)}
              />
              <LineItem
                label="Shopping"
                value={formatYenJpy(breakdown.shoppingYen)}
              />
              <LineItem
                label="Subtotal"
                value={formatYenJpy(breakdown.subtotalYen)}
              />
              <LineItem
                label="Emergency buffer (12%)"
                value={formatYenJpy(breakdown.emergencyBufferYen)}
                hint="Missed train, rain gear, clinic visit, or a splurge dinner."
              />
              <div className="border-t border-paper-edge bg-paper-elevated/60 px-0 py-4">
                <LineItem
                  label="Suggested cash to carry"
                  value={formatYenJpy(breakdown.suggestedCashYen)}
                  hint="Rough pocket yen for small food, lockers, and cash-only doors. You still keep cards and IC for the rest."
                />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function CalculatorSuspenseFallback() {
  return (
    <div
      className="mx-auto max-w-6xl rounded-lg border border-paper-edge bg-paper-card/80 p-8 text-center shadow-editorial"
      aria-busy="true"
    >
      <p className="font-serif text-muted">Loading calculator…</p>
    </div>
  );
}

export function JapanTripBudgetCalculator() {
  return (
    <Suspense fallback={<CalculatorSuspenseFallback />}>
      <JapanTripBudgetCalculatorClient />
    </Suspense>
  );
}
