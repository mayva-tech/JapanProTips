import { EXPANDED_CURATED_ITINERARY_TEMPLATES } from "@/lib/itinerary/curated-itinerary-templates-expanded";
import type { GenerateItineraryRequest } from "@/types/itinerary-api";
import type {
  ItineraryDuration,
  ItineraryTheme,
  StartCity,
  TravelPace,
  TravelStyle,
} from "@/types/itinerary";

export type CuratedTemplateStop = {
  name: string;
  description: string;
  estimatedTime?: string;
};

export type CuratedTemplateDay = {
  dayNumber: number;
  title: string;
  city: string;
  summary: string;
  stops: CuratedTemplateStop[];
};

export type CuratedTemplateGuideLink = {
  href: string;
  label: string;
};

export type CuratedItineraryTemplate = {
  slug: string;
  title: string;
  description: string;
  duration: ItineraryDuration;
  startCity: StartCity;
  theme: ItineraryTheme;
  travelStyle: TravelStyle;
  pace: TravelPace;
  audience: string;
  bestFor: string;
  routeSummary: string;
  practicalNotes: string[];
  days: CuratedTemplateDay[];
  relatedGuideLinks: CuratedTemplateGuideLink[];
  plannerDefaults: GenerateItineraryRequest;
  /** Optional override for display when title duration differs from planner enum. */
  outlineDurationLabel?: string;
  /** Optional note near planner CTA. */
  plannerNote?: string;
};

export const TEMPLATE_STARTING_POINT_NOTE =
  "Use this template as a starting point. You can adjust the generated plan before saving or exporting.";

export const CURATED_ITINERARY_TEMPLATES: CuratedItineraryTemplate[] = [
  {
    slug: "7-day-japan-first-time",
    title: "7-Day Japan First-Time Itinerary",
    description:
      "A practical one-week loop for first-time visitors: Tokyo anchors, Kyoto culture, and Osaka food, with realistic transit days and buffer time built in.",
    duration: 7,
    startCity: "Tokyo",
    theme: "temples",
    travelStyle: "mid-range",
    pace: "moderate",
    audience:
      "First-time visitors who want a balanced Japan introduction without changing hotels every night.",
    bestFor:
      "Travelers with about seven days who are fine using Shinkansen between regions and want one clear east-to-west flow.",
    routeSummary: "Tokyo (3 nights) → Kyoto (2 nights) → Osaka (1–2 nights), then depart from Osaka or return to Tokyo.",
    practicalNotes: [
      "Activate data on airport WiFi before you tap through ticket gates.",
      "Reserve Shinkansen seats a few days ahead in peak seasons, not months early unless you are on a holiday week.",
      "Keep one half-day unplanned in each city for weather, jet lag, or a neighborhood you discover on foot.",
    ],
    days: [
      {
        dayNumber: 1,
        title: "Tokyo arrival and neighborhood walk",
        city: "Tokyo",
        summary: "Land, settle near a major JR or metro hub, and take a short orientation walk.",
        stops: [
          {
            name: "Airport to city transfer",
            description:
              "Narita or Haneda to your hotel zone. Use reserved seats if you have heavy bags.",
            estimatedTime: "Morning",
          },
          {
            name: "Hotel check-in buffer",
            description: "Drop bags, buy a Suica or PASMO, and confirm tomorrow's first train time.",
            estimatedTime: "Afternoon",
          },
          {
            name: "Local dinner street",
            description:
              "One calm dinner area near your stay: Shinjuku, Ueno, or Tokyo Station side streets.",
            estimatedTime: "Evening",
          },
        ],
      },
      {
        dayNumber: 2,
        title: "Tokyo classic east loop",
        city: "Tokyo",
        summary: "Shrines, gardens, and a market block without crossing the whole city.",
        stops: [
          {
            name: "Senso-ji and Asakusa",
            description: "Morning visit before crowds thicken; short walk along Nakamise.",
            estimatedTime: "9:00",
          },
          {
            name: "Ueno Park or Yanaka",
            description: "Museum time box or a quieter residential walk north of the park.",
            estimatedTime: "11:30",
          },
          {
            name: "Tokyo Skytree area (optional)",
            description: "Viewpoint only if weather is clear; skip if you are jet-lagged.",
            estimatedTime: "15:00",
          },
        ],
      },
      {
        dayNumber: 3,
        title: "Tokyo to Kyoto",
        city: "Tokyo → Kyoto",
        summary: "Shinkansen travel day with an evening stroll in central Kyoto.",
        stops: [
          {
            name: "Tokyo Station Shinkansen",
            description: "Tokaido line toward Kyoto; buy food before boarding.",
            estimatedTime: "Morning",
          },
          {
            name: "Kyoto hotel check-in",
            description: "Stay near Karasuma, Kawaramachi, or Kyoto Station for easy buses.",
            estimatedTime: "Afternoon",
          },
          {
            name: "Pontocho or Nishiki area",
            description: "Light evening walk and dinner; no need to book every meal.",
            estimatedTime: "Evening",
          },
        ],
      },
      {
        dayNumber: 4,
        title: "Kyoto east highlights",
        city: "Kyoto",
        summary: "Fushimi Inari and Higashiyama with an early start to beat tour buses.",
        stops: [
          {
            name: "Fushimi Inari",
            description: "Go early; turn back when the climb stops feeling fun.",
            estimatedTime: "8:00",
          },
          {
            name: "Kiyomizu-dera area",
            description: "Walk Sannenzaka/Ninenzaka; expect steps and souvenir lanes.",
            estimatedTime: "11:00",
          },
          {
            name: "Gion evening walk",
            description: "Respect residential streets; photography only where signs allow.",
            estimatedTime: "17:30",
          },
        ],
      },
      {
        dayNumber: 5,
        title: "Kyoto west or Arashiyama",
        city: "Kyoto",
        summary: "Bamboo grove and river walk, or a temple garden if you want a slower day.",
        stops: [
          {
            name: "Arashiyama bamboo grove",
            description: "Morning visit; pair with Tenryu-ji garden if lines are reasonable.",
            estimatedTime: "9:00",
          },
          {
            name: "River lunch break",
            description: "Café or soba stop along the Katsura river side paths.",
            estimatedTime: "12:30",
          },
          {
            name: "Kyoto to Osaka transfer",
            description: "Short hop by train; check into Osaka near Namba or Umeda.",
            estimatedTime: "Late afternoon",
          },
        ],
      },
      {
        dayNumber: 6,
        title: "Osaka food and waterfront",
        city: "Osaka",
        summary: "Dotonbori energy with a calmer castle or bay block if you want balance.",
        stops: [
          {
            name: "Kuromon Market morning",
            description: "Snack-focused walk; go early for fewer lines.",
            estimatedTime: "9:30",
          },
          {
            name: "Osaka Castle park",
            description: "Park loop is enough unless you love history museums inside.",
            estimatedTime: "13:00",
          },
          {
            name: "Dotonbori dinner",
            description: "Takoyaki, okonomiyaki, or kushikatsu; pick one specialty, not all three.",
            estimatedTime: "18:30",
          },
        ],
      },
      {
        dayNumber: 7,
        title: "Departure buffer",
        city: "Osaka or Tokyo",
        summary: "Last-minute shopping, airport transfer, and time padding for delays.",
        stops: [
          {
            name: "Last shopping block",
            description: "Conbini omiyage or one department store near your station.",
            estimatedTime: "Morning",
          },
          {
            name: "Airport express",
            description: "Kansai or return Shinkansen to Tokyo depending on your flight.",
            estimatedTime: "Midday",
          },
        ],
      },
    ],
    relatedGuideLinks: [
      { href: "/guides/japan-itinerary", label: "Japan itinerary guide" },
      { href: "/guides/japan-trains", label: "Japan trains guide" },
      { href: "/guides/japan-budget-breakdown", label: "Japan budget breakdown" },
      { href: "/guides/where-to-stay-tokyo", label: "Where to stay in Tokyo" },
      { href: "/guides/sim-card-japan", label: "SIM card in Japan" },
    ],
    plannerDefaults: {
      duration: 7,
      startCity: "Tokyo",
      theme: "temples",
      travelStyle: "mid-range",
      pace: "moderate",
    },
  },
  {
    slug: "14-day-japan-golden-route",
    title: "14-Day Japan Golden Route Itinerary",
    description:
      "A two-week classic route through Tokyo, Hakone, Kyoto, Osaka, and Hiroshima with Miyajima, paced for culture, food, and scenic transit without racing every prefecture.",
    duration: 14,
    startCity: "Tokyo",
    theme: "temples",
    travelStyle: "mid-range",
    pace: "moderate",
    audience:
      "Travelers with two full weeks who want the well-known Japan highlights in one continuous loop.",
    bestFor:
      "Visitors who accept two or three hotel changes and want Hiroshima/Miyajima in the same trip as Kansai.",
    routeSummary:
      "Tokyo → Hakone (1–2 nights) → Kyoto (4 nights) → Osaka (2 nights) → Hiroshima + Miyajima (2 nights) → Tokyo buffer (1 night) or fly out from Kansai/Hiroshima.",
    practicalNotes: [
      "Hakone Freepass or local bundles can simplify mountain transport; compare with paying per leg.",
      "Miyajima ferry times vary by season; check last return boat the day before.",
      "A JR Pass is not automatic value; add your exact legs in a calculator before you buy.",
    ],
    days: [
      {
        dayNumber: 1,
        title: "Tokyo arrival",
        city: "Tokyo",
        summary: "Settle in, IC card, and a short evening walk near your station.",
        stops: [
          {
            name: "Airport to hotel",
            description: "Pick Narita or Haneda transfer that matches your landing terminal.",
            estimatedTime: "Daytime",
          },
          {
            name: "Neighborhood orientation",
            description: "Find konbini, ATM, and nearest JR/metro entrance.",
            estimatedTime: "Evening",
          },
        ],
      },
      {
        dayNumber: 2,
        title: "Tokyo central loop",
        city: "Tokyo",
        summary: "Imperial East Gardens, Ginza, and Tokyo Station architecture.",
        stops: [
          {
            name: "Imperial Palace East Gardens",
            description: "Free park loop; closed Mondays and some holidays.",
            estimatedTime: "9:00",
          },
          {
            name: "Ginza lunch walk",
            description: "Department store food halls are good rainy-day backups.",
            estimatedTime: "12:00",
          },
          {
            name: "Tokyo Station City",
            description: "Ramen street or pastry stops before an early night.",
            estimatedTime: "16:00",
          },
        ],
      },
      {
        dayNumber: 3,
        title: "Tokyo west side",
        city: "Tokyo",
        summary: "Harajuku, Meiji Shrine, and Shibuya crossing at human pace.",
        stops: [
          {
            name: "Meiji Jingu",
            description: "Forest approach is the main event; go morning for calm.",
            estimatedTime: "9:00",
          },
          {
            name: "Harajuku side streets",
            description: "Short browse; skip if crowds trigger fatigue.",
            estimatedTime: "11:30",
          },
          {
            name: "Shibuya evening",
            description: "Crossing once is enough; dinner in backstreets nearby.",
            estimatedTime: "18:00",
          },
        ],
      },
      {
        dayNumber: 4,
        title: "Tokyo to Hakone",
        city: "Hakone",
        summary: "Romancecar or local trains into the mountains; onsen hotel night.",
        stops: [
          {
            name: "Shinjuku to Hakone",
            description: "Odakyu line or packaged pass; store luggage if needed.",
            estimatedTime: "Morning",
          },
          {
            name: "Lake Ashi loop (weather permitting)",
            description: "Pirate ship is optional; views matter more than the boat.",
            estimatedTime: "Afternoon",
          },
          {
            name: "Onsen evening",
            description: "Hotel bath timing rules vary; read the house note at check-in.",
            estimatedTime: "Evening",
          },
        ],
      },
      {
        dayNumber: 5,
        title: "Hakone to Kyoto",
        city: "Kyoto",
        summary: "Descend from Hakone and take Shinkansen to Kyoto.",
        stops: [
          {
            name: "Open-air museum (optional)",
            description: "Swap for a chill morning if yesterday was rainy.",
            estimatedTime: "9:00",
          },
          {
            name: "Shinkansen to Kyoto",
            description: "Allow transfer time back toward Odawara or Tokyo first.",
            estimatedTime: "Midday",
          },
        ],
      },
      {
        dayNumber: 6,
        title: "Kyoto east",
        city: "Kyoto",
        summary: "Fushimi Inari and Higashiyama slopes.",
        stops: [
          {
            name: "Fushimi Inari early",
            description: "First hour is the best light and fewest groups.",
            estimatedTime: "7:30",
          },
          {
            name: "Higashiyama walk",
            description: "Kiyomizu-dera and downhill lanes toward Yasaka.",
            estimatedTime: "11:00",
          },
        ],
      },
      {
        dayNumber: 7,
        title: "Kyoto west",
        city: "Kyoto",
        summary: "Arashiyama bamboo and river paths.",
        stops: [
          {
            name: "Arashiyama",
            description: "Combine bamboo with a temple garden if tickets are available.",
            estimatedTime: "9:00",
          },
          {
            name: "Sagano tram (optional)",
            description: "Scenic ride when you want less walking.",
            estimatedTime: "14:00",
          },
        ],
      },
      {
        dayNumber: 8,
        title: "Kyoto north or slow day",
        city: "Kyoto",
        summary: "Kinkaku-ji and Ryoan-ji, or a café day if you need rest.",
        stops: [
          {
            name: "Kinkaku-ji",
            description: "Go early; grounds are compact.",
            estimatedTime: "9:00",
          },
          {
            name: "Ryoan-ji rock garden",
            description: "Quiet counterpoint to yesterday's river walk.",
            estimatedTime: "11:00",
          },
        ],
      },
      {
        dayNumber: 9,
        title: "Nara day trip",
        city: "Nara",
        summary: "Deer park, Todai-ji, and return to Kyoto or Osaka base.",
        stops: [
          {
            name: "Nara Park loop",
            description: "Train from Kyoto; mind your snacks around deer.",
            estimatedTime: "9:30",
          },
          {
            name: "Todai-ji",
            description: "Main hall visit; allow queue time on weekends.",
            estimatedTime: "11:00",
          },
        ],
      },
      {
        dayNumber: 10,
        title: "Osaka base",
        city: "Osaka",
        summary: "Move to Osaka for food-focused evenings.",
        stops: [
          {
            name: "Osaka check-in",
            description: "Namba or Umeda keeps dinner options open.",
            estimatedTime: "Afternoon",
          },
          {
            name: "Dotonbori night",
            description: "Street food sampler with one sit-down meal.",
            estimatedTime: "19:00",
          },
        ],
      },
      {
        dayNumber: 11,
        title: "Osaka to Hiroshima",
        city: "Hiroshima",
        summary: "Shinkansen west; Peace Park and local okonomiyaki.",
        stops: [
          {
            name: "Peace Memorial Park",
            description: "Museum time box; pace emotionally.",
            estimatedTime: "13:00",
          },
          {
            name: "Hiroshima-style okonomiyaki",
            description: "Layered style differs from Osaka; try one counter seat.",
            estimatedTime: "18:00",
          },
        ],
      },
      {
        dayNumber: 12,
        title: "Miyajima day",
        city: "Miyajima",
        summary: "Ferry to the island shrine and forest paths.",
        stops: [
          {
            name: "Ferry to Miyajima",
            description: "Check tide times for floating torii photos.",
            estimatedTime: "9:00",
          },
          {
            name: "Itsukushima shrine area",
            description: "Respect rope-off zones during high tide events.",
            estimatedTime: "11:00",
          },
          {
            name: "Return to Hiroshima",
            description: "Pack light for the ferry legs.",
            estimatedTime: "Late afternoon",
          },
        ],
      },
      {
        dayNumber: 13,
        title: "Return toward Tokyo (optional)",
        city: "Tokyo",
        summary: "Long Shinkansen day or fly out from Hiroshima if tickets allow.",
        stops: [
          {
            name: "West-bound Shinkansen",
            description: "Tokyo night before a Narita/Haneda flight, or stay in Osaka.",
            estimatedTime: "Morning",
          },
        ],
      },
      {
        dayNumber: 14,
        title: "Departure buffer",
        city: "Tokyo or Osaka",
        summary: "Final shopping, airport train, and delay padding.",
        stops: [
          {
            name: "Airport transfer",
            description: "Leave extra time for peak-hour trains.",
            estimatedTime: "Morning",
          },
        ],
      },
    ],
    relatedGuideLinks: [
      { href: "/guides/japan-itinerary", label: "Japan itinerary guide" },
      { href: "/guides/japan-trains", label: "Japan trains guide" },
      { href: "/guides/jr-pass-worth-it", label: "JR Pass worth it?" },
      { href: "/guides/japan-budget-breakdown", label: "Japan budget breakdown" },
    ],
    plannerDefaults: {
      duration: 14,
      startCity: "Tokyo",
      theme: "temples",
      travelStyle: "mid-range",
      pace: "moderate",
    },
  },
  {
    slug: "1-day-tokyo-food",
    title: "1-Day Tokyo Food Itinerary",
    description:
      "One focused Tokyo day for market snacks, a proper lunch, station food halls, and an evening ramen or izakaya block without crossing the city all day.",
    duration: 1,
    startCity: "Tokyo",
    theme: "food",
    travelStyle: "mid-range",
    pace: "moderate",
    audience: "Short layover visitors or travelers dedicating one clear food day in Tokyo.",
    bestFor:
      "Anyone who wants a realistic tasting route rather than ten famous restaurants in twelve hours.",
    routeSummary:
      "Tsukiji Outer Market → Ginza lunch → Tokyo Station food hall → Shinjuku evening noodles or izakaya.",
    practicalNotes: [
      "Many spots are cash-friendly; keep some yen even if you use cards elsewhere.",
      "Lunch queues spike at 12:00; eat at 11:30 or 13:30 when possible.",
      "This is a walking-heavy day; wear shoes you already trust.",
    ],
    days: [
      {
        dayNumber: 1,
        title: "Tokyo food loop",
        city: "Tokyo",
        summary: "Markets in the morning, sit-down lunch, station snacks, Shinjuku dinner.",
        stops: [
          {
            name: "Tsukiji Outer Market",
            description:
              "Seafood snacks, tamagoyaki, and coffee; go before 10:00 for cooler air and shorter lines.",
            estimatedTime: "8:30",
          },
          {
            name: "Ginza lunch",
            description:
              "Pick one style: tempura set, sushi lunch, or kissaten pause before moving on.",
            estimatedTime: "11:30",
          },
          {
            name: "Tokyo Station Ramen Street or depachika",
            description:
              "Covered backup if weather turns; good for omiyage tasting without a detour.",
            estimatedTime: "15:00",
          },
          {
            name: "Shinjuku evening",
            description:
              "Omoide Yokocho or a single ramen shop; stop when full, not when the list ends.",
            estimatedTime: "19:00",
          },
        ],
      },
    ],
    relatedGuideLinks: [
      { href: "/guides/japan-restaurant-guide", label: "Japan restaurant guide" },
      { href: "/guides/japan-conbini-food-guide", label: "Conbini food guide" },
      { href: "/guides/where-to-stay-tokyo", label: "Where to stay in Tokyo" },
      { href: "/guides/japan-trains", label: "Japan trains guide" },
    ],
    plannerDefaults: {
      duration: 1,
      startCity: "Tokyo",
      theme: "food",
      travelStyle: "mid-range",
      pace: "moderate",
    },
  },
  {
    slug: "7-day-japan-anime-shopping",
    title: "7-Day Japan Anime and Shopping Itinerary",
    description:
      "One week centered on Tokyo and Osaka otaku districts, department store browsing, and optional Kyoto stop for character goods without queueing every pop-up.",
    duration: 7,
    startCity: "Tokyo",
    theme: "anime",
    travelStyle: "mid-range",
    pace: "moderate",
    audience:
      "Fans of anime, manga, games, and character goods who still want manageable transit days.",
    bestFor:
      "Travelers who care more about shops and cafés than temples, with energy for evening districts.",
    routeSummary:
      "Tokyo (Akihabara, Ikebukuro, Nakano, Shibuya) → optional Kyoto character street → Osaka (Nipponbashi, Umeda).",
    practicalNotes: [
      "Tax-free counters need passport and same-day store rules; ask before you split payments.",
      "Pop-up cafés often need reservations; treat them as optional, not the spine of the day.",
      "Set a suitcase rule early if you plan heavy merch buys.",
    ],
    days: [
      {
        dayNumber: 1,
        title: "Tokyo arrival and base setup",
        city: "Tokyo",
        summary: "Check in near a JR hub; light conbini dinner and early sleep.",
        stops: [
          {
            name: "Hotel near JR line",
            description: "Shinjuku, Tokyo, or Ueno keeps cross-town hops simpler.",
            estimatedTime: "Afternoon",
          },
          {
            name: "Evening konbini recon",
            description: "Figure out nearest ATM, locker bank, and train card machine.",
            estimatedTime: "Evening",
          },
        ],
      },
      {
        dayNumber: 2,
        title: "Akihabara core",
        city: "Tokyo",
        summary: "Retro games, figure shops, and radio kaikan building loops.",
        stops: [
          {
            name: "Akihabara main strip",
            description: "Walk the arcade buildings before noon crowds.",
            estimatedTime: "10:00",
          },
          {
            name: "Mandarake or specialty shop",
            description: "Pick one deep browse instead of ten shallow ones.",
            estimatedTime: "13:00",
          },
          {
            name: "Kanda used books (optional)",
            description: "Short detour if you want manga back issues.",
            estimatedTime: "16:00",
          },
        ],
      },
      {
        dayNumber: 3,
        title: "Ikebukuro and Nakano",
        city: "Tokyo",
        summary: "Otome Road and Nakano Broadway for different fan niches.",
        stops: [
          {
            name: "Ikebukuro Otome Road",
            description: "Character shops and cafés; check reservation boards.",
            estimatedTime: "10:30",
          },
          {
            name: "Nakano Broadway",
            description: "Compact floors; good for vintage figures and cards.",
            estimatedTime: "14:00",
          },
        ],
      },
      {
        dayNumber: 4,
        title: "Shibuya and Harajuku retail",
        city: "Tokyo",
        summary: "Fashion crossover, Pokémon Center, and department store tax-free stop.",
        stops: [
          {
            name: "Shibuya crossing area",
            description: "Department stores for character corners and stationery.",
            estimatedTime: "11:00",
          },
          {
            name: "Harajuku character street",
            description: "Short visit if crowds are manageable.",
            estimatedTime: "15:00",
          },
        ],
      },
      {
        dayNumber: 5,
        title: "Tokyo to Osaka",
        city: "Osaka",
        summary: "Shinkansen hop; Nipponbashi evening walk.",
        stops: [
          {
            name: "Shinkansen to Shin-Osaka",
            description: "Store bags in lockers if hotel check-in is later.",
            estimatedTime: "Morning",
          },
          {
            name: "Nipponbashi Den Den Town",
            description: "Evening neon browse; compare prices before big buys.",
            estimatedTime: "18:00",
          },
        ],
      },
      {
        dayNumber: 6,
        title: "Osaka shopping day",
        city: "Osaka",
        summary: "Umeda department stores and Namba underground malls.",
        stops: [
          {
            name: "Umeda sky area shops",
            description: "Tax-free desk often on a mid-floor; bring passport.",
            estimatedTime: "11:00",
          },
          {
            name: "Namba Parks or Namba Walk",
            description: "Covered walking if weather is poor.",
            estimatedTime: "15:00",
          },
        ],
      },
      {
        dayNumber: 7,
        title: "Kyoto optional or departure",
        city: "Kyoto or Osaka",
        summary: "Half-day Kyoto character street or pack and head to airport.",
        stops: [
          {
            name: "Kyoto Teramachi (optional)",
            description: "Quick stop if you have a rail day spare; else shop Namba omiyage.",
            estimatedTime: "Morning",
          },
          {
            name: "Airport transfer",
            description: "Kansai or return to Tokyo depending on flight.",
            estimatedTime: "Afternoon",
          },
        ],
      },
    ],
    relatedGuideLinks: [
      { href: "/guides/japan-anime-shopping-guide", label: "Anime shopping guide" },
      { href: "/guides/japan-tax-free-shopping", label: "Tax-free shopping" },
      { href: "/guides/japan-trains", label: "Japan trains guide" },
      { href: "/guides/where-to-stay-tokyo", label: "Where to stay in Tokyo" },
    ],
    plannerDefaults: {
      duration: 7,
      startCity: "Tokyo",
      theme: "anime",
      travelStyle: "mid-range",
      pace: "moderate",
    },
  },
  {
    slug: "7-day-kansai-first-time",
    title: "7-Day Kansai First-Time Itinerary",
    description:
      "One week based in Osaka and Kyoto with a Nara day trip and Kobe evening food stop, aimed at temples, street food, and easy JR loops.",
    duration: 7,
    startCity: "Osaka",
    theme: "temples",
    travelStyle: "mid-range",
    pace: "moderate",
    audience:
      "First-time visitors who want to skip Tokyo and focus on Kansai culture and food.",
    bestFor:
      "Travelers flying into Kansai (ITM/KIX) who prefer fewer hotel moves and strong train links.",
    routeSummary:
      "Osaka base → Kyoto (2–3 days) → Nara day trip → Kobe evening → Osaka departure.",
    practicalNotes: [
      "IC card works across most Kansai urban lines; top up before busy Saturday mornings.",
      "Kyoto buses get crowded; start east highlights early and walk downhill when possible.",
      "Osaka dinner districts are loud and fun; book only if you want a specific chef counter.",
    ],
    days: [
      {
        dayNumber: 1,
        title: "Osaka arrival",
        city: "Osaka",
        summary: "Airport to Namba or Umeda; short canal walk and dinner.",
        stops: [
          {
            name: "KIX or ITM transfer",
            description: "Nankai, JR, or limousine bus depending on landing airport.",
            estimatedTime: "Afternoon",
          },
          {
            name: "Dotonbori evening stroll",
            description: "Orientation walk; one food specialty tonight.",
            estimatedTime: "19:00",
          },
        ],
      },
      {
        dayNumber: 2,
        title: "Osaka city highlights",
        city: "Osaka",
        summary: "Castle park, market street, and Namba backstreets.",
        stops: [
          {
            name: "Osaka Castle park",
            description: "Exterior loop is enough for most visitors.",
            estimatedTime: "9:30",
          },
          {
            name: "Kuromon Market",
            description: "Morning snacks; go before lunch rush.",
            estimatedTime: "11:00",
          },
          {
            name: "Shinsekai (optional)",
            description: "Retro vibe; keep expectations local and casual.",
            estimatedTime: "16:00",
          },
        ],
      },
      {
        dayNumber: 3,
        title: "Kyoto day one",
        city: "Kyoto",
        summary: "Train to Kyoto; east side temples with an early start.",
        stops: [
          {
            name: "Fushimi Inari",
            description: "First trains from Osaka; hike only as far as feels good.",
            estimatedTime: "8:00",
          },
          {
            name: "Higashiyama lanes",
            description: "Walk toward Yasaka; café break on the slope.",
            estimatedTime: "12:00",
          },
        ],
      },
      {
        dayNumber: 4,
        title: "Kyoto day two",
        city: "Kyoto",
        summary: "Arashiyama or north temples depending on weather.",
        stops: [
          {
            name: "Arashiyama bamboo",
            description: "Pair with river walk; avoid midday tour peaks.",
            estimatedTime: "9:00",
          },
          {
            name: "Nishiki market tasting",
            description: "Small bites instead of a heavy lunch.",
            estimatedTime: "15:00",
          },
        ],
      },
      {
        dayNumber: 5,
        title: "Nara day trip",
        city: "Nara",
        summary: "Deer park, Great Buddha, and return to Osaka.",
        stops: [
          {
            name: "Nara Park",
            description: "JR Nara line from Osaka or Kyoto; half-day is enough.",
            estimatedTime: "9:30",
          },
          {
            name: "Todai-ji",
            description: "Allow time for the main hall queue.",
            estimatedTime: "11:00",
          },
        ],
      },
      {
        dayNumber: 6,
        title: "Kobe evening",
        city: "Kobe",
        summary: "Harbor views and beef or seafood dinner with a late return.",
        stops: [
          {
            name: "Harborland walk",
            description: "Sunset if weather cooperates.",
            estimatedTime: "16:00",
          },
          {
            name: "Kobe dinner",
            description: "Steak, seafood, or Chinatown; pick one focus.",
            estimatedTime: "18:30",
          },
        ],
      },
      {
        dayNumber: 7,
        title: "Osaka departure",
        city: "Osaka",
        summary: "Omiyage, airport train, and buffer for delays.",
        stops: [
          {
            name: "Last-minute shopping",
            description: "Depachika under Umeda or Namba stations.",
            estimatedTime: "Morning",
          },
          {
            name: "Airport transfer",
            description: "KIX express timing based on your airline counter.",
            estimatedTime: "Midday",
          },
        ],
      },
    ],
    relatedGuideLinks: [
      { href: "/guides/where-to-stay-osaka", label: "Where to stay in Osaka" },
      { href: "/guides/where-to-stay-kyoto", label: "Where to stay in Kyoto" },
      { href: "/guides/japan-trains", label: "Japan trains guide" },
      { href: "/guides/japan-itinerary", label: "Japan itinerary guide" },
    ],
    plannerDefaults: {
      duration: 7,
      startCity: "Osaka",
      theme: "temples",
      travelStyle: "mid-range",
      pace: "moderate",
    },
  },
  ...EXPANDED_CURATED_ITINERARY_TEMPLATES,
];

export const CURATED_ITINERARY_TEMPLATE_SLUGS = CURATED_ITINERARY_TEMPLATES.map(
  (t) => t.slug,
);

export function getCuratedItineraryTemplateBySlug(
  slug: string,
): CuratedItineraryTemplate | undefined {
  return CURATED_ITINERARY_TEMPLATES.find((t) => t.slug === slug);
}

export function getAllCuratedItineraryTemplates(): CuratedItineraryTemplate[] {
  return CURATED_ITINERARY_TEMPLATES;
}

/** Featured on the itinerary planner page (compact starter cards). */
export const PLANNER_FEATURED_TEMPLATE_SLUGS = [
  "7-day-japan-first-time",
  "14-day-japan-golden-route",
  "1-day-tokyo-food",
] as const;

export function getPlannerFeaturedTemplates(): CuratedItineraryTemplate[] {
  return PLANNER_FEATURED_TEMPLATE_SLUGS.flatMap((slug) => {
    const template = getCuratedItineraryTemplateBySlug(slug);
    return template ? [template] : [];
  });
}
