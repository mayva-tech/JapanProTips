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
  "airalo-esim-japan",
  "ubigi-esim-japan",
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
  "gear-universal-travel-adapter",
  "gear-ic-card-holder",
] as const;

/** Stable keys used by gear/service presets and inline guide items. */
export type AffiliateLinkId = (typeof AFFILIATE_LINK_IDS)[number];

/**
 * Affiliate URLs by key. Add or update URLs here only.
 * Leave a key unset (or use an empty string) to keep the placeholder fallback.
 */
export const affiliateLinks: Partial<Record<AffiliateLinkId, string>> = {
  /** Editorial provider homepages until partner tracking URLs are confirmed. */
  "airalo-esim-japan": "https://www.airalo.com/",
  "ubigi-esim-japan": "https://www.ubigi.com/",
};

/** True when href is empty, the registry placeholder, or other non-URL filler text. */
export function isAffiliatePlaceholder(href: string): boolean {
  const trimmed = href.trim();
  if (!trimmed) {
    return true;
  }
  if (trimmed === AFFILIATE_LINK_PLACEHOLDER) {
    return true;
  }
  if (/\[affiliate[-_\s]?link/i.test(trimmed)) {
    return true;
  }
  if (/affiliate-link-here/i.test(trimmed)) {
    return true;
  }
  return false;
}

/** Internal path or https URL suitable for a live CTA. */
export function isValidAffiliateUrl(href: string): boolean {
  const trimmed = href.trim();
  if (isAffiliatePlaceholder(trimmed)) {
    return false;
  }
  if (trimmed.startsWith("/")) {
    return true;
  }
  return /^https?:\/\//i.test(trimmed);
}

/** Returns a live URL for the key, or null when unset, empty, or placeholder. */
export function getAffiliateUrlOrNull(linkId: AffiliateLinkId): string | null {
  const url = affiliateLinks[linkId]?.trim();
  if (!url || isAffiliatePlaceholder(url)) {
    return null;
  }
  return url;
}

/**
 * Legacy resolver: always returns a string (placeholder when missing).
 * Prefer `getAffiliateUrlOrNull` for recommendation and offer UI.
 */
export function resolveAffiliateLink(linkId: AffiliateLinkId): string {
  return getAffiliateUrlOrNull(linkId) ?? AFFILIATE_LINK_PLACEHOLDER;
}

export function isExternalAffiliateHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}
