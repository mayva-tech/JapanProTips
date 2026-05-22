import { Redis } from "@upstash/redis";
import type { GeneratedItinerary } from "@/types/itinerary";
import {
  isValidItinerarySlug,
  parseStoredItinerary,
} from "@/lib/itinerary/validate-saved-itinerary";

const TTL_SECONDS = 30 * 24 * 60 * 60;

const NOT_CONFIGURED_MESSAGE = "Itinerary sharing is not configured.";

function storageKey(slug: string): string {
  return `itinerary:${slug}`;
}

export function isItineraryStorageConfigured(): boolean {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL &&
      process.env.UPSTASH_REDIS_REST_TOKEN,
  );
}

function getRedisClient(): Redis {
  if (!isItineraryStorageConfigured()) {
    throw new Error(NOT_CONFIGURED_MESSAGE);
  }
  return Redis.fromEnv();
}

export async function saveItinerary(
  itinerary: GeneratedItinerary,
): Promise<{ slug: string }> {
  const slug = itinerary.slug.trim();
  if (!isValidItinerarySlug(slug)) {
    throw new Error("Itinerary slug is invalid.");
  }

  const redis = getRedisClient();
  await redis.set(storageKey(slug), itinerary, { ex: TTL_SECONDS });
  return { slug };
}

export async function getItineraryBySlug(
  slug: string,
): Promise<GeneratedItinerary | null> {
  if (!isValidItinerarySlug(slug)) {
    return null;
  }

  if (!isItineraryStorageConfigured()) {
    return null;
  }

  try {
    const redis = getRedisClient();
    const value = await redis.get<unknown>(storageKey(slug));
    if (value === null || value === undefined) {
      return null;
    }
    return parseStoredItinerary(value);
  } catch {
    return null;
  }
}
