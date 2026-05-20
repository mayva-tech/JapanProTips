import type { Metadata } from "next";
import Link from "next/link";
import { RecommendationGrid } from "@/components/recommendations";
import { JapanPackingGenerator } from "@/components/tools/JapanPackingGenerator";
import { ToolPageCrosslinks } from "@/components/tools/ToolPageCrosslinks";
import { siteUrl, SITE_NAME } from "@/lib/site";

const PATH = "/tools/japan-packing-generator";
const CANONICAL = `${siteUrl()}${PATH}`;

const description =
  "Free Japan packing list generator: build a practical checklist from your travel month, trip length, cities, laundry plans, activities, and rain risk.";

export const metadata: Metadata = {
  title: "Japan Packing Generator",
  description,
  keywords: [
    "Japan packing list",
    "what to pack for Japan",
    "Japan trip checklist",
    "Japan travel packing tool",
    "pack for Tokyo trip",
  ],
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    type: "website",
    url: CANONICAL,
    siteName: SITE_NAME,
    title: "Japan Packing Generator",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Japan Packing Generator",
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      url: CANONICAL,
      name: "Japan Packing Generator",
      description,
      inLanguage: "en-US",
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: siteUrl() },
      breadcrumb: { "@id": `${CANONICAL}#breadcrumb` },
    },
    {
      "@type": "SoftwareApplication",
      name: "Japan Packing Generator",
      applicationCategory: "TravelApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      url: CANONICAL,
      description,
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${CANONICAL}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl(),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Tools",
          item: `${siteUrl()}/tools`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Japan Packing Generator",
          item: CANONICAL,
        },
      ],
    },
  ],
};

export default function JapanPackingGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-cream font-sans">
        <div className="border-b border-paper-edge bg-paper/90">
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
            <nav
              className="font-sans text-sm font-semibold text-muted"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="text-rust hover:text-maroon">
                Home
              </Link>
              <span aria-hidden className="mx-2 text-tan">
                /
              </span>
              <Link href="/tools" className="text-rust hover:text-maroon">
                Tools
              </Link>
              <span aria-hidden className="mx-2 text-tan">
                /
              </span>
              <span className="text-dark">Japan Packing Generator</span>
            </nav>
          </div>
        </div>

        <article className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10">
          <header className="mb-10 max-w-3xl lg:mb-12">
            <p className="editorial-kicker mb-3">Tool</p>
            <h1 className="guide-page-title text-balance">Japan Packing Generator</h1>
            <p className="editorial-deck mt-4 max-w-2xl text-pretty">
              Pick your month, trip length, cities, and what you will actually do.
              You get a field style checklist you can copy, plus a short note on
              what to buy after you land.
            </p>
          </header>

          <JapanPackingGenerator />

          <RecommendationGrid
            placement="japan-packing-generator"
            context="japan-packing-generator"
            title="Pack lighter with a few boring extras"
            intro="Most travelers eventually add these after the first repack between cities."
            className="max-w-3xl"
          />

          <ToolPageCrosslinks currentSlug="japan-packing-generator" />
        </article>
      </main>
    </>
  );
}
