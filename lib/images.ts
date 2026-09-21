/** Local editorial image paths under /public/images */

export type PageImageCategory =
  | "guides"
  | "residents"
  | "tools"
  | "field-notes"
  | "articles";

/** Per-page image folder under /public/images/{category}/{slug}/ */
export function pageImagePath(
  category: PageImageCategory,
  slug: string,
  filename: string,
): string {
  return `/images/${category}/${slug}/${filename}`;
}

/** Open Graph image for a page route category */
export function ogImagePath(
  category: "guides" | "residents" | "tools" | "articles",
  slug: string,
  ext = "jpg",
): string {
  return `/images/og/${category}/${slug}.${ext}`;
}

/**
 * Shared editorial images reused across cards, heroes, and diagrams.
 * Prefer .webp filenames when final art is ready; .jpg placeholders are temporary.
 */
export const IMAGES = {
  brand: {
    logo: "/images/brand/japanprotips-logo.png",
  },
  ui: {
    navSearch: "/images/ui/nav-search-icon.png",
    placeholder: "/images/ui/placeholder.jpg",
  },
  shared: {
    suicaCard: "/images/shared/suica-card.webp",
    trainTicketGate: "/images/shared/train-ticket-gate.jpg",
    trainPlatform: "/images/shared/train-platform.jpg",
    convenienceStore: "/images/shared/convenience-store.jpg",
    coinLocker: "/images/shared/coin-locker.jpg",
    sevenBankAtm: "/images/shared/seven-bank-atm.jpg",
    japanStreetCrossing: "/images/shared/japan-street-crossing.jpg",
    japanTrashBins: "/images/shared/japan-trash-bins.jpg",
  },
  /** @deprecated Use IMAGES.shared or pageImagePath(); kept for card/carousel call sites */
  hero: {
    primary: "/images/shared/train-platform.jpg",
    airport: "/images/guides/japan-airport-first-steps/hero.jpg",
    shinkansen: "/images/guides/shinkansen-guide/hero.jpg",
    gate: "/images/shared/train-ticket-gate.jpg",
    suica: "/images/shared/suica-card.webp",
    ticketing: "/images/shared/train-ticket-gate.jpg",
  },
  /** @deprecated Use pageImagePath("guides", slug, "hero.webp") for per-guide thumbnails */
  guides: {
    esim: "/images/guides/sim-card-japan/hero.jpg",
    suica: "/images/guides/suica-pasmo-guide/hero.webp",
    maps: "/images/guides/using-google-maps-in-japan/hero.webp",
  },
  diagrams: {
    airport: "/images/diagrams/airport-route.jpg",
    esim: "/images/diagrams/esim.jpg",
    map: "/images/diagrams/japan-map.jpg",
    jrRoute: "/images/diagrams/jr-route.pdf",
  },
  /** Legacy articles path; airport content lives under /guides/japan-airport-to-city */
  articles: {
    airportGuide: "/images/guides/japan-airport-to-city/hero.jpg",
  },
} as const;
