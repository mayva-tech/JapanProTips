import { NextResponse } from "next/server";
import { getItineraryEnvHealth } from "@/lib/itinerary/itinerary-env-health";

export const runtime = "nodejs";

/** Deployment sanity check: boolean capability flags only, no external API calls. */
export async function GET() {
  return NextResponse.json(getItineraryEnvHealth());
}
