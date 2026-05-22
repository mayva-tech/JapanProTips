import { NextRequest, NextResponse } from "next/server";
import { generateItineraryWithOpenAI } from "@/lib/itinerary/generate-itinerary-with-openai";
import {
  getCachedGeneratedItinerary,
  setCachedGeneratedItinerary,
} from "@/lib/itinerary/itinerary-generation-cache";
import { createMockItinerary } from "@/lib/itinerary/mock-itinerary-generator";
import { validateGenerateItineraryRequest } from "@/lib/itinerary/validate-itinerary-request";
import { estimateItineraryRoutes } from "@/lib/itinerary/estimate-itinerary-routes";
import { verifyItineraryPlaces } from "@/lib/itinerary/verify-itinerary-places";
import { checkItineraryGenerateRateLimit } from "@/lib/rate-limit/itinerary-rate-limit";
import type {
  GenerateItineraryErrorResponse,
  GenerateItineraryRequest,
  GenerateItineraryResponse,
} from "@/types/itinerary-api";

export const runtime = "nodejs";

// Flow: validate → rate limit → mock shortcut → OpenAI → Places verify → Routes estimate → cache.
// Falls back to demo itinerary when OPENAI_API_KEY is missing or generation fails.

const AI_FALLBACK_WARNING =
  "AI generation failed, so a demo itinerary was returned instead.";

function mockResponse(
  request: GenerateItineraryRequest,
  warning?: string,
): GenerateItineraryResponse {
  return {
    itinerary: createMockItinerary(request),
    source: "mock",
    cached: false,
    ...(warning ? { warning } : {}),
  };
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json<GenerateItineraryErrorResponse>(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const validated = validateGenerateItineraryRequest(body);
  if (!validated.ok) {
    return NextResponse.json<GenerateItineraryErrorResponse>(
      { error: validated.error },
      { status: 400 },
    );
  }

  const rateLimit = await checkItineraryGenerateRateLimit(request);
  if (!rateLimit.ok) {
    return NextResponse.json<GenerateItineraryErrorResponse>(
      { error: rateLimit.error },
      { status: rateLimit.status },
    );
  }

  const forceMock = request.nextUrl.searchParams.get("mock") === "1";
  if (forceMock) {
    return NextResponse.json(mockResponse(validated.data));
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(mockResponse(validated.data));
  }

  const cached = await getCachedGeneratedItinerary(validated.data);
  if (cached) {
    return NextResponse.json<GenerateItineraryResponse>({
      itinerary: cached,
      source: "openai",
      cached: true,
    });
  }

  try {
    const draft = await generateItineraryWithOpenAI(validated.data);
    const { itinerary: withPlaces, placesWarning } =
      await verifyItineraryPlaces(draft);
    const { itinerary, routesWarning } =
      await estimateItineraryRoutes(withPlaces);
    await setCachedGeneratedItinerary(validated.data, itinerary);

    const warning = [placesWarning, routesWarning].filter(Boolean).join(" ");

    return NextResponse.json<GenerateItineraryResponse>({
      itinerary,
      source: "openai",
      cached: false,
      ...(warning ? { warning } : {}),
    });
  } catch (err) {
    console.error("[itineraries/generate] OpenAI generation failed:", err);
    return NextResponse.json(
      mockResponse(validated.data, AI_FALLBACK_WARNING),
    );
  }
}
