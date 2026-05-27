import type { Metadata } from "next";
import type { ReactNode } from "react";
import { TrackedCtaLink } from "@/components/TrackedCtaLink";
import { GuidePageTitle } from "@/components/guides/GuidePageTitle";
import { ResidentStarterPath } from "@/components/guides/ResidentStarterPath";
import { ResidentsCrosslinks } from "@/components/guides/ResidentsCrosslinks";
import { stripTrailingArrowFromText } from "@/lib/cta-chevron";
import { conversionLabelForHref } from "@/lib/gtag-events";

export const metadata: Metadata = {
  title: "Living in Japan: Practical Guides for Daily Life",
  description:
    "Hub for life in Japan after you move: money and payments, getting around, daily systems. Practical, no travel-brochure fluff.",
};

const ctaClass =
  "editorial-chevron-cta inline-flex rounded-lg bg-maroon text-white font-sans font-bold text-base tracking-widest uppercase px-8 py-4 hover:bg-rust transition-colors duration-150";

const linkClass =
  "editorial-chevron-link font-sans font-bold text-rust hover:text-maroon transition-colors duration-150";

function stripTrailingArrow(label: ReactNode) {
  return typeof label === "string" ? stripTrailingArrowFromText(label) : label;
}

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
      {stripTrailingArrow(children)}
    </TrackedCtaLink>
  );
}

export default function ResidentsPage() {
  return (
    <main className="bg-cream min-h-screen font-sans">
      <article className="page-x max-w-3xl mx-auto pt-10 pb-14">
        <GuidePageTitle title="Living in Japan: Practical Guides for Daily Life" />

        <div className="article-body mb-6 max-w-2xl space-y-4">
          <p>This section is for people who already live in Japan.</p>
          <p>
            It focuses on daily life, paperwork rhythms, and how things actually
            work. It is not trip planning or sightseeing content.
          </p>
        </div>

        <ResidentStarterPath sourceSlug="residents-hub" variant="hub" />

        <div className="border-t-2 border-dark mb-6" />

        <section className="mb-6">
          <h2 className="editorial-heading mb-4">
            Start Here
          </h2>
          <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl mb-6">
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Setting up life basics
            </li>
            <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
              Bank, phone, transport
            </li>
          </ul>
          <ul className="article-body list-none space-y-3 pl-0 max-w-2xl mb-6 text-base">
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
              <TrackedResidentLink href="/residents/japan-official-mail-guide" className={linkClass}>
                Important mail and official documents in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-household-paperwork-guide" className={linkClass}>
                Managing household paperwork in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/open-bank-account-japan" className={linkClass}>
                Open a bank account →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-bank-holidays-business-hours-guide" className={linkClass}>
                Business hours, closures, and holidays in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-banking-apps-guide" className={linkClass}>
                Banking apps and online banking in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-bank-transfers-furikomi" className={linkClass}>
                Furikomi: Japanese bank transfers explained →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/sim-card-japan-residents" className={linkClass}>
                Choose a long-term SIM as a resident →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-apartment-internet" className={linkClass}>
                Home internet and Wi-Fi setup →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-mobile-phone-plans" className={linkClass}>
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
              <TrackedResidentLink href="/residents/japan-receipts-points-membership-cards-guide" className={linkClass}>
                Receipts, point cards, and membership systems →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-phone-scams-fraud-guide" className={linkClass}>
                Phone scams, fraud, and consumer traps →
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

        <section className="mb-6">
          <h2 className="editorial-heading mb-4">
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
          <ul className="article-body list-none space-y-3 pl-0 max-w-2xl mt-4 mb-6 text-base">
            <li>
              <TrackedResidentLink href="/residents/japan-school-system" className={linkClass}>
                Japanese school system for foreign families →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-daycare-childcare-guide" className={linkClass}>
                Daycare and childcare in Japan for foreign parents →
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
            <li>
              <TrackedResidentLink href="/residents/japan-100yen-shop-guide" className={linkClass}>
                100 yen shops: what residents eventually buy →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-clothing-shopping-guide" className={linkClass}>
                Buying clothes in Japan as a foreign resident →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-pet-ownership-guide" className={linkClass}>
                Owning pets in Japan as a foreign resident →
              </TrackedResidentLink>
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="editorial-heading mb-4">
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
              <TrackedResidentLink href="/residents/japan-resident-tax" className={linkClass}>
                Resident tax explained for foreign residents →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-mistakes-new-residents" className={linkClass}>
                Japan mistakes new residents make →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-savings-budgeting-guide" className={linkClass}>
                Saving money and budgeting in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-grocery-shopping-guide" className={linkClass}>
                Grocery shopping in Japan for foreign residents →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-beginner-grocery-list" className={linkClass}>
                Your first grocery list in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-self-checkout-guide" className={linkClass}>
                Self-checkout and everyday machines in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-drugstore-lifestyle-guide" className={linkClass}>
                Japanese drugstores explained for foreign residents →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-seasonal-food-guide" className={linkClass}>
                Seasonal food culture in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-weekend-routine-guide" className={linkClass}>
                Weekend life in Japan for foreign residents →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-home-cooking-guide" className={linkClass}>
                Cooking at home in Japan for foreign residents →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-microwave-frozen-food-guide" className={linkClass}>
                Microwaves, frozen food, and quick meals →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-online-shopping-guide" className={linkClass}>
                Online shopping in Japan for foreign residents →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-amazon-rakuten-yahoo" className={linkClass}>
                Amazon Japan vs Rakuten vs Yahoo Shopping →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-package-delivery-guide" className={linkClass}>
                Package deliveries in Japan for residents →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/pay-bills-japan" className={linkClass}>
                Pay bills in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-convenience-services-guide" className={linkClass}>
                Convenience store services for residents →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-utilities-setup" className={linkClass}>
                Utilities in Japan (electricity, gas, water) →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-air-conditioner-guide" className={linkClass}>
                Air conditioners and climate control in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-weather-living-guide" className={linkClass}>
                Living through Japan seasons as a resident →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-first-winter" className={linkClass}>
                Your first winter living in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-micro-seasons-guide" className={linkClass}>
                Small seasonal changes residents notice in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-seasonal-home-products-guide" className={linkClass}>
                Seasonal home products residents eventually buy →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-household-items" className={linkClass}>
                Household items foreign residents always buy →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-household-cleaning-guide" className={linkClass}>
                Cleaning and apartment maintenance in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-seasonal-allergies-guide" className={linkClass}>
                Seasonal allergies and hay fever in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-rainy-day-lifestyle-guide" className={linkClass}>
                Rainy day life in Japan for residents →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-holidays-long-weekends-guide" className={linkClass}>
                Japanese holidays and long weekends explained →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-social-life-guide" className={linkClass}>
                Making friends and social life in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-customer-service-culture-guide" className={linkClass}>
                Customer service culture in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-mental-health-adjustment-guide" className={linkClass}>
                Mental health and culture adjustment in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/garbage-separation-japan" className={linkClass}>
                Garbage separation for new residents →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-garbage-rules" className={linkClass}>
                Japan garbage rules and sorting →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-trash-recycling-guide" className={linkClass}>
                Trash and recycling in Japan for residents →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-furniture-disposal-guide" className={linkClass}>
                Furniture and large trash disposal in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-health-insurance" className={linkClass}>
                National Health Insurance (NHI) for residents →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-healthcare-costs" className={linkClass}>
                Healthcare costs in Japan for foreign residents →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/clinics-vs-hospitals-in-japan" className={linkClass}>
                Clinics and hospitals in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-emergency-guide" className={linkClass}>
                Emergency numbers and disaster safety →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-natural-disasters-home-prep-guide" className={linkClass}>
                Preparing your home for earthquakes and typhoons →
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
            <li>
              <TrackedResidentLink href="/residents/japan-bike-commuting-guide" className={linkClass}>
                Cycling and bike commuting in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-station-life-guide" className={linkClass}>
                Daily train station life in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-vending-machine-guide" className={linkClass}>
                Vending machine culture in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-waiting-in-line-guide" className={linkClass}>
                Lines, queues, and waiting culture in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-lost-and-found-guide" className={linkClass}>
                Lost and found in Japan for foreign residents →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-gym-fitness-guide" className={linkClass}>
                Gyms, fitness, and staying active in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-public-bath-sauna-guide" className={linkClass}>
                Public baths, saunas, and relaxation culture in Japan →
              </TrackedResidentLink>
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="editorial-heading mb-4">
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
              <TrackedResidentLink href="/residents/japan-work-contracts" className={linkClass}>
                Japanese work contracts for foreign residents →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-work-culture-guide" className={linkClass}>
                Japanese work culture for foreign employees →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-time-management-lifestyle-guide" className={linkClass}>
                Time, punctuality, and daily scheduling in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-morning-routine-guide" className={linkClass}>
                Morning life and daily routines in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-night-routine-guide" className={linkClass}>
                Nighttime life and evening routines in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-language-learning-guide" className={linkClass}>
                Learning Japanese while living in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/renting-apartment-japan" className={linkClass}>
                Find a foreigner-friendly apartment →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-shared-house-guide" className={linkClass}>
                Living in a shared house in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-apartment-viewing-guide" className={linkClass}>
                Apartment viewings: what to check before renting →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-room-measurements" className={linkClass}>
                Japanese room sizes, tatami, and layout terms →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/furnished-vs-unfurnished-apartments-in-japan" className={linkClass}>
                Furnished vs unfurnished apartments in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-small-apartment-living-guide" className={linkClass}>
                Living in small apartments in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-apartment-lighting-guide" className={linkClass}>
                Apartment lighting and home atmosphere →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-house-slippers-guide" className={linkClass}>
                Shoes, slippers, and indoor footwear culture →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-balcony-living-guide" className={linkClass}>
                Balconies, laundry, and outdoor apartment space →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-noise-neighbor-etiquette-guide" className={linkClass}>
                Noise, neighbors, and apartment etiquette →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-noise-complaints" className={linkClass}>
                Noise complaints in Japan apartments →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-apartment-sounds-guide" className={linkClass}>
                Everyday apartment sounds residents notice →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-neighborhood-guide" className={linkClass}>
                Choosing the right neighborhood in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-local-neighborhood-shops-guide" className={linkClass}>
                Small neighborhood shops residents eventually use →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-guarantor-system" className={linkClass}>
                Japan apartment guarantor system explained →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/apartment-rejections-in-japan" className={linkClass}>
                Why foreign residents get rejected for apartments →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-pet-ownership-guide" className={linkClass}>
                Owning pets in Japan as a foreign resident →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-moving-out-guide" className={linkClass}>
                Moving out of an apartment in Japan →
              </TrackedResidentLink>
            </li>
            <li>
              <TrackedResidentLink href="/residents/japan-moving-companies-guide" className={linkClass}>
                Moving apartments: companies, costs, and timeline →
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

        <section className="mb-6">
          <h2 className="editorial-heading mb-4">
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

        <div className="border-t border-tan pt-8 mt-6">
          <TrackedResidentLink href="/residents/ic-card-japan" className={ctaClass}>
            IC cards and everyday train basics →
          </TrackedResidentLink>
        </div>
      </article>
    </main>
  );
}
