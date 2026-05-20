/**
 * Central affiliate URL registry for gear and service recommendation boxes.
 *
 * To go live: set a real URL on the matching key in `affiliateLinks`.
 * Empty or missing keys fall back to `AFFILIATE_LINK_PLACEHOLDER` (non-clickable in UI).
 */

export const AFFILIATE_LINK_PLACEHOLDER = "[affiliate-link-here]";

/** All registered affiliate keys (for audits and validation). */
export const AFFILIATE_LINK_IDS = [
  "esim-japan",
  "pocket-wifi-japan",
  "visitor-sim-long-stay",
  "airport-transfer-booking",
  "airport-express-booking",
  "private-airport-transfer",
  "luggage-delivery",
  "airport-luggage-storage",
  "hotel-luggage-forwarding",
  "travel-insurance-comparison",
  "travel-insurance-medical",
  "emergency-assistance",
  "travel-insurance",
  "hotel-booking",
  "activity-booking",
  "jr-rail-pass",
  "travel-money-card",
  "resident-mvno-japan",
  "gear-travel-umbrella",
  "gear-quick-dry-towel",
  "gear-packable-rain-jacket",
  "gear-waterproof-zip-pouches",
  "gear-shoe-covers-insoles",
  "gear-walking-shoes-insoles",
  "gear-collapsible-water-bottle",
  "gear-eye-mask-earplugs",
  "gear-packable-fan",
  "gear-neck-pillow",
  "gear-packing-cubes",
  "gear-walking-shoes",
  "gear-lightweight-daypack",
  "gear-portable-power-bank",
  "gear-travel-laundry-sheets",
  "gear-travel-document-organizer",
  "gear-compression-socks",
  "gear-crossbody-pouch",
  "gear-reusable-water-bottle",
  "gear-luggage-tags",
  "gear-packing-tape",
  "gear-foldable-duffel",
  "gear-luggage-scale",
  "gear-esim-phone-check",
  "gear-phone-strap",
  "gear-spare-charging-cable",
  "gear-waterproof-phone-pouch",
] as const;

/** Stable keys used by gear/service presets and inline guide items. */
export type AffiliateLinkId = (typeof AFFILIATE_LINK_IDS)[number];

/**
 * Affiliate URLs by key. Add or update URLs here only.
 * Leave a key unset (or use an empty string) to keep the placeholder fallback.
 */
export const affiliateLinks: Partial<Record<AffiliateLinkId, string>> = {
  // Example (uncomment and set when ready):
  // "esim-japan": "https://www.airalo.com/",
};

export function resolveAffiliateLink(linkId: AffiliateLinkId): string {
  const url = affiliateLinks[linkId]?.trim();
  if (url) {
    return url;
  }
  return AFFILIATE_LINK_PLACEHOLDER;
}

export function isAffiliatePlaceholder(href: string): boolean {
  return href.trim() === AFFILIATE_LINK_PLACEHOLDER;
}

export function isExternalAffiliateHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}
