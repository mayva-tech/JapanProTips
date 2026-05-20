import type { Metadata } from "next";
import Link from "next/link";
import { CanIBringThisToJapanChecker } from "@/components/tools/CanIBringThisToJapanChecker";
import { ToolPageCrosslinks } from "@/components/tools/ToolPageCrosslinks";
import { siteUrl, SITE_NAME } from "@/lib/site";

const PATH = "/tools/can-i-bring-this-to-japan";
const CANONICAL = `${siteUrl()}${PATH}`;

const description =
  "Free Japan customs-style checker: high level guidance on medicine, food, plants, vapes, alcohol, power banks, cash, and more. Always confirm with official Japanese and airline rules.";

export const metadata: Metadata = {
  title: "Can I Bring This to Japan?",
  description,
  keywords: [
    "Japan customs what can I bring",
    "Japan medication travel rules",
    "Japan quarantine food",
    "Japan power bank rules flight",
    "declare cash Japan",
  ],
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    type: "website",
    url: CANONICAL,
    siteName: SITE_NAME,
    title: "Can I Bring This to Japan?",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Can I Bring This to Japan?",
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
      name: "Can I Bring This to Japan?",
      description,
      inLanguage: "en-US",
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: siteUrl() },
      breadcrumb: { "@id": `${CANONICAL}#breadcrumb` },
    },
    {
      "@type": "SoftwareApplication",
      name: "Can I Bring This to Japan? Checker",
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
          name: "Can I Bring This to Japan?",
          item: CANONICAL,
        },
      ],
    },
  ],
};

export default function CanIBringThisToJapanPage() {
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
              <span className="text-dark">Can I Bring This to Japan?</span>
            </nav>
          </div>
        </div>

        <article className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10">
          <header className="mb-10 max-w-3xl lg:mb-12">
            <p className="editorial-kicker mb-3">Tool</p>
            <h1 className="guide-page-title text-balance">
              Can I Bring This to Japan?
            </h1>
            <p className="editorial-deck mt-4 max-w-2xl text-pretty">
              Plain-language flags for common carry items. It is not a legal
              shortcut. Use it to see what to double check, then read official
              customs, quarantine, airline, and health sources for your case.
            </p>
          </header>

          <CanIBringThisToJapanChecker />

          <ToolPageCrosslinks currentSlug="can-i-bring-this-to-japan" />
        </article>
      </main>
    </>
  );
}
