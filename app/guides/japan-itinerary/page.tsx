import type { Metadata } from "next";
import Link from "next/link";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";

export const metadata: Metadata = {
  title:
    "Japan Itinerary (7, 10, 14 Days) – First-Time Travel Guide",
  description:
    "First-time Japan itinerary for 7, 10, or 14 days: Tokyo, Kyoto, Osaka pacing, Shinkansen legs, and realistic routes that do not burn out by day three.",
};

export default function JapanItineraryPage() {
  return (
    <GuideArticleShell
      title={
        <h1
          className="guide-page-title"
        >
          Japan Itinerary (7, 10, and 14 Days for First-Time Visitors)
        </h1>
      }
      intro={
        <div className="article-body max-w-2xl space-y-4">
          <p>
            Most first-time Japan itineraries are packed too tightly and break
            down by day three.
          </p>
          <p>
            Good Japan travel is about pacing, not maximum city count. The goal
            is smooth days, not constant transit.
          </p>
          <p>
            Keep the plan simple. You will enjoy more and stress less.
          </p>
          <Link
            href="/guides/japan-airport-to-city"
            className="inline-block font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150 pt-2"
          >
            Landing soon? Here&apos;s how to get to your hotel →
          </Link>
        </div>
      }
      beforeComparison={
        <>
        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            Quick Answer (Don&apos;t Overplan)
          </h2>
          <ul className="article-body list-none space-y-3 pl-0 mb-6 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              7 days: Tokyo + Kyoto or Osaka
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              10 days: Tokyo + Kyoto + Osaka
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              14 days: Tokyo + Kyoto + Osaka + optional extra (Nara or day
              trips)
            </li>
          </ul>
          <p className="font-sans font-bold text-dark text-lg mb-6">
            Do not try to see everything in one trip.
          </p>
          <Link
            href="/guides/where-to-stay-tokyo"
            className="inline-block bg-maroon text-white font-sans font-bold text-base tracking-widest uppercase px-7 py-3.5 hover:bg-rust transition-colors duration-150"
          >
            Where to stay in Tokyo (best areas) →
          </Link>
        </section>

        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            How to Plan Your Route (Simple Rule)
          </h2>
          <div className="article-body space-y-4 max-w-2xl">
            <p>Fly into Tokyo, then move west to Kyoto and Osaka.</p>
            <p>
              For the end of the trip, either return to Tokyo or fly out from
              Osaka if that option works for your ticket.
            </p>
            <p>
              The Shinkansen makes this straightforward. Avoid backtracking
              between the same cities.
            </p>
            <Link
              href="/guides/japan-trains"
              className="block font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150 pt-1"
            >
              Navigate Japan trains on day one →
            </Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            7-Day Itinerary (Simple and Realistic)
          </h2>

          <div className="space-y-6 max-w-2xl">
            <div>
              <h3 className="font-display text-dark tracking-wide text-3xl mb-2">
                Day 1-3: Tokyo
              </h3>
              <p className="article-body">
                Arrive, adjust to time zone, and focus on key areas. Keep each
                day compact.
              </p>
            </div>

            <div>
              <h3 className="font-display text-dark tracking-wide text-3xl mb-2">
                Day 4-6: Kyoto or Osaka
              </h3>
              <p className="article-body">
                Pick one base for culture and food. Do not split too much in a
                short trip.
              </p>
            </div>

            <div>
              <h3 className="font-display text-dark tracking-wide text-3xl mb-2">
                Day 7: Return / departure
              </h3>
              <p className="article-body">
                Leave room for transfer time and airport logistics.
              </p>
            </div>
          </div>
        </section>
        </>
      }
      afterComparison={
        <>
        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            10-Day Itinerary (Better Balance)
          </h2>

          <div className="space-y-6 max-w-2xl">
            <div>
              <h3 className="font-display text-dark tracking-wide text-3xl mb-2">
                Day 1-4: Tokyo
              </h3>
            </div>
            <div>
              <h3 className="font-display text-dark tracking-wide text-3xl mb-2">
                Day 5-7: Kyoto
              </h3>
            </div>
            <div>
              <h3 className="font-display text-dark tracking-wide text-3xl mb-2">
                Day 8-9: Osaka
              </h3>
            </div>
            <div>
              <h3 className="font-display text-dark tracking-wide text-3xl mb-2">
                Day 10: Departure
              </h3>
            </div>
          </div>

          <p className="article-body mt-6 max-w-2xl">
            This gives a better pace with less rushing and more usable time in
            each city.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            14-Day Itinerary (Best Experience)
          </h2>

          <div className="space-y-6 max-w-2xl">
            <div>
              <h3 className="font-display text-dark tracking-wide text-3xl mb-2">
                Day 1-5: Tokyo
              </h3>
            </div>
            <div>
              <h3 className="font-display text-dark tracking-wide text-3xl mb-2">
                Day 6-9: Kyoto
              </h3>
            </div>
            <div>
              <h3 className="font-display text-dark tracking-wide text-3xl mb-2">
                Day 10-12: Osaka
              </h3>
            </div>
            <div>
              <h3 className="font-display text-dark tracking-wide text-3xl mb-2">
                Day 13-14: Optional trips (Nara, Hiroshima, or rest days)
              </h3>
            </div>
          </div>

          <p className="article-body mt-6 max-w-2xl">
            Two weeks gives flexibility, lighter days, and a much better overall
            experience.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            Common Mistakes
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Trying to visit too many cities
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Moving hotels too often
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Underestimating travel time
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Not leaving rest time
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            Where This Connects (Important)
          </h2>
          <div className="article-body space-y-4 max-w-2xl">
            <p>You still need three basics in place:</p>
            <ul className="list-none pl-0 space-y-2">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                SIM for navigation
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Good hotel location
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Train understanding
              </li>
            </ul>
            <p>
              Start with the{" "}
              <Link
                href="/guides/sim-card-japan"
                className="font-sans font-bold text-rust hover:text-maroon underline-offset-4 hover:underline"
              >
                best SIM card for Japan
              </Link>{" "}
              and{" "}
              <Link
                href="/guides/where-to-stay-tokyo"
                className="font-sans font-bold text-rust hover:text-maroon underline-offset-4 hover:underline"
              >
                where to stay in Tokyo (best areas for first-time visitors)
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            Reality Check
          </h2>
          <div className="article-body space-y-4 max-w-2xl">
            <p>You will not see everything.</p>
            <p>Japan rewards slower travel.</p>
            <p>A simple plan performs better than an overloaded one.</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            Bottom Line
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 mb-8 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Keep it simple
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Limit cities
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Plan around Tokyo + Kyoto/Osaka
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Leave space in your schedule
            </li>
          </ul>
        </section>

        <GuideEndCta
          parentHref="/guides/where-to-stay-tokyo"
          parentLabel="Where to stay in Tokyo →"
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
