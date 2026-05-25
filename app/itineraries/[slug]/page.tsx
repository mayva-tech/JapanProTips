import type { Metadata } from "next";
import Link from "next/link";
import { ItineraryResult } from "@/components/itinerary/ItineraryResult";
import { getItineraryBySlug } from "@/lib/itinerary/itinerary-storage";
import {
  itineraryDurationLabel,
  itineraryThemeLabel,
  startCityLabel,
} from "@/lib/itinerary/itinerary-options";
import { isValidItinerarySlug } from "@/lib/itinerary/validate-saved-itinerary";
import { pageTitle, siteUrl, SITE_NAME } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const NOINDEX_ROBOTS: Metadata["robots"] = {
  index: false,
  follow: false,
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!isValidItinerarySlug(slug)) {
    return {
      title: pageTitle("Itinerary not found"),
      robots: NOINDEX_ROBOTS,
    };
  }

  const itinerary = await getItineraryBySlug(slug);
  if (!itinerary) {
    return {
      title: pageTitle("Itinerary not found"),
      robots: NOINDEX_ROBOTS,
    };
  }

  const description = `${itineraryDurationLabel(itinerary.duration)} in Japan starting from ${startCityLabel(itinerary.startCity)}, ${itineraryThemeLabel(itinerary.theme)} theme. Shared itinerary from ${SITE_NAME}.`;

  return {
    title: pageTitle(itinerary.title),
    description,
    robots: NOINDEX_ROBOTS,
    alternates: {
      canonical: `${siteUrl()}/itineraries/${slug}`,
    },
    openGraph: {
      type: "article",
      url: `${siteUrl()}/itineraries/${slug}`,
      siteName: SITE_NAME,
      title: itinerary.title,
      description,
      locale: "en_US",
    },
  };
}

export default async function SharedItineraryPage({ params }: PageProps) {
  const { slug } = await params;

  if (!isValidItinerarySlug(slug)) {
    return <ItineraryNotFound />;
  }

  const itinerary = await getItineraryBySlug(slug);
  if (!itinerary) {
    return <ItineraryNotFound />;
  }

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
            <Link
              href="/tools/japan-itinerary-planner"
              className="text-rust hover:text-maroon"
            >
              Itinerary planner
            </Link>
            <span aria-hidden className="mx-2 text-tan">
              /
            </span>
            <span className="text-dark">Shared itinerary</span>
          </nav>
        </div>
      </div>

      <article className="mx-auto max-w-6xl px-4 pb-8 pt-8 sm:px-6 sm:pb-8 sm:pt-8">
        <header className="mb-6 max-w-3xl">
          <p className="editorial-kicker mb-3">Shared itinerary</p>
          <p className="article-body-sm max-w-2xl text-muted">
            Read-only view. Links expire after 30 days unless saved again from
            the planner.
          </p>
        </header>

        <div className="mx-auto max-w-3xl">
          <ItineraryResult itinerary={itinerary} readOnly />
        </div>
      </article>
    </main>
  );
}

function ItineraryNotFound() {
  return (
    <main className="min-h-screen bg-cream font-sans">
      <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-8">
        <p className="editorial-kicker mb-3">Shared itinerary</p>
        <h1 className="guide-page-title text-balance">Itinerary not found</h1>
        <p className="article-body mt-4 max-w-2xl text-muted">
          This link may have expired after 30 days, or the itinerary was never
          saved. Build a new outline with the planner and save a fresh link.
        </p>
        <p className="mt-6">
          <Link
            href="/tools/japan-itinerary-planner"
            className="inline-flex items-center justify-center rounded-md bg-maroon px-6 py-3.5 font-sans text-base font-bold uppercase tracking-widest text-white transition-colors duration-150 hover:bg-rust"
          >
            Open itinerary planner
          </Link>
        </p>
      </article>
    </main>
  );
}
