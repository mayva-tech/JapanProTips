import type { Metadata } from "next";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";

export const metadata: Metadata = {
  title:
    "Getting Around Japan: Trains, IC Cards & Apps for Beginners",
  description:
    "Learn Japan trains without drowning in maps: IC cards, JR vs metro, Google Maps vs NAVITIME, transfers, and habits that keep first-time visitors moving.",
};

export default function GettingAroundJapanGuidePage() {
  return (
    <GuideArticleShell
      title={
        <>
          <p className="font-display text-rust text-xl tracking-widest mb-2">
            START HERE ///
          </p>
          <h1
            className="font-display text-dark tracking-wide leading-tight mb-8"
            style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
          >
            {`2. Understand How You'll Get Around`}
          </h1>
        </>
      }
      intro={
        <div className="font-serif text-muted text-base leading-relaxed space-y-4 max-w-2xl">
          <p>
            {`Japan's train maps look busy. That is normal. You do not need to learn the whole network. Learn a few habits and follow your phone.`}
          </p>
        </div>
      }
      beforeComparison={
        <div className="space-y-10">
          <div className="border-t-2 border-dark" />

          <div>
            <h2 className="font-display text-dark tracking-wide mb-4 text-xl sm:text-2xl">
              The Only 3 Things You Need to Know
            </h2>

            <div className="space-y-8 mt-8 max-w-xl">
              <div>
                <h3 className="font-sans font-bold text-dark text-base mb-3">
                  Trains are the default
                </h3>
                <p className="font-serif text-muted text-base leading-relaxed">
                  Trains carry almost everyone for airport runs, moving inside a
                  city, and city-to-city travel. You will use them constantly.
                  Tokyo and Osaka both rely on rail more than taxis or rental cars
                  for everyday movement. Plan around trains first; everything else
                  is secondary.
                </p>
              </div>

              <div>
                <h3 className="font-sans font-bold text-dark text-base mb-3">
                  Train types: Local, Rapid, Express
                </h3>
                <ul className="font-serif text-muted list-none pl-0 space-y-3 leading-relaxed mb-4">
                  <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                    <strong className="font-sans font-bold text-dark">Local</strong>{" "}
                    stops at every station along the route. Slowest, hardest to get
                    wrong.
                  </li>
                  <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                    <strong className="font-sans font-bold text-dark">Rapid</strong>{" "}
                    skips some stations. Faster than Local on the same corridor.
                  </li>
                  <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                    <strong className="font-sans font-bold text-dark">Express</strong>{" "}
                    (and similar names) skips more stations. Faster when you are
                    going far along that line.
                  </li>
                </ul>
                <p className="font-serif text-muted text-base leading-relaxed">
                  If you are unsure which train to board, take{" "}
                  <strong className="font-sans font-bold text-dark">Local</strong>.
                  You may add a few minutes, but you are less likely to skip your
                  stop by accident.
                </p>
              </div>

              <div>
                <h3 className="font-sans font-bold text-dark text-base mb-3">
                  IC cards (Suica / PASMO)
                </h3>
                <p className="font-serif text-muted text-base leading-relaxed">
                  An IC card stores money. Tap the reader when you enter the paid
                  area and tap again when you exit. The system deducts the correct
                  fare. You do not need to buy a paper ticket for each trip.
                  Recharge at machines in stations when the balance runs low.
                  Suica and PASMO work the same way for most visitors; pick what is
                  easiest to get at the airport or station.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-display text-dark tracking-wide mb-4 text-xl sm:text-2xl">
              {`JR vs Metro (Don't Overthink This)`}
            </h2>
            <div className="font-serif text-muted text-base leading-relaxed space-y-4 max-w-xl">
              <p>
                <strong className="font-sans font-bold text-dark">JR</strong> runs
                many intercity and regional lines, including the Yamanote loop in
                Tokyo and useful connectors elsewhere.{" "}
                <strong className="font-sans font-bold text-dark">Metro</strong>{" "}
                (and other city subways) run dense networks under the city.
              </p>
              <p>
                They are different companies and different colors on maps. You do
                not need to memorize which is which. Navigation apps list the
                lines, transfers, and exits. Pay attention to line name,
                direction, and platform, not the owning company.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-dark tracking-wide mb-4 text-xl sm:text-2xl">
              What to Actually Use
            </h2>
            <div className="font-serif text-muted text-base leading-relaxed space-y-4 max-w-xl">
              <p>
                Use{" "}
                <strong className="font-sans font-bold text-dark">Google Maps</strong>{" "}
                or{" "}
                <strong className="font-sans font-bold text-dark">NAVITIME</strong>{" "}
                for trip planning. Workflow:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  Enter your start and end (or pick a place and
                  &quot;directions&quot;).
                </li>
                <li>
                  Read the suggested route: lines, transfer stations, and
                  approximate time.
                </li>
                <li>
                  Follow signs in the station toward the line and platform the app
                  shows.
                </li>
              </ol>
              <p>
                Check the platform screen and the train&apos;s destination display
                before you board. If the app and the signs disagree, trust the
                platform signs and station staff.
              </p>
            </div>
          </div>
        </div>
      }
      afterComparison={
        <div className="space-y-10">
          <div>
            <h2 className="font-display text-dark tracking-wide mb-4 text-xl sm:text-2xl">
              Situations That Matter
            </h2>
            <ul className="font-serif text-muted list-none pl-0 space-y-3 leading-relaxed max-w-xl">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                <strong className="font-sans font-bold text-dark">Rush hour:</strong>{" "}
                Trains fill up. Allow extra time. Move with the flow when boarding
                and exiting.
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                <strong className="font-sans font-bold text-dark">Last train:</strong>{" "}
                Many lines stop around midnight, not 24 hours. If you stay out
                late, confirm the last train home or budget for a taxi or night
                bus.
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                <strong className="font-sans font-bold text-dark">Shinkansen:</strong>{" "}
                Use for long-distance legs (for example, Tokyo to Osaka). Separate
                tickets or passes apply. It is not what you use for a few stops
                across town.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-dark tracking-wide mb-4 text-xl sm:text-2xl">
              Reality Check
            </h2>
            <div className="font-serif text-muted text-base leading-relaxed space-y-4 max-w-xl">
              <p>
                People expect they must &quot;understand Tokyo before they can ride
                trains.&quot; In practice you need a process, not a geography
                degree.
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Open maps.</li>
                <li>Follow the directions.</li>
                <li>Arrive.</li>
              </ol>
              <p>
                You will make small mistakes at first. Wrong platform, wrong exit.
                Fix it by rechecking the app and the overhead signs.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-dark tracking-wide mb-4 text-xl sm:text-2xl">
              Bottom Line
            </h2>
            <ul className="font-serif text-muted list-none pl-0 space-y-3 leading-relaxed max-w-xl">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Use trains for most trips.
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Use an IC card and tap in and out.
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Follow Google Maps or NAVITIME and read station signs.
              </li>
            </ul>
          </div>

          <GuideEndCta
            parentHref="/guides/japan-itinerary"
            parentLabel="Japan trip itinerary →"
          />
        </div>
      }
    />
  );
}
