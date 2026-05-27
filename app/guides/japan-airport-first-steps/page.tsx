import type { Metadata } from "next";
import Link from "next/link";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";
import { ItineraryGuideCta } from "@/components/itinerary/ItineraryGuideCta";
import { ToolRecommendationStrip } from "@/components/tools/ToolRecommendationStrip";
import { RecommendedGearBox } from "@/components/RecommendedGearBox";
import { resolveAffiliateLink } from "@/lib/affiliate-links";
import { DownloadChecklistBox } from "@/components/DownloadChecklistBox";
import { NextStepGuides } from "@/components/NextStepGuides";
import { RecommendedServicesBox } from "@/components/RecommendedServicesBox";
import { OperationalWarning, RealityCheck } from "@/components/editorial/field-notes";

export const metadata: Metadata = {
  title:
    "Landing in Japan: First 60 Minutes at Narita and Haneda (What to Do)",
  description:
    "Immigration, baggage, data, IC card, and trains: what to do in your first hour at Narita or Haneda without wasting money or time. Practical order for first-time visitors.",
};

const conversionBox =
  "border border-[#d4c9b0] bg-white px-6 py-5 mb-6 max-w-2xl";

export default function JapanAirportFirstStepsPage() {
  return (
    <GuideArticleShell
      title={
        <h1
          className="guide-page-title"
        >
          Landing in Japan: What to Do in Your First 60 Minutes (Narita and
          Haneda)
        </h1>
      }
      intro={
        <div className="article-body max-w-2xl space-y-4">
          <p>
            The first hour after landing is not glamorous. You are tired, lines
            move in bursts, and every kiosk wants you to make a decision before
            you have context.
          </p>
          <p>
            The goal is simple: get through official steps, get data, get a
            payment tap that works on trains and konbini, then leave the airport
            on a route you already picked. Everything else can wait until you are
            sitting down with coffee.
          </p>
          <p>
            <Link
              href="/guides/japan-airport-to-city"
              className="editorial-chevron-link font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
            >
              Airport to hotel (Narita, Haneda, Kansai)
            </Link>
          </p>
        </div>
      }
      beforeComparison={
        <>
        <div className="mb-6 max-w-full">
          <ToolRecommendationStrip
            headingId="airport-tools-strip"
            title="Before you zip the bag"
            deck="Customs-sensitive items and a printable-style packing list pair well with an airport run-through. Use these when you are still at home, not in the queue."
            tools={[
              {
                label: "Can I Bring This to Japan?",
                description:
                  "High level guidance on meds, food, plants, vapes, alcohol, power banks, and cash.",
                href: "/tools/can-i-bring-this-to-japan",
              },
              {
                label: "Japan Packing Generator",
                description:
                  "Checklist from your month, length, cities, laundry, activities, and rain concern.",
                href: "/tools/japan-packing-generator",
              },
            ]}
          />
        </div>

        <RecommendedGearBox
          title="Recommended gear for your first hour in Japan"
          intro="These are practical items that solve common problems travelers run into right after landing: dead phones, scattered documents, and long walks to trains."
          items={[
            {
              name: "Portable power bank",
              reason:
                "Immigration queues and setup apps drain battery before you reach a hotel outlet.",
              linkId: "gear-portable-power-bank",
              href: resolveAffiliateLink("gear-portable-power-bank"),
            },
            {
              name: "Travel document organizer",
              reason:
                "Keeps passport, arrival forms, and hotel printouts in one place while you juggle bags.",
              linkId: "gear-travel-document-organizer",
              href: resolveAffiliateLink("gear-travel-document-organizer"),
            },
            {
              name: "Compression socks",
              reason:
                "Helpful on long flights before you start walking station corridors the same day.",
              linkId: "gear-compression-socks",
              href: resolveAffiliateLink("gear-compression-socks"),
            },
            {
              name: "Small crossbody or neck pouch",
              reason:
                "Frees your hands for luggage carts, ticket machines, and IC card taps at gates.",
              linkId: "gear-crossbody-pouch",
              href: resolveAffiliateLink("gear-crossbody-pouch"),
            },
            {
              name: "Reusable water bottle",
              reason:
                "Airport shops are pricey; vending machines are everywhere once you are in the city.",
              linkId: "gear-reusable-water-bottle",
              href: resolveAffiliateLink("gear-reusable-water-bottle"),
            },
          ]}
        />

        <section className="mb-6">
          <h2 className="editorial-heading mb-4">
            Step 1: Immigration (What Actually Happens)
          </h2>
          <div className="article-body space-y-4 max-w-2xl">
            <p>
              You join a queue, move forward in chunks, then scan fingerprints and
              face where instructed. Officers are usually efficient. They are not
              there to chat.
            </p>
            <p>
              Peak arrivals mean real wait time. Off-peak can feel fast. Plan
              mental padding, not a tight train connection in the same hour you
              land.
            </p>
            <p>
              Have your passport ready. If you use a visa or QR-style arrival
              process, have that screen or printout ready before you reach the desk.
              Phones die faster than people admit after a long flight.
            </p>
          </div>
        </section>

        <OperationalWarning noteId="airport-first-immigration-buffer">
          <p>
            Do not book a Shinkansen or domestic flight in the same hour you land.
            Immigration, bags, and SIM setup eat real time. Your first win is
            leaving the airport calmly, not beating a clock you never saw in person.
          </p>
        </OperationalWarning>

        <section className="mb-6">
          <h2 className="editorial-heading mb-4">
            Step 2: Baggage Claim and Customs
          </h2>
          <div className="article-body space-y-4 max-w-2xl">
            <p>
              Follow the monitors to your belt. Bags can take a while even when
              immigration felt quick. That is normal.
            </p>
            <p>
              Customs is usually a form or tablet declaration, then a short
              interview lane if flagged. If you carry medication, meat products,
              large cash amounts, or anything that sounds like work equipment you
              plan to sell, read the declaration rules honestly. Guessing wrong is
              how you get pulled aside.
            </p>
            <p>
              Typical tourist flow: collect bag, declare if needed, walk out into
              arrivals hall. Then you are in the noisy retail zone where every
              sign competes for your attention.
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="editorial-heading mb-4">
            Step 3: Get Internet Immediately
          </h2>
          <div className="article-body space-y-4 max-w-2xl">
            <p>
              Airport WiFi helps for five minutes. It is not a substitute for
              mobile data when you are trying to buy a train ticket, message your
              hotel, or pull up a QR.
            </p>
            <p>
              Airport SIM counters and rental WiFi pickups work, but prices and
              queues are often worse than what you can set up before you fly. If
              your phone supports eSIM, that is usually the cleanest first move:
              install and activate on WiFi, then walk away connected.
            </p>
            <p>
              Physical SIM still makes sense for some phones and longer trips. The
              point is not “airport bad” as a religion. The point is you should
              decide before you are dehydrated and impatient.
            </p>
          </div>
        </section>

        <RealityCheck noteId="airport-first-data-choice">
          <p>
            Airport counters work, but you pay with time and attention. If your
            phone supports eSIM, most travelers settle data on WiFi, then walk to
            trains without joining another queue.
          </p>
        </RealityCheck>
        </>
      }
      afterComparison={
        <>
        <div className={conversionBox}>
          <h3 className="font-sans font-bold text-sm tracking-widest uppercase text-dark mb-2">
            Recommended: Get an eSIM before landing
          </h3>
          <p className="article-body-sm mb-4">
            If your phone supports eSIM, set it up before you land. Most travelers
            do fine with Airalo or Ubigi for Japan. You skip the kiosk line and
            you are online before you reach the train gates.
          </p>
          <Link
            href="/guides/sim-card-japan"
            className="editorial-chevron-link font-sans text-base font-bold text-rust hover:text-maroon transition-colors duration-150"
          >
            Best SIM and eSIM options for Japan
          </Link>
        </div>

        <section className="mb-6">
          <h2 className="editorial-heading mb-4">
            Step 4: Get a Transport Card (Suica or PASMO)
          </h2>
          <div className="article-body space-y-4 max-w-2xl">
            <p>
              You do not need a plastic card on day one if you use Apple Pay or
              Google Pay with a mobile Suica-style setup. Plenty of visitors never
              buy the green physical card.
            </p>
            <p>
              You do need a tap that works on JR and metro gates and at most
              konbini. If your phone wallet setup is shaky, buy a rechargeable IC
              card at a machine in arrivals or near the rail station attached to
              the airport. PASMO and Suica are functionally the same for most
              trips in Tokyo.
            </p>
            <p>
              <Link
                href="/guides/suica-vs-pasmo"
                className="editorial-chevron-link font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
              >
                Suica vs PASMO: what to pick
              </Link>
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="editorial-heading mb-4">
            Step 5: How to Get to Tokyo (Train vs Taxi)
          </h2>
          <div className="article-body space-y-4 max-w-2xl">
            <p>
              <span className="font-sans font-bold text-dark">Narita:</span>{" "}
              Narita Express (N&apos;EX) is simple if your hotel is near a major JR
              hub. Keisei Skyliner is fast into Ueno area if that matches your
              side of town. Limousine bus is underrated when you are heavy on
              luggage and do not want stairs.
            </p>
            <p>
              <span className="font-sans font-bold text-dark">Haneda:</span>{" "}
              Monorail or Keikyu into the city is usually enough. Haneda is close
              enough that a taxi into central Tokyo is painful on the wallet but
              sometimes worth it for a group at 1 a.m. with bags.
            </p>
            <p>
              Taxi from Narita to central Tokyo is expensive. It can still make
              sense for a family, a mobility issue, or a flight that lands so late
              that trains are sparse and you value sleep over yen.
            </p>
            <p className="space-y-2">
              <Link
                href="/guides/narita-to-tokyo"
                className="editorial-chevron-link inline-flex font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
              >
                Narita to Tokyo (routes and picks)
              </Link>
              <Link
                href="/guides/haneda-to-tokyo"
                className="editorial-chevron-link inline-flex font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
              >
                Haneda to Tokyo (routes and picks)
              </Link>
            </p>
          </div>
        </section>

        <RecommendedServicesBox serviceId="japan-airport-first-steps" />

        <section className="mb-6">
          <h2 className="editorial-heading mb-4">
            Common Mistakes at the Airport
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Buying an overpriced tourist SIM because the counter is the first
              thing you see after customs
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Assuming your home card taps everywhere, then freezing at a small shop
              that still leans cash
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Boarding the right line but the wrong train type (express vs local)
              and wondering why the map time does not match reality
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="editorial-heading mb-4">
            Quick Checklist Before You Leave the Airport
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Data works (run a quick map load)
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              IC tap works at a gate test if you are unsure
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              You know which train line and platform you are aiming for
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              You have a little cash or a clear plan to withdraw soon after arrival
            </li>
          </ul>
        </section>

        <section className="mb-6 max-w-2xl border-t border-tan pt-8">
          <h2 className="font-display text-dark tracking-wide text-3xl mb-4">
            Next: plan the trip in the right order
          </h2>
          <p className="article-body mb-6">
            Airports are only the opening scene. If you want a straight checklist
            that covers SIM, trains, where to stay, and money without SEO noise,
            use the hub page and work down the list.
          </p>
          <Link
            href="/start-here"
            className="editorial-chevron-cta inline-flex rounded-lg bg-maroon text-white font-sans font-bold text-base tracking-widest uppercase px-8 py-4 hover:bg-rust transition-colors duration-150"
          >
            Start here: trip planning checklist
          </Link>
        </section>

        <ItineraryGuideCta className="my-10" />

        <DownloadChecklistBox downloadId="japan-arrival-checklist" />

        <NextStepGuides guideId="japan-airport-first-steps" />

        <GuideEndCta
          parentHref="/guides/japan-airport-to-city"
          parentLabel="Airport to hotel in Japan →"
        />
        </>
      }
    />
  );
}
