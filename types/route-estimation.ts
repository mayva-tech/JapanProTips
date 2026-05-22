import type { ItineraryTransportMode, TransportLegProvider } from "@/types/itinerary";

export type RouteEstimationStatus = "estimated" | "skipped" | "failed";

export type EstimateRouteLegInput = {
  fromName: string;
  toName: string;
  fromLatitude: number;
  fromLongitude: number;
  toLatitude: number;
  toLongitude: number;
  departureTime?: string;
};

export type EstimatedRouteLegResult = {
  fromName: string;
  toName: string;
  fromLatitude: number;
  fromLongitude: number;
  toLatitude: number;
  toLongitude: number;
  departureTime?: string;
  status: RouteEstimationStatus;
  durationMinutes?: number;
  distanceMeters?: number;
  mode?: ItineraryTransportMode;
  provider?: TransportLegProvider;
  instructions?: string;
  lineName?: string;
  transitMode?: string;
  reason?: string;
};
