import OpenAI from "openai";
import type { GenerateItineraryRequest } from "@/types/itinerary-api";
import type { GeneratedItinerary } from "@/types/itinerary";
import { buildItineraryPrompt } from "@/lib/itinerary/build-itinerary-prompt";
import { getItineraryAiJsonSchema } from "@/lib/itinerary/itinerary-ai-schema";
import {
  assertRequestEnums,
  normalizeAiItinerary,
} from "@/lib/itinerary/normalize-ai-itinerary";

function getOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }
  return new OpenAI({ apiKey });
}

export async function generateItineraryWithOpenAI(
  request: GenerateItineraryRequest,
): Promise<GeneratedItinerary> {
  assertRequestEnums(request);

  const client = getOpenAIClient();
  const model = process.env.OPENAI_MODEL ?? "gpt-4.1-mini";

  const completion = await client.chat.completions.create({
    model,
    temperature: 0.4,
    messages: [
      {
        role: "system",
        content:
          "You produce practical Japan travel itineraries for JapanProTips. Follow the user rules exactly. Return JSON only.",
      },
      {
        role: "user",
        content: buildItineraryPrompt(request),
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "japan_itinerary_draft",
        strict: true,
        schema: getItineraryAiJsonSchema(request) as Record<string, unknown>,
      },
    },
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("OpenAI returned empty itinerary content.");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error("OpenAI returned invalid JSON.");
  }

  return normalizeAiItinerary(parsed, request);
}
