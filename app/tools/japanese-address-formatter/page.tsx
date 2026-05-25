import type { Metadata } from "next";
import Link from "next/link";
import { JapaneseAddressFormatter } from "@/components/tools/JapaneseAddressFormatter";
import { ToolPageCrosslinks } from "@/components/tools/ToolPageCrosslinks";
import { siteUrl, SITE_NAME } from "@/lib/site";

const PATH = "/tools/japanese-address-formatter";
const CANONICAL = `${siteUrl()}${PATH}`;

const description =
  "Free client-side Japanese address formatter: build Japanese order, English-friendly blocks, and delivery-style lines from postal code, prefecture, ward, chome, ban, go, building, room, and name. Copy for forms and labels.";

export const metadata: Metadata = {
  title: "Japanese Address Formatter",
  description,
  keywords: [
    "Japanese address format",
    "Japan address English",
    "Japan postal code format",
    "chome ban go",
    "Japan delivery address",
    "JapanProTips tools",
  ],
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    type: "website",
    url: CANONICAL,
    siteName: SITE_NAME,
    title: "Japanese Address Formatter",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Japanese Address Formatter",
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
      name: "Japanese Address Formatter",
      description,
      inLanguage: "en-US",
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: siteUrl() },
      breadcrumb: { "@id": `${CANONICAL}#breadcrumb` },
    },
    {
      "@type": "SoftwareApplication",
      name: "Japanese Address Formatter",
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
          name: "Japanese Address Formatter",
          item: CANONICAL,
        },
      ],
    },
  ],
};

export default function JapaneseAddressFormatterPage() {
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
              <span className="text-dark">Japanese Address Formatter</span>
            </nav>
          </div>
        </div>

        <article className="mx-auto max-w-6xl px-4 pb-8 pt-8 sm:px-6 sm:pb-8 sm:pt-8">
          <header className="mb-6 max-w-3xl lg:mb-6">
            <p className="editorial-kicker mb-3">Tool</p>
            <h1 className="guide-page-title text-balance">
              Japanese Address Formatter
            </h1>
            <p className="editorial-deck mt-4 max-w-2xl text-pretty">
              Paste or type address pieces once, then copy Japanese order,
              English-friendly blocks, or a compact delivery-style layout. Runs
              entirely in your browser. Always verify against the official label
              or form you are filling.
            </p>
          </header>

          <JapaneseAddressFormatter />

          <section
            className="mt-6 max-w-3xl rounded-lg border border-paper-edge bg-paper-card/90 p-6 shadow-editorial sm:p-8"
            aria-labelledby="addr-related-heading"
          >
            <h2
              id="addr-related-heading"
              className="font-display text-xl font-bold italic text-dark sm:text-2xl"
            >
              Related on Japan Pro Tips
            </h2>
            <p className="article-body-sm mt-2 text-muted">
              Context for how addresses are written, what changes when you move,
              and mail basics in Japan.
            </p>
            <ul className="mt-6 flex flex-col gap-3 font-sans text-sm font-semibold">
              <li>
                <Link
                  href="/residents/japan-address-system"
                  className="inline-flex text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
                >
                  How Japanese addresses work →
                </Link>
              </li>
              <li>
                <Link
                  href="/residents/japan-moving-out-guide"
                  className="inline-flex text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
                >
                  Japan moving out guide →
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/moving-to-japan-checklist"
                  className="inline-flex text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
                >
                  Moving to Japan checklist →
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/japan-post-office-guide"
                  className="inline-flex text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
                >
                  Japan post office guide →
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

          <ToolPageCrosslinks currentSlug="japanese-address-formatter" />
        </article>
      </main>
    </>
  );
}
