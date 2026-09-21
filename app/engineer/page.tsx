import type { Metadata } from "next";
import Link from "next/link";
import { CategoryGrid } from "@/components/engineering/CategoryGrid";
import { CornerstoneGuideGrid } from "@/components/engineering/CornerstoneGuideGrid";
import { EngineerContentTracks } from "@/components/engineering/EngineerContentTracks";
import { EngineeringFinalCta } from "@/components/engineering/EngineeringFinalCta";
import { EngineeringPageFooter } from "@/components/engineering/EngineeringPageFooter";
import { UpcomingGuideGrid } from "@/components/engineering/UpcomingGuideGrid";
import { MagazinePageHeader } from "@/components/editorial/MagazinePageHeader";
import { MagazineSectionTitle } from "@/components/editorial/MagazineSectionTitle";
import { MagazineShell } from "@/components/editorial/MagazineShell";
import {
  CORNERSTONE_GUIDES,
  ENGINEER_CATEGORIES,
  ENGINEER_CONTENT_TRACKS,
  ENGINEER_HUB_CREDIBILITY_BODY,
  ENGINEER_HUB_CREDIBILITY_HEADLINE,
  ENGINEER_HUB_KEYWORDS,
  ENGINEER_HUB_STRATEGY_BALANCE,
  ENGINEER_HUB_STRATEGY_INTRO,
  ENGINEER_UPCOMING_GUIDES,
  ENGINEERING_SAMPLE_REVIEW_MAILTO,
} from "@/lib/engineering-copy";
import { SITE_NAME, siteUrl } from "@/lib/site";

const PATH = "/engineer";
const CANONICAL = `${siteUrl()}${PATH}`;

const description =
  "Engineering in Japan: career paths, engineering jobs, manufacturing insights, and technical communication guidance from a foreign engineer with more than 25 years inside Japanese product development organizations.";

export const metadata: Metadata = {
  title: "Engineering in Japan | Careers, Manufacturing & Communication",
  description,
  keywords: [...ENGINEER_HUB_KEYWORDS],
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    type: "website",
    url: CANONICAL,
    siteName: SITE_NAME,
    title: "Engineering in Japan | Careers, Manufacturing & Communication",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering in Japan | Careers, Manufacturing & Communication",
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
      "@type": "CollectionPage",
      "@id": `${CANONICAL}#webpage`,
      url: CANONICAL,
      name: "Engineering in Japan",
      description,
      inLanguage: "en-US",
      isPartOf: {
        "@type": "WebSite",
        name: SITE_NAME,
        url: siteUrl(),
      },
    },
  ],
};

const inlineLink =
  "editorial-chevron-link font-bold text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon";

export default function EngineerHubPage() {
  return (
    <main className="min-h-screen bg-paper font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <MagazinePageHeader
        kicker="Engineering in Japan"
        title="Working in Japan as an Engineer, Without the Guesswork"
        description={description}
      />

      <MagazineShell className="py-10 sm:py-12">
        <section className="mb-12">
          <MagazineSectionTitle title="What This Section Covers" />
          <p className="article-body mb-4 max-w-2xl">{ENGINEER_HUB_STRATEGY_INTRO}</p>
          <p className="article-body mb-6 max-w-2xl">{ENGINEER_HUB_STRATEGY_BALANCE}</p>
          <EngineerContentTracks tracks={ENGINEER_CONTENT_TRACKS} />
        </section>

        <section className="mb-12">
          <MagazineSectionTitle title={ENGINEER_HUB_CREDIBILITY_HEADLINE} />
          <p className="article-body mb-6 max-w-2xl">{ENGINEER_HUB_CREDIBILITY_BODY}</p>
          <p className="article-body max-w-2xl">
            <Link href="/about-engineer" className={inlineLink}>
              Learn the founder&apos;s engineering background
            </Link>
          </p>
        </section>

        <section className="mb-12">
          <MagazineSectionTitle title="Published Cornerstone Guides" />
          <p className="article-body mb-6 max-w-2xl">
            Five cornerstone articles cover founder authority, decision-making,
            career paths, hiring signals, and on-the-job expectations for foreign
            engineers. Upcoming guides continue with mistakes, industries, and
            communication topics.
          </p>
          <CornerstoneGuideGrid guides={CORNERSTONE_GUIDES} />
        </section>

        <section className="mb-12">
          <MagazineSectionTitle title="Upcoming Guides" />
          <p className="article-body mb-6 max-w-2xl">
            Roadmap priority reflects search demand for engineering careers in
            Japan, founder authority on manufacturing, and communication topics
            tied to consulting support.
          </p>
          <UpcomingGuideGrid guides={ENGINEER_UPCOMING_GUIDES} />
        </section>

        <section className="mb-12">
          <MagazineSectionTitle title="Browse by Topic" />
          <CategoryGrid categories={ENGINEER_CATEGORIES} />
        </section>

        <section className="mb-4">
          <MagazineSectionTitle title="Need Help Communicating Technical Work Clearly?" />
          <p className="article-body max-w-2xl">
            Documentation review, report and presentation clarity, and supplier
            communication support for engineers and teams working across Japanese
            and international environments.{" "}
            <Link href="/engineering-services" className={inlineLink}>
              Explore engineering services
            </Link>
          </p>
        </section>
      </MagazineShell>

      <EngineeringFinalCta
        headline="Need a Second Set of Engineering Eyes?"
        description="Request a free sample review of an engineering report, presentation draft, or supplier communication. Scope and quote follow if you want to proceed."
        primaryLabel="Request a Free Sample Review"
        primaryHref={ENGINEERING_SAMPLE_REVIEW_MAILTO}
        secondaryLabel="Explore engineering services"
        secondaryHref="/engineering-services"
      />

      <EngineeringPageFooter />
    </main>
  );
}
