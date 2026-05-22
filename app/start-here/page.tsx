import type { Metadata } from "next";
import { ESimConversionBlock, HotelConversionBlock } from "@/components/conversion";
import { TrackedCtaLink } from "@/components/TrackedCtaLink";
import { ItineraryHubCta } from "@/components/itinerary/ItineraryHubCta";
import { EDITORIAL_COPY } from "@/lib/editorial-copy";

export const metadata: Metadata = {
  title: "Start Here",
  description:
    "Step-by-step Japan trip planning—independent engineer-written checklist: SIM, trains, lodging, payments. Practical order, minimal overwhelm.",
};

const ctaClass =
  "inline-block bg-maroon text-white font-sans font-bold text-base tracking-widest uppercase px-7 py-3.5 hover:bg-rust transition-colors duration-150";

const sectionH2Class =
  "font-display text-dark tracking-wide mb-4";
const sectionH2Style = { fontSize: "clamp(28px, 3.5vw, 40px)" };

const GUIDE_HREFS = {
  sim: "/guides/sim-card-japan",
  transport: "/guides/getting-around-japan",
  stay: "/guides/where-to-stay-japan",
  money: "/guides/money-payments-japan",
} as const;

export default function StartHerePage() {
  return (
    <main className="bg-cream min-h-screen font-sans">
      <article className="mx-auto max-w-4xl min-w-0 px-6 pt-12 pb-16">
        <header>
          <p className="font-display text-rust text-2xl tracking-widest mb-2">
            TRIP PLANNING ///
          </p>
          <h1 className="guide-page-title">
            START HERE
            <br />
            <span className="text-rust">PLAN YOUR TRIP TO JAPAN</span>
          </h1>
        </header>

        <div className="article-body mb-10 max-w-2xl space-y-4">
          <p>
            This is the simplest way to plan your trip without getting
            overwhelmed.
          </p>
          <p className="font-sans text-muted text-sm font-bold tracking-widest uppercase pt-1">
            {EDITORIAL_COPY.trustLine}
          </p>
        </div>

        <div className="border-t-2 border-dark mb-10" />

        <section className="mb-12">
          <h2 className={sectionH2Class} style={sectionH2Style}>
            Follow this order
          </h2>
          <p className="article-body mb-10 max-w-2xl">
            {`Don't try to plan everything at once. Do this step by step:`}
          </p>

          <ol className="list-none space-y-0 pl-0">
            <li className="border-t border-tan pt-10 first:border-t-0 first:pt-0">
              <h3 className="font-sans font-bold text-dark text-lg mb-3">
                1. SIM / Internet
              </h3>
              <p className="article-body mb-6 max-w-2xl">
                Your phone is your map, translator, and train guide. If this
                doesn&apos;t work, everything becomes harder. If you skip this,
                your trip becomes harder immediately.
              </p>
              <ESimConversionBlock className="max-w-xl" />
            </li>

            <li className="border-t border-tan pt-10">
              <h3 className="font-sans font-bold text-dark text-lg mb-3">
                {`2. Understand How You'll Get Around`}
              </h3>
              <p className="article-body mb-6 max-w-2xl">
                Japan&apos;s train system is efficient, but confusing at first.
                You don&apos;t need to understand everything, just the basics.
              </p>
              <TrackedCtaLink href={GUIDE_HREFS.transport} label="transport" className={ctaClass}>
                How to get around Japan (trains & apps) →
              </TrackedCtaLink>
              <TrackedCtaLink
                href="/guides/japan-trains"
                label="transport"
                className="block font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150 mt-4"
              >
                How to use trains in Japan →
              </TrackedCtaLink>
              <TrackedCtaLink
                href="/guides/japan-airport-to-city"
                label="transport"
                className="block font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150 mt-4"
              >
                Airport to hotel in Japan (Narita, Haneda, Kansai) →
              </TrackedCtaLink>
            </li>

            <li className="border-t border-tan pt-10">
              <h3 className="font-sans font-bold text-dark text-lg mb-3">
                3. Decide where you&apos;re staying
              </h3>
              <p className="article-body mb-6 max-w-2xl">
                Location matters more than the hotel itself. Being near the
                right station will save you time and stress.
              </p>
              <HotelConversionBlock className="max-w-xl" />
              <TrackedCtaLink href={GUIDE_HREFS.stay} label="hotel" className={`${ctaClass} mt-6 inline-block`}>
                Where to stay in Japan (Tokyo, Osaka, Kyoto) →
              </TrackedCtaLink>
            </li>

            <li className="border-t border-tan pt-10">
              <h3 className="font-sans font-bold text-dark text-lg mb-3">
                4. Money, Cards, and Cash in Japan
              </h3>
              <p className="article-body mb-6 max-w-2xl">
                Cash vs card confuses many first-time visitors, but it gets
                easy fast. Use a simple mix of card, cash, and IC card so you
                never get stuck.
              </p>
              <TrackedCtaLink href={GUIDE_HREFS.money} label="budget" className={ctaClass}>
                Money, cards & cash in Japan →
              </TrackedCtaLink>
              <TrackedCtaLink
                href="/guides/japan-itinerary"
                label="transport"
                className="block font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150 mt-4"
              >
                Japan itinerary for first-time visitors →
              </TrackedCtaLink>
            </li>
          </ol>
        </section>

        <section className="mb-12">
          <ItineraryHubCta
            sourcePage="/start-here"
            ctaPosition="after-planning-steps"
          />
        </section>

        <div className="border-t border-tan mb-12" />

        <section className="mb-12">
          <div className="bg-dark px-8 py-10">
            <h2
              className="font-display text-cream tracking-wide mb-5"
              style={sectionH2Style}
            >
              Most people overcomplicate this
            </h2>
            <p className="article-body-sm text-[#aab4be] max-w-xl">
              You don&apos;t need 10 tabs, 5 apps, and a perfect itinerary. Get
              the basics right first, then adjust as you go.
            </p>
          </div>
        </section>

        <div className="border-t border-tan" />
      </article>
    </main>
  );
}
