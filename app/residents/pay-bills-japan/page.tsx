import type { Metadata } from "next";
import Link from "next/link";
import { ResidentStarterPath } from "@/components/guides/ResidentStarterPath";
import { ResidentsCrosslinks } from "@/components/guides/ResidentsCrosslinks";
import { ToolRecommendationStrip } from "@/components/tools/ToolRecommendationStrip";
import { TrackedToolLink } from "@/components/tools/TrackedToolLink";
import { siteToolBySlug, toRecommendationCard } from "@/lib/site-tools";
import { siteUrl, SITE_NAME } from "@/lib/site";

const PATH = "/residents/pay-bills-japan";
const CANONICAL = `${siteUrl()}${PATH}`;

const title = "Paying Bills in Japan: Konbini Slips, Bank Debit, and Deadlines";
const description =
  "How to pay bills in Japan as a resident: electricity, gas, water, phone, internet, rent, resident tax, and health insurance; konbini slips, bank auto-debit, online pay, missed payments, mail and address pitfalls, and common foreigner mistakes.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "pay bills Japan foreigner",
    "konbini bill payment Japan",
    "utility bill Japan convenience store",
    "Japan bank auto debit utilities",
    "Japan payment slip barcode",
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
          name: "Paying Bills in Japan",
          item: CANONICAL,
        },
      ],
    },
  ],
};

const linkClass =
  "font-sans font-bold text-rust hover:text-maroon transition-colors duration-150";

const toolStripTools = [
  siteToolBySlug("japanese-address-formatter"),
  siteToolBySlug("japan-monthly-cost-calculator"),
]
  .filter((t): t is NonNullable<typeof t> => t != null)
  .map(toRecommendationCard);

export default function PayBillsJapanPage() {
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
              <span className="text-dark">Paying Bills in Japan</span>
            </nav>
          </div>
        </div>

        <article className="page-x mx-auto max-w-3xl pb-8 pt-8 sm:pt-8">
          <header className="mb-6 max-w-2xl">
            <p className="editorial-kicker mb-3">Residents</p>
            <h1 className="guide-page-title text-balance">{title}</h1>
            <div className="article-body mt-4 space-y-4">
              <p>
                Japanese bill payment confuses many new residents because it is not
                one app or one bank screen. You may get <strong>paper slips</strong>{" "}
                with barcodes, <strong>postcards</strong> from your ward,{" "}
                <strong>email portals</strong> from utilities, and{" "}
                <strong>automatic withdrawals</strong> that only work after you sign
                forms in Japanese. Each provider has its own rhythm.
              </p>
              <p>
                The system is old-fashioned on the surface, but it is usually{" "}
                <strong>predictable once you know the pattern</strong>: read the due
                date, match the account name, pay at the channel the slip allows, keep
                the receipt. Miss a step and you may pay a late fee or chase a
                reissued slip.
              </p>
              <p>
                This page is <strong>practical orientation only</strong>. It is not
                legal, tax, or financial advice. Confirm amounts, deadlines, and
                payment options on the bill itself, with your{" "}
                <strong>landlord or management company</strong>, your{" "}
                <strong>employer</strong>, or your{" "}
                <strong>municipal office</strong> when the notice looks official.
              </p>
              <p>
                Still setting up meters and contracts? Start with{" "}
                <Link href="/residents/japan-utilities-setup" className={linkClass}>
                  utilities setup for foreign residents
                </Link>
                , then come back here for how to pay what arrives in the mail.
              </p>
            </div>
          </header>

          <div className="mb-6">
            <ToolRecommendationStrip
              headingId="pay-bills-tools-strip"
              title="Format addresses and stress test monthly cash"
              deck="Bills route to your registered address. Format Japanese address lines for forms and deliveries, then ballpark rent, utilities, and insurance in the monthly calculator."
              tools={toolStripTools}
              analyticsSourceSlug="pay-bills-japan"
            />
          </div>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">Common bills residents pay</h2>
            <div className="article-body space-y-6">
              <p>
                Not every household has every line item. Your building, contract, and
                city decide what lands in your mailbox. Typical categories:
              </p>
              <ul className="list-none space-y-3.5 pl-0">
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <strong>Electricity:</strong> regional retailer, often monthly.
                  Usage spikes in summer AC and winter heating depending on your
                  setup.
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <strong>Gas:</strong> city gas or LP gas. Billing and setup differ;
                  some buildings are all-electric with no gas bill at all.
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <strong>Water:</strong> often bundled or billed separately by the
                  local water bureau. Amounts can look small next to electricity.
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <strong>Phone:</strong> mobile or fixed line. May be konbini slip,
                  card on file, or bank debit depending on the carrier plan.
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <strong>Internet:</strong> fiber or cable provider, usually monthly
                  after install. Often separate from electricity even in the same
                  building.
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <strong>Rent:</strong> bank transfer, automatic withdrawal, or
                  payment service your lease describes. Not the same workflow as a
                  utility barcode slip.
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <strong>Resident tax (住民税):</strong> municipal invoice, often
                  quarterly or annual installments after your first full tax year.
                  Timing and letters vary by ward.
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <strong>Health insurance:</strong> NHI premium notices from your
                  city, or workplace deductions on your payslip. See{" "}
                  <Link
                    href="/residents/japan-health-insurance"
                    className={linkClass}
                  >
                    Japan health insurance
                  </Link>
                  .
                </li>
              </ul>
              <p>
                For how these lines fit into monthly life, see{" "}
                <Link href="/residents/japan-living-cost" className={linkClass}>
                  Japan living cost
                </Link>
                .
              </p>
            </div>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">Payment methods</h2>
            <div className="article-body space-y-6">
              <div>
                <h3 className="mb-2 font-display text-2xl tracking-wide text-dark">
                  Convenience store payment slips
                </h3>
                <p>
                  Many utilities and some public charges send a slip or postcard with
                  a <strong>barcode</strong> you pay at Lawson, FamilyMart, or 7-Eleven
                  (availability can vary by chain and bill type). Cash is common;
                  card acceptance depends on the store and slip. Keep the{" "}
                  <strong>receipt</strong>.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-display text-2xl tracking-wide text-dark">
                  Automatic bank withdrawal
                </h3>
                <p>
                  You authorize the company to pull from a <strong>Japanese bank
                  account</strong> each cycle. Setup usually means a paper form or
                  online bank flow in Japanese. Once active, it reduces slip hunting
                  but you still should skim statements for surprises. Account setup:{" "}
                  <Link
                    href="/residents/open-bank-account-japan"
                    className={linkClass}
                  >
                    open a bank account in Japan
                  </Link>
                  .
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-display text-2xl tracking-wide text-dark">
                  Online payment
                </h3>
                <p>
                  Larger providers offer <strong>customer portals</strong> or app pay
                  after you register your contract number. Municipal tax may offer
                  online options depending on your city. If the portal is only in
                  Japanese, many people pay the first months at konbini while they
                  sort auto-debit.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-display text-2xl tracking-wide text-dark">
                  Credit card
                </h3>
                <p>
                  Some phone, internet, and utility plans accept a card on file. It is
                  <strong> not universal</strong> for every bill type, especially ward
                  tax and some insurance notices. Check the contract or the payment
                  instructions on the document, not a blog summary.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">
              How convenience store bill payment works
            </h2>
            <div className="article-body space-y-4">
              <p className="mb-3">Typical flow at a konbini:</p>
              <ol className="list-decimal space-y-3 pl-6">
                <li>
                  Bring the <strong>full slip or postcard</strong> (not a screenshot
                  unless the provider explicitly allows it).
                </li>
                <li>
                  At the register or multi-function machine, choose the{" "}
                  <strong>bill payment</strong> menu (wording differs by chain).
                </li>
                <li>
                  Scan the <strong>barcode</strong> or enter the numbers printed on
                  the slip when prompted.
                </li>
                <li>
                  Confirm the <strong>amount and payee name</strong> on the screen
                  match your bill.
                </li>
                <li>
                  Pay with <strong>cash</strong> (or card if the terminal allows it),
                  take the receipt, and store it with your lease or utility folder.
                </li>
              </ol>
              <p className="mt-4">
                For konbini culture beyond bills, see the{" "}
                <Link
                  href="/guides/japan-convenience-store-guide"
                  className={linkClass}
                >
                  Japan convenience store guide
                </Link>
                .
              </p>
            </div>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">
              Reading Japanese bill slips
            </h2>
            <div className="article-body space-y-4">
              <p>
                You do not need fluent Japanese to survive if you learn a few
                anchors. Look for these fields on most slips:
              </p>
              <ul className="list-none space-y-3.5 pl-0">
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <strong>支払期限 (shiharai kigen):</strong> payment deadline. Pay
                  on or before this date unless the slip says otherwise.
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <strong>請求金額 (seikyu kingaku):</strong> amount due. Compare to
                  last month if usage looks wrong.
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <strong>お客様番号 / 契約番号:</strong> customer or contract number.
                  You need this for phone support and portal login.
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <strong>氏名 / ご利用者:</strong> account holder name. Must match
                  how you registered the service.
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <strong>Barcode block:</strong> usually at the bottom or on a
                  detachable stub. That is what the konbini machine scans.
                </li>
              </ul>
              <p>
                If two slips arrive in the same week, check whether they are{" "}
                <strong>different months</strong> or <strong>different providers</strong>
                . Paying the wrong stub is a common rookie error.
              </p>
            </div>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">
              What happens if you miss a payment
            </h2>
            <div className="article-body space-y-4">
              <p>
                Consequences depend on who billed you. Patterns residents report:
              </p>
              <ul className="list-none space-y-3.5 pl-0">
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <strong>Late fees or reissued slips</strong> on utilities and phone
                  plans.
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <strong>Reminder letters</strong> in your mailbox, sometimes
                  registered mail for tax or insurance arrears.
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <strong>Service disruption</strong> in serious utility arrears (rare
                  in month one, more stress over time).
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  <strong>Municipal follow-up</strong> for resident tax or NHI if
                  ignored. Early contact with the ward is usually cheaper than
                  silence.
                </li>
              </ul>
              <p>
                If you know you will be late, call the provider or visit the ward
                counter and ask what options exist. Policies change and staff can
                only speak to your account.
              </p>
            </div>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">
              Utility setup after moving
            </h2>
            <div className="article-body space-y-4">
              <p>
                Payment habits start at move-in. Electricity and gas often need{" "}
                <strong>activation before your first bill</strong>. Water may
                transfer with the address. Internet is a separate application with its
                own billing start date.
              </p>
              <p>
                Your first month may include <strong>partial-period charges</strong> or
                setup fees. Read each first bill carefully before you assume a
                recurring amount. Full setup timeline:{" "}
                <Link href="/residents/japan-utilities-setup" className={linkClass}>
                  utilities setup guide
                </Link>
                . Lease and fee context:{" "}
                <Link
                  href="/residents/renting-apartment-japan"
                  className={linkClass}
                >
                  renting an apartment in Japan
                </Link>
                .
              </p>
            </div>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">
              Why mail and address formatting matter
            </h2>
            <div className="article-body space-y-4">
              <p>
                Bills are still largely <strong>physical mail</strong> tied to your
                registered address. If your name is romanized differently across
                contracts, or your mailbox label does not match ward records, slips can
                look like they belong to someone else.
              </p>
              <p>
                Japanese addresses use <strong>chome, ban, go</strong> order, not
                street-number logic many foreigners expect. A small formatting mistake
                on a utility form can delay setup or send mail to the wrong unit in
                large buildings.
              </p>
              <p>
                Use the{" "}
                <TrackedToolLink
                  href="/tools/japanese-address-formatter"
                  className={linkClass}
                  sourceSlug="pay-bills-japan"
                >
                  Japanese Address Formatter
                </TrackedToolLink>{" "}
                when you copy lines onto forms, and read{" "}
                <Link
                  href="/residents/japan-official-mail-guide"
                  className={linkClass}
                >
                  official mail in Japan
                </Link>{" "}
                for registered letters and tax envelopes.
              </p>
            </div>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">
              Common mistakes foreigners make
            </h2>
            <ul className="article-body list-none space-y-3.5 pl-0">
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Ignoring mail because it looks like ads. Tax and insurance notices
                can look boring until they are not.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Paying the wrong slip when two barcodes arrive in the same envelope.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Assuming your home country card or travel wallet covers recurring
                resident bills.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Skipping auto-debit setup because the form is intimidating, then
                missing konbini deadlines during busy weeks.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Forgetting to update payment info after a <strong>move</strong> or
                <strong> bank change</strong>.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Treating PayPay or transit wallets as universal bill pay. They help
                daily life but rarely replace utility slips on their own. See{" "}
                <Link
                  href="/residents/japan-mobile-payment-guide"
                  className={linkClass}
                >
                  mobile payments in Japan
                </Link>{" "}
                for what those apps are good at.
              </li>
            </ul>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">Bottom line</h2>
            <ul className="article-body list-none space-y-3.5 pl-0">
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Treat mail as part of your monthly admin, not a surprise channel.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Match due date, amount, and account name before you pay at konbini.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Move to bank auto-debit when you can, but still skim statements.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Ask the provider or ward early if a notice looks overdue or unfamiliar.
              </li>
            </ul>
          </section>

          <section className="mb-6 max-w-2xl" aria-labelledby="related-guides-heading">
            <h2 id="related-guides-heading" className="editorial-heading mb-4">
              Related guides
            </h2>
            <ul className="article-body list-none space-y-3 pl-0 text-base">
              <li>
                <Link href="/residents/japan-living-cost" className={linkClass}>
                  Japan living cost (monthly bands) →
                </Link>
              </li>
              <li>
                <Link
                  href="/residents/renting-apartment-japan"
                  className={linkClass}
                >
                  Renting an apartment in Japan →
                </Link>
              </li>
              <li>
                <Link
                  href="/residents/japan-health-insurance"
                  className={linkClass}
                >
                  Japan health insurance →
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/japan-convenience-store-guide"
                  className={linkClass}
                >
                  Japan convenience store guide →
                </Link>
              </li>
              <li>
                <TrackedToolLink
                  href="/tools"
                  className={linkClass}
                  sourceSlug="pay-bills-japan"
                >
                  JapanProTips tools hub →
                </TrackedToolLink>
              </li>
            </ul>
            <p className="article-body mt-6 text-muted">
              Also useful:{" "}
              <Link href="/residents/japan-utilities-setup" className={linkClass}>
                utilities setup
              </Link>
              ,{" "}
              <Link href="/residents/japan-taxes-guide" className={linkClass}>
                taxes overview
              </Link>
              ,{" "}
              <Link
                href="/residents/open-bank-account-japan"
                className={linkClass}
              >
                bank accounts
              </Link>
              .
            </p>
          </section>

          <ResidentStarterPath
            sourceSlug="resident-starter-path"
            currentHref="/residents/pay-bills-japan"
          />
          <ResidentsCrosslinks currentHref="/residents/pay-bills-japan" />
        </article>
      </main>
    </>
  );
}
