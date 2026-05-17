import type { Metadata } from "next";
import Link from "next/link";
import { ServiceBlock } from "@/components/ServiceBlock";
import { ResidentsCrosslinks } from "@/components/guides/ResidentsCrosslinks";

export const metadata: Metadata = {
  title:
    "Renting an Apartment in Japan (What Foreigners Need to Know)",
  description:
    "Rent a place in Japan as a foreigner: deposit, key money, agency fees, guarantors, paperwork, landlord bias, and what actually works.",
};

export default function RentingApartmentJapanPage() {
  return (
    <main className="bg-cream min-h-screen font-sans">
      <article className="max-w-3xl mx-auto px-6 pt-12 pb-16">
        <h1
          className="font-display text-dark tracking-wide leading-tight mb-8"
          style={{ fontSize: "clamp(36px, 5.5vw, 56px)" }}
        >
          Renting an Apartment in Japan (What Foreigners Need to Know)
        </h1>

        <div className="article-body mb-12 max-w-2xl space-y-4">
          <p>
            Renting in Japan is strict and complex. The process rewards people who
            read the fee table twice and show up with clean paperwork.
          </p>
          <p>
            You will need a bank account and steady{" "}
            <Link
              href="/residents/pay-bills-japan"
              className="font-sans font-bold text-rust hover:text-maroon transition-colors duration-150"
            >
              bill payment
            </Link>{" "}
            rhythm soon after move-in. Open an account early:{" "}
            <Link
              href="/residents/open-bank-account-japan"
              className="font-sans font-bold text-rust hover:text-maroon transition-colors duration-150"
            >
              bank account guide
            </Link>
            .
          </p>
        </div>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            Quick Answer
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Expect upfront costs
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Expect paperwork
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Some landlords reject foreigners
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            Upfront Costs
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Deposit
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Key money
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Agency fees
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            Requirements
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Residence status
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Income or guarantor
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Japanese contact
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            Common Problems
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Rejection
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Language barrier
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Hidden costs
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            What Actually Works
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Use foreigner-friendly agents
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Prepare documents in advance
            </li>
          </ul>
        </section>

        <div className="mb-12 max-w-2xl space-y-4">
          <p className="article-body mb-2">
            If you want a room without fighting the rental market alone, do this:
          </p>
          <p className="article-body-sm mb-4 max-w-2xl">
            Starting a few weeks before your move date usually means more
            inventory to choose from.
          </p>
          <p className="article-body-sm text-sm text-muted/70 max-w-2xl mb-3">
            Based on real use in Japan.
          </p>
          <ServiceBlock
            title="Need help finding a foreigner-friendly apartment?"
            description="Some agencies specialize in helping non-Japanese residents navigate the process."
            linkText="Browse Sakura House rooms →"
            href="https://www.sakura-house.com/"
          />
          <ServiceBlock
            title="Oakhouse"
            description="Share houses and apartments with English-friendly support across Japan."
            linkText="Browse Oakhouse share houses →"
            href="https://www.oakhouse.jp/"
          />
        </div>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            Reality Check
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              It is not easy, but possible
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            Bottom Line
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Expect costs
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Expect friction
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Prepare early
            </li>
          </ul>
        </section>

        <ResidentsCrosslinks currentHref="/residents/renting-apartment-japan" />
      </article>
    </main>
  );
}
