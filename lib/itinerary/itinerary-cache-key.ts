import type { GenerateItineraryRequest } from "@/types/itinerary-api";

const CACHE_PREFIX = "itinerary:generate:";

function normalizeCachePart(value: string | number): string {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function createGenerateItineraryCacheKey(
  request: GenerateItineraryRequest,
): string {
  const parts = [
    normalizeCachePart(request.duration),
    normalizeCachePart(request.startCity),
    normalizeCachePart(request.theme),
    normalizeCachePart(request.travelStyle),
    normalizeCachePart(request.pace),
  ];
  return `${CACHE_PREFIX}${parts.join(":")}`;
}
