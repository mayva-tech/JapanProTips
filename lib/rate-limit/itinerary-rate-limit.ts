import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import type { NextRequest } from "next/server";
import { isItineraryStorageConfigured } from "@/lib/itinerary/itinerary-storage";

export type RateLimitResult =
  | { ok: true }
  | { ok: false; status: 429; error: string };

const GENERATE_ERROR =
  "Too many itinerary requests. Please try again later.";
const SAVE_ERROR = "Too many save attempts. Please try again later.";

let generateLimiter: Ratelimit | null | undefined;
let saveLimiter: Ratelimit | null | undefined;

function getClientIdentifier(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  const cfConnecting = request.headers.get("cf-connecting-ip")?.trim();
  if (cfConnecting) return cfConnecting;

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  return "anonymous";
}

function getGenerateLimiter(): Ratelimit | null {
  if (!isItineraryStorageConfigured()) return null;
  if (generateLimiter === undefined) {
    try {
      generateLimiter = new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(5, "10 m"),
        prefix: "ratelimit:itinerary:generate",
        analytics: false,
      });
    } catch {
      generateLimiter = null;
    }
  }
  return generateLimiter;
}

function getSaveLimiter(): Ratelimit | null {
  if (!isItineraryStorageConfigured()) return null;
  if (saveLimiter === undefined) {
    try {
      saveLimiter = new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(20, "10 m"),
        prefix: "ratelimit:itinerary:save",
        analytics: false,
      });
    } catch {
      saveLimiter = null;
    }
  }
  return saveLimiter;
}

async function checkLimit(
  limiter: Ratelimit | null,
  identifier: string,
  errorMessage: string,
): Promise<RateLimitResult> {
  if (!limiter) {
    return { ok: true };
  }

  try {
    const result = await limiter.limit(identifier);
    if (!result.success) {
      return { ok: false, status: 429, error: errorMessage };
    }
    return { ok: true };
  } catch {
    return { ok: true };
  }
}

export async function checkItineraryGenerateRateLimit(
  request: NextRequest,
): Promise<RateLimitResult> {
  const identifier = getClientIdentifier(request);
  return checkLimit(getGenerateLimiter(), identifier, GENERATE_ERROR);
}

export async function checkItinerarySaveRateLimit(
  request: NextRequest,
): Promise<RateLimitResult> {
  const identifier = getClientIdentifier(request);
  return checkLimit(getSaveLimiter(), identifier, SAVE_ERROR);
}
