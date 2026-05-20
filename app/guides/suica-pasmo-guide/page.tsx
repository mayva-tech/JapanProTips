import type { Metadata } from "next";
import Link from "next/link";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";
import { NextStepGuides } from "@/components/NextStepGuides";

export const metadata: Metadata = {
  title:
    "Suica and PASMO Explained (2026 Guide for Tourists)",
  description:
    "What Suica and PASMO are, whether you still need a plastic card in 2026, mobile Suica on iPhone, Android limits, where IC works, and when you can skip it.",
};

export default function SuicaPasmoGuidePage() {
  return (
    <GuideArticleShell
      title={
        <h1
          className="guide-page-title"
        >
          Suica and PASMO Explained (2026 Guide for Tourists)
        </h1>
      }
      intro={
        <div className="article-body max-w-2xl space-y-4">
          <p>
            Suica and PASMO get treated like a personality test online. In
            practice they are the same idea: stored money on a chip you tap on a
            reader. Trains, buses, many shops. Same rhythm, different brand.
          </p>
          <p>
            Most confusion is not “which logo wins.” It is whether you need
            plastic, whether your phone can hold a digital pass, and what to do
            when machines or stock act weird.
          </p>
          <p>
            <Link
              href="/guides/suica-vs-pasmo"
              className="font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
            >
              Suica vs PASMO: quick pick guide →
            </Link>
          </p>
        </div>
      }
      beforeComparison={
        <>
        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            What is a Suica or PASMO Card
          </h2>
          <div className="article-body space-y-4 max-w-2xl">
            <p>
              Both are IC transit cards issued under Japan&apos;s nationwide IC
              standard. You charge yen onto the card (or digital wallet pass),
              then tap in and out at train gates. You also tap at many convenience
              store registers and vending machines.
            </p>
            <p>
              Suica is the JR East flavored name. PASMO is the Tokyo region private
              metro flavor. For a tourist moving around Tokyo and typical day
              trips, the difference barely matters. Pick what you can actually
              obtain and top up.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            Do You Still Need One in 2026
          </h2>
          <div className="article-body space-y-4 max-w-2xl">
            <p>
              You still need a tap that spends stored value or a compatible
              wallet pass. You do not automatically need a green piece of plastic.
            </p>
            <p>
              Physical anonymous Suica-style cards have had stretches where new
              sales pause or stock feels tight. Policies and inventory change. Treat
              plastic as nice if you can buy it, not as the only path.
            </p>
            <p>
              The practical 2026 answer for many visitors: start with mobile IC on
              iPhone if your device and region wallet support it. Otherwise buy a
              rechargeable card at a machine or counter when you arrive, or lean
              on credit card tap and paper tickets where they work (more below).
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            Mobile Suica (iPhone Users)
          </h2>
          <div className="article-body space-y-4 max-w-2xl">
            <p>
              On supported iPhones, you add Suica or PASMO in Apple Wallet like any
              other transit card. You fund it from a card in Wallet, then tap
              gates and many shop readers with your phone.
            </p>
            <p>
              Setup path is boring on purpose: open Wallet, add transit card,
              follow the issuer flow, load balance, test on a gate when you are not
              in a rush.
            </p>
            <p>
              Benefits: no hunting for a vending machine to top up plastic, harder
              to lose than a card, one less thing in your pocket. Downside: if your
              phone dies, you are back to cash or another payment path until it
              lives again.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            Android Situation
          </h2>
          <div className="article-body space-y-4 max-w-2xl">
            <p>
              Android support depends on device model, region Google Pay setup, and
              what the wallet actually offers for Japan transit. Some travelers get
              a clean mobile IC flow. Others hit “not available in your region”
              style walls.
            </p>
            <p>
              If mobile IC is messy on your Android, default to plastic IC or a
              strong credit tap strategy plus paper tickets on JR legs. Fighting
              your phone for a week is not a holiday activity.
            </p>
          </div>
        </section>
        </>
      }
      afterComparison={
        <>
        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            Where You Can Use It
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              <span className="font-sans font-bold text-dark">Trains and metros:</span>{" "}
              tap in and out inside the IC network. Long JR legs sometimes need
              reserved seats or an out-of-wallet charge; read the seat ticket rules
              when you buy extras.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              <span className="font-sans font-bold text-dark">Convenience stores:</span>{" "}
              tap at Lawson, 7-Eleven, FamilyMart style chains in most city cases.
              If a small shop looks old-school, have cash ready.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              <span className="font-sans font-bold text-dark">Vending machines:</span>{" "}
              many take IC. Some are cash only. Glance at the payment icons before
              you commit thirst.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            When You Do NOT Need It
          </h2>
          <div className="article-body space-y-4 max-w-2xl">
            <p>
              Very short Tokyo stays where you only use airport limousine, taxi,
              and hotel shuttle can work without IC. You pay more in money and less
              in setup.
            </p>
            <p>
              If you already have reliable credit card tap on the exact trains you
              plan to ride, and you accept slower checkout at small cash shops, you
              can treat IC as optional. That lifestyle is narrower than people
              think, but it exists.
            </p>
            <p>
              Clear rule: if you plan to ride metro daily, eat at konbini, and move
              like a normal visitor, you want a tap solution. IC is the default tap
              solution in Japan.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            Alternatives
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              <span className="font-sans font-bold text-dark">Paper tickets:</span>{" "}
              fine for a single airport run or one Shinkansen leg. Annoying as a
              daily lifestyle because you queue more and switch modes often.
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              <span className="font-sans font-bold text-dark">Credit card tap:</span>{" "}
              growing on urban gates and in chains. Coverage is not universal.
              Keep IC or cash as backup even if your card marketing says “global.”
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            Final Recommendation
          </h2>
          <div className="article-body space-y-4 max-w-2xl">
            <p>
              If you have a supported iPhone: set up mobile Suica or PASMO before
              you land, load a sensible balance, tap the first gate calm and
              sober.
            </p>
            <p>
              If you do not: buy a rechargeable IC card early in the trip, top up
              in round thousands at machines, and stop treating the card like a
              souvenir. It is a tool.
            </p>
            <p>
              Stop optimizing the logo. Optimize “tap works, balance exists, backup
              cash in pocket.”
            </p>
          </div>
        </section>

        <section className="mb-12 max-w-2xl border-t border-tan pt-10">
          <h2 className="font-display text-dark tracking-wide text-3xl mb-4">
            Related guides
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0">
            <li>
              <Link
                href="/guides/japan-transportation"
                className="font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
              >
                Japan transportation hub →
              </Link>
            </li>
            <li>
              <Link
                href="/guides/japan-airport-first-steps"
                className="font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
              >
                First 60 minutes at Narita or Haneda →
              </Link>
            </li>
          </ul>
        </section>

        <NextStepGuides guideId="suica-pasmo-guide" />

        <GuideEndCta
          parentHref="/guides/japan-trains"
          parentLabel="How to use trains in Japan →"
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
