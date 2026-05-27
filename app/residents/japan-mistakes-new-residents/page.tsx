import type { Metadata } from "next";
import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import type { ReactNode } from "react";
import guideReadAloudData from "@/data/guide-read-aloud.json";
import { GuideAudioPlayer } from "@/components/guides/GuideAudioPlayer";
import { GuideReadAloud } from "@/components/guides/GuideReadAloud";
import { ResidentStarterPath } from "@/components/guides/ResidentStarterPath";
import { ResidentsCrosslinks } from "@/components/guides/ResidentsCrosslinks";
import { ToolRecommendationStrip } from "@/components/tools/ToolRecommendationStrip";
import { TrackedToolLink } from "@/components/tools/TrackedToolLink";
import { siteToolBySlug, toRecommendationCard } from "@/lib/site-tools";
import { siteUrl, SITE_NAME } from "@/lib/site";

const PATH = "/residents/japan-mistakes-new-residents";
const CANONICAL = `${siteUrl()}${PATH}`;

const title = "Japan Mistakes New Residents Make";
const description =
  "Operational mistakes after moving to Japan: move-in cash, ward office timing, insurance, bills, cards, garbage, apartment paperwork, and why home-country habits break.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "moving to Japan mistakes",
    "new resident Japan",
    "Japan apartment move in",
    "ward office Japan foreigner",
    "JapanProTips residents",
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "article",
    url: CANONICAL,
    siteName: SITE_NAME,
    title,
    description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
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
      author: { "@type": "Organization", name: SITE_NAME },
      publisher: { "@type": "Organization", name: SITE_NAME, url: siteUrl() },
      mainEntityOfPage: { "@id": `${CANONICAL}#webpage` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${CANONICAL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl() },
        {
          "@type": "ListItem",
          position: 2,
          name: "Residents",
          item: `${siteUrl()}/residents`,
        },
        { "@type": "ListItem", position: 3, name: title, item: CANONICAL },
      ],
    },
  ],
};

const linkClass =
  "font-sans font-bold text-rust hover:text-maroon transition-colors duration-150";

const toolStripTools = [
  siteToolBySlug("japan-monthly-cost-calculator"),
  siteToolBySlug("japanese-address-formatter"),
]
  .filter((t): t is NonNullable<typeof t> => t != null)
  .map(toRecommendationCard);

const readAloudText = guideReadAloudData["japan-mistakes-new-residents"]?.text ?? "";

type GuideAudioManifest = {
  slug: string;
  voiceProvider: "google";
  voiceTier: "standard";
  languageCode: string;
  voiceName: string;
  audioEncoding: "MP3";
  speakingRate: number;
  parts: string[];
  generatedAt: string;
};

async function loadGuideAudioManifest(): Promise<GuideAudioManifest | null> {
  const manifestPath = path.join(
    process.cwd(),
    "public",
    "audio",
    "residents",
    "japan-mistakes-new-residents",
    "manifest.json",
  );

  try {
    const raw = await fs.readFile(manifestPath, "utf8");
    const parsed = JSON.parse(raw) as GuideAudioManifest;
    if (!Array.isArray(parsed.parts) || parsed.parts.length === 0) return null;
    return parsed;
  } catch {
    return null;
  }
}

function H2({ children }: { children: ReactNode }) {
  return <h2 className="editorial-heading mb-4">{children}</h2>;
}

function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-6 mb-3 font-sans text-lg font-bold tracking-wide text-dark">
      {children}
    </h3>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="article-body list-none space-y-3 pl-0">
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

function Mistake({
  n,
  title: mistakeTitle,
  children,
}: {
  n: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-6">
      <H3>
        Mistake {n}: {mistakeTitle}
      </H3>
      <div className="article-body space-y-3">{children}</div>
    </div>
  );
}

export default async function JapanMistakesNewResidentsPage() {
  const audioManifest = await loadGuideAudioManifest();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-cream font-sans">
        <div className="border-b border-paper-edge bg-paper/90">
          <div className="page-x mx-auto max-w-3xl py-4">
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
              <Link href="/residents" className="text-rust hover:text-maroon">
                Residents
              </Link>
              <span aria-hidden className="mx-2 text-tan">
                /
              </span>
              <span className="text-dark">New resident mistakes</span>
            </nav>
          </div>
        </div>

        <article className="page-x mx-auto max-w-3xl pb-8 pt-8 sm:pt-8">
          <header className="mb-6 max-w-2xl">
            <p className="editorial-kicker mb-3">Residents</p>
            <h1 className="guide-page-title text-balance">{title}</h1>
            <div className="article-body mt-4 space-y-4">
              <p>
                Moving to Japan is less about one dramatic error and more about
                ten small ones: a bill slip you misread, a ward office visit you
                postponed, or a lease signed before you understood move-in cash.
              </p>
              <p>
                This page is operational, not legal advice. Procedures vary by
                municipality and visa status. Use the links and tools to build
                your own checklist.
              </p>
            </div>
          </header>

          {audioManifest ? (
            <GuideAudioPlayer
              guideSlug="japan-mistakes-new-residents"
              basePath="/audio/residents/japan-mistakes-new-residents"
              parts={audioManifest.parts}
            />
          ) : (
            <GuideReadAloud
              text={readAloudText}
              guideSlug="japan-mistakes-new-residents"
            />
          )}

          <div className="mb-6">
            <ToolRecommendationStrip
              headingId="resident-mistakes-tools"
              title="Resident tools for month one"
              deck="Stress-test monthly cash and format addresses the way Japanese forms expect."
              tools={toolStripTools}
              analyticsSourceSlug="japan-mistakes-new-residents"
            />
          </div>

          <section className="mb-6 max-w-2xl">
            <H2>Common mistakes and practical fixes</H2>
            <Mistake n={1} title="underestimating move-in costs">
              <p>
                Deposit, key money, agency fees, guarantor charges, and first
                utilities can stack far above one month of rent on a spreadsheet.
              </p>
              <p>
                Fix: model cash before you sign. See{" "}
                <Link href="/residents/japan-living-cost" className={linkClass}>
                  Japan living cost
                </Link>{" "}
                and the monthly calculator in the tool strip.
              </p>
            </Mistake>
            <Mistake n={2} title="delaying address registration">
              <p>
                Banks, phone plans, and insurance workflows often assume your
                registered address matches where you actually live.
              </p>
              <p>
                Fix: complete ward office registration soon after you have a
                stable address. See{" "}
                <Link
                  href="/residents/japan-residence-registration"
                  className={linkClass}
                >
                  residence registration
                </Link>
                .
              </p>
            </Mistake>
            <Mistake n={3} title="not understanding health insurance and pension">
              <p>
                National Health Insurance, workplace plans, and pension notices
                look similar in the mail but follow different rules.
              </p>
              <p>
                Fix: read enrollment timing for your situation, not a forum
                thread from another visa type. Start with{" "}
                <Link
                  href="/residents/japan-health-insurance"
                  className={linkClass}
                >
                  Japan health insurance
                </Link>
                .
              </p>
            </Mistake>
            <Mistake n={4} title="ignoring bill payment slips">
              <p>
                Utilities and tax notices often arrive as paper with barcodes,
                not email reminders you can snooze.
              </p>
              <p>
                Fix: learn konbini and bank debit flows early. See{" "}
                <Link href="/residents/pay-bills-japan" className={linkClass}>
                  paying bills in Japan
                </Link>
                .
              </p>
            </Mistake>
            <Mistake n={5} title="assuming foreign cards always work">
              <p>
                Online housing portals, guarantor systems, and some utilities
                still prefer Japan-issued payment paths.
              </p>
              <p>
                Fix: plan a local bank timeline and keep backup cash. See{" "}
                <Link href="/residents/open-bank-account-japan" className={linkClass}>
                  opening a bank account
                </Link>
                .
              </p>
            </Mistake>
            <Mistake n={6} title="not saving emergency cash">
              <p>
                Typhoon days, visa paperwork trips, and apartment deposits do not
                always wait for payday.
              </p>
              <p>
                Fix: hold a yen buffer separate from daily wallet spend. The
                monthly calculator includes a savings band reminder.
              </p>
            </Mistake>
            <Mistake n={7} title="misunderstanding garbage rules">
              <p>
                Wrong bag color or missed collection days create landlord tension
                fast in dense buildings.
              </p>
              <p>
                Fix: photograph the building rules chart and buy the right bags
                on day one. See{" "}
                <Link href="/residents/japan-garbage-rules" className={linkClass}>
                  garbage rules
                </Link>
                .
              </p>
            </Mistake>
            <Mistake n={8} title="not preparing documents for apartment applications">
              <p>
                Incomplete employment letters or mismatched name spellings slow
                approvals or trigger rejections.
              </p>
              <p>
                Fix: align passport, residence card, and employer letter names.
                See{" "}
                <Link
                  href="/residents/renting-apartment-japan"
                  className={linkClass}
                >
                  renting an apartment
                </Link>
                .
              </p>
            </Mistake>
            <Mistake n={9} title="forgetting city office procedures after moving">
              <p>
                A mid-lease move without updating registration breaks mail,
                insurance, and voting paperwork threads.
              </p>
              <p>
                Fix: treat every move as a mini onboarding week. Use the{" "}
                <Link
                  href="/resources/moving-to-japan-checklist"
                  className={linkClass}
                >
                  moving to Japan checklist
                </Link>
                .
              </p>
            </Mistake>
            <Mistake n={10} title="treating Japan systems like home-country systems">
              <p>
                Assumptions about leases, deposits, medical billing, and mail
                delivery fail in predictable ways.
              </p>
              <p>
                Fix: read one Japan-specific guide per week in month one instead
                of comparing everything to where you came from.
              </p>
            </Mistake>
          </section>

          <section className="mb-6 max-w-2xl">
            <H2>New resident recovery checklist</H2>
            <CheckList
              items={[
                "Register your address at the ward office.",
                "Open or confirm a bank path that matches your housing search.",
                "Set up bill payment method for utilities and phone.",
                "Enroll in the health insurance path that fits your job status.",
                "Photograph garbage rules and building emergency exits.",
                "Format your address for forms and deliveries.",
                "Keep one folder (physical or digital) for official mail.",
              ]}
            />
          </section>

          <section className="mb-6 max-w-2xl rounded-lg border border-paper-edge bg-paper-card px-5 py-5 shadow-editorial sm:px-6">
            <H2>Month-one tools and checklist</H2>
            <p className="article-body mb-4">
              Use the calculator and address formatter above, then walk the
              printable checklist in order.
            </p>
            <ul className="article-body list-none space-y-3 pl-0">
              <li>
                <Link
                  href="/resources/moving-to-japan-checklist"
                  className={linkClass}
                >
                  Moving to Japan checklist →
                </Link>
              </li>
              <li>
                <TrackedToolLink
                  href="/tools/japan-monthly-cost-calculator"
                  sourceSlug="japan-mistakes-new-residents"
                  className={linkClass}
                >
                  Japan Monthly Cost Calculator →
                </TrackedToolLink>
              </li>
              <li>
                <TrackedToolLink
                  href="/tools/japanese-address-formatter"
                  sourceSlug="japan-mistakes-new-residents"
                  className={linkClass}
                >
                  Japanese Address Formatter →
                </TrackedToolLink>
              </li>
            </ul>
          </section>

          <ResidentStarterPath
            sourceSlug="resident-starter-path"
            currentHref="/residents/japan-mistakes-new-residents"
          />
          <ResidentsCrosslinks currentHref="/residents/japan-mistakes-new-residents" />
        </article>
      </main>
    </>
  );
}
