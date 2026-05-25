import type { Metadata } from "next";
import Link from "next/link";
import { ResidentStarterPath } from "@/components/guides/ResidentStarterPath";
import { ResidentsCrosslinks } from "@/components/guides/ResidentsCrosslinks";
import { ToolRecommendationStrip } from "@/components/tools/ToolRecommendationStrip";
import { TrackedToolLink } from "@/components/tools/TrackedToolLink";
import { siteToolBySlug, toRecommendationCard } from "@/lib/site-tools";
import { siteUrl, SITE_NAME } from "@/lib/site";

const PATH = "/residents/japan-health-insurance";
const CANONICAL = `${siteUrl()}${PATH}`;

const title = "Japan Health Insurance for Residents: NHI and Workplace Plans";
const description =
  "Health insurance in Japan for foreign residents: National Health Insurance (NHI) vs employee coverage, who usually enrolls, where to apply, documents, premium reality checks, pension ties, coverage limits, common mistakes, and what to do when you move or change jobs.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Japan National Health Insurance foreigner",
    "Kokumin Kenko Hoken NHI Japan",
    "Japan employee health insurance",
    "Japan shakai hoken health",
    "ward office health insurance Japan",
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
          name: "Japan Health Insurance",
          item: CANONICAL,
        },
      ],
    },
  ],
};

const linkClass =
  "font-sans font-bold text-rust hover:text-maroon transition-colors duration-150";

const toolStripTools = [siteToolBySlug("japan-monthly-cost-calculator")]
  .filter((t): t is NonNullable<typeof t> => t != null)
  .map(toRecommendationCard);

export default function JapanHealthInsurancePage() {
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
              <span className="text-dark">Japan Health Insurance</span>
            </nav>
          </div>
        </div>

        <article className="page-x mx-auto max-w-3xl pb-8 pt-8 sm:pt-8">
          <header className="mb-6 max-w-2xl">
            <p className="editorial-kicker mb-3">Residents</p>
            <h1 className="guide-page-title text-balance">{title}</h1>
            <div className="article-body mt-4 space-y-4">
              <p>
                After you move to Japan on a mid-term or long-term basis,{" "}
                <strong>public health insurance</strong> stops being a travel
                add-on and becomes part of daily life. It affects how much you pay at
                clinics, how pharmacies bill you, and how municipalities and
                employers expect you to stay enrolled in the right system.
              </p>
              <p>
                Most conversations among foreigners still orbit{" "}
                <strong>Kokumin Kenko Hoken</strong> (
                <abbr title="国民健康保険">国民健康保険</abbr>, often called{" "}
                <strong>NHI</strong>), because it is the municipal plan for people
                who are not on workplace coverage. If you take a standard full-time
                job with social insurance, you will more often hear about{" "}
                <strong>employee health insurance</strong> as one piece of the
                larger workplace bundle.
              </p>
              <p>
                This page is <strong>practical orientation only</strong>. It is not
                legal, tax, or financial advice, and rules can differ by municipality,
                visa category, contract type, and year. Treat your{" "}
                <strong>ward or city office</strong>, your{" "}
                <strong>employer HR</strong>, and{" "}
                <strong>official government sources</strong> as the places that
                confirm what applies to you.
              </p>
              <p>
                For what you actually pay at clinics and pharmacies once you are
                enrolled, see the{" "}
                <Link href="/residents/japan-healthcare-costs" className={linkClass}>
                  healthcare costs guide
                </Link>
                .
              </p>
            </div>
          </header>

          <div className="mb-6">
            <ToolRecommendationStrip
              headingId="health-insurance-cost-strip"
              title="Ballpark monthly life with insurance in the mix"
              deck="Premiums depend on income, household, and system. Use the calculator to stress test rent, food, utilities, and add-ons so NHI or workplace deductions do not feel like a surprise line item."
              tools={toolStripTools}
              analyticsSourceSlug="japan-health-insurance"
            />
          </div>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">
              The two common systems: employee health insurance and National Health
              Insurance
            </h2>
            <div className="article-body space-y-6">
              <div>
                <h3 className="mb-2 font-display text-2xl tracking-wide text-dark">
                  Employee health insurance (workplace coverage)
                </h3>
                <p>
                  <strong>Employees</strong> in eligible roles are often enrolled in{" "}
                  <strong>Employees&apos; Health Insurance</strong> as part of{" "}
                  <strong>shakai hoken</strong> (social insurance). Premiums are
                  usually split with the employer. Administration sits with the health
                  insurance union or insurer tied to the workplace, not your ward
                  NHI desk.
                </p>
                <p className="mt-4">
                  Card and front-desk experience can feel similar to NHI at many
                  clinics, but <strong>procedures, notices, and questions about
                  dependents</strong> usually route through HR or the insurer. Ask
                  your employer for written steps when you join or leave.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-display text-2xl tracking-wide text-dark">
                  National Health Insurance (NHI)
                </h3>
                <p>
                  NHI is <strong>municipal health insurance</strong>. Your ward or
                  city runs enrollment, sends premium notices, and handles most
                  questions about payment for people who belong in that system. For
                  most uninsured residents of working age, it is{" "}
                  <strong>not something you can ignore indefinitely</strong> once you
                  are expected to enroll.
                </p>
                <p className="mt-4">
                  Once enrolled, you pay monthly premiums. For many covered visits you
                  show your card and typically owe about{" "}
                  <strong>30% of the bill</strong> at the point of care, with prices
                  shaped by the national fee schedule for insured treatment. Exact
                  percentages and exceptions exist for children and seniors, so confirm
                  on the spot if you are unsure.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">Who usually needs to enroll</h2>
            <div className="article-body space-y-4">
              <p>
                Eligibility is fact-specific. In general, if you are a{" "}
                <strong>registered resident</strong> and you are{" "}
                <strong>not</strong> covered by an appropriate workplace plan, your
                municipality will usually expect you to join <strong>NHI</strong>.
              </p>
              <p className="mb-3">People who often land on NHI include:</p>
              <ul className="article-body list-none space-y-3.5 pl-0">
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  Students on many programs, unless the school places you in a
                  different approved arrangement (confirm locally).
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  Freelancers and sole proprietors.
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  Part-time workers under hour or contract rules that exclude shakai
                  hoken.
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  Dependents who are not carried on an employee plan in the way your
                  city describes.
                </li>
              </ul>
              <p className="mt-4">
                If you start a job that triggers workplace insurance, you typically{" "}
                <strong>leave NHI</strong> and switch systems on a timeline your ward
                and HR should confirm so you avoid double billing or a gap.
              </p>
            </div>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">Where to apply</h2>
            <div className="article-body space-y-4">
              <p>
                For <strong>NHI</strong>, go to the{" "}
                <strong>health insurance counter</strong> at the municipal office that
                covers your registered address (ward office in Tokyo wards, city
                hall elsewhere). Hours and English support vary; weekday mornings are
                a common default.
              </p>
              <p>
                For <strong>employee health insurance</strong>, enrollment and
                paperwork usually flow through your <strong>employer</strong>. Ask HR
                for the insurer name, card issue timeline, and what to do on your
                first clinic visit.
              </p>
            </div>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">What documents to bring</h2>
            <div className="article-body space-y-4">
              <p>
                Lists differ by city and situation. For a typical{" "}
                <strong>first NHI visit</strong>, staff often ask for items such as:
              </p>
              <ul className="article-body list-none space-y-3.5 pl-0">
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  Residence card.
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  Passport, in some cases.
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  Proof of address if staff request supporting documents.
                </li>
                <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                  Bank account details if you want automatic withdrawal for premiums
                  (see{" "}
                  <Link href="/residents/japan-bank-account" className={linkClass}>
                    bank account setup
                  </Link>{" "}
                  or{" "}
                  <Link
                    href="/residents/open-bank-account-japan"
                    className={linkClass}
                  >
                    open a bank account in Japan
                  </Link>
                  ).
                </li>
              </ul>
              <p className="mt-4">
                You should receive an <strong>insurance card</strong>. Guard it. A
                damaged or lost card means another visit to ask for replacement
                steps.
              </p>
            </div>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">
              Monthly premium reality check
            </h2>
            <div className="article-body space-y-4">
              <p>
                <strong>NHI premiums</strong> are usually tied to the prior year&apos;s{" "}
                <strong>income</strong>, <strong>assets</strong>, and household
                structure, with municipal caps and floors that can change over time.
                Low reported income in your first stretch in Japan often means{" "}
                <strong>lower notices at the start</strong>. Amounts can shift once tax
                records catch up, so treat early bills as a rough band, not a promise
                of the long-run number.
              </p>
              <p>
                <strong>Workplace premiums</strong> follow insurer tables and salary
                bands. Your payslip is the practical source for what leaves your
                account each month.
              </p>
              <p>
                You typically pay NHI monthly or on slips, or by direct debit. Many
                people align payment with a Japanese bank account and municipal
                notices. To see insurance sitting next to rent and utilities, use the{" "}
                <TrackedToolLink
                  href="/tools/japan-monthly-cost-calculator"
                  className={linkClass}
                  sourceSlug="japan-health-insurance"
                >
                  Japan Monthly Cost Calculator
                </TrackedToolLink>{" "}
                and the{" "}
                <Link href="/residents/japan-living-cost" className={linkClass}>
                  living cost guide
                </Link>
                .
              </p>
              <p>
                In practice, enrollment timing often follows{" "}
                <strong>resident registration</strong> at your address. After you
                register where you live, the municipality may expect you to complete
                NHI if you are not already covered elsewhere. Same-week or next-week
                city hall visits after you have an address are common for newcomers
                who need NHI.
              </p>
              <h3 className="mb-2 mt-6 font-display text-xl tracking-wide text-dark">
                If you fall behind on NHI payments
              </h3>
              <p>
                Non-payment is treated seriously. Consequences can include{" "}
                <strong>penalties</strong>, <strong>collection letters</strong>, and in
                difficult cases <strong>disruption of insured treatment</strong> until
                you sort arrears. If you cannot pay, visit the ward early and ask
                about reduction programs or installment options. Silence is usually the
                costlier path.
              </p>
            </div>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">Pension reminder</h2>
            <div className="article-body space-y-4">
              <p>
                Health insurance paperwork at city hall often sits next to{" "}
                <strong>pension</strong> questions, because both flow from employment
                and resident status. They are not the same system, but life changes
                (new job, new visa, new address) can touch both at once.
              </p>
              <p>
                For a resident-focused overview of pension types and enrollment
                pressure points, read{" "}
                <Link href="/residents/japan-pension-system" className={linkClass}>
                  Japan pension system for foreign residents
                </Link>
                . Confirm any obligation or exemption with the pension desk or your
                employer.
              </p>
            </div>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">
              What insurance usually covers (high level)
            </h2>
            <div className="article-body space-y-4">
              <p>
                Under the usual insured pathway, many standard medical visits,
                tests, and medications that fit the fee schedule are covered in part,
                with your <strong>patient share</strong> collected at the desk. Many
                adults see about <strong>30%</strong> for standard adult care under
                common rules, with other shares for young children and seniors.
              </p>
              <p>
                Japan also uses <strong>annual caps on high medical costs</strong> so
                unusually heavy years are less likely to wipe out a household. The
                exact cap rules depend on income and household; ask staff or read
                municipal booklets if your bills climb.
              </p>
              <p>
                Details vary by case, provider, and treatment category. If staff say a
                service is <strong>not insured</strong>, listen carefully, because
                billing can change from the usual copay pattern.
              </p>
            </div>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">
              What insurance may not fully cover
            </h2>
            <ul className="article-body list-none space-y-3.5 pl-0">
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                <strong>Hospital visits without a referral</strong> when a clinic
                route was expected can trigger a higher self-pay share as a nudge
                toward primary care. Rules have nuance; the clinic receptionist is
                often the practical guide.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                <strong>Dental</strong> has separate categories. Basic insured
                treatment exists, but cosmetic orthodontics and some materials may
                bill outside the insured lane. Ask before you agree to a plan.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                <strong>Elective or non-standard options</strong> your doctor labels as
                outside insurance can bill closer to full price.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                <strong>English-speaking convenience</strong> can correlate with
                clinics that bill in ways that feel expensive compared with a quiet
                neighborhood clinic. That is a service and market pattern, not a
                promise of insurance coverage.
              </li>
            </ul>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">
              Common mistakes foreigners make
            </h2>
            <ul className="article-body list-none space-y-3.5 pl-0">
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Waiting to enroll until after a big medical episode, which can mean
                back billing and higher stress.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Assuming <strong>travel insurance</strong> replaces resident public
                insurance for everyday care.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Treating <strong>30% copay</strong> as trivial, then getting surprised
                by imaging, procedures, or multi-day stays. Fee schedules help, but
                cash flow still needs room.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Forgetting to <strong>hand the insurance card at reception</strong>{" "}
                before the visit, which can scramble billing flow.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Ignoring mail from the city because it looks boring. Premium notices
                and pension letters often need a response or at least a calendar note.
              </li>
            </ul>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">
              What to do after moving cities or changing jobs
            </h2>
            <div className="article-body space-y-6">
              <div>
                <h3 className="mb-2 font-display text-2xl tracking-wide text-dark">
                  Moving cities
                </h3>
                <p>
                  Moving triggers <strong>address change procedures</strong> and
                  often a <strong>new municipal insurer</strong> for NHI. Complete
                  move-out and move-in registration, then re-establish NHI locally
                  unless your coverage type changes. Bring old cards and any payment
                  booklets so staff can see your history.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-display text-2xl tracking-wide text-dark">
                  Changing jobs
                </h3>
                <p>
                  Switching from NHI to workplace insurance, or the reverse, needs a
                  clean handoff. HR usually explains health insurance on onboarding.
                  If you leave a job, ask <strong>both</strong> the employer and the
                  ward about gaps and start dates.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-display text-2xl tracking-wide text-dark">
                  Students and part-time work
                </h3>
                <p>
                  Students may stay on NHI or join an institutional plan depending on
                  the school. Part-time hours and contract type decide whether an
                  employer moves you into shakai hoken. If you stack multiple jobs,
                  eligibility can get fiddly. After any contract change, ask the city
                  desk if you are unsure. For work context, see{" "}
                  <Link href="/residents/part-time-jobs-japan" className={linkClass}>
                    part-time jobs in Japan for foreigners
                  </Link>
                  .
                </p>
              </div>
            </div>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">Your card and the copay</h2>
            <div className="article-body space-y-4">
              <p>
                At covered visits, present your <strong>insurance card</strong> at
                reception before you see the doctor. You usually pay your share on
                the spot. Keep receipts if you need records for taxes or reimbursement
                elsewhere.
              </p>
            </div>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">
              Clinic vs hospital, referrals, and appointments
            </h2>
            <div className="article-body space-y-4">
              <p>
                Japan routes most day-to-day care through <strong>clinics</strong> (
                <em>shinryoujo</em>, <em>ika</em> for internal medicine). You book a
                slot or take a numbered ticket depending on the clinic style. First
                visits often include a short intake form and vital signs.
              </p>
              <p>
                <strong>Hospitals</strong> are for specialized work, imaging-heavy
                episodes, or when a clinic refers you. Walking into a large hospital
                without a referral can work in some cases, but you may pay a{" "}
                <strong>higher self-pay portion</strong> as a disincentive to skipping
                primary care. Rules have nuance; the clinic receptionist is your
                practical guide.
              </p>
              <p>
                Appointment culture favors <strong>punctuality</strong>, quiet waiting
                rooms, and brief, efficient visits. Write symptoms on your phone in
                Japanese if that lowers stress. Many clinics treat English as a bonus,
                not a guarantee.
              </p>
            </div>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">
              Prescriptions at an outside pharmacy
            </h2>
            <div className="article-body space-y-4">
              <p>
                Doctors issue a <strong>paper prescription</strong>. You usually fill
                it at a <strong>separate pharmacy</strong>, often near the clinic or
                station. Pharmacists review the medication, explain dosing, and bill
                your insurance share. Keep bags and receipts if you need tax or
                reimbursement records.
              </p>
            </div>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">
              Emergencies and dental coverage
            </h2>
            <div className="article-body space-y-4">
              <p>
                True emergencies: use <strong>119</strong> for ambulance or go to an
                ER if you can travel safely. Bring ID, your <strong>insurance
                card</strong>, and cash or card for the counter. After hours, options
                can be thinner; your ward may publish after-hours clinics.
              </p>
              <p>
                <strong>Dental</strong> care is partially covered under a separate
                basket of rules. Basic treatment categories use insurance pricing.
                Cosmetic orthodontics and some materials do not. Ask the dentist what
                is covered before you agree to a plan.
              </p>
            </div>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">
              My Number (Individual Number)
            </h2>
            <div className="article-body space-y-4">
              <p>
                The <strong>My Number</strong> system ties together taxes, pensions,
                and some benefits. You may link your bank account for automatic debits
                or use the card for online tax filings. Municipal portals increasingly
                assume you have the number or are applying for the card.
              </p>
              <p>
                NHI is not &quot;My Number insurance&quot;. They are parallel systems
                that meet at city hall paperwork.
              </p>
            </div>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">
              How care feels, English support, tourist vs resident pricing
            </h2>
            <div className="article-body space-y-4">
              <p>
                Japanese primary care is <strong>orderly, fast, and literal</strong>.
                You may get fewer minutes of chit-chat than in some Western clinics,
                with more focus on symptoms, tests, and a clear prescription path.
              </p>
              <p>
                <strong>English support</strong> is strongest in urban international
                clinics and university hospitals. Neighborhood clinics may rely on
                translation apps. Politeness and patience go far; printed Japanese
                keywords help.
              </p>
              <p>
                <strong>Tourists</strong> without resident coverage pay{" "}
                <strong>uninsured rates</strong>, which can look very different from
                the insured copay experience. Residents should carry proof of
                enrollment whenever they seek non-tourist care.
              </p>
            </div>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">
              Walkthrough: fever visit at a local clinic
            </h2>
            <div className="article-body space-y-4">
              <p className="mb-3">Example flow many people follow:</p>
              <ol className="max-w-2xl list-decimal space-y-3 pl-6">
                <li>
                  Search a nearby <strong>internal medicine</strong> or{" "}
                  <strong>general clinic</strong> accepting new patients. Confirm
                  hours.
                </li>
                <li>
                  Bring <strong>residence card</strong>, <strong>insurance card</strong>
                  , <strong>cash</strong> (many clinics still prefer cash for
                  copays), and a <strong>mask</strong>.
                </li>
                <li>
                  Check in at reception. State fever and key symptoms. Hand over your
                  insurance card on the first pass.
                </li>
                <li>
                  Wait, see the clinician, accept prescribed tests if offered.
                </li>
                <li>
                  Pay your <strong>patient share</strong> at the clinic exit desk.
                  Collect documentation.
                </li>
                <li>
                  Take the prescription slip to a <strong>pharmacy</strong>. Pay the
                  insured share for medicines. Ask about dosing times and food.
                </li>
                <li>
                  Rest, hydrate, and return or call if symptoms worsen per the
                  clinician&apos;s advice.
                </li>
              </ol>
              <p className="mt-6">
                If you spike again after hours, look for your ward&apos;s{" "}
                <strong>night clinic guidance</strong> or use emergency services when
                red-flag symptoms appear.
              </p>
            </div>
          </section>

          <section className="mb-6 max-w-2xl">
            <h2 className="editorial-heading mb-4">Bottom line</h2>
            <ul className="article-body list-none space-y-3.5 pl-0">
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Enroll through the right channel after address registration if you
                are not on workplace insurance.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Pay premiums on time and treat the card like essential paperwork.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Start at clinics, follow referral norms for hospitals, and fill scripts
                at pharmacies.
              </li>
              <li className="before:mr-3 before:font-bold before:text-rust before:content-['›']">
                Ask the ward office or HR when life changes: new job, new city, new
                visa category.
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
                <TrackedToolLink
                  href="/tools"
                  className={linkClass}
                  sourceSlug="japan-health-insurance"
                >
                  JapanProTips tools hub →
                </TrackedToolLink>
              </li>
            </ul>
            <p className="article-body mt-6 text-muted">
              Also useful:{" "}
              <Link href="/residents/japan-healthcare-costs" className={linkClass}>
                healthcare costs
              </Link>
              ,{" "}
              <Link href="/residents/japan-pension-system" className={linkClass}>
                pension overview
              </Link>
              ,{" "}
              <Link href="/residents/japan-bank-account" className={linkClass}>
                bank accounts and debits
              </Link>
              .
            </p>
          </section>

          <ResidentStarterPath
            sourceSlug="resident-starter-path"
            currentHref="/residents/japan-health-insurance"
          />
          <ResidentsCrosslinks currentHref="/residents/japan-health-insurance" />
        </article>
      </main>
    </>
  );
}
