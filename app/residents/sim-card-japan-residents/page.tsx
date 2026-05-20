import type { Metadata } from "next";
import Link from "next/link";
import { ServiceBlock } from "@/components/ServiceBlock";
import { ResidentsCrosslinks } from "@/components/guides/ResidentsCrosslinks";

export const metadata: Metadata = {
  title:
    "Best SIM Card for Residents in Japan (Long-Term Options)",
  description:
    "SIM and mobile plans for people living in Japan: carriers vs MVNO, contracts, data, cancellation, and why tourist SIM advice does not apply long term.",
};

export default function SimCardJapanResidentsPage() {
  return (
    <main className="bg-cream min-h-screen font-sans">
      <article className="max-w-3xl mx-auto px-6 pt-12 pb-16">
        <h1
          className="guide-page-title"
        >
          Best SIM Card for Residents in Japan (Long-Term Options)
        </h1>

        <div className="article-body mb-12 max-w-2xl space-y-4">
          <p>
            Tourist SIM advice does not apply to residents. Short-trip products
            optimize for easy pickup and fixed days. Living here means contracts,
            porting, and monthly bills.
          </p>
          <p>
            For trains and konbini taps, you still carry an{" "}
            <Link
              href="/residents/ic-card-japan"
              className="font-sans font-bold text-rust hover:text-maroon transition-colors duration-150"
            >
              IC card
            </Link>{" "}
            separate from your phone plan.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            Quick Answer
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Short-term → prepaid SIM
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Long-term → local carrier or MVNO
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            Options
          </h2>
          <div className="article-body space-y-6 max-w-2xl">
            <div>
              <h3 className="font-display text-dark text-2xl tracking-wide mb-2">
                Major carriers (Docomo, SoftBank, AU)
              </h3>
              <p>
                Full retail shops, bundled home internet, family plans, and the
                highest monthly cost. Best when you want one bill, wide retail
                support, and fewer edge-case outages.
              </p>
            </div>
            <div>
              <h3 className="font-display text-dark text-2xl tracking-wide mb-2">
                MVNO (cheap alternatives)
              </h3>
              <p>
                Rent network capacity from the big three. Lower price, thinner
                support, sometimes deprioritized data at busy hours. Read the fine
                print on speed caps.
              </p>
            </div>
            <div>
              <h3 className="font-display text-dark text-2xl tracking-wide mb-2">
                eSIM options
              </h3>
              <p>
                Available from carriers and some MVNOs. Useful if you change
                phones often or want a second line. Not every plan offers eSIM on
                every device tier, so confirm before you sign.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            What Actually Matters
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Contract length
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Data limits
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Cancellation fees
            </li>
          </ul>
        </section>

        <div className="mb-12 max-w-2xl">
          <p className="article-body-sm mb-4">
            Porting or canceling gets harder after a contract starts, so read
            terms before you sign.
          </p>
          <ServiceBlock
            title="Looking for a long-term mobile plan?"
            description="Rakuten Mobile, UQ mobile, IIJmio, and how cheap stacks up against the big three."
            linkText="Japan phone plans (cheap vs carriers) →"
            href="/residents/japan-phone-plans"
          />
        </div>

        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            Common Mistakes
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Choosing cheap but unreliable plans
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Not checking contract terms
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Ignoring cancellation fees
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            Reality Check
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Japan mobile plans are confusing
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Cheaper ≠ better
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            Bottom Line
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              MVNO for budget
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Major carriers for stability
            </li>
          </ul>
        </section>

        <ResidentsCrosslinks currentHref="/residents/sim-card-japan-residents" />
      </article>
    </main>
  );
}
