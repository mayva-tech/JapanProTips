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
              <TrackedResidentLink href="/residents/japan-residence-registration" className={linkClass}>
                Residence registration at the ward office →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-my-number-card" className={linkClass}>
                My Number Card for foreign residents →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-city-hall-guide" className={linkClass}>
                City hall and ward office procedures →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-renewing-visa-guide" className={linkClass}>
                Renewing your visa and residence status →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-address-system" className={linkClass}>
                How Japanese addresses work →
              </TrackedResidentLink>
            </li>
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
              <TrackedResidentLink href="/residents/japan-internet-setup" className={linkClass}>
                Home internet and Wi-Fi setup →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-phone-plans" className={linkClass}>
                Phone plans: Rakuten, UQ, IIJmio vs big carriers →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-bank-account" className={linkClass}>
                Bank accounts for foreign residents →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-credit-cards" className={linkClass}>
                Credit cards for foreign residents →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-mobile-payment-guide" className={linkClass}>
                Mobile payments (PayPay, Apple Pay, Suica) →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/send-money-from-japan" className={linkClass}>
                Send money internationally from Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/ic-card-japan" className={linkClass}>
                Tap trains and konbini with an IC card →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-driving-license" className={linkClass}>
                Convert a foreign driver&apos;s license →
              </TrackedResidentLink>
            </li>
          </ul>
          <TrackedResidentLink href="/tourists" className={ctaClass}>
            Visitor guides: money, cards, and cash →
          </TrackedResidentLink>
        </section>

        <section className="mb-14">
          <h2 className="font-display text-dark tracking-wide text-4xl mb-5">
            Families
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Schools and enrollment
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Language and daily rhythm
            </li>
          </ul>
          <ul className="article-body list-none space-y-3 pl-0 max-w-2xl mt-4 mb-14 text-base">
            <li>
              <TrackedResidentLink href="/residents/japan-school-system" className={linkClass}>
                Japanese school system for foreign families →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-furniture-appliances" className={linkClass}>
                Furniture and appliances for your apartment →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-secondhand-shopping-guide" className={linkClass}>
                Secondhand shopping in Japan (recycle shops, Mercari) →
              </TrackedResidentLink>
            </li>
          </ul>
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
              <TrackedResidentLink href="/residents/japan-living-cost" className={linkClass}>
                Monthly cost of living (rent, food, transport) →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-grocery-shopping-guide" className={linkClass}>
                Grocery shopping in Japan for foreign residents →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/pay-bills-japan" className={linkClass}>
                Pay bills in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-utilities-guide" className={linkClass}>
                Utilities in Japan (electricity, gas, water) →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-garbage-rules" className={linkClass}>
                Japan garbage rules and sorting →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-health-insurance" className={linkClass}>
                National Health Insurance (NHI) for residents →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-clinics-hospitals" className={linkClass}>
                Clinics and hospitals in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-emergency-guide" className={linkClass}>
                Emergency numbers and disaster safety →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-pension-system" className={linkClass}>
                Japan pension system for foreign residents →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/ic-card-japan" className={linkClass}>
                IC cards for trains and shops →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-bike-rules" className={linkClass}>
                Bicycle rules and parking in Japan →
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
              Taxes and pension
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Bureaucracy
            </li>
          </ul>
          <ul className="article-body list-none space-y-3 pl-0 max-w-2xl mt-4 text-base">
            <li>
              <TrackedResidentLink href="/residents/part-time-jobs-japan" className={linkClass}>
                Part-time jobs in Japan (konbini, restaurants, English) →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-job-hunting-guide" className={linkClass}>
                Finding jobs in Japan as a foreign resident →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-work-culture-guide" className={linkClass}>
                Japanese work culture for foreign employees →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/renting-apartment-japan" className={linkClass}>
                Find a foreigner-friendly apartment →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-guarantor-system" className={linkClass}>
                Japan apartment guarantor system explained →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-moving-out-guide" className={linkClass}>
                Moving out of an apartment in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-pension-system" className={linkClass}>
                Japan pension system (kokumin and kosei nenkin) →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-taxes-guide" className={linkClass}>
                Japanese taxes for foreign residents →
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
          <TrackedResidentLink href="/residents/ic-card-japan" className={ctaClass}>
            IC cards and everyday train basics →
          </TrackedResidentLink>
        </div>
      </article>
    </main>
  );
}
