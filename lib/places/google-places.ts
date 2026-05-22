import { isGoogleMapsApiConfigured } from "@/lib/google-maps-api";
import type {
  VerifiedPlaceResult,
  VerifyPlaceInput,
} from "@/types/place-verification";

const PLACES_SEARCH_URL =
  "https://places.googleapis.com/v1/places:searchText";

const FIELD_MASK =
  "places.id,places.displayName,places.formattedAddress,places.location,places.googleMapsUri";

type PlacesSearchResponse = {
  places?: Array<{
    id?: string;
    displayName?: { text?: string };
    formattedAddress?: string;
    location?: { latitude?: number; longitude?: number };
    googleMapsUri?: string;
  }>;
};

function buildTextQuery(input: VerifyPlaceInput): string {
  return `${input.originalName} ${input.city} Japan`.trim();
}

function skippedResult(
  input: VerifyPlaceInput,
  reason: string,
): VerifiedPlaceResult {
  return {
    originalName: input.originalName,
    query: buildTextQuery(input),
    city: input.city,
    status: "skipped",
    reason,
  };
}

function unverifiedResult(
  input: VerifyPlaceInput,
  reason: string,
): VerifiedPlaceResult {
  return {
    originalName: input.originalName,
    query: buildTextQuery(input),
    city: input.city,
    status: "unverified",
    reason,
  };
}

export function isGooglePlacesConfigured(): boolean {
  return isGoogleMapsApiConfigured();
}

export async function verifyPlaceWithGoogle(
  input: VerifyPlaceInput,
): Promise<VerifiedPlaceResult> {
  const query = buildTextQuery(input);

  if (!isGooglePlacesConfigured()) {
    return skippedResult(input, "Google Places API key is not configured.");
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY!.trim();

  try {
    const response = await fetch(PLACES_SEARCH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": FIELD_MASK,
      },
      body: JSON.stringify({
        textQuery: query,
        regionCode: "JP",
        languageCode: "en",
        maxResultCount: 1,
      }),
    });

    if (!response.ok) {
      return unverifiedResult(
        input,
        `Places API returned status ${response.status}.`,
      );
    }

    const data = (await response.json()) as PlacesSearchResponse;
    const place = data.places?.[0];

    if (!place?.id) {
      return unverifiedResult(input, "No matching place found.");
    }

    const displayName = place.displayName?.text?.trim();
    const latitude = place.location?.latitude;
    const longitude = place.location?.longitude;

    return {
      originalName: input.originalName,
      query,
      city: input.city,
      status: "verified",
      googlePlaceId: place.id,
      googleMapsUri: place.googleMapsUri,
      formattedAddress: place.formattedAddress,
      displayName: displayName || undefined,
      latitude:
        typeof latitude === "number" && Number.isFinite(latitude)
          ? latitude
          : undefined,
      longitude:
        typeof longitude === "number" && Number.isFinite(longitude)
          ? longitude
          : undefined,
    };
  } catch {
    return unverifiedResult(input, "Places API request failed.");
  }
}
