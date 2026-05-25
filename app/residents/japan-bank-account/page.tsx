import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ResidentStarterPath } from "@/components/guides/ResidentStarterPath";
import { ResidentsCrosslinks } from "@/components/guides/ResidentsCrosslinks";
import { ToolRecommendationStrip } from "@/components/tools/ToolRecommendationStrip";
import { TrackedToolLink } from "@/components/tools/TrackedToolLink";
import { siteToolBySlug, toRecommendationCard } from "@/lib/site-tools";
import { siteUrl, SITE_NAME } from "@/lib/site";

const PATH = "/residents/japan-bank-account";
const CANONICAL = `${siteUrl()}${PATH}`;

const title = "Opening a Bank Account in Japan as a Foreign Resident";
const description =
  "Practical steps to open a Japanese bank account: documents, address registration, phone number, hanko vs signature, online vs branch banks, salary use, and common rejection reasons.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "bank account Japan foreigner",
    "open bank account resident Japan",
    "Japan Post Bank foreigner",
    "residence card bank",
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

export default function JapanBankAccountPage() {
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
              <span className="text-dark">Bank account</span>
            </nav>
          </div>
        </div>

        <article className="page-x mx-auto max-w-3xl pb-8 pt-8 sm:pt-8">
          <header className="mb-6 max-w-2xl">
            <p className="editorial-kicker mb-3">Residents</p>
            <h1 className="guide-page-title text-balance">{title}</h1>
            <div className="article-body mt-4 space-y-4">
              <p>
                Banking in Japan still feels harder than it should. Branches ask
                for paper copies, phone numbers you just obtained, and address
                proof that does not match what you typed on a rental form. The
                process is slow, but predictable once you know the friction points.
              </p>
              <p>
                You need a local account for salary, rent auto-debit, utilities,
                and many municipal payments. This page is operational orientation,
                not banking or legal advice. Branch rules change. Confirm on the
                official site or at the counter.
              </p>
</div>
          </header>

          <div className="mb-6">
            <ToolRecommendationStrip
              headingId="bank-account-tools"
              title="Match forms to your registered address"
              deck="Bank KYC and utility auto-debit forms expect Japanese address order. Format lines before you photocopy another stack."
              tools={toolStripTools}
              analyticsSourceSlug="japan-bank-account"
            />
          </div>

          <section className="mb-6 max-w-2xl">
            <H2>Who usually needs a Japanese bank account</H2>
            <p className="article-body mb-4">
              Long-term residents paying domestic rent, receiving employer payroll,
              or signing utility auto-debit typically need a Japanese yen account
              at a domestic institution.
            </p>
            <p className="article-body">
              Short tourists and some digital-nomad setups may survive on foreign
              cards and cash for weeks, but landlord and HR workflows often still
              ask for a local account path eventually.
            </p>
          </section>

          <section className="mb-6 max-w-2xl">
            <H2>Common documents</H2>
            <ul className="article-body list-none space-y-3 pl-0 mb-4">
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Residence card with valid period of stay
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Passport as backup ID
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Proof of address: lease, utility bill, or municipal certificate
                depending on branch mood that week
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Japanese phone number (many banks treat this as required)
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Employment letter or student certificate if status is questioned
              </li>
            </ul>
            <p className="article-body">
              Bring originals plus copies. Rules shift by institution and by
              branch interpretation.
            </p>
          </section>

          <section className="mb-6 max-w-2xl">
            <H2>Residence card and address registration</H2>
            <p className="article-body mb-4">
              Banks compare your residence card address to municipal registration.
              If you moved recently, update ward office records before you queue at
              the counter.
            </p>
            <p className="article-body">
              Mismatch between lease PDF, card back, and juminhyo timing is a top
              rejection pattern. Fix registration first, then return to banking.
            </p>
          </section>

          <section className="mb-6 max-w-2xl">
            <H2>Phone number requirement</H2>
            <p className="article-body">
              Many branches want a Japanese mobile number for SMS OTP and callback
              verification. Get a SIM or resident plan early, even if you still use
              WiFi at home for data-heavy apps.
            </p>
          </section>

          <section className="mb-6 max-w-2xl">
            <H2>Hanko or signature</H2>
            <p className="article-body mb-4">
              Some accounts still expect a personal seal. Others accept signature
              only if your status and branch policy allow it.
            </p>
            <p className="article-body">
              Bring a hanko if you have one. Ask whether signature-only works
              before you buy a stamp you do not need.
            </p>
          </section>

          <section className="mb-6 max-w-2xl">
            <H2>Online banks vs traditional banks</H2>
            <p className="article-body mb-4">
              Online-first banks can be smooth after you already pass KYC
              elsewhere. They rarely remove the residence card, address, and phone
              stack on day one.
            </p>
            <p className="article-body">
              Japan Post Bank and major city banks remain common first stops for
              new residents who need a basic passbook-style account. Product names
              and foreigner-friendly positioning change. Check official sites,
              not forum guarantees.
            </p>
          </section>

          <section className="mb-6 max-w-2xl">
            <H2>Bank account for salary</H2>
            <p className="article-body mb-4">
              HR departments need your branch, account number, and account name in
              exact katakana spelling. Typos delay first payroll.
            </p>
            <p className="article-body">
              Cash card and PIN mail may arrive days after account opening. Budget
              a week or two for postal steps, longer around New Year.
            </p>
          </section>

          <section className="mb-6 max-w-2xl">
            <H2>Common rejection reasons</H2>
            <ul className="article-body list-none space-y-3 pl-0">
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Short remaining period of stay on the residence card
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Address proof that does not match registration timing
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                No Japanese phone number yet
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Student or designated activities status without extra letters the
                counter suddenly wants
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Branch policy: same bank, different window, different answer
              </li>
            </ul>
          </section>

          <section className="mb-6 max-w-2xl">
            <H2>Practical checklist</H2>
            <CheckList
              items={[
                "Complete address registration at the ward office.",
                "Obtain a Japanese phone number if possible.",
                "Photocopy residence card, passport, and lease or utility proof.",
                "Pick Japan Post Bank or a major branch with an English counter if needed.",
                "Ask about hanko vs signature before you visit.",
                "Open the account early morning with patience for queue time.",
                "Record branch name, account number, and katakana spelling for HR.",
                "Set up auto-debit only after the account is active.",
              ]}
            />
          </section>

          <section className="mb-6 max-w-2xl rounded-lg border border-paper-edge bg-paper-card px-5 py-5 shadow-editorial sm:px-6">
            <H2>Related tools and guides</H2>
            <ul className="article-body list-none space-y-3 pl-0">
              <li>
                <TrackedToolLink
                  href="/tools/japanese-address-formatter"
                  sourceSlug="japan-bank-account"
                  className={linkClass}
                >
                  Japanese Address Formatter →
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
                <Link
                  href="/residents/renting-apartment-japan"
                  className={linkClass}
                >
                  Renting an apartment in Japan →
                </Link>
              </li>
              <li>
                <Link
                  href="/residents/open-bank-account-japan"
                  className={linkClass}
                >
                  Extended open-bank-account guide →
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
            </ul>
          </section>

          <ResidentStarterPath
            sourceSlug="resident-starter-path"
            currentHref="/residents/japan-bank-account"
          />
          <ResidentsCrosslinks currentHref="/residents/japan-bank-account" />
        </article>
      </main>
    </>
  );
}
