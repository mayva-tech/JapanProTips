import type { GeneratedItinerary } from "@/types/itinerary";
import type {
  ItineraryDuration,
  ItineraryTheme,
  StartCity,
  TravelPace,
  TravelStyle,
} from "@/types/itinerary";

export type GenerateItineraryRequest = {
  duration: ItineraryDuration;
  startCity: StartCity;
  theme: ItineraryTheme;
  travelStyle: TravelStyle;
  pace: TravelPace;
};

export type GenerateItineraryResponse = {
  itinerary: GeneratedItinerary;
  source: "mock" | "openai";
  cached: boolean;
  warning?: string;
};

export type GenerateItineraryErrorResponse = {
  error: string;
};

export type SaveItineraryResponse = {
  slug: string;
  url: string;
};

export type SaveItineraryErrorResponse = {
  error: string;
};
