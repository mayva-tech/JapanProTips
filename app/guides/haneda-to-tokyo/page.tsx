import type { Metadata } from "next";
import Link from "next/link";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";

export const metadata: Metadata = {
  title: "Haneda to Tokyo: Best Way to Get to Your Hotel",
  description:
    "Haneda to Tokyo: Keikyu, Tokyo Monorail, bus, or taxi for central Tokyo and your hotel. Simple picks for first-time visitors and when to skip the taxi.",
};

export default function HanedaToTokyoPage() {
  return (
    <GuideArticleShell
      comparisonItems={null}
      title={
        <h1
          className="font-display text-dark tracking-wide leading-tight mb-8"
          style={{ fontSize: "clamp(32px, 5vw, 52px)" }}
        >
          Haneda to Tokyo: Best Way to Get to Your Hotel
        </h1>
      }
      intro={
        <div className="font-serif text-muted text-base leading-relaxed max-w-2xl space-y-4">
          <p>
            Haneda is close to the city compared with Narita. That means trains are
            usually the fastest and cheapest option.
          </p>
          <p>Pick based on your hotel area, time of day, and how much luggage you have.</p>
          <p>
            <Link
              href="/guides/narita-to-tokyo"
              className="font-sans font-bold text-sm tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
            >
              Flying into Narita instead? Narita to Tokyo guide →
            </Link>
          </p>
          <p>
            <Link
              href="/guides/japan-airport-to-city"
              className="font-sans font-bold text-sm tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
            >
              Full Japan airport to hotel guide (Narita, Haneda, Kansai) →
            </Link>
          </p>
        </div>
      }
      beforeComparison={
        <>
          <section className="mb-12">
            <h2 className="font-display text-dark tracking-wide text-3xl mb-5">
              Quick Answer
            </h2>
            <ul className="font-serif text-muted list-none pl-0 space-y-3 leading-relaxed max-w-2xl">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Train or monorail for most travelers
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Taxi only late night or heavy luggage
              </li>
            </ul>
          </section>
        </>
      }
      afterComparison={
        <>
          <section className="mb-12">
            <h2 className="font-display text-dark tracking-wide text-3xl mb-5">
              Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse border border-[#d4c9b0] bg-white font-sans text-sm text-dark">
                <thead>
                  <tr className="border-b border-[#d4c9b0] bg-cream">
                    <th className="text-left font-bold uppercase tracking-widest px-4 py-3 border-r border-[#d4c9b0]">
                      Option
                    </th>
                    <th className="text-left font-bold uppercase tracking-widest px-4 py-3 border-r border-[#d4c9b0]">
                      Best for
                    </th>
                    <th className="text-left font-bold uppercase tracking-widest px-4 py-3 border-r border-[#d4c9b0]">
                      Tradeoff
                    </th>
                    <th className="text-left font-bold uppercase tracking-widest px-4 py-3">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted">
                  <tr className="border-b border-[#d4c9b0]">
                    <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                      Keikyu Line
                    </td>
                    <td className="px-4 py-3 border-r border-[#d4c9b0]">
                      South Tokyo, Shinagawa, quick JR transfers
                    </td>
                    <td className="px-4 py-3 border-r border-[#d4c9b0]">
                      Can be crowded at peak times
                    </td>
                    <td className="px-4 py-3">Often the simplest rail path</td>
                  </tr>
                  <tr className="border-b border-[#d4c9b0]">
                    <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                      Tokyo Monorail
                    </td>
                    <td className="px-4 py-3 border-r border-[#d4c9b0]">
                      Hamamatsucho and JR Yamanote connections
                    </td>
                    <td className="px-4 py-3 border-r border-[#d4c9b0]">
                      One extra transfer for many hotels
                    </td>
                    <td className="px-4 py-3">Easy to follow from the airport</td>
                  </tr>
                  <tr className="border-b border-[#d4c9b0]">
                    <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                      Airport bus
                    </td>
                    <td className="px-4 py-3 border-r border-[#d4c9b0]">
                      Heavy luggage, hotel near a stop
                    </td>
                    <td className="px-4 py-3 border-r border-[#d4c9b0]">
                      Traffic and fixed schedules
                    </td>
                    <td className="px-4 py-3">Less walking with big bags</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                      Taxi
                    </td>
                    <td className="px-4 py-3 border-r border-[#d4c9b0]">
                      Late night, door to door
                    </td>
                    <td className="px-4 py-3 border-r border-[#d4c9b0]">
                      Cost adds up fast
                    </td>
                    <td className="px-4 py-3">Fine for short hops, think twice for long rides</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-dark tracking-wide text-3xl mb-5">
              Keikyu Line
            </h2>
            <div className="font-serif text-muted text-base leading-relaxed space-y-3 max-w-2xl">
              <p>
                Often the first choice when you want a direct rail ride toward
                Shinagawa and connections into the rest of Tokyo.
              </p>
              <p>Follow your map app for the exact line and platform.</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-dark tracking-wide text-3xl mb-5">
              Tokyo Monorail
            </h2>
            <div className="font-serif text-muted text-base leading-relaxed space-y-3 max-w-2xl">
              <p>
                Drops you toward Hamamatsucho with a clean transfer path onto JR for
                many central neighborhoods.
              </p>
              <p>Good when your route already lines up with that transfer pattern.</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-dark tracking-wide text-3xl mb-5">
              Airport bus
            </h2>
            <div className="font-serif text-muted text-base leading-relaxed space-y-3 max-w-2xl">
              <p>Useful when you want fewer steps between curb and hotel lobby.</p>
              <p>Confirm the stop list matches your area before you buy a ticket.</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-dark tracking-wide text-3xl mb-5">
              Taxi
            </h2>
            <div className="font-serif text-muted text-base leading-relaxed space-y-3 max-w-2xl">
              <p>Haneda to central Tokyo is cheaper than Narita, but it is still a taxi fare.</p>
              <p>Best when you land exhausted, it is late, or you split the cost.</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-dark tracking-wide text-3xl mb-5">
              Common Mistakes
            </h2>
            <ul className="font-serif text-muted list-none pl-0 space-y-3 leading-relaxed max-w-2xl">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Taking a taxi by default when a train would be faster
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Not checking which station is closest to the hotel before you board
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Boarding the wrong train type on a line with multiple services
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-dark tracking-wide text-3xl mb-5">
              Bottom Line
            </h2>
            <ul className="font-serif text-muted list-none pl-0 space-y-3 leading-relaxed mb-8 max-w-2xl">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Start with Keikyu or Monorail unless you have a clear bus or taxi reason
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Let your map pick the fastest route, then match signs at the station
              </li>
            </ul>
          </section>

          <GuideEndCta
            parentHref="/guides/japan-airport-to-city"
            parentLabel="Airport to hotel in Japan →"
          />
        </>
      }
    />
  );
}
