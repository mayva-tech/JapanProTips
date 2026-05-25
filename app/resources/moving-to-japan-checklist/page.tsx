import type { Metadata } from "next";
import Link from "next/link";
import { ResidentStarterPath } from "@/components/guides/ResidentStarterPath";
import { DownloadChecklistBox } from "@/components/DownloadChecklistBox";
import { ToolRecommendationStrip } from "@/components/tools/ToolRecommendationStrip";
import { TrackedToolLink } from "@/components/tools/TrackedToolLink";
import { siteToolBySlug, toRecommendationCard } from "@/lib/site-tools";
import { siteUrl, SITE_NAME } from "@/lib/site";

const PATH = "/resources/moving-to-japan-checklist";
const CANONICAL = `${siteUrl()}${PATH}`;

const title = "Moving to Japan Checklist: First Month for New Residents";
const description =
  "A field-guide checklist for moving to Japan: before arrival, first 24 hours, first week and month, housing, phone, bank, insurance, utilities, mail, work or school, emergencies, common mistakes, and a printable PDF.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "moving to Japan checklist",
    "Japan first month expat",
    "Japan resident registration checklist",
    "move to Japan PDF",
    "JapanProTips resources",
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

type ChecklistGroup = { heading: string; items: string[] };

const PRINTABLE_CHECKLIST: ChecklistGroup[] = [
  {
    heading: "Before arrival",
    items: [
      "Confirm visa category, entry window, and any COE or school paperwork you must carry.",
      "Save lease or dorm address in Japanese and Roman letters for forms and SIM pickup.",
      "Notify bank and cards you will use Japan ATMs. Pack a small cash buffer for week one.",
      "Download offline maps and save embassy contact details.",
      "List documents to keep in carry-on: passport, visa papers, insurance proof, lease PDF.",
    ],
  },
  {
    heading: "First 24 hours",
    items: [
      "Connect at airport: eSIM or pocket WiFi if you ordered ahead.",
      "Reach lodging. Photograph keys, meters, and any damage before you unpack deeply.",
      "Buy basics: toilet paper, trash bags if required, bottled water, simple food.",
      "Note nearest konbini, station exit, and ward office hours for registration.",
      "Sleep. Do not try to finish month one in one night.",
    ],
  },
  {
    heading: "First week",
    items: [
      "Residence registration at city hall within your legal window.",
      "National Health Insurance or confirm workplace coverage with HR.",
      "Start electricity and gas if not already active. Confirm water billing name.",
      "Open bank account if your status allows, or confirm employer payroll path.",
      "SIM or MVNO plan that matches stay length. Order home internet if install waits weeks.",
      "Label mailbox if building requires a name match.",
    ],
  },
  {
    heading: "First month",
    items: [
      "Set rent and utility payment method: transfer, auto-debit, or konbini slips.",
      "My Number invitation or card application if mail arrives.",
      "Resident tax letters: read dates, ask ward if unsure.",
      "Garbage ward chart on fridge. Wrong bag day is a common early fine risk.",
      "Emergency cash buffer separate from daily wallet.",
      "One folder for scanned lease, visa, insurance, and bill PDFs.",
    ],
  },
  {
    heading: "Housing setup",
    items: [
      "Fire insurance proof if the building requires it.",
      "Test AC, hot water, burners, and breaker labels.",
      "Confirm who pays key money follow-ups, parking, and renewal fees.",
      "Internet install appointment or hotspot backup for remote work.",
    ],
  },
  {
    heading: "Phone and internet",
    items: [
      "Phone plan matches visa length. Billing method chosen.",
      "Home fiber or cable order placed early if lead time is long.",
      "Save provider login and support number in your notes app.",
    ],
  },
  {
    heading: "Banking and payments",
    items: [
      "Japanese bank account or confirmed payroll account path.",
      "ATM card PIN and transfer limits understood.",
      "Know how rent and bills will be paid each month.",
    ],
  },
  {
    heading: "Health insurance and pension",
    items: [
      "Enrolled in correct health system for your job or city status.",
      "Insurance card in wallet. Premium payment method set.",
      "Pension enrollment or exemption confirmed with employer or city desk.",
    ],
  },
  {
    heading: "Utilities and bills",
    items: [
      "Electric, gas, and water start dates match move-in.",
      "First bills read for due dates and account numbers.",
      "Konbini or auto-debit chosen before a deadline slips.",
    ],
  },
  {
    heading: "Address registration and mail",
    items: [
      "Registered address matches where you actually sleep.",
      "Mailbox name matches registration where required.",
      "Official mail opened promptly: tax, insurance, My Number.",
    ],
  },
  {
    heading: "Work or school setup",
    items: [
      "HR or school office has your bank and emergency contact.",
      "Commute card or pass purchased if daily train use.",
      "Work visa or school status documents photocopied and stored offline.",
    ],
  },
  {
    heading: "Emergency documents",
    items: [
      "110 and 119 saved with your address in Japanese on your phone.",
      "Hospital or clinic chosen near home for non-emergency illness.",
      "ICE contact in phone and on paper in your wallet.",
    ],
  },
];

const jsonLdChecklistItems = PRINTABLE_CHECKLIST.flatMap((group, groupIndex) =>
  group.items.map((name, itemIndex) => ({
    "@type": "ListItem",
    position: groupIndex * 100 + itemIndex + 1,
    name: `${group.heading}: ${name}`,
  })),
);

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
      mainEntity: { "@id": `${CANONICAL}#checklist` },
    },
    {
      "@type": "ItemList",
      "@id": `${CANONICAL}#checklist`,
      name: title,
      description,
      inLanguage: "en-US",
      numberOfItems: jsonLdChecklistItems.length,
      itemListElement: jsonLdChecklistItems,
    },
    {
      "@type": "Article",
      "@id": `${CANONICAL}#article`,
      headline: title,
      description,
      inLanguage: "en-US",
      genre: "checklist",
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
          name: "Resources",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Moving to Japan Checklist",
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

const checkboxClass =
  "mt-1 h-4 w-4 shrink-0 rounded-sm border border-paper-edge bg-paper-card";

function ChecklistPrintBlock({ heading, items }: ChecklistGroup) {
  return (
    <div className="mb-6 break-inside-avoid">
      <h3 className="mb-3 font-display text-xl tracking-wide text-dark">
        {heading}
      </h3>
      <ul className="space-y-2.5 pl-0">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm font-serif text-dark">
            <span aria-hidden className={checkboxClass} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function MovingToJapanChecklistPage() {
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
              <span className="text-muted">Resources</span>
              <span aria-hidden className="mx-2 text-tan">
                /
              </span>
              <span className="text-dark">Moving to Japan Checklist</span>
            </nav>
          </div>
        </div>

        <article className="page-x mx-auto max-w-3xl pb-8 pt-8 sm:pt-8">
          <header className="mb-6 max-w-2xl">
            <p className="editorial-kicker mb-3">Resources</p>
            <h1 className="guide-page-title text-balance">{title}</h1>
            <div className="article-body mt-4 space-y-4">
              <p>
                This checklist is a <strong>boring order of operations</strong> for
                your first month after you relocate to Japan. It is not a visa
                guide, not a job hunt, and not legal advice. It is the admin stack
                that piles up when you are tired: ward office, bank, phone, bills,
                insurance, and apartment paperwork.
              </p>
              <p>
                Work top to bottom on the web page, or print the PDF when hotel WiFi
                is slow. Deep dives live in linked resident guides. Confirm deadlines
                and forms with your <strong>city office</strong>,{" "}
                <strong>landlord</strong>, <strong>employer</strong>, or{" "}
                <strong>school</strong> because rules shift by municipality and visa
                type.
              </p>
</div>
          </header>

          <div className="mb-6">
            <ToolRecommendationStrip
              headingId="moving-checklist-tools-strip"
              title="Format addresses and model monthly cash"
              deck="Copy Japanese address lines for forms and mail, then stress test rent, utilities, phone, and insurance in the monthly calculator."
              tools={toolStripTools}
              analyticsSourceSlug="moving-to-japan-checklist"
            />
          </div>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">Before arrival</h2>
            <div className="article-body space-y-4">
              <p>
                Finish what you can <strong>before the flight</strong> so week one is
                execution, not research. Visa category and entry timing come from
                official immigration sources, not this page.
              </p>
              <ul className="list-none space-y-3.5 pl-0">
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  Save your Japanese address lines for SIM delivery and courier forms.
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  Pack carry-on copies of lease, COE, school letter, or HR offer as
                  applicable.
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  Ballpark monthly burn with{" "}
                  <Link href="/residents/japan-living-cost" className={linkClass}>
                    Japan living cost
                  </Link>{" "}
                  before you sign a lease.
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">First 24 hours</h2>
            <div className="article-body space-y-4">
              <p>
                Survival mode only: connectivity, keys, sleep, and photos of the unit.
                Registration and bank can usually wait a day or two if you landed
                late, but check your visa category for any hard windows.
              </p>
              <p>
                Airport steps overlap with{" "}
                <Link href="/guides/japan-airport-first-steps" className={linkClass}>
                  Japan airport first steps
                </Link>{" "}
                if you are still in visitor mode on day zero.
              </p>
            </div>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">First week</h2>
            <div className="article-body space-y-4">
              <p>
                This is the <strong>legal and identity week</strong>. City hall
                registration often unlocks health insurance enrollment and official
                mail. See{" "}
                <Link
                  href="/residents/japan-residence-registration"
                  className={linkClass}
                >
                  residence registration
                </Link>{" "}
                for timing and documents.
              </p>
              <p>
                Open{" "}
                <Link
                  href="/residents/open-bank-account-japan"
                  className={linkClass}
                >
                  a bank account
                </Link>{" "}
                when your status allows. Start utilities if meters are cold. Pick a
                phone plan that matches stay length.
              </p>
            </div>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">First month</h2>
            <div className="article-body space-y-4">
              <p>
                Month one is about <strong>payment habits</strong> and{" "}
                <strong>mail discipline</strong>. Premiums, tax notices, and insurance
                letters look dull until they are overdue.
              </p>
              <p>
                Tie rent, utilities, and insurance into one calendar. Use{" "}
                <Link href="/residents/pay-bills-japan" className={linkClass}>
                  paying bills in Japan
                </Link>{" "}
                for konbini slips and auto-debit setup.
              </p>
            </div>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">Housing setup</h2>
            <div className="article-body space-y-4">
              <p>
                Lease signing, move-in fees, and guarantor paperwork sit in{" "}
                <Link
                  href="/residents/renting-apartment-japan"
                  className={linkClass}
                >
                  renting an apartment in Japan
                </Link>
                . After keys: meter photos, garbage rules, fire insurance, and
                internet lead time.
              </p>
              <p>
                Apartment-only PDF: use the apartment setup checklist from the
                renting guide page when you want a shorter move-in slice.
              </p>
            </div>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">Phone and internet</h2>
            <div className="article-body space-y-4">
              <p>
                Phone plans for residents:{" "}
                <Link
                  href="/residents/japan-mobile-phone-plans"
                  className={linkClass}
                >
                  mobile phone plans in Japan
                </Link>
                . Home fiber often needs a <strong>two to four week</strong> lead
                time. Keep a hotspot backup if you work remotely on day three.
              </p>
            </div>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">Banking and payments</h2>
            <div className="article-body space-y-4">
              <p>
                Without a local account, you live on cash, overseas cards, and
                friction. Once a Japanese account exists, set{" "}
                <strong>rent transfer</strong> and think about auto-debit for
                utilities. Mobile wallets help daily life but rarely replace utility
                slips on their own.
              </p>
            </div>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">
              Health insurance and pension
            </h2>
            <div className="article-body space-y-4">
              <p>
                Enroll in the system that matches your job and visa facts. Overview:{" "}
                <Link
                  href="/residents/japan-health-insurance"
                  className={linkClass}
                >
                  Japan health insurance
                </Link>
                . Pension questions often surface at the same city hall visit:{" "}
                <Link
                  href="/residents/japan-pension-system"
                  className={linkClass}
                >
                  Japan pension system
                </Link>
                .
              </p>
            </div>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">Utilities and bills</h2>
            <div className="article-body space-y-4">
              <p>
                Setup timeline:{" "}
                <Link href="/residents/japan-utilities-setup" className={linkClass}>
                  utilities setup
                </Link>
                . Payment habits:{" "}
                <Link href="/residents/pay-bills-japan" className={linkClass}>
                  pay bills in Japan
                </Link>
                .
              </p>
            </div>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">
              Address registration and mail
            </h2>
            <div className="article-body space-y-4">
              <p>
                Registration address drives tax, insurance, and ballot mail. Format
                lines carefully with the{" "}
                <TrackedToolLink
                  href="/tools/japanese-address-formatter"
                  className={linkClass}
                  sourceSlug="moving-to-japan-checklist"
                >
                  Japanese Address Formatter
                </TrackedToolLink>
                . Official envelopes:{" "}
                <Link
                  href="/residents/japan-official-mail-guide"
                  className={linkClass}
                >
                  official mail in Japan
                </Link>
                .
              </p>
            </div>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">Work or school setup</h2>
            <div className="article-body space-y-4">
              <p>
                Employers and schools each have their own HR or international office
                packet. Bring bank details, emergency contact, and commute plans.
                Part-time or student edge cases:{" "}
                <Link href="/residents/part-time-jobs-japan" className={linkClass}>
                  part-time jobs in Japan
                </Link>
                ,{" "}
                <Link href="/residents/japan-school-system" className={linkClass}>
                  school system overview
                </Link>
                .
              </p>
            </div>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">Emergency documents</h2>
            <div className="article-body space-y-4">
              <p>
                Save <strong>110</strong> (police) and <strong>119</strong> (fire and
                ambulance). Keep your address in Japanese in your phone notes. Download
                the{" "}
                <Link href="/downloads/japan-emergency-card.pdf" className={linkClass}>
                  emergency numbers card PDF
                </Link>{" "}
                for offline use.
              </p>
              <p>
                Broader context:{" "}
                <Link href="/residents/japan-emergency-guide" className={linkClass}>
                  Japan emergency guide
                </Link>
                .
              </p>
            </div>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">
              Common mistakes foreigners make
            </h2>
            <ul className="article-body list-none space-y-3.5 pl-0">
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Treating travel insurance as resident health coverage for everyday
                care.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Delaying ward office registration because the forms look intimidating.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Ignoring beige envelopes that are actually tax or insurance notices.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Paying the wrong konbini slip when two barcodes arrive the same week.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Assuming English at every counter. Print keywords or bring a friend for
                high-stakes visits.
              </li>
            </ul>
          </section>

          <section
            className="mb-6 max-w-2xl rounded-lg border border-paper-edge bg-paper-card px-5 py-6 shadow-editorial sm:px-6 sm:py-8"
            aria-labelledby="printable-checklist-heading"
          >
            <h2
              id="printable-checklist-heading"
              className="editorial-heading mb-2"
            >
              Printable-style checklist
            </h2>
            <p className="article-body mb-6 text-muted">
              Tick mentally or print this page. For a compact PDF, use the download
              box below.
            </p>
            {PRINTABLE_CHECKLIST.map((group) => (
              <ChecklistPrintBlock key={group.heading} {...group} />
            ))}
          </section>

          <DownloadChecklistBox
            downloadId="moving-to-japan-checklist"
            note="Same month-one order as the checklist above. Save offline before move-in week if you can."
          />

          <ResidentStarterPath
            sourceSlug="resident-starter-path"
            currentHref="/resources/moving-to-japan-checklist"
          />

          <section className="mb-6 mt-6 max-w-2xl" aria-labelledby="related-heading">
            <h2 id="related-heading" className="editorial-heading mb-4">
              Related guides
            </h2>
            <ul className="article-body list-none space-y-3 pl-0 text-base">
              <li>
                <Link href="/residents/japan-living-cost" className={linkClass}>
                  Japan living cost →
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
                <Link href="/residents/pay-bills-japan" className={linkClass}>
                  Paying bills in Japan →
                </Link>
              </li>
              <li>
                <TrackedToolLink
                  href="/tools"
                  className={linkClass}
                  sourceSlug="moving-to-japan-checklist"
                >
                  JapanProTips tools hub →
                </TrackedToolLink>
              </li>
            </ul>
            <p className="article-body mt-6 text-muted">
              Also:{" "}
              <Link
                href="/resources/moving-to-japan-system"
                className={linkClass}
              >
                moving to Japan system overview
              </Link>
              ,{" "}
              <Link href="/residents" className={linkClass}>
                all resident guides
              </Link>
              .
            </p>
          </section>
        </article>
      </main>
    </>
  );
}
