import type { Metadata } from "next";
import Link from "next/link";
import { EngineeringFinalCta } from "@/components/engineering/EngineeringFinalCta";
import { EngineeringPageFooter } from "@/components/engineering/EngineeringPageFooter";
import { ExperiencePillarsGrid } from "@/components/engineering/ExperiencePillarsGrid";
import { MagazinePageHeader } from "@/components/editorial/MagazinePageHeader";
import { MagazineSectionTitle } from "@/components/editorial/MagazineSectionTitle";
import { MagazineShell } from "@/components/editorial/MagazineShell";
import {
  ABOUT_ENGINEER_HERO_DESCRIPTION,
  ABOUT_ENGINEER_HERO_TITLE,
  ABOUT_ENGINEER_KEYWORDS,
  ABOUT_FOUNDER_POSITIONING_BODY,
  ABOUT_FOUNDER_POSITIONING_HEADLINE,
  ABOUT_SITE_HELPS_WITH,
  ABOUT_SITE_IS,
  ABOUT_SITE_IS_NOT,
  EXPERIENCE_PILLARS,
} from "@/lib/engineering-copy";
import { SITE_NAME, siteUrl } from "@/lib/site";

const PATH = "/about-engineer";
const CANONICAL = `${siteUrl()}${PATH}`;

const description =
  "Learn about the foreign engineer behind JapanProTips' engineering section, with more than 25 years of experience in Japan's manufacturing, automotive, CAD, CAE, and product development environments.";

export const metadata: Metadata = {
  title: "About the Engineer Behind Japan Pro Tips",
  description,
  keywords: [...ABOUT_ENGINEER_KEYWORDS],
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    type: "website",
    url: CANONICAL,
    siteName: SITE_NAME,
    title: "About the Engineer Behind Japan Pro Tips",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "About the Engineer Behind Japan Pro Tips",
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
      "@type": "AboutPage",
      "@id": `${CANONICAL}#webpage`,
      url: CANONICAL,
      name: "About the Engineer Behind Japan Pro Tips",
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

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="article-body list-none space-y-3 pl-0 max-w-2xl">
      {items.map((item) => (
        <li
          key={item}
          className="before:mr-3 before:font-bold before:text-rust before:content-['›']"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function AboutEngineerPage() {
  return (
    <main className="min-h-screen bg-paper font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <MagazinePageHeader
        kicker="Engineering"
        title={ABOUT_ENGINEER_HERO_TITLE}
        description={ABOUT_ENGINEER_HERO_DESCRIPTION}
        actions={
          <>
            <Link href="/engineer" className="editorial-btn-primary editorial-chevron-cta">
              Explore Engineer Hub
            </Link>
            <Link href="/engineering-services" className={inlineLink}>
              View Engineering Services
            </Link>
          </>
        }
      />

      <MagazineShell className="py-10 sm:py-12">
        <section className="mb-12">
          <MagazineSectionTitle title={ABOUT_FOUNDER_POSITIONING_HEADLINE} />
          <div className="article-body max-w-2xl space-y-4">
            {ABOUT_FOUNDER_POSITIONING_BODY.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <MagazineSectionTitle title="Experience Pillars" />
          <ExperiencePillarsGrid pillars={EXPERIENCE_PILLARS} />
        </section>

        <section className="mb-12">
          <MagazineSectionTitle title="What This Site Helps With" />
          <BulletList items={ABOUT_SITE_HELPS_WITH} />
        </section>

        <section className="mb-12">
          <MagazineSectionTitle title="What This Site Is Not" />
          <p className="article-body mb-4 max-w-2xl">
            The engineering vertical is deliberately focused. It is not:
          </p>
          <BulletList items={ABOUT_SITE_IS_NOT} />
          <p className="article-body mb-4 mt-8 max-w-2xl">It is:</p>
          <BulletList items={ABOUT_SITE_IS} />
        </section>

        <section className="mb-4">
          <MagazineSectionTitle title="Who This Helps" />
          <p className="article-body max-w-2xl">
            Engineers working in Japan, engineers planning to work in Japan,
            manufacturing and product development teams, and organizations that
            need clearer technical communication across Japanese and
            international engineering teams.
          </p>
        </section>
      </MagazineShell>

      <EngineeringFinalCta
        headline="Start With the Engineering Hub"
        description="If you are an engineer working in Japan, planning to work in Japan, or trying to communicate technical work across borders, start with the engineering hub."
        primaryLabel="Engineer Hub"
        primaryHref="/engineer"
        secondaryLabel="Engineering Services"
        secondaryHref="/engineering-services"
      />

      <EngineeringPageFooter />
    </main>
  );
}
