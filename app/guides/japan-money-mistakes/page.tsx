import type { Metadata } from "next";
import Link from "next/link";
import { SiteBrandFooter } from "@/components/brand/SiteBrandFooter";
import type { ReactNode } from "react";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideBreadcrumbs } from "@/components/guides/GuideBreadcrumbs";
import { GuideEndCta } from "@/components/guides/GuideEndCta";
import { ToolRecommendationStrip } from "@/components/tools/ToolRecommendationStrip";
import { NextStepGuides } from "@/components/NextStepGuides";
import { siteUrl, SITE_NAME } from "@/lib/site";

const PATH = "/guides/japan-money-mistakes";
const CANONICAL = `${siteUrl()}${PATH}`;

const title = "Money Mistakes Travelers Make in Japan";
const description =
  "Payment, cash, ATM, IC card, and budgeting mistakes in Japan: what tourists get wrong about yen, cards, lockers, taxis, and trip math, with practical fixes.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Japan money mistakes",
    "cash Japan tourist",
    "Japan ATM foreign card",
    "Japan travel budget",
    "Suica spending",
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
    <div className="mb-6 max-w-2xl">
      <H3>
        Mistake {n}: {mistakeTitle}
      </H3>
      <div className="article-body space-y-3">{children}</div>
    </div>
  );
}

export default function JapanMoneyMistakesPage() {
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
              Japan is easier to pay in than it was ten years ago, but it is not
              card-only. The expensive mistakes are boring: empty wallets at a
              rural lunch spot, surprise IC balance drains, and taxi totals that
              were optional.
            </p>
            <p>
              This page focuses on payment mechanics, not investment advice.
              Rules vary by bank and shop. When in doubt, carry a backup method.
            </p>
</div>
        }
        beforeComparison={
          <>
            <GuideBreadcrumbs current="Money mistakes" />
            <ToolRecommendationStrip
              headingId="money-mistakes-tools"
              title="Model the trip before you book"
              deck="Rough yen bands for hotels, food, trains, shopping, buffer, and suggested pocket cash."
              tools={[
                {
                  label: "Japan Trip Budget Calculator",
                  description:
                    "Trip length, cities, and style turned into practical ranges.",
                  href: "/tools/japan-trip-budget-calculator",
                },
              ]}
              analyticsSourceSlug="japan-money-mistakes"
            />
            <section className="mb-6 max-w-2xl">
              <H2>Payment mistakes and fixes</H2>
              <Mistake n={1} title="arriving with no yen">
                <p>
                  Airport trains, small snacks, and some lockers still work
                  smoother with cash or a loaded IC card on day one.
                </p>
                <p>
                  Fix: withdraw or exchange a modest amount after landing. See{" "}
                  <Link
                    href="/guides/japan-airport-first-steps"
                    className={inlineLink}
                  >
                    airport first steps
                  </Link>
                  .
                </p>
              </Mistake>
              <Mistake n={2} title="assuming every shop accepts cards">
                <p>
                  Family restaurants and chains often take cards. Tiny cafes,
                  some temples, and market stalls may not.
                </p>
                <p>
                  Fix: ask or look for stickers, keep cash backup. Read{" "}
                  <Link href="/guides/japan-cash-vs-card" className={inlineLink}>
                    cash vs card in Japan
                  </Link>
                  .
                </p>
              </Mistake>
              <Mistake n={3} title="ignoring ATM access">
                <p>
                  Foreign cards work at many convenience store ATMs, not at every
                  bank machine on the street.
                </p>
                <p>
                  Fix: note 7-Eleven and post office ATM habits before you leave
                  tourist cores. See{" "}
                  <Link
                    href="/guides/japan-cash-withdrawal-guide"
                    className={inlineLink}
                  >
                    cash withdrawal in Japan
                  </Link>
                  .
                </p>
              </Mistake>
              <Mistake n={4} title="forgetting IC card spending">
                <p>
                  Suica and PASMO feel like play money until you reload twice in
                  one day.
                </p>
                <p>
                  Fix: treat IC as a daily budget line, not unlimited tap money.
                  See{" "}
                  <Link href="/guides/suica-pasmo-guide" className={inlineLink}>
                    Suica and PASMO
                  </Link>
                  .
                </p>
              </Mistake>
              <Mistake n={5} title="underbudgeting food and transport">
                <p>
                  Cheap lunch exists, but coffee, snacks, extra train hops, and
                  konbini stops add up quietly.
                </p>
                <p>
                  Fix: use{" "}
                  <Link
                    href="/guides/japan-budget-breakdown"
                    className={inlineLink}
                  >
                    Japan budget breakdown
                  </Link>{" "}
                  and the calculator tool above for bands, not vibes.
                </p>
              </Mistake>
              <Mistake n={6} title="letting taxi costs pile up">
                <p>
                  One late-night ride across town can equal several days of train
                  passes for a solo traveler.
                </p>
                <p>
                  Fix: default to rail, walk, or hotel-adjacent plans. Save taxis
                  for true door-to-door needs.
                </p>
              </Mistake>
              <Mistake n={7} title="forgetting coin lockers and luggage costs">
                <p>
                  Lockers need correct change or IC support. Forwarding bags
                  between cities is a real line item.
                </p>
                <p>
                  Fix: carry small coins or plan locker apps where available.
                  See{" "}
                  <Link
                    href="/guides/japan-luggage-shipping"
                    className={inlineLink}
                  >
                    luggage shipping
                  </Link>
                  .
                </p>
              </Mistake>
              <Mistake n={8} title="not planning emergency cash">
                <p>
                  Card networks hiccup. Wallets get lost. Rural areas forgive
                  cash less than Shibuya does.
                </p>
                <p>
                  Fix: keep a separate yen stash in your hotel safe or a hidden
                  pouch, not mixed with daily spend.
                </p>
              </Mistake>
              <Mistake n={9} title="relying on one payment method">
                <p>
                  Mobile pay, one credit card, and IC alone each fail in different
                  corners of the country.
                </p>
                <p>
                  Fix: two of three: IC or transit wallet, a card that worked at
                  home ATMs here, and physical yen.
                </p>
              </Mistake>
              <Mistake n={10} title="not using the budget calculator before booking">
                <p>
                  Hotels and flights get committed before daily spend is modeled.
                  That is how trips feel cheap until day four.
                </p>
                <p>
                  Fix: run{" "}
                  <Link
                    href="/tools/japan-trip-budget-calculator"
                    className={inlineLink}
                  >
                    Japan Trip Budget Calculator
                  </Link>{" "}
                  with your real nights and cities, then adjust lodging.
                </p>
              </Mistake>
            </section>
          </>
        }
        afterComparison={
          <>
            <section className="mb-6 max-w-2xl">
              <H2>Practical money checklist</H2>
              <CheckList
                items={[
                  "Withdraw or exchange a starter yen float at a known ATM type.",
                  "Load IC card or mobile wallet for trains and konbini taps.",
                  "Confirm your card works at a convenience store ATM before you leave Tokyo.",
                  "Run the trip budget calculator with food and transport included.",
                  "Keep a separate emergency cash stash.",
                  "Check customs limits if carrying large cash inbound.",
                ]}
              />
              <p className="article-body mt-6">
                Connectivity affects payments too (QR menus, translation). See{" "}
                <Link href="/guides/sim-card-japan" className={inlineLink}>
                  SIM and eSIM in Japan
                </Link>
                .
              </p>
            </section>
            <NextStepGuides guideId="japan-money-mistakes" />
            <GuideEndCta
              parentHref="/guides/money-payments-japan"
              parentLabel="Money and payments in Japan →"
            />
            <SiteBrandFooter />
          </>
        }
      />
    </>
  );
}
