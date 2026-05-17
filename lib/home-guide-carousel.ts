import type { ConversionGtagLabel } from "@/lib/gtag-events";
import { IMAGES } from "@/lib/images";

export type HomeGuideCarouselItem = {
  category: string;
  title: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  gtagLabel: ConversionGtagLabel;
};

export const HOME_GUIDE_CAROUSEL_ITEMS: HomeGuideCarouselItem[] = [
  {
    category: "Trip planning",
    title: "First Time in Japan",
    description:
      "Step-by-step order for SIM, trains, lodging, and money before you land.",
    href: "/start-here",
    imageSrc: IMAGES.hero.airport,
    imageAlt: "Travelers at a Japan airport arrivals hall",
    gtagLabel: "start_here",
  },
  {
    category: "Transport",
    title: "Japan Train Basics",
    description:
      "IC cards, local vs express trains, and the habits that keep you moving.",
    href: "/guides/japan-trains",
    imageSrc: IMAGES.hero.shinkansen,
    imageAlt: "Shinkansen train at a station in Japan",
    gtagLabel: "transport",
  },
  {
    category: "Connectivity",
    title: "SIM Cards & eSIM",
    description:
      "What actually works for visitors: eSIM, pocket WiFi, and physical SIM.",
    href: "/guides/sim-card-japan",
    imageSrc: IMAGES.guides.esim,
    imageAlt: "Phone showing eSIM setup for travel in Japan",
    gtagLabel: "esim",
  },
  {
    category: "Money",
    title: "Cash, Cards & ATMs",
    description:
      "When to carry yen, which cards work, and how to avoid payment surprises.",
    href: "/guides/money-payments-japan",
    imageSrc: IMAGES.hero.suica,
    imageAlt: "Suica IC card used for payments and trains in Japan",
    gtagLabel: "budget",
  },
  {
    category: "Lodging",
    title: "Where to Stay in Tokyo",
    description:
      "Station distance beats hotel stars. Practical neighborhood picks.",
    href: "/guides/where-to-stay-tokyo",
    imageSrc: IMAGES.guides.maps,
    imageAlt: "Map planning for Tokyo neighborhoods and stations",
    gtagLabel: "hotel",
  },
  {
    category: "Daily life",
    title: "Resident Life in Japan",
    description:
      "Banking, bills, transport cards, and systems after you move here.",
    href: "/residents",
    imageSrc: IMAGES.hero.ticketing,
    imageAlt: "Train station ticketing area in Japan",
    gtagLabel: "resident_guides",
  },
];
