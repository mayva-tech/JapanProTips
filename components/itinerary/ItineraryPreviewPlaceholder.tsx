import { formatItineraryRequestSummary } from "@/lib/itinerary/itinerary-options";
import { friendlyGenerateErrorMessage } from "@/lib/itinerary/itinerary-user-messages";
import type { GenerateItineraryRequest } from "@/types/itinerary-api";

export function ItineraryPreviewPlaceholder({
  request,
  error,
}: {
  request: GenerateItineraryRequest;
  error?: string | null;
}) {
  const summary = formatItineraryRequestSummary(request);
  const friendlyError = error ? friendlyGenerateErrorMessage(error) : null;

  return (
    <section
      id="itinerary-preview"
      className="rounded-lg border border-dashed border-rust/35 bg-paper-elevated/90 p-6 shadow-inner sm:p-8"
      aria-labelledby="itinerary-preview-heading"
    >
      <p className="font-sans text-xs font-bold uppercase tracking-widest text-rust">
        {friendlyError ? "Could not build itinerary" : "Preview"}
      </p>
      <h2
        id="itinerary-preview-heading"
        className="editorial-heading mt-3 text-xl text-dark sm:text-2xl"
      >
        {friendlyError
          ? "Your itinerary did not generate"
          : "Your itinerary is on the way"}
      </h2>
      {friendlyError ? (
        <p className="article-body mt-3 max-w-2xl text-pretty text-maroon">
          {friendlyError}
        </p>
      ) : (
        <p className="article-body mt-3 max-w-2xl text-pretty text-muted">
          Generating your outline for: {summary}.
        </p>
      )}
      <p className="article-body-sm mt-4 max-w-2xl leading-relaxed text-muted">
        {friendlyError ? (
          <>
            Try again with the same settings, or choose a shorter trip and a
            slower pace. You can also{" "}
            <span className="font-semibold text-dark">
              start from a curated template
            </span>{" "}
            above if you want a proven starting point.
          </>
        ) : (
          "This usually takes a few seconds. If AI is unavailable, a demo itinerary is returned instead."
        )}
      </p>
    </section>
  );
}
