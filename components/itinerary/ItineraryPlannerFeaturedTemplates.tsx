"use client";

import Link from "next/link";
import { buildPlannerUrl } from "@/lib/itinerary/build-planner-url";
import { getPlannerFeaturedTemplates } from "@/lib/itinerary/curated-itinerary-templates";
import {
  itineraryDurationLabel,
  itineraryThemeLabel,
  startCityLabel,
} from "@/lib/itinerary/itinerary-options";
import { trackItineraryPlannerTemplateCardClick } from "@/lib/itinerary/itinerary-analytics";

const cardLink =
  "group block rounded-md border border-paper-edge bg-paper-card/90 px-4 py-3 transition-colors duration-150 hover:border-rust/40 hover:bg-paper-elevated/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon";

const templates = getPlannerFeaturedTemplates();

export function ItineraryPlannerFeaturedTemplates() {
  if (templates.length === 0) return null;

  return (
    <section
      className="mx-auto mb-6 max-w-3xl rounded-lg border border-paper-edge bg-paper-card/80 p-4 shadow-editorial sm:p-5"
      aria-labelledby="planner-featured-templates-heading"
    >
      <h2
        id="planner-featured-templates-heading"
        className="font-sans text-xs font-bold uppercase tracking-widest text-rust"
      >
        Start with a template
      </h2>
      <p className="article-body-sm mt-2 max-w-2xl text-muted">
        Open a curated outline, then generate your own editable version in the
        planner.
      </p>
      <ul className="mt-4 flex flex-col gap-2">
        {templates.map((template) => {
          const href = buildPlannerUrl(template.plannerDefaults, {
            templateSlug: template.slug,
          });
          const meta = `${itineraryDurationLabel(template.duration)} · ${startCityLabel(template.startCity)} · ${itineraryThemeLabel(template.theme)}`;

          return (
            <li key={template.slug}>
              <Link
                href={href}
                className={cardLink}
                onClick={() =>
                  trackItineraryPlannerTemplateCardClick({
                    templateSlug: template.slug,
                    duration: template.duration,
                    startCity: template.startCity,
                    theme: template.theme,
                    pace: template.pace,
                  })
                }
              >
                <span className="font-sans text-sm font-bold text-dark group-hover:text-maroon">
                  {template.title}
                </span>
                <span className="article-body-sm mt-1 block text-muted">
                  {meta}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <p className="mt-3">
        <Link
          href="/itinerary-templates"
          className="editorial-chevron-link font-sans text-sm font-bold text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
        >
          All curated templates
        </Link>
      </p>
    </section>
  );
}
