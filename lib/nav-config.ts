import { SITE_TOOLS } from "@/lib/site-tools";

export type NavDropdownItem = {
  label: string;
  href: string;
};

export type NavDropdown = {
  id: string;
  label: string;
  items: NavDropdownItem[];
};

export type NavPrimaryLink = {
  id: string;
  label: string;
  href: string;
};

/** Single engineering entry for primary navbar (services linked from hub/footer). */
export const ENGINEERING_PRIMARY_NAV_LINK: NavPrimaryLink = {
  id: "engineer",
  label: "Engineer",
  href: "/engineer",
};

/** @deprecated Use ENGINEERING_PRIMARY_NAV_LINK for navbar; footer uses ENGINEERING_FOOTER_LINKS. */
export const ENGINEERING_NAV_LINKS: NavPrimaryLink[] = [
  ENGINEERING_PRIMARY_NAV_LINK,
];

/** Engineering vertical footer and soft-exit links. */
export const ENGINEERING_FOOTER_LINKS: NavPrimaryLink[] = [
  { id: "engineer", label: "Engineer Hub", href: "/engineer" },
  {
    id: "engineering-services",
    label: "Engineering Services",
    href: "/engineering-services",
  },
  { id: "about-engineer", label: "About the Engineer", href: "/about-engineer" },
];

/** Top-level nav after category menus: travel/resident first, engineering secondary. */
export const NAV_PRIMARY_LINKS: NavPrimaryLink[] = [
  { id: "learn", label: "Learn", href: "/learn-japanese" },
  ENGINEERING_PRIMARY_NAV_LINK,
  { id: "faq", label: "FAQ", href: "/faq" },
];

/** AoM-style GET * category menus for the primary nav. */
export const NAV_DROPDOWNS: NavDropdown[] = [
  {
    id: "planning",
    label: "PLAN",
    items: [
      { label: "Start Here checklist", href: "/start-here" },
      { label: "Tourist guides hub", href: "/tourists" },
      { label: "Itinerary templates", href: "/itinerary-templates" },
      { label: "Itinerary planner", href: "/tools/japan-itinerary-planner" },
      { label: "Japan itinerary guide", href: "/guides/japan-itinerary" },
    ],
  },
  {
    id: "around",
    label: "TRANSPORT",
    items: [
      { label: "Trains in Japan", href: "/guides/japan-trains" },
      { label: "Getting around Japan", href: "/guides/getting-around-japan" },
      { label: "Airport first steps", href: "/guides/japan-airport-first-steps" },
      { label: "Airport to city", href: "/guides/japan-airport-to-city" },
      { label: "Suica vs Pasmo", href: "/guides/suica-vs-pasmo" },
    ],
  },
  {
    id: "stay",
    label: "STAY",
    items: [
      { label: "Where to stay in Japan", href: "/guides/where-to-stay-japan" },
      { label: "Where to stay in Tokyo", href: "/guides/where-to-stay-tokyo" },
      { label: "Where to stay in Kyoto", href: "/guides/where-to-stay-kyoto" },
      { label: "Where to stay in Osaka", href: "/guides/where-to-stay-osaka" },
      { label: "Japan budget breakdown", href: "/guides/japan-budget-breakdown" },
    ],
  },
  {
    id: "tools",
    label: "TOOLS",
    items: [
      { label: "All travel tools", href: "/tools" },
      ...SITE_TOOLS.map((t) => ({ label: t.title, href: t.href })),
    ],
  },
  {
    id: "residents",
    label: "LIVING",
    items: [
      { label: "Residents hub", href: "/residents" },
      { label: "Moving to Japan checklist", href: "/resources/moving-to-japan-checklist" },
      { label: "Monthly cost calculator", href: "/tools/japan-monthly-cost-calculator" },
      { label: "Living cost guide", href: "/residents/japan-living-cost" },
    ],
  },
];
