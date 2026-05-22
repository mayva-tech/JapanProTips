import { NextRequest, NextResponse } from "next/server";
import {
  isItineraryStorageConfigured,
  saveItinerary,
} from "@/lib/itinerary/itinerary-storage";
import { validateSavedItineraryBody } from "@/lib/itinerary/validate-saved-itinerary";
import { checkItinerarySaveRateLimit } from "@/lib/rate-limit/itinerary-rate-limit";
import type {
  SaveItineraryErrorResponse,
  SaveItineraryResponse,
} from "@/types/itinerary-api";

export const runtime = "nodejs";

// Persists edited itineraries to Upstash Redis (30-day TTL). Returns 503 when Redis is not configured.

export async function POST(request: NextRequest) {
  const rateLimit = await checkItinerarySaveRateLimit(request);
  if (!rateLimit.ok) {
    return NextResponse.json<SaveItineraryErrorResponse>(
      { error: rateLimit.error },
      { status: rateLimit.status },
    );
  }

  if (!isItineraryStorageConfigured()) {
    return NextResponse.json<SaveItineraryErrorResponse>(
      { error: "Itinerary sharing is not configured yet." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json<SaveItineraryErrorResponse>(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const validated = validateSavedItineraryBody(body);
  if (!validated.ok) {
    return NextResponse.json<SaveItineraryErrorResponse>(
      { error: validated.error },
      { status: 400 },
    );
  }

  try {
    const { slug } = await saveItinerary(validated.data);
    return NextResponse.json<SaveItineraryResponse>({
      slug,
      url: `/itineraries/${slug}`,
    });
  } catch (err) {
    console.error("[itineraries/save] Failed to save itinerary:", err);
    return NextResponse.json<SaveItineraryErrorResponse>(
      { error: "Could not save itinerary. Try again in a moment." },
      { status: 500 },
    );
  }
}
