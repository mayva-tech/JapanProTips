import type {
  ItineraryDuration,
  ItineraryTheme,
  StartCity,
  TravelPace,
  TravelStyle,
} from "@/types/itinerary";
import type { GenerateItineraryRequest } from "@/types/itinerary-api";

export type ItineraryOption<T extends string | number> = {
  value: T;
  label: string;
  description?: string;
};

export const ITINERARY_DURATIONS: ItineraryOption<ItineraryDuration>[] = [
  {
    value: 1,
    label: "1 day",
    description: "One focused day in a single city.",
  },
  {
    value: 3,
    label: "3 days",
    description: "Long weekend in one city or a nearby day trip.",
  },
  {
    value: 5,
    label: "5 days",
    description: "Short trip: one city depth or two nearby hubs.",
  },
  {
    value: 7,
    label: "7 days",
    description: "Classic first-trip length with one or two city changes.",
  },
  {
    value: 10,
    label: "10 days",
    description: "Tokyo, Kyoto, Osaka, and one buffer or side trip.",
  },
  {
    value: 14,
    label: "14 days",
    description: "Slower multi-region loop with buffer days built in.",
  },
];

export const ITINERARY_DURATION_VALUES: readonly ItineraryDuration[] =
  ITINERARY_DURATIONS.map((o) => o.value);

export const ITINERARY_START_CITIES: ItineraryOption<StartCity>[] = [
  {
    value: "Tokyo",
    label: "Tokyo",
    description: "Base for neighborhoods, day trips, and east Japan hops.",
  },
  {
    value: "Osaka",
    label: "Osaka",
    description: "Kansai food hub with easy Kyoto and Nara access.",
  },
  {
    value: "Kyoto",
    label: "Kyoto",
    description: "Temple districts, river walks, and slower pacing.",
  },
  {
    value: "Hiroshima",
    label: "Hiroshima",
    description: "Peace Park, local food, and Miyajima day trip.",
  },
  {
    value: "Sapporo",
    label: "Sapporo",
    description: "Hokkaido gateway for markets, parks, and seasonal food.",
  },
  {
    value: "Fukuoka",
    label: "Fukuoka",
    description: "Kyushu street food base with short hops to Dazaifu or beaches.",
  },
];

export const ITINERARY_THEMES: ItineraryOption<ItineraryTheme>[] = [
  {
    value: "food",
    label: "Food",
    description: "Markets, ramen, kissaten, and neighborhood snack walks.",
  },
  {
    value: "temples",
    label: "Temples",
    description: "Shrines, gardens, and calmer morning blocks.",
  },
  {
    value: "anime",
    label: "Anime",
    description: "Shops, cafés, and themed districts without marathon queues.",
  },
  {
    value: "shopping",
    label: "Shopping",
    description: "Department stores, local streets, and one tax-free stop.",
  },
  {
    value: "photography",
    label: "Photography",
    description: "Golden-hour viewpoints and walkable scenic loops.",
  },
];

export const ITINERARY_TRAVEL_STYLES: ItineraryOption<TravelStyle>[] = [
  {
    value: "budget",
    label: "Budget",
    description: "Conbini breakfasts, business hotels, and local trains.",
  },
  {
    value: "mid-range",
    label: "Mid-range",
    description: "Mix of casual restaurants and comfortable transit.",
  },
  {
    value: "luxury",
    label: "Luxury",
    description: "Longer sit-down meals, taxis when tired, and nicer stays.",
  },
];

export const ITINERARY_PACES: ItineraryOption<TravelPace>[] = [
  {
    value: "relaxed",
    label: "Relaxed",
    description: "Three stops per day with wide buffers.",
  },
  {
    value: "moderate",
    label: "Moderate",
    description: "Four stops per day, still room for a slow lunch.",
  },
  {
    value: "packed",
    label: "Packed",
    description: "Five stops per day. Best if you like early starts.",
  },
];

const durationLabels = Object.fromEntries(
  ITINERARY_DURATIONS.map((o) => [o.value, o.label]),
) as Record<ItineraryDuration, string>;

const cityLabels = Object.fromEntries(
  ITINERARY_START_CITIES.map((o) => [o.value, o.label]),
) as Record<StartCity, string>;

const themeLabels = Object.fromEntries(
  ITINERARY_THEMES.map((o) => [o.value, o.label]),
) as Record<ItineraryTheme, string>;

const styleLabels = Object.fromEntries(
  ITINERARY_TRAVEL_STYLES.map((o) => [o.value, o.label]),
) as Record<TravelStyle, string>;

const paceLabels = Object.fromEntries(
  ITINERARY_PACES.map((o) => [o.value, o.label]),
) as Record<TravelPace, string>;

export function itineraryDurationLabel(d: ItineraryDuration): string {
  return durationLabels[d];
}

export function startCityLabel(c: StartCity): string {
  return cityLabels[c];
}

export function itineraryThemeLabel(t: ItineraryTheme): string {
  return themeLabels[t];
}

export function travelStyleLabel(s: TravelStyle): string {
  return styleLabels[s];
}

export function travelPaceLabel(p: TravelPace): string {
  return paceLabels[p];
}

export function formatItineraryRequestSummary(
  req: GenerateItineraryRequest,
): string {
  return [
    itineraryDurationLabel(req.duration),
    `starting in ${startCityLabel(req.startCity)}`,
    itineraryThemeLabel(req.theme),
    travelStyleLabel(req.travelStyle),
    `${travelPaceLabel(req.pace)} pace`,
  ].join(", ");
}
