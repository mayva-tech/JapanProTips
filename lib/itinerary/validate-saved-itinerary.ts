import type { GeneratedItinerary } from "@/types/itinerary";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isValidItinerarySlug(slug: string): boolean {
  return SLUG_PATTERN.test(slug) && slug.length >= 3 && slug.length <= 160;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export type ValidateSavedItineraryResult =
  | { ok: true; data: GeneratedItinerary }
  | { ok: false; error: string };

export function validateSavedItineraryBody(
  input: unknown,
): ValidateSavedItineraryResult {
  if (!isPlainObject(input)) {
    return { ok: false, error: "Request body must be a JSON object." };
  }

  const slug =
    typeof input.slug === "string" ? input.slug.trim() : "";
  if (!isValidItinerarySlug(slug)) {
    return { ok: false, error: "Itinerary slug is missing or invalid." };
  }

  const title =
    typeof input.title === "string" ? input.title.trim() : "";
  if (!title) {
    return { ok: false, error: "Itinerary title is required." };
  }

  if (!Array.isArray(input.days) || input.days.length < 1) {
    return { ok: false, error: "Itinerary must include at least one day." };
  }

  for (const day of input.days) {
    if (!isPlainObject(day)) {
      return { ok: false, error: "Each day must be an object." };
    }
    if (!Array.isArray(day.stops)) {
      return { ok: false, error: "Each day must include a stops array." };
    }
  }

  return { ok: true, data: input as GeneratedItinerary };
}

export function parseStoredItinerary(value: unknown): GeneratedItinerary | null {
  const validated = validateSavedItineraryBody(value);
  return validated.ok ? validated.data : null;
}
