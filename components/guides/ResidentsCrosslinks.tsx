import { TrackedCtaLink } from "@/components/TrackedCtaLink";
import { TrackedStartHereLink } from "@/components/TrackedStartHereLink";
import { conversionLabelForHref } from "@/lib/gtag-events";

export const RESIDENT_GUIDE_LINKS: { href: string; label: string }[] = [
  {
    href: "/residents/japan-residence-registration",
    label: "Residence registration at the ward office →",
  },
  {
    href: "/residents/japan-my-number-card",
    label: "My Number Card for foreign residents →",
  },
  {
    href: "/residents/japan-city-hall-guide",
    label: "City hall and ward office procedures →",
  },
  {
    href: "/residents/japan-renewing-visa-guide",
    label: "Renewing your visa and residence status →",
  },
  {
    href: "/residents/japan-address-system",
    label: "How Japanese addresses work →",
  },
  {
    href: "/residents/japan-mail-documents-guide",
    label: "Important mail and official documents in Japan →",
  },
  {
    href: "/residents/japan-household-paperwork-guide",
    label: "Managing household paperwork in Japan →",
  },
  {
    href: "/residents/japan-garbage-rules",
    label: "Japan garbage rules and sorting →",
  },
  {
    href: "/residents/japan-trash-recycling-guide",
    label: "Trash and recycling in Japan for residents →",
  },
  {
    href: "/residents/japan-furniture-disposal-guide",
    label: "Furniture and large trash disposal in Japan →",
  },
  {
    href: "/residents/japan-internet-setup",
    label: "Home internet and Wi-Fi setup →",
  },
  {
    href: "/residents/open-bank-account-japan",
    label: "Set up your bank account in Japan →",
  },
  {
    href: "/residents/japan-bank-holidays-business-hours-guide",
    label: "Business hours, closures, and holidays in Japan →",
  },
  {
    href: "/residents/japan-banking-apps-guide",
    label: "Banking apps and online banking in Japan →",
  },
  {
    href: "/residents/japan-bank-account",
    label: "Bank accounts for foreign residents →",
  },
  {
    href: "/residents/japan-credit-cards",
    label: "Credit cards for foreign residents →",
  },
  {
    href: "/residents/japan-mobile-payment-guide",
    label: "Mobile payments (PayPay, Apple Pay, Suica) →",
  },
  {
    href: "/residents/japan-receipts-points-membership-cards-guide",
    label: "Receipts, point cards, and membership systems →",
  },
  {
    href: "/residents/japan-phone-scams-fraud-guide",
    label: "Phone scams, fraud, and consumer traps →",
  },
  {
    href: "/residents/japan-online-shopping-guide",
    label: "Online shopping in Japan for foreign residents →",
  },
  {
    href: "/residents/japan-package-delivery-guide",
    label: "Package deliveries in Japan for residents →",
  },
  {
    href: "/residents/send-money-from-japan",
    label: "Send money internationally from Japan →",
  },
  {
    href: "/residents/japan-savings-budgeting-guide",
    label: "Saving money and budgeting in Japan →",
  },
  {
    href: "/residents/sim-card-japan-residents",
    label: "Choose a long-term SIM as a resident →",
  },
  {
    href: "/residents/japan-phone-plans",
    label: "Phone plans in Japan (Rakuten, UQ, IIJmio) →",
  },
  {
    href: "/residents/pay-bills-japan",
    label: "Pay utilities and internet bills on time →",
  },
  {
    href: "/residents/japan-convenience-services-guide",
    label: "Convenience store services for residents →",
  },
  {
    href: "/residents/japan-utilities-guide",
    label: "Utilities in Japan (electricity, gas, water) →",
  },
  {
    href: "/residents/japan-air-conditioner-guide",
    label: "Air conditioners and climate control in Japan →",
  },
  {
    href: "/residents/japan-weather-living-guide",
    label: "Living through Japan's seasons as a resident →",
  },
  {
    href: "/residents/japan-micro-seasons-guide",
    label: "Small seasonal changes residents notice in Japan →",
  },
  {
    href: "/residents/japan-seasonal-home-products-guide",
    label: "Seasonal home products residents eventually buy →",
  },
  {
    href: "/residents/japan-household-cleaning-guide",
    label: "Cleaning and apartment maintenance in Japan →",
  },
  {
    href: "/residents/japan-seasonal-allergies-guide",
    label: "Seasonal allergies and hay fever in Japan →",
  },
  {
    href: "/residents/japan-rainy-day-lifestyle-guide",
    label: "Rainy day life in Japan for residents →",
  },
  {
    href: "/residents/japan-holidays-long-weekends-guide",
    label: "Japanese holidays and long weekends explained →",
  },
  {
    href: "/residents/ic-card-japan",
    label: "Tap trains and shops with an IC card →",
  },
  {
    href: "/residents/japan-driving-license",
    label: "Convert a foreign driver's license →",
  },
  {
    href: "/residents/japan-bike-rules",
    label: "Bicycle rules and parking in Japan →",
  },
  {
    href: "/residents/japan-bike-commuting-guide",
    label: "Cycling and bike commuting in Japan →",
  },
  {
    href: "/residents/japan-station-life-guide",
    label: "Daily train station life in Japan →",
  },
  {
    href: "/residents/japan-vending-machine-guide",
    label: "Vending machine culture in Japan →",
  },
  {
    href: "/residents/japan-waiting-in-line-guide",
    label: "Lines, queues, and waiting culture in Japan →",
  },
  {
    href: "/residents/japan-lost-and-found-guide",
    label: "Lost and found in Japan for foreign residents →",
  },
  {
    href: "/residents/japan-gym-fitness-guide",
    label: "Gyms, fitness, and staying active in Japan →",
  },
  {
    href: "/residents/japan-public-bath-sauna-guide",
    label: "Public baths, saunas, and relaxation culture in Japan →",
  },
  {
    href: "/residents/renting-apartment-japan",
    label: "Find a foreigner-friendly apartment →",
  },
  {
    href: "/residents/japan-shared-house-guide",
    label: "Living in a shared house in Japan →",
  },
  {
    href: "/residents/japan-apartment-viewing-guide",
    label: "Apartment viewings: what to check before renting →",
  },
  {
    href: "/residents/japan-furnished-vs-unfurnished-guide",
    label: "Furnished vs unfurnished apartments in Japan →",
  },
  {
    href: "/residents/japan-small-apartment-living-guide",
    label: "Living in small apartments in Japan →",
  },
  {
    href: "/residents/japan-apartment-lighting-guide",
    label: "Apartment lighting and home atmosphere →",
  },
  {
    href: "/residents/japan-house-slippers-guide",
    label: "Shoes, slippers, and indoor footwear culture →",
  },
  {
    href: "/residents/japan-balcony-living-guide",
    label: "Balconies, laundry, and outdoor apartment space →",
  },
  {
    href: "/residents/japan-noise-neighbor-etiquette-guide",
    label: "Noise, neighbors, and apartment etiquette →",
  },
  {
    href: "/residents/japan-apartment-sounds-guide",
    label: "Everyday apartment sounds residents notice →",
  },
  {
    href: "/residents/japan-neighborhood-guide",
    label: "Choosing the right neighborhood in Japan →",
  },
  {
    href: "/residents/japan-local-neighborhood-shops-guide",
    label: "Small neighborhood shops residents eventually use →",
  },
  {
    href: "/residents/japan-guarantor-system",
    label: "Japan apartment guarantor system explained →",
  },
  {
    href: "/residents/japan-pet-ownership-guide",
    label: "Owning pets in Japan as a foreign resident →",
  },
  {
    href: "/residents/japan-furniture-appliances",
    label: "Furniture and appliances for your apartment →",
  },
  {
    href: "/residents/japan-secondhand-shopping-guide",
    label: "Secondhand shopping in Japan (recycle shops, Mercari) →",
  },
  {
    href: "/residents/japan-100yen-shop-guide",
    label: "100 yen shops: what residents eventually buy →",
  },
  {
    href: "/residents/japan-clothing-shopping-guide",
    label: "Buying clothes in Japan as a foreign resident →",
  },
  {
    href: "/residents/japan-moving-out-guide",
    label: "Moving out of an apartment in Japan →",
  },
  {
    href: "/residents/japan-moving-companies-guide",
    label: "Moving apartments: companies, costs, and timeline →",
  },
  {
    href: "/residents/japan-living-cost",
    label: "Monthly cost of living in Japan (real numbers) →",
  },
  {
    href: "/residents/japan-grocery-shopping-guide",
    label: "Grocery shopping in Japan for foreign residents →",
  },
  {
    href: "/residents/japan-self-checkout-guide",
    label: "Self-checkout and everyday machines in Japan →",
  },
  {
    href: "/residents/japan-drugstore-lifestyle-guide",
    label: "Japanese drugstores explained for foreign residents →",
  },
  {
    href: "/residents/japan-seasonal-food-guide",
    label: "Seasonal food culture in Japan →",
  },
  {
    href: "/residents/japan-weekend-routine-guide",
    label: "Weekend life in Japan for foreign residents →",
  },
  {
    href: "/residents/japan-home-cooking-guide",
    label: "Cooking at home in Japan for foreign residents →",
  },
  {
    href: "/residents/japan-microwave-frozen-food-guide",
    label: "Microwaves, frozen food, and quick meals in Japan →",
  },
  {
    href: "/residents/japan-health-insurance",
    label: "National Health Insurance (NHI) in Japan →",
  },
  {
    href: "/residents/japan-healthcare-cost-guide",
    label: "Healthcare costs in Japan for foreign residents →",
  },
  {
    href: "/residents/japan-clinics-hospitals",
    label: "Clinics and hospitals in Japan →",
  },
  {
    href: "/residents/japan-emergency-guide",
    label: "Emergency numbers and disaster safety →",
  },
  {
    href: "/residents/japan-natural-disasters-home-prep-guide",
    label: "Preparing your home for earthquakes and typhoons →",
  },
  {
    href: "/residents/japan-school-system",
    label: "Japanese school system for foreign families →",
  },
  {
    href: "/residents/japan-daycare-childcare-guide",
    label: "Daycare and childcare in Japan for foreign parents →",
  },
  {
    href: "/residents/japan-pension-system",
    label: "Japan pension system for foreign residents →",
  },
  {
    href: "/residents/japan-taxes-guide",
    label: "Japanese taxes for foreign residents →",
  },
  {
    href: "/residents/part-time-jobs-japan",
    label: "Part-time jobs in Japan for foreigners →",
  },
  {
    href: "/residents/japan-job-hunting-guide",
    label: "Finding jobs in Japan as a foreign resident →",
  },
  {
    href: "/residents/japan-work-culture-guide",
    label: "Japanese work culture for foreign employees →",
  },
  {
    href: "/residents/japan-time-management-lifestyle-guide",
    label: "Time, punctuality, and daily scheduling in Japan →",
  },
  {
    href: "/residents/japan-morning-routine-guide",
    label: "Morning life and daily routines in Japan →",
  },
  {
    href: "/residents/japan-night-routine-guide",
    label: "Nighttime life and evening routines in Japan →",
  },
  {
    href: "/residents/japan-language-learning-guide",
    label: "Learning Japanese while living in Japan →",
  },
  {
    href: "/residents/japan-friendship-social-life-guide",
    label: "Making friends and social life in Japan →",
  },
  {
    href: "/residents/japan-customer-service-culture-guide",
    label: "Customer service culture in Japan →",
  },
  {
    href: "/residents/japan-mental-health-adjustment-guide",
    label: "Mental health and culture adjustment in Japan →",
  },
];

const linkClass =
  "font-sans font-bold text-base tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150";
const startCtaClass =
  "inline-block border-2 border-dark bg-cream px-8 py-4 font-sans text-base font-bold uppercase tracking-widest text-dark transition-colors duration-150 hover:bg-dark hover:text-cream";

type ResidentsCrosslinksProps = {
  /** Current article path; other guides are listed. Omit on hub to list all guides. */
  currentHref?: string;
};

export function ResidentsCrosslinks({ currentHref }: ResidentsCrosslinksProps) {
  const guides = currentHref
    ? RESIDENT_GUIDE_LINKS.filter((g) => g.href !== currentHref)
    : RESIDENT_GUIDE_LINKS;

  const heading = currentHref ? "More for residents" : "Guides";

  return (
    <section
      className="mt-14 border-t border-tan pt-12"
      aria-labelledby="residents-crosslinks-heading"
    >
      <h2
        id="residents-crosslinks-heading"
        className="font-display text-dark tracking-wide text-4xl mb-6"
      >
        {heading}
      </h2>
      {currentHref ? (
        <p className="mb-6">
          <TrackedCtaLink
            href="/residents"
            label="resident_guides"
            className={linkClass}
          >
            Residents hub →
          </TrackedCtaLink>
        </p>
      ) : null}
      <ul className="article-body list-none space-y-3.5 pl-0 max-w-2xl">
        {guides.map((g) => (
          <li key={g.href}>
            <TrackedCtaLink
              href={g.href}
              label={conversionLabelForHref(g.href)}
              className={linkClass}
            >
              {g.label}
            </TrackedCtaLink>
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <TrackedStartHereLink className={startCtaClass}>
          Plan a visit from outside Japan →
        </TrackedStartHereLink>
      </div>
    </section>
  );
}
