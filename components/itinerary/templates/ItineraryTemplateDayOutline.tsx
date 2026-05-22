import type { CuratedTemplateDay } from "@/lib/itinerary/curated-itinerary-templates";

export function ItineraryTemplateDayOutline({ day }: { day: CuratedTemplateDay }) {
  return (
    <section
      className="rounded-lg border border-paper-edge bg-paper/90 p-4 sm:p-5"
      aria-labelledby={`template-day-${day.dayNumber}-heading`}
    >
      <header className="border-b border-paper-edge pb-3">
        <p className="font-sans text-xs font-bold uppercase tracking-widest text-rust">
          Day {day.dayNumber}
          <span className="mx-1.5 text-tan">·</span>
          {day.city}
        </p>
        <h3
          id={`template-day-${day.dayNumber}-heading`}
          className="font-display mt-1 text-lg font-bold text-dark"
        >
          {day.title}
        </h3>
        <p className="article-body-sm mt-2 text-muted">{day.summary}</p>
      </header>
      <ol className="mt-4 list-none space-y-3 pl-0">
        {day.stops.map((stop, index) => (
          <li
            key={`${day.dayNumber}-${index}-${stop.name}`}
            className="border-t border-paper-edge/80 pt-3 first:border-t-0 first:pt-0"
          >
            <p className="font-sans text-xs font-bold uppercase tracking-widest text-muted">
              {stop.estimatedTime ?? "Flexible"}
            </p>
            <p className="font-sans text-sm font-bold text-dark">{stop.name}</p>
            <p className="article-body-sm mt-1 text-muted">{stop.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
