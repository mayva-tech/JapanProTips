const DOES = [
  "Builds a practical Japan itinerary from your selected trip style",
  "Verifies many places through Google Places when configured",
  "Estimates travel time between nearby stops when possible",
  "Lets you edit, save, share, and export PDF",
] as const;

const DOES_NOT = [
  "Guarantee opening hours",
  "Guarantee real-time train schedules",
  "Replace official ticket or hotel booking sites",
  "Optimize every route like a professional travel agent",
] as const;

export function ItineraryPlannerLimitations() {
  return (
    <section
      className="mx-auto max-w-3xl rounded-lg border border-paper-edge bg-paper/70 px-4 py-4 sm:px-5 sm:py-5"
      aria-labelledby="planner-limitations-heading"
    >
      <h2
        id="planner-limitations-heading"
        className="font-sans text-xs font-bold uppercase tracking-widest text-rust"
      >
        What this planner does and does not do
      </h2>
      <div className="mt-4 grid gap-5 sm:grid-cols-2">
        <div>
          <h3 className="font-sans text-[0.65rem] font-bold uppercase tracking-widest text-dark">
            Does
          </h3>
          <ul className="article-body-sm mt-2 list-disc space-y-1.5 pl-5 text-muted">
            {DOES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-sans text-[0.65rem] font-bold uppercase tracking-widest text-dark">
            Does not
          </h3>
          <ul className="article-body-sm mt-2 list-disc space-y-1.5 pl-5 text-muted">
            {DOES_NOT.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
