import type { Metadata } from "next";
import Link from "next/link";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";

export const metadata: Metadata = {
  title:
    "Japan Train Mistakes Tourists Make (And How to Avoid Them)",
  description:
    "Wrong train type, bad transfers, IC card confusion: common Japan train mistakes tourists make and how to fix them with maps, platforms, and simple habits.",
};

export default function JapanTrainMistakesPage() {
  return (
    <GuideArticleShell
      title={
        <h1
          className="font-display text-dark tracking-wide leading-tight mb-8"
          style={{ fontSize: "clamp(36px, 5.5vw, 56px)" }}
        >
          Japan Train Mistakes Tourists Make (And How to Avoid Them)
        </h1>
      }
      intro={
        <div className="article-body max-w-2xl space-y-4">
          <p>
            Japan trains are not hard. Most problems come from small habits, not
            from the network itself. Mistakes still happen, and they are normal.
          </p>
          <p>
            <Link
              href="/guides/suica-vs-pasmo"
              className="font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
            >
              Suica vs PASMO →
            </Link>
          </p>
        </div>
      }
      beforeComparison={
        <>
          <section className="mb-12">
            <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
              Most Common Mistakes
            </h2>
            <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Taking the wrong train type
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Ignoring direction/platform
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Not using IC card
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Getting confused by transfers
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Overthinking everything
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
              Why These Happen
            </h2>
            <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Too many options
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Over-research
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Fear of getting it wrong
              </li>
            </ul>
          </section>
        </>
      }
      afterComparison={
        <>
          <section className="mb-12">
            <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
              How to Avoid Them
            </h2>
            <ul className="article-body list-none space-y-3.5 pl-0 mb-8 max-w-2xl">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Use Google Maps
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Follow platform + line
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Take Local if unsure
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
              Reality Check
            </h2>
            <div className="article-body space-y-4 max-w-2xl">
              <p>Everyone makes small mistakes.</p>
              <p>Trains are frequent.</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
              Bottom Line
            </h2>
            <ul className="article-body list-none space-y-3.5 pl-0 mb-8 max-w-2xl">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Don&apos;t panic
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Follow directions
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Keep it simple
              </li>
            </ul>
          </section>

          <GuideEndCta
            parentHref="/guides/japan-trains"
            parentLabel="How to use trains in Japan →"
          />
        </>
      }
    />
  );
}
