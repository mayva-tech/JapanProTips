import type { GuideCardItem } from "@/lib/guide-card-item";
import { IMAGES } from "@/lib/images";

export type PopularStartHereGuideItem = GuideCardItem;

export const POPULAR_START_HERE_GUIDES: GuideCardItem[] = [
  {
    category: "Trip planning",
    title: "Start Here Japan Trip Planning",
    description:
      "The step-by-step order for SIM, trains, lodging, and money before you land.",
    href: "/guides/start-here-japan",
    imageSrc: IMAGES.hero.airport,
    imageAlt: "Travelers arriving at a Japan airport",
    gtagLabel: "start_here",
  },
  {
    category: "Packing",
    title: "Japan Packing List for Every Season",
    description:
      "What to pack for spring, summer, rainy season, autumn, and winter without overfilling your bag.",
    href: "/guides/japan-packing-list",
    imageSrc: IMAGES.hero.primary,
    imageAlt: "Traveler with luggage at a Japan train station",
    gtagLabel: "start_here",
  },
  {
    category: "Weather",
    title: "Japan Weather by Month",
    description:
      "Month-by-month climate notes for Tokyo, Kyoto, and Hokkaido so you pack and plan realistically.",
    href: "/guides/japan-weather-by-month",
    imageSrc: IMAGES.diagrams.map,
    imageAlt: "Map of Japan regions for seasonal planning",
    gtagLabel: "start_here",
  },
  {
    category: "Connectivity",
    title: "Best SIM Card for Japan",
    description:
      "eSIM, pocket WiFi, and physical SIM: what actually works for first-time visitors.",
    href: "/guides/sim-card-japan",
    imageSrc: IMAGES.guides.esim,
    imageAlt: "Phone showing eSIM setup for travel in Japan",
    gtagLabel: "esim",
  },
  {
    category: "Transport",
    title: "How to Use Trains in Japan",
    description:
      "IC cards, local vs express trains, and habits that keep you moving on day one.",
    href: "/guides/japan-trains",
    imageSrc: IMAGES.hero.shinkansen,
    imageAlt: "Shinkansen train at a station in Japan",
    gtagLabel: "transport",
  },
  {
    category: "Lodging",
    title: "Where to Stay in Tokyo",
    description:
      "Station distance beats hotel stars. Practical neighborhood picks for first-time visitors.",
    href: "/guides/where-to-stay-tokyo",
    imageSrc: IMAGES.guides.maps,
    imageAlt: "Map planning for Tokyo neighborhoods and stations",
    gtagLabel: "hotel",
  },
];
