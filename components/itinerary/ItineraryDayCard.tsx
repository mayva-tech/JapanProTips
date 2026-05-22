import type { ItineraryDay } from "@/types/itinerary";
import { ItineraryStopCard } from "@/components/itinerary/ItineraryStopCard";
import {
  calculateDayTotalMinutes,
  formatDayTotalMinutes,
  type StopMoveDirection,
} from "@/lib/itinerary/edit-itinerary";

export function ItineraryDayCard({
  day,
  readOnly = false,
  onMoveStop,
  onRemoveStop,
}: {
  day: ItineraryDay;
  readOnly?: boolean;
  onMoveStop?: (
    dayNumber: number,
    stopId: string,
    direction: StopMoveDirection,
  ) => void;
  onRemoveStop?: (dayNumber: number, stopId: string) => void;
}) {
  const totalMinutes = calculateDayTotalMinutes(day);
  const totalLabel = formatDayTotalMinutes(totalMinutes);

  return (
    <section
      className="rounded-md border border-paper-edge bg-paper-card/80 p-3 shadow-editorial sm:p-4"
      aria-labelledby={`day-${day.dayNumber}-heading`}
    >
      <header className="border-b border-maroon/15 pb-2.5">
        <p className="font-sans text-xs font-bold uppercase tracking-widest text-rust">
          Day {day.dayNumber}
          <span className="mx-1.5 text-tan">·</span>
          {day.city}
        </p>
        <h3
          id={`day-${day.dayNumber}-heading`}
          className="editorial-heading mt-1 text-lg text-dark sm:text-xl"
        >
          {day.title}
        </h3>
        {day.summary ? (
          <p className="article-body-sm mt-2 leading-relaxed text-muted">
            {day.summary}
          </p>
        ) : null}
        {day.stops.length > 0 ? (
          <p className="article-body-sm mt-2 font-sans text-xs font-semibold text-muted">
            Rough day total: {totalLabel} (stops plus estimated transit)
          </p>
        ) : null}
      </header>

      {day.stops.length === 0 ? (
        <p className="article-body-sm mt-4 rounded-md border border-dashed border-paper-edge bg-paper/60 px-3 py-4 text-center text-muted">
          No stops left for this day.
        </p>
      ) : (
        <ol className="mt-3 space-y-2.5" aria-label={`Day ${day.dayNumber} stops`}>
          {day.stops.map((stop, index) => (
            <li key={stop.id}>
              <ItineraryStopCard
                stop={stop}
                stopIndex={index}
                totalStops={day.stops.length}
                readOnly={readOnly}
                onMove={
                  readOnly || !onMoveStop
                    ? undefined
                    : (direction) =>
                        onMoveStop(day.dayNumber, stop.id, direction)
                }
                onRemove={
                  readOnly || !onRemoveStop
                    ? undefined
                    : () => onRemoveStop(day.dayNumber, stop.id)
                }
              />
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
