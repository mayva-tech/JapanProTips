import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ResidentStarterPath } from "@/components/guides/ResidentStarterPath";
import { ResidentsCrosslinks } from "@/components/guides/ResidentsCrosslinks";
import { ToolRecommendationStrip } from "@/components/tools/ToolRecommendationStrip";
import { TrackedToolLink } from "@/components/tools/TrackedToolLink";
import { siteToolBySlug, toRecommendationCard } from "@/lib/site-tools";
import { siteUrl, SITE_NAME } from "@/lib/site";

const PATH = "/residents/japan-resident-tax";
const CANONICAL = `${siteUrl()}${PATH}`;

const title = "Japan Resident Tax Explained for Foreign Residents";
const description =
  "Practical orientation to resident tax (juminzei) in Japan: who usually pays, why bills surprise newcomers, payment slips, payroll withholding, moving cities, and common foreigner mistakes.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "resident tax Japan",
    "juminzei foreigner",
    "Japan municipal tax",
    "ward tax payment slip",
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

export default function JapanResidentTaxPage() {
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
              <span className="text-dark">Resident tax</span>
            </nav>
          </div>
        </div>

        <article className="page-x mx-auto max-w-3xl pb-8 pt-8 sm:pt-8">
          <header className="mb-6 max-w-2xl">
            <p className="editorial-kicker mb-3">Residents</p>
            <h1 className="guide-page-title text-balance">{title}</h1>
            <div className="article-body mt-4 space-y-4">
              <p>
                Resident tax (often called juminzei in Japanese) catches many
                foreigners after their first calendar year. Income tax at the
                national level may feel familiar from payroll slips. The municipal
                bill that arrives later can feel like a second, large invoice out
                of nowhere.
              </p>
              <p>
                This page explains how the system usually works for daily life. It
                is not tax advice. Amounts, deadlines, and forms vary by city and
                visa situation. Read your notice, ask your employer HR desk, or
                confirm with your municipal office when numbers look official.
              </p>
</div>
          </header>

          <div className="mb-6">
            <ToolRecommendationStrip
              headingId="resident-tax-tools"
              title="Budget for tax season in monthly cash"
              deck="Resident tax is often a lump sum. Stress-test rent, utilities, insurance, and savings bands before the notice arrives."
              tools={toolStripTools}
              analyticsSourceSlug="japan-resident-tax"
            />
          </div>

          <section className="mb-6 max-w-2xl">
            <H2>What resident tax is</H2>
            <p className="article-body mb-4">
              Resident tax is a local tax tied to where you were registered on
              January 1 and your income in the prior calendar year. It funds
              municipal services: schools, garbage collection, fire services, and
              ward operations you already use.
            </p>
            <p className="article-body">
              It is separate from consumption tax at shops and separate from the
              national income tax line on many payslips. Think of it as your city
              and prefecture share of income-based tax, collected through a
              municipal bill or payroll adjustment.
            </p>
          </section>

          <section className="mb-6 max-w-2xl">
            <H2>Who usually pays it</H2>
            <p className="article-body mb-4">
              Most people registered in Japan on January 1 who had Japan-source
              income the previous year receive a notice. That includes many
              employees, freelancers, and students with part-time income above
              local thresholds.
            </p>
            <p className="article-body">
              Short-stay tourists do not receive this. Long-term residents with
              unstable registration timing may get confusing mail until address
              records match reality. When unsure, bring the letter to your ward
              office counter with your residence card.
            </p>
          </section>

          <section className="mb-6 max-w-2xl">
            <H2>Why it can arrive after your first year</H2>
            <p className="article-body mb-4">
              National withholding adjusts through the year. Resident tax for the
              prior year is often calculated and billed afterward. If you landed
              mid-year with a strong salary, year two mail can look shockingly
              high compared to year one take-home pay.
            </p>
            <p className="article-body">
              That timing gap is normal, not a personal billing error by default.
              Still verify the printed income total against your payslips if
              something looks off by a large margin.
            </p>
          </section>

          <section className="mb-6 max-w-2xl">
            <H2>How payment usually works</H2>
            <p className="article-body mb-4">
              Common patterns:
            </p>
            <ul className="article-body list-none space-y-3 pl-0 mb-4">
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Four quarterly payment slips you pay at a bank, convenience store,
                or online channel listed on the slip
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                One annual lump sum if your city allows a single deadline
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Monthly special withholding through your employer after you submit
                a form
              </li>
            </ul>
            <p className="article-body">
              Payment mechanics mirror other municipal bills. See{" "}
              <Link href="/residents/pay-bills-japan" className={linkClass}>
                paying bills in Japan
              </Link>{" "}
              for barcode slips and deadline habits.
            </p>
          </section>

          <section className="mb-6 max-w-2xl">
            <H2>Company payroll vs payment slips</H2>
            <p className="article-body mb-4">
              Employers can withhold resident tax from salary once you file the
              municipal choice form. Many residents prefer that because it spreads
              the cost and reduces one giant summer invoice.
            </p>
            <p className="article-body">
              If you skip payroll withholding, keep cash aside when slips arrive.
              HR desks sometimes need a reminder after you move wards. A missed
              form change is a common source of surprise paper bills.
            </p>
          </section>

          <section className="mb-6 max-w-2xl">
            <H2>What happens when you move cities</H2>
            <p className="article-body mb-4">
              Your January 1 address drives which city sends the bill. Move in
              March and your registration updates for next cycle, but prior-year
              calculations may still involve the old ward for that tax year.
            </p>
            <p className="article-body">
              After every move, update residence registration promptly. Use the{" "}
              <Link
                href="/resources/moving-to-japan-checklist"
                className={linkClass}
              >
                moving to Japan checklist
              </Link>{" "}
              for address and ward office steps.
            </p>
          </section>

          <section className="mb-6 max-w-2xl">
            <H2>What happens when you leave Japan</H2>
            <p className="article-body mb-4">
              Departing residents may still receive a final notice for the year
              they lived and earned in Japan. Settlement timing depends on
              departure date, employer reporting, and whether withholding already
              covered the liability.
            </p>
            <p className="article-body">
              Do not ignore mail forwarded to a friend&apos;s address. Unpaid
              municipal balances can create administrative headaches if you return
              on another visa later.
            </p>
          </section>

          <section className="mb-6 max-w-2xl">
            <H2>Common mistakes foreigners make</H2>
            <ul className="article-body list-none space-y-3 pl-0">
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Assuming payroll withholding covered everything without checking
                year-end forms
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Missing quarterly slip deadlines because the envelope looked like
                junk mail
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Forgetting to update withholding city after moving wards
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Not keeping cash when only a Japanese bank channel accepts the
                payment
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Treating forum posts as law instead of reading the city notice
              </li>
            </ul>
          </section>

          <section className="mb-6 max-w-2xl">
            <H2>Practical checklist</H2>
            <CheckList
              items={[
                "Read the first resident tax notice line by line when it arrives.",
                "Compare income totals to your final payslip or gensen choshuhyo if provided.",
                "Choose payroll withholding or slip payments and submit forms on time.",
                "Calendar all four quarterly due dates if you pay by slip.",
                "Update ward withholding forms within weeks of any move.",
                "Keep payment receipts with other municipal paperwork.",
                "Model the lump sum in your monthly budget band before summer.",
              ]}
            />
          </section>

          <section className="mb-6 max-w-2xl rounded-lg border border-paper-edge bg-paper-card px-5 py-5 shadow-editorial sm:px-6">
            <H2>Related tools and guides</H2>
            <ul className="article-body list-none space-y-3 pl-0">
              <li>
                <TrackedToolLink
                  href="/tools/japan-monthly-cost-calculator"
                  sourceSlug="japan-resident-tax"
                  className={linkClass}
                >
                  Japan Monthly Cost Calculator →
                </TrackedToolLink>
              </li>
              <li>
                <Link href="/residents/japan-living-cost" className={linkClass}>
                  Japan living cost →
                </Link>
              </li>
              <li>
                <Link href="/residents/pay-bills-japan" className={linkClass}>
                  Paying bills in Japan →
                </Link>
              </li>
              <li>
                <Link href="/residents/japan-health-insurance" className={linkClass}>
                  Japan health insurance →
                </Link>
              </li>
              <li>
                <Link href="/residents/japan-taxes-guide" className={linkClass}>
                  Japan taxes guide (broader) →
                </Link>
              </li>
            </ul>
          </section>

          <ResidentStarterPath
            sourceSlug="resident-starter-path"
            currentHref="/residents/japan-resident-tax"
          />
          <ResidentsCrosslinks currentHref="/residents/japan-resident-tax" />
        </article>
      </main>
    </>
  );
}
