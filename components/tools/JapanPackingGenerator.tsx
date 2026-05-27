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
import { InlineAffiliate } from "@/components/conversion";
import { Callout } from "@/components/editorial/Callout";
import {
  getAffiliateUrlOrNull,
  isValidAffiliateUrl,
} from "@/lib/affiliate-links";
import {
  type ActivityKey,
  type JapanPackingGeneratorForm,
  type LaundryOption,
  type PackingCity,
  type RainLevel,
  type TravelerType,
  JAPAN_PACKING_GENERATOR_DEFAULTS,
  TRAVEL_MONTHS,
  buildPackingChecklistPlainText,
  buildPackingGeneratorOutput,
  japanPackingGeneratorFormsEqual,
  normalizeJapanPackingGeneratorQueryString,
  parseJapanPackingGeneratorSearchParams,
  serializeJapanPackingGeneratorQuery,
} from "@/lib/japan-packing-generator";
import {
  toolCheckboxClass,
  toolCheckboxRowLayoutSm,
  toolSegmentClass,
  toolSegmentLayout,
} from "@/lib/tool-choice-classes";

const TRAVELER_OPTIONS: { value: TravelerType; label: string }[] = [
  { value: "first-timer", label: "First-time tourist" },
  { value: "family", label: "Family traveler" },
  { value: "business", label: "Business traveler" },
  { value: "backpacker", label: "Backpacker" },
];

const CITY_OPTIONS: { value: PackingCity; label: string }[] = [
  { value: "tokyo", label: "Tokyo" },
  { value: "kyoto", label: "Kyoto" },
  { value: "osaka", label: "Osaka" },
  { value: "hokkaido", label: "Hokkaido" },
  { value: "okinawa", label: "Okinawa" },
  { value: "rural", label: "Rural Japan" },
];

const LAUNDRY_OPTIONS: { value: LaundryOption; label: string }[] = [
  { value: "none", label: "No laundry" },
  { value: "coin", label: "Coin laundry planned" },
  { value: "hotel", label: "Hotel laundry" },
];

const ACTIVITY_OPTIONS: { value: ActivityKey; label: string }[] = [
  { value: "theme-parks", label: "Theme parks" },
  { value: "temples", label: "Temples and shrines" },
  { value: "hiking", label: "Hiking or nature" },
  { value: "business", label: "Business meetings" },
  { value: "winter-snow", label: "Winter snow" },
  { value: "beach-islands", label: "Beach or islands" },
];

const RAIN_OPTIONS: { value: RainLevel; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const controlLabel =
  "mb-2 block font-sans text-xs font-bold uppercase tracking-widest text-rust";
const segmentWrap = "flex flex-wrap gap-2";

const actionBtn =
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

function JapanPackingGeneratorClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [form, setForm] = useState<JapanPackingGeneratorForm>(() => ({
    ...JAPAN_PACKING_GENERATOR_DEFAULTS,
  }));

  const output = useMemo(() => buildPackingGeneratorOutput(form), [form]);

  const serializedQuery = useMemo(
    () => serializeJapanPackingGeneratorQuery(form),
    [form],
  );

  useLayoutEffect(() => {
    const next = parseJapanPackingGeneratorSearchParams(searchParams);
    setForm((prev) =>
      japanPackingGeneratorFormsEqual(prev, next) ? prev : next,
    );
  }, [searchParams]);

  useEffect(() => {
    const urlNorm = normalizeJapanPackingGeneratorQueryString(
      searchParams.toString(),
    );
    if (serializedQuery === urlNorm) return;
    router.replace(`${pathname}?${serializedQuery}`, { scroll: false });
  }, [serializedQuery, searchParams, pathname, router]);

  const toggleCity = useCallback((c: PackingCity) => {
    setForm((prev) => {
      const has = prev.cities.includes(c);
      if (has && prev.cities.length === 1) return prev;
      const cities = has
        ? prev.cities.filter((x) => x !== c)
        : [...prev.cities, c];
      return { ...prev, cities };
    });
  }, []);

  const toggleActivity = useCallback((a: ActivityKey) => {
    setForm((prev) => {
      const has = prev.activities.includes(a);
      if (has && prev.activities.length === 1) return prev;
      const activities = has
        ? prev.activities.filter((x) => x !== a)
        : [...prev.activities, a];
      return { ...prev, activities };
    });
  }, []);

  const [copied, setCopied] = useState<"checklist" | "link" | null>(null);
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCopiedSoon = useCallback(() => {
    if (copiedTimer.current) clearTimeout(copiedTimer.current);
    copiedTimer.current = setTimeout(() => {
      setCopied(null);
      copiedTimer.current = null;
    }, 2200);
  }, []);

  const copyText = useCallback(
    async (text: string, kind: "checklist" | "link") => {
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

  const onCopyChecklist = useCallback(() => {
    void copyText(buildPackingChecklistPlainText(form, output), "checklist");
  }, [copyText, form, output]);

  const onCopyLink = useCallback(() => {
    if (typeof window === "undefined") return;
    const qs = serializeJapanPackingGeneratorQuery(form);
    void copyText(`${window.location.origin}${pathname}?${qs}`, "link");
  }, [copyText, form, pathname]);

  useEffect(() => {
    return () => {
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
    };
  }, []);

  const gearHref = getAffiliateUrlOrNull("gear-packing-cubes");

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:items-start lg:gap-10 xl:gap-10">
        <div className="min-w-0 space-y-6 lg:sticky lg:top-24 lg:self-start">
          <section
            className="rounded-lg border border-paper-edge bg-paper-card/80 p-5 shadow-editorial sm:p-6"
            aria-labelledby="packing-inputs-heading"
          >
            <h2
              id="packing-inputs-heading"
              className="editorial-heading mb-5 text-xl text-dark sm:text-2xl"
            >
              Your trip
            </h2>

            <div className="space-y-7">
              <div>
                <label className={controlLabel} htmlFor="travel-month">
                  Month of travel
                </label>
                <select
                  id="travel-month"
                  value={form.month}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      month: Number(e.target.value),
                    }))
                  }
                  className="w-full rounded-md border border-paper-edge bg-paper px-3 py-2.5 font-sans text-sm font-semibold text-dark accent-maroon"
                >
                  {TRAVEL_MONTHS.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>

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
                  Range 3 to 21 days.
                </p>
              </div>

              <fieldset className="min-w-0">
                <legend className={controlLabel}>Traveler type</legend>
                <Segmented
                  name="Traveler type"
                  value={form.travelerType}
                  onChange={(travelerType) =>
                    setForm((f) => ({ ...f, travelerType }))
                  }
                  options={TRAVELER_OPTIONS}
                />
              </fieldset>

              <fieldset className="min-w-0">
                <legend className={controlLabel}>Main cities</legend>
                <div className="flex flex-wrap gap-2.5">
                  {CITY_OPTIONS.map(({ value, label }) => {
                    const on = form.cities.includes(value);
                    return (
                      <label
                        key={value}
                        className={toolCheckboxClass(on, toolCheckboxRowLayoutSm)}
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
                <legend className={controlLabel}>Laundry access</legend>
                <Segmented
                  name="Laundry access"
                  value={form.laundry}
                  onChange={(laundry) => setForm((f) => ({ ...f, laundry }))}
                  options={LAUNDRY_OPTIONS}
                />
              </fieldset>

              <fieldset className="min-w-0">
                <legend className={controlLabel}>Activities</legend>
                <div className="flex flex-wrap gap-2.5">
                  {ACTIVITY_OPTIONS.map(({ value, label }) => {
                    const on = form.activities.includes(value);
                    return (
                      <label
                        key={value}
                        className={toolCheckboxClass(on, toolCheckboxRowLayoutSm)}
                      >
                        <input
                          type="checkbox"
                          className="h-4 w-4 accent-tool-ink"
                          checked={on}
                          onChange={() => toggleActivity(value)}
                        />
                        {label}
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset className="min-w-0">
                <legend className={controlLabel}>Rain concern</legend>
                <Segmented
                  name="Rain concern"
                  value={form.rain}
                  onChange={(rain) => setForm((f) => ({ ...f, rain }))}
                  options={RAIN_OPTIONS}
                />
              </fieldset>
            </div>
          </section>

          <div className="rounded-lg border border-paper-edge bg-paper-card p-5 shadow-editorial sm:p-6">
            <p className="font-sans text-xs font-bold uppercase tracking-widest text-muted">
              Share
            </p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                className={actionBtn}
                onClick={onCopyChecklist}
              >
                Copy checklist
              </button>
              <button type="button" className={actionBtn} onClick={onCopyLink}>
                Copy share link
              </button>
            </div>
            <p
              className="mt-2 min-h-[1.25rem] font-sans text-xs font-semibold text-maroon transition-opacity duration-200"
              aria-live="polite"
            >
              {copied === "checklist" ? "Copied checklist." : null}
              {copied === "link" ? "Copied link." : null}
            </p>
          </div>
        </div>

        <div className="min-w-0 space-y-8">
          <Callout variant="warning" title="Do not overpack" className="max-w-full">
            <p className="article-body-sm leading-relaxed">{output.overpackWarning}</p>
          </Callout>

          <section aria-labelledby="checklist-heading">
            <h2
              id="checklist-heading"
              className="editorial-heading mb-5 text-xl text-dark sm:text-2xl"
            >
              Your packing checklist
            </h2>
            <div className="space-y-8">
              {output.sections.map((sec) => (
                <div
                  key={sec.id}
                  className="rounded-lg border border-paper-edge bg-paper-card/90 p-5 shadow-editorial sm:p-6"
                >
                  <h3 className="font-display text-lg font-bold text-dark sm:text-xl">
                    {sec.title}
                  </h3>
                  <ul className="article-body-sm mt-3 list-disc space-y-2 pl-5 text-muted marker:text-rust">
                    {sec.items.map((item) => (
                      <li key={item} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section
            className="rounded-lg border border-paper-edge bg-paper-elevated/80 p-5 shadow-inner sm:p-6"
            aria-labelledby="buy-japan-heading"
          >
            <h2
              id="buy-japan-heading"
              className="font-display text-lg font-bold text-dark sm:text-xl"
            >
              Buy in Japan instead
            </h2>
            <p className="article-body-sm mt-2 text-muted">
              Save suitcase weight on things you can grab at a conbini or
              drugstore after you land.
            </p>
            <ul className="article-body-sm mt-3 list-disc space-y-2 pl-5 text-muted marker:text-rust">
              {output.buyInJapan.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>

          <div className="max-w-full space-y-3">
            <Callout
              variant="warning"
              title="Recommended travel gear"
              className="max-w-full"
            >
              <p className="article-body-sm leading-relaxed">
                Packing cubes, a packable rain layer, a slim power bank, and a
                mesh laundry bag earn their space on almost every Japan trip.
              </p>
            </Callout>
            {gearHref && isValidAffiliateUrl(gearHref) ? (
              <InlineAffiliate
                text="If you want one outbound shop link for cubes and organizers, use the partner pick below."
                buttonText="View gear picks"
                link={gearHref}
              />
            ) : (
              <p className="article-body-sm leading-relaxed text-muted">
                <Link
                  href="/guides/japan-packing-list"
                  className="font-sans font-bold text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
                >
                  Japan packing list
                </Link>{" "}
                covers categories and what to buy before you fly versus after
                you land.
              </p>
            )}
          </div>

          <section
            className="rounded-lg border border-paper-edge bg-paper-card/90 p-5 shadow-editorial sm:p-6"
            aria-labelledby="packing-read-next-heading"
          >
            <h2
              id="packing-read-next-heading"
              className="font-display text-lg font-bold italic text-dark sm:text-xl"
            >
              Read next
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5 font-sans text-sm font-semibold">
              <li>
                <Link
                  href="/guides/japan-packing-list"
                  className="editorial-chevron-link text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
                >
                  Japan packing list
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/japan-weather-by-month"
                  className="editorial-chevron-link text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
                >
                  Japan weather by month
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/japan-trip-budget-calculator"
                  className="editorial-chevron-link text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
                >
                  Japan trip budget calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/sim-card-japan"
                  className="editorial-chevron-link text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
                >
                  SIM card Japan guide
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

function PackingGeneratorFallback() {
  return (
    <div
      className="mx-auto max-w-6xl rounded-lg border border-paper-edge bg-paper-card/80 p-8 text-center shadow-editorial"
      aria-busy="true"
    >
      <p className="font-serif text-muted">Loading packing generator…</p>
    </div>
  );
}

export function JapanPackingGenerator() {
  return (
    <Suspense fallback={<PackingGeneratorFallback />}>
      <JapanPackingGeneratorClient />
    </Suspense>
  );
}
