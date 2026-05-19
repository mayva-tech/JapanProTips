import type { GuideContentError } from "./errors";

export type ContentCollection = "guides" | "residents";

export type GuideAudience = "tourist" | "visitor" | "resident" | "both";

export type GuideDifficulty = "beginner" | "intermediate" | "advanced";

export type GuideFrontmatter = {
  title: string;
  description: string;
  slug: string;
  category: string;
  /** ISO date: YYYY-MM-DD */
  updated: string;
  /** Short opening paragraphs shown above the eSIM conversion block. */
  intro?: string[];
  tags?: string[];
  audience?: GuideAudience;
  difficulty?: GuideDifficulty;
  /** Estimated reading time (minutes as number, or display string such as "10 min"). */
  readingTime?: number | string;
  featured?: boolean;
  parentHref?: string;
  parentLabel?: string;
  showComparison?: boolean;
  showHotelConversion?: boolean;
  /** Omit or `default` for shell comparison table; `none` hides it. */
  comparisonItems?: "default" | "none";
  /** Optional SEO title override (layout template adds site name). */
  seoTitle?: string;
  /** Optional meta keywords for search and AI retrieval. */
  keywords?: string[];
};

export type LoadedGuide = {
  slug: string;
  collection: ContentCollection;
  frontmatter: GuideFrontmatter;
  /** MDX body after frontmatter (may include a comparison split marker). */
  content: string;
};

export type LoadGuideResult =
  | { ok: true; guide: LoadedGuide }
  | { ok: false; error: GuideContentError };

/** Splits MDX body at the optional comparison marker into before/after shell slots. */
export const GUIDE_COMPARISON_SPLIT = "\n\n---comparison---\n\n";
