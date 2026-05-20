import type { Metadata } from "next";
import Link from "next/link";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";

export const metadata: Metadata = {
  title:
    "Monthly Cost of Living in Japan (Real Numbers)",
  description:
    "Rent, food, transport, and utilities in yen for life in Japan, plus realistic monthly totals for Tokyo and how the bill changes outside the capital.",
};

export default function JapanLivingCostGuidePage() {
  return (
    <GuideArticleShell
      showHotelConversion={false}
      title={
        <h1
          className="guide-page-title"
        >
          Monthly Cost of Living in Japan (Real Numbers)
        </h1>
      }
      intro={
        <div className="article-body max-w-2xl space-y-4">
          <p>
            Trip budgets and resident budgets are different animals. This page is
            monthly math for a single adult paying their own rent in Japan, in yen
            first. It is not a visa bank-balance memo and it is not a shopping
            spree allowance.
          </p>
          <p>
            Tokyo anchors the high end. Regional cities and inaka drop hardest on
            rent first, then food variety, not always on heating bills.
          </p>
        </div>
      }
      beforeComparison={
        <>
        <section className="mb-12 max-w-2xl border border-[#d4c9b0] bg-white px-6 py-5">
          <p className="article-body-sm mb-3">
            Visiting instead of moving? Use the trip-focused breakdown.
          </p>
          <Link
            href="/guides/japan-budget-breakdown"
            className="font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
          >
            Japan trip cost in 2026 (per day) →
          </Link>
        </section>

        <section className="mb-12 max-w-2xl">
          <h2 className="editorial-heading mb-4">
            Rent
          </h2>
          <div className="article-body space-y-4">
            <p>
              Rent is the line item that drowns everything else in Tokyo and
              Osaka&apos;s popular wards. A clean 1R or 1K within a sane commute of
              a major hub often lands roughly{" "}
              <span className="font-sans font-bold text-dark">
                ¥80,000 to ¥140,000
              </span>{" "}
              before furniture, depending on building age, station distance, and
              whether you pay key money upfront to buy the monthly down.
            </p>
            <p>
              Share houses and rooms farther out can sit closer to{" "}
              <span className="font-sans font-bold text-dark">¥50,000 to ¥75,000</span>{" "}
              if you accept rules, noise, and smaller private space. Regional
              cities often shave{" "}
              <span className="font-sans font-bold text-dark">¥15,000 to ¥40,000</span>{" "}
              off the same mental floor as Tokyo for comparable comfort.
            </p>
            <p>
              <Link
                href="/residents/renting-apartment-japan"
                className="font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
              >
                Renting an apartment in Japan (guide) →
              </Link>
            </p>
          </div>
        </section>

        <section className="mb-12 max-w-2xl">
          <h2 className="editorial-heading mb-4">
            Food
          </h2>
          <div className="article-body space-y-4">
            <p>
              Supermarkets after 7 p.m., frozen vegetables, and rice at home keep
              the floor low. Eating out at chains even a few times per week moves
              the needle fast. See the{" "}
              <Link
                href="/residents/japan-grocery-shopping-guide"
                className="font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
              >
                grocery shopping guide
              </Link>{" "}
              for chains, discounts, and weekly budgets.
            </p>
            <ul className="article-body list-none space-y-3.5 pl-0">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                <span className="font-sans font-bold text-dark">Frugal cook-at-home:</span>{" "}
                about <span className="font-sans font-bold text-dark">¥35,000 to ¥50,000</span>{" "}
                per month for one person who actually meal preps.
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                <span className="font-sans font-bold text-dark">Normal mix:</span>{" "}
                konbini breakfast, office lunch, cheap dinner out a few times: about{" "}
                <span className="font-sans font-bold text-dark">¥55,000 to ¥80,000</span>.
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                <span className="font-sans font-bold text-dark">Social life heavy:</span>{" "}
                izakaya, coffee, delivery:{" "}
                <span className="font-sans font-bold text-dark">¥90,000+</span> is easy
                without feeling extravagant.
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-12 max-w-2xl">
          <h2 className="editorial-heading mb-4">
            Transport
          </h2>
          <div className="article-body space-y-4">
            <p>
              Commuters usually buy a{" "}
              <span className="font-sans font-bold text-dark">Teiki pass</span> for
              fixed home-to-work legs. Inside greater Tokyo that is often roughly{" "}
              <span className="font-sans font-bold text-dark">¥10,000 to ¥25,000</span>{" "}
              per month depending on distance. Weekends off that corridor still spend
              IC money on social trips.
            </p>
            <p>
              Bicycles and walking save cash until August humidity argues back. Car
              ownership adds parking, shaken, and insurance that breaks this page&apos;s
              scope fast.
            </p>
            <p>
              <Link
                href="/guides/getting-around-japan"
                className="font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
              >
                Getting around Japan (guide) →
              </Link>
            </p>
          </div>
        </section>
        </>
      }
      afterComparison={
        <>
        <section className="mb-12 max-w-2xl">
          <h2 className="editorial-heading mb-4">
            Utilities
          </h2>
          <div className="article-body space-y-4">
            <p>
              For a small apartment, think in blocks:{" "}
              <span className="font-sans font-bold text-dark">electric</span> swings
              with summer AC and winter heating,{" "}
              <span className="font-sans font-bold text-dark">gas</span> if you cook
              on stove,{" "}
              <span className="font-sans font-bold text-dark">water</span> billed on
              a slower cycle, then{" "}
              <span className="font-sans font-bold text-dark">internet</span> and{" "}
              <span className="font-sans font-bold text-dark">mobile</span>.
            </p>
            <ul className="article-body list-none space-y-3.5 pl-0">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                <span className="font-sans font-bold text-dark">Electric + gas + water:</span>{" "}
                often about <span className="font-sans font-bold text-dark">¥12,000 to ¥22,000</span>{" "}
                combined for one person in a 1R or 1K across normal seasons, higher
                in a cold winter with kerosene or poor insulation.
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                <span className="font-sans font-bold text-dark">Home internet:</span>{" "}
                often about <span className="font-sans font-bold text-dark">¥4,000 to ¥6,500</span>{" "}
                on typical fiber promos, higher after the intro rate expires.
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                <span className="font-sans font-bold text-dark">Mobile phone:</span>{" "}
                often about <span className="font-sans font-bold text-dark">¥3,000 to ¥8,000</span>{" "}
                depending on MVNO versus carrier.
              </li>
            </ul>
            <p>
              <Link
                href="/residents/pay-bills-japan"
                className="font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
              >
                Pay bills in Japan (resident guide) →
              </Link>
            </p>
          </div>
        </section>

        <section className="mb-12 max-w-2xl">
          <h2 className="editorial-heading mb-4">
            Real monthly estimate
          </h2>
          <p className="article-body mb-6">
            Below adds rent, food, commuter-class transport, utilities block
            (electric, gas, water, internet, phone), and a small{" "}
            <span className="font-sans font-bold text-dark">misc</span> bucket for
            drugstore, haircuts, and replacement socks. It still excludes tuition,
            debt service, travel abroad, and dependents.
          </p>
          <ul className="font-serif text-muted list-none pl-0 space-y-5">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              <span className="font-sans font-bold text-dark">Tokyo, tight but honest:</span>{" "}
              rent near <span className="font-sans font-bold text-dark">¥65,000</span>, food{" "}
              <span className="font-sans font-bold text-dark">¥45,000</span>, transport{" "}
              <span className="font-sans font-bold text-dark">¥12,000</span>, utilities
              bundle <span className="font-sans font-bold text-dark">¥22,000</span>, misc{" "}
              <span className="font-sans font-bold text-dark">¥15,000</span>.{" "}
              <span className="font-sans font-bold text-dark">Rough total about ¥159,000.</span>
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              <span className="font-sans font-bold text-dark">Tokyo, common solo band:</span>{" "}
              rent <span className="font-sans font-bold text-dark">¥95,000</span>, food{" "}
              <span className="font-sans font-bold text-dark">¥65,000</span>, transport{" "}
              <span className="font-sans font-bold text-dark">¥18,000</span>, utilities
              bundle <span className="font-sans font-bold text-dark">¥26,000</span>, misc{" "}
              <span className="font-sans font-bold text-dark">¥25,000</span>.{" "}
              <span className="font-sans font-bold text-dark">Rough total about ¥229,000.</span>
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              <span className="font-sans font-bold text-dark">Regional city, same lifestyle discipline:</span>{" "}
              rent often <span className="font-sans font-bold text-dark">¥15,000 to ¥35,000</span>{" "}
              lower than Tokyo for similar square meters, other lines similar. A
              realistic all-in band for many singles is{" "}
              <span className="font-sans font-bold text-dark">¥160,000 to ¥210,000</span>{" "}
              when you still eat out sometimes and run AC.
            </li>
          </ul>
          <p className="article-body mt-6">
            National health and pension are not optional long term. When you are
            employed, withheld amounts change the take-home you feel. Budget from
            gross and you will lie to yourself.
          </p>
        </section>

        <section className="mb-12 max-w-2xl border border-[#d4c9b0] bg-white px-6 py-5">
          <p className="article-body-sm">
            Bank account, phone plan, and apartment search all touch the same
            monthly spreadsheet.
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
