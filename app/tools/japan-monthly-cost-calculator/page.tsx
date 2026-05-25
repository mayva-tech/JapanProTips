import type { Metadata } from "next";
import Link from "next/link";
import { JapanMonthlyCostCalculator } from "@/components/tools/JapanMonthlyCostCalculator";
import { ToolPageCrosslinks } from "@/components/tools/ToolPageCrosslinks";
import { siteUrl, SITE_NAME } from "@/lib/site";

const PATH = "/tools/japan-monthly-cost-calculator";
const CANONICAL = `${siteUrl()}${PATH}`;

const description =
  "Rough monthly cost band for living in Japan: rent, food, utilities, transport, phone, internet, optional insurance and childcare add-ons, move-in cash warning, and emergency savings target. For planning, not quotes.";

export const metadata: Metadata = {
  title: "Japan Monthly Cost Calculator",
  description,
  keywords: [
    "Japan cost of living calculator",
    "Tokyo monthly budget resident",
    "Japan rent estimate",
    "Japan utilities cost",
    "JapanProTips tools",
  ],
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    type: "website",
    url: CANONICAL,
    siteName: SITE_NAME,
    title: "Japan Monthly Cost Calculator",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Japan Monthly Cost Calculator",
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
      name: "Japan Monthly Cost Calculator",
      description,
      inLanguage: "en-US",
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: siteUrl() },
      breadcrumb: { "@id": `${CANONICAL}#breadcrumb` },
    },
    {
      "@type": "SoftwareApplication",
      name: "Japan Monthly Cost Calculator",
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
          name: "Japan Monthly Cost Calculator",
          item: CANONICAL,
        },
      ],
    },
  ],
};

export default function JapanMonthlyCostCalculatorPage() {
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
              <span className="text-dark">Japan Monthly Cost Calculator</span>
            </nav>
          </div>
        </div>

        <article className="mx-auto max-w-6xl px-4 pb-8 pt-8 sm:px-6 sm:pb-8 sm:pt-8">
          <header className="mb-6 max-w-3xl lg:mb-6">
            <p className="editorial-kicker mb-3">Tool</p>
            <h1 className="guide-page-title text-balance">
              Japan Monthly Cost Calculator
            </h1>
            <p className="editorial-deck mt-4 max-w-2xl text-pretty">
              A resident-style monthly band built from city type, household size,
              housing shape, commute, and how you eat. Toggle add-ons for phone,
              internet, rough health and pension, childcare pressure, and car
              parking. Numbers are rounded heuristics, not a lease quote.
            </p>
          </header>

          <JapanMonthlyCostCalculator />

          <section
            className="mt-6 max-w-3xl rounded-lg border border-paper-edge bg-paper-card/90 p-6 shadow-editorial sm:p-8"
            aria-labelledby="monthly-related-heading"
          >
            <h2
              id="monthly-related-heading"
              className="font-display text-xl font-bold italic text-dark sm:text-2xl"
            >
              Related guides
            </h2>
            <p className="article-body-sm mt-2 text-muted">
              Narrative context for rent, bills, insurance, and how monthly math
              differs from a tourist trip budget.
            </p>
            <ul className="mt-6 flex flex-col gap-3 font-sans text-sm font-semibold">
              <li>
                <Link
                  href="/residents/japan-living-cost"
                  className="inline-flex text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
                >
                  Monthly cost of living in Japan →
                </Link>
              </li>
              <li>
                <Link
                  href="/residents/renting-apartment-japan"
                  className="inline-flex text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
                >
                  Renting an apartment in Japan →
                </Link>
              </li>
              <li>
                <Link
                  href="/residents/japan-health-insurance"
                  className="inline-flex text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
                >
                  Japan health insurance →
                </Link>
              </li>
              <li>
                <Link
                  href="/residents/pay-bills-japan"
                  className="inline-flex text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
                >
                  How to pay bills in Japan →
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="inline-flex text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
                >
                  All tools →
                </Link>
              </li>
            </ul>
          </section>

          <ToolPageCrosslinks currentSlug="japan-monthly-cost-calculator" />
        </article>
      </main>
    </>
  );
}
