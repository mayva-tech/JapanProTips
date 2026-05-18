import type { GuideCardSection } from "@/lib/guide-card-item";
import { IMAGES } from "@/lib/images";

export const TOURIST_GUIDE_SECTIONS: GuideCardSection[] = [
  {
    label: "Trip planning",
    items: [
      {
        category: "Start here",
        title: "Japan Trip Planning",
        description:
          "Step-by-step order for SIM, trains, lodging, and money before you land.",
        href: "/guides/start-here-japan",
        imageSrc: IMAGES.hero.airport,
        imageAlt: "Travelers planning a Japan trip",
        gtagLabel: "start_here",
      },
      {
        category: "Start here",
        title: "Biggest Mistakes First-Time Tourists Make",
        description:
          "Common trip friction points and reassuring fixes: packing, walking, data, cash, trains, lodging, and time.",
        href: "/guides/japan-tourist-mistakes",
        imageSrc: IMAGES.hero.primary,
        imageAlt: "Travelers reflecting on Japan trip planning",
        gtagLabel: "start_here",
      },
      {
        category: "Itinerary",
        title: "Japan Itinerary (7, 10, 14 Days)",
        description:
          "Realistic routes for first-time visitors without burning out by day three.",
        href: "/guides/japan-itinerary",
        imageSrc: IMAGES.diagrams.map,
        imageAlt: "Map of Japan travel routes",
        gtagLabel: "start_here",
      },
      {
        category: "Packing",
        title: "Japan Packing List by Season",
        description:
          "What to pack for spring, summer, rainy season, autumn, and winter.",
        href: "/guides/japan-packing-list",
        imageSrc: IMAGES.hero.primary,
        imageAlt: "Traveler with luggage in Japan",
        gtagLabel: "start_here",
      },
      {
        category: "Daily life",
        title: "Japanese Toilets, Trash, and Public Etiquette",
        description:
          "Washlets, restroom habits, scarce bins, train courtesy, queues, smoking rules, and what tourists can relax about.",
        href: "/guides/how-to-use-japanese-toilets",
        imageSrc: IMAGES.hero.primary,
        imageAlt: "Travelers navigating Japan restrooms and trains",
        gtagLabel: "start_here",
      },
      {
        category: "Daily life",
        title: "How Restaurants Work in Japan",
        description:
          "Ticket machines, tablets, payments, solo dining, ramen and izakaya etiquette, allergies, and realistic budgets.",
        href: "/guides/japan-restaurant-guide",
        imageSrc: IMAGES.hero.primary,
        imageAlt: "Dining counter and menu planning in Japan",
        gtagLabel: "start_here",
      },
      {
        category: "Weather",
        title: "Japan Weather by Month",
        description:
          "Month-by-month climate for Tokyo, Kyoto, and Hokkaido before you book.",
        href: "/guides/japan-weather-by-month",
        imageSrc: IMAGES.diagrams.map,
        imageAlt: "Japan regional map for weather planning",
        gtagLabel: "start_here",
      },
    ],
  },
  {
    label: "Airport and arrival",
    items: [
      {
        category: "Airport",
        title: "First 60 Minutes at the Airport",
        description:
          "What to do right after landing at Narita or Haneda before you leave the terminal.",
        href: "/guides/japan-airport-first-steps",
        imageSrc: IMAGES.hero.airport,
        imageAlt: "Japan airport arrivals hall",
        gtagLabel: "transport",
      },
      {
        category: "Airport",
        title: "Airport to Your Hotel",
        description:
          "Narita, Haneda, and Kansai: trains, buses, and when a taxi makes sense.",
        href: "/guides/japan-airport-to-city",
        imageSrc: IMAGES.diagrams.airport,
        imageAlt: "Airport to city route diagram",
        gtagLabel: "transport",
      },
      {
        category: "Airport",
        title: "Luggage Delivery and Forwarding in Japan",
        description:
          "Yamato Kuroneko, airport to hotel, hotel to hotel, costs, timing, Shinkansen luggage rules, and when shipping beats lockers.",
        href: "/guides/japan-luggage-shipping",
        imageSrc: IMAGES.hero.primary,
        imageAlt: "Traveler with luggage planning Japan delivery",
        gtagLabel: "transport",
      },
      {
        category: "Airport",
        title: "Narita to Tokyo",
        description: "Best train and bus options from Narita to central Tokyo.",
        href: "/guides/narita-to-tokyo",
        imageSrc: IMAGES.hero.airport,
        imageAlt: "Narita airport connection to Tokyo",
        gtagLabel: "transport",
      },
      {
        category: "Airport",
        title: "Haneda to Tokyo",
        description: "Fastest ways from Haneda to your hotel in central Tokyo.",
        href: "/guides/haneda-to-tokyo",
        imageSrc: IMAGES.hero.airport,
        imageAlt: "Haneda airport to Tokyo transport",
        gtagLabel: "transport",
      },
    ],
  },
  {
    label: "Connectivity",
    items: [
      {
        category: "SIM",
        title: "Best SIM Card for Japan",
        description:
          "eSIM, pocket WiFi, and physical SIM: what actually works for visitors.",
        href: "/guides/sim-card-japan",
        imageSrc: IMAGES.guides.esim,
        imageAlt: "eSIM setup on phone in Japan",
        gtagLabel: "esim",
      },
      {
        category: "Apps",
        title: "Best Apps for Japan Travel",
        description:
          "Maps, train apps, translation, food discovery, IC wallets, taxis, and sensible download order.",
        href: "/guides/japan-apps-guide",
        imageSrc: IMAGES.guides.maps,
        imageAlt: "Mobile map apps for travel in Japan",
        gtagLabel: "esim",
      },
      {
        category: "SIM",
        title: "Do You Need a SIM in Japan?",
        description: "When you need your own data and when you can skip it.",
        href: "/guides/do-you-need-sim-japan",
        imageSrc: IMAGES.guides.esim,
        imageAlt: "Mobile data for Japan travel",
        gtagLabel: "esim",
      },
      {
        category: "SIM",
        title: "eSIM vs Pocket WiFi",
        description: "Honest tradeoffs for data, battery, and pickup hassle.",
        href: "/guides/esim-vs-pocket-wifi-japan",
        imageSrc: IMAGES.diagrams.esim,
        imageAlt: "eSIM versus pocket WiFi comparison",
        gtagLabel: "esim",
      },
      {
        category: "SIM",
        title: "Airalo vs Ubigi",
        description: "Which Japan eSIM provider fits most short trips.",
        href: "/guides/airalo-vs-ubigi-japan",
        imageSrc: IMAGES.guides.esim,
        imageAlt: "Japan eSIM provider comparison",
        gtagLabel: "esim",
      },
    ],
  },
  {
    label: "Transport",
    items: [
      {
        category: "Transport",
        title: "Getting Around Japan",
        description:
          "Trains, IC cards, and apps for beginners without map overload.",
        href: "/guides/getting-around-japan",
        imageSrc: IMAGES.hero.shinkansen,
        imageAlt: "Shinkansen and local trains in Japan",
        gtagLabel: "transport",
      },
      {
        category: "Transport",
        title: "How to Use Trains in Japan",
        description: "IC cards, local vs express, and day-one habits that help.",
        href: "/guides/japan-trains",
        imageSrc: IMAGES.hero.shinkansen,
        imageAlt: "Japan train platform",
        gtagLabel: "transport",
      },
      {
        category: "Transport",
        title: "Japan Transportation Overview",
        description: "Trains, IC cards, and apps for visitors in one place.",
        href: "/guides/japan-transportation",
        imageSrc: IMAGES.hero.ticketing,
        imageAlt: "Train station ticketing in Japan",
        gtagLabel: "transport",
      },
      {
        category: "Transport",
        title: "Japan Train Mistakes",
        description: "Common tourist errors and how to avoid them on the rails.",
        href: "/guides/japan-train-mistakes",
        imageSrc: IMAGES.hero.ticketing,
        imageAlt: "Train station gate in Japan",
        gtagLabel: "transport",
      },
      {
        category: "IC cards",
        title: "Suica vs PASMO",
        description: "Which IC card to use and when it actually matters.",
        href: "/guides/suica-vs-pasmo",
        imageSrc: IMAGES.hero.suica,
        imageAlt: "Suica IC card in Japan",
        gtagLabel: "transport",
      },
      {
        category: "IC cards",
        title: "Suica and PASMO Explained",
        description: "How IC cards work for tourists in plain language.",
        href: "/guides/suica-pasmo-guide",
        imageSrc: IMAGES.guides.suica,
        imageAlt: "Suica and PASMO card guide",
        gtagLabel: "transport",
      },
    ],
  },
  {
    label: "Money",
    items: [
      {
        category: "Money",
        title: "Money, Cards, and Cash",
        description:
          "When to carry yen, which cards work, and payment surprises to avoid.",
        href: "/guides/money-payments-japan",
        imageSrc: IMAGES.hero.suica,
        imageAlt: "Cash and cards in Japan",
        gtagLabel: "budget",
      },
      {
        category: "Money",
        title: "Japan Trip Cost Breakdown",
        description: "Real yen ranges for food, trains, and lodging in 2026.",
        href: "/guides/japan-budget-breakdown",
        imageSrc: IMAGES.hero.suica,
        imageAlt: "Japan travel budget planning",
        gtagLabel: "budget",
      },
      {
        category: "Money",
        title: "Japanese Convenience Stores Explained",
        description:
          "7-Eleven, Lawson, FamilyMart: food, ATMs, tickets, etiquette, and what to buy.",
        href: "/guides/japan-convenience-store-guide",
        imageSrc: IMAGES.hero.primary,
        imageAlt: "Japan convenience store shelves",
        gtagLabel: "budget",
      },
    ],
  },
  {
    label: "Where to stay",
    items: [
      {
        category: "Lodging",
        title: "Where to Stay in Japan",
        description: "Tokyo, Osaka, and Kyoto: first-time lodging overview.",
        href: "/guides/where-to-stay-japan",
        imageSrc: IMAGES.guides.maps,
        imageAlt: "Japan lodging planning map",
        gtagLabel: "hotel",
      },
      {
        category: "Lodging",
        title: "Where to Stay in Tokyo",
        description: "Best areas for first-time visitors near useful stations.",
        href: "/guides/where-to-stay-tokyo",
        imageSrc: IMAGES.guides.maps,
        imageAlt: "Tokyo neighborhood map",
        gtagLabel: "hotel",
      },
      {
        category: "Lodging",
        title: "Where to Stay in Kyoto",
        description:
          "Kyoto Station, Gion, Kawaramachi, Higashiyama, and Arashiyama compared.",
        href: "/guides/where-to-stay-kyoto",
        imageSrc: IMAGES.hero.primary,
        imageAlt: "Traditional street in Kyoto",
        gtagLabel: "hotel",
      },
      {
        category: "Lodging",
        title: "Where to Stay in Osaka",
        description:
          "Namba, Umeda, Shinsaibashi, Shin-Osaka, and Tennoji compared for first-time visitors.",
        href: "/guides/where-to-stay-osaka",
        imageSrc: IMAGES.hero.primary,
        imageAlt: "Osaka city street at night",
        gtagLabel: "hotel",
      },
      {
        category: "Lodging",
        title: "Best Tokyo Area for First Timers",
        description: "Neighborhood picks when you want the safest default.",
        href: "/guides/best-area-tokyo-first-time",
        imageSrc: IMAGES.guides.maps,
        imageAlt: "Tokyo area comparison for visitors",
        gtagLabel: "hotel",
      },
      {
        category: "Lodging",
        title: "Shinjuku vs Shibuya",
        description: "Where to stay when both neighborhoods are on your short list.",
        href: "/guides/shinjuku-vs-shibuya",
        imageSrc: IMAGES.guides.maps,
        imageAlt: "Shinjuku and Shibuya comparison",
        gtagLabel: "hotel",
      },
    ],
  },
];

/** Flat list of every tourist guide (for counts, search, etc.). */
export const ALL_TOURIST_GUIDES = TOURIST_GUIDE_SECTIONS.flatMap(
  (section) => section.items,
);
