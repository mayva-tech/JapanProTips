/**
 * Canonical visitor guide slugs under /guides (live page.tsx routes).
 * Excludes resident guides (moved to /residents), MDX sandboxes, and redirect-only stubs.
 */
export const VISITOR_GUIDE_SLUGS = [
  "start-here-japan",
  "japan-tourist-mistakes",
  "japan-cultural-mistakes",
  "japan-travel-insurance",
  "japan-itinerary",
  "japan-packing-list",
  "how-to-use-japanese-toilets",
  "japan-restaurant-guide",
  "japan-breakfast-cafe-guide",
  "japan-onsen-guide",
  "japan-nightlife-guide",
  "japan-weather-by-month",
  "japan-rainy-season-guide",
  "japan-airport-first-steps",
  "japan-airport-to-city",
  "japan-luggage-shipping",
  "japan-coin-lockers",
  "japan-post-office-guide",
  "narita-to-tokyo",
  "haneda-to-tokyo",
  "sim-card-japan",
  "japan-apps-guide",
  "do-you-need-sim-japan",
  "esim-vs-pocket-wifi-japan",
  "airalo-vs-ubigi-japan",
  "getting-around-japan",
  "japan-trains",
  "jr-pass-worth-it",
  "shinkansen-guide",
  "japan-transportation",
  "japan-train-mistakes",
  "suica-vs-pasmo",
  "suica-pasmo-guide",
  "money-payments-japan",
  "japan-cash-vs-card",
  "japan-budget-breakdown",
  "japan-convenience-store-guide",
  "japan-conbini-food-guide",
  "japan-vending-machines",
  "japan-drugstore-guide",
  "japan-tax-free-shopping",
  "japan-anime-shopping-guide",
  "where-to-stay-japan",
  "where-to-stay-tokyo",
  "where-to-stay-kyoto",
  "where-to-stay-osaka",
  "best-area-tokyo-first-time",
  "shinjuku-vs-shibuya",
] as const;

export const VISITOR_GUIDE_COUNT = VISITOR_GUIDE_SLUGS.length;

export const RESIDENT_GUIDE_SLUGS_REDIRECTED_FROM_GUIDES = [
  "japan-phone-plans",
  "japan-living-cost",
  "japan-bank-account",
  "renting-apartment-japan",
  "part-time-jobs-japan",
] as const;

export const INTERNAL_MDX_TEST_SLUGS = ["mdx-pilot", "mdx-second-test"] as const;

export function guideHref(slug: string): `/guides/${string}` {
  return `/guides/${slug}`;
}
