import type { Metadata } from "next";
import Link from "next/link";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";

export const metadata: Metadata = {
  title: "Shinjuku vs Shibuya: Where to Stay in Tokyo?",
  description:
    "Shinjuku vs Shibuya for Tokyo hotels: transport, nightlife, first-timers, and which area to pick when you want a fast, simple decision.",
};

export default function ShinjukuVsShibuyaPage() {
  return (
    <GuideArticleShell
      comparisonItems={null}
      title={
        <h1
          className="font-display text-dark tracking-wide leading-tight mb-8"
          style={{ fontSize: "clamp(36px, 5.5vw, 56px)" }}
        >
          Shinjuku vs Shibuya: Where to Stay in Tokyo?
        </h1>
      }
      intro={
        <div className="article-body max-w-2xl space-y-4">
          <p>
            Most first-time visitors narrow Tokyo down to Shinjuku or Shibuya.
            That is a reasonable shortlist.
          </p>
          <p>Both are good. Neither is a mistake.</p>
          <div className="flex flex-col gap-2 pt-2">
            <Link
              href="/guides/where-to-stay-tokyo"
              className="font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150 w-fit"
            >
              Full Tokyo stay guide →
            </Link>
            <Link
              href="/guides/best-area-tokyo-first-time"
              className="font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150 w-fit"
            >
              Best area in Tokyo for first timers →
            </Link>
          </div>
        </div>
      }
      beforeComparison={
        <>
          <section className="mb-12">
            <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
              Quick Answer
            </h2>
            <ul className="article-body list-none space-y-3.5 pl-0 mb-6 max-w-2xl">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Best overall: Shinjuku
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Best for nightlife: Shibuya
              </li>
            </ul>
            <p className="font-sans font-bold text-dark text-lg max-w-2xl">
              If unsure, choose Shinjuku.
            </p>
          </section>
        </>
      }
      afterComparison={
        <>
          <section className="mb-12">
            <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
              Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse border border-[#d4c9b0] bg-white font-sans text-base text-dark">
                <thead>
                  <tr className="border-b border-[#d4c9b0] bg-cream">
                    <th className="text-left font-bold uppercase tracking-widest px-4 py-3 border-r border-[#d4c9b0]">
                      Feature
                    </th>
                    <th className="text-left font-bold uppercase tracking-widest px-4 py-3 border-r border-[#d4c9b0]">
                      Shinjuku
                    </th>
                    <th className="text-left font-bold uppercase tracking-widest px-4 py-3">
                      Shibuya
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted">
                  <tr className="border-b border-[#d4c9b0]">
                    <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                      Transport
                    </td>
                    <td className="px-4 py-3 border-r border-[#d4c9b0]">
                      Excellent
                    </td>
                    <td className="px-4 py-3">Good</td>
                  </tr>
                  <tr className="border-b border-[#d4c9b0]">
                    <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                      Nightlife
                    </td>
                    <td className="px-4 py-3 border-r border-[#d4c9b0]">
                      Strong
                    </td>
                    <td className="px-4 py-3">Very strong</td>
                  </tr>
                  <tr className="border-b border-[#d4c9b0]">
                    <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                      Convenience
                    </td>
                    <td className="px-4 py-3 border-r border-[#d4c9b0]">High</td>
                    <td className="px-4 py-3">Medium</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                      First-time friendly
                    </td>
                    <td className="px-4 py-3 border-r border-[#d4c9b0]">Yes</td>
                    <td className="px-4 py-3">Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
              Shinjuku
            </h2>
            <p className="font-sans font-bold text-dark text-base uppercase tracking-widest mb-2">
              Pros
            </p>
            <ul className="article-body list-none space-y-3 pl-0 mb-6 max-w-2xl">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Major transport hub
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Easy access everywhere
              </li>
            </ul>
            <p className="font-sans font-bold text-dark text-base uppercase tracking-widest mb-2">
              Cons
            </p>
            <ul className="article-body list-none space-y-3 pl-0 max-w-2xl">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Busy
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
              Shibuya
            </h2>
            <p className="font-sans font-bold text-dark text-base uppercase tracking-widest mb-2">
              Pros
            </p>
            <ul className="article-body list-none space-y-3 pl-0 mb-6 max-w-2xl">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Trendy
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Nightlife
              </li>
            </ul>
            <p className="font-sans font-bold text-dark text-base uppercase tracking-widest mb-2">
              Cons
            </p>
            <ul className="article-body list-none space-y-3 pl-0 max-w-2xl">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Slightly less convenient transport
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
              What You Should Choose
            </h2>
            <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                First-time: Shinjuku
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Younger vibe: Shibuya
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
              Bottom Line
            </h2>
            <ul className="article-body list-none space-y-3.5 pl-0 mb-8 max-w-2xl">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Both work
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Shinjuku is safer choice
              </li>
            </ul>
          </section>

          <GuideEndCta
            parentHref="/guides/where-to-stay-tokyo"
            parentLabel="Where to stay in Tokyo →"
          />
        </>
      }
    />
  );
}
