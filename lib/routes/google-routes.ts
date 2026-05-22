import { getGoogleMapsApiKey } from "@/lib/google-maps-api";
import type {
  EstimateRouteLegInput,
  EstimatedRouteLegResult,
} from "@/types/route-estimation";
import type { ItineraryTransportMode } from "@/types/itinerary";

const COMPUTE_ROUTES_URL =
  "https://routes.googleapis.com/directions/v2:computeRoutes";

const FIELD_MASK =
  "routes.duration,routes.distanceMeters,routes.legs.steps.travelMode,routes.legs.steps.transitDetails,routes.legs.steps.navigationInstruction";

type ComputeRoutesResponse = {
  routes?: Array<{
    duration?: string;
    distanceMeters?: number;
    legs?: Array<{
      steps?: Array<{
        travelMode?: string;
        navigationInstruction?: { instructions?: string };
        transitDetails?: {
          transitLine?: {
            nameShort?: string;
            name?: string;
            vehicle?: { type?: string; name?: string };
          };
          localizedValues?: unknown;
        };
      }>;
    }>;
  }>;
};

function skippedResult(
  input: EstimateRouteLegInput,
  reason: string,
): EstimatedRouteLegResult {
  return {
    fromName: input.fromName,
    toName: input.toName,
    fromLatitude: input.fromLatitude,
    fromLongitude: input.fromLongitude,
    toLatitude: input.toLatitude,
    toLongitude: input.toLongitude,
    departureTime: input.departureTime,
    status: "skipped",
    reason,
  };
}

function failedResult(
  input: EstimateRouteLegInput,
  reason: string,
): EstimatedRouteLegResult {
  return {
    fromName: input.fromName,
    toName: input.toName,
    fromLatitude: input.fromLatitude,
    fromLongitude: input.fromLongitude,
    toLatitude: input.toLatitude,
    toLongitude: input.toLongitude,
    departureTime: input.departureTime,
    status: "failed",
    reason,
  };
}

/** Parse Google protobuf duration strings like "1234s" into whole minutes (ceil). */
export function parseGoogleDurationToMinutes(duration: string | undefined): number | null {
  if (!duration || typeof duration !== "string") return null;
  const match = /^(\d+)s$/.exec(duration.trim());
  if (!match) return null;
  const seconds = parseInt(match[1], 10);
  if (!Number.isFinite(seconds) || seconds <= 0) return null;
  return Math.max(1, Math.ceil(seconds / 60));
}

function mapVehicleTypeToMode(vehicleType: string | undefined): ItineraryTransportMode {
  switch (vehicleType?.toUpperCase()) {
    case "SUBWAY":
    case "METRO_RAIL":
    case "LIGHT_RAIL":
    case "MONORAIL":
      return "subway";
    case "BUS":
      return "bus";
    case "RAIL":
    case "HEAVY_RAIL":
    case "COMMUTER_TRAIN":
    case "HIGH_SPEED_TRAIN":
    case "LONG_DISTANCE_TRAIN":
      return "train";
    case "TAXI":
      return "taxi";
    default:
      return "transit";
  }
}

function mapStepTravelMode(travelMode: string | undefined): ItineraryTransportMode {
  switch (travelMode?.toUpperCase()) {
    case "WALK":
      return "walk";
    case "TRANSIT":
      return "transit";
    default:
      return "unknown";
  }
}

function extractRouteSummary(route: NonNullable<ComputeRoutesResponse["routes"]>[0]): {
  mode: ItineraryTransportMode;
  instructions?: string;
  lineName?: string;
  transitMode?: string;
} {
  const steps = route.legs?.[0]?.steps ?? [];
  let mode: ItineraryTransportMode = "transit";
  let lineName: string | undefined;
  let transitMode: string | undefined;
  const instructionParts: string[] = [];

  for (const step of steps) {
    const instr = step.navigationInstruction?.instructions?.trim();
    if (instr && instructionParts.length < 2) {
      instructionParts.push(instr);
    }

    if (step.travelMode?.toUpperCase() === "TRANSIT" && step.transitDetails) {
      const line = step.transitDetails.transitLine;
      const vehicleType = line?.vehicle?.type;
      mode = mapVehicleTypeToMode(vehicleType);
      transitMode = vehicleType ?? line?.vehicle?.name;
      lineName =
        line?.nameShort?.trim() ||
        line?.name?.trim() ||
        lineName;
    } else if (step.travelMode?.toUpperCase() === "WALK") {
      if (mode === "transit" && steps.length === 1) {
        mode = "walk";
      }
    }
  }

  if (mode === "transit" && steps.length > 0) {
    const firstMode = mapStepTravelMode(steps[0]?.travelMode);
    if (firstMode !== "unknown") mode = firstMode;
  }

  const instructions =
    instructionParts.length > 0
      ? instructionParts.join(" ")
      : "Estimated transit between stops (not an exact schedule).";

  return { mode, instructions, lineName, transitMode };
}

export async function estimateRouteLegWithGoogle(
  input: EstimateRouteLegInput,
): Promise<EstimatedRouteLegResult> {
  const apiKey = getGoogleMapsApiKey();
  if (!apiKey) {
    return skippedResult(input, "GOOGLE_MAPS_API_KEY is not configured.");
  }

  const body: Record<string, unknown> = {
    origin: {
      location: {
        latLng: {
          latitude: input.fromLatitude,
          longitude: input.fromLongitude,
        },
      },
    },
    destination: {
      location: {
        latLng: {
          latitude: input.toLatitude,
          longitude: input.toLongitude,
        },
      },
    },
    travelMode: "TRANSIT",
    languageCode: "en-US",
    regionCode: "JP",
  };

  if (input.departureTime) {
    body.departureTime = input.departureTime;
  }

  try {
    const response = await fetch(COMPUTE_ROUTES_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": FIELD_MASK,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      return failedResult(
        input,
        `Routes API HTTP ${response.status}${detail ? `: ${detail.slice(0, 200)}` : ""}`,
      );
    }

    const data = (await response.json()) as ComputeRoutesResponse;
    const route = data.routes?.[0];
    if (!route) {
      return failedResult(input, "No route returned for this leg.");
    }

    const durationMinutes = parseGoogleDurationToMinutes(route.duration);
    if (durationMinutes === null) {
      return failedResult(input, "Route duration missing or invalid.");
    }

    const summary = extractRouteSummary(route);

    return {
      fromName: input.fromName,
      toName: input.toName,
      fromLatitude: input.fromLatitude,
      fromLongitude: input.fromLongitude,
      toLatitude: input.toLatitude,
      toLongitude: input.toLongitude,
      departureTime: input.departureTime,
      status: "estimated",
      durationMinutes,
      distanceMeters:
        typeof route.distanceMeters === "number" && route.distanceMeters > 0
          ? route.distanceMeters
          : undefined,
      mode: summary.mode,
      provider: "google_routes",
      instructions: summary.instructions,
      lineName: summary.lineName,
      transitMode: summary.transitMode,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return failedResult(input, message);
  }
}
