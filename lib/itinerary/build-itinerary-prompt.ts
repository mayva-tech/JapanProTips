import type { GenerateItineraryRequest } from "@/types/itinerary-api";
import type { ItineraryDuration } from "@/types/itinerary";
import {
  ITINERARY_DURATIONS,
  ITINERARY_PACES,
  ITINERARY_START_CITIES,
  ITINERARY_THEMES,
  ITINERARY_TRAVEL_STYLES,
} from "@/lib/itinerary/itinerary-options";
import { stopsPerDayForPace } from "@/lib/itinerary/itinerary-pace";

function labelFor<T extends string | number>(
  options: { value: T; label: string }[],
  value: T,
): string {
  return options.find((o) => o.value === value)?.label ?? String(value);
}

function durationPlanningGuidance(duration: ItineraryDuration): string {
  switch (duration) {
    case 1:
      return "Single-day plan: keep all stops in one city with minimal cross-town hops.";
    case 3:
      return "Three-day plan: stay within one city or add one nearby day trip only. Avoid multi-region Shinkansen hops.";
    case 5:
      return "Five-day plan: favor one city depth, or connect two nearby cities (example: Tokyo + Kyoto) only if pacing allows one clear transfer day.";
    case 7:
      return "Seven-day plan: classic Tokyo–Kyoto–Osaka flow with realistic Shinkansen travel days and buffer time.";
    case 10:
      return "Ten-day plan: cover Tokyo, Kyoto, and Osaka with one side trip or buffer day. Do not pack every prefecture.";
    case 14:
      return "Fourteen-day plan: broader golden-route style loop (Tokyo, Hakone or Kamakura, Kyoto, Osaka, Hiroshima optional) with slower pacing.";
    default:
      return "Match the selected duration without adding extra travel days.";
  }
}

export function buildItineraryPrompt(request: GenerateItineraryRequest): string {
  const stopsPerDay = stopsPerDayForPace(request.pace);
  const durationLabel = labelFor(ITINERARY_DURATIONS, request.duration);
  const cityLabel = labelFor(ITINERARY_START_CITIES, request.startCity);
  const themeLabel = labelFor(ITINERARY_THEMES, request.theme);
  const styleLabel = labelFor(ITINERARY_TRAVEL_STYLES, request.travelStyle);
  const paceLabel = labelFor(ITINERARY_PACES, request.pace);

  return [
    "You are planning a practical Japan trip outline for JapanProTips.",
    "JapanProTips is an independent field-guide style travel site, not a travel agency.",
    "",
    "Trip inputs (must match exactly in structure and count):",
    `- Duration: ${durationLabel} (${request.duration} day(s) total in the days array)`,
    `- Start city: ${cityLabel}`,
    `- Main theme: ${themeLabel}`,
    `- Travel style: ${styleLabel}`,
    `- Daily pace: ${paceLabel} (${stopsPerDay} stops per day)`,
    "",
    "Duration guidance:",
    `- ${durationPlanningGuidance(request.duration)}`,
    "",
    "Output rules:",
    `- Return exactly ${request.duration} day object(s) in the days array.`,
    `- Each day must include exactly ${stopsPerDay} stops.`,
    "- Day 1 should anchor in the start city unless a same-day regional hop is realistic.",
    "- Use practical sequencing: cluster nearby areas, avoid impossible cross-country hops in one day.",
    "- Tone: useful, specific, calm, field-guide style. No hype or generic filler.",
    "- Stop descriptions should mention what to do, timing buffers, and style fit (budget, mid-range, luxury).",
    "- Categories should be short snake_case labels (example: market, temple, neighborhood, meal, shopping, photo_spot).",
    "- estimatedStartTime is a rough clock hint (example: 9:00), not a guaranteed opening hour.",
    "- durationMinutes is time on site, not including full transit time.",
    "- transportToNext between stops must be marked as approximate. Notes should say estimates may vary.",
    "- Do not provide exact train schedules, exact fares, exact opening hours, or real-time routing.",
    "- Do not claim verified hours or guaranteed route accuracy.",
    "- Allowed cities in the city field: Tokyo, Osaka, Kyoto, Hiroshima, Sapporo, Fukuoka only.",
    "- Transport modes: walk, train, subway, bus, tram only.",
    "- For multi-day trips, vary cities sensibly (example: Tokyo start, then Kyoto/Osaka) without over-packing transit.",
    "- Last stop of each day must set transportToNext to null.",
    "- Title should be a concise trip headline reflecting duration, theme, and start city.",
  ].join("\n");
}
