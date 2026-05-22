import {
  isGooglePlacesConfigured,
  verifyPlaceWithGoogle,
} from "@/lib/places/google-places";
import type { GeneratedItinerary, ItineraryStop } from "@/types/itinerary";
import type { VerifiedPlaceResult } from "@/types/place-verification";

const MAX_VERIFICATIONS_PER_ITINERARY = 20;

export type VerifyItineraryPlacesResult = {
  itinerary: GeneratedItinerary;
  placesWarning?: string;
};

function isValidCoordinate(value: number | undefined): boolean {
  return typeof value === "number" && Number.isFinite(value);
}

function applyVerificationToStop(
  stop: ItineraryStop,
  result: VerifiedPlaceResult,
): ItineraryStop {
  const next: ItineraryStop = {
    ...stop,
    placeVerificationStatus: result.status,
  };

  if (result.status === "verified") {
    if (result.googlePlaceId) next.googlePlaceId = result.googlePlaceId;
    if (result.googleMapsUri) next.googleMapsUri = result.googleMapsUri;
    if (result.formattedAddress) next.formattedAddress = result.formattedAddress;
    if (result.displayName) next.verifiedPlaceName = result.displayName;

    if (
      isValidCoordinate(result.latitude) &&
      !isValidCoordinate(stop.latitude)
    ) {
      next.latitude = result.latitude;
    }
    if (
      isValidCoordinate(result.longitude) &&
      !isValidCoordinate(stop.longitude)
    ) {
      next.longitude = result.longitude;
    }
  }

  return next;
}

function markStopSkipped(stop: ItineraryStop): ItineraryStop {
  return {
    ...stop,
    placeVerificationStatus: "skipped",
  };
}

export async function verifyItineraryPlaces(
  itinerary: GeneratedItinerary,
): Promise<VerifyItineraryPlacesResult> {
  const next = structuredClone(itinerary);
  let verifiedCount = 0;
  let hadUnverified = false;

  if (!isGooglePlacesConfigured()) {
    return { itinerary: next };
  }

  for (const day of next.days) {
    for (let i = 0; i < day.stops.length; i++) {
      const stop = day.stops[i];

      if (verifiedCount >= MAX_VERIFICATIONS_PER_ITINERARY) {
        day.stops[i] = markStopSkipped(stop);
        continue;
      }

      verifiedCount += 1;
      const result = await verifyPlaceWithGoogle({
        originalName: stop.name,
        city: day.city,
      });

      if (result.status === "unverified") {
        hadUnverified = true;
      }

      day.stops[i] = applyVerificationToStop(stop, result);
    }
  }

  return {
    itinerary: next,
    ...(hadUnverified
      ? { placesWarning: "Some places could not be verified." }
      : {}),
  };
}
