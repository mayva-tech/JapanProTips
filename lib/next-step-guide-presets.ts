import type { NextStepGuideItem } from "@/components/NextStepGuides";

export const nextStepGuidePresetItems: Record<string, NextStepGuideItem[]> = {
  // Airport arrival journey
  "japan-airport-first-steps": [
    {
      title: "Best SIM Card for Japan",
      href: "/guides/sim-card-japan",
      reason:
        "Set up mobile data before you rely on maps, train apps, and translation in the arrivals hall.",
      label: "Next",
    },
    {
      title: "Airport to Hotel in Japan",
      href: "/guides/japan-airport-to-city",
      reason:
        "Pick the right train, bus, or transfer once you are through customs with working data.",
      label: "Next",
    },
    {
      title: "Suica and PASMO Guide",
      href: "/guides/suica-pasmo-guide",
      reason:
        "Load an IC card early so station taps and small purchases do not slow you down on day one.",
      label: "Next",
    },
    {
      title: "Money, Cards, and Cash in Japan",
      href: "/guides/money-payments-japan",
      reason:
        "Know what to carry before a cash-only shop or ticket machine catches you without yen.",
      label: "Related",
    },
  ],
  "japan-airport-to-city": [
    {
      title: "Japan Airport First Steps",
      href: "/guides/japan-airport-first-steps",
      reason:
        "Covers SIM, cash, and IC setup in the order that actually works right after landing.",
      label: "Before you go",
    },
    {
      title: "Narita to Tokyo",
      href: "/guides/narita-to-tokyo",
      reason:
        "Line-by-line options if you land at Narita and need a calm default route into the city.",
      label: "Related",
    },
    {
      title: "Haneda to Tokyo",
      href: "/guides/haneda-to-tokyo",
      reason:
        "Shorter airport legs and different train choices if you land at Haneda instead.",
      label: "Related",
    },
    {
      title: "Where to Stay in Tokyo",
      href: "/guides/where-to-stay-tokyo",
      reason:
        "Pick a station-friendly base before you commit to a hotel far from your daily train line.",
      label: "Next",
    },
  ],
  "narita-to-tokyo": [
    {
      title: "Japan Airport First Steps",
      href: "/guides/japan-airport-first-steps",
      reason:
        "Finish SIM, cash, and IC setup before you board the first train out of Narita.",
      label: "Before you go",
    },
    {
      title: "Airport to Hotel in Japan",
      href: "/guides/japan-airport-to-city",
      reason:
        "Broader transfer logic when you are not sure which airport line fits your hotel area.",
      label: "Related",
    },
    {
      title: "Best SIM Card for Japan",
      href: "/guides/sim-card-japan",
      reason:
        "Maps and platform screens are easier with data working before you reach the city.",
      label: "Next",
    },
    {
      title: "How to Use Trains in Japan",
      href: "/guides/japan-trains",
      reason:
        "Local vs express and platform habits matter as soon as you leave the airport station.",
      label: "Next",
    },
  ],
  "haneda-to-tokyo": [
    {
      title: "Japan Airport First Steps",
      href: "/guides/japan-airport-first-steps",
      reason:
        "Covers the arrival checklist that makes the Haneda leg less rushed.",
      label: "Before you go",
    },
    {
      title: "Airport to Hotel in Japan",
      href: "/guides/japan-airport-to-city",
      reason:
        "Compare transfer types when Haneda is not your only airport on the trip.",
      label: "Related",
    },
    {
      title: "Suica and PASMO Guide",
      href: "/guides/suica-pasmo-guide",
      reason:
        "Haneda rail exits are IC-friendly. Load a card before you hit crowded city gates.",
      label: "Next",
    },
    {
      title: "Where to Stay in Tokyo",
      href: "/guides/where-to-stay-tokyo",
      reason:
        "Match your hotel to the Haneda line you will use most often during the trip.",
      label: "Next",
    },
  ],

  // Connectivity journey
  "sim-card-japan": [
    {
      title: "eSIM vs Pocket WiFi in Japan",
      href: "/guides/esim-vs-pocket-wifi-japan",
      reason:
        "Pick the connection type that fits your phone, group size, and pickup tolerance.",
      label: "Related",
    },
    {
      title: "How to Use Trains in Japan",
      href: "/guides/japan-trains",
      reason:
        "Train apps and station signs assume your data works on the platform, not only at the hotel.",
      label: "Next",
    },
    {
      title: "Using Google Maps in Japan",
      href: "/guides/using-google-maps-in-japan",
      reason:
        "Maps habits that reduce wrong-platform mistakes once your SIM or eSIM is live.",
      label: "Next",
    },
    {
      title: "Japan Airport First Steps",
      href: "/guides/japan-airport-first-steps",
      reason:
        "If you have not landed yet, install data before customs when your plan allows it.",
      label: "Before you go",
    },
  ],
  "do-you-need-sim-japan": [
    {
      title: "Best SIM Card for Japan",
      href: "/guides/sim-card-japan",
      reason:
        "Walks through eSIM, pocket WiFi, and physical SIM choices once you know you need data.",
      label: "Next",
    },
    {
      title: "eSIM vs Pocket WiFi in Japan",
      href: "/guides/esim-vs-pocket-wifi-japan",
      reason:
        "Compares the two setups tourists argue about most before buying the wrong one.",
      label: "Related",
    },
    {
      title: "Airalo vs Ubigi for Japan",
      href: "/guides/airalo-vs-ubigi-japan",
      reason:
        "Useful if you already narrowed the choice to popular eSIM brands.",
      label: "Related",
    },
    {
      title: "Public WiFi in Japan",
      href: "/guides/japan-public-wifi",
      reason:
        "See where free WiFi helps and where it fails before you skip mobile data entirely.",
      label: "Related",
    },
  ],
  "esim-vs-pocket-wifi-japan": [
    {
      title: "Best SIM Card for Japan",
      href: "/guides/sim-card-japan",
      reason:
        "Finishes provider choice, activation timing, and common tourist mistakes.",
      label: "Next",
    },
    {
      title: "Do You Need a SIM in Japan?",
      href: "/guides/do-you-need-sim-japan",
      reason:
        "Quick decision frame if you are still unsure whether to buy anything at all.",
      label: "Start here",
    },
    {
      title: "Airalo vs Ubigi for Japan",
      href: "/guides/airalo-vs-ubigi-japan",
      reason:
        "Brand-level comparison when you already chose eSIM over pocket WiFi.",
      label: "Related",
    },
  ],
  "airalo-vs-ubigi-japan": [
    {
      title: "Best SIM Card for Japan",
      href: "/guides/sim-card-japan",
      reason:
        "Broader setup guide beyond one brand comparison, including activation before you fly.",
      label: "Next",
    },
    {
      title: "eSIM vs Pocket WiFi in Japan",
      href: "/guides/esim-vs-pocket-wifi-japan",
      reason:
        "Step back if you have not decided whether eSIM is the right category at all.",
      label: "Related",
    },
    {
      title: "Using Google Maps in Japan",
      href: "/guides/using-google-maps-in-japan",
      reason:
        "Test your plan with real navigation once the eSIM profile is installed.",
      label: "Next",
    },
  ],
  "japan-public-wifi": [
    {
      title: "Best SIM Card for Japan",
      href: "/guides/sim-card-japan",
      reason:
        "Public WiFi is patchy on trains and side streets. Mobile data is the reliable default.",
      label: "Next",
    },
    {
      title: "Do You Need a SIM in Japan?",
      href: "/guides/do-you-need-sim-japan",
      reason:
        "Helps you decide how much you can lean on WiFi versus buying a real plan.",
      label: "Related",
    },
    {
      title: "eSIM vs Pocket WiFi in Japan",
      href: "/guides/esim-vs-pocket-wifi-japan",
      reason:
        "Pick a backup connection style for days when hotel or konbini WiFi is slow.",
      label: "Related",
    },
  ],

  // Transport journey
  "japan-trains": [
    {
      title: "Suica and PASMO Guide",
      href: "/guides/suica-pasmo-guide",
      reason:
        "IC cards handle most daily taps. This guide covers load, recharge, and phone wallet setup.",
      label: "Next",
    },
    {
      title: "Shinkansen Guide for Beginners",
      href: "/guides/shinkansen-guide",
      reason:
        "Reserved seats, train names, and gates work differently from local JR lines.",
      label: "Next",
    },
    {
      title: "Using Google Maps in Japan",
      href: "/guides/using-google-maps-in-japan",
      reason:
        "Platform numbers and train types make more sense once your map habits match local signage.",
      label: "Related",
    },
    {
      title: "Getting Around Japan",
      href: "/guides/getting-around-japan",
      reason:
        "Short START HERE habits if this is your first day trying to read a busy station board.",
      label: "Start here",
    },
  ],
  "getting-around-japan": [
    {
      title: "How to Use Trains in Japan",
      href: "/guides/japan-trains",
      reason:
        "Goes deeper on line names, local vs express, and daily navigation once the basics click.",
      label: "Next",
    },
    {
      title: "Suica and PASMO Guide",
      href: "/guides/suica-pasmo-guide",
      reason:
        "Set up the IC card you will tap dozens of times per day.",
      label: "Next",
    },
    {
      title: "Best SIM Card for Japan",
      href: "/guides/sim-card-japan",
      reason:
        "Maps and train apps need data before you trust a transfer in a rush-hour station.",
      label: "Before you go",
    },
  ],
  "suica-pasmo-guide": [
    {
      title: "Suica vs PASMO",
      href: "/guides/suica-vs-pasmo",
      reason:
        "Short comparison when you only need to know which card to pick up first.",
      label: "Related",
    },
    {
      title: "How to Use Trains in Japan",
      href: "/guides/japan-trains",
      reason:
        "IC cards pay fares, but you still need to read lines, directions, and platforms.",
      label: "Next",
    },
    {
      title: "Money, Cards, and Cash in Japan",
      href: "/guides/money-payments-japan",
      reason:
        "IC balances are not a full payment plan for restaurants and small shops.",
      label: "Related",
    },
  ],
  "suica-vs-pasmo": [
    {
      title: "Suica and PASMO Guide",
      href: "/guides/suica-pasmo-guide",
      reason:
        "Setup, recharge, and phone wallet steps after you pick a card brand.",
      label: "Next",
    },
    {
      title: "How to Use Trains in Japan",
      href: "/guides/japan-trains",
      reason:
        "Both cards work the same way on most trips. Train habits matter more than the logo.",
      label: "Next",
    },
    {
      title: "Money, Cards, and Cash in Japan",
      href: "/guides/money-payments-japan",
      reason:
        "IC cards are one part of how you pay. Cash and cards still matter outside stations.",
      label: "Related",
    },
  ],
  "shinkansen-guide": [
    {
      title: "JR Pass: Is It Still Worth It?",
      href: "/guides/jr-pass-worth-it",
      reason:
        "Run pass math before you buy tickets for several long city-to-city legs.",
      label: "Related",
    },
    {
      title: "How to Use Trains in Japan",
      href: "/guides/japan-trains",
      reason:
        "Local JR and metro habits still apply before and after your bullet train ride.",
      label: "Before you go",
    },
    {
      title: "Suica and PASMO Guide",
      href: "/guides/suica-pasmo-guide",
      reason:
        "IC cards cover station access even when the Shinkansen needs a separate ticket.",
      label: "Related",
    },
  ],
  "jr-pass-worth-it": [
    {
      title: "Shinkansen Guide for Beginners",
      href: "/guides/shinkansen-guide",
      reason:
        "Understand Nozomi, Hikari, reservations, and gates before you commit to a pass.",
      label: "Next",
    },
    {
      title: "How to Use Trains in Japan",
      href: "/guides/japan-trains",
      reason:
        "The pass does not replace everyday local train skills or metro transfers.",
      label: "Related",
    },
    {
      title: "Using Google Maps in Japan",
      href: "/guides/using-google-maps-in-japan",
      reason:
        "Map the exact JR segments you will ride when you calculate break-even cost.",
      label: "Related",
    },
  ],
  "using-google-maps-in-japan": [
    {
      title: "How to Use Trains in Japan",
      href: "/guides/japan-trains",
      reason:
        "Turns map directions into platform confidence when several lines share one station.",
      label: "Next",
    },
    {
      title: "Best SIM Card for Japan",
      href: "/guides/sim-card-japan",
      reason:
        "Live routing fails fast without data in underground transfers and rural legs.",
      label: "Before you go",
    },
    {
      title: "Getting Around Japan",
      href: "/guides/getting-around-japan",
      reason:
        "Core habits if maps still feel noisy on your first full transit day.",
      label: "Start here",
    },
  ],

  // Money journey
  "money-payments-japan": [
    {
      title: "Withdraw Cash in Japan",
      href: "/guides/japan-cash-withdrawal-guide",
      reason:
        "Covers 7-Eleven ATMs, foreign card declines, and fees when you need more yen.",
      label: "Next",
    },
    {
      title: "Cash vs Card in Japan",
      href: "/guides/japan-cash-vs-card",
      reason:
        "Helps you decide how much cash to carry after you know which cards work.",
      label: "Related",
    },
    {
      title: "Suica and PASMO Guide",
      href: "/guides/suica-pasmo-guide",
      reason:
        "IC cards handle trains and many small purchases once your wallet strategy is clear.",
      label: "Next",
    },
  ],
  "japan-cash-vs-card": [
    {
      title: "Money, Cards, and Cash in Japan",
      href: "/guides/money-payments-japan",
      reason:
        "START HERE overview for what to bring and how locals and tourists actually pay.",
      label: "Start here",
    },
    {
      title: "Withdraw Cash in Japan",
      href: "/guides/japan-cash-withdrawal-guide",
      reason:
        "ATM specifics when your card works in shops but fails at the machine.",
      label: "Next",
    },
    {
      title: "Tax-Free Shopping in Japan",
      href: "/guides/japan-tax-free-shopping",
      reason:
        "Payment type and passport rules matter at department store tax-free counters.",
      label: "Related",
    },
  ],
  "japan-cash-withdrawal-guide": [
    {
      title: "Money, Cards, and Cash in Japan",
      href: "/guides/money-payments-japan",
      reason:
        "Broader payment setup before you treat ATMs as your only money problem.",
      label: "Before you go",
    },
    {
      title: "Cash vs Card in Japan",
      href: "/guides/japan-cash-vs-card",
      reason:
        "Shows where cash still wins even when your foreign card works at 7-Eleven.",
      label: "Related",
    },
    {
      title: "Suica and PASMO Guide",
      href: "/guides/suica-pasmo-guide",
      reason:
        "You still need an IC balance for trains and many quick purchases between withdrawals.",
      label: "Next",
    },
  ],
  "japan-tax-free-shopping": [
    {
      title: "Money, Cards, and Cash in Japan",
      href: "/guides/money-payments-japan",
      reason:
        "Tax-free counters still care whether your card, cash, and passport details line up.",
      label: "Related",
    },
    {
      title: "Cash vs Card in Japan",
      href: "/guides/japan-cash-vs-card",
      reason:
        "Some smaller tax-free shops lean cash even when malls take cards.",
      label: "Related",
    },
    {
      title: "Japan Packing List",
      href: "/guides/japan-packing-list",
      reason:
        "Leave bag space for receipts and sealed shopping bags you cannot open before departure.",
      label: "Before you go",
    },
  ],

  // Packing and weather journey
  "japan-packing-list": [
    {
      title: "Japan Weather by Month",
      href: "/guides/japan-weather-by-month",
      reason:
        "Match clothing to the month and region you are actually visiting, not a generic Asia list.",
      label: "Next",
    },
    {
      title: "Japan Rainy Season Guide",
      href: "/guides/japan-rainy-season-guide",
      reason:
        "June humidity and sudden rain change what belongs in your day bag.",
      label: "Related",
    },
    {
      title: "Laundry in Japan for Travelers",
      href: "/guides/japan-laundry-guide",
      reason:
        "Light packing only works if you know coin laundry and hotel dryer habits.",
      label: "Related",
    },
    {
      title: "Japan Airport First Steps",
      href: "/guides/japan-airport-first-steps",
      reason:
        "Final check for SIM, cash, and IC setup before you leave the airport with one bag.",
      label: "Before you go",
    },
  ],
  "japan-weather-by-month": [
    {
      title: "Japan Packing List",
      href: "/guides/japan-packing-list",
      reason:
        "Turn monthly weather notes into a bag you can actually carry on trains.",
      label: "Next",
    },
    {
      title: "Japan Rainy Season Guide",
      href: "/guides/japan-rainy-season-guide",
      reason:
        "June is more than rain on a chart. This guide covers humidity and indoor drying.",
      label: "Related",
    },
    {
      title: "Japan Travel Fatigue",
      href: "/guides/japan-travel-fatigue",
      reason:
        "Heat and long walking days hit harder when your clothing choices are off.",
      label: "Related",
    },
  ],
  "japan-rainy-season-guide": [
    {
      title: "Japan Weather by Month",
      href: "/guides/japan-weather-by-month",
      reason:
        "See how June fits against spring heat and summer typhoon season.",
      label: "Related",
    },
    {
      title: "Japan Packing List",
      href: "/guides/japan-packing-list",
      reason:
        "Pack for wet shoes, laundry, and bag space without overfilling your suitcase.",
      label: "Next",
    },
    {
      title: "Laundry in Japan for Travelers",
      href: "/guides/japan-laundry-guide",
      reason:
        "Rainy trips mean damp clothes. Dryers and coin laundries matter more than usual.",
      label: "Related",
    },
  ],
  "japan-laundry-guide": [
    {
      title: "Japan Packing List",
      href: "/guides/japan-packing-list",
      reason:
        "Quick-dry fabrics and bag space decisions make laundry days less painful.",
      label: "Related",
    },
    {
      title: "Japan Weather by Month",
      href: "/guides/japan-weather-by-month",
      reason:
        "Humidity and season change how fast clothes dry in hotel rooms.",
      label: "Related",
    },
    {
      title: "Japan Rainy Season Guide",
      href: "/guides/japan-rainy-season-guide",
      reason:
        "Rainy season is when weak hotel dryers hurt the most.",
      label: "Related",
    },
  ],
  "japan-travel-fatigue": [
    {
      title: "Japan Packing List",
      href: "/guides/japan-packing-list",
      reason:
        "Shoes, sleep, and hydration gear matter more than adding another sight to the day.",
      label: "Next",
    },
    {
      title: "Getting Around Japan",
      href: "/guides/getting-around-japan",
      reason:
        "Reduce transit stress when your body is already tired from walking.",
      label: "Related",
    },
    {
      title: "Japan Weather by Month",
      href: "/guides/japan-weather-by-month",
      reason:
        "Summer heat and humidity are a common fatigue trigger for first-time visitors.",
      label: "Related",
    },
  ],

  // Where to stay journey
  "where-to-stay-japan": [
    {
      title: "Where to Stay in Tokyo",
      href: "/guides/where-to-stay-tokyo",
      reason:
        "Tokyo base decisions affect almost every first-time itinerary.",
      label: "Next",
    },
    {
      title: "Best Tokyo Area for First-Time Visitors",
      href: "/guides/best-area-tokyo-first-time",
      reason:
        "Narrows neighborhoods before you compare hotel pins on a map.",
      label: "Related",
    },
    {
      title: "Japan Hotel Room Size",
      href: "/guides/japan-hotel-room-size",
      reason:
        "Set bag expectations before you book a room that fits a bed and little else.",
      label: "Related",
    },
  ],
  "where-to-stay-tokyo": [
    {
      title: "Best Tokyo Area for First-Time Visitors",
      href: "/guides/best-area-tokyo-first-time",
      reason:
        "Compare Shinjuku, Shibuya, Ueno, and other hubs before you lock a booking.",
      label: "Next",
    },
    {
      title: "Shinjuku vs Shibuya",
      href: "/guides/shinjuku-vs-shibuya",
      reason:
        "The two most common first-trip bases feel similar on a map but differ at night.",
      label: "Related",
    },
    {
      title: "How to Use Trains in Japan",
      href: "/guides/japan-trains",
      reason:
        "Your hotel is only as good as the station exit you will use every morning.",
      label: "Next",
    },
    {
      title: "Money, Cards, and Cash in Japan",
      href: "/guides/money-payments-japan",
      reason:
        "Hotels often take cards, but your neighborhood still runs on mixed cash habits.",
      label: "Related",
    },
  ],
  "best-area-tokyo-first-time": [
    {
      title: "Where to Stay in Tokyo",
      href: "/guides/where-to-stay-tokyo",
      reason:
        "Hotel search habits and area tradeoffs after you pick a neighborhood.",
      label: "Next",
    },
    {
      title: "Shinjuku vs Shibuya",
      href: "/guides/shinjuku-vs-shibuya",
      reason:
        "Side-by-side vibe and transit notes for the two areas tourists debate most.",
      label: "Related",
    },
    {
      title: "Where to Stay in Japan",
      href: "/guides/where-to-stay-japan",
      reason:
        "Step back when Tokyo is only one stop on a multi-city route.",
      label: "Related",
    },
  ],
  "shinjuku-vs-shibuya": [
    {
      title: "Where to Stay in Tokyo",
      href: "/guides/where-to-stay-tokyo",
      reason:
        "Booking and station-exit checks once you lean toward one side of the debate.",
      label: "Next",
    },
    {
      title: "Best Tokyo Area for First-Time Visitors",
      href: "/guides/best-area-tokyo-first-time",
      reason:
        "See how Shinjuku and Shibuya compare with Ueno, Asakusa, and other bases.",
      label: "Related",
    },
    {
      title: "How to Use Trains in Japan",
      href: "/guides/japan-trains",
      reason:
        "Both areas are train-heavy. Platform habits matter more than the neighborhood hype.",
      label: "Next",
    },
  ],
  "where-to-stay-kyoto": [
    {
      title: "Where to Stay in Japan",
      href: "/guides/where-to-stay-japan",
      reason:
        "Fit Kyoto into a multi-city sleep plan instead of treating it as an isolated booking.",
      label: "Related",
    },
    {
      title: "Shinkansen Guide for Beginners",
      href: "/guides/shinkansen-guide",
      reason:
        "Most visitors reach Kyoto by bullet train from Tokyo or Osaka.",
      label: "Next",
    },
    {
      title: "How to Use Trains in Japan",
      href: "/guides/japan-trains",
      reason:
        "Kyoto days still rely on buses, subways, and long walks between districts.",
      label: "Related",
    },
  ],
  "where-to-stay-osaka": [
    {
      title: "Where to Stay in Japan",
      href: "/guides/where-to-stay-japan",
      reason:
        "Osaka often pairs with Kyoto and Tokyo on the same trip.",
      label: "Related",
    },
    {
      title: "How to Use Trains in Japan",
      href: "/guides/japan-trains",
      reason:
        "Loop lines and station exits shape Osaka hotel choices more than skyline views.",
      label: "Next",
    },
    {
      title: "Shinkansen Guide for Beginners",
      href: "/guides/shinkansen-guide",
      reason:
        "Shin-Osaka connections matter when you add Hiroshima or Tokyo legs.",
      label: "Related",
    },
  ],
  "japan-hotel-room-size": [
    {
      title: "Where to Stay in Tokyo",
      href: "/guides/where-to-stay-tokyo",
      reason:
        "Room size varies by area and hotel class. Pick the base before you compare photos.",
      label: "Next",
    },
    {
      title: "Japan Packing List",
      href: "/guides/japan-packing-list",
      reason:
        "Pack for tight rooms, hallway luggage rules, and multi-city moves.",
      label: "Related",
    },
    {
      title: "Where to Stay in Japan",
      href: "/guides/where-to-stay-japan",
      reason:
        "Countrywide habits when Tokyo is not your only hotel stop.",
      label: "Related",
    },
  ],

  // Resident setup journey
  "renting-apartment-japan": [
    {
      title: "Residence Registration in Japan",
      href: "/residents/japan-residence-registration",
      reason:
        "You need a registered address before many contracts, banks, and ward services treat you as settled.",
      label: "Resident setup",
    },
    {
      title: "Open a Bank Account in Japan",
      href: "/residents/japan-bank-account",
      reason:
        "Rent auto-debit and agency payments are easier once you have a local account path.",
      label: "Next",
    },
    {
      title: "Utilities Setup in Japan",
      href: "/residents/japan-utilities-setup",
      reason:
        "Gas, electric, and water transfers often start the week you get keys.",
      label: "Next",
    },
    {
      title: "Apartment Internet in Japan",
      href: "/residents/japan-apartment-internet",
      reason:
        "Fiber or ISP install dates affect move-in week more than newcomers expect.",
      label: "Related",
    },
  ],
  "japan-residence-registration": [
    {
      title: "Renting an Apartment in Japan",
      href: "/residents/renting-apartment-japan",
      reason:
        "Most leases and guarantor paperwork assume you already know ward office basics.",
      label: "Related",
    },
    {
      title: "Open a Bank Account in Japan",
      href: "/residents/japan-bank-account",
      reason:
        "Banks often ask for your registered address and residence card details.",
      label: "Next",
    },
    {
      title: "Mobile Phone Plans in Japan",
      href: "/residents/japan-mobile-phone-plans",
      reason:
        "Phone contracts usually need the same ID and address proof you used at the ward office.",
      label: "Next",
    },
  ],
  "japan-bank-account": [
    {
      title: "Mobile Phone Plans in Japan",
      href: "/residents/japan-mobile-phone-plans",
      reason:
        "Billing and auto-debit are simpler once your bank account is open.",
      label: "Next",
    },
    {
      title: "Utilities Setup in Japan",
      href: "/residents/japan-utilities-setup",
      reason:
        "Utility auto-debit and transfer forms often ask for Japanese bank details.",
      label: "Resident setup",
    },
    {
      title: "Renting an Apartment in Japan",
      href: "/residents/renting-apartment-japan",
      reason:
        "Landlords and agencies expect a payment path before they finalize a lease.",
      label: "Related",
    },
  ],
  "japan-mobile-phone-plans": [
    {
      title: "Apartment Internet in Japan",
      href: "/residents/japan-apartment-internet",
      reason:
        "Home WiFi covers most data use. Phone plans should match your actual install timeline.",
      label: "Next",
    },
    {
      title: "Utilities Setup in Japan",
      href: "/residents/japan-utilities-setup",
      reason:
        "Move-in week paperwork often stacks phone, internet, and utility bills together.",
      label: "Related",
    },
    {
      title: "Open a Bank Account in Japan",
      href: "/residents/japan-bank-account",
      reason:
        "Postpaid plans and auto-debit usually need a Japanese bank or approved card path.",
      label: "Resident setup",
    },
  ],
  "japan-utilities-setup": [
    {
      title: "Apartment Internet in Japan",
      href: "/residents/japan-apartment-internet",
      reason:
        "Internet install dates overlap with electric and gas start dates on many leases.",
      label: "Next",
    },
    {
      title: "Japan Garbage Rules",
      href: "/residents/japan-garbage-rules",
      reason:
        "Your building chart and ward bags matter as soon as you cook at home.",
      label: "Next",
    },
    {
      title: "Open a Bank Account in Japan",
      href: "/residents/japan-bank-account",
      reason:
        "Auto-debit setup is easier when your bank account is already open.",
      label: "Resident setup",
    },
  ],
  "japan-apartment-internet": [
    {
      title: "Mobile Phone Plans in Japan",
      href: "/residents/japan-mobile-phone-plans",
      reason:
        "Pair home fiber with a lighter phone plan once WiFi is live.",
      label: "Related",
    },
    {
      title: "Utilities Setup in Japan",
      href: "/residents/japan-utilities-setup",
      reason:
        "ISP visits and utility start dates often land in the same move-in window.",
      label: "Related",
    },
    {
      title: "Renting an Apartment in Japan",
      href: "/residents/renting-apartment-japan",
      reason:
        "Some buildings restrict providers or need manager approval before install.",
      label: "Before you go",
    },
  ],
  "japan-garbage-rules": [
    {
      title: "Utilities Setup in Japan",
      href: "/residents/japan-utilities-setup",
      reason:
        "Move-in week is when building garbage rooms, labels, and ward charts actually matter.",
      label: "Next",
    },
    {
      title: "Renting an Apartment in Japan",
      href: "/residents/renting-apartment-japan",
      reason:
        "Building rules and management notices often explain exceptions the ward chart does not.",
      label: "Related",
    },
    {
      title: "Residence Registration in Japan",
      href: "/residents/japan-residence-registration",
      reason:
        "Ward office registration changes which garbage calendar and bag types apply to you.",
      label: "Resident setup",
    },
  ],
};

export function getNextStepGuidePreset(
  guideId: string,
): NextStepGuideItem[] | undefined {
  return nextStepGuidePresetItems[guideId];
}
