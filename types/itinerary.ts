export type ItineraryDuration = 1 | 3 | 5 | 7 | 10 | 14;

export type ItineraryTheme =
  | "food"
  | "temples"
  | "anime"
  | "shopping"
  | "photography";

export type TravelStyle = "budget" | "mid-range" | "luxury";

export type TravelPace = "relaxed" | "moderate" | "packed";

export type StartCity =
  | "Tokyo"
  | "Osaka"
  | "Kyoto"
  | "Hiroshima"
  | "Sapporo"
  | "Fukuoka";

export type ItineraryTransportMode =
  | "walk"
  | "transit"
  | "train"
  | "subway"
  | "bus"
  | "taxi"
  | "unknown";

export type TransportLegProvider = "google_routes" | "ai_estimate" | "manual";

export type ItineraryTransportLeg = {
  mode: ItineraryTransportMode;
  durationMinutes: number;
  estimated: boolean;
  instructions?: string;
  provider?: TransportLegProvider;
  lineName?: string;
  transitMode?: string;
  distanceMeters?: number;
  cost?: number | null;
  /** Legacy AI/mock field; normalized to instructions when loading. */
  note?: string;
};

export type PlaceVerificationStatus = "verified" | "unverified" | "skipped";

export type ItineraryStop = {
  id: string;
  name: string;
  description: string;
  category: string;
  estimatedTime: string;
  durationMinutes: number;
  transportToNext: ItineraryTransportLeg | null;
  googlePlaceId?: string;
  googleMapsUri?: string;
  formattedAddress?: string;
  verifiedPlaceName?: string;
  placeVerificationStatus?: PlaceVerificationStatus;
  latitude?: number;
  longitude?: number;
};

export type ItineraryDay = {
  dayNumber: number;
  title: string;
  city: StartCity;
  summary: string;
  stops: ItineraryStop[];
};

export type GeneratedItinerary = {
  id: string;
  slug: string;
  title: string;
  duration: ItineraryDuration;
  startCity: StartCity;
  theme: ItineraryTheme;
  travelStyle: TravelStyle;
  pace: TravelPace;
  days: ItineraryDay[];
};
