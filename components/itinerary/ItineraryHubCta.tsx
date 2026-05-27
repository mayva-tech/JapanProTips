"use client";

import Link from "next/link";
import { PLANNER_PATH } from "@/lib/itinerary/build-planner-url";
import { trackItineraryHubCtaClick } from "@/lib/itinerary/itinerary-analytics";

const TEMPLATES_PATH = "/itinerary-templates";

const FEATURED_TEMPLATES = [
  {
    path: "/itinerary-templates/7-day-japan-first-time",
    label: "7-day first-time route",
  },
  {
    path: "/itinerary-templates/14-day-japan-golden-route",
    label: "14-day golden route",
  },
] as const;

const secondaryLinkClass =
  "editorial-chevron-link font-sans text-sm font-bold text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon";

export type ItineraryHubCtaProps = {
  sourcePage: string;
  variant?: "planner" | "templates" | "split";
  ctaPosition?: string;
  className?: string;
};

export function ItineraryHubCta({
  sourcePage,
  variant = "split",
  ctaPosition = "hub-block",
  className = "",
}: ItineraryHubCtaProps) {
  const trackClick = (
    targetType: "planner" | "templates" | "template",
    targetPath: string,
  ) => {
    trackItineraryHubCtaClick({
      source_page: sourcePage,
      target_type: targetType,
      target_path: targetPath,
      cta_position: ctaPosition,
    });
  };

  if (variant === "planner") {
    return (
      <aside
        className={`editorial-cta-block ${className}`.trim()}
        aria-labelledby="itinerary-hub-cta-heading"
      >
        <p className="editorial-kicker mb-3">Trip planning</p>
        <h2
          id="itinerary-hub-cta-heading"
          className="editorial-heading mb-4 text-ink"
        >
          Build a Japan itinerary
        </h2>
        <p className="article-body max-w-2xl text-muted">
          Day-by-day routes with editable stops, travel time estimates, share
          links, and PDF export.
        </p>
        <div className="mt-6">
          <Link
            href={PLANNER_PATH}
            className="editorial-btn-primary editorial-chevron-cta text-center"
            onClick={() => trackClick("planner", PLANNER_PATH)}
          >
            Open itinerary planner
          </Link>
        </div>
      </aside>
    );
  }

  if (variant === "templates") {
    return (
      <aside
        className={`editorial-cta-block ${className}`.trim()}
        aria-labelledby="itinerary-hub-cta-heading"
      >
        <p className="editorial-kicker mb-3">Trip planning</p>
        <h2
          id="itinerary-hub-cta-heading"
          className="editorial-heading mb-4 text-ink"
        >
          Browse curated itinerary templates
        </h2>
        <p className="article-body max-w-2xl text-muted">
          Start with a 7-day or 14-day outline, then open the planner to edit
          stops and export.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href={TEMPLATES_PATH}
            className="editorial-btn-primary editorial-chevron-cta text-center"
            onClick={() => trackClick("templates", TEMPLATES_PATH)}
          >
            View all templates
          </Link>
          <Link
            href={PLANNER_PATH}
            className={secondaryLinkClass}
            onClick={() => trackClick("planner", PLANNER_PATH)}
          >
            Open itinerary planner
          </Link>
        </div>
      </aside>
    );
  }

  return (
    <aside
      className={`rounded-lg border border-paper-edge bg-paper-elevated/90 px-5 py-5 shadow-editorial sm:px-6 sm:py-6 ${className}`.trim()}
      aria-labelledby="itinerary-hub-cta-heading"
    >
      <p className="font-sans text-xs font-bold uppercase tracking-widest text-rust">
        Trip planning
      </p>
      <h2
        id="itinerary-hub-cta-heading"
        className="font-display mt-2 text-xl font-bold text-ink sm:text-2xl"
      >
        Build a Japan itinerary
      </h2>
      <p className="article-body-sm mt-2 max-w-2xl text-muted">
        Use the planner for a custom day-by-day route, or start from curated
        templates for common trip lengths.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Link
          href={PLANNER_PATH}
          className="editorial-btn-primary editorial-chevron-cta text-center sm:w-auto"
          onClick={() => trackClick("planner", PLANNER_PATH)}
        >
          Open itinerary planner
        </Link>
        <Link
          href={TEMPLATES_PATH}
          className={secondaryLinkClass}
          onClick={() => trackClick("templates", TEMPLATES_PATH)}
        >
          Browse curated templates
        </Link>
      </div>
      <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-sans text-sm font-semibold">
        {FEATURED_TEMPLATES.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={secondaryLinkClass}
            onClick={() => trackClick("template", item.path)}
          >
            {item.label}
          </Link>
        ))}
      </p>
    </aside>
  );
}
