"use client";

import Link from "next/link";
import { buildPlannerUrl } from "@/lib/itinerary/build-planner-url";
import type { CuratedItineraryTemplate } from "@/lib/itinerary/curated-itinerary-templates";
import { trackItineraryTemplatePlannerCtaClick } from "@/lib/itinerary/itinerary-analytics";

const primaryBtn =
  "inline-flex w-full items-center justify-center rounded-md bg-maroon px-6 py-3.5 font-sans text-sm font-bold uppercase tracking-widest text-white transition-colors duration-150 hover:bg-rust sm:w-auto";

export function ItineraryTemplatePlannerCta({
  template,
  label = "Build this itinerary in the planner",
}: {
  template: CuratedItineraryTemplate;
  label?: string;
}) {
  const href = buildPlannerUrl(template.plannerDefaults, {
    templateSlug: template.slug,
  });

  return (
    <Link
      href={href}
      className={primaryBtn}
      onClick={() =>
        trackItineraryTemplatePlannerCtaClick({
          templateSlug: template.slug,
          duration: template.duration,
          startCity: template.startCity,
          theme: template.theme,
          pace: template.pace,
        })
      }
    >
      {label}
    </Link>
  );
}
