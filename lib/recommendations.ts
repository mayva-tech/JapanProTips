import type { AffiliateLinkId } from "@/lib/affiliate-links";
import {
  getAffiliateUrlOrNull,
  isValidAffiliateUrl,
} from "@/lib/affiliate-links";

export { RECOMMENDATION_AFFILIATE_DISCLOSURE } from "@/lib/editorial-copy";

export type RecommendationVariant = "essential" | "optional" | "warning" | "resident";

export type RecommendationCategory =
  | "rain-gear"
  | "power"
  | "packing"
  | "transit"
  | "footwear"
  | "documents"
  | "money";

export type RecommendationDefinition = {
  id: string;
  title: string;
  category: RecommendationCategory;
  tags: string[];
  variant: RecommendationVariant;
  operationalReason: string;
  bestFor?: string;
  avoidIf?: string;
  note?: string;
  categoryLabel?: string;
  affiliateLinkId?: AffiliateLinkId;
  /** Internal guide when affiliate URL is not live yet. */
  fallbackGuideHref?: string;
  /** Override when the CTA should stay internal (skips affiliate lookup). */
  href?: string;
  enabled: boolean;
};

export type RecommendationCtaKind = "affiliate" | "guide" | "checklist";

export type RecommendationCta = {
  kind: RecommendationCtaKind;
  href: string | null;
  label: string;
};

export const RECOMMENDATION_CATALOG: Record<string, RecommendationDefinition> = {
  "travel-umbrella": {
    id: "travel-umbrella",
    title: "Compact travel umbrella",
    category: "rain-gear",
    tags: ["rain", "packing", "weather", "train"],
    variant: "essential",
    categoryLabel: "Rain gear",
    operationalReason:
      "Useful during rainy season and long train days when convenience-store umbrellas pile up in the hallway.",
    bestFor: "June through September trips and anyone who hates buying a new umbrella every storm.",
    avoidIf: "You already carry a packable rain shell you trust in wind.",
    affiliateLinkId: "gear-travel-umbrella",
    fallbackGuideHref: "/guides/japan-weather-by-month",
    enabled: true,
  },
  "power-bank-20000": {
    id: "power-bank-20000",
    title: "20,000mAh power bank",
    category: "power",
    tags: ["sim", "transit", "maps", "packing"],
    variant: "essential",
    categoryLabel: "Power",
    operationalReason:
      "Maps, QR tickets, and translation apps drain batteries faster on transit-heavy days than at home.",
    bestFor: "Long train days and travelers who rely on phone tickets.",
    note: "If you want the simplest option, one solid bank beats two small ones you forget to charge.",
    affiliateLinkId: "gear-portable-power-bank",
    fallbackGuideHref: "/guides/sim-card-japan",
    enabled: true,
  },
  "universal-travel-adapter": {
    id: "universal-travel-adapter",
    title: "Universal travel adapter",
    category: "power",
    tags: ["sim", "packing", "hotel"],
    variant: "optional",
    categoryLabel: "Power",
    operationalReason:
      "Japan uses Type A outlets. Most phone and laptop chargers already fit, but a slim adapter helps for two-prong gear from other regions.",
    bestFor: "Travelers from Europe or regions with different plug shapes.",
    avoidIf: "Every charger you carry already has a Type A plug.",
    affiliateLinkId: "gear-universal-travel-adapter",
    fallbackGuideHref: "/guides/sim-card-japan",
    enabled: true,
  },
  "quick-dry-towel": {
    id: "quick-dry-towel",
    title: "Quick-dry travel towel",
    category: "rain-gear",
    tags: ["weather", "packing", "onsen"],
    variant: "optional",
    categoryLabel: "Pack light",
    operationalReason:
      "Handy for gym-style hotels, day trips with sweat, or backup when laundry plans slip.",
    bestFor: "Summer humidity and multi-city trips with sink laundry.",
    affiliateLinkId: "gear-quick-dry-towel",
    fallbackGuideHref: "/guides/japan-packing-list",
    enabled: true,
  },
  "ic-card-holder": {
    id: "ic-card-holder",
    title: "Suica or PASMO card holder",
    category: "transit",
    tags: ["transit", "ic", "wallet", "resident"],
    variant: "essential",
    categoryLabel: "Transit",
    operationalReason:
      "Keeps your IC card separate from credit cards so you tap the right card at the gate every time.",
    bestFor: "Daily train commutes and anyone who tops up at station machines often.",
    note: "Most travelers eventually end up buying a simple card wallet in Japan anyway.",
    affiliateLinkId: "gear-ic-card-holder",
    fallbackGuideHref: "/guides/suica-pasmo-guide",
    enabled: true,
  },
  "packing-cubes": {
    id: "packing-cubes",
    title: "Packing cubes",
    category: "packing",
    tags: ["packing", "hotel", "laundry"],
    variant: "essential",
    categoryLabel: "Packing",
    operationalReason:
      "Keeps outfits sorted in tight hotel drawers and makes repacking between cities faster.",
    bestFor: "Trips with multiple stops and carry-on-only packing.",
    affiliateLinkId: "gear-packing-cubes",
    fallbackGuideHref: "/guides/japan-packing-list",
    enabled: true,
  },
  "foldable-duffel": {
    id: "foldable-duffel",
    title: "Foldable duffel bag",
    category: "packing",
    tags: ["packing", "shopping", "luggage"],
    variant: "optional",
    categoryLabel: "Packing",
    operationalReason:
      "Folds flat in your suitcase until you need extra space for omiyage or thrift-store finds.",
    bestFor: "Last-week shopping and travelers who start with a small carry-on.",
    affiliateLinkId: "gear-foldable-duffel",
    fallbackGuideHref: "/guides/japan-packing-list",
    enabled: true,
  },
  "document-organizer": {
    id: "document-organizer",
    title: "Travel document organizer",
    category: "documents",
    tags: ["resident", "lease", "visa", "mail"],
    variant: "resident",
    categoryLabel: "Paperwork",
    operationalReason:
      "Lease PDFs, residence card copies, and guarantor forms are easier to find in one slim folder than loose in a backpack.",
    bestFor: "Apartment viewings and your first month of ward office visits.",
    avoidIf: "You already scan everything to a cloud folder you check daily.",
    affiliateLinkId: "gear-travel-document-organizer",
    fallbackGuideHref: "/residents/renting-apartment-japan",
    enabled: true,
  },
  "waterproof-shoes": {
    id: "waterproof-shoes",
    title: "Water-resistant walking shoes",
    category: "footwear",
    tags: ["weather", "rain", "walking"],
    variant: "essential",
    categoryLabel: "Footwear",
    operationalReason:
      "Wet pavement and station stairs are slick. Shoes that dry overnight beat fashion sneakers on rainy weeks.",
    bestFor: "Rainy season travel and high step-count city days.",
    avoidIf: "You already own broken-in waterproof hikers you will actually wear.",
    affiliateLinkId: "gear-walking-shoes",
    fallbackGuideHref: "/guides/getting-around-japan",
    enabled: true,
  },
  "wise-travel-card-note": {
    id: "wise-travel-card-note",
    title: "Wise (multi-currency card)",
    category: "money",
    tags: ["budget", "atm", "cash"],
    variant: "optional",
    categoryLabel: "Money",
    operationalReason:
      "If you want a simple way to hold yen alongside your home currency, a travel card can reduce ATM guesswork on arrival.",
    bestFor: "Travelers who split spending between card and cash and want one app to watch rates.",
    note: "Compare fees and ATM partners before you fly. This is a workflow note, not a promise of savings.",
    affiliateLinkId: "travel-money-card",
    fallbackGuideHref: "/guides/money-payments-japan",
    enabled: true,
  },
};

const GUIDE_FALLBACK_LABEL = "Read related guide →";
const CHECKLIST_FALLBACK_LABEL = "Use this as a checklist item";

/** Page or tool placement keys → catalog ids (order preserved). */
export const RECOMMENDATION_PLACEMENTS = {
  "japan-packing-list": [
    "travel-umbrella",
    "packing-cubes",
    "foldable-duffel",
    "ic-card-holder",
  ],
  "japan-weather-by-month": [
    "travel-umbrella",
    "waterproof-shoes",
    "quick-dry-towel",
  ],
  "sim-card-japan": ["power-bank-20000", "universal-travel-adapter"],
  "japan-packing-generator": ["packing-cubes", "foldable-duffel"],
  "japan-trip-budget-calculator": ["wise-travel-card-note", "ic-card-holder"],
  "renting-apartment-japan": ["document-organizer"],
  "japan-mistakes-first-time-visitors": [
    "travel-umbrella",
    "packing-cubes",
    "power-bank-20000",
  ],
} as const satisfies Record<string, string[]>;

export type RecommendationPlacementKey = keyof typeof RECOMMENDATION_PLACEMENTS;

export const RECOMMENDATION_PLACEMENT_ROUTES: Record<
  RecommendationPlacementKey,
  string
> = {
  "japan-packing-list": "/guides/japan-packing-list",
  "japan-weather-by-month": "/guides/japan-weather-by-month",
  "sim-card-japan": "/guides/sim-card-japan",
  "japan-packing-generator": "/tools/japan-packing-generator",
  "japan-trip-budget-calculator": "/tools/japan-trip-budget-calculator",
  "renting-apartment-japan": "/residents/renting-apartment-japan",
  "japan-mistakes-first-time-visitors":
    "/guides/japan-mistakes-first-time-visitors",
};

export type ResolvedRecommendation = RecommendationDefinition & {
  cta: RecommendationCta;
  hasLiveAffiliate: boolean;
};

function resolveRecommendationCta(
  entry: RecommendationDefinition,
): RecommendationCta {
  const explicitHref = entry.href?.trim();
  if (explicitHref && isValidAffiliateUrl(explicitHref)) {
    return {
      kind: explicitHref.startsWith("/") ? "guide" : "affiliate",
      href: explicitHref,
      label: entry.title,
    };
  }

  if (entry.affiliateLinkId) {
    const affiliateHref = getAffiliateUrlOrNull(entry.affiliateLinkId);
    if (affiliateHref) {
      return {
        kind: "affiliate",
        href: affiliateHref,
        label: entry.title,
      };
    }
  }

  if (entry.fallbackGuideHref) {
    return {
      kind: "guide",
      href: entry.fallbackGuideHref,
      label: GUIDE_FALLBACK_LABEL,
    };
  }

  return {
    kind: "checklist",
    href: null,
    label: CHECKLIST_FALLBACK_LABEL,
  };
}

export function getRecommendationById(
  id: string,
): ResolvedRecommendation | undefined {
  const entry = RECOMMENDATION_CATALOG[id];
  if (!entry?.enabled) {
    return undefined;
  }
  const cta = resolveRecommendationCta(entry);
  return {
    ...entry,
    cta,
    hasLiveAffiliate: cta.kind === "affiliate",
  };
}

export function getRecommendationsByIds(
  ids: readonly string[],
): ResolvedRecommendation[] {
  return ids
    .map((id) => getRecommendationById(id))
    .filter((item): item is ResolvedRecommendation => item != null);
}

export function getRecommendationsForPlacement(
  placement: RecommendationPlacementKey,
): ResolvedRecommendation[] {
  return getRecommendationsByIds(RECOMMENDATION_PLACEMENTS[placement]);
}
