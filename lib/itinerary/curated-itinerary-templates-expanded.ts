import type { CuratedItineraryTemplate } from "@/lib/itinerary/curated-itinerary-templates";

/** Ten additional SEO-focused curated templates (Step 16). */
export const EXPANDED_CURATED_ITINERARY_TEMPLATES: CuratedItineraryTemplate[] = [
  {
    slug: "5-day-tokyo-kyoto-itinerary",
    title: "5-Day Tokyo and Kyoto Itinerary",
    description:
      "A compact five-day east-to-west plan: Tokyo neighborhoods, then Kyoto temples and markets, with one clear Shinkansen move and built-in buffer time.",
    duration: 5,
    startCity: "Tokyo",
    theme: "temples",
    travelStyle: "mid-range",
    pace: "moderate",
    audience:
      "Travelers with about five days who want Tokyo and Kyoto without a full two-city week on the road.",
    bestFor:
      "Short first trips, long weekends plus two PTO days, or visitors who will return to Osaka later.",
    routeSummary: "Tokyo (3 nights) → Kyoto (2 nights).",
    practicalNotes: [
      "Book one Shinkansen seat Tokyo–Kyoto; morning departures are easiest with luggage.",
      "Keep day 2 and day 4 flexible for weather or jet lag.",
      "Open the planner with the same five-day length to generate an editable version.",
    ],
    days: [
      {
        dayNumber: 1,
        title: "Tokyo arrival and local dinner",
        city: "Tokyo",
        summary: "Settle near a JR hub and take a short evening walk.",
        stops: [
          {
            name: "Airport to hotel",
            description: "Haneda is closer; Narita is fine with reserved seats if you have heavy bags.",
            estimatedTime: "Afternoon",
          },
          {
            name: "Neighborhood dinner",
            description: "One calm area near your stay: Ueno, Shinjuku side streets, or Tokyo Station.",
            estimatedTime: "Evening",
          },
        ],
      },
      {
        dayNumber: 2,
        title: "Tokyo east highlights",
        city: "Tokyo",
        summary: "Shrines and river walk without crossing the whole metro map.",
        stops: [
          {
            name: "Senso-ji and Asakusa",
            description: "Morning visit; short Nakamise walk.",
            estimatedTime: "9:00",
          },
          {
            name: "Ueno Park or Yanaka",
            description: "Museum time box or quieter residential streets.",
            estimatedTime: "12:00",
          },
          {
            name: "Evening ramen or izakaya",
            description: "Stay near your hotel line for an easy return.",
            estimatedTime: "19:00",
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
            name: "Tokaido Shinkansen",
            description: "Buy ekiben before boarding; store bags at Kyoto Station if needed.",
            estimatedTime: "Morning",
          },
          {
            name: "Kyoto check-in",
            description: "Stay near Karasuma, Kawaramachi, or Kyoto Station.",
            estimatedTime: "Afternoon",
          },
          {
            name: "Nishiki or Pontocho",
            description: "Light dinner walk; no need to reserve every meal.",
            estimatedTime: "Evening",
          },
        ],
      },
      {
        dayNumber: 4,
        title: "Kyoto east loop",
        city: "Kyoto",
        summary: "Early start for Fushimi Inari and Higashiyama slopes.",
        stops: [
          {
            name: "Fushimi Inari",
            description: "Go early; turn back when the climb stops feeling fun.",
            estimatedTime: "8:00",
          },
          {
            name: "Kiyomizu-dera area",
            description: "Walk Sannenzaka; expect steps and souvenir lanes.",
            estimatedTime: "11:00",
          },
          {
            name: "Gion evening walk",
            description: "Respect residential streets; follow local photo rules.",
            estimatedTime: "17:30",
          },
        ],
      },
      {
        dayNumber: 5,
        title: "Kyoto west and departure",
        city: "Kyoto",
        summary: "Arashiyama morning, then airport or return Shinkansen.",
        stops: [
          {
            name: "Arashiyama bamboo grove",
            description: "Morning visit; pair with river path if weather is good.",
            estimatedTime: "9:00",
          },
          {
            name: "Last shopping or temple garden",
            description: "Pick one stop, not three, before you travel onward.",
            estimatedTime: "12:00",
          },
          {
            name: "Departure transfer",
            description: "KIX, ITM, or Tokyo-bound Shinkansen depending on your flight.",
            estimatedTime: "Afternoon",
          },
        ],
      },
    ],
    relatedGuideLinks: [
      { href: "/guides/japan-itinerary", label: "Japan itinerary guide" },
      { href: "/guides/japan-trains", label: "Japan trains guide" },
      { href: "/guides/where-to-stay-tokyo", label: "Where to stay in Tokyo" },
      { href: "/guides/where-to-stay-kyoto", label: "Where to stay in Kyoto" },
    ],
    plannerDefaults: {
      duration: 5,
      startCity: "Tokyo",
      theme: "temples",
      travelStyle: "mid-range",
      pace: "moderate",
    },
  },
  {
    slug: "10-day-japan-first-time-itinerary",
    title: "10-Day Japan First-Time Itinerary",
    description:
      "A ten-day first-trip arc through Tokyo, Hakone or Kamakura, Kyoto, and Osaka with realistic transit days and room to breathe.",
    duration: 10,
    startCity: "Tokyo",
    theme: "temples",
    travelStyle: "mid-range",
    pace: "moderate",
    audience:
      "First-time visitors with about ten days who want the classic cities without a rushed fourteen-day marathon.",
    bestFor:
      "Travelers who can take one slow day mid-trip and one buffer day before flying home.",
    routeSummary:
      "Tokyo (4) → side trip (1) → Kyoto (3) → Osaka (2).",
    practicalNotes: [
      "Activate mobile data before you tap through gates at the airport.",
      "Reserve Shinkansen a few days ahead in peak seasons.",
      "Treat days 9–10 as flexible if you want more Tokyo time on the return leg.",
    ],
    days: [
      {
        dayNumber: 1,
        title: "Tokyo arrival",
        city: "Tokyo",
        summary: "Land, IC card, and short neighborhood orientation.",
        stops: [
          { name: "Airport transfer", description: "Haneda or Narita to hotel zone.", estimatedTime: "Afternoon" },
          { name: "Evening walk", description: "Conbini dinner and early sleep if jet-lagged.", estimatedTime: "Evening" },
        ],
      },
      {
        dayNumber: 2,
        title: "Tokyo east",
        city: "Tokyo",
        summary: "Asakusa and Ueno without a cross-town marathon.",
        stops: [
          { name: "Senso-ji", description: "Morning before tour buses peak.", estimatedTime: "9:00" },
          { name: "Ueno Park", description: "Museum or pond walk.", estimatedTime: "13:00" },
        ],
      },
      {
        dayNumber: 3,
        title: "Tokyo west",
        city: "Tokyo",
        summary: "Meiji area and Harajuku or Shibuya at a calm pace.",
        stops: [
          { name: "Meiji Shrine", description: "Forest walk; quiet morning works best.", estimatedTime: "9:30" },
          { name: "Harajuku or Shibuya", description: "Pick one district for afternoon browsing.", estimatedTime: "14:00" },
        ],
      },
      {
        dayNumber: 4,
        title: "Tokyo neighborhoods",
        city: "Tokyo",
        summary: "Choose Ginza, Shimokitazawa, or your own repeat favorite.",
        stops: [
          { name: "Flexible city block", description: "Museum, depachika, or neighborhood café crawl.", estimatedTime: "11:00" },
          { name: "Evening izakaya", description: "Stay near your JR line.", estimatedTime: "19:00" },
        ],
      },
      {
        dayNumber: 5,
        title: "Hakone or Kamakura day",
        city: "Day trip",
        summary: "One nature or coastal day without changing hotels.",
        stops: [
          { name: "Hakone loop (optional)", description: "Onsen town and lake views if weather is clear.", estimatedTime: "Morning" },
          { name: "Kamakura Great Buddha (alt.)", description: "Coastal temples if you prefer fewer mountain transfers.", estimatedTime: "Morning" },
        ],
      },
      {
        dayNumber: 6,
        title: "Tokyo to Kyoto",
        city: "Kyoto",
        summary: "Shinkansen and evening river district walk.",
        stops: [
          { name: "Shinkansen", description: "Tokaido line; lunch from ekiben.", estimatedTime: "Morning" },
          { name: "Kyoto evening", description: "Nishiki or Pontocho at walking pace.", estimatedTime: "Evening" },
        ],
      },
      {
        dayNumber: 7,
        title: "Kyoto east",
        city: "Kyoto",
        summary: "Fushimi Inari and Higashiyama early.",
        stops: [
          { name: "Fushimi Inari", description: "Start at opening hour.", estimatedTime: "8:00" },
          { name: "Higashiyama lanes", description: "Café break on the slope.", estimatedTime: "12:00" },
        ],
      },
      {
        dayNumber: 8,
        title: "Kyoto west",
        city: "Kyoto",
        summary: "Arashiyama bamboo and river path.",
        stops: [
          { name: "Arashiyama", description: "Morning bamboo grove walk.", estimatedTime: "9:00" },
          { name: "Transfer toward Osaka", description: "Short JR hop; check in Namba or Umeda.", estimatedTime: "Late afternoon" },
        ],
      },
      {
        dayNumber: 9,
        title: "Osaka food day",
        city: "Osaka",
        summary: "Market morning and Dotonbori evening.",
        stops: [
          { name: "Kuromon Market", description: "Snack-focused walk before noon.", estimatedTime: "9:30" },
          { name: "Dotonbori", description: "One specialty dinner: takoyaki, okonomiyaki, or kushikatsu.", estimatedTime: "18:30" },
        ],
      },
      {
        dayNumber: 10,
        title: "Departure buffer",
        city: "Osaka or Tokyo",
        summary: "Omiyage, airport train, and delay padding.",
        stops: [
          { name: "Last shopping", description: "Station depachika for gifts.", estimatedTime: "Morning" },
          { name: "Airport transfer", description: "KIX, ITM, or return Shinkansen to Tokyo flight.", estimatedTime: "Midday" },
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
      duration: 10,
      startCity: "Tokyo",
      theme: "temples",
      travelStyle: "mid-range",
      pace: "moderate",
    },
  },
  {
    slug: "7-day-tokyo-kyoto-osaka-itinerary",
    title: "7-Day Tokyo, Kyoto, and Osaka Itinerary",
    description:
      "One week hitting Japan's three most visited cities with clear Shinkansen legs, temple time in Kyoto, and Osaka food nights.",
    duration: 7,
    startCity: "Tokyo",
    theme: "temples",
    travelStyle: "mid-range",
    pace: "moderate",
    audience:
      "Visitors who want Tokyo, Kyoto, and Osaka in one trip without extra prefectures.",
    bestFor:
      "Seven-day itineraries flying in and out of Tokyo or Kansai with one hotel change pattern.",
    routeSummary: "Tokyo (2–3 nights) → Kyoto (2 nights) → Osaka (2 nights).",
    practicalNotes: [
      "Use luggage forwarding between cities if you hate dragging suitcases on trains.",
      "Kyoto mornings are cooler and less crowded than afternoons in peak season.",
      "Osaka is your best night for street food; keep Kyoto dinners lighter.",
    ],
    days: [
      {
        dayNumber: 1,
        title: "Tokyo arrival",
        city: "Tokyo",
        summary: "Check in and short evening walk.",
        stops: [
          { name: "Airport transfer", description: "Activate IC card before gates.", estimatedTime: "Afternoon" },
          { name: "Local dinner", description: "One neighborhood, not three.", estimatedTime: "Evening" },
        ],
      },
      {
        dayNumber: 2,
        title: "Tokyo highlights",
        city: "Tokyo",
        summary: "East Tokyo loop or teamLab-style booking if you pre-planned.",
        stops: [
          { name: "Asakusa", description: "Morning temple and market street.", estimatedTime: "9:00" },
          { name: "Skytree area (optional)", description: "Viewpoint only if weather is clear.", estimatedTime: "15:00" },
        ],
      },
      {
        dayNumber: 3,
        title: "Tokyo to Kyoto",
        city: "Kyoto",
        summary: "Shinkansen and Gion area evening.",
        stops: [
          { name: "Shinkansen", description: "Tokaido toward Kyoto.", estimatedTime: "Morning" },
          { name: "Gion walk", description: "Quiet evening streets.", estimatedTime: "18:00" },
        ],
      },
      {
        dayNumber: 4,
        title: "Kyoto temples",
        city: "Kyoto",
        summary: "Fushimi Inari and Higashiyama.",
        stops: [
          { name: "Fushimi Inari", description: "Early start.", estimatedTime: "8:00" },
          { name: "Kiyomizu-dera area", description: "Downhill walk after temple visit.", estimatedTime: "11:30" },
        ],
      },
      {
        dayNumber: 5,
        title: "Kyoto to Osaka",
        city: "Osaka",
        summary: "Arashiyama morning, then short train to Osaka.",
        stops: [
          { name: "Arashiyama", description: "Bamboo and river path.", estimatedTime: "9:00" },
          { name: "Osaka check-in", description: "Namba or Umeda base.", estimatedTime: "Afternoon" },
          { name: "Dotonbori", description: "Evening food walk.", estimatedTime: "19:00" },
        ],
      },
      {
        dayNumber: 6,
        title: "Osaka city",
        city: "Osaka",
        summary: "Castle park and market street.",
        stops: [
          { name: "Osaka Castle park", description: "Exterior loop is enough for many visitors.", estimatedTime: "10:00" },
          { name: "Kuromon Market", description: "Morning snacks.", estimatedTime: "12:00" },
        ],
      },
      {
        dayNumber: 7,
        title: "Departure",
        city: "Osaka or Tokyo",
        summary: "Airport transfer with buffer time.",
        stops: [
          { name: "Omiyage stop", description: "Station depachika.", estimatedTime: "Morning" },
          { name: "Airport train", description: "KIX or return to Tokyo.", estimatedTime: "Midday" },
        ],
      },
    ],
    relatedGuideLinks: [
      { href: "/guides/japan-itinerary", label: "Japan itinerary guide" },
      { href: "/guides/japan-trains", label: "Japan trains guide" },
      { href: "/guides/where-to-stay-tokyo", label: "Where to stay in Tokyo" },
      { href: "/guides/where-to-stay-osaka", label: "Where to stay in Osaka" },
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
    slug: "3-day-tokyo-itinerary",
    title: "3-Day Tokyo Itinerary",
    description:
      "Three focused Tokyo days for neighborhoods, food, and one viewpoint without treating the metro like a full-time job.",
    duration: 3,
    startCity: "Tokyo",
    theme: "food",
    travelStyle: "mid-range",
    pace: "moderate",
    audience: "Weekend visitors or travelers tagging Tokyo before another Asia stop.",
    bestFor: "Anyone who wants a realistic Tokyo-only short list, not ten districts in three days.",
    routeSummary: "Day 1 east, day 2 west/shibuya, day 3 food or museum flex.",
    practicalNotes: [
      "Stay near a JR or metro hub you will use daily.",
      "Lunch at 11:30 or 13:30 avoids the worst queues.",
      "Generate a three-day version in the planner, then edit stops to match this outline.",
    ],
    days: [
      {
        dayNumber: 1,
        title: "East Tokyo",
        city: "Tokyo",
        summary: "Asakusa and Ueno at walking pace.",
        stops: [
          { name: "Senso-ji", description: "Morning visit.", estimatedTime: "9:00" },
          { name: "Ueno Park", description: "Museum or pond loop.", estimatedTime: "13:00" },
          { name: "Dinner near hotel", description: "Keep return trip simple.", estimatedTime: "19:00" },
        ],
      },
      {
        dayNumber: 2,
        title: "West Tokyo",
        city: "Tokyo",
        summary: "Meiji, Harajuku, and Shibuya in one corridor.",
        stops: [
          { name: "Meiji Shrine", description: "Forest walk.", estimatedTime: "9:30" },
          { name: "Harajuku", description: "Short browse; skip if crowds stress you.", estimatedTime: "12:00" },
          { name: "Shibuya", description: "Crossing and department store food hall.", estimatedTime: "16:00" },
        ],
      },
      {
        dayNumber: 3,
        title: "Food or culture flex",
        city: "Tokyo",
        summary: "Market morning and Ginza or teamLab-style booking.",
        stops: [
          { name: "Tsukiji Outer Market", description: "Snacks and coffee; go early.", estimatedTime: "8:30" },
          { name: "Ginza lunch", description: "One sit-down meal.", estimatedTime: "12:00" },
          { name: "Departure prep", description: "Pack, airport train, or evening flight buffer.", estimatedTime: "Afternoon" },
        ],
      },
    ],
    relatedGuideLinks: [
      { href: "/guides/where-to-stay-tokyo", label: "Where to stay in Tokyo" },
      { href: "/guides/japan-restaurant-guide", label: "Japan restaurant guide" },
      { href: "/guides/japan-trains", label: "Japan trains guide" },
    ],
    plannerDefaults: {
      duration: 3,
      startCity: "Tokyo",
      theme: "food",
      travelStyle: "mid-range",
      pace: "moderate",
    },
  },
  {
    slug: "3-day-kyoto-itinerary",
    title: "3-Day Kyoto Itinerary",
    description:
      "Three Kyoto days covering east temples, west Arashiyama, and a central market day without bus marathon fatigue.",
    duration: 3,
    startCity: "Kyoto",
    theme: "temples",
    travelStyle: "mid-range",
    pace: "moderate",
    audience: "Travelers basing in Kyoto for a long weekend or Kansai airport entry.",
    bestFor: "Visitors who want temple culture without a full Kansai week.",
    routeSummary: "East day → west day → Nishiki and Gion flex.",
    practicalNotes: [
      "Start east temples before 8:30 in peak season.",
      "Bus passes help, but walking downhill beats uphill bus waits.",
      "Generate a three-day Kyoto plan in the planner, then adjust stops as needed.",
    ],
    days: [
      {
        dayNumber: 1,
        title: "East Kyoto",
        city: "Kyoto",
        summary: "Fushimi Inari and Higashiyama.",
        stops: [
          { name: "Fushimi Inari", description: "Early hike; turn back when done.", estimatedTime: "8:00" },
          { name: "Kiyomizu-dera area", description: "Slope walk and tea break.", estimatedTime: "11:00" },
          { name: "Gion evening", description: "Respect residential rules.", estimatedTime: "17:30" },
        ],
      },
      {
        dayNumber: 2,
        title: "West Kyoto",
        city: "Kyoto",
        summary: "Arashiyama bamboo and river.",
        stops: [
          { name: "Arashiyama", description: "Morning bamboo and river path.", estimatedTime: "9:00" },
          { name: "Tenryu-ji garden (optional)", description: "If lines are reasonable.", estimatedTime: "11:00" },
          { name: "Saga tofu lunch", description: "Local specialty in the area.", estimatedTime: "13:00" },
        ],
      },
      {
        dayNumber: 3,
        title: "Central Kyoto",
        city: "Kyoto",
        summary: "Nishiki market and palace park or museum.",
        stops: [
          { name: "Nishiki Market", description: "Tasting walk, not a heavy lunch.", estimatedTime: "10:00" },
          { name: "Imperial Palace park", description: "Flat walk if you want green space.", estimatedTime: "14:00" },
          { name: "Departure or Osaka hop", description: "Train onward if your flight is from KIX.", estimatedTime: "Afternoon" },
        ],
      },
    ],
    relatedGuideLinks: [
      { href: "/guides/where-to-stay-kyoto", label: "Where to stay in Kyoto" },
      { href: "/guides/japan-trains", label: "Japan trains guide" },
      { href: "/guides/japan-cultural-mistakes", label: "Cultural mistakes to avoid" },
    ],
    plannerDefaults: {
      duration: 3,
      startCity: "Kyoto",
      theme: "temples",
      travelStyle: "mid-range",
      pace: "moderate",
    },
  },
  {
    slug: "3-day-osaka-itinerary",
    title: "3-Day Osaka Itinerary",
    description:
      "Three days for Osaka castle, market food, bay views, and Namba nightlife with optional Nara half-day.",
    duration: 3,
    startCity: "Osaka",
    theme: "food",
    travelStyle: "mid-range",
    pace: "moderate",
    audience: "Food-focused travelers using KIX or ITM as their hub.",
    bestFor: "Short Kansai trips that skip Tokyo entirely.",
    routeSummary: "Osaka core (2 days) → Nara or bay flex (1 day).",
    practicalNotes: [
      "IC card covers most urban hops; top up before Saturday nightlife.",
      "Dotonbori is loud and fun; book only if you want a specific counter seat.",
      "Generate a three-day Osaka plan in the planner, then edit to match this route.",
    ],
    days: [
      {
        dayNumber: 1,
        title: "Osaka arrival and canal",
        city: "Osaka",
        summary: "Check in near Namba or Umeda; Dotonbori evening.",
        stops: [
          { name: "Airport transfer", description: "Nankai, JR, or bus to city.", estimatedTime: "Afternoon" },
          { name: "Dotonbori", description: "One food specialty tonight.", estimatedTime: "19:00" },
        ],
      },
      {
        dayNumber: 2,
        title: "Castle and market",
        city: "Osaka",
        summary: "Park morning and Kuromon snacks.",
        stops: [
          { name: "Osaka Castle park", description: "Exterior loop.", estimatedTime: "9:30" },
          { name: "Kuromon Market", description: "Morning tasting walk.", estimatedTime: "11:30" },
          { name: "Shinsekai (optional)", description: "Retro neighborhood if energy allows.", estimatedTime: "16:00" },
        ],
      },
      {
        dayNumber: 3,
        title: "Nara or bay flex",
        city: "Nara or Osaka",
        summary: "Half-day deer park or harbor walk before departure.",
        stops: [
          { name: "Nara day trip (optional)", description: "JR Nara line; Todai-ji and park.", estimatedTime: "9:00" },
          { name: "Harborland (alt.)", description: "Waterfront if you stay in Osaka.", estimatedTime: "14:00" },
          { name: "KIX transfer", description: "Allow buffer for airport train.", estimatedTime: "Afternoon" },
        ],
      },
    ],
    relatedGuideLinks: [
      { href: "/guides/where-to-stay-osaka", label: "Where to stay in Osaka" },
      { href: "/guides/japan-restaurant-guide", label: "Japan restaurant guide" },
      { href: "/guides/japan-trains", label: "Japan trains guide" },
    ],
    plannerDefaults: {
      duration: 3,
      startCity: "Osaka",
      theme: "food",
      travelStyle: "mid-range",
      pace: "moderate",
    },
  },
  {
    slug: "7-day-japan-food-itinerary",
    title: "7-Day Japan Food Itinerary",
    description:
      "A week of market mornings, regional specialties, and evening food districts across Tokyo, Osaka, and Kyoto without restaurant roulette every night.",
    duration: 7,
    startCity: "Tokyo",
    theme: "food",
    travelStyle: "mid-range",
    pace: "moderate",
    audience: "Travelers who plan trips around meals, snacks, and food streets.",
    bestFor: "First-time visitors who still want temples between bites, not only restaurants.",
    routeSummary: "Tokyo food (3) → Osaka (2) → Kyoto tasting (2).",
    practicalNotes: [
      "Keep some yen for stalls and small shops that prefer cash.",
      "One reservation is enough; leave most meals walk-in.",
      "Lunch queues peak at noon; eat early or late.",
    ],
    days: [
      {
        dayNumber: 1,
        title: "Tokyo arrival bite",
        city: "Tokyo",
        summary: "Konbini recon and one neighborhood dinner.",
        stops: [
          { name: "Hotel setup", description: "Find nearest ATM and train card machine.", estimatedTime: "Afternoon" },
          { name: "Local izakaya", description: "One small plate style meal.", estimatedTime: "Evening" },
        ],
      },
      {
        dayNumber: 2,
        title: "Tokyo market day",
        city: "Tokyo",
        summary: "Tsukiji outer and Ginza lunch.",
        stops: [
          { name: "Tsukiji Outer Market", description: "Morning snacks.", estimatedTime: "8:30" },
          { name: "Ginza lunch", description: "Tempura, sushi, or kissaten pause.", estimatedTime: "12:00" },
          { name: "Depachika tasting", description: "Tokyo Station or Nihombashi basement food hall.", estimatedTime: "16:00" },
        ],
      },
      {
        dayNumber: 3,
        title: "Tokyo ramen and depachika",
        city: "Tokyo",
        summary: "Ramen focus with covered backup if it rains.",
        stops: [
          { name: "Ramen shop", description: "Pick one famous line or a neighborhood shop.", estimatedTime: "12:00" },
          { name: "Shinjuku evening", description: "Omoide Yokocho or one specialty.", estimatedTime: "19:00" },
        ],
      },
      {
        dayNumber: 4,
        title: "Tokyo to Osaka",
        city: "Osaka",
        summary: "Shinkansen and Nipponbashi evening.",
        stops: [
          { name: "Shinkansen", description: "Ekiben lunch on board.", estimatedTime: "Morning" },
          { name: "Dotonbori", description: "Takoyaki or okonomiyaki.", estimatedTime: "19:00" },
        ],
      },
      {
        dayNumber: 5,
        title: "Osaka market and street food",
        city: "Osaka",
        summary: "Kuromon and Shinsekai.",
        stops: [
          { name: "Kuromon Market", description: "Morning tasting.", estimatedTime: "9:30" },
          { name: "Shinsekai kushikatsu", description: "One specialty dinner.", estimatedTime: "18:00" },
        ],
      },
      {
        dayNumber: 6,
        title: "Kyoto tasting",
        city: "Kyoto",
        summary: "Nishiki and kaiseki-style lunch or tofu.",
        stops: [
          { name: "Nishiki Market", description: "Small bites walk.", estimatedTime: "10:00" },
          { name: "Gion dinner", description: "Reserve only if you want a formal counter.", estimatedTime: "18:30" },
        ],
      },
      {
        dayNumber: 7,
        title: "Departure snacks",
        city: "Kyoto or Osaka",
        summary: "Omiyage and airport.",
        stops: [
          { name: "Depachika omiyage", description: "Station basement gifts.", estimatedTime: "Morning" },
          { name: "Airport transfer", description: "Allow time for security lines.", estimatedTime: "Midday" },
        ],
      },
    ],
    relatedGuideLinks: [
      { href: "/guides/japan-restaurant-guide", label: "Japan restaurant guide" },
      { href: "/guides/japan-conbini-food-guide", label: "Conbini food guide" },
      { href: "/guides/japan-budget-breakdown", label: "Japan budget breakdown" },
    ],
    plannerDefaults: {
      duration: 7,
      startCity: "Tokyo",
      theme: "food",
      travelStyle: "mid-range",
      pace: "moderate",
    },
  },
  {
    slug: "7-day-japan-family-itinerary",
    title: "7-Day Japan Family Itinerary",
    description:
      "A family-friendly week with parks, interactive museums, short temple visits, and transit that avoids unnecessary hotel hops.",
    duration: 7,
    startCity: "Tokyo",
    theme: "temples",
    travelStyle: "mid-range",
    pace: "relaxed",
    audience: "Families with kids or multi-generation groups who need bathroom breaks and downtime.",
    bestFor: "First-time family trips that want culture without 20,000 steps per day.",
    routeSummary: "Tokyo family bases (4) → Kyoto gentle temples (3).",
    practicalNotes: [
      "Stroller-friendly stations exist, but elevators are not everywhere: plan transfers.",
      "Coin lockers help on travel days; pack one small day bag.",
      "Keep one afternoon per city unplanned for naps or playground time.",
    ],
    days: [
      {
        dayNumber: 1,
        title: "Tokyo arrival easy day",
        city: "Tokyo",
        summary: "Short walk and early sleep.",
        stops: [
          { name: "Hotel near JR", description: "Shinjuku, Tokyo, or Ueno for simple lines.", estimatedTime: "Afternoon" },
          { name: "Park playground", description: "Neighborhood park before dinner.", estimatedTime: "16:00" },
        ],
      },
      {
        dayNumber: 2,
        title: "Tokyo museums or aquarium",
        city: "Tokyo",
        summary: "Indoor anchor if weather is hot or rainy.",
        stops: [
          { name: "Science museum or aquarium block", description: "Pick one big indoor site.", estimatedTime: "10:00" },
          { name: "Conbini dinner backup", description: "Easy win if kids are tired.", estimatedTime: "Evening" },
        ],
      },
      {
        dayNumber: 3,
        title: "Tokyo gentle east",
        city: "Tokyo",
        summary: "Asakusa and short river walk.",
        stops: [
          { name: "Senso-ji", description: "Morning; snacks nearby.", estimatedTime: "9:30" },
          { name: "Ueno Park", description: "Zoo or open space.", estimatedTime: "13:00" },
        ],
      },
      {
        dayNumber: 4,
        title: "Tokyo to Kyoto",
        city: "Kyoto",
        summary: "Shinkansen with reserved seats if possible.",
        stops: [
          { name: "Shinkansen", description: "Lunch on board; bathroom before boarding.", estimatedTime: "Morning" },
          { name: "Hotel check-in", description: "Quiet evening.", estimatedTime: "Afternoon" },
        ],
      },
      {
        dayNumber: 5,
        title: "Kyoto short temple loop",
        city: "Kyoto",
        summary: "One temple complex and downhill walk.",
        stops: [
          { name: "Fushimi Inari (short visit)", description: "Go early; skip long hike with small kids.", estimatedTime: "8:30" },
          { name: "Nishiki tasting", description: "Small bites; stroller-friendly sections.", estimatedTime: "14:00" },
        ],
      },
      {
        dayNumber: 6,
        title: "Arashiyama half-day",
        city: "Kyoto",
        summary: "Bamboo and river; train back for rest.",
        stops: [
          { name: "Arashiyama", description: "Morning only; avoid midday heat.", estimatedTime: "9:00" },
          { name: "Hotel rest", description: "Afternoon downtime.", estimatedTime: "14:00" },
        ],
      },
      {
        dayNumber: 7,
        title: "Departure buffer",
        city: "Kyoto or Tokyo",
        summary: "Pack, gift stop, airport.",
        stops: [
          { name: "Station shopping", description: "Omiyage without a detour.", estimatedTime: "Morning" },
          { name: "Airport transfer", description: "Extra time with kids and bags.", estimatedTime: "Midday" },
        ],
      },
    ],
    relatedGuideLinks: [
      { href: "/guides/japan-itinerary", label: "Japan itinerary guide" },
      { href: "/guides/japan-trains", label: "Japan trains guide" },
      { href: "/guides/japan-luggage-shipping", label: "Luggage shipping" },
      { href: "/guides/japan-travel-insurance", label: "Travel insurance" },
    ],
    plannerDefaults: {
      duration: 7,
      startCity: "Tokyo",
      theme: "temples",
      travelStyle: "mid-range",
      pace: "relaxed",
    },
  },
  {
    slug: "7-day-japan-budget-itinerary",
    title: "7-Day Japan Budget Itinerary",
    description:
      "A budget-conscious week using conbini breakfasts, market lunches, hostel or business hotels, and smart JR moves between Tokyo, Kyoto, and Osaka.",
    duration: 7,
    startCity: "Tokyo",
    theme: "food",
    travelStyle: "budget",
    pace: "moderate",
    audience: "Backpackers and budget travelers who still want the classic city triangle.",
    bestFor: "Travelers optimizing yen per day without skipping cultural highlights entirely.",
    routeSummary: "Tokyo (3) → Kyoto (2) → Osaka (2), favoring free parks and market meals.",
    practicalNotes: [
      "Conbini and supermarket dinners are normal, not a failure mode.",
      "Free temple grounds and park loops beat paid add-ons you will rush through.",
      "Luggage forwarding costs money but saves cheap train stress.",
    ],
    days: [
      {
        dayNumber: 1,
        title: "Tokyo arrival cheap",
        city: "Tokyo",
        summary: "Airport train and conbini dinner.",
        stops: [
          { name: "Budget hotel zone", description: "Ueno, Asakusa, or Shin-Okubo for value.", estimatedTime: "Afternoon" },
          { name: "Conbini dinner", description: "Onigiri, salad, and coffee for tomorrow.", estimatedTime: "Evening" },
        ],
      },
      {
        dayNumber: 2,
        title: "Free Tokyo walks",
        city: "Tokyo",
        summary: "Asakusa and Ueno park without paid towers.",
        stops: [
          { name: "Senso-ji", description: "Free grounds; paid omikuji is optional.", estimatedTime: "9:00" },
          { name: "Ueno Park", description: "Walk and street food lunch.", estimatedTime: "12:00" },
        ],
      },
      {
        dayNumber: 3,
        title: "Tokyo west on a budget",
        city: "Tokyo",
        summary: "Meiji forest walk and Harajuku window shopping.",
        stops: [
          { name: "Meiji Shrine", description: "Free forest path.", estimatedTime: "9:30" },
          { name: "Supermarket dinner", description: "Ready meals near your hotel.", estimatedTime: "18:00" },
        ],
      },
      {
        dayNumber: 4,
        title: "Tokyo to Kyoto",
        city: "Kyoto",
        summary: "Shinkansen with ekiben instead of a restaurant stop.",
        stops: [
          { name: "Shinkansen", description: "Non-reserved only if you accept standing risk in peak season.", estimatedTime: "Morning" },
          { name: "Hostel or guesthouse check-in", description: "Near Kyoto Station for bus simplicity.", estimatedTime: "Afternoon" },
        ],
      },
      {
        dayNumber: 5,
        title: "Kyoto free highlights",
        city: "Kyoto",
        summary: "Fushimi Inari and Philosopher's Path section.",
        stops: [
          { name: "Fushimi Inari", description: "Free hike as far as you like.", estimatedTime: "8:00" },
          { name: "Nishiki tasting", description: "Small bites instead of a full restaurant.", estimatedTime: "15:00" },
        ],
      },
      {
        dayNumber: 6,
        title: "Osaka street food",
        city: "Osaka",
        summary: "Short hop from Kyoto; Dotonbori dinner.",
        stops: [
          { name: "JR to Osaka", description: "Day bag only if possible.", estimatedTime: "Morning" },
          { name: "Dotonbori", description: "Street food dinner under ¥2,000 if you choose wisely.", estimatedTime: "19:00" },
        ],
      },
      {
        dayNumber: 7,
        title: "Departure",
        city: "Osaka",
        summary: "Last conbini breakfast and airport bus.",
        stops: [
          { name: "Free castle park loop", description: "If flight is evening.", estimatedTime: "Morning" },
          { name: "KIX bus or train", description: "Compare Nankai vs limousine bus prices.", estimatedTime: "Afternoon" },
        ],
      },
    ],
    relatedGuideLinks: [
      { href: "/guides/japan-budget-breakdown", label: "Japan budget breakdown" },
      { href: "/guides/japan-cash-vs-card", label: "Cash vs card" },
      { href: "/guides/japan-trains", label: "Japan trains guide" },
      { href: "/guides/jr-pass-worth-it", label: "JR Pass worth it?" },
    ],
    plannerDefaults: {
      duration: 7,
      startCity: "Tokyo",
      theme: "food",
      travelStyle: "budget",
      pace: "moderate",
    },
  },
  {
    slug: "14-day-japan-with-kids-itinerary",
    title: "14-Day Japan With Kids Itinerary",
    description:
      "Two relaxed weeks with Tokyo family museums, gentle Kyoto temples, Osaka food nights, and optional Nara deer park without overloading transit days.",
    duration: 14,
    startCity: "Tokyo",
    theme: "temples",
    travelStyle: "mid-range",
    pace: "relaxed",
    audience: "Families with school-age kids who need slower pacing and predictable downtime.",
    bestFor: "Summer or spring break trips that want culture plus kid-friendly anchors.",
    routeSummary: "Tokyo (5) → Kyoto (4) → Osaka (3) → buffer (2).",
    practicalNotes: [
      "Book hotels with laundry if you are traveling light with kids.",
      "Rainy day = museum swap; do not force outdoor temples.",
      "JR reserved seats help families sit together on Shinkansen legs.",
    ],
    days: [
      {
        dayNumber: 1,
        title: "Tokyo arrival",
        city: "Tokyo",
        summary: "Easy day and playground.",
        stops: [
          { name: "Hotel near JR", description: "Elevator-friendly station if possible.", estimatedTime: "Afternoon" },
          { name: "Neighborhood park", description: "Let kids run before jet lag wins.", estimatedTime: "16:00" },
        ],
      },
      {
        dayNumber: 2,
        title: "Indoor Tokyo",
        city: "Tokyo",
        summary: "Museum or aquarium anchor.",
        stops: [
          { name: "Science museum block", description: "Half-day indoor.", estimatedTime: "10:00" },
          { name: "Early hotel night", description: "Recovery from travel.", estimatedTime: "Evening" },
        ],
      },
      {
        dayNumber: 3,
        title: "Tokyo east gentle",
        city: "Tokyo",
        summary: "Asakusa snacks and short temple visit.",
        stops: [
          { name: "Senso-ji", description: "Morning; stroller-friendly approaches.", estimatedTime: "9:30" },
          { name: "River walk", description: "Short loop if weather allows.", estimatedTime: "14:00" },
        ],
      },
      {
        dayNumber: 4,
        title: "Tokyo character or shopping",
        city: "Tokyo",
        summary: "One fun district kids pick.",
        stops: [
          { name: "TeamLab or character shop (optional)", description: "Book timed entry if using digital art.", estimatedTime: "11:00" },
          { name: "Conbini dinner", description: "Easy backup.", estimatedTime: "18:00" },
        ],
      },
      {
        dayNumber: 5,
        title: "Tokyo flex",
        city: "Tokyo",
        summary: "Pool day, park, or repeat favorite neighborhood.",
        stops: [
          { name: "Unplanned block", description: "Nap-friendly afternoon.", estimatedTime: "Afternoon" },
        ],
      },
      {
        dayNumber: 6,
        title: "Tokyo to Kyoto",
        city: "Kyoto",
        summary: "Shinkansen with reserved seats.",
        stops: [
          { name: "Shinkansen", description: "Lunch on board.", estimatedTime: "Morning" },
          { name: "Kyoto check-in", description: "Quiet evening.", estimatedTime: "Afternoon" },
        ],
      },
      {
        dayNumber: 7,
        title: "Kyoto short east",
        city: "Kyoto",
        summary: "Fushimi Inari short visit.",
        stops: [
          { name: "Fushimi Inari", description: "Turn back early with kids.", estimatedTime: "8:30" },
          { name: "Hotel rest", description: "Afternoon downtime.", estimatedTime: "14:00" },
        ],
      },
      {
        dayNumber: 8,
        title: "Arashiyama half-day",
        city: "Kyoto",
        summary: "Bamboo and river train optional.",
        stops: [
          { name: "Arashiyama", description: "Morning only.", estimatedTime: "9:00" },
          { name: "Nishiki snacks", description: "Tasting dinner prep.", estimatedTime: "16:00" },
        ],
      },
      {
        dayNumber: 9,
        title: "Kyoto flex temple",
        city: "Kyoto",
        summary: "One paid garden or free park loop.",
        stops: [
          { name: "Imperial Palace park", description: "Flat paths.", estimatedTime: "10:00" },
          { name: "Café break", description: "Bathroom and snack stop.", estimatedTime: "14:00" },
        ],
      },
      {
        dayNumber: 10,
        title: "Kyoto to Osaka",
        city: "Osaka",
        summary: "Short train; Namba evening.",
        stops: [
          { name: "JR to Osaka", description: "Day bags only.", estimatedTime: "Morning" },
          { name: "Dotonbori", description: "Early dinner before crowds peak.", estimatedTime: "18:00" },
        ],
      },
      {
        dayNumber: 11,
        title: "Nara day trip",
        city: "Nara",
        summary: "Deer park and Great Buddha.",
        stops: [
          { name: "Nara Park", description: "Half-day is enough.", estimatedTime: "9:30" },
          { name: "Return to Osaka", description: "Kids nap on train.", estimatedTime: "Afternoon" },
        ],
      },
      {
        dayNumber: 12,
        title: "Osaka castle and bay",
        city: "Osaka",
        summary: "Park morning; harbor walk if energy allows.",
        stops: [
          { name: "Osaka Castle park", description: "Exterior loop.", estimatedTime: "10:00" },
          { name: "Harborland (optional)", description: "Evening lights.", estimatedTime: "17:00" },
        ],
      },
      {
        dayNumber: 13,
        title: "Osaka flex",
        city: "Osaka",
        summary: "Repeat favorite meal street or Umeda shops.",
        stops: [
          { name: "Kuromon or Umeda", description: "Weather-based pick.", estimatedTime: "11:00" },
        ],
      },
      {
        dayNumber: 14,
        title: "Departure",
        city: "Osaka or Tokyo",
        summary: "Airport with extra buffer for families.",
        stops: [
          { name: "Omiyage", description: "Station basement gifts.", estimatedTime: "Morning" },
          { name: "Airport transfer", description: "Plan extra time for security.", estimatedTime: "Midday" },
        ],
      },
    ],
    relatedGuideLinks: [
      { href: "/guides/japan-itinerary", label: "Japan itinerary guide" },
      { href: "/guides/japan-trains", label: "Japan trains guide" },
      { href: "/guides/japan-travel-insurance", label: "Travel insurance" },
      { href: "/guides/japan-luggage-shipping", label: "Luggage shipping" },
    ],
    plannerDefaults: {
      duration: 14,
      startCity: "Tokyo",
      theme: "temples",
      travelStyle: "mid-range",
      pace: "relaxed",
    },
  },
];
