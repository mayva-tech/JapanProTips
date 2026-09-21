import type { Metadata } from "next";
import Link from "next/link";
import { BeforeAfterShowcase } from "@/components/engineering/BeforeAfterShowcase";
import { EngineeringFinalCta } from "@/components/engineering/EngineeringFinalCta";
import { EngineeringPageFooter } from "@/components/engineering/EngineeringPageFooter";
import { ProcessSection } from "@/components/engineering/ProcessSection";
import { ServiceGrid } from "@/components/engineering/ServiceGrid";
import { MagazinePageHeader } from "@/components/editorial/MagazinePageHeader";
import { MagazineSectionTitle } from "@/components/editorial/MagazineSectionTitle";
import { MagazineShell } from "@/components/editorial/MagazineShell";
import {
  BEFORE_AFTER_EXAMPLES,
  ENGINEERING_CHALLENGES,
  ENGINEERING_FOUNDER_INTRO,
  ENGINEERING_PROCESS_STEPS,
  ENGINEERING_SAMPLE_REVIEW_MAILTO,
  ENGINEERING_SERVICES,
  ENGINEERING_SERVICES_CREDIBILITY_BODY,
  ENGINEERING_SERVICES_CREDIBILITY_HEADLINE,
  ENGINEERING_SERVICES_FAQ,
  ENGINEERING_SERVICES_KEYWORDS,
  ENGINEERING_SERVICES_POSITIONING,
  ENGINEERING_TRUST_AREAS,
  FOUNDER_CREDIBILITY_POINTS,
} from "@/lib/engineering-copy";
import { SITE_NAME, siteUrl } from "@/lib/site";

const PATH = "/engineering-services";
const CANONICAL = `${siteUrl()}${PATH}`;

const description =
  "Engineering communication support for documentation, reports, presentations, and supplier communication across Japanese and international engineering teams. From a foreign engineer with 25+ years in manufacturing and product development.";

export const metadata: Metadata = {
  title: "Engineering Communication Support",
  description,
  keywords: [...ENGINEERING_SERVICES_KEYWORDS],
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    type: "website",
    url: CANONICAL,
    siteName: SITE_NAME,
    title: "Engineering Communication Support",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Communication Support",
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
      name: "Engineering Communication Support",
      description,
      inLanguage: "en-US",
      isPartOf: {
        "@type": "WebSite",
        name: SITE_NAME,
        url: siteUrl(),
      },
    },
    {
      "@type": "ProfessionalService",
      name: "JapanProTips Engineering Communication Support",
      description,
      areaServed: "JP",
      serviceType: [
        "Engineering documentation review",
        "Technical communication review",
        "Engineering presentation and report review",
        "Supplier communication support",
        "Engineer career positioning",
      ],
    },
  ],
};

const inlineLink =
  "editorial-chevron-link font-bold text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon";

function CredibilityList({ items }: { items: readonly string[] }) {
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

export default function EngineeringServicesPage() {
  return (
    <main className="min-h-screen bg-paper font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <MagazinePageHeader
        kicker="Engineering Services"
        title="Engineering Communication Support for Japanese and International Teams"
        description={description}
        actions={
          <>
            <a
              href={ENGINEERING_SAMPLE_REVIEW_MAILTO}
              className="editorial-btn-primary editorial-chevron-cta"
            >
              Request a Free Sample Review
            </a>
            <a
              href="#services"
              className="editorial-chevron-link font-sans text-sm font-bold uppercase tracking-widest text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
            >
              Explore Services
            </a>
          </>
        }
      />

      <MagazineShell className="py-10 sm:py-12">
        <section className="mb-12">
          <MagazineSectionTitle title={ENGINEERING_SERVICES_CREDIBILITY_HEADLINE} />
          <p className="article-body mb-6 max-w-2xl">
            {ENGINEERING_SERVICES_CREDIBILITY_BODY}
          </p>
          <p className="article-body max-w-2xl">
            <Link href="/about-engineer" className={inlineLink}>
              Learn the founder&apos;s engineering background
            </Link>
          </p>
        </section>

        <section className="mb-12">
          <MagazineSectionTitle title="Why Work With Someone Who Has Been There" />
          <p className="article-body mb-6 max-w-2xl">{ENGINEERING_FOUNDER_INTRO}</p>
          <CredibilityList items={FOUNDER_CREDIBILITY_POINTS} />
        </section>

        <section className="mb-12">
          <MagazineSectionTitle title="Challenges We Help Solve" />
          <CredibilityList items={ENGINEERING_CHALLENGES} />
        </section>

        <section className="mb-12">
          <MagazineSectionTitle title="Before & After" />
          <p className="article-body mb-6 max-w-2xl">
            Examples focus on clarity, structure, and communication effectiveness.
            Not marketing language.
          </p>
          <BeforeAfterShowcase examples={BEFORE_AFTER_EXAMPLES} />
        </section>

        <section id="services" className="mb-12 scroll-mt-24">
          <MagazineSectionTitle title="Services" />
          <p className="article-body mb-6 max-w-2xl">
            {ENGINEERING_SERVICES_POSITIONING}
          </p>
          <ServiceGrid services={ENGINEERING_SERVICES} />
        </section>

        <section className="mb-12">
          <MagazineSectionTitle title="How It Works" />
          <ProcessSection steps={ENGINEERING_PROCESS_STEPS} />
        </section>

        <section className="mb-12">
          <MagazineSectionTitle title="Experience You Can Trust" />
          <div className="flex flex-wrap gap-3">
            {ENGINEERING_TRUST_AREAS.map((area) => (
              <span
                key={area}
                className="rounded-lg border border-paper-edge bg-paper-card px-4 py-2 font-sans text-sm font-bold uppercase tracking-widest text-dark"
              >
                {area}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-4">
          <MagazineSectionTitle title="FAQ" />
          <div className="guide-prose max-w-3xl">
            {ENGINEERING_SERVICES_FAQ.map((item) => (
              <section key={item.question} className="mb-10 last:mb-0">
                <h3 className="!mt-0 !border-t-0 !pt-0">{item.question}</h3>
                <p>{item.answer}</p>
              </section>
            ))}
          </div>
        </section>

        <p className="article-body mt-10 max-w-2xl">
          Building a long-term engineering career in Japan?{" "}
          <Link href="/engineer" className={inlineLink}>
            Visit the Engineer hub
          </Link>
          {" · "}
          <Link href="/about-engineer" className={inlineLink}>
            About the engineer
          </Link>
        </p>
      </MagazineShell>

      <EngineeringFinalCta
        headline="Need a Second Set of Engineering Eyes?"
        description="Submit an engineering report, supplier communication draft, or technical presentation for a free initial review. Scope and quote follow if you want to proceed."
        primaryLabel="Request a Free Sample Review"
        primaryHref={ENGINEERING_SAMPLE_REVIEW_MAILTO}
      />

      <EngineeringPageFooter />
    </main>
  );
}
