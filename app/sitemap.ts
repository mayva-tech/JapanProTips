import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const STATIC_PATHS = [
  "/",
  "/start-here",
  "/tourists",
  "/residents",
  "/residents/open-bank-account-japan",
  "/residents/sim-card-japan-residents",
  "/residents/pay-bills-japan",
  "/residents/ic-card-japan",
  "/residents/renting-apartment-japan",
  "/resources/moving-to-japan-checklist",
  "/guides/start-here-japan",
  "/guides/sim-card-japan",
  "/guides/japan-phone-plans",
  "/guides/do-you-need-sim-japan",
  "/guides/esim-vs-pocket-wifi-japan",
  "/guides/airalo-vs-ubigi-japan",
  "/guides/japan-airport-to-city",
  "/guides/japan-airport-first-steps",
  "/guides/japan-transportation",
  "/guides/japan-budget-breakdown",
  "/guides/japan-living-cost",
  "/guides/japan-bank-account",
  "/guides/renting-apartment-japan",
  "/guides/part-time-jobs-japan",
  "/guides/narita-to-tokyo",
  "/guides/haneda-to-tokyo",
  "/guides/japan-trains",
  "/guides/suica-vs-pasmo",
  "/guides/suica-pasmo-guide",
  "/guides/japan-train-mistakes",
  "/guides/where-to-stay-tokyo",
  "/guides/best-area-tokyo-first-time",
  "/guides/shinjuku-vs-shibuya",
  "/guides/where-to-stay-japan",
  "/guides/japan-itinerary",
  "/guides/japan-packing-list",
  "/guides/getting-around-japan",
  "/guides/money-payments-japan",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const now = new Date();
  return STATIC_PATHS.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/guides/") ? 0.8 : 0.7,
  }));
}
