import type { GenerateItineraryRequest } from "@/types/itinerary-api";
import type {
  ItineraryDuration,
  ItineraryTheme,
  StartCity,
  TravelPace,
  TravelStyle,
} from "@/types/itinerary";
import {
  ITINERARY_DURATIONS,
  ITINERARY_PACES,
  ITINERARY_START_CITIES,
  ITINERARY_THEMES,
  ITINERARY_TRAVEL_STYLES,
} from "@/lib/itinerary/itinerary-options";

const DURATIONS = new Set<ItineraryDuration>(
  ITINERARY_DURATIONS.map((o) => o.value),
);

const CITIES = new Set<StartCity>(ITINERARY_START_CITIES.map((o) => o.value));

const THEMES = new Set<ItineraryTheme>(ITINERARY_THEMES.map((o) => o.value));

const STYLES = new Set<TravelStyle>(
  ITINERARY_TRAVEL_STYLES.map((o) => o.value),
);

const PACES = new Set<TravelPace>(ITINERARY_PACES.map((o) => o.value));

export type ValidateItineraryRequestResult =
  | { ok: true; data: GenerateItineraryRequest }
  | { ok: false; error: string };

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseDuration(value: unknown): ItineraryDuration | null {
  if (typeof value === "number" && Number.isInteger(value)) {
    return DURATIONS.has(value as ItineraryDuration)
      ? (value as ItineraryDuration)
      : null;
  }
  if (typeof value === "string" && /^\d+$/.test(value)) {
    const n = Number(value);
    return DURATIONS.has(n as ItineraryDuration)
      ? (n as ItineraryDuration)
      : null;
  }
  return null;
}

function parseEnum<T extends string>(
  value: unknown,
  allowed: Set<T>,
  field: string,
): T | { error: string } {
  if (typeof value !== "string" || value.trim() === "") {
    return { error: `${field} must be a string.` };
  }
  if (!allowed.has(value as T)) {
    return { error: `${field} is not a supported value.` };
  }
  return value as T;
}

export function validateGenerateItineraryRequest(
  input: unknown,
): ValidateItineraryRequestResult {
  if (!isPlainObject(input)) {
    return { ok: false, error: "Request body must be a JSON object." };
  }

  const duration = parseDuration(input.duration);
  if (duration === null) {
    return { ok: false, error: "duration must be 1, 3, 5, 7, 10, or 14." };
  }

  const startCityResult = parseEnum(
    input.startCity,
    CITIES,
    "startCity",
  );
  if (typeof startCityResult === "object" && "error" in startCityResult) {
    return { ok: false, error: startCityResult.error };
  }
  const startCity = startCityResult;

  const themeResult = parseEnum(input.theme, THEMES, "theme");
  if (typeof themeResult === "object" && "error" in themeResult) {
    return { ok: false, error: themeResult.error };
  }
  const theme = themeResult;

  const travelStyleResult = parseEnum(
    input.travelStyle,
    STYLES,
    "travelStyle",
  );
  if (
    typeof travelStyleResult === "object" &&
    "error" in travelStyleResult
  ) {
    return { ok: false, error: travelStyleResult.error };
  }
  const travelStyle = travelStyleResult;

  const paceResult = parseEnum(input.pace, PACES, "pace");
  if (typeof paceResult === "object" && "error" in paceResult) {
    return { ok: false, error: paceResult.error };
  }
  const pace = paceResult;

  return {
    ok: true,
    data: {
      duration,
      startCity,
      theme,
      travelStyle,
      pace,
    },
  };
}
