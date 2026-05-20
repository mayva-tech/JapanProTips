import type { Metadata } from "next";
import Link from "next/link";
import { ResidentStarterPath } from "@/components/guides/ResidentStarterPath";
import { ResidentsCrosslinks } from "@/components/guides/ResidentsCrosslinks";
import { ToolRecommendationStrip } from "@/components/tools/ToolRecommendationStrip";
import { TrackedToolLink } from "@/components/tools/TrackedToolLink";
import { siteUrl, SITE_NAME } from "@/lib/site";

const PATH = "/residents/japan-living-cost";
const CANONICAL = `${siteUrl()}${PATH}`;

const title = "Japan Living Cost: Monthly Numbers for Residents";
const description =
  "What monthly life in Japan actually costs: rent, food, utilities, transport, phone, insurance reminders, move-in cash, emergency savings, and realistic bands for Tokyo, Osaka, and regional cities.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Japan cost of living",
    "monthly budget Japan resident",
    "Tokyo living cost",
    "rent Japan foreigner",
    "Japan utilities cost",
    "JapanProTips residents",
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
          name: "Residents",
          item: `${siteUrl()}/residents`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Japan Living Cost",
          item: CANONICAL,
        },
      ],
    },
  ],
};

const linkClass =
  "font-sans font-bold text-rust hover:text-maroon transition-colors duration-150";

const cellTh =
  "border-b border-paper-edge bg-paper-elevated px-3 py-2.5 text-left font-sans text-[0.65rem] font-bold uppercase tracking-widest text-ink sm:px-4 sm:py-3 sm:text-kicker";
const cellTd =
  "border-b border-paper-edge/60 px-3 py-2.5 align-top font-serif text-sm text-muted sm:px-4 sm:py-3 sm:text-body";

export default function JapanLivingCostGuidePage() {
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
              <span className="text-dark">Japan Living Cost</span>
            </nav>
          </div>
        </div>

        <article className="mx-auto max-w-3xl px-6 pb-16 pt-10 sm:pt-12">
          <header className="mb-10 max-w-2xl">
            <p className="editorial-kicker mb-3">Residents</p>
            <h1 className="guide-page-title text-balance">{title}</h1>
            <div className="article-body mt-4 space-y-4">
              <p>
                Trip budgets and resident budgets are different animals. This page
                is monthly math for paying your own rent, food, and bills in Japan,
                in yen first. It is not a visa bank-balance memo and it is not a
                tourist shopping allowance.
              </p>
              <p>
                Tokyo anchors the high end. Regional cities and inaka drop hardest
                on rent first, then food variety, not always on heating bills. Use
                the bands below to sanity check a spreadsheet, then tune your own
                case in the calculator linked on this page.
              </p>
            </div>
          </header>

          <div className="mb-12">
            <ToolRecommendationStrip
              headingId="living-cost-calculator-strip"
              title="Model your own monthly band"
              deck="City type, household size, housing, commute, eating style, and optional phone, internet, insurance, and childcare add-ons. Copy a summary or share a link with your inputs."
              tools={[
                {
                  label: "Japan Monthly Cost Calculator",
                  description:
                    "Rough rent, food, utilities, transport, move-in warning, and emergency savings target for residents.",
                  href: "/tools/japan-monthly-cost-calculator",
                },
              ]}
              analyticsSourceSlug="japan-living-cost"
            />
          </div>

          <section className="mb-12 max-w-2xl" aria-labelledby="quick-estimate-heading">
            <h2 id="quick-estimate-heading" className="editorial-heading mb-4">
              Quick estimate table
            </h2>
            <p className="article-body mb-5">
              All-in monthly running costs for a normal lifestyle, not move-in cash.
              Ranges assume you cook sometimes, commute by train, and run AC in
              summer. Insurance and pension vary by employment status.
            </p>
            <div className="overflow-x-auto rounded-lg border border-paper-edge bg-paper-card shadow-editorial">
              <table className="w-full min-w-[20rem] border-collapse text-left">
                <thead>
                  <tr>
                    <th scope="col" className={cellTh}>
                      Scenario
                    </th>
                    <th scope="col" className={cellTh}>
                      Rough monthly total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={cellTd}>
                      <span className="font-sans font-semibold text-dark">
                        Single in regional city
                      </span>
                      <span className="mt-1 block text-sm">
                        1K or studio, mixed eating, local train commute
                      </span>
                    </td>
                    <td className={`${cellTd} font-sans font-bold tabular-nums text-dark`}>
                      about ¥155,000 to ¥210,000
                    </td>
                  </tr>
                  <tr>
                    <td className={cellTd}>
                      <span className="font-sans font-semibold text-dark">
                        Single in Tokyo suburb
                      </span>
                      <span className="mt-1 block text-sm">
                        1K within a sane commute, normal konbini plus restaurant mix
                      </span>
                    </td>
                    <td className={`${cellTd} font-sans font-bold tabular-nums text-dark`}>
                      about ¥200,000 to ¥260,000
                    </td>
                  </tr>
                  <tr>
                    <td className={cellTd}>
                      <span className="font-sans font-semibold text-dark">
                        Couple in Osaka / Kyoto
                      </span>
                      <span className="mt-1 block text-sm">
                        1LDK, shared groceries, two commuter passes
                      </span>
                    </td>
                    <td className={`${cellTd} font-sans font-bold tabular-nums text-dark`}>
                      about ¥280,000 to ¥360,000
                    </td>
                  </tr>
                  <tr>
                    <td className={cellTd}>
                      <span className="font-sans font-semibold text-dark">
                        Family in Tokyo area
                      </span>
                      <span className="mt-1 block text-sm">
                        2LDK+, childcare pressure, higher utilities
                      </span>
                    </td>
                    <td className={`${cellTd} font-sans font-bold tabular-nums text-dark`}>
                      about ¥380,000 to ¥520,000
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="article-body-sm mt-4 text-muted">
              Visiting instead of moving? See the{" "}
              <Link href="/guides/japan-budget-breakdown" className={linkClass}>
                Japan trip budget breakdown
              </Link>
              .
            </p>
          </section>

          <section className="mb-12 max-w-2xl">
            <h2 className="editorial-heading mb-4">Rent</h2>
            <div className="article-body space-y-4">
              <p>
                Rent is the line item that drowns everything else in Tokyo and
                Osaka&apos;s popular wards. A clean 1R or 1K within a sane commute
                of a major hub often lands roughly{" "}
                <span className="font-sans font-bold text-dark">
                  ¥80,000 to ¥140,000
                </span>{" "}
                before furniture, depending on building age, station distance, and
                whether you pay key money upfront to buy the monthly down.
              </p>
              <p>
                Share houses and rooms farther out can sit closer to{" "}
                <span className="font-sans font-bold text-dark">
                  ¥50,000 to ¥75,000
                </span>{" "}
                if you accept rules, noise, and smaller private space. Regional
                cities often shave{" "}
                <span className="font-sans font-bold text-dark">
                  ¥15,000 to ¥40,000
                </span>{" "}
                off the same mental floor as Tokyo for comparable comfort.
              </p>
              <p>
                <Link href="/residents/renting-apartment-japan" className={linkClass}>
                  Renting an apartment in Japan →
                </Link>
              </p>
            </div>
          </section>

          <section className="mb-12 max-w-2xl">
            <h2 className="editorial-heading mb-4">Food</h2>
            <div className="article-body space-y-4">
              <p>
                Supermarkets after 7 p.m., frozen vegetables, and rice at home keep
                the floor low. Eating out at chains even a few times per week moves
                the needle fast. See the{" "}
                <Link href="/residents/japan-grocery-shopping-guide" className={linkClass}>
                  grocery shopping guide
                </Link>{" "}
                for chains, discounts, and weekly habits.
              </p>
              <ul className="article-body list-none space-y-3.5 pl-0">
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <span className="font-sans font-bold text-dark">Frugal cook-at-home:</span>{" "}
                  about{" "}
                  <span className="font-sans font-bold text-dark">
                    ¥35,000 to ¥50,000
                  </span>{" "}
                  per month for one person who actually meal preps.
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <span className="font-sans font-bold text-dark">Normal mix:</span>{" "}
                  konbini breakfast, office lunch, cheap dinner out a few times:
                  about{" "}
                  <span className="font-sans font-bold text-dark">
                    ¥55,000 to ¥80,000
                  </span>
                  .
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <span className="font-sans font-bold text-dark">Social life heavy:</span>{" "}
                  izakaya, coffee, delivery:{" "}
                  <span className="font-sans font-bold text-dark">¥90,000+</span> is
                  easy without feeling extravagant.
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12 max-w-2xl">
            <h2 className="editorial-heading mb-4">Utilities</h2>
            <div className="article-body space-y-4">
              <p>
                For a small apartment, think in blocks:{" "}
                <span className="font-sans font-bold text-dark">electric</span> swings
                with summer AC and winter heating,{" "}
                <span className="font-sans font-bold text-dark">gas</span> if you cook
                on stove,{" "}
                <span className="font-sans font-bold text-dark">water</span> billed on
                a slower cycle. Phone and home internet are separate line items below.
              </p>
              <ul className="article-body list-none space-y-3.5 pl-0">
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <span className="font-sans font-bold text-dark">Electric + gas + water:</span>{" "}
                  often about{" "}
                  <span className="font-sans font-bold text-dark">
                    ¥12,000 to ¥22,000
                  </span>{" "}
                  combined for one person in a 1R or 1K across normal seasons, higher
                  in a cold winter with kerosene or poor insulation.
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <span className="font-sans font-bold text-dark">Larger unit or family:</span>{" "}
                  plan toward{" "}
                  <span className="font-sans font-bold text-dark">¥18,000 to ¥30,000+</span>{" "}
                  when AC runs hard in August.
                </li>
              </ul>
              <p>
                <Link href="/residents/japan-utilities-setup" className={linkClass}>
                  Utilities setup in Japan →
                </Link>
              </p>
            </div>
          </section>

          <section className="mb-12 max-w-2xl">
            <h2 className="editorial-heading mb-4">Transport</h2>
            <div className="article-body space-y-4">
              <p>
                Commuters usually buy a{" "}
                <span className="font-sans font-bold text-dark">Teiki pass</span> for
                fixed home-to-work legs. Inside greater Tokyo that is often roughly{" "}
                <span className="font-sans font-bold text-dark">
                  ¥10,000 to ¥25,000
                </span>{" "}
                per month depending on distance. Weekends off that corridor still
                spend IC money on social trips.
              </p>
              <p>
                Bicycles and walking save cash until August humidity argues back. Car
                ownership adds parking, shaken, and insurance that breaks a simple
                monthly spreadsheet fast.
              </p>
            </div>
          </section>

          <section className="mb-12 max-w-2xl">
            <h2 className="editorial-heading mb-4">Phone and internet</h2>
            <div className="article-body space-y-4">
              <ul className="article-body list-none space-y-3.5 pl-0">
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <span className="font-sans font-bold text-dark">Home internet:</span>{" "}
                  often about{" "}
                  <span className="font-sans font-bold text-dark">
                    ¥4,000 to ¥6,500
                  </span>{" "}
                  on typical fiber promos, higher after the intro rate expires.
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <span className="font-sans font-bold text-dark">Mobile phone:</span>{" "}
                  often about{" "}
                  <span className="font-sans font-bold text-dark">
                    ¥3,000 to ¥8,000
                  </span>{" "}
                  depending on MVNO versus carrier.
                </li>
              </ul>
              <p>
                <Link href="/residents/japan-mobile-phone-plans" className={linkClass}>
                  Mobile phone plans in Japan →
                </Link>
              </p>
            </div>
          </section>

          <section className="mb-12 max-w-2xl">
            <h2 className="editorial-heading mb-4">
              Health insurance and pension reminder
            </h2>
            <div className="article-body space-y-4">
              <p>
                National health and pension are not optional long term. When you are
                employed, withheld amounts change the take-home you feel. Budget from
                gross and you will lie to yourself.
              </p>
              <p>
                Self-employed and many students land on municipal national health
                insurance with premiums that depend on prior-year income and household
                size. Notices can arrive as a lump sum mental shock the first year.
              </p>
              <p>
                <Link href="/residents/japan-health-insurance" className={linkClass}>
                  National health insurance in Japan →
                </Link>
              </p>
              <p>
                <Link href="/residents/japan-pension-system" className={linkClass}>
                  Japan pension system overview →
                </Link>
              </p>
            </div>
          </section>

          <section className="mb-12 max-w-2xl">
            <h2 className="editorial-heading mb-4">Move-in costs</h2>
            <div className="article-body space-y-4">
              <p>
                First month rent is only the opening scene. Deposit, key money,
                guarantor company fees, agency commission, fire insurance, and lock
                changes routinely stack to several months of rent in cash before you
                sleep in the room.
              </p>
              <p>
                An honest planning band for a fresh lease is often{" "}
                <span className="font-sans font-bold text-dark">
                  three to five months of rent
                </span>{" "}
                in move-in cash on top of everyday living money, not inside your
                monthly food line.
              </p>
              <p>
                <Link href="/residents/renting-apartment-japan" className={linkClass}>
                  Renting guide: upfront fee table →
                </Link>
              </p>
            </div>
          </section>

          <section className="mb-12 max-w-2xl">
            <h2 className="editorial-heading mb-4">Emergency savings</h2>
            <div className="article-body space-y-4">
              <p>
                Aim for cash you can touch without selling furniture: roughly{" "}
                <span className="font-sans font-bold text-dark">
                  three to six months
                </span>{" "}
                of your real monthly burn after rent and food, higher if your visa or
                job is unstable.
              </p>
              <p>
                That cushion covers broken AC, visa renewal trips, dental surprises,
                and the month your company pays late. It is not the same as the
                yen you need on day one for key money.
              </p>
              <p>
                <Link href="/residents/japan-savings-budgeting-guide" className={linkClass}>
                  Saving and budgeting in Japan →
                </Link>
              </p>
            </div>
          </section>

          <section className="mb-12 max-w-2xl">
            <h2 className="editorial-heading mb-4">
              Common cost shocks for foreigners
            </h2>
            <ul className="article-body list-none space-y-3.5 pl-0">
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Move-in cash stacks beyond first month rent: deposit, key money,
                guarantor fees, and agent commission on a fresh lease.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                August electric bills after weeks of AC, especially in older builds
                with weak insulation.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                National health insurance notices that arrive as a lump sum the
                first year you are self billed.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Car ownership: shaken, weight tax, insurance tiers, and a monthly
                stall when parking is not included.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Paying bills from the wrong ATM or missing a utility slip deadline
                and eating a reissue fee.
              </li>
            </ul>
            <p className="article-body mt-4">
              <Link href="/residents/pay-bills-japan" className={linkClass}>
                How to pay bills in Japan →
              </Link>
            </p>
          </section>

          <section className="mb-12 max-w-2xl">
            <h2 className="editorial-heading mb-4">
              How to reduce monthly costs without making life miserable
            </h2>
            <ul className="article-body list-none space-y-3.5 pl-0">
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Live one or two stops farther out on the same line instead of
                squeezing into a micro room at the hub.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Cook rice and protein in batches, use supermarket evening discounts,
                and treat konbini as backup not a kitchen.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Match phone and internet to MVNO and fiber promos you will actually
                use, not the flagship carrier poster in the mall.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Buy seasonal clothing at Uniqlo sales and secondhand shops instead of
                importing wardrobes every year.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Keep one small fun budget line so you do not binge spend after a
                month of monk mode.
              </li>
            </ul>
          </section>

          <section
            className="mb-12 max-w-2xl rounded-lg border border-maroon/30 bg-paper-card p-6 shadow-editorial ring-1 ring-maroon/15 sm:p-8"
            aria-labelledby="calculator-cta-heading"
          >
            <h2
              id="calculator-cta-heading"
              className="font-display text-xl font-bold italic text-dark sm:text-2xl"
            >
              Build your own monthly band
            </h2>
            <p className="article-body mt-3">
              The{" "}
              <strong className="font-sans text-dark">Japan Monthly Cost Calculator</strong>{" "}
              turns the sections above into one yen total with rent, food, utilities,
              transport, optional insurance, move-in warning, and emergency savings
              target. Adjust city, household, and housing, then copy the summary.
            </p>
            <p className="mt-6">
              <TrackedToolLink
                href="/tools/japan-monthly-cost-calculator"
                sourceSlug="japan-living-cost"
                className="inline-flex font-sans text-sm font-bold uppercase tracking-widest text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
              >
                Open Japan Monthly Cost Calculator →
              </TrackedToolLink>
            </p>
          </section>

          <section
            className="mb-12 max-w-2xl rounded-lg border border-paper-edge bg-paper-elevated/60 p-5 shadow-inner sm:p-6"
            aria-labelledby="related-links-heading"
          >
            <h2
              id="related-links-heading"
              className="font-sans text-xs font-bold uppercase tracking-widest text-rust"
            >
              Related guides
            </h2>
            <ul className="mt-4 flex flex-col gap-3 font-sans text-sm font-semibold">
              <li>
                <Link href="/residents/renting-apartment-japan" className={linkClass}>
                  Renting an apartment in Japan →
                </Link>
              </li>
              <li>
                <Link href="/residents/japan-health-insurance" className={linkClass}>
                  Japan health insurance →
                </Link>
              </li>
              <li>
                <Link href="/residents/pay-bills-japan" className={linkClass}>
                  How to pay bills in Japan →
                </Link>
              </li>
              <li>
                <TrackedToolLink
                  href="/tools/japan-monthly-cost-calculator"
                  sourceSlug="japan-living-cost"
                  className={linkClass}
                >
                  Japan Monthly Cost Calculator →
                </TrackedToolLink>
              </li>
              <li>
                <Link href="/residents" className={linkClass}>
                  Residents hub →
                </Link>
              </li>
            </ul>
          </section>

          <ResidentStarterPath
            sourceSlug="resident-starter-path"
            currentHref="/residents/japan-living-cost"
          />
          <ResidentsCrosslinks currentHref="/residents/japan-living-cost" />
        </article>
      </main>
    </>
  );
}
