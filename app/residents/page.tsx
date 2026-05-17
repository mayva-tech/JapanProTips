import type { Metadata } from "next";
import type { ReactNode } from "react";
import { TrackedCtaLink } from "@/components/TrackedCtaLink";
import { ResidentsCrosslinks } from "@/components/guides/ResidentsCrosslinks";
import { conversionLabelForHref } from "@/lib/gtag-events";

export const metadata: Metadata = {
  title: "Living in Japan: Practical Guides for Daily Life",
  description:
    "Hub for life in Japan after you move: money and payments, getting around, daily systems. Practical, no travel-brochure fluff.",
};

const ctaClass =
  "inline-block bg-maroon text-white font-sans font-bold text-base tracking-widest uppercase px-8 py-4 hover:bg-rust transition-colors duration-150";

const linkClass =
  "font-sans font-bold text-rust hover:text-maroon transition-colors duration-150";

function TrackedResidentLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  return (
    <TrackedCtaLink
      href={href}
      label={conversionLabelForHref(href)}
      className={className}
    >
      {children}
    </TrackedCtaLink>
  );
}

export default function ResidentsPage() {
  return (
    <main className="bg-cream min-h-screen font-sans">
      <article className="max-w-3xl mx-auto px-6 pt-12 pb-16">
        <h1
          className="font-display text-dark tracking-wide leading-tight mb-8"
          style={{ fontSize: "clamp(36px, 5.5vw, 56px)" }}
        >
          Living in Japan: Practical Guides for Daily Life
        </h1>

        <div className="article-body mb-14 max-w-2xl space-y-4">
          <p>This section is for people who already live in Japan.</p>
          <p>
            It focuses on daily life, paperwork rhythms, and how things actually
            work. It is not trip planning or sightseeing content.
          </p>
        </div>

        <div className="border-t-2 border-dark mb-12" />

        <section className="mb-14">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            Start Here
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl mb-8">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Setting up life basics
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Bank, phone, transport
            </li>
          </ul>
          <ul className="article-body list-none space-y-3 pl-0 max-w-2xl mb-8 text-base">
            <li>
              <TrackedResidentLink href="/residents/open-bank-account-japan" className={linkClass}>
                Open a bank account →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/sim-card-japan-residents" className={linkClass}>
                Choose a long-term SIM as a resident →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/guides/japan-phone-plans" className={linkClass}>
                Phone plans: Rakuten, UQ, IIJmio vs big carriers →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/ic-card-japan" className={linkClass}>
                Tap trains and konbini with an IC card →
              </TrackedResidentLink>
            </li>
          </ul>
          <TrackedResidentLink href="/guides/money-payments-japan" className={ctaClass}>
            Figure out money, cards, and cash in Japan →
          </TrackedResidentLink>
        </section>

        <section className="mb-14">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            Daily Life
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Paying bills
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Trains and commuting
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Shopping
            </li>
          </ul>
          <ul className="article-body list-none space-y-3 pl-0 max-w-2xl mt-4 text-base">
            <li>
              <TrackedResidentLink href="/guides/japan-living-cost" className={linkClass}>
                Monthly cost of living (rent, food, transport) →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/pay-bills-japan" className={linkClass}>
                Pay bills in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/ic-card-japan" className={linkClass}>
                IC cards for trains and shops →
              </TrackedResidentLink>
            </li>
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            Work and Systems
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Contracts
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Taxes
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Bureaucracy
            </li>
          </ul>
          <ul className="article-body list-none space-y-3 pl-0 max-w-2xl mt-4 text-base">
            <li>
              <TrackedResidentLink href="/guides/part-time-jobs-japan" className={linkClass}>
                Part-time jobs in Japan (konbini, restaurants, English) →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/renting-apartment-japan" className={linkClass}>
                Find a foreigner-friendly apartment →
              </TrackedResidentLink>
            </li>
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            Reality
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Japan is efficient but rigid
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Systems are not always intuitive
            </li>
          </ul>
        </section>

        <ResidentsCrosslinks />

        <div className="border-t border-tan pt-10 mt-14">
          <TrackedResidentLink href="/guides/getting-around-japan" className={ctaClass}>
            Get comfortable on trains and apps →
          </TrackedResidentLink>
        </div>
      </article>
    </main>
  );
}
