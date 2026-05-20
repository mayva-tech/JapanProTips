import type { Metadata } from "next";
import Link from "next/link";
import { ResidentsCrosslinks } from "@/components/guides/ResidentsCrosslinks";

export const metadata: Metadata = {
  title: "IC Cards in Japan for Daily Life (Suica, PASMO, ICOCA)",
  description:
    "IC cards for residents in Japan: Suica, PASMO, ICOCA for trains, buses, konbini, vending machines, physical vs mobile wallet, and daily habits.",
};

export default function IcCardJapanResidentsPage() {
  return (
    <main className="bg-cream min-h-screen font-sans">
      <article className="max-w-3xl mx-auto px-6 pt-12 pb-16">
        <h1
          className="guide-page-title"
        >
          IC Cards in Japan for Daily Life (Suica, PASMO, ICOCA)
        </h1>

        <div className="article-body mb-12 max-w-2xl space-y-4">
          <p>
            IC cards are essential for daily life in Japan. Once you live here,
            they stop being a travel gimmick and become how you move, snack, and
            clear small purchases without thinking.
          </p>
          <p>
            Mobile data is a different stack. See{" "}
            <Link
              href="/residents/sim-card-japan-residents"
              className="font-sans font-bold text-rust hover:text-maroon transition-colors duration-150"
            >
              SIM options for residents
            </Link>
            .
          </p>
        </div>

        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            Quick Answer
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Use one card
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Works everywhere
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            What You Can Use It For
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Trains
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Buses
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Convenience stores
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Vending machines
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            Physical vs Mobile
          </h2>
          <div className="article-body space-y-4 max-w-2xl">
            <p>
              <strong className="font-sans font-bold text-dark">Physical card:</strong>{" "}
              Works on any compatible reader, easy to hand to a friend, easy to lose
              in a laundry pile. Keep a registered balance habit.
            </p>
            <p>
              <strong className="font-sans font-bold text-dark">
                Apple Wallet / mobile:
              </strong>{" "}
              Same tap behavior on phones that support it. One less plastic card in
              your pocket. Dead phone battery means you need a backup plan before
              you enter a long commute.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            Common Mistakes
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Not recharging
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Carrying multiple cards
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Not using mobile option
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            Reality Check
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              It becomes your daily wallet
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="editorial-heading mb-4">
            Bottom Line
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Use one IC card
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Keep it loaded
            </li>
          </ul>
        </section>

        <ResidentsCrosslinks currentHref="/residents/ic-card-japan" />
      </article>
    </main>
  );
}
