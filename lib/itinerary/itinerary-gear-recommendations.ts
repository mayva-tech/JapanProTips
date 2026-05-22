import { getRecommendationsByIds } from "@/lib/recommendations";
import type { ResolvedRecommendation } from "@/lib/recommendations";
import type { ItineraryTheme, TravelPace } from "@/types/itinerary";

/** GA4 `recommendation_click` context for itinerary gear items. */
export const ITINERARY_GEAR_ANALYTICS_CONTEXT = "japan-itinerary-planner";

const CORE_GEAR_IDS = [
  "travel-umbrella",
  "power-bank-20000",
  "universal-travel-adapter",
  "quick-dry-towel",
  "ic-card-holder",
] as const;

const THEME_GEAR_IDS: Record<ItineraryTheme, readonly string[]> = {
  food: [
    "quick-dry-towel",
    "ic-card-holder",
    "travel-umbrella",
    "power-bank-20000",
    "universal-travel-adapter",
  ],
  temples: [
    "travel-umbrella",
    "quick-dry-towel",
    "ic-card-holder",
    "power-bank-20000",
    "universal-travel-adapter",
  ],
  photography: [
    "power-bank-20000",
    "travel-umbrella",
    "universal-travel-adapter",
    "quick-dry-towel",
    "ic-card-holder",
  ],
  shopping: [
    "ic-card-holder",
    "foldable-duffel",
    "travel-umbrella",
    "power-bank-20000",
    "universal-travel-adapter",
  ],
  anime: CORE_GEAR_IDS,
};

const PACKED_PACE_PRIORITY = ["power-bank-20000", "ic-card-holder"] as const;

/** Short, itinerary-specific reasons (catalog copy stays the source of truth for titles). */
export const ITINERARY_GEAR_REASONS: Partial<Record<string, string>> = {
  "travel-umbrella":
    "Rain between stops is common. A compact umbrella keeps you moving without buying a new one at every konbini.",
  "power-bank-20000":
    "Navigation, tickets, and photos add up on transit-heavy days. A charged bank beats hunting outlets at stations.",
  "universal-travel-adapter":
    "Japan uses Type A outlets. A slim adapter helps if any charger from home still needs a different plug shape.",
  "quick-dry-towel":
    "Useful after long food walks, humid afternoons, or hotels where a small towel is not in the room.",
  "ic-card-holder":
    "Separate your Suica or PASMO from credit cards so gate taps stay quick when you rush between stops.",
  "foldable-duffel":
    "Extra room for finds without reshuffling your main bag when a shopping stop runs long.",
};

export function getItineraryGearRecommendationIds(
  theme: ItineraryTheme,
  pace: TravelPace,
): string[] {
  const themed = [...THEME_GEAR_IDS[theme]];
  if (pace !== "packed") {
    return themed;
  }
  const prioritySet = new Set<string>(PACKED_PACE_PRIORITY);
  const prioritized = themed.filter((id) => prioritySet.has(id));
  const rest = themed.filter((id) => !prioritySet.has(id));
  return [...prioritized, ...rest];
}

export function getItineraryGearRecommendations(
  theme: ItineraryTheme,
  pace: TravelPace,
): ResolvedRecommendation[] {
  return getRecommendationsByIds(getItineraryGearRecommendationIds(theme, pace));
}

export function itineraryGearReason(item: ResolvedRecommendation): string {
  return ITINERARY_GEAR_REASONS[item.id] ?? item.operationalReason;
}
