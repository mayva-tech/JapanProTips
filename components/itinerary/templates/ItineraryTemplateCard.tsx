import Link from "next/link";
import {
  itineraryDurationLabel,
  itineraryThemeLabel,
  startCityLabel,
  travelPaceLabel,
} from "@/lib/itinerary/itinerary-options";
import type { CuratedItineraryTemplate } from "@/lib/itinerary/curated-itinerary-templates";

export function ItineraryTemplateCard({
  template,
}: {
  template: CuratedItineraryTemplate;
}) {
  return (
    <li className="min-h-0">
      <Link
        href={`/itinerary-templates/${template.slug}`}
        className="flex h-full flex-col rounded-lg border border-paper-edge bg-paper-card/90 p-5 shadow-editorial transition-colors duration-150 hover:border-rust/35 hover:bg-paper sm:p-6"
      >
        <p className="font-sans text-xs font-bold uppercase tracking-widest text-rust">
          {template.outlineDurationLabel ??
            itineraryDurationLabel(template.duration)}
          <span className="mx-1.5 text-tan">·</span>
          {startCityLabel(template.startCity)}
        </p>
        <h2 className="font-display mt-2 text-lg font-bold leading-snug text-dark sm:text-xl">
          {template.title}
        </h2>
        <p className="article-body-sm mt-2 flex-1 leading-relaxed text-muted">
          {template.description}
        </p>
        <p className="article-body-sm mt-3 font-sans text-xs font-semibold text-muted">
          {itineraryThemeLabel(template.theme)} · {travelPaceLabel(template.pace)}
        </p>
        <span className="editorial-chevron-link mt-4 font-sans text-sm font-bold text-rust">
          View outline
        </span>
      </Link>
    </li>
  );
}
