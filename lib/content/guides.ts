import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { GuideContentError } from "./errors";
import {
  GUIDE_COMPARISON_SPLIT,
  type ContentCollection,
  type LoadGuideResult,
  type LoadedGuide,
} from "./types";
import { validateGuideFrontmatter } from "./validate-frontmatter";

function contentDir(collection: ContentCollection) {
  return path.join(process.cwd(), "content", collection);
}

function guideFilePath(slug: string, collection: ContentCollection) {
  return path.join(contentDir(collection), `${slug}.mdx`);
}

export function getGuideSlugs(collection: ContentCollection = "guides"): string[] {
  const dir = contentDir(collection);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(/\.mdx$/, ""));
}

export function tryLoadGuide(
  slug: string,
  collection: ContentCollection = "guides",
): LoadGuideResult {
  const filePath = guideFilePath(slug, collection);

  if (!fs.existsSync(filePath)) {
    return {
      ok: false,
      error: new GuideContentError(
        "NOT_FOUND",
        slug,
        `No MDX file found at content/${collection}/${slug}.mdx.`,
      ),
    };
  }

  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const frontmatter = validateGuideFrontmatter(
      slug,
      data as Record<string, unknown>,
    );

    if (frontmatter instanceof GuideContentError) {
      return { ok: false, error: frontmatter };
    }

    const guide: LoadedGuide = {
      slug,
      collection,
      frontmatter,
      content: content.trim(),
    };

    return { ok: true, guide };
  } catch (cause) {
    const message =
      cause instanceof Error ? cause.message : "Unknown error while reading MDX.";
    return {
      ok: false,
      error: new GuideContentError(
        "INVALID_FRONTMATTER",
        slug,
        `Could not load content/${collection}/${slug}.mdx: ${message}`,
      ),
    };
  }
}

/** @throws {GuideContentError} Use {@link tryLoadGuide} for graceful handling. */
export function loadGuide(
  slug: string,
  collection: ContentCollection = "guides",
): LoadedGuide {
  const result = tryLoadGuide(slug, collection);
  if (!result.ok) throw result.error;
  return result.guide;
}

export function tryGetGuideFrontmatter(
  slug: string,
  collection: ContentCollection = "guides",
) {
  const result = tryLoadGuide(slug, collection);
  if (!result.ok) return result;
  return { ok: true as const, frontmatter: result.guide.frontmatter };
}

/** @throws {GuideContentError} */
export function getGuideFrontmatter(
  slug: string,
  collection: ContentCollection = "guides",
) {
  return loadGuide(slug, collection).frontmatter;
}

export function splitGuideContent(content: string): {
  beforeComparison: string;
  afterComparison: string;
} {
  const parts = content.split(GUIDE_COMPARISON_SPLIT);
  return {
    beforeComparison: parts[0]?.trim() ?? "",
    afterComparison: parts.slice(1).join(GUIDE_COMPARISON_SPLIT).trim(),
  };
}
