import type { GenerateItineraryRequest } from "@/types/itinerary-api";
import { stopsPerDayForPace } from "@/lib/itinerary/itinerary-pace";

const START_CITIES = [
  "Tokyo",
  "Osaka",
  "Kyoto",
  "Hiroshima",
  "Sapporo",
  "Fukuoka",
] as const;

const TRANSPORT_MODES = ["walk", "train", "subway", "bus", "tram"] as const;

/**
 * OpenAI strict JSON schema for the raw model draft (normalized server-side).
 */
export function getItineraryAiJsonSchema(request: GenerateItineraryRequest) {
  const stopCount = stopsPerDayForPace(request.pace);

  return {
    type: "object",
    additionalProperties: false,
    required: ["title", "days"],
    properties: {
      title: { type: "string" },
      days: {
        type: "array",
        minItems: request.duration,
        maxItems: request.duration,
        items: {
          type: "object",
          additionalProperties: false,
          required: ["dayNumber", "title", "city", "summary", "stops"],
          properties: {
            dayNumber: { type: "integer" },
            title: { type: "string" },
            city: { type: "string", enum: [...START_CITIES] },
            summary: { type: "string" },
            stops: {
              type: "array",
              minItems: stopCount,
              maxItems: stopCount,
              items: {
                type: "object",
                additionalProperties: false,
                required: [
                  "name",
                  "description",
                  "category",
                  "estimatedStartTime",
                  "durationMinutes",
                  "transportToNext",
                ],
                properties: {
                  name: { type: "string" },
                  description: { type: "string" },
                  category: { type: "string" },
                  estimatedStartTime: { type: "string" },
                  durationMinutes: { type: "integer" },
                  transportToNext: {
                    anyOf: [
                      { type: "null" },
                      {
                        type: "object",
                        additionalProperties: false,
                        required: ["mode", "durationMinutes", "note"],
                        properties: {
                          mode: {
                            type: "string",
                            enum: [...TRANSPORT_MODES],
                          },
                          durationMinutes: { type: "integer" },
                          note: { type: "string" },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
    },
  } as const;
}
