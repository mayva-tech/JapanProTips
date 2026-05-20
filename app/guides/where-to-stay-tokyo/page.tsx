import type { Metadata } from "next";
import Link from "next/link";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";
import { NextStepGuides } from "@/components/NextStepGuides";
import { RecommendedServicesBox } from "@/components/RecommendedServicesBox";

export const metadata: Metadata = {
  title:
    "Where to Stay in Tokyo (Best Areas for First-Time Visitors)",
  description:
    "Shinjuku, Shibuya, Asakusa, Ueno: pros and cons for first-time visitors, where not to stay, hotel vs Airbnb rules, and how to pick hotels near stations without overthinking.",
};

const conversionBox =
  "border border-[#d4c9b0] bg-white px-6 py-5 mb-12 max-w-2xl";

export default function WhereToStayTokyoPage() {
  return (
    <GuideArticleShell
      showHotelConversion={false}
      title={
        <h1
          className="guide-page-title"
        >
          Where to Stay in Tokyo (Best Areas for First-Time Visitors)
        </h1>
      }
      intro={
        <div className="article-body max-w-2xl space-y-4">
          <p>
            Tokyo is huge on a map and huge in real life. Trains fix a lot, but
            they do not erase distance. The wrong base means extra transfers,
            late nights on local lines, and a constant feeling that you are
            commuting through your own vacation.
          </p>
          <p>
            Picking the wrong area does not ruin Japan. It just wastes time you
            could spend doing something else.
          </p>
          <p>
            <Link
              href="/guides/shinjuku-vs-shibuya"
              className="font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
            >
              Shinjuku vs Shibuya (side by side) →
            </Link>
          </p>
        </div>
      }
      beforeComparison={
        <>
        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            Best Areas for First-Time Visitors
          </h2>

          <div className="space-y-10 max-w-2xl">
            <div>
              <h3 className="font-display text-dark tracking-wide text-3xl mb-3">
                Shinjuku
              </h3>
              <div className="article-body space-y-3">
                <p>
                  <span className="font-sans font-bold text-dark">Pros:</span>{" "}
                  Serious transport hub (JR and metro), late food, dense
                  convenience, easy day trips west. For a first trip, this is the
                  default that works for the most people.
                </p>
                <p>
                  <span className="font-sans font-bold text-dark">Cons:</span>{" "}
                  Crowded, loud at street level, easy to book a “Shinjuku” hotel
                  that is actually a long walk from the station if you do not check
                  the map pin.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-display text-dark tracking-wide text-3xl mb-3">
                Shibuya
              </h3>
              <div className="article-body space-y-3">
                <p>
                  <span className="font-sans font-bold text-dark">Pros:</span>{" "}
                  Modern center, strong nightlife, easy energy if you like busy
                  streets. Good if you want the city to feel “on” when you step
                  outside.
                </p>
                <p>
                  <span className="font-sans font-bold text-dark">Cons:</span>{" "}
                  Often more expensive for the same room class. Slightly less
                  central as a rail hub than Shinjuku for some cross-city routes,
                  depending on your day plan.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-display text-dark tracking-wide text-3xl mb-3">
                Asakusa
              </h3>
              <div className="article-body space-y-3">
                <p>
                  <span className="font-sans font-bold text-dark">Pros:</span>{" "}
                  Often cheaper, more traditional street feel, slower pace than
                  Shinjuku. Good if you want temples and morning walks without
                  pretending you are in a neon cyberpunk movie.
                </p>
                <p>
                  <span className="font-sans font-bold text-dark">Cons:</span>{" "}
                  Quieter at night, fewer “default” dining options after 10 p.m.,
                  more transfer time to west-side day trips.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-display text-dark tracking-wide text-3xl mb-3">
                Ueno
              </h3>
              <div className="article-body space-y-3">
                <p>
                  <span className="font-sans font-bold text-dark">Pros:</span>{" "}
                  Budget-friendly hotels, strong train access, park and museum
                  cluster nearby. Practical base if you like north-east Tokyo and
                  Narita-side arrivals.
                </p>
                <p>
                  <span className="font-sans font-bold text-dark">Cons:</span>{" "}
                  Less “exciting” as a postcard center than Shibuya or Shinjuku at
                  night. Fine for sleep and trains, not for wow factor out the
                  window.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            If You Only Stay 3 to 5 Days
          </h2>
          <div className="article-body space-y-4 max-w-2xl">
            <p>
              Pick one base, two at most if you have a real reason (split trip
              with a side leg). Moving hotels mid-week burns half a day in
              checkout, lockers, and re-learning a new station exit.
            </p>
            <p>
              Short trips reward boring consistency: same station, same konbini
              coffee routine, same platform habits by day three.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            Where NOT to Stay (For First Trip)
          </h2>
          <div className="article-body space-y-4 max-w-2xl">
            <p>
              Far suburbs look cheap on a booking site. They cost you every
              morning and night: extra legs on commuter lines, crowded rush
              trains, and mental fatigue when you misread a timetable.
            </p>
            <p>
              Quiet residential pockets without a strong station nearby sound
              peaceful. In practice you get dark side streets, fewer late food
              options, and a long walk after a long day.
            </p>
            <p>
              First trip rule: stay inside the ring of places you can explain to a
              tired version of yourself at 11 p.m. If you cannot, skip it.
            </p>
          </div>
        </section>

        <RecommendedServicesBox serviceId="where-to-stay-tokyo" />
        </>
      }
      afterComparison={
        <>
        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            Hotel vs Airbnb in Japan
          </h2>
          <div className="article-body space-y-4 max-w-2xl">
            <p>
              <span className="font-sans font-bold text-dark">Hotels:</span>{" "}
              Straightforward check-in, front desk when something breaks, clearer
              rules for tourists. Many support luggage hold before check-in time.
            </p>
            <p>
              <span className="font-sans font-bold text-dark">Short-term rentals:</span>{" "}
              Japan tightened minpaku rules. Legal listings exist, but you still
              get more variance: self check-in, building rules, trash sorting,
              neighbor noise expectations. Not impossible, just more admin.
            </p>
            <p className="font-sans font-bold text-dark">
              First trip: default to a hotel unless you have a specific reason
              (family size, long stay, kitchen need).
            </p>
          </div>
        </section>

        <div className={conversionBox}>
          <h3 className="font-sans font-bold text-sm tracking-widest uppercase text-dark mb-2">
            Find Hotels in Tokyo
          </h3>
          <p className="article-body-sm mb-4">
            Use{" "}
            <a
              href="https://www.agoda.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans font-bold text-rust hover:text-maroon transition-colors duration-150"
            >
              Agoda
            </a>{" "}
            or{" "}
            <a
              href="https://www.booking.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans font-bold text-rust hover:text-maroon transition-colors duration-150"
            >
              Booking
            </a>{" "}
            and sort by walking time to a named station, not by neighborhood name
            alone. “Near Shinjuku” can mean fifteen minutes through underpasses
            you do not want on night one.
          </p>
          <p className="article-body-sm">
            Filter for major hubs you already picked (Shinjuku, Shibuya, Ueno,
            Asakusa). Read the map pin. Check the last train reality if you go out
            late.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            Final Recommendation (Simple)
          </h2>
          <div className="article-body space-y-4 max-w-2xl">
            <p>
              If you refuse to overthink it: stay in Shinjuku near the station,
              accept some crowds, and spend your planning energy on trains and day
              routes instead of neighborhood fantasy.
            </p>
            <p>
              If you want traditional mornings and lower spend: Asakusa or Ueno,
              still pinned to a station you can walk to in ten minutes or less.
            </p>
            <p>
              If you want nightlife first: Shibuya, with the understanding you
              are paying for vibe as much as bed quality.
            </p>
          </div>
        </section>

        <section className="mb-12 max-w-2xl border-t border-tan pt-10">
          <h2 className="font-display text-dark tracking-wide text-3xl mb-4">
            Related planning
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0">
            <li>
              <Link
                href="/guides/japan-transportation"
                className="font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
              >
                Japan transportation (how to move without drama) →
              </Link>
            </li>
            <li>
              <Link
                href="/guides/japan-budget-breakdown"
                className="font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
              >
                Japan budget breakdown (rough numbers, no fantasy) →
              </Link>
            </li>
          </ul>
        </section>

        <NextStepGuides guideId="where-to-stay-tokyo" />

        <GuideEndCta
          parentHref="/guides/where-to-stay-japan"
          parentLabel="Where to stay in Japan →"
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
