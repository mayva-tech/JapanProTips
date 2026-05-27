"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PLANNER_PATH } from "@/lib/itinerary/build-planner-url";
import { trackItineraryGuideCtaClick } from "@/lib/itinerary/itinerary-analytics";

const DEFAULT_TITLE = "Turn this into a day-by-day Japan itinerary";
const DEFAULT_DESCRIPTION =
  "Use the JapanProTips itinerary planner to build a practical route with editable stops, estimated travel time, share links, and PDF export.";

const TEMPLATES_PATH = "/itinerary-templates";

const secondaryLinkClass =
  "font-sans text-sm font-bold text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon";

export type ItineraryGuideCtaProps = {
  title?: string;
  description?: string;
  plannerHref?: string;
  templateHref?: string;
  templateLinkLabel?: string;
  variant?: "planner" | "template" | "compact";
  className?: string;
};

export function ItineraryGuideCta({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  plannerHref = PLANNER_PATH,
  templateHref = TEMPLATES_PATH,
  templateLinkLabel = "Browse curated itinerary templates",
  variant = "planner",
  className = "",
}: ItineraryGuideCtaProps) {
  const pathname = usePathname() ?? "";
  const sourcePage = pathname || "/";

  const trackClick = (targetType: "planner" | "template", targetPath: string) => {
    trackItineraryGuideCtaClick({
      source_page: sourcePage,
      cta_variant: variant,
      target_type: targetType,
      target_path: targetPath,
    });
  };

  const primaryIsTemplate = variant === "template";
  const primaryHref = primaryIsTemplate ? templateHref : plannerHref;
  const primaryType = primaryIsTemplate ? "template" : "planner";
  const primaryLabel = primaryIsTemplate
    ? templateLinkLabel
    : "Open itinerary planner";

  const secondaryHref = primaryIsTemplate ? plannerHref : templateHref;
  const secondaryType = primaryIsTemplate ? "planner" : "template";
  const secondaryLabel = primaryIsTemplate
    ? "Open itinerary planner"
    : templateLinkLabel;

  if (variant === "compact") {
    return (
      <aside
        className={`rounded-md border border-paper-edge bg-paper-elevated/90 px-5 py-4 shadow-editorial sm:px-6 ${className}`.trim()}
        aria-labelledby="itinerary-guide-cta-heading"
      >
        <p
          id="itinerary-guide-cta-heading"
          className="font-sans text-xs font-bold uppercase tracking-widest text-rust"
        >
          Trip planning
        </p>
        <p className="article-body-sm mt-2 max-w-2xl text-muted">{description}</p>
        <p className="mt-3 flex flex-wrap gap-x-4 gap-y-2 font-sans text-sm font-semibold">
          <Link
            href={plannerHref}
            className={secondaryLinkClass}
            onClick={() => trackClick("planner", plannerHref)}
          >
            Open planner
          </Link>
          <Link
            href={templateHref}
            className={secondaryLinkClass}
            onClick={() => trackClick("template", templateHref)}
          >
            Templates
          </Link>
        </p>
      </aside>
    );
  }

  return (
    <aside
      className={`editorial-cta-block ${className}`.trim()}
      aria-labelledby="itinerary-guide-cta-heading"
    >
      <p className="editorial-kicker mb-3">Trip planning</p>
      <h2
        id="itinerary-guide-cta-heading"
        className="editorial-heading mb-4 text-ink"
      >
        {title}
      </h2>
      <p className="article-body max-w-2xl text-muted">{description}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Link
          href={primaryHref}
          className="editorial-btn-primary editorial-chevron-cta text-center"
          onClick={() => trackClick(primaryType, primaryHref)}
        >
          {primaryLabel}
        </Link>
        <Link
          href={secondaryHref}
          className={`${secondaryLinkClass} editorial-chevron-link sm:px-2`}
          onClick={() => trackClick(secondaryType, secondaryHref)}
        >
          {secondaryLabel}
        </Link>
      </div>
    </aside>
  );
}
