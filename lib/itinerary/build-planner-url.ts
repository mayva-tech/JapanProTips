import { getCuratedItineraryTemplateBySlug } from "@/lib/itinerary/curated-itinerary-templates";
import { ITINERARY_DURATION_VALUES } from "@/lib/itinerary/itinerary-options";
import type { GenerateItineraryRequest } from "@/types/itinerary-api";
import type {
  ItineraryDuration,
  ItineraryTheme,
  StartCity,
  TravelPace,
  TravelStyle,
} from "@/types/itinerary";

export const PLANNER_PATH = "/tools/japan-itinerary-planner";

const TEMPLATE_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const DURATIONS = new Set<ItineraryDuration>(ITINERARY_DURATION_VALUES);
const CITIES = new Set<StartCity>([
  "Tokyo",
  "Osaka",
  "Kyoto",
  "Hiroshima",
  "Sapporo",
  "Fukuoka",
]);
const THEMES = new Set<ItineraryTheme>([
  "food",
  "temples",
  "anime",
  "shopping",
  "photography",
]);
const STYLES = new Set<TravelStyle>(["budget", "mid-range", "luxury"]);
const PACES = new Set<TravelPace>(["relaxed", "moderate", "packed"]);

function isDuration(value: string): value is `${ItineraryDuration}` {
  const n = Number(value);
  return DURATIONS.has(n as ItineraryDuration);
}

export type BuildPlannerUrlOptions = {
  templateSlug?: string;
};

function isValidTemplateSlug(slug: string): boolean {
  const trimmed = slug.trim();
  if (
    !TEMPLATE_SLUG_PATTERN.test(trimmed) ||
    trimmed.length < 3 ||
    trimmed.length > 160
  ) {
    return false;
  }
  return Boolean(getCuratedItineraryTemplateBySlug(trimmed));
}

/** Build planner URL with optional prefill query params and curated template source. */
export function buildPlannerUrl(
  defaults?: Partial<GenerateItineraryRequest>,
  options?: BuildPlannerUrlOptions,
): string {
  const params = new URLSearchParams();

  if (defaults) {
    if (
      defaults.duration !== undefined &&
      DURATIONS.has(defaults.duration)
    ) {
      params.set("duration", String(defaults.duration));
    }
    if (defaults.startCity && CITIES.has(defaults.startCity)) {
      params.set("startCity", defaults.startCity);
    }
    if (defaults.theme && THEMES.has(defaults.theme)) {
      params.set("theme", defaults.theme);
    }
    if (defaults.travelStyle && STYLES.has(defaults.travelStyle)) {
      params.set("travelStyle", defaults.travelStyle);
    }
    if (defaults.pace && PACES.has(defaults.pace)) {
      params.set("pace", defaults.pace);
    }
  }

  const templateSlug = options?.templateSlug?.trim();
  if (templateSlug && isValidTemplateSlug(templateSlug)) {
    params.set("templateSlug", templateSlug);
  }

  const query = params.toString();
  return query ? `${PLANNER_PATH}?${query}` : PLANNER_PATH;
}

/** Parse planner prefill from URL search params (client-safe). */
export function parsePlannerPrefillFromSearchParams(
  searchParams: URLSearchParams,
): Partial<GenerateItineraryRequest> | null {
  const partial: Partial<GenerateItineraryRequest> = {};
  let hasAny = false;

  const duration = searchParams.get("duration");
  if (duration && isDuration(duration)) {
    partial.duration = Number(duration) as ItineraryDuration;
    hasAny = true;
  }

  const startCity = searchParams.get("startCity");
  if (startCity && CITIES.has(startCity as StartCity)) {
    partial.startCity = startCity as StartCity;
    hasAny = true;
  }

  const theme = searchParams.get("theme");
  if (theme && THEMES.has(theme as ItineraryTheme)) {
    partial.theme = theme as ItineraryTheme;
    hasAny = true;
  }

  const travelStyle = searchParams.get("travelStyle");
  if (travelStyle && STYLES.has(travelStyle as TravelStyle)) {
    partial.travelStyle = travelStyle as TravelStyle;
    hasAny = true;
  }

  const pace = searchParams.get("pace");
  if (pace && PACES.has(pace as TravelPace)) {
    partial.pace = pace as TravelPace;
    hasAny = true;
  }

  return hasAny ? partial : null;
}

/** Returns a known curated template slug from search params, or null if invalid. */
export function parseTemplateSlugFromSearchParams(
  searchParams: URLSearchParams,
): string | null {
  const raw = searchParams.get("templateSlug");
  if (!raw) return null;
  const trimmed = raw.trim();
  return isValidTemplateSlug(trimmed) ? trimmed : null;
}
