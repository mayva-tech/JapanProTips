import type { Metadata } from "next";
import Link from "next/link";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";
import { NextStepGuides } from "@/components/NextStepGuides";

export const metadata: Metadata = {
  title: "Narita to Tokyo: Best Way to Get to the City",
  description:
    "Narita to Tokyo: Narita Express vs Skyliner vs bus vs taxi for Shinjuku, Ueno, luggage, and first-time visitors. Fast picks and what to avoid.",
};

export default function NaritaToTokyoPage() {
  return (
    <GuideArticleShell
      comparisonItems={null}
      title={
        <h1
          className="guide-page-title"
        >
          Narita to Tokyo: Best Way to Get to the City
        </h1>
      }
      intro={
        <div className="article-body max-w-2xl space-y-4">
          <p>
            Narita is far from central Tokyo. The good news is you only need to
            pick one main option and follow signs.
          </p>
          <p>Match the option to your hotel area and how much luggage you are carrying.</p>
          <p>
            <Link
              href="/guides/haneda-to-tokyo"
              className="font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
            >
              Flying into Haneda instead? Haneda to Tokyo guide →
            </Link>
          </p>
          <p>
            <Link
              href="/guides/japan-airport-to-city"
              className="font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
            >
              Full Japan airport to hotel guide (Narita, Haneda, Kansai) →
            </Link>
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
                Shinjuku, Shibuya, Tokyo Station: Narita Express
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Ueno: Keisei Skyliner
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Heavy luggage: Airport bus
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
                      Narita Express
                    </td>
                    <td className="px-4 py-3 border-r border-[#d4c9b0]">
                      Major JR stations west side
                    </td>
                    <td className="px-4 py-3 border-r border-[#d4c9b0]">
                      Costs more than basic train
                    </td>
                    <td className="px-4 py-3">Comfortable, clear for first-timers</td>
                  </tr>
                  <tr className="border-b border-[#d4c9b0]">
                    <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                      Skyliner
                    </td>
                    <td className="px-4 py-3 border-r border-[#d4c9b0]">
                      Ueno and north/east side transfers
                    </td>
                    <td className="px-4 py-3 border-r border-[#d4c9b0]">
                      Not always one seat to your final hotel
                    </td>
                    <td className="px-4 py-3">Fast to Nippori / Ueno area</td>
                  </tr>
                  <tr className="border-b border-[#d4c9b0]">
                    <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                      Airport bus
                    </td>
                    <td className="px-4 py-3 border-r border-[#d4c9b0]">
                      Heavy bags, hotel near a stop
                    </td>
                    <td className="px-4 py-3 border-r border-[#d4c9b0]">
                      Traffic can add time
                    </td>
                    <td className="px-4 py-3">Less walking with suitcases</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                      Taxi
                    </td>
                    <td className="px-4 py-3 border-r border-[#d4c9b0]">
                      Late night, small group splitting cost
                    </td>
                    <td className="px-4 py-3 border-r border-[#d4c9b0]">
                      Expensive from Narita
                    </td>
                    <td className="px-4 py-3">Use sparingly</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="editorial-heading mb-4">
              Narita Express
            </h2>
            <div className="article-body space-y-3 max-w-2xl">
              <p>
                Good default when you are heading to Shinjuku, Shibuya, or Tokyo
                Station and you want one comfortable train with space for bags.
              </p>
              <p>Reserve a seat if the product you buy includes that step.</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="editorial-heading mb-4">
              Keisei Skyliner
            </h2>
            <div className="article-body space-y-3 max-w-2xl">
              <p>
                Strong when Ueno is your first stop or you plan a short transfer from
                the Ueno / Nippori side of the city.
              </p>
              <p>Fast. You may still need a metro transfer to your hotel.</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="editorial-heading mb-4">
              Airport bus
            </h2>
            <div className="article-body space-y-3 max-w-2xl">
              <p>
                Worth considering when you do not want stairs and train transfers with
                two large suitcases.
              </p>
              <p>Check that your hotel area is on the route.</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="editorial-heading mb-4">
              Taxi
            </h2>
            <div className="article-body space-y-3 max-w-2xl">
              <p>All the way to central Tokyo is pricey from Narita.</p>
              <p>Reasonable use case: late arrival or a short taxi after a train to the nearest station.</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="editorial-heading mb-4">
              Common Mistakes
            </h2>
            <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Picking the cheapest route without checking transfers
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Not knowing which station is closest to the hotel
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Dragging huge bags through crowded commuter trains at rush hour
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="editorial-heading mb-4">
              Bottom Line
            </h2>
            <ul className="article-body list-none space-y-3.5 pl-0 mb-8 max-w-2xl">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Match train vs bus to your hotel station and luggage
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Use maps to confirm the route before you commit at the ticket counter
              </li>
            </ul>
          </section>

          <NextStepGuides guideId="narita-to-tokyo" />

          <GuideEndCta
            parentHref="/guides/japan-airport-to-city"
            parentLabel="Airport to hotel in Japan →"
          />
        </>
      }
    />
  );
}
