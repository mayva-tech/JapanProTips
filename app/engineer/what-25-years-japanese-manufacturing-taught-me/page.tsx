import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Callout } from "@/components/editorial/Callout";
import { EngineeringPageFooter } from "@/components/engineering/EngineeringPageFooter";
import { CORNERSTONE_25_YEARS_PATH, CORNERSTONE_DECISIONS_PATH } from "@/lib/engineering-copy";
import { SITE_NAME, siteUrl } from "@/lib/site";

const PATH = CORNERSTONE_25_YEARS_PATH;
const CANONICAL = `${siteUrl()}${PATH}`;

const title = "What 25 Years Working in Japanese Manufacturing Taught Me";
const description =
  "Practical lessons from a foreign engineer with more than 25 years of experience working in Japan's manufacturing, automotive, CAD, CAE, and product development environments.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Japanese manufacturing",
    "foreign engineer Japan",
    "engineering career Japan",
    "automotive engineer Japan",
    "product development Japan",
    "CAD engineer Japan",
    "CAE engineer Japan",
    "supplier coordination Japan",
    "engineering communication",
    "technical documentation",
  ],
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    type: "article",
    url: CANONICAL,
    siteName: SITE_NAME,
    title,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
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
      name: title,
      description,
      inLanguage: "en-US",
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: siteUrl() },
      breadcrumb: { "@id": `${CANONICAL}#breadcrumb` },
    },
    {
      "@type": "Article",
      "@id": `${CANONICAL}#article`,
      headline: title,
      description,
      inLanguage: "en-US",
      isPartOf: { "@id": `${CANONICAL}#webpage` },
      author: {
        "@type": "Organization",
        name: SITE_NAME,
      },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        url: siteUrl(),
      },
      mainEntityOfPage: { "@id": `${CANONICAL}#webpage` },
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
          name: "Engineer",
          item: `${siteUrl()}/engineer`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: title,
          item: CANONICAL,
        },
      ],
    },
  ],
};

const inlineLink =
  "font-bold text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon";

function H2({ children }: { children: ReactNode }) {
  return <h2 className="editorial-heading mb-4 mt-10">{children}</h2>;
}

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

export default function What25YearsJapaneseManufacturingTaughtMePage() {
  return (
    <main className="min-h-screen bg-cream font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="page-x mx-auto min-w-0 max-w-3xl pb-14 pt-10">
        <p className="editorial-kicker mb-3">
          <Link href="/engineer" className={inlineLink}>
            Engineer
          </Link>
        </p>
        <h1 className="guide-page-title">{title}</h1>

        <div className="guide-prose max-w-2xl">
          <p>
            Manufacturing in Japan teaches lessons slowly. You learn them in
            design reviews, supplier meetings, validation reports, and the quiet
            moments when a drawing change ripples through production. This article
            is based on more than 25 years working as a foreign engineer inside
            Japan&apos;s manufacturing and product development environments,
            including automotive programs, CAD and CAE work, supplier
            coordination, and technical documentation.
          </p>
          <p>
            It is not a complete guide to every company or every industry. It is
            a set of practical lessons from real engineering work: what mattered
            when schedules slipped, when overseas teams misread a report, or when
            a supplier issue threatened a release date.
          </p>

          <H2>Lesson 1: Engineering decisions are rarely only technical</H2>
          <p>
            On paper, engineering looks like calculations, models, and test data.
            In practice, a design decision is almost always filtered through cost,
            quality targets, production feasibility, supplier capability, schedule,
            customer requirements, and internal approval flow. A CAE result that
            looks acceptable in isolation may fail once tooling lead time, part
            cost, or assembly constraints enter the discussion.
          </p>
          <p>
            Product development in Japanese manufacturing organizations often
            moves through layers of review. CAD changes that look minor in the
            model can trigger validation rework, supplier re-quotes, or line
            preparation delays. Learning to state not just what the analysis
            shows, but what trade-offs the organization is being asked to accept,
            is one of the first skills that separates workable engineers from
            frustrated ones.
          </p>
          <Callout title="Field note">
            <p>
              Before presenting a design recommendation, list the non-technical
              constraints you already know: cost band, target date, supplier
              status, and who must approve. It saves one round of &quot;yes, but
              can we actually build it?&quot;
            </p>
          </Callout>

          <H2>Lesson 2: Clear documentation protects everyone</H2>
          <p>
            Engineering documentation is not paperwork for its own sake. Reports,
            change records, drawings, design review notes, test results, and
            supplier communication records are how organizations remember why a
            decision was made, who agreed, and what assumptions were in force at
            the time.
          </p>
          <p>
            Vague reports create rework later. A test summary that says
            &quot;result OK&quot; without conditions, limits, or open items forces
            the next engineer to reconstruct context from memory or email threads.
            Change documentation that skips the reason for a revision invites the
            same question six months later when a similar issue appears on a
            related program.
          </p>
          <p>
            Inside Japanese manufacturing environments, written records often
            carry more weight than verbal agreement in a meeting. That does not
            mean meetings are unimportant. It means the meeting outcome should
            land in a document someone else can follow without having been in the
            room.
          </p>

          <H2>Lesson 3: Supplier communication can make or break a project</H2>
          <p>
            Supplier coordination affects quality, timing, cost, and production
            readiness. A unclear corrective action request, a missing dimension
            reference, or an ambiguous acceptance criterion can cost weeks. Overseas
            affiliates and domestic suppliers both need the same thing: specific
            failure modes, expected evidence, and a clear decision path.
          </p>
          <p>
            Strong supplier communication is not aggressive language. It is
            structured language: what failed, how it was detected, what standard
            applies, what response is required, and by when. Email threads that
            mix frustration with incomplete data slow resolution. Written records
            that separate facts from requests move faster.
          </p>
          <Callout variant="mistake" title="What people get wrong">
            <p>
              Treating supplier email as informal chat. If it affects quality,
              schedule, or release, it belongs in a form the next person on the
              program can audit.
            </p>
          </Callout>

          <H2>Lesson 4: CAD and CAE are tools, not the whole job</H2>
          <p>
            CAD and CAE skills matter. They are entry points into product
            development work and often define early career paths. But the job
            expands quickly into communication, judgment, manufacturing awareness,
            change management, and coordination with quality, production, and
            purchasing.
          </p>
          <p>
            An accurate model that ignores assembly sequence, service access, or
            supplier process limits creates downstream pain. An analysis report
            that never connects to a decision document stays orphaned on a shared
            drive. Engineers who progress inside Japanese organizations usually
            learn to connect tool output to the next meeting, the next approval,
            and the next build.
          </p>

          <H2>Lesson 5: Japanese engineering culture rewards preparation</H2>
          <p>
            Preparation before meetings is not performative. Review materials sent
            early, clear charts, and explicit options reduce meeting time and
            reduce surprises. Alignment work often happens before the formal
            review: checking assumptions with the responsible section, confirming
            data with the test group, and making sure the right approver sees the
            risk summary in advance.
          </p>
          <p>
            This is not about perfectionism for its own sake. It is about
            reducing the cost of misunderstanding in organizations where many
            stakeholders touch the same change. A foreign engineer who shows up
            prepared earns trust faster than one who improvises from slides alone.
          </p>

          <H2>Lesson 6: Foreign engineers need more than technical skill</H2>
          <p>
            Technical skill gets you into the work. Staying effective requires
            documentation skill, communication skill, patience with approval
            processes, and the ability to read context: who owns the decision,
            what has already been tried, and what the production floor actually
            needs this month.
          </p>
          <p>
            Explaining technical points simply, without diluting engineering
            meaning, is a career skill. Overseas teams, executives, suppliers,
            and new hires all need different levels of detail. The same engineer
            may write a one-page executive summary in the morning and a detailed
            failure analysis in the afternoon.
          </p>

          <H2>Lesson 7: Good engineering communication reduces risk</H2>
          <p>
            Clear technical communication reduces misunderstandings, rework, late
            design changes, supplier confusion, weak handovers between teams, and
            career materials that fail to show what you actually delivered.
          </p>
          <p>
            That is why the{" "}
            <Link href="/engineering-services" className={inlineLink}>
              engineering services
            </Link>{" "}
            section exists: not as generic editing, but as review from someone
            who has lived inside manufacturing documentation, supplier threads,
            and cross-border engineering teams. Reports, presentations, and
            supplier drafts benefit when technical meaning, structure, and audience
            are treated as engineering problems, not language problems alone.
          </p>

          <H2>Practical takeaways</H2>
          <p>
            If you are early in a manufacturing career in Japan, or returning to
            documentation after years of CAD-only work, these habits pay back:
          </p>
          <BulletList
            items={[
              "Write decisions down, including rejected options and why",
              "Confirm assumptions before they become production facts",
              "Keep technical explanations simple without hiding uncertainty",
              "Respect manufacturing and supplier constraints in design discussions",
              "Learn how your company actually approves changes, not how the chart says it should work",
              "Do not rely on CAD or CAE skill alone for long-term credibility",
              "Build communication credibility the same way you build technical credibility",
            ]}
          />

          <H2>Where to Go Next</H2>
          <p>
            This article is one cornerstone guide in a broader engineering section
            on JapanProTips. For how decisions move through Japanese engineering
            organizations, read{" "}
            <Link href={CORNERSTONE_DECISIONS_PATH} className={inlineLink}>
              how Japanese engineering organizations actually make decisions
            </Link>
            . If you want more context on the background behind these lessons,
            read{" "}
            <Link href="/about-engineer" className={inlineLink}>
              about the engineer
            </Link>
            . For ongoing topics, visit the{" "}
            <Link href="/engineer" className={inlineLink}>
              engineer hub
            </Link>
            . If you need help communicating technical work clearly, see{" "}
            <Link href="/engineering-services" className={inlineLink}>
              engineering services
            </Link>
            .
          </p>
        </div>
      </article>

      <EngineeringPageFooter />
    </main>
  );
}
