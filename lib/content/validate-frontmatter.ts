import { GuideContentError } from "./errors";
import type {
  GuideAudience,
  GuideDifficulty,
  GuideFrontmatter,
} from "./types";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const AUDIENCES: GuideAudience[] = ["tourist", "visitor", "resident", "both"];
const DIFFICULTIES: GuideDifficulty[] = [
  "beginner",
  "intermediate",
  "advanced",
];

function readString(
  data: Record<string, unknown>,
  key: string,
): string | undefined {
  const value = data[key];
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function readStringArray(data: Record<string, unknown>, key: string): string[] | undefined {
  const value = data[key];
  if (!Array.isArray(value)) return undefined;
  const items = value.filter((item): item is string => typeof item === "string");
  return items.length ? items.map((item) => item.trim()).filter(Boolean) : undefined;
}

function readBoolean(data: Record<string, unknown>, key: string): boolean | undefined {
  return typeof data[key] === "boolean" ? (data[key] as boolean) : undefined;
}

function readReadingTime(
  data: Record<string, unknown>,
  key: string,
): number | string | undefined {
  const value = data[key];
  if (typeof value === "number" && Number.isInteger(value) && value > 0) {
    return value;
  }
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (/^\d+$/.test(trimmed)) return Number.parseInt(trimmed, 10);
  if (/^\d+\s*min(ute)?s?$/i.test(trimmed)) return trimmed;
  return undefined;
}

function readEnum<T extends string>(
  data: Record<string, unknown>,
  key: string,
  allowed: readonly T[],
): T | undefined {
  const value = readString(data, key);
  if (!value) return undefined;
  return allowed.includes(value as T) ? (value as T) : undefined;
}

function invalid(slug: string, message: string): GuideContentError {
  return new GuideContentError("INVALID_FRONTMATTER", slug, message);
}

/**
 * Validates required and optional MDX frontmatter fields.
 * Returns a {@link GuideContentError} when validation fails.
 */
export function validateGuideFrontmatter(
  fileSlug: string,
  data: Record<string, unknown>,
): GuideFrontmatter | GuideContentError {
  const title = readString(data, "title");
  const description = readString(data, "description");
  const slug = readString(data, "slug");
  const category = readString(data, "category");
  const updated = readString(data, "updated");

  if (!title) return invalid(fileSlug, "Frontmatter is missing a non-empty title.");
  if (!description) {
    return invalid(fileSlug, "Frontmatter is missing a non-empty description.");
  }
  if (!slug) return invalid(fileSlug, "Frontmatter is missing a non-empty slug.");
  if (!category) return invalid(fileSlug, "Frontmatter is missing a non-empty category.");
  if (!updated) return invalid(fileSlug, "Frontmatter is missing an updated date.");
  if (!DATE_RE.test(updated)) {
    return invalid(fileSlug, "Frontmatter updated must use YYYY-MM-DD format.");
  }

  if (slug !== fileSlug) {
    return invalid(
      fileSlug,
      `Frontmatter slug "${slug}" does not match file slug "${fileSlug}".`,
    );
  }

  const tags = readStringArray(data, "tags");
  if (data.tags !== undefined && !tags) {
    return invalid(fileSlug, "Frontmatter tags must be a list of strings.");
  }

  const audience = readEnum(data, "audience", AUDIENCES);
  if (data.audience !== undefined && !audience) {
    return invalid(
      fileSlug,
      'Frontmatter audience must be "tourist", "visitor", "resident", or "both".',
    );
  }

  const difficulty = readEnum(data, "difficulty", DIFFICULTIES);
  if (data.difficulty !== undefined && !difficulty) {
    return invalid(
      fileSlug,
      'Frontmatter difficulty must be "beginner", "intermediate", or "advanced".',
    );
  }

  const readingTime = readReadingTime(data, "readingTime");
  if (data.readingTime !== undefined && readingTime === undefined) {
    return invalid(
      fileSlug,
      'Frontmatter readingTime must be a positive integer or a string like "10 min".',
    );
  }

  const featured = readBoolean(data, "featured");
  if (data.featured !== undefined && featured === undefined) {
    return invalid(fileSlug, "Frontmatter featured must be true or false.");
  }

  const intro = readStringArray(data, "intro");

  return {
    title,
    description,
    slug,
    category,
    updated,
    tags,
    audience,
    difficulty,
    readingTime,
    featured,
    intro,
    parentHref: readString(data, "parentHref"),
    parentLabel: readString(data, "parentLabel"),
    showComparison: readBoolean(data, "showComparison"),
    showHotelConversion: readBoolean(data, "showHotelConversion"),
    comparisonItems:
      data.comparisonItems === "none" || data.comparisonItems === "default"
        ? data.comparisonItems
        : undefined,
    seoTitle: readString(data, "seoTitle"),
    keywords: readStringArray(data, "keywords"),
  };
}
