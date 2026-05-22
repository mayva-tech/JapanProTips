import type {
  GeneratedItinerary,
  ItineraryDay,
  ItineraryStop,
} from "@/types/itinerary";

export type StopMoveDirection = "up" | "down";

function cloneItinerary(itinerary: GeneratedItinerary): GeneratedItinerary {
  return structuredClone(itinerary);
}

function normalizeDayStopsTransport(day: ItineraryDay): ItineraryDay {
  const stops: ItineraryStop[] = day.stops.map((stop, index) => {
    const isLast = index === day.stops.length - 1;
    if (isLast) {
      return { ...stop, transportToNext: null };
    }
    return { ...stop };
  });
  return { ...day, stops };
}

/** Sum on-site time plus approximate transit between stops. */
export function calculateDayTotalMinutes(day: ItineraryDay): number {
  return day.stops.reduce((sum, stop, index) => {
    const transit =
      index < day.stops.length - 1
        ? (stop.transportToNext?.durationMinutes ?? 0)
        : 0;
    return sum + stop.durationMinutes + transit;
  }, 0);
}

export function formatDayTotalMinutes(totalMinutes: number): string {
  if (totalMinutes <= 0) return "No time estimate";
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `About ${minutes} min`;
  if (minutes === 0) return `About ${hours} hr`;
  return `About ${hours} hr ${minutes} min`;
}

export function recalculateItineraryAfterEdit(
  itinerary: GeneratedItinerary,
): GeneratedItinerary {
  const next = cloneItinerary(itinerary);
  return {
    ...next,
    days: next.days.map((day) => normalizeDayStopsTransport(day)),
  };
}

export function moveStopWithinDay(
  itinerary: GeneratedItinerary,
  dayNumber: number,
  stopId: string,
  direction: StopMoveDirection,
): GeneratedItinerary {
  const next = cloneItinerary(itinerary);
  const dayIndex = next.days.findIndex((d) => d.dayNumber === dayNumber);
  if (dayIndex < 0) return next;

  const day = next.days[dayIndex];
  const stopIndex = day.stops.findIndex((s) => s.id === stopId);
  if (stopIndex < 0) return next;

  const targetIndex = direction === "up" ? stopIndex - 1 : stopIndex + 1;
  if (targetIndex < 0 || targetIndex >= day.stops.length) return next;

  const stops = [...day.stops];
  [stops[stopIndex], stops[targetIndex]] = [stops[targetIndex], stops[stopIndex]];

  next.days[dayIndex] = { ...day, stops };
  return recalculateItineraryAfterEdit(next);
}

export function removeStopFromDay(
  itinerary: GeneratedItinerary,
  dayNumber: number,
  stopId: string,
): GeneratedItinerary {
  const next = cloneItinerary(itinerary);
  const dayIndex = next.days.findIndex((d) => d.dayNumber === dayNumber);
  if (dayIndex < 0) return next;

  const day = next.days[dayIndex];
  const stops = day.stops.filter((s) => s.id !== stopId);
  if (stops.length === day.stops.length) return next;

  next.days[dayIndex] = { ...day, stops };
  return recalculateItineraryAfterEdit(next);
}
