import type { ToolRecommendationStripCard } from "@/components/tools/ToolRecommendationStrip";

export type ToolGroupId =
  | "travel-planning"
  | "airport-packing"
  | "resident-life";

export type SiteToolDefinition = {
  slug: string;
  href: string;
  title: string;
  description: string;
  group: ToolGroupId;
};

/** Single source of truth for live tool metadata (hub, homepage, crosslinks). */
export const SITE_TOOLS: SiteToolDefinition[] = [
  {
    slug: "japan-trip-budget-calculator",
    href: "/tools/japan-trip-budget-calculator",
    title: "Japan Trip Budget Calculator",
    description:
      "Rough yen bands for hotels, food, trains, shopping, buffer, and pocket cash.",
    group: "travel-planning",
  },
  {
    slug: "japan-itinerary-planner",
    href: "/tools/japan-itinerary-planner",
    title: "Japan Itinerary Planner",
    description:
      "Set length, start city, theme, style, and pace for a day-by-day route outline.",
    group: "travel-planning",
  },
  {
    slug: "japan-packing-generator",
    href: "/tools/japan-packing-generator",
    title: "Japan Packing Generator",
    description:
      "Checklist from your month, trip length, cities, laundry, activities, and rain.",
    group: "airport-packing",
  },
  {
    slug: "can-i-bring-this-to-japan",
    href: "/tools/can-i-bring-this-to-japan",
    title: "Can I Bring This to Japan?",
    description:
      "High level flags for meds, food, plants, vapes, power banks, cash, and more.",
    group: "airport-packing",
  },
  {
    slug: "japanese-address-formatter",
    href: "/tools/japanese-address-formatter",
    title: "Japanese Address Formatter",
    description:
      "Japanese order, English-friendly blocks, and delivery-style lines from address fields.",
    group: "resident-life",
  },
  {
    slug: "japan-monthly-cost-calculator",
    href: "/tools/japan-monthly-cost-calculator",
    title: "Japan Monthly Cost Calculator",
    description:
      "Resident-style rent, food, utilities, transport, add-ons, move-in warning, and emergency savings band.",
    group: "resident-life",
  },
];

export const TOOL_GROUP_LABELS: Record<
  ToolGroupId,
  { title: string; description: string }
> = {
  "travel-planning": {
    title: "Travel Planning",
    description: "Trip-level yen bands before you book.",
  },
  "airport-packing": {
    title: "Airport and Packing",
    description: "What to pack and what to leave out of your bag.",
  },
  "resident-life": {
    title: "Resident Life",
    description: "Addresses and monthly cash shape after you land.",
  },
};

export const TOOL_GROUP_ORDER: ToolGroupId[] = [
  "travel-planning",
  "airport-packing",
  "resident-life",
];

export function siteToolBySlug(slug: string): SiteToolDefinition | undefined {
  return SITE_TOOLS.find((t) => t.slug === slug);
}

export function toolsInGroup(group: ToolGroupId): SiteToolDefinition[] {
  return SITE_TOOLS.filter((t) => t.group === group);
}

export function toRecommendationCard(
  t: SiteToolDefinition,
): ToolRecommendationStripCard {
  return {
    label: t.title,
    description: t.description,
    href: t.href,
  };
}

/** Strip cards for tool pages: all live tools except the current slug. */
export function otherToolStripCards(
  currentSlug: string,
): ToolRecommendationStripCard[] {
  return SITE_TOOLS.filter((t) => t.slug !== currentSlug).map(
    toRecommendationCard,
  );
}
