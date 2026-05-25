import type { Metadata } from "next";
import Link from "next/link";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";
import { NextStepGuides } from "@/components/NextStepGuides";
import { TrackedOutboundSimLink } from "@/components/TrackedOutboundSimLink";

export const metadata: Metadata = {
  title:
    "Airalo vs Ubigi Japan (Which eSIM Is Better in 2026?)",
  description:
    "Airalo vs Ubigi for Japan eSIM in 2026: quick pick, setup, speed, reliability, and which one most travelers should use.",
};

const AIRALO_URL = "https://www.airalo.com/";
const UBIGI_URL = "https://www.ubigi.com/";

const outboundCta =
  "font-sans font-bold text-rust text-base tracking-wide hover:text-maroon transition-colors duration-150 border-b-2 border-rust hover:border-maroon pb-0.5";

export default function AiraloVsUbigiJapanPage() {
  return (
    <GuideArticleShell
      comparisonItems={null}
      title={
        <h1
          className="guide-page-title"
        >
          Airalo vs Ubigi Japan (Which eSIM Is Better in 2026?)
        </h1>
      }
      intro={
        <div className="article-body space-y-4 max-w-2xl">
          <p>Both Airalo and Ubigi work in Japan.</p>
          <p>
            Choice depends on simple factors: setup speed, stability preference,
            and how technical you want the app to feel.
          </p>
          <p>You don&apos;t need to overthink this.</p>
          <div className="flex flex-col gap-2 pt-2">
            <Link
              href="/guides/esim-vs-pocket-wifi-japan"
              className="font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150 w-fit"
            >
              eSIM vs pocket WiFi →
            </Link>
            <Link
              href="/guides/do-you-need-sim-japan"
              className="font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150 w-fit"
            >
              Do you need a SIM in Japan? →
            </Link>
          </div>
        </div>
      }
      beforeComparison={
        <>
        <section className="mb-6">
          <h2 className="editorial-heading mb-4">
            Quick Answer (Don&apos;t Overthink It)
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 mb-6 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Best overall: Airalo (simplest setup)
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Best for stability: Ubigi
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Most travelers: Airalo is enough
            </li>
          </ul>
          <p className="font-sans font-bold text-dark text-lg mb-6 max-w-2xl">
            If you just want something that works, use Airalo.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <TrackedOutboundSimLink
              href={AIRALO_URL}
              className={outboundCta}
            >
              Airalo eSIM →
            </TrackedOutboundSimLink>
            <TrackedOutboundSimLink
              href={UBIGI_URL}
              className={outboundCta}
            >
              Ubigi eSIM →
            </TrackedOutboundSimLink>
          </div>
        </section>
        </>
      }
      afterComparison={
        <>
        <section className="mb-6">
          <h2 className="editorial-heading mb-4">
            Comparison (Simple and Practical)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse border border-[#d4c9b0] bg-white font-sans text-base text-dark">
              <thead>
                <tr className="border-b border-[#d4c9b0] bg-cream">
                  <th className="text-left font-bold uppercase tracking-widest px-4 py-3 border-r border-[#d4c9b0]">
                    Feature
                  </th>
                  <th className="text-left font-bold uppercase tracking-widest px-4 py-3 border-r border-[#d4c9b0]">
                    Airalo
                  </th>
                  <th className="text-left font-bold uppercase tracking-widest px-4 py-3">
                    Ubigi
                  </th>
                </tr>
              </thead>
              <tbody className="text-muted">
                <tr className="border-b border-[#d4c9b0]">
                  <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                    Setup
                  </td>
                  <td className="px-4 py-3 border-r border-[#d4c9b0]">
                    Very easy
                  </td>
                  <td className="px-4 py-3">Easy</td>
                </tr>
                <tr className="border-b border-[#d4c9b0]">
                  <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                    App
                  </td>
                  <td className="px-4 py-3 border-r border-[#d4c9b0]">
                    Simple
                  </td>
                  <td className="px-4 py-3">Slightly more technical</td>
                </tr>
                <tr className="border-b border-[#d4c9b0]">
                  <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                    Speed
                  </td>
                  <td className="px-4 py-3 border-r border-[#d4c9b0]">Good</td>
                  <td className="px-4 py-3">Good to very good</td>
                </tr>
                <tr className="border-b border-[#d4c9b0]">
                  <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                    Reliability
                  </td>
                  <td className="px-4 py-3 border-r border-[#d4c9b0]">Good</td>
                  <td className="px-4 py-3">Slightly better</td>
                </tr>
                <tr className="border-b border-[#d4c9b0]">
                  <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                    Pricing
                  </td>
                  <td className="px-4 py-3 border-r border-[#d4c9b0]">
                    Competitive
                  </td>
                  <td className="px-4 py-3">Competitive</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                    Best for
                  </td>
                  <td className="px-4 py-3 border-r border-[#d4c9b0]">
                    Most travelers
                  </td>
                  <td className="px-4 py-3">Heavy users / stability</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="editorial-heading mb-4">
            What Actually Matters
          </h2>
          <div className="space-y-8 max-w-2xl">
            <div>
              <h3 className="font-sans font-bold text-dark text-lg mb-3">
                Setup
              </h3>
              <div className="article-body space-y-3">
                <p>Airalo is faster and easier.</p>
                <p>Ubigi may need extra steps.</p>
              </div>
            </div>
            <div>
              <h3 className="font-sans font-bold text-dark text-lg mb-3">
                Speed and reliability
              </h3>
              <div className="article-body space-y-3">
                <p>Both are good in cities.</p>
                <p>Ubigi is slightly more stable in some cases.</p>
              </div>
            </div>
            <div>
              <h3 className="font-sans font-bold text-dark text-lg mb-3">
                Pricing
              </h3>
              <div className="article-body space-y-3">
                <p>Similar overall.</p>
                <p>Differences are small.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="editorial-heading mb-4">
            Common Mistakes
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Overanalyzing small differences
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Choosing based on price alone
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Not setting up before arrival
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="editorial-heading mb-4">
            What You Should Actually Choose
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              First-time traveler: Airalo
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Want slightly more stability: Ubigi
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Most cases: Airalo is enough
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="editorial-heading mb-4">
            Reality Check
          </h2>
          <div className="article-body space-y-4 max-w-2xl">
            <p>Both options work.</p>
            <p>Differences are small.</p>
            <p>Your experience won&apos;t change much.</p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="editorial-heading mb-4">
            Bottom Line
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 mb-6 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Use Airalo if unsure
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Use Ubigi if you prefer slightly more control
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Don&apos;t overthink it
            </li>
          </ul>
        </section>

        <NextStepGuides guideId="airalo-vs-ubigi-japan" />

        <GuideEndCta
          parentHref="/guides/sim-card-japan"
          parentLabel="Best SIM card for Japan →"
        />
        </>
      }
    />
  );
}
