import type { GuideCardItem } from "@/lib/guide-card-item";
import { getGuideSlugs, tryLoadGuide } from "@/lib/content/guides";
import type { GuideFrontmatter } from "@/lib/content/types";
import type { GuideSearchEntry } from "@/lib/guide-search";
import { RESIDENT_SLUG_SECTION } from "@/lib/resident-guide-sections";
import { RESIDENT_TSX_SEARCH_ENTRIES } from "@/lib/resident-tsx-search-entries";
import { TOURIST_GUIDE_SECTIONS } from "@/lib/tourist-guides";

function slugWords(href: string): string[] {
  return href
    .replace(/^\/(guides|residents|start-here)?\/?/, "")
    .split(/[/-]+/)
    .filter(Boolean);
}

function formatCategory(category: string): string {
  if (category === "resident") return "Residents";
  if (category.length === 0) return "Guide";
  return category.charAt(0).toUpperCase() + category.slice(1);
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[\s,;/]+/)
    .map((t) => t.replace(/[^\w-]/g, ""))
    .filter((t) => t.length >= 2);
}

function collectFrontmatterKeywords(
  fm: Pick<
    GuideFrontmatter,
    | "title"
    | "description"
    | "category"
    | "tags"
    | "keywords"
    | "intro"
    | "audience"
    | "difficulty"
  >,
  href: string,
  extra: string[] = [],
): string[] {
  const fromTags = (fm.tags ?? []).flatMap((tag) => [tag, ...tokenize(tag)]);
  const fromKeywords = (fm.keywords ?? []).flatMap((kw) => [kw, ...tokenize(kw)]);
  const fromIntro = (fm.intro ?? []).flatMap((p) => tokenize(p));

  return [
    ...extra,
    formatCategory(fm.category ?? "").toLowerCase(),
    fm.audience ?? "",
    fm.difficulty ?? "",
    ...fromTags,
    ...fromKeywords,
    ...fromIntro,
    ...slugWords(href),
    ...tokenize(fm.title),
    ...tokenize(fm.description),
  ].filter(Boolean);
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
      ...tokenize(item.title),
      ...tokenize(item.description),
    ],
  };
}

function frontmatterToSearchEntry(
  fm: GuideFrontmatter,
  href: string,
  section: string,
): GuideSearchEntry {
  return {
    title: fm.title,
    description: fm.description,
    href,
    category: formatCategory(fm.category),
    section,
    keywords: collectFrontmatterKeywords(fm, href, [
      "guide",
      "article",
      "japan",
      "resident",
      "living",
    ]),
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
    keywords: ["start", "here", "checklist", "planning", "first", "time", "trip"],
  },
  {
    title: "Resident Guides Hub",
    description:
      "Banking, bills, apartments, and daily life guides for people living in Japan.",
    href: "/residents",
    category: "Residents",
    section: "Daily life",
    keywords: ["resident", "living", "move", "apartment", "bank", "life"],
  },
  {
    title: "All Tourist Guides",
    description: "Browse every visitor guide by topic on one page.",
    href: "/tourists",
    category: "Index",
    section: "Trip planning",
    keywords: ["tourist", "visitor", "all", "guides", "list", "browse", "travel"],
  },
  {
    title: "Moving to Japan Checklist",
    description:
      "First-month checklist for new residents: arrival, ward office, bank, phone, utilities, insurance, and printable PDF.",
    href: "/resources/moving-to-japan-checklist",
    category: "Resources",
    section: "Moving to Japan",
    keywords: [
      "moving",
      "japan",
      "checklist",
      "resident",
      "expat",
      "first",
      "month",
      "30",
      "days",
      "pdf",
      "download",
      "move",
    ],
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
          "tourist",
          "visitor",
        ]),
      );
    }
  }

  for (const slug of getGuideSlugs("residents")) {
    const result = tryLoadGuide(slug, "residents");
    if (!result.ok) continue;
    const href = `/residents/${slug}`;
    byHref.set(
      href,
      frontmatterToSearchEntry(
        result.guide.frontmatter,
        href,
        RESIDENT_SLUG_SECTION[slug] ?? "Daily life",
      ),
    );
  }

  for (const entry of RESIDENT_TSX_SEARCH_ENTRIES) {
    if (!byHref.has(entry.href)) {
      byHref.set(entry.href, entry);
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

let cachedIndex: GuideSearchEntry[] | null = null;

/** Server-only: builds the full tourist + resident search index (memoized). */
export function buildGuideSearchIndex(): GuideSearchEntry[] {
  if (!cachedIndex) {
    cachedIndex = buildIndex();
  }
  return cachedIndex;
}
