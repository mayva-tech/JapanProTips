import type { Metadata } from "next";
import type { ContentCollection } from "./types";
import { tryLoadGuide } from "./guides";
import { siteUrl } from "@/lib/site";

const UNAVAILABLE_TITLE = "Guide unavailable";
const UNAVAILABLE_DESCRIPTION =
  "This guide could not be loaded. Return to the Japan Pro Tips hub.";

function guidePath(slug: string, collection: ContentCollection): string {
  return collection === "residents" ? `/residents/${slug}` : `/guides/${slug}`;
}

export function createMdxGuideMetadata(
  slug: string,
  collection: ContentCollection = "guides",
): Metadata {
  const result = tryLoadGuide(slug, collection);
  if (!result.ok) {
    return {
      title: UNAVAILABLE_TITLE,
      description: UNAVAILABLE_DESCRIPTION,
      robots: { index: false, follow: false },
    };
  }

  const { frontmatter } = result.guide;
  const title = frontmatter.seoTitle ?? frontmatter.title;
  const description = frontmatter.description;
  const path = guidePath(slug, collection);
  const url = `${siteUrl()}${path}`;

  return {
    title,
    description,
    keywords: frontmatter.keywords,
    openGraph: {
      type: "article",
      title,
      description,
      url,
    },
    alternates: {
      canonical: url,
    },
  };
}
