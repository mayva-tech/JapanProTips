import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ResidentStarterPath } from "@/components/guides/ResidentStarterPath";
import { ResidentsCrosslinks } from "@/components/guides/ResidentsCrosslinks";
import { ToolRecommendationStrip } from "@/components/tools/ToolRecommendationStrip";
import { TrackedToolLink } from "@/components/tools/TrackedToolLink";
import { EDITORIAL_COPY } from "@/lib/editorial-copy";
import { siteToolBySlug, toRecommendationCard } from "@/lib/site-tools";
import { siteUrl, SITE_NAME } from "@/lib/site";

const PATH = "/residents/garbage-separation-japan";
const CANONICAL = `${siteUrl()}${PATH}`;

const title = "Garbage Separation in Japan for New Residents";
const description =
  "Daily garbage rules in Japan: burnable, non-burnable, plastics, PET, oversized items, collection days, apartment garbage rooms, and mistakes foreigners make when rules differ by city.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "garbage separation Japan",
    "Japan trash rules resident",
    "burnable garbage Japan",
    "gomi rules apartment",
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
  siteToolBySlug("japanese-address-formatter"),
]
  .filter((t): t is NonNullable<typeof t> => t != null)
  .map(toRecommendationCard);

function H2({ children }: { children: ReactNode }) {
  return <h2 className="editorial-heading mb-4">{children}</h2>;
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

export default function GarbageSeparationJapanPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-cream font-sans">
        <div className="border-b border-paper-edge bg-paper/90">
          <div className="mx-auto max-w-3xl px-6 py-4">
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
              <span className="text-dark">Garbage separation</span>
            </nav>
          </div>
        </div>

        <article className="mx-auto max-w-3xl px-6 pb-16 pt-10 sm:pt-12">
          <header className="mb-10 max-w-2xl">
            <p className="editorial-kicker mb-3">Residents</p>
            <h1 className="guide-page-title text-balance">{title}</h1>
            <div className="article-body mt-4 space-y-4">
              <p>
                Garbage rules are one of the first daily-life systems that make
                Japan feel strict. Bags are color-coded, collection days differ by
                street, and your building manager may post charts you cannot read
                yet. Get this wrong and trash sits in your kitchen while neighbors
                leave polite notes.
              </p>
              <p>
                The goal is not perfection on day one. The goal is matching your
                city and building rules before fines, missed pickups, or landlord
                tension. Rules vary by municipality. Treat posters in your lobby as
                the source of truth.
              </p>
              <p className="font-sans text-sm font-bold uppercase tracking-widest text-muted">
                {EDITORIAL_COPY.trustLine}
              </p>
            </div>
          </header>

          <div className="mb-12">
            <ToolRecommendationStrip
              headingId="garbage-separation-tools"
              title="Format your address for ward mail"
              deck="Garbage calendars and violation notices route to your registered address. Japanese order helps forms and delivery labels."
              tools={toolStripTools}
              analyticsSourceSlug="garbage-separation-japan"
            />
          </div>

          <section className="mb-12 max-w-2xl">
            <H2>Why rules differ by city</H2>
            <p className="article-body mb-4">
              Each municipality runs its own collection contracts and sorting
              standards. Osaka, Yokohama, and a Tokyo ward can use different bag
              colors for the same material class.
            </p>
            <p className="article-body">
              When you move, buy new bags and download the new calendar. A habit
              from your last city is a common mistake, not a moral failure. For a
              longer reference, see{" "}
              <Link href="/residents/japan-garbage-rules" className={linkClass}>
                Japan garbage rules
              </Link>
              .
            </p>
          </section>

          <section className="mb-12 max-w-2xl">
            <H2>Burnable garbage</H2>
            <p className="article-body">
              Food scraps, tissues, small wooden items, and many paper food
              containers usually go in burnable bags on burnable days. Drain wet
              waste when possible to reduce smell in small apartments.
            </p>
          </section>

          <section className="mb-12 max-w-2xl">
            <H2>Non-burnable garbage</H2>
            <p className="article-body">
              Ceramics, glassware, small metal without PET labels, and some
              stationery items often use a separate non-burnable stream. Broken
              cups go here, not in burnable, in many cities.
            </p>
          </section>

          <section className="mb-12 max-w-2xl">
            <H2>Plastic packaging</H2>
            <p className="article-body">
              Wrappers, trays, and film plastic often need rinsing and drying
              before the plastic-only bag. Sticker sheets on packaging help identify
              material class when you are unsure.
            </p>
          </section>

          <section className="mb-12 max-w-2xl">
            <H2>PET bottles, cans, glass</H2>
            <p className="article-body mb-4">
              Many cities want PET bottles caps removed, labels peeled, and bottles
              crushed. Aluminum and steel cans are often grouped separately from
              glass bottles.
            </p>
            <p className="article-body">
              Store rinsed items indoors until the correct day. Mixed streams on
              the wrong day are a top reason collection staff leave bags behind.
            </p>
          </section>

          <section className="mb-12 max-w-2xl">
            <H2>Oversized garbage</H2>
            <p className="article-body">
              Furniture, bicycles, and large appliances usually need a sodai gomi
              reservation, stickers, and a fee. Leaving a chair on the curb
              without booking is how newcomers get warning calls.
            </p>
          </section>

          <section className="mb-12 max-w-2xl">
            <H2>Collection days</H2>
            <p className="article-body">
              Calendars list morning pickup windows. Set bags out the night before
              only if your building allows it. Early morning truck routes mean
              7:30 AM is too late on some streets.
            </p>
          </section>

          <section className="mb-12 max-w-2xl">
            <H2>Apartment garbage rooms</H2>
            <p className="article-body mb-4">
              Chuo bins, locked rooms, and camera-monitored corners are common in
              mid-rise buildings. Keys, chutes, and per-floor schedules may apply.
            </p>
            <p className="article-body">
              Photograph the chart on move-in day. Ask management which bags they
              stock in the lobby shop. See{" "}
              <Link
                href="/residents/renting-apartment-japan"
                className={linkClass}
              >
                renting an apartment in Japan
              </Link>{" "}
              for move-in admin habits.
            </p>
          </section>

          <section className="mb-12 max-w-2xl">
            <H2>Common mistakes foreigners make</H2>
            <ul className="article-body list-none space-y-3 pl-0">
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Using convenience store bags instead of city-approved bags
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Mixing plastic food trays with burnable waste
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Missing the collection day after a holiday shift
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Leaving oversized items without a reservation sticker
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Ignoring building room hours and angering neighbors
              </li>
            </ul>
          </section>

          <section className="mb-12 max-w-2xl">
            <H2>Practical checklist</H2>
            <CheckList
              items={[
                "Buy the correct bags for your ward on day one.",
                "Photograph the lobby sorting chart and calendar.",
                "Label kitchen bins inside your home to match categories.",
                "Rinse plastic and bottles before they sit overnight.",
                "Check holiday schedule changes each month.",
                "Book oversized pickup before discarding furniture.",
                "Ask management about garbage room keys and hours.",
              ]}
            />
          </section>

          <section className="mb-12 max-w-2xl rounded-lg border border-paper-edge bg-paper-card px-5 py-5 shadow-editorial sm:px-6">
            <H2>Related tools and guides</H2>
            <ul className="article-body list-none space-y-3 pl-0">
              <li>
                <TrackedToolLink
                  href="/tools/japanese-address-formatter"
                  sourceSlug="garbage-separation-japan"
                  className={linkClass}
                >
                  Japanese Address Formatter →
                </TrackedToolLink>
              </li>
              <li>
                <Link
                  href="/resources/moving-to-japan-checklist"
                  className={linkClass}
                >
                  Moving to Japan checklist →
                </Link>
              </li>
              <li>
                <Link
                  href="/residents/japan-mistakes-new-residents"
                  className={linkClass}
                >
                  Japan mistakes new residents make →
                </Link>
              </li>
              <li>
                <Link href="/residents/pay-bills-japan" className={linkClass}>
                  Paying bills in Japan →
                </Link>
              </li>
            </ul>
          </section>

          <ResidentStarterPath
            sourceSlug="resident-starter-path"
            currentHref="/residents/garbage-separation-japan"
          />
          <ResidentsCrosslinks currentHref="/residents/garbage-separation-japan" />
        </article>
      </main>
    </>
  );
}
