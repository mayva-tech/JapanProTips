/**
 * Client-safe search helpers. Index data is built on the server via
 * {@link buildGuideSearchIndex} in guide-search-index.server.ts.
 */
export {
  type GuideSearchEntry,
  normalizeSearchQuery,
  searchGuides,
} from "@/lib/guide-search";
