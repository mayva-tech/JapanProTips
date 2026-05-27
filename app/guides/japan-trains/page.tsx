import type { Metadata } from "next";
import { SiteBrandFooter } from "@/components/brand/SiteBrandFooter";
import Link from "next/link";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";
import { ItineraryGuideCta } from "@/components/itinerary/ItineraryGuideCta";
import { DownloadChecklistBox } from "@/components/DownloadChecklistBox";
import { NextStepGuides } from "@/components/NextStepGuides";
import { RecommendedServicesBox } from "@/components/RecommendedServicesBox";
import { OperationalWarning, WhatPeopleMiss } from "@/components/editorial/field-notes";

const inlineLinkClass =
  "editorial-chevron-link font-sans font-bold text-base text-rust hover:text-maroon transition-colors duration-150";

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
        <h1 className="guide-page-title">
          How to Use Trains in Japan Without Getting Lost
        </h1>
      }
      intro={
        <div className="article-body space-y-4 lg:max-w-2xl">
          <p>Japan trains look confusing at first.</p>
          <p>You do not need to understand the entire system.</p>
          <p>You only need a simple system that works every day.</p>
          <p>
            <Link href="/guides/japan-airport-to-city" className={inlineLinkClass}>
              From airport to hotel
            </Link>
          </p>
        </div>
      }
      beforeComparison={
        <div className="mdx-guide-body min-w-0 lg:max-w-2xl">
          <h2>Quick Answer</h2>
          <ul className="article-body mb-3 list-none space-y-2.5 pl-0 last:mb-0">
            <li>Use Google Maps or NAVITIME</li>
            <li>Use an IC card</li>
            <li>Follow line name, direction, platform, and transfers</li>
            <li>If unsure, ask station staff</li>
          </ul>
          <OperationalWarning noteId="japan-trains-quick-answer">
            <p>
              Your app shows a line name, time, and platform. If any one of
              those three disagrees with the yellow departure board, trust the
              board first, then ask staff. Wrong platform is the fastest way to
              board the right line going the wrong direction.
            </p>
          </OperationalWarning>
          <p className="mb-3 last:mb-0">
            <Link
              href="/guides/sim-card-japan"
              className="editorial-chevron-cta inline-flex rounded-lg bg-maroon px-7 py-3.5 font-sans text-base font-bold uppercase tracking-widest text-white transition-colors duration-150 hover:bg-rust"
            >
              Get your SIM sorted
            </Link>
          </p>

          <h2>What You Actually Need to Know</h2>
          <p className="article-body mb-3">
            <strong className="font-sans font-bold text-dark">
              Train line name:
            </strong>{" "}
            Confirm the exact line shown in your app.
          </p>
          <p className="article-body mb-3">
            <strong className="font-sans font-bold text-dark">
              Destination direction:
            </strong>{" "}
            Check where the train is heading, not just the line color.
          </p>
          <p className="article-body mb-3">
            <strong className="font-sans font-bold text-dark">
              Platform number:
            </strong>{" "}
            Match the platform in the app with station signs.
          </p>
          <p className="article-body mb-3">
            <strong className="font-sans font-bold text-dark">
              Local vs Rapid vs Express:
            </strong>{" "}
            Pick the train type shown in your route.
          </p>
          <p className="article-body mb-3 last:mb-0">
            <strong className="font-sans font-bold text-dark">
              Transfer stations:
            </strong>{" "}
            Know where to switch before you board.
          </p>

          <RecommendedServicesBox serviceId="japan-trains" />

          <h2>Local, Rapid, and Express</h2>
          <ul className="article-body mb-3 list-none space-y-2.5 pl-0 last:mb-0">
            <li>Local stops at every station</li>
            <li>Rapid skips some stations</li>
            <li>Express skips more stations</li>
          </ul>
          <p className="article-body mb-3 last:mb-0">
            <strong className="font-sans font-bold text-dark">
              If you are unsure, take Local.
            </strong>
          </p>

          <h2>JR vs Metro</h2>
          <p className="article-body mb-3">JR is the major rail network.</p>
          <p className="article-body mb-3">Metro or Subway is the city train system.</p>
          <p className="article-body mb-3">
            Private railways also exist and are common.
          </p>
          <p className="article-body mb-3 last:mb-0">
            <strong className="font-sans font-bold text-dark">
              You do not need to memorize the companies. Just follow the route
              shown in your app.
            </strong>
          </p>

          <WhatPeopleMiss noteId="japan-trains-jr-metro">
            <p>
              JR, metro, and private lines can share a station but use different
              ticket logic. Missing that split is how people tap through the wrong
              gate and then assume the IC card is broken.
            </p>
          </WhatPeopleMiss>
        </div>
      }
      afterComparison={
        <>
          <div className="mdx-guide-body min-w-0 lg:max-w-2xl">
            <h2>How to Ride a Train Step by Step</h2>
            <ol className="article-body mb-3 list-decimal space-y-2.5 pl-6 last:mb-0">
              <li>Search destination in Google Maps or NAVITIME</li>
              <li>Check line name</li>
              <li>Check platform number</li>
              <li>Tap in using IC card</li>
              <li>Board the correct train</li>
              <li>Watch the station names</li>
              <li>Transfer if needed</li>
              <li>Tap out</li>
            </ol>

            <h2>IC Cards</h2>
            <p className="article-body mb-3">
              The main options are Suica, PASMO, and ICOCA. Any of these works
              for most visitors.
            </p>
            <ul className="article-body mb-3 list-none space-y-2.5 pl-0 last:mb-0">
              <li>Tap in when entering the gate</li>
              <li>Tap out when exiting</li>
              <li>Recharge when balance is low</li>
            </ul>
            <p className="article-body mb-3">
              IC cards also work for buses, convenience stores, and vending
              machines.
            </p>
            <p className="article-body mb-3 last:mb-0">
              <Link href="/guides/suica-vs-pasmo" className={inlineLinkClass}>
                Suica vs PASMO
              </Link>
              {" · "}
              <Link
                href="/guides/japan-train-mistakes"
                className={inlineLinkClass}
              >
                Common train mistakes
              </Link>
            </p>

            <h2>Common Mistakes</h2>
            <ul className="article-body mb-3 list-none space-y-2.5 pl-0 last:mb-0">
              <li>Boarding the wrong train type</li>
              <li>Ignoring platform direction</li>
              <li>Standing in the wrong line</li>
              <li>Forgetting to tap out</li>
              <li>Taking taxis because trains look scary</li>
              <li>Assuming all trains are JR</li>
            </ul>

            <h2>Rush Hour and Last Train</h2>
            <p className="article-body mb-3">
              Rush hour is crowded, especially in large cities.
            </p>
            <p className="article-body mb-3">
              Avoid moving large luggage during peak commuting hours.
            </p>
            <p className="article-body mb-3">Last trains are usually around midnight.</p>
            <p className="article-body mb-3 last:mb-0">
              Missing the last train can mean an expensive taxi ride.
            </p>

            <h2>Shinkansen Is Different</h2>
            <p className="article-body mb-3">
              The Shinkansen is for long-distance travel.
            </p>
            <p className="article-body mb-3">It usually needs a separate ticket.</p>
            <p className="article-body mb-3">
              Use it for routes like Tokyo to Kyoto, Osaka, or Hiroshima.
            </p>
            <p className="article-body mb-3 last:mb-0">
              You do not need it for normal city travel.
            </p>

            <h2>Reality Check</h2>
            <p className="article-body mb-3">You will probably make one small mistake.</p>
            <p className="article-body mb-3">That is fine.</p>
            <p className="article-body mb-3">Trains come often, so recovery is easy.</p>
            <p className="article-body mb-3 last:mb-0">Apps make the system manageable.</p>

            <h2>Bottom Line</h2>
            <ul className="article-body mb-3 list-none space-y-2.5 pl-0 last:mb-0">
              <li>Use maps</li>
              <li>Use IC card</li>
              <li>Follow platform and direction</li>
              <li>Take Local if unsure</li>
              <li>Do not overthink it</li>
            </ul>
          </div>

          <ItineraryGuideCta className="my-10" />

          <DownloadChecklistBox downloadId="japan-train-cheat-sheet" />

          <NextStepGuides guideId="japan-trains" />

          <GuideEndCta
            parentHref="/guides/japan-itinerary"
            parentLabel="Japan trip itinerary →"
          />
          <SiteBrandFooter />
        </>
      }
    />
  );
}
