import type { Metadata } from "next";
import Link from "next/link";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";
import { DownloadChecklistBox } from "@/components/DownloadChecklistBox";
import { NextStepGuides } from "@/components/NextStepGuides";
import { RecommendedServicesBox } from "@/components/RecommendedServicesBox";
import { OperationalWarning, WhatPeopleMiss } from "@/components/editorial/field-notes";

export const metadata: Metadata = {
  title:
    "How to Use Trains in Japan (Simple Guide for First-Time Visitors)",
  description:
    "Use Japan trains without stress: IC cards, JR vs metro, Google Maps, local vs express, Shinkansen basics, and mistakes first-time visitors should skip.",
};

export default function JapanTrainsPage() {
  return (
    <GuideArticleShell
      title={
        <h1
          className="guide-page-title"
        >
          How to Use Trains in Japan Without Getting Lost
        </h1>
      }
      intro={
        <div className="article-body space-y-4 max-w-2xl">
          <p>Japan trains look confusing at first.</p>
          <p>You do not need to understand the entire system.</p>
          <p>You only need a simple system that works every day.</p>
          <Link
            href="/guides/japan-airport-to-city"
            className="inline-block font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150 pt-2"
          >
            From airport to hotel →
          </Link>
        </div>
      }
      beforeComparison={
        <>
          <section className="mb-12">
            <h2 className="editorial-heading mb-4">
              Quick Answer
            </h2>
            <ul className="article-body list-none space-y-3.5 pl-0 mb-6 max-w-2xl">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Use Google Maps or NAVITIME
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Use an IC card
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Follow line name, direction, platform, and transfers
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                If unsure, ask station staff
              </li>
            </ul>
            <OperationalWarning noteId="japan-trains-quick-answer">
              <p>
                Your app shows a line name, time, and platform. If any one of
                those three disagrees with the yellow departure board, trust the
                board first, then ask staff. Wrong platform is the fastest way to
                board the right line going the wrong direction.
              </p>
            </OperationalWarning>
            <Link
              href="/guides/sim-card-japan"
              className="inline-block bg-maroon text-white font-sans font-bold text-base tracking-widest uppercase px-7 py-3.5 hover:bg-rust transition-colors duration-150"
            >
              Get your SIM sorted →
            </Link>
          </section>

          <section className="mb-12">
            <h2 className="editorial-heading mb-4">
              What You Actually Need to Know
            </h2>
            <div className="article-body space-y-4 max-w-2xl">
              <p>
                <strong className="font-sans font-bold text-dark">
                  Train line name:
                </strong>{" "}
                Confirm the exact line shown in your app.
              </p>
              <p>
                <strong className="font-sans font-bold text-dark">
                  Destination direction:
                </strong>{" "}
                Check where the train is heading, not just the line color.
              </p>
              <p>
                <strong className="font-sans font-bold text-dark">
                  Platform number:
                </strong>{" "}
                Match the platform in the app with station signs.
              </p>
              <p>
                <strong className="font-sans font-bold text-dark">
                  Local vs Rapid vs Express:
                </strong>{" "}
                Pick the train type shown in your route.
              </p>
              <p>
                <strong className="font-sans font-bold text-dark">
                  Transfer stations:
                </strong>{" "}
                Know where to switch before you board.
              </p>
            </div>
          </section>

          <RecommendedServicesBox serviceId="japan-trains" />

          <section className="mb-12">
            <h2 className="editorial-heading mb-4">
              Local, Rapid, and Express
            </h2>
            <ul className="article-body list-none space-y-3.5 pl-0 mb-6 max-w-2xl">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Local stops at every station
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Rapid skips some stations
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Express skips more stations
              </li>
            </ul>
            <p className="font-sans font-bold text-dark text-lg max-w-2xl">
              If you are unsure, take Local.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="editorial-heading mb-4">
              JR vs Metro
            </h2>
            <div className="article-body space-y-4 max-w-2xl">
              <p>JR is the major rail network.</p>
              <p>Metro or Subway is the city train system.</p>
              <p>Private railways also exist and are common.</p>
              <p className="font-sans font-bold text-dark">
                You do not need to memorize the companies. Just follow the route
                shown in your app.
              </p>
            </div>
          </section>

          <WhatPeopleMiss noteId="japan-trains-jr-metro">
            <p>
              JR, metro, and private lines can share a station but use different
              ticket logic. Missing that split is how people tap through the wrong
              gate and then assume the IC card is broken.
            </p>
          </WhatPeopleMiss>
        </>
      }
      afterComparison={
        <>
          <section className="mb-12">
            <h2 className="editorial-heading mb-4">
              How to Ride a Train Step by Step
            </h2>
            <ol className="article-body list-decimal space-y-3 pl-6 max-w-2xl">
              <li>Search destination in Google Maps or NAVITIME</li>
              <li>Check line name</li>
              <li>Check platform number</li>
              <li>Tap in using IC card</li>
              <li>Board the correct train</li>
              <li>Watch the station names</li>
              <li>Transfer if needed</li>
              <li>Tap out</li>
            </ol>
          </section>

          <section className="mb-12">
            <h2 className="editorial-heading mb-4">
              IC Cards
            </h2>
            <div className="article-body space-y-4 max-w-2xl">
              <p>
                The main options are Suica, PASMO, and ICOCA. Any of these works
                for most visitors.
              </p>
              <ul className="list-none pl-0 space-y-2">
                <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                  Tap in when entering the gate
                </li>
                <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                  Tap out when exiting
                </li>
                <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                  Recharge when balance is low
                </li>
              </ul>
              <p>
                IC cards also work for buses, convenience stores, and vending
                machines.
              </p>
              <p className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6 pt-2">
                <Link
                  href="/guides/suica-vs-pasmo"
                  className="font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150 w-fit"
                >
                  Suica vs PASMO →
                </Link>
                <Link
                  href="/guides/japan-train-mistakes"
                  className="font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150 w-fit"
                >
                  Common train mistakes →
                </Link>
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="editorial-heading mb-4">
              Common Mistakes
            </h2>
            <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Boarding the wrong train type
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Ignoring platform direction
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Standing in the wrong line
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Forgetting to tap out
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Taking taxis because trains look scary
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Assuming all trains are JR
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="editorial-heading mb-4">
              Rush Hour and Last Train
            </h2>
            <div className="article-body space-y-4 max-w-2xl">
              <p>Rush hour is crowded, especially in large cities.</p>
              <p>Avoid moving large luggage during peak commuting hours.</p>
              <p>Last trains are usually around midnight.</p>
              <p>Missing the last train can mean an expensive taxi ride.</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="editorial-heading mb-4">
              Shinkansen Is Different
            </h2>
            <div className="article-body space-y-4 max-w-2xl">
              <p>The Shinkansen is for long-distance travel.</p>
              <p>It usually needs a separate ticket.</p>
              <p>
                Use it for routes like Tokyo to Kyoto, Osaka, or Hiroshima.
              </p>
              <p>You do not need it for normal city travel.</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="editorial-heading mb-4">
              Reality Check
            </h2>
            <div className="article-body space-y-4 max-w-2xl">
              <p>You will probably make one small mistake.</p>
              <p>That is fine.</p>
              <p>Trains come often, so recovery is easy.</p>
              <p>Apps make the system manageable.</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="editorial-heading mb-4">
              Bottom Line
            </h2>
            <ul className="article-body list-none space-y-3.5 pl-0 mb-8 max-w-2xl">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Use maps
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Use IC card
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Follow platform and direction
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Take Local if unsure
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Do not overthink it
              </li>
            </ul>
          </section>

          <DownloadChecklistBox downloadId="japan-train-cheat-sheet" />

          <NextStepGuides guideId="japan-trains" />

          <GuideEndCta
            parentHref="/guides/japan-itinerary"
            parentLabel="Japan trip itinerary →"
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
