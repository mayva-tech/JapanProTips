import type { ComparisonRow } from "@/components/conversion";

/** Neutral internal links: works on trip and resident guides without hard-selling one SKU. */
export const DEFAULT_GUIDE_COMPARISON_ROWS: ComparisonRow[] = [
  {
    name: "Start Here checklist",
    price: "Free",
    pros: "Trains, SIM, money, and first-day flow in one place",
    bestFor: "First-time visitors who want order",
    link: "/start-here",
    buttonText: "Open checklist",
  },
  {
    name: "SIM and eSIM guide",
    price: "Varies",
    pros: "Physical SIM, eSIM, and pocket WiFi in one decision tree",
    bestFor: "Anyone who needs data on arrival",
    link: "/guides/sim-card-japan",
    buttonText: "Open guide",
  },
  {
    name: "Residents hub",
    price: "—",
    pros: "Bank, bills, IC, and phone plans after you move",
    bestFor: "Long-stay visas and working holidays",
    link: "/residents",
    buttonText: "Open hub",
  },
];

/** Funnel target for mobile sticky CTA on guides (SIM guide first). */
export const CONVERSION_STICKY_ESIM_HREF = "/guides/sim-card-japan";
