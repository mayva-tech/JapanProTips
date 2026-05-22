import type { Metadata } from "next";
import Link from "next/link";
import { ItineraryTemplateCard } from "@/components/itinerary/templates/ItineraryTemplateCard";
import { getAllCuratedItineraryTemplates } from "@/lib/itinerary/curated-itinerary-templates";
import { buildPlannerUrl } from "@/lib/itinerary/build-planner-url";
import { EDITORIAL_COPY } from "@/lib/editorial-copy";
import { pageTitle, siteUrl, SITE_NAME } from "@/lib/site";

const PATH = "/itinerary-templates";
const CANONICAL = `${siteUrl()}${PATH}`;

const description =
  "Fifteen curated Japan itinerary examples for first-time trips, Tokyo-Kyoto-Osaka loops, food and family routes, budget weeks, and city-focused outlines. Use them as starting points, then build your own in the planner.";

export const metadata: Metadata = {
  title: pageTitle("Japan Itinerary Templates"),
  description,
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    url: CANONICAL,
    siteName: SITE_NAME,
    title: "Japan Itinerary Templates",
    description,
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

const RELATED_GUIDES = [
  { href: "/guides/japan-itinerary", label: "Japan itinerary guide" },
  { href: "/guides/japan-budget-breakdown", label: "Japan budget breakdown" },
  { href: "/guides/japan-trains", label: "Japan trains guide" },
  { href: "/guides/where-to-stay-tokyo", label: "Where to stay in Tokyo" },
] as const;

export default function ItineraryTemplatesIndexPage() {
  const templates = getAllCuratedItineraryTemplates();

  return (
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
            <span className="text-dark">Itinerary templates</span>
          </nav>
        </div>
      </div>

      <article className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10">
        <header className="mb-10 max-w-3xl">
          <p className="editorial-kicker mb-3">Curated examples</p>
          <h1 className="guide-page-title text-balance">
            Japan Itinerary Templates
          </h1>
          <p className="editorial-deck mt-4 max-w-2xl text-pretty">
            These are editorial starting points, not live bookings or
            auto-generated trips. Read the outline, then open the planner to
            generate a version you can edit, save, and export.
          </p>
          <p className="article-body-sm mt-4 font-sans text-sm font-semibold text-muted">
            {EDITORIAL_COPY.trustLine}
          </p>
          <p className="mt-6">
            <Link href={buildPlannerUrl()} className="editorial-btn-primary">
              Open itinerary planner
            </Link>
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {templates.map((template) => (
            <ItineraryTemplateCard key={template.slug} template={template} />
          ))}
        </ul>

        <section
          className="mx-auto mt-14 max-w-3xl rounded-lg border border-paper-edge bg-paper-card/90 p-6 shadow-editorial sm:p-8"
          aria-labelledby="template-guides-heading"
        >
          <h2
            id="template-guides-heading"
            className="font-display text-xl font-bold italic text-dark sm:text-2xl"
          >
            Plan with guides
          </h2>
          <p className="article-body-sm mt-2 max-w-2xl text-muted">
            Pair a template with deeper field notes on trains, budget, and stays.
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
      </article>
    </main>
  );
}
