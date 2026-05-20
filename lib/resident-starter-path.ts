export type ResidentStarterPathItem = {
  href: string;
  title: string;
  description: string;
  cta: string;
};

/** Ordered funnel: checklist → calculator → housing → insurance → bills. */
export const RESIDENT_STARTER_PATH_ITEMS: ResidentStarterPathItem[] = [
  {
    href: "/resources/moving-to-japan-checklist",
    title: "Moving to Japan Checklist",
    description:
      "First-month order: ward office, bank, phone, utilities, and printable PDF.",
    cta: "Open the checklist →",
  },
  {
    href: "/tools/japan-monthly-cost-calculator",
    title: "Japan Monthly Cost Calculator",
    description:
      "Ballpark rent, food, utilities, and insurance before you sign a lease.",
    cta: "Run the calculator →",
  },
  {
    href: "/residents/renting-apartment-japan",
    title: "Renting an Apartment in Japan",
    description:
      "Fees, guarantors, listings, and move-in admin for foreign renters.",
    cta: "Read the renting guide →",
  },
  {
    href: "/residents/japan-health-insurance",
    title: "Japan Health Insurance",
    description:
      "NHI vs workplace coverage, enrollment timing, and premium reality checks.",
    cta: "Read the insurance guide →",
  },
  {
    href: "/residents/pay-bills-japan",
    title: "Paying Bills in Japan",
    description:
      "Konbini slips, bank auto-debit, and how to read Japanese payment notices.",
    cta: "Read the bills guide →",
  },
];

export const HOME_RESIDENT_CTA_LINKS = RESIDENT_STARTER_PATH_ITEMS.filter(
  (item) =>
    item.href === "/resources/moving-to-japan-checklist" ||
    item.href === "/tools/japan-monthly-cost-calculator",
);
