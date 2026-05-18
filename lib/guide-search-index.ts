import type { GuideCardItem } from "@/lib/guide-card-item";
import { TOURIST_GUIDE_SECTIONS } from "@/lib/tourist-guides";

export type GuideSearchEntry = {
  title: string;
  description: string;
  href: string;
  category: string;
  section: string;
  keywords: string[];
};

function slugWords(href: string): string[] {
  return href
    .replace(/^\/(guides|residents|start-here)?\/?/, "")
    .split(/[/-]+/)
    .filter(Boolean);
}

function toSearchEntry(
  item: Pick<GuideCardItem, "title" | "description" | "href" | "category">,
  section: string,
  extraKeywords: string[] = [],
): GuideSearchEntry {
  return {
    title: item.title,
    description: item.description,
    href: item.href,
    category: item.category,
    section,
    keywords: [
      ...extraKeywords,
      item.category.toLowerCase(),
      section.toLowerCase(),
      ...slugWords(item.href),
      ...item.title.toLowerCase().split(/\s+/),
      ...item.description.toLowerCase().split(/\s+/),
    ],
  };
}

const EXTRA_ENTRIES: GuideSearchEntry[] = [
  {
    title: "Start Here Trip Checklist",
    description:
      "Step-by-step trip planning hub for SIM, trains, lodging, and money.",
    href: "/start-here",
    category: "Start here",
    section: "Trip planning",
    keywords: ["start", "here", "checklist", "planning", "first", "time"],
  },
  {
    title: "Resident Guides Hub",
    description:
      "Banking, bills, apartments, and daily life guides for people living in Japan.",
    href: "/residents",
    category: "Residents",
    section: "Daily life",
    keywords: ["resident", "living", "move", "apartment", "bank"],
  },
  {
    title: "All Tourist Guides",
    description: "Browse every visitor guide by topic on one page.",
    href: "/tourists",
    category: "Index",
    section: "Trip planning",
    keywords: ["tourist", "all", "guides", "list", "browse"],
  },
];

function buildIndex(): GuideSearchEntry[] {
  const byHref = new Map<string, GuideSearchEntry>();

  for (const section of TOURIST_GUIDE_SECTIONS) {
    for (const item of section.items) {
      byHref.set(
        item.href,
        toSearchEntry(item, section.label, [
          "guide",
          "article",
          "japan",
          "travel",
        ]),
      );
    }
  }

  for (const entry of EXTRA_ENTRIES) {
    if (!byHref.has(entry.href)) {
      byHref.set(entry.href, entry);
    }
  }

  return Array.from(byHref.values()).sort((a, b) =>
    a.title.localeCompare(b.title),
  );
}

export const GUIDE_SEARCH_INDEX = buildIndex();

export function normalizeSearchQuery(query: string): string {
  return query.trim().toLowerCase();
}

export function searchGuides(query: string, limit = 8): GuideSearchEntry[] {
  const normalized = normalizeSearchQuery(query);
  if (!normalized) return [];

  const terms = normalized.split(/\s+/).filter((t) => t.length >= 2);
  if (terms.length === 0 && normalized.length >= 2) {
    terms.push(normalized);
  }
  if (terms.length === 0) return [];

  const scored = GUIDE_SEARCH_INDEX.map((entry) => {
    const haystack = [
      entry.title,
      entry.description,
      entry.category,
      entry.section,
      entry.keywords.join(" "),
      entry.href,
    ]
      .join(" ")
      .toLowerCase();

    let score = 0;
    for (const term of terms) {
      if (entry.title.toLowerCase().includes(term)) score += 4;
      if (haystack.includes(term)) score += 2;
      if (entry.href.toLowerCase().includes(term)) score += 1;
    }
    return { entry, score };
  })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map(({ entry }) => entry);
}

/** Total searchable guides (for UI copy). */
export const GUIDE_SEARCH_COUNT = GUIDE_SEARCH_INDEX.length;
