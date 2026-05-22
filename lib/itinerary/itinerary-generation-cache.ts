import { Redis } from "@upstash/redis";
import { createGenerateItineraryCacheKey } from "@/lib/itinerary/itinerary-cache-key";
import { parseStoredItinerary } from "@/lib/itinerary/validate-saved-itinerary";
import type { GeneratedItinerary } from "@/types/itinerary";
import type { GenerateItineraryRequest } from "@/types/itinerary-api";
import { isItineraryStorageConfigured } from "@/lib/itinerary/itinerary-storage";

const CACHE_TTL_SECONDS = 24 * 60 * 60;

export function isGenerationCacheConfigured(): boolean {
  return isItineraryStorageConfigured();
}

function getRedisClient(): Redis | null {
  if (!isGenerationCacheConfigured()) {
    return null;
  }
  try {
    return Redis.fromEnv();
  } catch {
    return null;
  }
}

export async function getCachedGeneratedItinerary(
  request: GenerateItineraryRequest,
): Promise<GeneratedItinerary | null> {
  const redis = getRedisClient();
  if (!redis) return null;

  try {
    const key = createGenerateItineraryCacheKey(request);
    const value = await redis.get<unknown>(key);
    if (value === null || value === undefined) {
      return null;
    }
    return parseStoredItinerary(value);
  } catch {
    return null;
  }
}

export async function setCachedGeneratedItinerary(
  request: GenerateItineraryRequest,
  itinerary: GeneratedItinerary,
): Promise<void> {
  const redis = getRedisClient();
  if (!redis) return;

  try {
    const key = createGenerateItineraryCacheKey(request);
    await redis.set(key, itinerary, { ex: CACHE_TTL_SECONDS });
  } catch {
    // Cache write failure must not break generation.
  }
}
