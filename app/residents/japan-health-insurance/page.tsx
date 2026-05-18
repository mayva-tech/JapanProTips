import type { Metadata } from "next";
import Link from "next/link";
import { ResidentsCrosslinks } from "@/components/guides/ResidentsCrosslinks";

export const metadata: Metadata = {
  title: "National Health Insurance in Japan Explained for Foreigners",
  description:
    "Kokumin Kenko Hoken (NHI) for foreign residents in Japan: who must enroll, city hall steps, premiums, the 30% copay, clinics vs hospitals, prescriptions, emergencies, and a fever visit walkthrough.",
};

const linkClass =
  "font-sans font-bold text-rust hover:text-maroon transition-colors duration-150";

export default function JapanHealthInsurancePage() {
  return (
    <main className="bg-cream min-h-screen font-sans">
      <article className="max-w-3xl mx-auto px-6 pt-12 pb-16">
        <h1
          className="font-display text-dark tracking-wide leading-tight mb-8"
          style={{ fontSize: "clamp(36px, 5.5vw, 56px)" }}
        >
          National Health Insurance in Japan Explained for Foreigners
        </h1>

        <div className="article-body mb-12 max-w-2xl space-y-4">
          <p>
            If you live in Japan mid-term or long-term, you will hear{" "}
            <strong>Kokumin Kenko Hoken</strong> (
            <abbr title="国民健康保険">国民健康保険</abbr>). People often call it{" "}
            <strong>NHI</strong>. It is the public health insurance system for people
            who are not covered by workplace insurance.
          </p>
          <p>
            The rules are exacting. The process is doable. Treat city hall as the
            source of truth for your ward or city, and keep your card in your wallet
            like a second ID.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            What NHI Is
          </h2>
          <div className="article-body space-y-4 max-w-2xl">
            <p>
              NHI is <strong>municipal health insurance</strong>. Your ward or city
              runs enrollment, sends premium notices, and handles most questions about
              payment. It is not optional for most uninsured residents of working
              age.
            </p>
            <p>
              Once enrolled, you pay monthly premiums. When you use covered medical
              care, you show your card and typically owe about{" "}
              <strong>30% of the bill</strong> at the point of care, with prices
              capped by the national fee schedule for insured treatment.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            NHI vs Company Insurance (Shakai Hoken)
          </h2>
          <div className="article-body space-y-6 max-w-2xl">
            <div>
              <h3 className="font-display text-dark text-2xl tracking-wide mb-2">
                Who uses NHI
              </h3>
              <p className="mb-3">
                Typical NHI members include people who do not have employer-based
                coverage, for example:
              </p>
              <ul className="article-body list-none space-y-3.5 pl-0">
                <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                  Students on many programs, unless their school places them in a
                  student health association (confirm locally)
                </li>
                <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                  Freelancers and sole proprietors
                </li>
                <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                  Part-time workers under hour thresholds that exclude shakai hoken
                </li>
                <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                  Spouses and dependents not listed on an employee health plan
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-display text-dark text-2xl tracking-wide mb-2">
                Who uses workplace insurance
              </h3>
              <p>
                <strong>Employees</strong> in eligible roles usually join{" "}
                <strong>Employees&apos; Health Insurance</strong> (one part of shakai
                hoken, the social insurance bundle). Premiums are split with the
                employer. Card and rules feel similar at the clinic, but
                administration sits with the union or insurer, not the ward.
              </p>
              <p className="mt-4">
                If you start a full-time job with shakai hoken, you typically{" "}
                <strong>leave NHI</strong> and switch systems. Your ward office or HR
                can confirm timing so you do not double-pay or have a gap.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            When You Enroll
          </h2>
          <div className="article-body space-y-4 max-w-2xl">
            <p>
              In practice, enrollment follows <strong>resident registration</strong>{" "}
              at your address. After you register where you live, the municipality
              expects you to complete NHI if you are not already covered elsewhere.
            </p>
            <p>
              Do not wait for someone to chase you politely forever. If you delay,
              back premiums and paperwork stress can stack up. Same-week or
              next-week city hall visits after you have an address are normal for
              newcomers who need NHI.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            Ward or City Hall: Process and Documents
          </h2>
          <div className="article-body space-y-4 max-w-2xl">
            <p>
              Go to the <strong>health insurance counter</strong> at the municipal
              office that covers your registered address (ward office in Tokyo
              wards, city hall elsewhere). Hours and English support vary; weekday
              mornings are a safe default.
            </p>
            <p className="mb-3">Bring what you usually need, often including:</p>
            <ul className="article-body list-none space-y-3.5 pl-0">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Residence card
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Passport, in some cases
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Proof of address if staff ask for supporting documents
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Bank account info if you want to set automatic withdrawal for
                premiums (see{" "}
                <Link href="/guides/japan-bank-account" className={linkClass}>
                  bank account setup
                </Link>
                , or{" "}
                <Link
                  href="/residents/open-bank-account-japan"
                  className={linkClass}
                >
                  open a bank account in Japan
                </Link>
                )
              </li>
            </ul>
            <p className="mt-4">
              You will receive an <strong>insurance card</strong> (category: NHI).
              Guard it. A damaged or lost card means a trip back to ask for
              replacement procedures.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            Monthly Payments and Premium Math
          </h2>
          <div className="article-body space-y-4 max-w-2xl">
            <p>
              Premiums are based on the prior year&apos;s <strong>income</strong>,{" "}
              <strong>assets</strong>, and household structure, with municipal caps
              and floors that change over time. Low reported income in your first
              stretch in Japan often means <strong>lower bills at the start</strong>.
              They can rise once tax records catch up.
            </p>
            <p>
              You typically pay monthly or in installments per the slip or direct
              debit. Many people align payment with their Japanese bank account and
              municipal notices. Budget alongside rent and utilities using{" "}
              <Link href="/guides/japan-living-cost" className={linkClass}>
                living cost benchmarks
              </Link>{" "}
              so NHI is not a surprise line item.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            If You Do Not Pay on Time
          </h2>
          <div className="article-body space-y-4 max-w-2xl">
            <p>
              Non-payment is treated seriously. Consequences can include{" "}
              <strong>penalties</strong>, <strong>collection letters</strong>, and in
              difficult cases <strong>loss of coverage or a billed visit</strong>{" "}
              until you sort arrears. If you cannot pay, visit the ward early and ask
              about reduction programs or installment options. Silence is the costly
              option.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            Your Card and the 30% Copay
          </h2>
          <div className="article-body space-y-4 max-w-2xl">
            <p>
              At covered visits, present your <strong>NHI card</strong> at reception
              before you see the doctor. You usually pay your share on the spot:
              about <strong>30%</strong> for standard adult care under the usual
              rules, with different percentages for young children and seniors.
            </p>
            <p>
              There is also a system of <strong>annual caps on high medical costs</strong>{" "}
              so catastrophic years do not bankrupt households. Ask staff or read municipal
              booklets if your bills climb unusually high. Enrollment matters for
              accessing that protection correctly.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            Clinic vs Hospital, Referrals, and Appointments
          </h2>
          <div className="article-body space-y-4 max-w-2xl">
            <p>
              Japan routes most day-to-day care through <strong>clinics</strong> (
              <em>shinryoujo</em>, <em>ika</em> for internal medicine). You book a
              slot or take a numbered ticket depending on the clinic style. First
              visits often include a short intake form and vital signs.
            </p>
            <p>
              <strong>Hospitals</strong> are for specialized work, imaging-heavy
              episodes, or when a clinic refers you. Walking into a big hospital
              without a referral can work in some cases, but you may pay a{" "}
              <strong>higher self-pay portion</strong> as a disincentive to skipping
              primary care. Rules have nuance; the clinic receptionist is your
              practical guide.
            </p>
            <p>
              Appointment culture favors <strong>punctuality</strong>, quiet waiting
              rooms, and brief, efficient visits. Write symptoms on your phone in
              Japanese if that lowers stress. Many clinics see English as a bonus, not
              a guarantee.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            Prescriptions at an Outside Pharmacy
          </h2>
          <div className="article-body space-y-4 max-w-2xl">
            <p>
              Doctors issue a <strong>paper prescription</strong>. You usually fill
              it at a <strong>separate pharmacy</strong>, often near the clinic or
              station. Pharmacists review the medication, explain dosing, and bill
              your insurance share. Keep the bags and receipts if you need tax or
              reimbursement records.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            Emergencies and Dental Coverage
          </h2>
          <div className="article-body space-y-4 max-w-2xl">
            <p>
              True emergencies: use <strong>119</strong> for ambulance or go to an
              ER if you can travel safely. Bring ID, <strong>NHI card</strong>, and
              cash or card for the counter. After hours, options can be thinner; your
              ward may publish after-hours clinics.
            </p>
            <p>
              <strong>Dental</strong> care is partially covered under a separate
              basket of rules. Basic treatment categories use insurance pricing.
              Cosmetic orthodontics and some materials do not. Ask the dentist what
              is covered before you agree to a plan.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            Students, Part-Time Work, Moving, and Job Changes
          </h2>
          <div className="article-body space-y-6 max-w-2xl">
            <div>
              <h3 className="font-display text-dark text-2xl tracking-wide mb-2">
                Students and part-timers
              </h3>
              <p>
                Students may stay on NHI or join an institutional plan. Part-time
                hours and contract type decide whether your employer moves you to
                shakai hoken. If you pick up multiple jobs, eligibility can get
                fiddly. When in doubt, ask the city hall desk after any contract
                change. For work context, see{" "}
                <Link href="/guides/part-time-jobs-japan" className={linkClass}>
                  part-time jobs in Japan for foreigners
                </Link>
                .
              </p>
            </div>
            <div>
              <h3 className="font-display text-dark text-2xl tracking-wide mb-2">
                Moving cities
              </h3>
              <p>
                Moving means <strong>address change procedures</strong> and often a
                new municipal insurer. Complete move-out and move-in registration,
                then re-establish NHI locally unless your coverage type changes. Bring
                old cards and any payment booklets.
              </p>
            </div>
            <div>
              <h3 className="font-display text-dark text-2xl tracking-wide mb-2">
                Job changes
              </h3>
              <p>
                Switching from NHI to shakai hoken (or vice versa) should happen with
                clean handoffs. HR usually explains health insurance on onboarding.
                If you leave a job, ask both the employer and ward about gaps.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            My Number (Individual Number)
          </h2>
          <div className="article-body space-y-4 max-w-2xl">
            <p>
              The <strong>My Number</strong> system ties together taxes, pensions, and
              some benefits. You may link your bank account for automatic debits or
              use the card for online tax filings. NHI notices and municipal portals
              increasingly assume you have the number or are applying for the card.
            </p>
            <p>
              NHI is not &quot;My Number insurance&quot;. They are parallel systems
              that meet at city hall paperwork.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            Common Misunderstandings
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              &quot;I will enroll when I get sick&quot; leaves you exposed to
              full-price episodes and back billing.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Travel insurance does not replace resident public insurance for
              everyday care.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              &quot;30% is tiny&quot; can still feel expensive for imaging or
              multi-day stays; fee schedules help, but budgets still need room.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              English menus at hospitals exist in big cities; comfort still varies by
              ward and specialty.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            How Care Feels, English Support, Tourist vs Resident Pricing
          </h2>
          <div className="article-body space-y-4 max-w-2xl">
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
              <strong>uninsured rates</strong>, which can look shocking compared to
              the insured 30% experience. Residents should carry proof of enrollment
              whenever they seek non-tourist care.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            Walkthrough: Fever Visit at a Local Clinic
          </h2>
          <div className="article-body space-y-4 max-w-2xl">
            <p className="mb-3">Example flow many people follow:</p>
            <ol className="list-decimal pl-6 space-y-3 max-w-2xl">
              <li>
                Search a nearby <strong>internal medicine</strong> or{" "}
                <strong>general clinic</strong> accepting new patients. Confirm hours.
              </li>
              <li>
                Bring <strong>residence card</strong>, <strong>NHI card</strong>,{" "}
                <strong>cash</strong> (many clinics still prefer cash for copays), and
                a <strong>mask</strong>.
              </li>
              <li>
                Check in at reception. State fever and key symptoms. Hand over your
                NHI card first pass.
              </li>
              <li>
                Wait, see the clinician, accept prescribed tests if offered.
              </li>
              <li>
                Pay your <strong>30% share</strong> at the clinic exit desk. Collect
                documentation.
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

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            Bottom Line
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Enroll via your municipality after address registration if you are
              not on workplace insurance.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Pay premiums on time and treat the card like essential paperwork.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Start at clinics, follow referral norms for hospitals, and fill scripts
              at pharmacies.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Ask the ward office when life changes: new job, new city, new visa
              category.
            </li>
          </ul>
        </section>

        <section className="mb-12" aria-labelledby="related-guides-heading">
          <h2
            id="related-guides-heading"
            className="font-display text-dark tracking-wide text-4xl mb-5"
          >
            Related Guides
          </h2>
          <ul className="article-body list-none space-y-3 pl-0 max-w-2xl text-base">
            <li>
              <Link href="/guides/japan-bank-account" className={linkClass}>
                Open and use a Japan bank account (payments and auto-debit) →
              </Link>
            </li>
            <li>
              <Link href="/guides/japan-living-cost" className={linkClass}>
                Monthly cost of living in Japan →
              </Link>
            </li>
            <li>
              <Link href="/guides/part-time-jobs-japan" className={linkClass}>
                Part-time jobs in Japan for foreigners →
              </Link>
            </li>
            <li>
              <Link
                href="/resources/moving-to-japan-checklist"
                className={linkClass}
              >
                Moving and registration checklist for Japan →
              </Link>
            </li>
            <li>
              <Link href="/guides/japan-phone-plans" className={linkClass}>
                Phone plans in Japan →
              </Link>
            </li>
            <li>
              <Link
                href="/residents/open-bank-account-japan"
                className={linkClass}
              >
                Resident guide: open a bank account in Japan →
              </Link>
            </li>
          </ul>
        </section>

        <ResidentsCrosslinks currentHref="/residents/japan-health-insurance" />
      </article>
    </main>
  );
}
