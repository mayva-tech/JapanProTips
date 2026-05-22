import type { GenerateItineraryRequest } from "@/types/itinerary-api";

function slugifyPart(value: string): string {
  return value.toLowerCase().replace(/\s+/g, "-");
}

export function buildItinerarySlug(request: GenerateItineraryRequest): string {
  return [
    slugifyPart(request.startCity),
    request.theme,
    `${request.duration}d`,
    slugifyPart(request.travelStyle),
    request.pace,
  ].join("-");
}

export function buildItineraryId(slug: string): string {
  return `itin-${slug}`;
}

export function buildDefaultItineraryTitle(
  request: GenerateItineraryRequest,
): string {
  return `${request.duration}-Day ${request.theme} trip from ${request.startCity}`;
}

export function buildDeterministicStopId(
  dayNumber: number,
  stopIndex: number,
): string {
  return `d${dayNumber}-s${stopIndex}`;
}
