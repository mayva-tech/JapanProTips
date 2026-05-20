import type { GuideCardSection } from "@/lib/guide-card-item";
import { IMAGES } from "@/lib/images";
import { VISITOR_GUIDE_COUNT } from "@/lib/tourist-guide-slugs";

/** Every live visitor guide under /guides (see lib/tourist-guide-slugs.ts). */
export const TOURIST_GUIDE_CARD_COUNT = VISITOR_GUIDE_COUNT;

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
        category: "Start here",
        title: "What Tourists Should NOT Do in Japan",
        description:
          "Calm cultural etiquette: trains, trash, temples, onsen, photos, and what locals actually care about vs what tourists overthink.",
        href: "/guides/japan-cultural-mistakes",
        imageSrc: IMAGES.hero.primary,
        imageAlt: "Travelers navigating a quiet Japan train platform",
        gtagLabel: "start_here",
      },
      {
        category: "Daily life",
        title: "Japan Escalator Rules (Tokyo vs Osaka)",
        description:
          "Stand left or right? Regional differences, rush hour flow, luggage, safety signs, and how to avoid blocking commuters.",
        href: "/guides/japan-escalator-rules",
        imageSrc: IMAGES.hero.primary,
        imageAlt: "Commuters on an escalator at a Japan train station",
        gtagLabel: "start_here",
      },
      {
        category: "Planning",
        title: "Do You Need Travel Insurance for Japan?",
        description:
          "Medical costs, what policies cover, typhoons and delays, credit card limits, and who can skip the premium tier.",
        href: "/guides/japan-travel-insurance",
        imageSrc: IMAGES.hero.airport,
        imageAlt: "Traveler reviewing trip documents before Japan",
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
        category: "Planning",
        title: "Japan Travel Fatigue and Burnout",
        description:
          "Why trips exhaust you: walking, trains, overstimulation, packed plans, and how to pace Tokyo, Kyoto, and Osaka without crashing mid-trip.",
        href: "/guides/japan-travel-fatigue",
        imageSrc: IMAGES.hero.primary,
        imageAlt: "Traveler resting on a bench after a long day in Japan",
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
        title: "Laundry in Japan for Travelers",
        description:
          "Coin laundries, hotel washers, detergent labels, drying in humidity, and mistakes that leave you with damp clothes.",
        href: "/guides/japan-laundry-guide",
        imageSrc: IMAGES.hero.primary,
        imageAlt: "Traveler using a coin laundry in Japan",
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
          "A practical first-time visitor guide to ordering, seating, payments, restaurant etiquette, and common mistakes in Japan.",
        href: "/guides/japan-restaurant-guide",
        imageSrc: IMAGES.hero.primary,
        imageAlt: "Dining counter and menu planning in Japan",
        gtagLabel: "start_here",
      },
      {
        category: "Daily life",
        title: "Food Allergies in Japan: What to Know",
        description:
          "Hidden ingredients, dashi and soy sauce, allergy cards, konbini labels, restaurant communication, and calmer strategies for allergy-sensitive travelers.",
        href: "/guides/japan-food-allergy-guide",
        imageSrc: IMAGES.hero.primary,
        imageAlt: "Traveler reading food labels in a Japan convenience store",
        gtagLabel: "start_here",
      },
      {
        category: "Daily life",
        title: "Japanese Breakfasts, Cafes, and Morning Culture",
        description:
          "Traditional breakfasts, konbini mornings, kissaten, Komeda morning sets, bakeries, coffee culture, and quiet etiquette for first-time visitors.",
        href: "/guides/japan-breakfast-cafe-guide",
        imageSrc: IMAGES.hero.primary,
        imageAlt: "Morning coffee and toast at a Japanese cafe",
        gtagLabel: "start_here",
      },
      {
        category: "Daily life",
        title: "Japanese Onsen Etiquette for First-Time Visitors",
        description:
          "Hot spring basics: washing steps, nudity, tattoo rules, ryokan baths, rotenburo, what to bring, and calm first-visit tips.",
        href: "/guides/japan-onsen-guide",
        imageSrc: IMAGES.hero.primary,
        imageAlt: "Steam rising from an outdoor onsen in Japan",
        gtagLabel: "start_here",
      },
      {
        category: "Daily life",
        title: "Japan Nightlife Explained for First-Time Visitors",
        description:
          "Izakayas, karaoke, last train, taxis, drinking etiquette, Shinjuku and Dotonbori, scams to avoid, and realistic night budgets.",
        href: "/guides/japan-nightlife-guide",
        imageSrc: IMAGES.hero.primary,
        imageAlt: "Neon street nightlife district in Japan at night",
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
      {
        category: "Weather",
        title: "Japan Rainy Season Guide for Tourists",
        description:
          "Tsuyu timing by region, humidity, packing, indoor plans, typhoon vs rainy season, crowds, and how to enjoy June travel.",
        href: "/guides/japan-rainy-season-guide",
        imageSrc: IMAGES.diagrams.map,
        imageAlt: "Traveler with umbrella during Japan rainy season",
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
        title: "How to Beat Jet Lag in Japan",
        description:
          "Recover after long flights: first-day pacing, konbini kit, sleep timing, station fatigue, and mistakes that waste your first three days.",
        href: "/guides/japan-jetlag-survival",
        imageSrc: IMAGES.hero.airport,
        imageAlt: "Tired traveler arriving at a Japan airport",
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
        category: "Transport",
        title: "How Coin Lockers Work in Japan",
        description:
          "Locker sizes, IC payment, Tokyo Station tips, pricing, oversized luggage, vs forwarding, and what to do when banks are full.",
        href: "/guides/japan-coin-lockers",
        imageSrc: IMAGES.diagrams.airport,
        imageAlt: "Coin lockers at a Japan train station",
        gtagLabel: "transport",
      },
      {
        category: "Airport",
        title: "How to Use the Post Office in Japan",
        description:
          "Postcards, stamps, Yu-Pack and EMS, international parcels, Yamato vs Japan Post, forms, and mistakes tourists make at the counter.",
        href: "/guides/japan-post-office-guide",
        imageSrc: IMAGES.hero.airport,
        imageAlt: "Traveler at a Japan Post office counter",
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
        category: "Apps",
        title: "How to Use Google Maps in Japan",
        description:
          "Station exits, underground transfers, walking times, offline backup, and mistakes that waste train time in Tokyo.",
        href: "/guides/using-google-maps-in-japan",
        imageSrc: IMAGES.guides.maps,
        imageAlt: "Traveler checking Google Maps at a Japan train station",
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
        title: "Public WiFi in Japan: What Works",
        description:
          "Airports, stations, konbini, hotels: where free WiFi helps, where it fails underground, and why most travelers still want eSIM or SIM.",
        href: "/guides/japan-public-wifi",
        imageSrc: IMAGES.guides.esim,
        imageAlt: "Traveler connecting to WiFi on a phone in Japan",
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
        title: "JR Pass: Is It Still Worth It in 2026?",
        description:
          "After the price hike: when the pass still wins, Nozomi limits, regional passes, and realistic yen math for Tokyo and Golden Route trips.",
        href: "/guides/jr-pass-worth-it",
        imageSrc: IMAGES.hero.shinkansen,
        imageAlt: "Shinkansen at a Japan station",
        gtagLabel: "transport",
      },
      {
        category: "Transport",
        title: "How to Use the Shinkansen (Bullet Train)",
        description:
          "First-timer guide: Nozomi vs Hikari, reserved seats, tickets, gates, platforms, luggage, ekiben, and a Tokyo to Kyoto walkthrough.",
        href: "/guides/shinkansen-guide",
        imageSrc: IMAGES.hero.shinkansen,
        imageAlt: "Shinkansen bullet train at a platform in Japan",
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
        title: "Cash vs Card in Japan: What Tourists Need",
        description:
          "2026 payment reality: where cash still matters, cards and IC daily use, ATMs, mobile pay, how much yen to carry, and wallet setup.",
        href: "/guides/japan-cash-vs-card",
        imageSrc: IMAGES.hero.suica,
        imageAlt: "Tourist wallet with yen cash and payment cards in Japan",
        gtagLabel: "budget",
      },
      {
        category: "Money",
        title: "How to Withdraw Cash in Japan (ATMs and Fees)",
        description:
          "Seven Bank, Japan Post, foreign card failures, DCC traps, rural cash, and how much yen to carry without fee shock.",
        href: "/guides/japan-cash-withdrawal-guide",
        imageSrc: IMAGES.hero.suica,
        imageAlt: "Tourist using an ATM at a Japan convenience store",
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
        title: "Tax-Free Shopping in Japan",
        description:
          "Who qualifies, ¥5,000 minimums, sealed consumables, passport steps, and mistakes tourists make at tax-free counters.",
        href: "/guides/japan-tax-free-shopping",
        imageSrc: IMAGES.hero.suica,
        imageAlt: "Tax-free shopping counter in a Japan store",
        gtagLabel: "budget",
      },
      {
        category: "Money",
        title: "Anime, Manga, and Figure Shopping in Japan",
        description:
          "Akihabara, Nakano, Ikebukuro, Animate, Mandarake, figures, tax-free, pricing, shipping, and collector mistakes tourists make.",
        href: "/guides/japan-anime-shopping-guide",
        imageSrc: IMAGES.hero.primary,
        imageAlt: "Anime merchandise displays in a Tokyo shopping district",
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
      {
        category: "Daily life",
        title: "7-Eleven vs Lawson vs FamilyMart",
        description:
          "Which konbini chain is best for food, coffee, ATMs, late-night meals, and what tourists notice after using all three.",
        href: "/guides/japan-familymart-lawson-7eleven-comparison",
        imageSrc: IMAGES.hero.primary,
        imageAlt: "Japanese convenience store storefront at night",
        gtagLabel: "budget",
      },
      {
        category: "Daily life",
        title: "Best Convenience Store Food to Try in Japan",
        description:
          "Onigiri, egg sandwiches, fried chicken, bento, microwave tips, budget meals, seasonal konbini picks, and what locals buy.",
        href: "/guides/japan-conbini-food-guide",
        imageSrc: IMAGES.hero.primary,
        imageAlt: "Prepared food shelves at a Japanese convenience store",
        gtagLabel: "budget",
      },
      {
        category: "Daily life",
        title: "Japanese Vending Machines Explained",
        description:
          "Drinks, hot vs cold buttons, Suica taps, realistic prices, weird machines, and trash habits for first-time visitors.",
        href: "/guides/japan-vending-machines",
        imageSrc: IMAGES.hero.primary,
        imageAlt: "Row of vending machines on a street in Japan",
        gtagLabel: "budget",
      },
      {
        category: "Daily life",
        title: "Japan Drugstores and Pharmacies",
        description:
          "Matsumoto Kiyoshi, OTC medicine rules, skincare shopping, tax-free counters, and mistakes tourists make before buying pills.",
        href: "/guides/japan-drugstore-guide",
        imageSrc: IMAGES.hero.primary,
        imageAlt: "Japanese drugstore shelves with skincare and medicine",
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
        title: "Japanese Hotel Room Size: What to Expect",
        description:
          "Business hotels, bathrooms, beds, luggage on the floor, Tokyo space, and how travelers adapt after the first-night shock.",
        href: "/guides/japan-hotel-room-size",
        imageSrc: IMAGES.guides.maps,
        imageAlt: "Compact Japanese hotel room layout",
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

if (
  process.env.NODE_ENV !== "production" &&
  ALL_TOURIST_GUIDES.length !== VISITOR_GUIDE_COUNT
) {
  throw new Error(
    `tourist-guides.ts has ${ALL_TOURIST_GUIDES.length} cards; expected ${VISITOR_GUIDE_COUNT} visitor guides`,
  );
}
