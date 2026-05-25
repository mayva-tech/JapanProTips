/**
 * Editorial copy for downloadable checklist PDFs.
 * Keep punctuation to commas, periods, colons, hyphens only (site rule).
 */

export type ChecklistPdfSection = {
  heading: string;
  items: string[];
  /** Optional short note under the list. */
  note?: string;
};

export type ChecklistPdfSpec = {
  id: string;
  /** Output filename under public/downloads/ (no path). */
  filename: string;
  title: string;
  subtitle: string;
  sections: ChecklistPdfSection[];
  /** Shown in footer. */
  tagline?: string;
  /** If true, use compact layout (emergency card). */
  compact?: boolean;
};

export const CHECKLIST_PDF_SPECS: Record<string, ChecklistPdfSpec> = {
  "japan-arrival-checklist": {
    id: "japan-arrival-checklist",
    filename: "japan-arrival-checklist.pdf",
    title: "Japan arrival checklist",
    subtitle:
      "First steps after landing: data, cash, IC card, and trains in a sane order.",
    sections: [
      {
        heading: "Immigration and baggage",
        items: [
          "Have passport, arrival card or QR, and address ready before the desk.",
          "Baggage claim first, then customs if asked. Do not rush past signs you do not understand.",
          "Photograph your baggage tag stub on your phone in case the belt delays.",
        ],
      },
      {
        heading: "Connectivity before you leave the terminal",
        items: [
          "Install or activate your eSIM or SIM before you rely on airport WiFi for critical tasks.",
          "If you use a pocket WiFi pickup, confirm counter hours and exact desk name on your voucher.",
          "Download offline maps for your first hotel neighborhood as a backup.",
        ],
      },
      {
        heading: "Cash and cards",
        items: [
          "Withdraw cash at a post office (Japan Post Bank) or 7-Bank ATM if cards fail elsewhere.",
          "Carry small notes for lockers, buses, and rural shops. Break large bills at a conbini if needed.",
          "Turn on travel notifications for your bank and know your card PIN.",
        ],
      },
      {
        heading: "IC card and first train",
        items: [
          "Buy or load Suica or PASMO on your phone or plastic before you stand in a rush-hour gate line.",
          "Tap in and tap out on the same reader type. Do not mix JR and metro gates on one fare by mistake.",
          "Use one map app consistently. If a train is Local, it stops everywhere. Express skips stops.",
        ],
      },
      {
        heading: "Ground truth at the hotel",
        items: [
          "Screenshot your hotel address in Japanese for taxis and late arrivals.",
          "Ask check-in time. Early bags often go to a locker or hold area, not the room.",
          "Note nearest conbini, ATM, and station exit for tomorrow morning.",
        ],
      },
    ],
    tagline: "Field notes from JapanProTips.",
  },

  "japan-packing-checklist": {
    id: "japan-packing-checklist",
    filename: "japan-packing-checklist.pdf",
    title: "Japan packing checklist",
    subtitle:
      "Carry-on first: trains, steps, coin lockers, humidity, and long walking days.",
    sections: [
      {
        heading: "Shoes and feet",
        items: [
          "One broken-in pair for 15k to 25k steps daily. No brand new shoes on day one.",
          "Breathable socks, blister pads, and a spare pair if rain soaks through.",
          "Slides or indoor shoes if your hotel or ryokan expects it.",
        ],
      },
      {
        heading: "Bags and trains",
        items: [
          "Soft duffel or backpack beats a rigid case for Shinkansen overhead rules and coin lockers.",
          "Pack a foldable day bag for snacks, water, umbrella, and a light layer.",
          "Keep a small pouch for coins, IC card, and ticket stubs.",
        ],
      },
      {
        heading: "Weather and layers",
        items: [
          "Light rain shell that packs small. Umbrella optional if you prefer hands free.",
          "Thin mid layer for strong AC on trains and muggy streets in the same afternoon.",
          "Sun hat or cap for summer, thin gloves and liner for Hokkaido winter.",
        ],
      },
      {
        heading: "Power and documents",
        items: [
          "Type A plug adapter if your charger is not dual voltage. USB-C hub optional.",
          "Passport copy offline, hotel vouchers, and one backup card not in the same pocket as primary.",
          "Travel insurance card and embassy number in notes, offline.",
        ],
      },
      {
        heading: "Toiletries and laundry",
        items: [
          "Travel size first, buy refills at a drugstore after arrival if you stay long.",
          "Laundry soap sheets or a small bag for coin laundry on week two.",
          "Hand sanitizer and tissues: public restrooms vary by building.",
        ],
      },
    ],
    tagline: "Field notes from JapanProTips.",
  },

  "japan-rainy-season-checklist": {
    id: "japan-rainy-season-checklist",
    filename: "japan-rainy-season-checklist.pdf",
    title: "Japan rainy season checklist",
    subtitle: "Tsuyu humidity, drying clothes, and backup plans when skies stay gray.",
    sections: [
      {
        heading: "Shell and feet",
        items: [
          "Breathable rain jacket beats a thick coat that never dries in hotel rooms.",
          "Shoes that drain or dry fast. Pack a second pair if you walk all day.",
          "Small umbrella for city blocks, but watch crowded station stairs.",
        ],
      },
      {
        heading: "Laundry reality",
        items: [
          "Hotel rooms dry slowly in humidity. Coin laundry is faster than bathroom lines.",
          "Pack quick dry layers if you repeat outfits between wash days.",
          "A plastic bag for damp gear keeps the rest of the bag dry.",
        ],
      },
      {
        heading: "Indoor backup days",
        items: [
          "Museums, department food halls, and short indoor walks save a soggy afternoon.",
          "Check last train earlier when weather slows transfers.",
          "Keep phone and cards in an inner pocket when rain hits hard.",
        ],
      },
    ],
    tagline: "Field notes from JapanProTips.",
  },

  "japan-train-cheat-sheet": {
    id: "japan-train-cheat-sheet",
    filename: "japan-train-cheat-sheet.pdf",
    title: "Japan train cheat sheet",
    subtitle: "One page: IC rules, train types, and how to read a platform without panic.",
    sections: [
      {
        heading: "IC card basics",
        items: [
          "Tap in at your start station, tap out at exit. One card per person.",
          "If the gate flashes red, step back and try again. Staff windows fix most errors fast.",
          "Charge at ticket machines or in your phone wallet before peak commute.",
        ],
      },
      {
        heading: "Train names you will see",
        items: [
          "Local: every stop. Rapid: skips some. Express: fewer stops. Limited Express: often reserved seats.",
          "Shinkansen is separate tickets or pass rules. Do not board the wrong car type on purpose.",
          "If unsure, take Local one stop past your mistake, then cross platform. Staff help when you ask.",
        ],
      },
      {
        heading: "Platform screen in 10 seconds",
        items: [
          "Departure time, line name, and destination column must match your map app suggestion.",
          "Car numbers matter on Shinkansen. Match the platform paint marks to your car.",
          "Yellow tactile strips mark queue lines. Stand behind them until the train stops.",
        ],
      },
      {
        heading: "Etiquette that saves stress",
        items: [
          "Phone on silent, no voice calls in the car. Bags on rack or between knees, not the aisle.",
          "Priority seats: yield when car is crowded even if nobody is standing yet.",
          "Do not block doors while others exit. Step off, stand aside, then reboard if changing cars.",
        ],
      },
    ],
    tagline: "Field notes from JapanProTips.",
  },

  "japan-first-7-days-checklist": {
    id: "japan-first-7-days-checklist",
    filename: "japan-first-7-days-checklist.pdf",
    title: "First 7 days in Japan",
    subtitle: "Week one priorities: payments, trains, laundry, and a sustainable pace.",
    sections: [
      {
        heading: "Days 1 to 2: land and stabilize",
        items: [
          "Data working, cash on hand, IC card loaded, first hotel check-in complete.",
          "Eat simple, sleep on local time, one short walk to reset jet lag.",
          "Buy water, snacks, and trash bags at a conbini. Learn your block exits.",
        ],
      },
      {
        heading: "Days 3 to 4: move between cities",
        items: [
          "Book Shinkansen or express seats early if holiday week. Luggage plan before platforms.",
          "Coin locker test with small bag first if you have never used one.",
          "Laundry day if you packed light. Hotel sink wash only as backup.",
        ],
      },
      {
        heading: "Days 5 to 7: depth without burnout",
        items: [
          "One big sight per day, one slow block for food and shops.",
          "Revisit a station you rushed earlier. Confidence builds with repetition.",
          "Defer big shopping until you know baggage weight for the flight home.",
        ],
      },
    ],
    tagline: "Field notes from JapanProTips.",
  },

  "moving-to-japan-30-days": {
    id: "moving-to-japan-30-days",
    filename: "moving-to-japan-30-days.pdf",
    title: "Moving to Japan: first 30 days",
    subtitle:
      "Month one order: address registration, bank, phone, utilities, and apartment admin.",
    sections: [
      {
        heading: "Week 1: legal address and basics",
        items: [
          "Register residence at city hall within the legal window. Bring passport and lease proof.",
          "Receive residence card updates if applicable. Photograph front and back, store offline.",
          "National Health Insurance enrollment often follows the same visit or soon after.",
        ],
      },
      {
        heading: "Week 2: money and connectivity",
        items: [
          "Open a bank account if your visa status allows. Ask which ATMs and apps work overseas.",
          "SIM or MVNO plan that matches your stay length. Home internet quote if fiber install waits weeks.",
          "My Number card invitation may arrive by mail. Track mail slots and names on the box.",
        ],
      },
      {
        heading: "Week 3: apartment and utilities",
        items: [
          "Electric, gas, and water start dates aligned with key handover. Photos of meters on day one.",
          "Garbage ward chart on the fridge. Wrong bag day is a common early fine risk.",
          "Fire insurance proof if your building requires it for renewal.",
        ],
      },
      {
        heading: "Week 4: habits and buffers",
        items: [
          "Auto debit for rent and utilities once the bank confirms timing.",
          "Emergency cash buffer separate from daily wallet.",
          "One folder for scanned leases, visa papers, and insurance PDFs.",
        ],
      },
    ],
    tagline: "Field notes from JapanProTips.",
  },

  "apartment-setup-checklist": {
    id: "apartment-setup-checklist",
    filename: "apartment-setup-checklist.pdf",
    title: "Apartment setup checklist",
    subtitle: "Move-in order: keys, meters, internet, garbage, and mail you cannot miss.",
    sections: [
      {
        heading: "Before you turn the key",
        items: [
          "Photos of every wall, floor, and appliance for move-out later.",
          "Test all burners, hot water, AC remote, and breaker labels on day one.",
          "Confirm who pays which fee: fire insurance, key replacement, parking.",
        ],
      },
      {
        heading: "Utilities and safety",
        items: [
          "Electric contract in your name from start date. Gas often needs an appointment for activation.",
          "Water is usually simpler but still confirm valve location and shutoff direction.",
          "Smoke detector test. Fire extinguisher location if provided.",
        ],
      },
      {
        heading: "Internet and work from home",
        items: [
          "Fiber install can slip weeks in busy seasons. Mobile hotspot backup for remote work.",
          "Router placement near the fiber port. Ask building rules about wall mounts.",
          "Write down PPPoE or provider login once the tech leaves.",
        ],
      },
      {
        heading: "Mail and neighbors",
        items: [
          "Name on mailbox must match registration where required. Misdelivery is common early.",
          "Intro note optional but quiet hours matter more than gifts.",
          "Package labels in Japanese help couriers when your building has no concierge.",
        ],
      },
    ],
    tagline: "Field notes from JapanProTips.",
  },

  "japan-emergency-card": {
    id: "japan-emergency-card",
    filename: "japan-emergency-card.pdf",
    title: "Japan emergency numbers",
    subtitle: "Pocket card. Save offline or print. Confirm official numbers before travel.",
    compact: true,
    sections: [
      {
        heading: "Emergency",
        items: [
          "110: Police (crime, accidents, lost passport theft).",
          "119: Fire and ambulance. Say your location slowly. English not guaranteed in all regions.",
        ],
      },
      {
        heading: "Visitor help lines (verify on jnto.go.jp)",
        items: [
          "Japan Visitor Hotline (JNTO): 050-3816-2787. English and other languages, year round.",
          "From overseas IP phones may not work. Use a local line or hotel phone when needed.",
        ],
      },
      {
        heading: "If you are lost or separated",
        items: [
          "Station staff windows handle lost IC cards and found items faster than guessing gates.",
          "Hotel address in Japanese on your phone helps police and taxis help you.",
          "Embassy registration is optional but useful for long stays and family contact.",
        ],
      },
    ],
    tagline: "Field notes from JapanProTips.",
  },
};

/** Legacy resource page PDF: same editorial system, aligned with first-30-days promise. */
export const MOVING_CHECKLIST_RESOURCE_SPEC: ChecklistPdfSpec = {
  id: "moving-to-japan-checklist-resource",
  filename: "moving-to-japan-checklist.pdf",
  title: "Moving to Japan: first 30 days checklist",
  subtitle:
    "A boring, practical order for bank, phone, bills, and apartment setup in month one.",
  sections: CHECKLIST_PDF_SPECS["moving-to-japan-30-days"].sections,
  tagline: CHECKLIST_PDF_SPECS["moving-to-japan-30-days"].tagline,
};
