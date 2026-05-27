import { TrackedCtaLink } from "@/components/TrackedCtaLink";
import { TrackedStartHereLink } from "@/components/TrackedStartHereLink";
import { GuidePageTitle } from "@/components/guides/GuidePageTitle";

const inlineLinkClass =
  "font-sans font-bold text-base text-rust hover:text-maroon transition-colors duration-150";

const ctaClass =
  "inline-block rounded-lg bg-maroon text-white font-sans font-bold text-base tracking-widest uppercase px-7 py-3.5 hover:bg-rust transition-colors duration-150";

/** Content from “Pick the Right City First” through “What to Look For”. */
export function WhereToStayArticleBeforeComparison() {
  return (
    <>
      <h2>Pick the Right City First</h2>
      <p className="article-body mb-3">
        Most first trips narrow to Tokyo, Osaka, or Kyoto. Use this as a starting
        frame, not a rule.
      </p>
      <ul className="article-body mb-3 list-none space-y-2.5 pl-0 last:mb-0">
        <li>
          <strong className="font-sans font-bold text-dark">Tokyo:</strong>{" "}
          Maximum convenience, dense transport, strong default base for a first
          visit.
        </li>
        <li>
          <strong className="font-sans font-bold text-dark">Osaka:</strong>{" "}
          Strong food scene, often a bit cheaper, central if you plan Kansai day
          trips.
        </li>
        <li>
          <strong className="font-sans font-bold text-dark">Kyoto:</strong>{" "}
          Temples and slower streets, less optimized as a pure transport hub than
          Tokyo or Osaka.
        </li>
      </ul>

      <h2>Then Pick the Right Area (This Matters More)</h2>
      <p className="article-body mb-3 last:mb-0">
        The neighborhood inside the city beats the city name on your booking. A
        bad area in a great city still wastes time every day. A good pocket near
        the right line beats a fancy address on the wrong side of town.
      </p>

      <h2>What to Look For</h2>
      <ul className="article-body mb-3 list-none space-y-2.5 pl-0 last:mb-0">
        <li>Near a major train station, not a 15-minute bus ride away.</li>
        <li>Direct or simple access from the airport when you can get it.</li>
        <li>
          Walkable basics: convenience stores, food, ATMs within a few minutes.
        </li>
        <li>
          Japan is generally safe at night. Still avoid isolated pockets if you
          will walk back late often.
        </li>
      </ul>
    </>
  );
}

/** Content from “Best Areas” through the start-here CTA link. */
export function WhereToStayArticleAfterComparison() {
  return (
    <>
      <h2>Best Areas (Keep It Simple)</h2>

      <h3>Tokyo</h3>
      <ul className="article-body mb-3 list-none space-y-2.5 pl-0 last:mb-0">
        <li>
          <strong className="font-sans font-bold text-dark">Shinjuku:</strong>{" "}
          Strong all-around pick, major hub, easy connections.
        </li>
        <li>
          <strong className="font-sans font-bold text-dark">Shibuya:</strong>{" "}
          Younger crowd, nightlife, still very connected.
        </li>
        <li>
          <strong className="font-sans font-bold text-dark">Ueno:</strong> Often
          cheaper, straightforward for first-timers on a budget.
        </li>
      </ul>
      <p className="article-body mb-3">
        <TrackedCtaLink
          href="/guides/where-to-stay-tokyo"
          label="hotel"
          className={inlineLinkClass}
        >
          Where to stay in Tokyo (full guide) →
        </TrackedCtaLink>
        {" · "}
        <TrackedCtaLink
          href="/guides/best-area-tokyo-first-time"
          label="hotel"
          className={inlineLinkClass}
        >
          Best area in Tokyo for first timers →
        </TrackedCtaLink>
        {" · "}
        <TrackedCtaLink
          href="/guides/shinjuku-vs-shibuya"
          label="hotel"
          className={inlineLinkClass}
        >
          Shinjuku vs Shibuya →
        </TrackedCtaLink>
      </p>

      <h3>Osaka</h3>
      <ul className="article-body mb-3 list-none space-y-2.5 pl-0 last:mb-0">
        <li>
          <strong className="font-sans font-bold text-dark">Namba:</strong> Food,
          central, easy tourist flow.
        </li>
        <li>
          <strong className="font-sans font-bold text-dark">Shinsaibashi:</strong>{" "}
          Shopping and walking distance to plenty of options.
        </li>
      </ul>

      <h3>Kyoto</h3>
      <ul className="article-body mb-3 list-none space-y-2.5 pl-0 last:mb-0">
        <li>
          <strong className="font-sans font-bold text-dark">Kawaramachi:</strong>{" "}
          Central and walkable for eating and evening strolls.
        </li>
        <li>
          <strong className="font-sans font-bold text-dark">Kyoto Station:</strong>{" "}
          Best when you care about train access above all else.
        </li>
      </ul>

      <h2>Hotel vs Airbnb</h2>
      <p className="article-body mb-3">
        <strong className="font-sans font-bold text-dark">Hotels:</strong> Straight
        check-in, front desks that speak tourist logistics, easy luggage
        forwarding, simple for short stays.
      </p>
      <p className="article-body mb-3">
        <strong className="font-sans font-bold text-dark">Airbnb:</strong> More
        space, can win on price for groups, more steps on rules, keys, and trash.
      </p>
      <p className="article-body mb-3 last:mb-0">
        <strong className="font-sans font-bold text-dark">
          First trip: default to a hotel unless you have a clear reason not to.
        </strong>
      </p>

      <h2>Big Mistakes to Avoid</h2>
      <ul className="article-body mb-3 list-none space-y-2.5 pl-0 last:mb-0">
        <li>Booking far from stations to save a small amount per night.</li>
        <li>Chasing the lowest nightly rate in a dead zone for transit.</li>
        <li>Switching hotels every night without a real reason.</li>
      </ul>

      <h2>Reality Check</h2>
      <p className="article-body mb-3">
        You do not need a perfect neighborhood. Japan&apos;s trains cover a lot of
        bad guesses.
      </p>
      <p className="article-body mb-3 last:mb-0">
        Still, life is easier when you start near a strong station. Fix that
        first, then stop tweaking.
      </p>

      <h2>Bottom Line</h2>
      <ul className="article-body mb-3 list-none space-y-2.5 pl-0 last:mb-0">
        <li>Choose city, then area near a major station.</li>
        <li>Stop optimizing after two sensible options.</li>
        <li>Convenience beats a slightly cheaper room in the wrong place.</li>
      </ul>

      <p className="mb-3 last:mb-0">
        <TrackedStartHereLink className={ctaClass}>
          Finish trip planning in the right order →
        </TrackedStartHereLink>
      </p>
    </>
  );
}

export function WhereToStayArticle() {
  return (
    <div className="mdx-guide-body min-w-0 lg:max-w-2xl">
      <GuidePageTitle title="Where to Stay in Japan (Tokyo, Osaka, Kyoto)" />

      <div className="article-body space-y-4 mb-6">
        <p>
          Maps and neighborhood lists make this feel harder than it is. Pick a
          city, then pick an area near a strong station. That decision drives
          almost everything else.
        </p>
      </div>

      <WhereToStayArticleBeforeComparison />
      <WhereToStayArticleAfterComparison />
    </div>
  );
}
