import type { Metadata } from "next";
import Link from "next/link";
import { RecommendationGrid } from "@/components/recommendations";
import { JapanTripBudgetCalculator } from "@/components/tools/JapanTripBudgetCalculator";
import { ToolPageCrosslinks } from "@/components/tools/ToolPageCrosslinks";
import { siteUrl, SITE_NAME } from "@/lib/site";

const PATH = "/tools/japan-trip-budget-calculator";
const CANONICAL = `${siteUrl()}${PATH}`;

const description =
  "Free Japan trip budget calculator for 2026: estimate hotels, food, trains, shopping, and suggested yen cash from your trip length, cities, and travel style.";

export const metadata: Metadata = {
  title: "Japan Trip Budget Calculator (2026)",
  description,
  keywords: [
    "Japan trip budget",
    "Japan travel cost calculator",
    "2026 Japan travel budget",
    "yen budget Japan",
    "Tokyo trip cost estimate",
    "Japan daily budget",
  ],
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    type: "website",
    url: CANONICAL,
    siteName: SITE_NAME,
    title: "Japan Trip Budget Calculator (2026)",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Japan Trip Budget Calculator (2026)",
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
      name: "Japan Trip Budget Calculator (2026)",
      description,
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: siteUrl() },
      inLanguage: "en-US",
      breadcrumb: { "@id": `${CANONICAL}#breadcrumb` },
    },
    {
      "@type": "SoftwareApplication",
      name: "Japan Trip Budget Calculator",
      applicationCategory: "FinanceApplication",
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
          name: "Japan Trip Budget Calculator",
          item: CANONICAL,
        },
      ],
    },
  ],
};

export default function JapanTripBudgetCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-cream font-sans">
        <div className="border-b border-paper-edge bg-paper/90">
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
            <nav className="font-sans text-sm font-semibold text-muted">
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
              <span className="text-dark">Budget calculator</span>
            </nav>
          </div>
        </div>

        <article className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10">
          <header className="mb-10 max-w-3xl lg:mb-12">
            <p className="editorial-kicker mb-3">Tool</p>
            <h1 className="guide-page-title text-balance">
              Japan Trip Budget Calculator
            </h1>
            <p className="editorial-deck mt-4 max-w-2xl text-pretty">
              Dial in days, travelers, cities, and how you actually eat and move.
              You get a yen band for hotels, food, transport, shopping, plus a
              small emergency buffer and a practical cash carry hint.
            </p>
          </header>

          <JapanTripBudgetCalculator />

          <RecommendationGrid
            placement="japan-trip-budget-calculator"
            context="japan-trip-budget-calculator"
            title="Money and transit after you land"
            intro="Optional workflow notes that pair with your yen bands, not hype about savings."
            className="max-w-3xl"
          />

          <ToolPageCrosslinks currentSlug="japan-trip-budget-calculator" />
        </article>
      </main>
    </>
  );
}
