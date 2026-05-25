import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ItineraryPlannerFeaturedTemplates } from "@/components/itinerary/ItineraryPlannerFeaturedTemplates";
import { ItineraryPlannerFootnotes } from "@/components/itinerary/ItineraryPlannerFootnotes";
import { ItineraryPlannerForm } from "@/components/itinerary/ItineraryPlannerForm";
import { ItineraryPlannerLimitations } from "@/components/itinerary/ItineraryPlannerLimitations";
import { ToolPageCrosslinks } from "@/components/tools/ToolPageCrosslinks";
import { siteUrl, SITE_NAME } from "@/lib/site";

const PATH = "/tools/japan-itinerary-planner";
const CANONICAL = `${siteUrl()}${PATH}`;

const description =
  "Free Japan itinerary planner: set trip length, start city, theme, travel style, and pace. Build a practical day-by-day outline for your first or return trip.";

export const metadata: Metadata = {
  title: "Japan Itinerary Planner",
  description,
  keywords: [
    "Japan itinerary planner",
    "Japan trip planner",
    "7 day Japan itinerary",
    "Tokyo Kyoto itinerary",
    "Japan travel itinerary tool",
    "first time Japan itinerary",
  ],
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    type: "website",
    url: CANONICAL,
    siteName: SITE_NAME,
    title: "Japan Itinerary Planner",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Japan Itinerary Planner",
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
      name: "Japan Itinerary Planner",
      description,
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: siteUrl() },
      inLanguage: "en-US",
      breadcrumb: { "@id": `${CANONICAL}#breadcrumb` },
    },
    {
      "@type": "SoftwareApplication",
      name: "Japan Itinerary Planner",
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
          name: "Japan Itinerary Planner",
          item: CANONICAL,
        },
      ],
    },
  ],
};

const RELATED_GUIDES: { href: string; label: string }[] = [
  { href: "/guides/japan-itinerary", label: "Japan itinerary guide" },
  {
    href: "/guides/japan-budget-breakdown",
    label: "Japan budget breakdown",
  },
  { href: "/guides/japan-trains", label: "Japan trains guide" },
  { href: "/guides/sim-card-japan", label: "SIM card in Japan" },
  { href: "/guides/where-to-stay-tokyo", label: "Where to stay in Tokyo" },
];

export default function JapanItineraryPlannerPage() {
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
              <span className="text-dark">Itinerary planner</span>
            </nav>
          </div>
        </div>

        <article className="mx-auto max-w-6xl px-4 pb-8 pt-8 sm:px-6 sm:pb-8 sm:pt-8">
          <header className="mb-6 max-w-3xl lg:mb-6">
            <p className="editorial-kicker mb-3">Tool</p>
            <h1 className="guide-page-title text-balance">
              Japan Itinerary Planner
            </h1>
            <p className="editorial-deck mt-4 max-w-2xl text-pretty">
              Sketch a realistic Japan route before you book hotels or JR Pass
              extras. Pick your length, start city, theme, budget band, and daily
              pace. The generator will turn that into a day-by-day outline you
              can refine.
            </p>
</header>

          <section className="mb-6 max-w-3xl">
            <p className="article-body leading-relaxed text-muted">
              This planner is for first-time visitors and return travelers who
              want a field-guide style route, not a generic bucket list. You
              will get neighborhood anchors, transit-friendly day flow, and
              buffer time that matches how hard you want to push each day.
            </p>
            <p className="article-body mt-3 leading-relaxed text-muted">
              Step one is the form below. You can also start from a curated
              outline, then generate and edit your own version.
            </p>
            <p className="mt-4">
              <Link
                href="/itinerary-templates"
                className="font-sans text-sm font-bold text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
              >
                Browse curated itinerary examples →
              </Link>
            </p>
          </section>

          <ItineraryPlannerFeaturedTemplates />

          <Suspense
            fallback={
              <p className="article-body-sm mx-auto max-w-3xl text-muted">
                Loading planner…
              </p>
            }
          >
            <ItineraryPlannerForm />
          </Suspense>

          <div className="mx-auto mt-6 space-y-8">
            <ItineraryPlannerLimitations />
            <ItineraryPlannerFootnotes />
          </div>

          <section
            className="mx-auto mt-6 max-w-3xl rounded-lg border border-paper-edge bg-paper-card/90 p-6 shadow-editorial sm:p-8"
            aria-labelledby="itinerary-guides-heading"
          >
            <h2
              id="itinerary-guides-heading"
              className="font-display text-xl font-bold italic text-dark sm:text-2xl"
            >
              Pair the planner with guides
            </h2>
            <p className="article-body-sm mt-2 max-w-2xl text-muted">
              Use these after you generate a draft outline, or while you refine
              money, trains, and hotel decisions.
            </p>
            <ul className="mt-6 flex flex-col gap-3 font-sans text-sm font-semibold">
              {RELATED_GUIDES.map((g) => (
                <li key={g.href}>
                  <Link
                    href={g.href}
                    className="inline-flex text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
                  >
                    {g.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <div className="mx-auto max-w-3xl">
            <ToolPageCrosslinks currentSlug="japan-itinerary-planner" />
          </div>
        </article>
      </main>
    </>
  );
}
