import { isGoogleMapsApiConfigured } from "@/lib/google-maps-api";
import { isItineraryStorageConfigured } from "@/lib/itinerary/itinerary-storage";

/** Safe capability flags for deployment checks. Never includes secret values. */
export type ItineraryEnvHealth = {
  openaiConfigured: boolean;
  googleMapsConfigured: boolean;
  upstashConfigured: boolean;
  canGenerateAi: boolean;
  canVerifyPlaces: boolean;
  canEstimateRoutes: boolean;
  canSaveShareLinks: boolean;
};

function envPresent(value: string | undefined): boolean {
  return Boolean(value?.trim());
}

/**
 * Returns boolean capability flags only. Does not call external APIs or expose
 * environment variable values.
 */
export function getItineraryEnvHealth(): ItineraryEnvHealth {
  const openaiConfigured = envPresent(process.env.OPENAI_API_KEY);
  const googleMapsConfigured = isGoogleMapsApiConfigured();
  const upstashConfigured = isItineraryStorageConfigured();

  return {
    openaiConfigured,
    googleMapsConfigured,
    upstashConfigured,
    canGenerateAi: openaiConfigured,
    canVerifyPlaces: googleMapsConfigured,
    canEstimateRoutes: googleMapsConfigured,
    canSaveShareLinks: upstashConfigured,
  };
}
