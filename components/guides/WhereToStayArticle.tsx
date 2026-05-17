import { TrackedCtaLink } from "@/components/TrackedCtaLink";
import { TrackedStartHereLink } from "@/components/TrackedStartHereLink";

const ctaClass =
  "inline-block bg-maroon text-white font-sans font-bold text-base tracking-widest uppercase px-7 py-3.5 hover:bg-rust transition-colors duration-150";

/** Content from “Pick the Right City First” through “What to Look For”. */
export function WhereToStayArticleBeforeComparison() {
  return (
    <>
      <div>
        <h3 className="font-display text-dark tracking-wide mb-4 text-2xl sm:text-3xl">
          Pick the Right City First
        </h3>
        <p className="article-body mb-4">
          Most first trips narrow to Tokyo, Osaka, or Kyoto. Use this as a
          starting frame, not a rule.
        </p>
        <ul className="article-body list-none space-y-3.5 pl-0">
          <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
            <strong className="font-sans font-bold text-dark">Tokyo:</strong>{" "}
            Maximum convenience, dense transport, strong default base for a first
            visit.
          </li>
          <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
            <strong className="font-sans font-bold text-dark">Osaka:</strong>{" "}
            Strong food scene, often a bit cheaper, central if you plan Kansai
            day trips.
          </li>
          <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
            <strong className="font-sans font-bold text-dark">Kyoto:</strong>{" "}
            Temples and slower streets, less optimized as a pure transport hub
            than Tokyo or Osaka.
          </li>
        </ul>
      </div>

      <div>
        <h3 className="font-display text-dark tracking-wide mb-4 text-2xl sm:text-3xl">
          Then Pick the Right Area (This Matters More)
        </h3>
        <p className="article-body">
          The neighborhood inside the city beats the city name on your booking.
          A bad area in a great city still wastes time every day. A good pocket
          near the right line beats a fancy address on the wrong side of town.
        </p>
      </div>

      <div>
        <h3 className="font-display text-dark tracking-wide mb-4 text-2xl sm:text-3xl">
          What to Look For
        </h3>
        <ul className="article-body list-none space-y-3.5 pl-0">
          <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
            Near a major train station, not a 15-minute bus ride away.
          </li>
          <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
            Direct or simple access from the airport when you can get it.
          </li>
          <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
            Walkable basics: convenience stores, food, ATMs within a few
            minutes.
          </li>
          <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
            Japan is generally safe at night. Still avoid isolated pockets if you
            will walk back late often.
          </li>
        </ul>
      </div>
    </>
  );
}

/** Content from “Best Areas” through the start-here CTA link. */
export function WhereToStayArticleAfterComparison() {
  return (
    <>
      <div>
        <h3 className="font-display text-dark tracking-wide mb-4 text-2xl sm:text-3xl">
          Best Areas (Keep It Simple)
        </h3>
        <p className="font-sans font-bold text-dark text-base mb-2 tracking-wide uppercase">
          Tokyo
        </p>
        <ul className="article-body list-none space-y-3.5 pl-0 mb-8">
          <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
            <strong className="font-sans font-bold text-dark">Shinjuku:</strong>{" "}
            Strong all-around pick, major hub, easy connections.
          </li>
          <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
            <strong className="font-sans font-bold text-dark">Shibuya:</strong>{" "}
            Younger crowd, nightlife, still very connected.
          </li>
          <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
            <strong className="font-sans font-bold text-dark">Ueno:</strong> Often
            cheaper, straightforward for first-timers on a budget.
          </li>
        </ul>
        <div className="flex flex-col gap-2 mt-4 mb-8">
          <TrackedCtaLink
            href="/guides/where-to-stay-tokyo"
            label="hotel"
            className="font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150 w-fit"
          >
            Where to stay in Tokyo (full guide) →
          </TrackedCtaLink>
          <TrackedCtaLink
            href="/guides/best-area-tokyo-first-time"
            label="hotel"
            className="font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150 w-fit"
          >
            Best area in Tokyo for first timers →
          </TrackedCtaLink>
          <TrackedCtaLink
            href="/guides/shinjuku-vs-shibuya"
            label="hotel"
            className="font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150 w-fit"
          >
            Shinjuku vs Shibuya →
          </TrackedCtaLink>
        </div>
        <p className="font-sans font-bold text-dark text-base mb-2 tracking-wide uppercase">
          Osaka
        </p>
        <ul className="article-body list-none space-y-3.5 pl-0 mb-8">
          <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
            <strong className="font-sans font-bold text-dark">Namba:</strong>{" "}
            Food, central, easy tourist flow.
          </li>
          <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
            <strong className="font-sans font-bold text-dark">
              Shinsaibashi:
            </strong>{" "}
            Shopping and walking distance to plenty of options.
          </li>
        </ul>
        <p className="font-sans font-bold text-dark text-base mb-2 tracking-wide uppercase">
          Kyoto
        </p>
        <ul className="article-body list-none space-y-3.5 pl-0">
          <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
            <strong className="font-sans font-bold text-dark">
              Kawaramachi:
            </strong>{" "}
            Central and walkable for eating and evening strolls.
          </li>
          <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
            <strong className="font-sans font-bold text-dark">
              Kyoto Station:
            </strong>{" "}
            Best when you care about train access above all else.
          </li>
        </ul>
      </div>

      <div>
        <h3 className="font-display text-dark tracking-wide mb-4 text-2xl sm:text-3xl">
          Hotel vs Airbnb
        </h3>
        <p className="article-body mb-4">
          <strong className="font-sans font-bold text-dark">Hotels:</strong>{" "}
          Straight check-in, front desks that speak tourist logistics, easy
          luggage forwarding, simple for short stays.
        </p>
        <p className="article-body mb-4">
          <strong className="font-sans font-bold text-dark">Airbnb:</strong> More
          space, can win on price for groups, more steps on rules, keys, and
          trash.
        </p>
        <p className="font-sans font-bold text-dark text-lg">
          First trip: default to a hotel unless you have a clear reason not to.
        </p>
      </div>

      <div>
        <h3 className="font-display text-dark tracking-wide mb-4 text-2xl sm:text-3xl">
          Big Mistakes to Avoid
        </h3>
        <ul className="article-body list-none space-y-3.5 pl-0">
          <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
            Booking far from stations to save a small amount per night.
          </li>
          <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
            Chasing the lowest nightly rate in a dead zone for transit.
          </li>
          <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
            Switching hotels every night without a real reason.
          </li>
        </ul>
      </div>

      <div>
        <h3 className="font-display text-dark tracking-wide mb-4 text-2xl sm:text-3xl">
          Reality Check
        </h3>
        <div className="article-body space-y-4">
          <p>
            You do not need a perfect neighborhood. Japan&apos;s trains cover a
            lot of bad guesses.
          </p>
          <p>
            Still, life is easier when you start near a strong station. Fix that
            first, then stop tweaking.
          </p>
        </div>
      </div>

      <div>
        <h3 className="font-display text-dark tracking-wide mb-4 text-2xl sm:text-3xl">
          Bottom Line
        </h3>
        <ul className="article-body list-none space-y-3.5 pl-0">
          <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
            Choose city, then area near a major station.
          </li>
          <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
            Stop optimizing after two sensible options.
          </li>
          <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
            Convenience beats a slightly cheaper room in the wrong place.
          </li>
        </ul>
      </div>

      <TrackedStartHereLink className={ctaClass}>
        Finish trip planning in the right order →
      </TrackedStartHereLink>
    </>
  );
}

export function WhereToStayArticle() {
  return (
    <section className="space-y-10 max-w-xl">
      <h2
        className="font-display text-dark tracking-wide"
        style={{ fontSize: "clamp(32px, 4.5vw, 44px)" }}
      >
        {`3. Decide Where You're Staying`}
      </h2>

      <div className="article-body space-y-4">
        <p>
          Maps and neighborhood lists make this feel harder than it is. Pick a
          city, then pick an area near a strong station. That decision drives
          almost everything else.
        </p>
      </div>

      <WhereToStayArticleBeforeComparison />
      <WhereToStayArticleAfterComparison />
    </section>
  );
}
