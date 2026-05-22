import type { GenerateItineraryRequest } from "@/types/itinerary-api";
import { normalizeTransportLeg } from "@/lib/itinerary/transport-leg";
import type {
  GeneratedItinerary,
  ItineraryDay,
  ItineraryStop,
  ItineraryTransportLeg,
  StartCity,
} from "@/types/itinerary";
import {
  ITINERARY_DURATION_VALUES,
  ITINERARY_START_CITIES,
  ITINERARY_THEMES,
  ITINERARY_TRAVEL_STYLES,
  ITINERARY_PACES,
} from "@/lib/itinerary/itinerary-options";
import {
  buildDefaultItineraryTitle,
  buildDeterministicStopId,
  buildItineraryId,
  buildItinerarySlug,
} from "@/lib/itinerary/itinerary-identifiers";
import { stopsPerDayForPace } from "@/lib/itinerary/itinerary-pace";

const ALLOWED_CITIES = new Set<StartCity>(
  ITINERARY_START_CITIES.map((o) => o.value),
);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`AI itinerary missing valid ${field}.`);
  }
  return value.trim();
}

function readPositiveInt(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 1) {
    throw new Error(`AI itinerary missing valid ${field}.`);
  }
  return value;
}

function parseCity(value: unknown): StartCity {
  const city = readString(value, "city");
  if (!ALLOWED_CITIES.has(city as StartCity)) {
    throw new Error(`AI itinerary city "${city}" is not supported.`);
  }
  return city as StartCity;
}

function parseTransportLeg(value: unknown): ItineraryTransportLeg | null {
  if (value === null || value === undefined) return null;
  if (!isRecord(value)) {
    throw new Error("AI itinerary transportToNext must be an object or null.");
  }
  const durationMinutes = readPositiveInt(
    value.durationMinutes,
    "transport durationMinutes",
  );
  const note =
    typeof value.note === "string" && value.note.trim() !== ""
      ? value.note.trim()
      : typeof value.instructions === "string" && value.instructions.trim() !== ""
        ? value.instructions.trim()
        : "Transfer between stops.";
  return normalizeTransportLeg({
    mode: typeof value.mode === "string" ? value.mode : undefined,
    durationMinutes,
    estimated: value.estimated !== false,
    instructions: note,
    provider: "ai_estimate",
    note,
  });
}

function defaultCategory(theme: GenerateItineraryRequest["theme"]): string {
  switch (theme) {
    case "food":
      return "meal";
    case "temples":
      return "temple";
    case "anime":
      return "anime";
    case "shopping":
      return "shopping";
    case "photography":
      return "photo_spot";
    default:
      return "sightseeing";
  }
}

function parseStop(
  raw: unknown,
  dayNumber: number,
  stopIndex: number,
  isLast: boolean,
  request: GenerateItineraryRequest,
): ItineraryStop {
  if (!isRecord(raw)) {
    throw new Error(`AI itinerary stop ${stopIndex} on day ${dayNumber} is invalid.`);
  }

  const name = readString(raw.name, "stop name");
  const description = readString(raw.description, "stop description");
  const category =
    typeof raw.category === "string" && raw.category.trim() !== ""
      ? raw.category.trim()
      : defaultCategory(request.theme);
  const estimatedTime = readString(
    raw.estimatedStartTime ?? raw.estimatedTime,
    "estimatedStartTime",
  );
  const durationMinutes = readPositiveInt(
    raw.durationMinutes,
    "stop durationMinutes",
  );

  let transportToNext: ItineraryTransportLeg | null = null;
  if (!isLast) {
    transportToNext = parseTransportLeg(raw.transportToNext);
    if (!transportToNext) {
      transportToNext = normalizeTransportLeg({
        mode: "walk",
        durationMinutes: 10,
        estimated: true,
        provider: "ai_estimate",
        instructions:
          "Short transfer between stops (approximate estimate, not a live route.)",
      });
    }
  }

  return {
    id: buildDeterministicStopId(dayNumber, stopIndex),
    name,
    description,
    category,
    estimatedTime,
    durationMinutes,
    transportToNext,
  };
}

function parseDay(
  raw: unknown,
  expectedDayNumber: number,
  request: GenerateItineraryRequest,
): ItineraryDay {
  if (!isRecord(raw)) {
    throw new Error(`AI itinerary day ${expectedDayNumber} is invalid.`);
  }

  const dayNumber = readPositiveInt(raw.dayNumber, "dayNumber");
  if (dayNumber !== expectedDayNumber) {
    throw new Error(
      `AI itinerary day numbers must be sequential. Expected ${expectedDayNumber}, got ${dayNumber}.`,
    );
  }

  const title = readString(raw.title, "day title");
  const city = parseCity(raw.city);
  const summary = readString(raw.summary, "day summary");

  if (!Array.isArray(raw.stops)) {
    throw new Error(`AI itinerary day ${dayNumber} must include stops.`);
  }

  const rawStops = raw.stops;
  const expectedStops = stopsPerDayForPace(request.pace);
  if (rawStops.length !== expectedStops) {
    throw new Error(
      `AI itinerary day ${dayNumber} must have ${expectedStops} stops for ${request.pace} pace.`,
    );
  }

  const stops = rawStops.map((stop, index) =>
    parseStop(
      stop,
      dayNumber,
      index + 1,
      index === rawStops.length - 1,
      request,
    ),
  );

  return { dayNumber, title, city, summary, stops };
}

export function normalizeAiItinerary(
  input: unknown,
  request: GenerateItineraryRequest,
): GeneratedItinerary {
  if (!isRecord(input)) {
    throw new Error("AI itinerary response must be a JSON object.");
  }

  if (!Array.isArray(input.days)) {
    throw new Error("AI itinerary must include a days array.");
  }

  if (input.days.length !== request.duration) {
    throw new Error(
      `AI itinerary must include exactly ${request.duration} day(s).`,
    );
  }

  const title =
    typeof input.title === "string" && input.title.trim() !== ""
      ? input.title.trim()
      : buildDefaultItineraryTitle(request);

  const days = input.days.map((day, index) =>
    parseDay(day, index + 1, request),
  );

  const slug = buildItinerarySlug(request);

  return {
    id: buildItineraryId(slug),
    slug,
    title,
    duration: request.duration,
    startCity: request.startCity,
    theme: request.theme,
    travelStyle: request.travelStyle,
    pace: request.pace,
    days,
  };
}

/** Guard request enums match known options (defensive). */
export function assertRequestEnums(request: GenerateItineraryRequest): void {
  const durations = new Set(ITINERARY_DURATION_VALUES);
  const themes = new Set(ITINERARY_THEMES.map((o) => o.value));
  const styles = new Set(ITINERARY_TRAVEL_STYLES.map((o) => o.value));
  const paces = new Set(ITINERARY_PACES.map((o) => o.value));
  if (
    !durations.has(request.duration) ||
    !themes.has(request.theme) ||
    !styles.has(request.travelStyle) ||
    !paces.has(request.pace)
  ) {
    throw new Error("Invalid itinerary request enums.");
  }
}
