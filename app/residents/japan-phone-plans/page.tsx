import type { Metadata } from "next";
import Link from "next/link";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";

export const metadata: Metadata = {
  title:
    "Best Phone Plans in Japan (Cheap vs Big Carriers)",
  description:
    "Rakuten Mobile, UQ mobile, and IIJmio compared: monthly cost bands, contract vs prepaid, when cheap MVNOs win, and when to pay the big three.",
};

export default function JapanPhonePlansGuidePage() {
  return (
    <GuideArticleShell
      showHotelConversion={false}
      title={
        <h1
          className="guide-page-title"
        >
          Best Phone Plans in Japan (Cheap vs Big Carriers)
        </h1>
      }
      intro={
        <div className="article-body max-w-2xl space-y-4">
          <p>
            This page is for people who live in Japan or stay long enough to care
            about a monthly bill, not airport tourist SIMs. The split is simple:
            full-price docomo, SoftBank, and au retail versus cheaper sub-brands
            and MVNOs that rent the same towers.
          </p>
          <p>
            Promotions change every season. Use the numbers below as order-of-magnitude
            framing, then confirm on each carrier site before you sign.
          </p>
        </div>
      }
      beforeComparison={
        <>
        <section className="mb-12 max-w-2xl border border-[#d4c9b0] bg-white px-6 py-5">
          <p className="article-body-sm mb-3">
            Related on this site:
          </p>
          <ul className="font-serif text-muted list-none pl-0 space-y-2 text-base">
            <li>
              <Link
                href="/residents/sim-card-japan-residents"
                className="font-sans font-bold text-rust hover:text-maroon transition-colors duration-150"
              >
                Long-term SIM overview for residents →
              </Link>
            </li>
            <li>
              <Link
                href="/guides/sim-card-japan"
                className="font-sans font-bold text-rust hover:text-maroon transition-colors duration-150"
              >
                Short-trip SIM and eSIM for visitors →
              </Link>
            </li>
          </ul>
        </section>

        <section className="mb-12 max-w-2xl">
          <h2 className="editorial-heading mb-4">
            Rakuten Mobile
          </h2>
          <div className="article-body space-y-4">
            <p>
              Rakuten Mobile built its own network and prices aggressively. Plans
              often look like the cheapest way to carry a lot of data, especially if
              you bundle other Rakuten services.
            </p>
            <p>
              The tradeoff is support and edge cases. App and online flows matter
              more than walking into a neighborhood docomo shop. Rural and indoor
              pockets can still feel weaker than legacy big-three coverage in some
              regions, so ask friends in your actual neighborhood before you port.
            </p>
          </div>
        </section>

        <section className="mb-12 max-w-2xl">
          <h2 className="editorial-heading mb-4">
            UQ mobile
          </h2>
          <div className="article-body space-y-4">
            <p>
              UQ mobile sits in KDDI&apos;s family next to au. Think mid-tier
              pricing with au-class radio in most places, plus retail presence and
              clearer upgrade paths than a bare-bones MVNO.
            </p>
            <p>
              You usually pay more than IIJmio-style MVNOs and less than full au
              retail with every bolt-on. Good default when you want fewer coverage
              surprises and can accept a normal Japanese contract rhythm.
            </p>
          </div>
        </section>

        <section className="mb-12 max-w-2xl">
          <h2 className="editorial-heading mb-4">
            IIJmio
          </h2>
          <div className="article-body space-y-4">
            <p>
              IIJmio is a long-running MVNO brand with modest monthly prices and
              multiple plan shapes. Many products let you pick docomo-line or
              au-line routing depending on the SKU, which matters if you already
              know one network behaves better in your building.
            </p>
            <p>
              Expect thinner hand-holding than a carrier shop, clear data caps on
              cheaper tiers, and sometimes rollover or family-style options that
              reward light users.
            </p>
          </div>
        </section>
        </>
      }
      afterComparison={
        <>
        <section className="mb-12 max-w-2xl">
          <h2 className="editorial-heading mb-4">
            Cost comparison
          </h2>
          <p className="article-body mb-4">
            Single smartphone line, before handset installment and campaign
            discounts. Rounded to how people compare plans in conversation, not
            accounting tax line by line.
          </p>
          <ul className="article-body list-none space-y-3.5 pl-0">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              <span className="font-sans font-bold text-dark">Big three retail</span>{" "}
              (docomo, SoftBank, au flagship counters): often roughly ¥7,000 to
              ¥11,000 per month for a typical data bucket once discounts expire,
              higher if you add insurance and premium options.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              <span className="font-sans font-bold text-dark">UQ mobile:</span> often
              roughly ¥4,000 to ¥8,000 depending on gigabytes and family bundles,
              usually under flagship au if you skip the top tier.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              <span className="font-sans font-bold text-dark">Rakuten Mobile:</span>{" "}
              often lands at or below MVNO peers for high data, with frequent
              campaign pricing that can look almost too cheap on paper. Read what
              happens after the intro months.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              <span className="font-sans font-bold text-dark">IIJmio:</span> often
              roughly ¥2,000 to ¥5,000 for everyday data sizes on MVNO economics,
              with the cheapest tiers for people who live on Wi-Fi.
            </li>
          </ul>
          <p className="article-body mt-6">
            If two quotes differ by a few hundred yen, ignore that noise. Compare
            cancellation rules, handset lock-in, and whether the price explodes
            after month 12.
          </p>
        </section>

        <section className="mb-12 max-w-2xl">
          <h2 className="editorial-heading mb-4">
            Contract vs prepaid
          </h2>
          <div className="article-body space-y-4">
            <p>
              <span className="font-sans font-bold text-dark">Postpaid contract</span>{" "}
              is the default for residents: MNP porting, billed monthly, credit
              check or payment method on file. Carriers hide the real price behind
              12- or 24-month rebates. Breaking early can trigger{" "}
              <span className="font-sans font-bold text-dark">cancellation math</span>{" "}
              that eats the discount you thought you saved.
            </p>
            <p>
              <span className="font-sans font-bold text-dark">Prepaid</span> fits
              short stays, students testing the water, or anyone who wants a hard
              spending cap. Data per yen is worse, but you are not fighting a
              two-year residual. Tourist prepaid products sit in the{" "}
              <Link
                href="/guides/sim-card-japan"
                className="font-sans font-bold text-rust hover:text-maroon transition-colors duration-150"
              >
                visitor SIM guide
              </Link>
              , not here.
            </p>
            <p>
              Many MVNOs behave like month-to-month postpaid with no long handset
              subsidy. That is closer to “no lock contract” than true prepaid, but
              the mental model is the same: you can leave if the network annoys you.
            </p>
          </div>
        </section>

        <section className="mb-12 max-w-2xl">
          <h2 className="editorial-heading mb-4">
            Recommendation
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              <span className="font-sans font-bold text-dark">Minimize monthly cost</span>{" "}
              and you tolerate app-first support: start with{" "}
              <span className="font-sans font-bold text-dark">Rakuten Mobile</span>{" "}
              if coverage checks out where you sleep and work.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              <span className="font-sans font-bold text-dark">Balance price and au-style reliability:</span>{" "}
              <span className="font-sans font-bold text-dark">UQ mobile</span> is
              the boring sensible pick for many households.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              <span className="font-sans font-bold text-dark">Light data, classic MVNO, pick your backbone:</span>{" "}
              <span className="font-sans font-bold text-dark">IIJmio</span> stays
              easy to recommend when you want low gigabytes and predictable bills.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              <span className="font-sans font-bold text-dark">Need maximum retail hand-holding</span>{" "}
              or corporate family bundles: pay the{" "}
              <span className="font-sans font-bold text-dark">big three flagship</span>{" "}
              counter and stop optimizing. That is valid if your time is worth more
              than ¥2,000 a month.
            </li>
          </ul>
        </section>

        <section className="mb-12 max-w-2xl border border-[#d4c9b0] bg-white px-6 py-5">
          <p className="article-body-sm">
            After you land on a carrier, bank auto-debit and address paperwork still
            need to match what you told immigration. The residents hub collects
            those guides in one place.
          </p>
          <p className="mt-4">
            <Link
              href="/residents"
              className="font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
            >
              Residents hub →
            </Link>
          </p>
        </section>

        <GuideEndCta
          parentHref="/residents"
          parentLabel="Residents hub →"
        />

        <div className="border-t border-tan pt-8 mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
          >
            JapanProTips homepage <span className="text-lg">‹‹‹</span>
          </Link>
        </div>
        </>
      }
    />
  );
}
