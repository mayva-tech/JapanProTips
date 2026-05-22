"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  parsePlannerPrefillFromSearchParams,
  parseTemplateSlugFromSearchParams,
} from "@/lib/itinerary/build-planner-url";
import { getCuratedItineraryTemplateBySlug } from "@/lib/itinerary/curated-itinerary-templates";
import { ItineraryTemplatePrefillNotice } from "@/components/itinerary/ItineraryTemplatePrefillNotice";
import { ItineraryResult } from "@/components/itinerary/ItineraryResult";
import { ItineraryPreviewPlaceholder } from "@/components/itinerary/ItineraryPreviewPlaceholder";
import {
  ITINERARY_DURATIONS,
  ITINERARY_PACES,
  ITINERARY_START_CITIES,
  ITINERARY_THEMES,
  ITINERARY_TRAVEL_STYLES,
} from "@/lib/itinerary/itinerary-options";
import {
  analyticsPayloadFromRequest,
  itineraryCountsFrom,
  trackItineraryGenerateError,
  trackItineraryGenerateStart,
  trackItineraryGenerateSuccess,
} from "@/lib/itinerary/itinerary-analytics";
import { friendlyGenerateErrorMessage } from "@/lib/itinerary/itinerary-user-messages";
import type { GenerateItineraryRequest, GenerateItineraryResponse } from "@/types/itinerary-api";
import type { GeneratedItinerary } from "@/types/itinerary";
import type { ItineraryDuration } from "@/types/itinerary";

const DEFAULTS: GenerateItineraryRequest = {
  duration: 7,
  startCity: "Tokyo",
  theme: "food",
  travelStyle: "mid-range",
  pace: "moderate",
};

const controlLabel =
  "mb-2 block font-sans text-xs font-bold uppercase tracking-widest text-rust";
const segmentWrap = "flex flex-wrap gap-2";
const segmentBtn =
  "min-h-[44px] min-w-[calc(50%-0.25rem)] flex-1 rounded-md border border-paper-edge bg-paper-card px-2.5 py-2.5 text-left font-sans text-xs font-semibold text-dark transition-colors duration-150 hover:border-rust/40 sm:min-w-0 sm:px-3 sm:text-sm";
const segmentBtnOn =
  "border-maroon bg-maroon/10 text-maroon ring-1 ring-maroon/25";

const primaryBtn =
  "inline-flex w-full items-center justify-center rounded-md bg-maroon px-6 py-3.5 font-sans text-base font-bold uppercase tracking-widest text-white transition-colors duration-150 hover:bg-rust disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[280px]";

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
            className={`${segmentBtn} ${on ? segmentBtnOn : ""}`}
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

function DurationSegmented({
  value,
  onChange,
}: {
  value: ItineraryDuration;
  onChange: (v: ItineraryDuration) => void;
}) {
  return (
    <div className={segmentWrap} role="group" aria-label="Trip duration">
      {ITINERARY_DURATIONS.map((opt) => {
        const on = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            className={`${segmentBtn} ${on ? segmentBtnOn : ""}`}
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

function scrollToPreview() {
  requestAnimationFrame(() => {
    document
      .getElementById("itinerary-preview")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

export function ItineraryPlannerForm() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<GenerateItineraryRequest>(DEFAULTS);

  const templateSlug = useMemo(
    () => parseTemplateSlugFromSearchParams(searchParams),
    [searchParams],
  );
  const curatedTemplate = useMemo(
    () =>
      templateSlug ? getCuratedItineraryTemplateBySlug(templateSlug) : undefined,
    [templateSlug],
  );

  useEffect(() => {
    const prefill = parsePlannerPrefillFromSearchParams(searchParams);
    if (prefill) {
      setForm((current) => ({ ...current, ...prefill }));
    } else if (!templateSlug) {
      setForm(DEFAULTS);
    }
  }, [searchParams, templateSlug]);

  const clearTemplatePrefill = () => {
    setForm(DEFAULTS);
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [itinerary, setItinerary] = useState<GeneratedItinerary | null>(null);
  const [source, setSource] = useState<"mock" | "openai" | null>(null);
  const [warning, setWarning] = useState<string | undefined>(undefined);
  const [cached, setCached] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const onGenerate = async () => {
    const formPayload = analyticsPayloadFromRequest(form, templateSlug);
    trackItineraryGenerateStart(formPayload);

    setLoading(true);
    setError(null);
    setItinerary(null);
    setSource(null);
    setWarning(undefined);
    setCached(false);

    try {
      const res = await fetch("/api/itineraries/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data: GenerateItineraryResponse | { error?: string } =
        await res.json();

      if (!res.ok) {
        const raw =
          typeof data === "object" &&
          data !== null &&
          "error" in data &&
          typeof data.error === "string"
            ? data.error
            : null;
        setError(friendlyGenerateErrorMessage(raw));
        trackItineraryGenerateError({
          ...formPayload,
          errorType: "http",
        });
        setShowPreview(true);
        scrollToPreview();
        return;
      }

      if (
        typeof data !== "object" ||
        data === null ||
        !("itinerary" in data) ||
        (data.source !== "mock" && data.source !== "openai")
      ) {
        setError(friendlyGenerateErrorMessage(null));
        trackItineraryGenerateError({
          ...formPayload,
          errorType: "unexpected",
        });
        setShowPreview(true);
        scrollToPreview();
        return;
      }

      const counts = itineraryCountsFrom(data.itinerary);
      trackItineraryGenerateSuccess({
        ...formPayload,
        source: data.source,
        cached: "cached" in data && data.cached === true,
        ...counts,
      });

      setItinerary(data.itinerary);
      setSource(data.source);
      setCached("cached" in data && data.cached === true);
      setWarning(
        "warning" in data && typeof data.warning === "string"
          ? data.warning
          : undefined,
      );
      setShowPreview(true);
      scrollToPreview();
    } catch {
      setError(
        friendlyGenerateErrorMessage(
          "Network error. Check your connection and try again.",
        ),
      );
      trackItineraryGenerateError({
        ...formPayload,
        errorType: "network",
      });
      setShowPreview(true);
      scrollToPreview();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <section
        className="rounded-lg border border-paper-edge bg-paper-card/80 p-5 shadow-editorial sm:p-6"
        aria-labelledby="itinerary-form-heading"
      >
        <h2
          id="itinerary-form-heading"
          className="editorial-heading mb-2 text-xl text-dark sm:text-2xl"
        >
          Plan your trip
        </h2>
        <p className="article-body-sm mb-6 max-w-2xl text-muted">
          Set the basics. The planner returns a day-by-day outline from your
          inputs. When AI is unavailable, a demo itinerary is shown so you can
          still sketch a route.
        </p>

        {curatedTemplate ? (
          <ItineraryTemplatePrefillNotice
            template={curatedTemplate}
            onClear={clearTemplatePrefill}
          />
        ) : null}

        <div className="space-y-7">
          <fieldset className="min-w-0">
            <legend className={controlLabel}>Trip duration</legend>
            <DurationSegmented
              value={form.duration}
              onChange={(duration) => setForm((f) => ({ ...f, duration }))}
            />
          </fieldset>

          <fieldset className="min-w-0">
            <legend className={controlLabel}>Start city</legend>
            <Segmented
              name="Start city"
              value={form.startCity}
              onChange={(startCity) => setForm((f) => ({ ...f, startCity }))}
              options={ITINERARY_START_CITIES}
            />
          </fieldset>

          <fieldset className="min-w-0">
            <legend className={controlLabel}>Main theme</legend>
            <Segmented
              name="Main theme"
              value={form.theme}
              onChange={(theme) => setForm((f) => ({ ...f, theme }))}
              options={ITINERARY_THEMES}
            />
          </fieldset>

          <fieldset className="min-w-0">
            <legend className={controlLabel}>Travel style</legend>
            <Segmented
              name="Travel style"
              value={form.travelStyle}
              onChange={(travelStyle) =>
                setForm((f) => ({ ...f, travelStyle }))
              }
              options={ITINERARY_TRAVEL_STYLES}
            />
          </fieldset>

          <fieldset className="min-w-0">
            <legend className={controlLabel}>Daily pace</legend>
            <Segmented
              name="Daily pace"
              value={form.pace}
              onChange={(pace) => setForm((f) => ({ ...f, pace }))}
              options={ITINERARY_PACES}
            />
          </fieldset>
        </div>

        <div className="mt-8 border-t border-paper-edge pt-6">
          <button
            type="button"
            className={primaryBtn}
            onClick={() => void onGenerate()}
            disabled={loading}
            aria-busy={loading}
          >
            {loading
              ? "Generating…"
              : curatedTemplate
                ? "Generate This Itinerary"
                : "Generate My Japan Itinerary"}
          </button>
        </div>
      </section>

      {showPreview && itinerary && source ? (
        <ItineraryResult
          itinerary={itinerary}
          source={source}
          warning={warning}
          cached={cached}
        />
      ) : null}
      {showPreview && !itinerary ? (
        <ItineraryPreviewPlaceholder request={form} error={error} />
      ) : null}
    </div>
  );
}
