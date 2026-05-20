import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideBreadcrumbs } from "@/components/guides/GuideBreadcrumbs";
import { GuideEndCta } from "@/components/guides/GuideEndCta";
import { ToolRecommendationStrip } from "@/components/tools/ToolRecommendationStrip";
import { NextStepGuides } from "@/components/NextStepGuides";
import { RecommendationGrid } from "@/components/recommendations";
import { EDITORIAL_COPY } from "@/lib/editorial-copy";
import { siteUrl, SITE_NAME } from "@/lib/site";

const PATH = "/guides/japan-mistakes-first-time-visitors";
const CANONICAL = `${siteUrl()}${PATH}`;

const title = "Japan Mistakes First-Time Visitors Make";
const description =
  "Operational mistakes tourists make before and during a Japan trip: data, cash, packing, weather, trains, hotels, customs, and pacing. Practical fixes and links to tools.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Japan mistakes tourists",
    "first time Japan trip errors",
    "Japan travel tips",
    "Japan trip planning",
    "JapanProTips",
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
          name: "Guides",
          item: `${siteUrl()}/tourists`,
        },
        { "@type": "ListItem", position: 3, name: title, item: CANONICAL },
      ],
    },
  ],
};

const inlineLink =
  "font-sans font-bold text-rust hover:text-maroon transition-colors duration-150";

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
    <div className="mb-8 max-w-2xl">
      <H3>
        Mistake {n}: {mistakeTitle}
      </H3>
      <div className="article-body space-y-3">{children}</div>
    </div>
  );
}

export default function JapanMistakesFirstTimeVisitorsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GuideArticleShell
        comparisonItems={null}
        showHotelConversion={false}
        title={<h1 className="guide-page-title">{title}</h1>}
        intro={
          <div className="article-body max-w-2xl space-y-4">
            <p>
              Most first-time Japan trips fail quietly. You still see the sights,
              but you lose hours to dead phone data, the wrong train exit, or a
              suitcase that fights every staircase. This page is an operational
              field guide: what goes wrong, why it happens, and what to fix next.
            </p>
            <p>
              It pairs with our tools and deeper guides so you can correct one
              problem at a time instead of rereading a generic packing blog.
            </p>
            <p className="font-sans text-sm font-bold uppercase tracking-widest text-muted">
              {EDITORIAL_COPY.trustLine}
            </p>
          </div>
        }
        beforeComparison={
          <>
            <GuideBreadcrumbs current="First-time visitor mistakes" />
            <ToolRecommendationStrip
              headingId="visitor-mistakes-tools"
              title="Fix mistakes with numbers and checklists"
              deck="Budget bands, a packing list from your trip shape, and a quick customs screen before you zip your bag shut."
              tools={[
                {
                  label: "Japan Trip Budget Calculator",
                  description:
                    "Hotels, food, trains, buffer, and pocket yen in one rough band.",
                  href: "/tools/japan-trip-budget-calculator",
                },
                {
                  label: "Japan Packing Generator",
                  description:
                    "Month, cities, laundry, rain, and activities turned into a list.",
                  href: "/tools/japan-packing-generator",
                },
                {
                  label: "Can I Bring This to Japan?",
                  description:
                    "High-level flags for meds, food, batteries, and cash rules.",
                  href: "/tools/can-i-bring-this-to-japan",
                },
              ]}
              analyticsSourceSlug="japan-mistakes-first-time-visitors"
            />
            <section className="mb-12 max-w-2xl">
              <H2>Common mistakes and practical fixes</H2>
              <Mistake n={1} title="landing without a SIM or eSIM plan">
                <p>
                  Arrivals WiFi is fine for one message, not for maps, train apps,
                  and QR tickets all day. Many travelers still queue at airport
                  kiosks while their group waits at the gate.
                </p>
                <p>
                  Fix: install an eSIM or order a plan before you fly if your phone
                  supports it. See{" "}
                  <Link href="/guides/sim-card-japan" className={inlineLink}>
                    SIM and eSIM in Japan
                  </Link>
                  .
                </p>
              </Mistake>
              <Mistake n={2} title="assuming Japan is fully cashless">
                <p>
                  Cards and mobile pay are common in cities, but small shops,
                  some shrines, rural restaurants, and older ticket machines still
                  expect cash or IC balance.
                </p>
                <p>
                  Fix: carry a modest yen float and know where to withdraw. Start
                  with{" "}
                  <Link href="/guides/money-payments-japan" className={inlineLink}>
                    money and payments in Japan
                  </Link>{" "}
                  and{" "}
                  <Link href="/guides/japan-money-mistakes" className={inlineLink}>
                    money mistakes travelers make
                  </Link>
                  .
                </p>
              </Mistake>
              <Mistake n={3} title="overpacking for train travel">
                <p>
                  Large roller bags turn every transfer into a workout. Elevators
                  exist but are not always on your route.
                </p>
                <p>
                  Fix: pack for laundry and walking shoes you trust. Use the{" "}
                  <Link href="/guides/japan-packing-list" className={inlineLink}>
                    Japan packing list
                  </Link>{" "}
                  and the packing generator in the tool strip above.
                </p>
              </Mistake>
              <Mistake n={4} title="ignoring rainy season and humidity">
                <p>
                  June rain and summer humidity change what feels comfortable
                  faster than temperature numbers suggest.
                </p>
                <p>
                  Fix: read{" "}
                  <Link
                    href="/guides/japan-weather-by-month"
                    className={inlineLink}
                  >
                    Japan weather by month
                  </Link>{" "}
                  and pack quick-dry layers, not only a heavy coat.
                </p>
              </Mistake>
              <Mistake n={5} title="underestimating station complexity">
                <p>
                  Major hubs have multiple lines, exits, and underground walks.
                  The right platform is not always obvious from one sign.
                </p>
                <p>
                  Fix: build buffer time, note your exit letter, and skim{" "}
                  <Link href="/guides/japan-trains" className={inlineLink}>
                    Japan trains
                  </Link>{" "}
                  before your first rush-hour transfer.
                </p>
              </Mistake>
              <Mistake n={6} title="booking hotels far from useful train lines">
                <p>
                  A cheap room three bus rides from the station eats the savings
                  in time and taxi temptation.
                </p>
                <p>
                  Fix: prioritize walkable station access over photo aesthetics.
                  See{" "}
                  <Link href="/guides/where-to-stay-tokyo" className={inlineLink}>
                    where to stay in Tokyo
                  </Link>{" "}
                  for the same logic in other cities.
                </p>
              </Mistake>
              <Mistake n={7} title="missing the last train">
                <p>
                  Midnight plans in Shinjuku or Dotonbori collide with service
                  windows that end earlier than many cities.
                </p>
                <p>
                  Fix: check last departure times, keep IC balance, and have a
                  licensed taxi or approved ride plan as backup, not as default
                  transport.
                </p>
              </Mistake>
              <Mistake n={8} title="not checking what can be brought into Japan">
                <p>
                  Meds, meat snacks, large batteries, and some vape gear create
                  surprises at customs.
                </p>
                <p>
                  Fix: run the{" "}
                  <Link
                    href="/tools/can-i-bring-this-to-japan"
                    className={inlineLink}
                  >
                    bring-to-Japan checker
                  </Link>{" "}
                  before you pack gifts or pantry items.
                </p>
              </Mistake>
              <Mistake n={9} title="relying only on taxis">
                <p>
                  Taxis are clean and safe but add up fast, especially with
                  traffic and tunnel tolls in bad weather.
                </p>
                <p>
                  Fix: default to trains and walking, taxis for late night or
                  door-to-door when bags are heavy. See{" "}
                  <Link href="/guides/getting-around-japan" className={inlineLink}>
                    getting around Japan
                  </Link>
                  .
                </p>
              </Mistake>
              <Mistake n={10} title="planning too many cities">
                <p>
                  Seven cities in ten days means you remember stations, not
                  neighborhoods.
                </p>
                <p>
                  Fix: anchor fewer bases and add day trips. Use{" "}
                  <Link href="/guides/japan-itinerary" className={inlineLink}>
                    Japan itinerary templates
                  </Link>{" "}
                  as a pacing reference, not a race checklist.
                </p>
              </Mistake>
            </section>
            <RecommendationGrid
              placement="japan-mistakes-first-time-visitors"
              context="japan-mistakes-first-time-visitors"
              title="Gear that prevents small trip friction"
              intro="Optional items that help with rain, power, and packing. Each links to a deeper guide if affiliate URLs are not live yet."
            />
          </>
        }
        afterComparison={
          <>
            <section className="mb-12 max-w-2xl">
              <H2>Quick recovery checklist</H2>
              <p className="article-body mb-4">
                If you are mid-trip and something already went wrong, work this
                order:
              </p>
              <CheckList
                items={[
                  "Get data live (eSIM, pocket WiFi, or backup SIM).",
                  "Withdraw or exchange a small yen float at a 7-Eleven ATM if cards fail.",
                  "Simplify tomorrow: one neighborhood, one train line, one exit noted in maps.",
                  "Move heavy items to a coin locker or hotel hold if bags are slowing you down.",
                  "Re-run the budget calculator if spending feels out of band.",
                ]}
              />
            </section>
            <NextStepGuides guideId="japan-mistakes-first-time-visitors" />
            <GuideEndCta
              parentHref="/guides/start-here-japan"
              parentLabel="Japan trip planning start here →"
            />
            <div className="border-t border-tan pt-8 mt-6 max-w-2xl">
              <Link
                href="/"
                className="inline-flex items-center gap-2 font-sans text-base font-bold uppercase tracking-widest text-rust hover:text-maroon transition-colors duration-150"
              >
                JapanProTips homepage
              </Link>
            </div>
          </>
        }
      />
    </>
  );
}
