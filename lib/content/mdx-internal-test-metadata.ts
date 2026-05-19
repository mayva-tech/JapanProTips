import type { Metadata } from "next";
import { createMdxGuideMetadata } from "./mdx-guide-route";

/** MDX sandbox pages: not indexed, not linked from public hubs. */
export function createMdxInternalTestMetadata(slug: string): Metadata {
  const base = createMdxGuideMetadata(slug);
  return {
    ...base,
    robots: { index: false, follow: false },
  };
}
