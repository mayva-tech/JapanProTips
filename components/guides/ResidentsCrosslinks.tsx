import Link from "next/link";
import { TrackedCtaLink } from "@/components/TrackedCtaLink";
import { TrackedStartHereLink } from "@/components/TrackedStartHereLink";
import { conversionLabelForHref } from "@/lib/gtag-events";

export const RESIDENT_GUIDE_LINKS: { href: string; label: string }[] = [
  {
    href: "/residents/open-bank-account-japan",
    label: "Set up your bank account in Japan →",
  },
  {
    href: "/residents/sim-card-japan-residents",
    label: "Choose a long-term SIM as a resident →",
  },
  {
    href: "/residents/pay-bills-japan",
    label: "Pay utilities and internet bills on time →",
  },
  {
    href: "/residents/ic-card-japan",
    label: "Tap trains and shops with an IC card →",
  },
  {
    href: "/residents/renting-apartment-japan",
    label: "Find a foreigner-friendly apartment →",
  },
  {
    href: "/guides/part-time-jobs-japan",
    label: "Part-time jobs in Japan for foreigners →",
  },
  {
    href: "/guides/japan-phone-plans",
    label: "Phone plans in Japan (Rakuten, UQ, IIJmio) →",
  },
  {
    href: "/guides/japan-living-cost",
    label: "Monthly cost of living in Japan (real numbers) →",
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
