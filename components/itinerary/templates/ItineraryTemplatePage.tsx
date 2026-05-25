import Link from "next/link";
import { ItineraryTemplateDayOutline } from "@/components/itinerary/templates/ItineraryTemplateDayOutline";
import { ItineraryTemplatePlannerCta } from "@/components/itinerary/templates/ItineraryTemplatePlannerCta";
import { ItineraryTemplateViewTracker } from "@/components/itinerary/templates/ItineraryTemplateViewTracker";
import {
  itineraryDurationLabel,
  itineraryThemeLabel,
  startCityLabel,
  travelPaceLabel,
  travelStyleLabel,
} from "@/lib/itinerary/itinerary-options";
import type { CuratedItineraryTemplate } from "@/lib/itinerary/curated-itinerary-templates";

const PLANNING_DISCLAIMER =
  "Use this as a planning starting point. Always check opening hours and transport details before traveling.";

export function ItineraryTemplatePage({
  template,
}: {
  template: CuratedItineraryTemplate;
}) {
  const viewPayload = {
    templateSlug: template.slug,
    duration: template.duration,
    startCity: template.startCity,
    theme: template.theme,
    pace: template.pace,
  };

  return (
    <>
      <ItineraryTemplateViewTracker payload={viewPayload} />

      <header className="mb-6 max-w-3xl">
        <p className="editorial-kicker mb-3">Curated itinerary</p>
        <h1 className="guide-page-title text-balance">{template.title}</h1>
        <p className="editorial-deck mt-4 max-w-2xl text-pretty">
          {template.description}
        </p>
        <p className="article-body-sm mt-4 rounded-md border border-paper-edge bg-paper-elevated/90 px-3 py-2 text-muted">
          {PLANNING_DISCLAIMER}
        </p>
      </header>

      <section className="mb-6 max-w-3xl rounded-lg border border-paper-edge bg-paper-card/90 p-5 sm:p-6">
        <h2 className="font-display text-xl font-bold text-dark sm:text-2xl">
          Quick trip summary
        </h2>
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 font-sans text-sm sm:grid-cols-3">
          <div>
            <dt className="text-[0.65rem] font-bold uppercase tracking-widest text-rust">
              Duration
            </dt>
            <dd className="font-semibold text-dark">
              {template.outlineDurationLabel ??
                itineraryDurationLabel(template.duration)}
            </dd>
          </div>
          <div>
            <dt className="text-[0.65rem] font-bold uppercase tracking-widest text-rust">
              Start city
            </dt>
            <dd className="font-semibold text-dark">
              {startCityLabel(template.startCity)}
            </dd>
          </div>
          <div>
            <dt className="text-[0.65rem] font-bold uppercase tracking-widest text-rust">
              Theme
            </dt>
            <dd className="font-semibold text-dark">
              {itineraryThemeLabel(template.theme)}
            </dd>
          </div>
          <div>
            <dt className="text-[0.65rem] font-bold uppercase tracking-widest text-rust">
              Style
            </dt>
            <dd className="font-semibold text-dark">
              {travelStyleLabel(template.travelStyle)}
            </dd>
          </div>
          <div>
            <dt className="text-[0.65rem] font-bold uppercase tracking-widest text-rust">
              Pace
            </dt>
            <dd className="font-semibold text-dark">
              {travelPaceLabel(template.pace)}
            </dd>
          </div>
        </dl>
        <p className="article-body-sm mt-4 text-muted">
          <span className="font-bold text-dark">Route: </span>
          {template.routeSummary}
        </p>
      </section>

      <section className="mb-6 max-w-3xl">
        <h2 className="font-display text-xl font-bold text-dark sm:text-2xl">
          Who this is for
        </h2>
        <p className="article-body mt-3 text-muted">{template.audience}</p>
        <p className="article-body-sm mt-3 text-muted">
          <span className="font-bold text-dark">Best for: </span>
          {template.bestFor}
        </p>
      </section>

      {template.plannerNote ? (
        <p className="article-body-sm mb-6 max-w-3xl rounded-md border border-paper-edge bg-paper-elevated/90 px-3 py-2 text-muted">
          {template.plannerNote}
        </p>
      ) : null}

      <section className="mb-6 max-w-3xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <ItineraryTemplatePlannerCta template={template} />
          <Link
            href="/itinerary-templates"
            className="font-sans text-sm font-bold text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
          >
            Browse all templates
          </Link>
        </div>
      </section>

      <section className="mb-6 max-w-3xl space-y-4">
        <h2 className="font-display text-xl font-bold text-dark sm:text-2xl">
          Day-by-day outline
        </h2>
        {template.days.map((day) => (
          <ItineraryTemplateDayOutline key={day.dayNumber} day={day} />
        ))}
      </section>

      {template.practicalNotes.length > 0 ? (
        <section className="mb-6 max-w-3xl">
          <h2 className="font-display text-xl font-bold text-dark sm:text-2xl">
            Practical notes
          </h2>
          <ul className="article-body mt-4 list-disc space-y-2 pl-5 text-muted">
            {template.practicalNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {template.relatedGuideLinks.length > 0 ? (
        <section className="mb-6 max-w-3xl rounded-lg border border-paper-edge bg-paper/80 p-5 sm:p-6">
          <h2 className="font-display text-lg font-bold text-dark">
            Related guides
          </h2>
          <ul className="mt-4 flex flex-col gap-2 font-sans text-sm font-semibold">
            {template.relatedGuideLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
                >
                  {link.label} →
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="max-w-3xl border-t border-paper-edge pt-8">
        {template.plannerNote ? (
          <p className="article-body-sm mb-4 text-muted">{template.plannerNote}</p>
        ) : null}
        <ItineraryTemplatePlannerCta
          template={template}
          label="Open Japan itinerary planner"
        />
      </section>
    </>
  );
}
