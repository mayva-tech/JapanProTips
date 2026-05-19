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
    href: "/residents/japan-garbage-rules",
    label: "Japan garbage rules and sorting →",
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
    href: "/residents/send-money-from-japan",
    label: "Send money internationally from Japan →",
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
    href: "/residents/japan-utilities-guide",
    label: "Utilities in Japan (electricity, gas, water) →",
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
    href: "/residents/renting-apartment-japan",
    label: "Find a foreigner-friendly apartment →",
  },
  {
    href: "/residents/japan-guarantor-system",
    label: "Japan apartment guarantor system explained →",
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
    href: "/residents/japan-moving-out-guide",
    label: "Moving out of an apartment in Japan →",
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
    href: "/residents/japan-health-insurance",
    label: "National Health Insurance (NHI) in Japan →",
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
    href: "/residents/japan-school-system",
    label: "Japanese school system for foreign families →",
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
