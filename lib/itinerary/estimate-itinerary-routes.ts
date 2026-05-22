import { isGoogleMapsApiConfigured } from "@/lib/google-maps-api";
import {
  aiEstimateTransportLeg,
  normalizeTransportLeg,
} from "@/lib/itinerary/transport-leg";
import { estimateRouteLegWithGoogle } from "@/lib/routes/google-routes";
import type { EstimatedRouteLegResult } from "@/types/route-estimation";
import type {
  GeneratedItinerary,
  ItineraryTransportLeg,
} from "@/types/itinerary";

export const MAX_ROUTE_LEGS_PER_ITINERARY = 20;

const ROUTES_PARTIAL_WARNING =
  "Some travel times are estimated or could not be verified.";

function hasValidCoordinates(
  latitude: number | undefined,
  longitude: number | undefined,
): boolean {
  return (
    typeof latitude === "number" &&
    Number.isFinite(latitude) &&
    typeof longitude === "number" &&
    Number.isFinite(longitude)
  );
}

function legFromGoogleResult(
  result: EstimatedRouteLegResult,
  fallback: ItineraryTransportLeg | null,
  fromName: string,
  toName: string,
): ItineraryTransportLeg {
  if (result.status !== "estimated" || !result.durationMinutes) {
    return aiEstimateTransportLeg(fallback, fromName, toName);
  }

  return normalizeTransportLeg({
    mode: result.mode ?? "transit",
    durationMinutes: result.durationMinutes,
    estimated: true,
    provider: "google_routes",
    instructions:
      result.instructions ??
      `Estimated travel from ${fromName} to ${toName} (not an exact schedule).`,
    lineName: result.lineName,
    transitMode: result.transitMode,
    distanceMeters: result.distanceMeters,
    cost: null,
  })!;
}

export type EstimateItineraryRoutesResult = {
  itinerary: GeneratedItinerary;
  routesWarning?: string;
  googleRouteCalls: number;
  partialFailure: boolean;
};

export async function estimateItineraryRoutes(
  itinerary: GeneratedItinerary,
): Promise<EstimateItineraryRoutesResult> {
  if (!isGoogleMapsApiConfigured()) {
    const normalized = normalizeItineraryTransportOnly(itinerary);
    return {
      itinerary: normalized,
      googleRouteCalls: 0,
      partialFailure: false,
    };
  }

  let googleRouteCalls = 0;
  let partialFailure = false;

  const days = [];
  for (const day of itinerary.days) {
    const stops = [...day.stops];
    for (let i = 0; i < stops.length; i++) {
        const isLast = i === stops.length - 1;
        if (isLast) {
          stops[i] = { ...stops[i], transportToNext: null };
          continue;
        }

        const from = stops[i];
        const to = stops[i + 1];
        const fallback = normalizeTransportLeg(from.transportToNext);

        if (
          !hasValidCoordinates(from.latitude, from.longitude) ||
          !hasValidCoordinates(to.latitude, to.longitude)
        ) {
          stops[i] = {
            ...from,
            transportToNext: aiEstimateTransportLeg(fallback, from.name, to.name),
          };
          if (fallback?.provider === "google_routes") {
            partialFailure = true;
          }
          continue;
        }

        if (googleRouteCalls >= MAX_ROUTE_LEGS_PER_ITINERARY) {
          stops[i] = {
            ...from,
            transportToNext: aiEstimateTransportLeg(fallback, from.name, to.name),
          };
          continue;
        }

        googleRouteCalls += 1;
        const result = await estimateRouteLegWithGoogle({
          fromName: from.name,
          toName: to.name,
          fromLatitude: from.latitude!,
          fromLongitude: from.longitude!,
          toLatitude: to.latitude!,
          toLongitude: to.longitude!,
        });

        if (result.status !== "estimated") {
          partialFailure = true;
        }

        stops[i] = {
          ...from,
          transportToNext: legFromGoogleResult(result, fallback, from.name, to.name),
        };
    }

    days.push({ ...day, stops });
  }

  return {
    itinerary: { ...itinerary, days },
    routesWarning: partialFailure ? ROUTES_PARTIAL_WARNING : undefined,
    googleRouteCalls,
    partialFailure,
  };
}

/** Normalize transport legs without calling Google Routes. */
function normalizeItineraryTransportOnly(
  itinerary: GeneratedItinerary,
): GeneratedItinerary {
  const days = itinerary.days.map((day) => ({
    ...day,
    stops: day.stops.map((stop, index) => {
      const isLast = index === day.stops.length - 1;
      return {
        ...stop,
        transportToNext: isLast
          ? null
          : normalizeTransportLeg(stop.transportToNext) ??
            aiEstimateTransportLeg(null, stop.name, day.stops[index + 1]?.name ?? "next stop"),
      };
    }),
  }));
  return { ...itinerary, days };
}
