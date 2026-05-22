"use client";

import { useCallback, useEffect, useState } from "react";
import { ItineraryDayCard } from "@/components/itinerary/ItineraryDayCard";
import { ItineraryExportButton } from "@/components/itinerary/ItineraryExportButton";
import { ItineraryGearBox } from "@/components/itinerary/ItineraryGearBox";
import {
  moveStopWithinDay,
  removeStopFromDay,
  type StopMoveDirection,
} from "@/lib/itinerary/edit-itinerary";
import {
  analyticsPayloadFromItinerary,
  trackItineraryCopyLink,
  trackItineraryEditAction,
  trackItinerarySaveError,
  trackItinerarySaveStart,
  trackItinerarySaveSuccess,
} from "@/lib/itinerary/itinerary-analytics";
import {
  itineraryDurationLabel,
  itineraryThemeLabel,
  startCityLabel,
  travelPaceLabel,
  travelStyleLabel,
} from "@/lib/itinerary/itinerary-options";
import type { GeneratedItinerary } from "@/types/itinerary";
import type {
  SaveItineraryErrorResponse,
  SaveItineraryResponse,
} from "@/types/itinerary-api";

const actionBtn =
  "inline-flex min-h-[44px] w-full items-center justify-center rounded-md px-5 py-3 font-sans text-sm font-bold uppercase tracking-widest transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto";

const primaryBtn = `${actionBtn} bg-maroon text-white hover:bg-rust`;

const secondaryBtn = `${actionBtn} border border-paper-edge bg-paper-elevated/90 text-dark hover:border-rust/45 hover:bg-paper`;

const SHARING_NOT_CONFIGURED_MESSAGE =
  "Sharing is not configured yet, but you can still use and edit this itinerary in this tab.";

export function ItineraryResult({
  itinerary: initialItinerary,
  source,
  warning,
  cached = false,
  readOnly = false,
}: {
  itinerary: GeneratedItinerary;
  source?: "mock" | "openai";
  warning?: string;
  cached?: boolean;
  readOnly?: boolean;
}) {
  const [itinerary, setItinerary] = useState(initialItinerary);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const isAi = source === "openai";

  useEffect(() => {
    setItinerary(initialItinerary);
    setShareUrl(null);
    setSaveError(null);
    setCopied(false);
  }, [initialItinerary]);

  const analyticsPayload = useCallback(
    () => analyticsPayloadFromItinerary(itinerary),
    [itinerary],
  );

  const handleMoveStop = useCallback(
    (dayNumber: number, stopId: string, direction: StopMoveDirection) => {
      setItinerary((current) => {
        const next = moveStopWithinDay(current, dayNumber, stopId, direction);
        trackItineraryEditAction({
          ...analyticsPayloadFromItinerary(next),
          action: direction === "up" ? "move_up" : "move_down",
          dayNumber,
        });
        return next;
      });
      setShareUrl(null);
    },
    [],
  );

  const handleRemoveStop = useCallback((dayNumber: number, stopId: string) => {
    setItinerary((current) => {
      const next = removeStopFromDay(current, dayNumber, stopId);
      trackItineraryEditAction({
        ...analyticsPayloadFromItinerary(next),
        action: "remove",
        dayNumber,
      });
      return next;
    });
    setShareUrl(null);
  }, []);

  const onSaveShareLink = async () => {
    const payload = analyticsPayload();
    trackItinerarySaveStart({ ...payload, readOnly });

    setSaving(true);
    setSaveError(null);
    setCopied(false);

    try {
      const res = await fetch("/api/itineraries/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itinerary),
      });

      const data: SaveItineraryResponse | SaveItineraryErrorResponse =
        await res.json();

      if (!res.ok) {
        const message =
          res.status === 503
            ? SHARING_NOT_CONFIGURED_MESSAGE
            : typeof data === "object" &&
                data !== null &&
                "error" in data &&
                typeof data.error === "string"
              ? data.error
              : "Could not save itinerary.";
        setSaveError(message);
        trackItinerarySaveError({
          ...payload,
          readOnly,
          errorType: res.status === 503 ? "not_configured" : "http",
        });
        return;
      }

      if (
        typeof data !== "object" ||
        data === null ||
        !("slug" in data) ||
        !("url" in data) ||
        typeof data.url !== "string"
      ) {
        setSaveError(
          "We could not save your link right now. Try again in a moment.",
        );
        trackItinerarySaveError({
          ...payload,
          readOnly,
          errorType: "unexpected",
        });
        return;
      }

      const absolute =
        typeof window !== "undefined"
          ? `${window.location.origin}${data.url}`
          : data.url;
      setShareUrl(absolute);
      trackItinerarySaveSuccess({ ...payload, readOnly });
    } catch {
      setSaveError("Network error. Check your connection and try again.");
      trackItinerarySaveError({
        ...payload,
        readOnly,
        errorType: "network",
      });
    } finally {
      setSaving(false);
    }
  };

  const onCopyLink = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      trackItineraryCopyLink({ ...analyticsPayload(), readOnly });
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="itinerary-preview"
      className="rounded-lg border border-paper-edge bg-paper-card/90 p-5 shadow-editorial sm:p-6"
      aria-labelledby="itinerary-result-heading"
    >
      <div className="flex flex-wrap items-center gap-2">
        <p className="font-sans text-xs font-bold uppercase tracking-widest text-rust">
          {readOnly ? "Shared itinerary" : "Your itinerary"}
        </p>
        {source ? (
          <span
            className={`rounded border px-2 py-0.5 font-sans text-[0.65rem] font-bold uppercase tracking-widest ${
              isAi
                ? "border-maroon/35 bg-maroon/10 text-maroon"
                : "border-paper-edge bg-paper text-muted"
            }`}
          >
            {isAi ? "AI generated" : "Demo itinerary"}
          </span>
        ) : null}
        {cached && isAi ? (
          <span className="rounded border border-paper-edge bg-paper px-2 py-0.5 font-sans text-[0.65rem] font-bold uppercase tracking-widest text-muted">
            Cached result
          </span>
        ) : null}
      </div>

      {warning ? (
        <p className="article-body-sm mt-3 rounded-md border border-paper-edge bg-paper-elevated/90 px-3 py-2 text-muted">
          {warning}
        </p>
      ) : null}

      {source === "mock" && !warning ? (
        <p className="article-body-sm mt-3 rounded-md border border-paper-edge bg-paper-elevated/90 px-3 py-2 text-muted">
          AI generation is unavailable, so this demo outline uses your trip
          settings as a starting sketch. Edit stops or try again later for a
          personalized version.
        </p>
      ) : null}

      <h2
        id="itinerary-result-heading"
        className="guide-page-title mt-3 text-balance text-2xl sm:text-3xl"
      >
        {itinerary.title}
      </h2>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 font-sans text-sm sm:grid-cols-3">
        <div>
          <dt className="text-[0.65rem] font-bold uppercase tracking-widest text-rust">
            Duration
          </dt>
          <dd className="font-semibold text-dark">
            {itineraryDurationLabel(itinerary.duration)}
          </dd>
        </div>
        <div>
          <dt className="text-[0.65rem] font-bold uppercase tracking-widest text-rust">
            Start city
          </dt>
          <dd className="font-semibold text-dark">
            {startCityLabel(itinerary.startCity)}
          </dd>
        </div>
        <div>
          <dt className="text-[0.65rem] font-bold uppercase tracking-widest text-rust">
            Theme
          </dt>
          <dd className="font-semibold text-dark">
            {itineraryThemeLabel(itinerary.theme)}
          </dd>
        </div>
        <div>
          <dt className="text-[0.65rem] font-bold uppercase tracking-widest text-rust">
            Travel style
          </dt>
          <dd className="font-semibold text-dark">
            {travelStyleLabel(itinerary.travelStyle)}
          </dd>
        </div>
        <div>
          <dt className="text-[0.65rem] font-bold uppercase tracking-widest text-rust">
            Pace
          </dt>
          <dd className="font-semibold text-dark">
            {travelPaceLabel(itinerary.pace)}
          </dd>
        </div>
      </dl>

      {!readOnly ? (
        <p className="article-body-sm mt-4 max-w-2xl text-muted">
          Reorder or remove stops to match how you actually travel. Edits stay in
          this browser tab until you save a share link. Transit times are
          estimates only. Confirm opening hours, fares, and routes before you
          travel.
        </p>
      ) : (
        <p className="article-body-sm mt-4 max-w-2xl text-muted">
          Transit times are estimates only. Confirm opening hours, fares, and
          routes before you travel.
        </p>
      )}

      <div className="mt-5 space-y-3">
        {itinerary.days.map((day, index) => (
          <div key={day.dayNumber}>
            {index > 0 ? (
              <div
                className="mb-3 border-t border-maroon/15"
                aria-hidden
              />
            ) : null}
            <ItineraryDayCard
              day={day}
              readOnly={readOnly}
              onMoveStop={readOnly ? undefined : handleMoveStop}
              onRemoveStop={readOnly ? undefined : handleRemoveStop}
            />
          </div>
        ))}
      </div>

      {!readOnly ? (
        <div className="mt-6 rounded-md border border-paper-edge bg-paper/80 p-4 sm:p-5">
          <h3 className="font-display text-lg font-bold text-dark">
            Save or export your itinerary
          </h3>
          <p className="article-body-sm mt-2 text-muted">
            Download a PDF for offline use, or save a share link after you
            finish editing. Links expire after 30 days.
          </p>
          <div className="mt-4 flex flex-col gap-2.5">
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                className={primaryBtn}
                onClick={() => void onSaveShareLink()}
                disabled={saving}
                aria-busy={saving}
              >
                {saving ? "Saving…" : "Save shareable link"}
              </button>
              {shareUrl ? (
                <button
                  type="button"
                  className={secondaryBtn}
                  onClick={() => void onCopyLink()}
                >
                  {copied ? "Link copied" : "Copy link"}
                </button>
              ) : null}
            </div>
            <ItineraryExportButton itinerary={itinerary} readOnly={readOnly} />
          </div>
          {shareUrl ? (
            <p className="article-body-sm mt-3 break-all font-sans text-xs text-muted">
              <span className="font-bold uppercase tracking-widest text-rust">
                Share link:{" "}
              </span>
              {shareUrl}
            </p>
          ) : null}
          {saveError ? (
            <p className="article-body-sm mt-3 text-muted">{saveError}</p>
          ) : null}
        </div>
      ) : (
        <div className="mt-6 rounded-md border border-paper-edge bg-paper/80 p-4 sm:p-5">
          <h3 className="font-display text-lg font-bold text-dark">
            Export this itinerary
          </h3>
          <div className="mt-3">
            <ItineraryExportButton itinerary={itinerary} readOnly={readOnly} />
          </div>
        </div>
      )}

      <ItineraryGearBox
        itinerary={itinerary}
        source={source}
        readOnly={readOnly}
      />

      <p className="article-body-sm mt-6 border-t border-paper-edge pt-4 text-muted">
        Place names and transit notes are planning aids. Verify details with
        official timetables, venue sites, and maps before booking or traveling.
      </p>
    </section>
  );
}
