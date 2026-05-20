import type { Metadata } from "next";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";
import { NextStepGuides } from "@/components/NextStepGuides";

export const metadata: Metadata = {
  title: "Best Area to Stay in Tokyo for First-Time Visitors",
  description:
    "Where to stay in Tokyo first trip: Shinjuku, Shibuya, Ueno, or Tokyo Station and Ginza. Quick picks by goal, why station access matters, and link to the full stay guide.",
};

export default function BestAreaTokyoFirstTimePage() {
  return (
    <GuideArticleShell
      comparisonItems={null}
      title={
        <h1
          className="guide-page-title"
        >
          Best Area to Stay in Tokyo for First-Time Visitors
        </h1>
      }
      intro={
        <div className="article-body max-w-2xl space-y-4">
          <p>
            Tokyo is huge, but first trips usually need one thing above all: easy trains
            to the places you already plan to visit.
          </p>
          <p>
            Use this page as a fast map of neighborhoods, then read the full guide for
            hotels, tradeoffs, and booking tips.
          </p>
        </div>
      }
      beforeComparison={
        <>
          <section className="mb-12">
            <h2 className="editorial-heading mb-4">
              Quick Answer
            </h2>
            <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Best overall: Shinjuku
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Best nightlife: Shibuya
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Best budget: Ueno
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Best clean/convenient: Tokyo Station/Ginza
              </li>
            </ul>
          </section>
        </>
      }
      afterComparison={
        <>
          <section className="mb-12">
            <h2 className="editorial-heading mb-4">
              Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse border border-[#d4c9b0] bg-white font-sans text-base text-dark">
                <thead>
                  <tr className="border-b border-[#d4c9b0] bg-cream">
                    <th className="text-left font-bold uppercase tracking-widest px-4 py-3 border-r border-[#d4c9b0]">
                      Area
                    </th>
                    <th className="text-left font-bold uppercase tracking-widest px-4 py-3 border-r border-[#d4c9b0]">
                      Best for
                    </th>
                    <th className="text-left font-bold uppercase tracking-widest px-4 py-3 border-r border-[#d4c9b0]">
                      Transit
                    </th>
                    <th className="text-left font-bold uppercase tracking-widest px-4 py-3">
                      Tradeoff
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted">
                  <tr className="border-b border-[#d4c9b0]">
                    <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                      Shinjuku
                    </td>
                    <td className="px-4 py-3 border-r border-[#d4c9b0]">
                      First trip default, food, day trips
                    </td>
                    <td className="px-4 py-3 border-r border-[#d4c9b0]">
                      Major JR and metro hub
                    </td>
                    <td className="px-4 py-3">Busy and easy to get lost near the station</td>
                  </tr>
                  <tr className="border-b border-[#d4c9b0]">
                    <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                      Shibuya
                    </td>
                    <td className="px-4 py-3 border-r border-[#d4c9b0]">
                      Nights out, younger energy, shopping
                    </td>
                    <td className="px-4 py-3 border-r border-[#d4c9b0]">
                      Strong metro and JR links
                    </td>
                    <td className="px-4 py-3">Loud pockets and higher demand on weekends</td>
                  </tr>
                  <tr className="border-b border-[#d4c9b0]">
                    <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                      Ueno
                    </td>
                    <td className="px-4 py-3 border-r border-[#d4c9b0]">
                      Lower room rates, museums, Asakusa access
                    </td>
                    <td className="px-4 py-3 border-r border-[#d4c9b0]">
                      JR and metro, Narita-friendly lines
                    </td>
                    <td className="px-4 py-3">Less polished than Ginza, grittier blocks</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                      Tokyo Stn / Ginza
                    </td>
                    <td className="px-4 py-3 border-r border-[#d4c9b0]">
                      Calm base, bullet trains, upscale dining
                    </td>
                    <td className="px-4 py-3 border-r border-[#d4c9b0]">
                      Tokyo Station is the spine of JR
                    </td>
                    <td className="px-4 py-3">Often pricier, quieter at night</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="editorial-heading mb-4">
              Why station access matters
            </h2>
            <div className="article-body space-y-3 max-w-2xl">
              <p>
                You will ride trains every day. A hotel ten minutes from a major hub beats
                a cheap room twenty minutes from the nearest useful line.
              </p>
              <p>
                Check walking time to the station on your map, not just the neighborhood
                name in the listing title.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="editorial-heading mb-4">
              Area breakdown
            </h2>
            <div className="article-body space-y-8 max-w-2xl">
              <div>
                <h3 className="font-display text-dark text-2xl tracking-wide mb-2">
                  Shinjuku
                </h3>
                <p>
                  Strong all rounder for first timers. You get dense dining, late options,
                  and straightforward connections west and north.
                </p>
              </div>
              <div>
                <h3 className="font-display text-dark text-2xl tracking-wide mb-2">
                  Shibuya
                </h3>
                <p>
                  Pick when you want the trip centered on nights out, music, and crossing
                  town to Harajuku or Daikanyama without thinking too hard.
                </p>
              </div>
              <div>
                <h3 className="font-display text-dark text-2xl tracking-wide mb-2">Ueno</h3>
                <p>
                  Sensible when budget matters and you still want a real station complex,
                  park space, and quick hops toward eastern highlights.
                </p>
              </div>
              <div>
                <h3 className="font-display text-dark text-2xl tracking-wide mb-2">
                  Tokyo Station and Ginza
                </h3>
                <p>
                  Best when you value quiet hallways, bullet train day trips, and walking
                  distance to polished shopping and classic sights.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="editorial-heading mb-4">
              Common Mistakes
            </h2>
            <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Booking &quot;Tokyo&quot; without checking which station is actually closest
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Chasing the lowest price far from a useful line
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Splitting hotels across the city to &quot;see everything&quot; and losing time
                to checkout and trains
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="editorial-heading mb-4">
              Bottom Line
            </h2>
            <ul className="article-body list-none space-y-3.5 pl-0 mb-8 max-w-2xl">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Start from Shinjuku unless you have a clear reason for another base
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Match the area to how you want nights and mornings to feel, not only daytime
                sightseeing
              </li>
            </ul>
          </section>

          <NextStepGuides guideId="best-area-tokyo-first-time" />

          <GuideEndCta
            parentHref="/guides/where-to-stay-tokyo"
            parentLabel="Where to stay in Tokyo →"
          />
        </>
      }
    />
  );
}
