import { normalizeTransportLeg } from "@/lib/itinerary/transport-leg";
import type { ItineraryStop, ItineraryTransportMode } from "@/types/itinerary";
import type { StopMoveDirection } from "@/lib/itinerary/edit-itinerary";

const TRANSPORT_MODE_LABELS: Record<ItineraryTransportMode, string> = {
  walk: "Walk",
  transit: "Transit",
  train: "Train",
  subway: "Subway",
  bus: "Bus",
  taxi: "Taxi",
  unknown: "Transfer",
};

const PROVIDER_LABELS = {
  google_routes: "Google estimate",
  ai_estimate: "AI estimate",
  manual: "Manual estimate",
} as const;

const editBtn =
  "inline-flex min-h-[36px] min-w-[2.75rem] items-center justify-center rounded border border-paper-edge bg-paper px-2.5 py-1.5 font-sans text-[0.65rem] font-bold uppercase tracking-wider text-dark transition-colors duration-150 hover:border-rust/45 hover:bg-paper-elevated disabled:cursor-not-allowed disabled:opacity-40";

function formatCategory(category: string): string {
  return category.replace(/_/g, " ");
}

function transportInstructions(stop: ItineraryStop): string | undefined {
  const leg = normalizeTransportLeg(stop.transportToNext);
  return leg?.instructions ?? leg?.note;
}

export function ItineraryStopCard({
  stop,
  stopIndex,
  totalStops,
  readOnly = false,
  onMove,
  onRemove,
}: {
  stop: ItineraryStop;
  stopIndex: number;
  totalStops: number;
  readOnly?: boolean;
  onMove?: (direction: StopMoveDirection) => void;
  onRemove?: () => void;
}) {
  const isFirst = stopIndex === 0;
  const isLast = stopIndex === totalStops - 1;
  const transport = normalizeTransportLeg(stop.transportToNext);

  return (
    <article
      className="rounded-md border border-paper-edge bg-paper/90 p-2.5 sm:p-3"
      aria-labelledby={`stop-${stop.id}-name`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="font-sans text-[0.65rem] font-bold uppercase tracking-widest text-rust">
            {stop.estimatedTime}
            <span className="mx-1 text-tan">·</span>
            <span className="text-muted">{formatCategory(stop.category)}</span>
            <span className="mx-1 text-tan">·</span>
            <span className="text-muted">{stop.durationMinutes} min on site</span>
          </p>
          <h4
            id={`stop-${stop.id}-name`}
            className="font-display mt-1 break-words text-base font-bold leading-snug text-dark"
          >
            {stop.name}
          </h4>
        </div>
        {!readOnly && onMove && onRemove ? (
          <div
            className="flex shrink-0 flex-wrap gap-1"
            role="group"
            aria-label={`Edit ${stop.name}`}
          >
            <button
              type="button"
              className={editBtn}
              onClick={() => onMove("up")}
              disabled={isFirst}
              aria-label={`Move ${stop.name} up`}
            >
              Up
            </button>
            <button
              type="button"
              className={editBtn}
              onClick={() => onMove("down")}
              disabled={isLast}
              aria-label={`Move ${stop.name} down`}
            >
              Down
            </button>
            <button
              type="button"
              className={editBtn}
              onClick={onRemove}
              aria-label={`Remove ${stop.name}`}
            >
              Remove
            </button>
          </div>
        ) : null}
      </div>

      <p className="article-body-sm mt-1.5 leading-relaxed text-muted">
        {stop.description}
      </p>

      {(stop.placeVerificationStatus === "verified" ||
        stop.placeVerificationStatus === "unverified" ||
        stop.googleMapsUri) && (
        <p className="article-body-sm mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-[0.65rem]">
          {stop.placeVerificationStatus === "verified" ? (
            <span className="font-bold uppercase tracking-widest text-maroon">
              Verified place
            </span>
          ) : null}
          {stop.placeVerificationStatus === "unverified" ? (
            <span className="font-semibold uppercase tracking-wide text-muted">
              Unverified
            </span>
          ) : null}
          {stop.googleMapsUri ? (
            <a
              href={stop.googleMapsUri}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all font-semibold text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
            >
              Maps
            </a>
          ) : null}
        </p>
      )}
      {stop.formattedAddress && stop.placeVerificationStatus === "verified" ? (
        <p className="article-body-sm mt-1 break-words text-muted">
          {stop.formattedAddress}
        </p>
      ) : null}

      {transport ? (
        <div className="article-body-sm mt-1.5 rounded border border-paper-edge/80 bg-paper-elevated/60 px-2 py-1.5 text-muted">
          <p className="font-sans text-[0.65rem] font-bold uppercase tracking-widest text-rust">
            Estimated travel to next stop
          </p>
          <p className="mt-1">
            {TRANSPORT_MODE_LABELS[transport.mode]} · about{" "}
            {transport.durationMinutes} min
          </p>
          {transport.provider ? (
            <p className="mt-1 font-sans text-[0.6rem] text-tan">
              {PROVIDER_LABELS[transport.provider]}
            </p>
          ) : null}
          {transport.lineName ? (
            <p className="mt-1 font-sans text-xs font-semibold text-dark">
              {transport.lineName}
            </p>
          ) : null}
          {transportInstructions(stop) ? (
            <p className="mt-1 leading-relaxed">{transportInstructions(stop)}</p>
          ) : null}
          {typeof transport.cost === "number" && transport.cost > 0 ? (
            <p className="mt-1 font-sans text-xs font-semibold text-dark">
              About ¥{transport.cost.toLocaleString()}
            </p>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
