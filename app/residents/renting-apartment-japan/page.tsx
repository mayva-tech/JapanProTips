import type { Metadata } from "next";
import Link from "next/link";
import { OperationalWarning, ResidentLearnedNote } from "@/components/editorial/field-notes";
import { RecommendationBoxFromId } from "@/components/recommendations";
import { ServiceBlock } from "@/components/ServiceBlock";
import { DownloadChecklistBox } from "@/components/DownloadChecklistBox";
import { ResidentStarterPath } from "@/components/guides/ResidentStarterPath";
import { ResidentsCrosslinks } from "@/components/guides/ResidentsCrosslinks";
import { NextStepGuides } from "@/components/NextStepGuides";
import { ToolRecommendationStrip } from "@/components/tools/ToolRecommendationStrip";
import { TrackedToolLink } from "@/components/tools/TrackedToolLink";
import { siteUrl, SITE_NAME } from "@/lib/site";
import { siteToolBySlug, toRecommendationCard } from "@/lib/site-tools";

const PATH = "/residents/renting-apartment-japan";
const CANONICAL = `${siteUrl()}${PATH}`;

const title = "Renting an Apartment in Japan: What Foreigners Need to Know";
const description =
  "Rent in Japan as a foreigner: apartment types, move-in costs, guarantor companies, documents, listing terms, rejections, monthly bills beyond rent, and a practical move-in checklist.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "rent apartment Japan foreigner",
    "Japan apartment deposit key money",
    "guarantor company Japan rent",
    "1K 1LDK Japan apartment",
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
          name: "Renting Apartment in Japan",
          item: CANONICAL,
        },
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

export default function RentingApartmentJapanPage() {
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
              <span className="text-dark">Renting Apartment in Japan</span>
            </nav>
          </div>
        </div>

        <article className="mx-auto max-w-3xl px-6 pb-16 pt-10 sm:pt-12">
          <header className="mb-10 max-w-2xl">
            <p className="editorial-kicker mb-3">Residents</p>
            <h1 className="guide-page-title text-balance">{title}</h1>
            <div className="article-body mt-4 space-y-4">
              <p>
                Renting in Japan feels confusing for foreigners because the fee
                stack, guarantor layer, and listing shorthand are not the same as
                most Western leases. Landlords often judge stability and paperwork
                before they judge your salary on paper.
              </p>
              <p>
                The process rewards people who read the fee table twice, compare
                neighborhoods on commute first, and show up with documents that
                match the application form exactly. This page walks the full arc
                from search to keys, then points you at tools for monthly cash and
                address formatting once you have a place.
              </p>
            </div>
          </header>

          <div className="mb-12">
            <ToolRecommendationStrip
              headingId="renting-tools-strip"
              title="Plan rent and addresses with tools"
              deck="Ballpark monthly life after you sign, then format Japanese address lines for forms and deliveries."
              tools={toolStripTools}
              analyticsSourceSlug="renting-apartment-japan"
            />
          </div>

          <section className="mb-12 max-w-2xl">
            <h2 className="editorial-heading mb-4">
              Quick overview of the rental process
            </h2>
            <ol className="article-body list-decimal space-y-3 pl-5 marker:font-sans marker:font-bold marker:text-rust">
              <li>
                Set budget for <strong>move-in cash</strong> and monthly burn, not
                rent alone. See{" "}
                <Link href="/residents/japan-living-cost" className={linkClass}>
                  Japan living cost
                </Link>
                .
              </li>
              <li>
                Pick area and commute:{" "}
                <Link href="/residents/japan-neighborhood-guide" className={linkClass}>
                  neighborhood guide
                </Link>
                .
              </li>
              <li>
                View listings (agent site, portal, or share house operator). Read{" "}
                <Link href="/residents/japan-apartment-viewing-guide" className={linkClass}>
                  apartment viewing tips
                </Link>
                .
              </li>
              <li>
                Apply with documents, pass guarantor company screening, wait for
                owner approval.
              </li>
              <li>
                Sign lease, pay move-in invoice, schedule utilities and internet.
              </li>
              <li>
                Register address at city hall after you move in.
              </li>
            </ol>
            <ResidentLearnedNote noteId="renting-guarantor-stack">
              <p>
                Guarantor company plus agency plus owner paperwork stacks into real
                calendar time. Start the guarantor conversation before you fall in
                love with a listing that needs approval by Friday.
              </p>
            </ResidentLearnedNote>
          </section>

          <section className="mb-12 max-w-2xl">
            <h2 className="editorial-heading mb-4">
              Common apartment types
            </h2>
            <div className="article-body space-y-4">
              <p>
                Layout codes describe rooms, not luxury level. Measurements use{" "}
                <Link href="/residents/japan-room-measurements" className={linkClass}>
                  tatami and square meters
                </Link>
                .
              </p>
              <ul className="list-none space-y-3.5 pl-0">
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <span className="font-sans font-bold text-dark">Share house:</span>{" "}
                  private room, shared kitchen and bath, English-friendly operators
                  common. Lower move-in friction, less privacy.{" "}
                  <Link href="/residents/japan-shared-house-guide" className={linkClass}>
                    Share house guide →
                  </Link>
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <span className="font-sans font-bold text-dark">1K:</span> one
                  room plus kitchen corner (often a counter, not a separate door).
                  Typical solo Tokyo entry layout.
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <span className="font-sans font-bold text-dark">1DK:</span> one
                  room plus a dining-kitchen space separated by a door or wall.
                  More cooking space than 1K.
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <span className="font-sans font-bold text-dark">1LDK:</span> one
                  bedroom plus living-dining-kitchen. Common for couples who want a
                  door between sleep and living.
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <span className="font-sans font-bold text-dark">2LDK:</span> two
                  bedrooms plus LDK. Family or two adults who need a workspace door.
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12 max-w-2xl">
            <h2 className="editorial-heading mb-4">Initial move-in costs</h2>
            <div className="article-body space-y-4">
              <p>
                Japanese leases often quote monthly rent low and recover margin at
                move-in. Treat the invoice as one number.
              </p>
              <ul className="list-none space-y-3.5 pl-0">
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <span className="font-sans font-bold text-dark">Deposit (敷金):</span>{" "}
                  often one to two months rent, partially refundable at move-out minus
                  cleaning and repairs.
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <span className="font-sans font-bold text-dark">Key money (礼金):</span>{" "}
                  non-refundable gift to the owner, often zero to two months depending
                  on market heat and building age.
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <span className="font-sans font-bold text-dark">Agency fee (仲介手数料):</span>{" "}
                  often about one month rent plus tax when you use a real estate agent.
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <span className="font-sans font-bold text-dark">Guarantor company (保証会社):</span>{" "}
                  initial guarantee fee plus annual renewal, often roughly half a month
                  to a month of rent upfront. See{" "}
                  <Link href="/residents/japan-guarantor-system" className={linkClass}>
                    guarantor system guide
                  </Link>
                  .
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <span className="font-sans font-bold text-dark">Insurance (火災保険):</span>{" "}
                  fire and liability policy required on many leases, often a multi-year
                  prepaid block.
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <span className="font-sans font-bold text-dark">Lock change / cleaning:</span>{" "}
                  鍵交換 and クリーニング lines on the quote are common. Budget them even
                  when the ad looked cheap.
                </li>
              </ul>
              <OperationalWarning noteId="renting-move-in-cash-total">
                <p>
                  Move-in quotes love to arrive as a tidy table until cleaning fees,
                  lock changes, and insurance riders appear on the final sheet. Sum the
                  bottom line in yen before you sign, not item by item in your head.
                </p>
              </OperationalWarning>
              <p>
                <TrackedToolLink
                  href="/tools/japan-monthly-cost-calculator"
                  sourceSlug="renting-apartment-japan"
                  className={linkClass}
                >
                  Japan Monthly Cost Calculator (move-in warning line) →
                </TrackedToolLink>
              </p>
            </div>
          </section>

          <section className="mb-12 max-w-2xl">
            <h2 className="editorial-heading mb-4">
              Monthly costs beyond rent
            </h2>
            <ul className="article-body list-none space-y-3.5 pl-0">
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Utilities: electric, gas, water on separate cycles.{" "}
                <Link href="/residents/japan-utilities-setup" className={linkClass}>
                  Utilities setup →
                </Link>
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Home internet and mobile plans.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                National health insurance or employee insurance premiums.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Guarantor company annual renewal fee.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Building maintenance fee (管理費) if listed separately from rent.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Furniture, bedding, and kitchen kit if the unit is unfurnished.{" "}
                <Link href="/residents/japan-furniture-appliances" className={linkClass}>
                  Furniture and appliances →
                </Link>
              </li>
            </ul>
          </section>

          <section className="mb-12 max-w-2xl">
            <h2 className="editorial-heading mb-4">Required documents</h2>
            <ul className="article-body list-none space-y-3.5 pl-0">
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Residence card (在留カード) with valid period of stay
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Passport
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Proof of income: employment contract, pay slips, or tax documents
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Proof of address or planned address, and emergency contact in Japan
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Hanko (印鑑) or willingness to register one for the lease
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Japanese phone number the agent and guarantor can reach
              </li>
            </ul>
            <p className="article-body mt-4">
              <Link href="/residents/open-bank-account-japan" className={linkClass}>
                Open a bank account early →
              </Link>{" "}
              Rent auto-debit and utilities are easier once it exists.
            </p>
          </section>

          <section className="mb-12 max-w-2xl">
            <h2 className="editorial-heading mb-4">
              Guarantor companies explained
            </h2>
            <div className="article-body space-y-4">
              <p>
                Most private leases use a{" "}
                <strong className="font-sans text-dark">guarantor company</strong>,
                not your friend as guarantor. The company signs a contract that
                pays the landlord if you default, then pursues you for repayment.
              </p>
              <p>
                You pay an upfront guarantee fee and often an annual renewal. The
                company screens income, visa length, and employer stability. Short
                visas or irregular income trigger higher fees or rejection.
              </p>
              <p>
                <Link href="/residents/japan-guarantor-system" className={linkClass}>
                  Full guarantor system guide →
                </Link>
              </p>
            </div>
          </section>

          <section className="mb-12 max-w-2xl">
            <h2 className="editorial-heading mb-4">
              Why applications get rejected
            </h2>
            <ul className="article-body list-none space-y-3.5 pl-0">
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Owner policy against foreign nationals or short visa remaining period
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Income below the building rule (often rent should stay under roughly
                one third of gross pay, building dependent)
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Guarantor company decline after credit or employment check
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Another applicant won the same unit first
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Pets, instruments, or home business without permission
              </li>
            </ul>
            <p className="article-body mt-4">
              <Link href="/residents/apartment-rejections-in-japan" className={linkClass}>
                Apartment rejections in Japan (deeper guide) →
              </Link>
            </p>
          </section>

          <section className="mb-12 max-w-2xl">
            <h2 className="editorial-heading mb-4">How to read listing terms</h2>
            <div className="article-body space-y-4">
              <ul className="list-none space-y-3.5 pl-0">
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <span className="font-sans font-bold text-dark">賃料:</span> base
                  rent per month.
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <span className="font-sans font-bold text-dark">管理費 / 共益費:</span>{" "}
                  building maintenance, added to rent monthly.
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <span className="font-sans font-bold text-dark">敷金 / 礼金:</span>{" "}
                  deposit and key money. Zero 礼金 listings exist but may have higher
                  rent or stricter screening.
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <span className="font-sans font-bold text-dark">駅徒歩:</span> minutes
                  walking from station. Five minutes and fifteen minutes feel similar
                  on a map but not on rainy nights.
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <span className="font-sans font-bold text-dark">南向き:</span> south
                  facing for more sun. Matters for drying laundry and winter mood.
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <span className="font-sans font-bold text-dark">即入居可:</span> move
                  in immediately. Good for urgency, sometimes means the last tenant left
                  fast.
                </li>
              </ul>
              <p>
                After you sign, use the{" "}
                <TrackedToolLink
                  href="/tools/japanese-address-formatter"
                  sourceSlug="renting-apartment-japan"
                  className={linkClass}
                >
                  Japanese Address Formatter
                </TrackedToolLink>{" "}
                for bank, delivery, and city hall forms.
              </p>
            </div>
          </section>

          <section className="mb-12 max-w-2xl" aria-labelledby="move-in-checklist-heading">
            <h2 id="move-in-checklist-heading" className="editorial-heading mb-4">
              Move-in checklist
            </h2>
            <ul className="article-body list-none space-y-3.5 pl-0">
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Pay move-in invoice and confirm key handover date
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Start electric, gas, water, internet.{" "}
                <Link href="/residents/pay-bills-japan" className={linkClass}>
                  Pay bills guide
                </Link>
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Register address at ward office.{" "}
                <Link href="/residents/japan-residence-registration" className={linkClass}>
                  Residence registration
                </Link>
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Enroll in health insurance if not on employee plan.{" "}
                <Link href="/residents/japan-health-insurance" className={linkClass}>
                  Health insurance guide
                </Link>
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Photograph room condition on day one for deposit disputes later
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Learn garbage rules for your building.{" "}
                <Link href="/residents/japan-garbage-rules" className={linkClass}>
                  Garbage rules
                </Link>
              </li>
            </ul>
            <div className="mt-6">
              <DownloadChecklistBox downloadId="apartment-setup-checklist" />
            </div>
          </section>

          <section className="mb-12 max-w-2xl">
            <h2 className="editorial-heading mb-4">
              Common mistakes foreigners make
            </h2>
            <ul className="article-body list-none space-y-3.5 pl-0">
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Comparing only monthly rent and ignoring move-in cash
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Applying without a Japanese phone number or reachable emergency contact
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Buying large furniture before measuring elevator and door width
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Assuming verbal OK from the agent means the owner approved
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Waiting until move-in week to open a bank account and pay utilities
              </li>
            </ul>
          </section>

          <div className="mb-12 max-w-2xl space-y-4">
            <h2 className="editorial-heading mb-4">
              Foreigner-friendly housing options
            </h2>
            <p className="article-body mb-2">
              If you want a room without fighting the standard rental market alone:
            </p>
            <p className="article-body-sm mb-4 max-w-2xl text-muted">
              Starting a few weeks before your move date usually means more inventory.
            </p>
            <ServiceBlock
              title="Need help finding a foreigner-friendly apartment?"
              description="Some agencies specialize in helping non-Japanese residents navigate the process."
              linkText="Browse Sakura House rooms →"
              href="https://www.sakura-house.com/"
            />
            <ServiceBlock
              title="Oakhouse"
              description="Share houses and apartments with English-friendly support across Japan."
              linkText="Browse Oakhouse share houses →"
              href="https://www.oakhouse.jp/"
            />
            <RecommendationBoxFromId
              id="document-organizer"
              context="renting-apartment-japan"
              showDisclosure
              className="mt-6"
            />
          </div>

          <section
            className="mb-12 max-w-2xl rounded-lg border border-maroon/30 bg-paper-card p-6 shadow-editorial ring-1 ring-maroon/15 sm:p-8"
            aria-labelledby="renting-tools-cta-heading"
          >
            <h2
              id="renting-tools-cta-heading"
              className="font-display text-xl font-bold italic text-dark sm:text-2xl"
            >
              Tools after you sign
            </h2>
            <p className="article-body mt-3">
              Model monthly burn with the{" "}
              <strong className="font-sans text-dark">
                Japan Monthly Cost Calculator
              </strong>
              . Format your new address for deliveries and forms with the{" "}
              <strong className="font-sans text-dark">
                Japanese Address Formatter
              </strong>
              .
            </p>
            <ul className="mt-5 flex flex-col gap-2 font-sans text-sm font-semibold">
              <li>
                <TrackedToolLink
                  href="/tools/japan-monthly-cost-calculator"
                  sourceSlug="renting-apartment-japan"
                  className="inline-flex text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
                >
                  Japan Monthly Cost Calculator →
                </TrackedToolLink>
              </li>
              <li>
                <TrackedToolLink
                  href="/tools/japanese-address-formatter"
                  sourceSlug="renting-apartment-japan"
                  className="inline-flex text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
                >
                  Japanese Address Formatter →
                </TrackedToolLink>
              </li>
            </ul>
          </section>

          <section
            className="mb-12 max-w-2xl rounded-lg border border-paper-edge bg-paper-elevated/60 p-5 shadow-inner sm:p-6"
            aria-labelledby="renting-related-heading"
          >
            <h2
              id="renting-related-heading"
              className="font-sans text-xs font-bold uppercase tracking-widest text-rust"
            >
              Related guides
            </h2>
            <ul className="mt-4 flex flex-col gap-3 font-sans text-sm font-semibold">
              <li>
                <Link href="/residents/japan-living-cost" className={linkClass}>
                  Japan living cost →
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
                <Link
                  href="/resources/moving-to-japan-checklist"
                  className={linkClass}
                >
                  Moving to Japan checklist →
                </Link>
              </li>
              <li>
                <TrackedToolLink href="/tools" sourceSlug="renting-apartment-japan" className={linkClass}>
                  All tools →
                </TrackedToolLink>
              </li>
              <li>
                <Link href="/residents" className={linkClass}>
                  Residents hub →
                </Link>
              </li>
            </ul>
          </section>

          <NextStepGuides guideId="renting-apartment-japan" />

          <ResidentStarterPath
            sourceSlug="resident-starter-path"
            currentHref="/residents/renting-apartment-japan"
          />
          <ResidentsCrosslinks currentHref="/residents/renting-apartment-japan" />
        </article>
      </main>
    </>
  );
}
