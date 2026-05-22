import type { TravelPace } from "@/types/itinerary";

export const STOPS_PER_PACE: Record<TravelPace, number> = {
  relaxed: 3,
  moderate: 4,
  packed: 5,
};

export function stopsPerDayForPace(pace: TravelPace): number {
  return STOPS_PER_PACE[pace];
}
