import type { Metadata } from "next";
import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";

export const metadata: Metadata = {
  title: "Suica vs PASMO: Which IC Card Should You Use in Japan?",
  description:
    "Suica and PASMO work the same for trains, buses, and shops in Japan. Pick the one that is easiest to buy or add to your phone, then top up and tap.",
};

export default function SuicaVsPasmoPage() {
  return (
    <GuideArticleShell
      comparisonItems={null}
      title={
        <h1
          className="font-display text-dark tracking-wide leading-tight mb-8"
          style={{ fontSize: "clamp(32px, 5vw, 52px)" }}
        >
          Suica vs PASMO: Which IC Card Should You Use in Japan?
        </h1>
      }
      intro={
        <div className="font-serif text-muted text-base leading-relaxed max-w-2xl space-y-4">
          <p>
            Suica and PASMO are both rechargeable IC cards you tap on gates and
            readers. For a trip, you do not need to stress the brand.
          </p>
          <p>
            The real question is how you get the card or mobile pass, not which logo
            prints on the plastic.
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
                They work almost the same
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Use whichever is easiest to get
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                On iPhone, add one to Apple Wallet if supported
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
                      Topic
                    </th>
                    <th className="text-left font-bold uppercase tracking-widest px-4 py-3 border-r border-[#d4c9b0]">
                      Suica
                    </th>
                    <th className="text-left font-bold uppercase tracking-widest px-4 py-3">
                      PASMO
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted">
                  <tr className="border-b border-[#d4c9b0]">
                    <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                      Typical origin
                    </td>
                    <td className="px-4 py-3 border-r border-[#d4c9b0]">
                      JR East branding, common at JR machines
                    </td>
                    <td className="px-4 py-3">
                      Private metro branding, common at subway machines
                    </td>
                  </tr>
                  <tr className="border-b border-[#d4c9b0]">
                    <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                      Trains and buses
                    </td>
                    <td className="px-4 py-3 border-r border-[#d4c9b0]">
                      Same tap network in the Tokyo region and beyond
                    </td>
                    <td className="px-4 py-3">Same tap network in the Tokyo region and beyond</td>
                  </tr>
                  <tr className="border-b border-[#d4c9b0]">
                    <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                      Shops and lockers
                    </td>
                    <td className="px-4 py-3 border-r border-[#d4c9b0]">
                      Accepted wherever IC is accepted
                    </td>
                    <td className="px-4 py-3">Accepted wherever IC is accepted</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 border-r border-[#d4c9b0] font-bold text-dark">
                      Decision tip
                    </td>
                    <td className="px-4 py-3 border-r border-[#d4c9b0]">
                      Pick if the first machine you see is JR or Wallet offers Suica
                    </td>
                    <td className="px-4 py-3">
                      Pick if the first machine you see is metro or Wallet offers PASMO
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-dark tracking-wide text-3xl mb-5">
              What Suica is
            </h2>
            <div className="font-serif text-muted text-base leading-relaxed space-y-3 max-w-2xl">
              <p>
                Suica is JR East&apos;s IC card brand. You load yen onto it, then tap in
                and out at compatible gates and pay at many convenience stores and
                vending machines.
              </p>
              <p>Physical cards and mobile Suica both behave like stored value.</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-dark tracking-wide text-3xl mb-5">
              What PASMO is
            </h2>
            <div className="font-serif text-muted text-base leading-relaxed space-y-3 max-w-2xl">
              <p>
                PASMO is the Tokyo area private railways and subway IC brand. Function
                is the same as Suica for travel and small purchases on the same network.
              </p>
              <p>If you already have PASMO, you do not need Suica for normal trips.</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-dark tracking-wide text-3xl mb-5">
              Where they work
            </h2>
            <div className="font-serif text-muted text-base leading-relaxed space-y-3 max-w-2xl">
              <p>
                In practice, both cards work on JR, subways, and most local buses in the
                major interoperable regions. Nationwide coverage has grown, but always
                watch for a sign that says IC is OK before you tap.
              </p>
              <p>
                If a line is cash only or uses a different ticket, the reader will not
                solve that. Buy the ticket that sign tells you to buy.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-dark tracking-wide text-3xl mb-5">
              Common Mistakes
            </h2>
            <ul className="font-serif text-muted list-none pl-0 space-y-3 leading-relaxed max-w-2xl">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Treating Suica and PASMO as different systems for everyday Tokyo travel
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Buying a second card because the color is different
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Forgetting to top up before rush hour queues at the machine
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-dark tracking-wide text-3xl mb-5">
              Bottom Line
            </h2>
            <ul className="font-serif text-muted list-none pl-0 space-y-3 leading-relaxed mb-8 max-w-2xl">
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                One IC card in your hand or phone is enough for most visitors
              </li>
              <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
                Spend your energy on routes and platforms, not Suica versus PASMO
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
