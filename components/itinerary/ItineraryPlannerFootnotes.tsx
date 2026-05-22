/** Small practical notes for the itinerary planner tool page. */
export function ItineraryPlannerFootnotes() {
  return (
    <aside
      className="mx-auto max-w-3xl rounded-md border border-paper-edge/80 bg-paper/60 px-4 py-3 sm:px-5"
      aria-label="Planner notes"
    >
      <p className="font-sans text-xs font-bold uppercase tracking-widest text-rust">
        Good to know
      </p>
      <ul className="article-body-sm mt-2 list-disc space-y-1.5 pl-5 text-muted">
        <li>
          If AI is unavailable, you may see a demo itinerary instead of a
          personalized outline.
        </li>
        <li>
          Transit times in results are estimates, not live routing or fares.
        </li>
        <li>
          Confirm opening hours, ticket prices, and routes with official sources
          before you travel.
        </li>
        <li>
          Saved share links expire after 30 days when Redis storage is enabled.
        </li>
      </ul>
    </aside>
  );
}
