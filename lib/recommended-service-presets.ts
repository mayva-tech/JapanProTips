import type { RecommendedServiceItem } from "@/components/RecommendedServicesBox";
import {
  type AffiliateLinkId,
  resolveAffiliateLink,
} from "@/lib/affiliate-links";

type RecommendedServicePresetItem = {
  name: string;
  category: string;
  bestFor: string;
  reason: string;
  linkId: AffiliateLinkId;
  caution?: string;
};

export type RecommendedServicePresetMeta = {
  title: string;
  intro?: string;
};

export const recommendedServicePresetMeta: Record<
  string,
  RecommendedServicePresetMeta
> = {
  "sim-card-japan": {
    title: "Recommended services for getting connected in Japan",
    intro:
      "These are practical services that solve common internet setup problems for visitors in Japan.",
  },
  "japan-airport-first-steps": {
    title: "Recommended services for Japan airport arrival",
    intro:
      "These are practical services that solve common arrival-day problems in Japan.",
  },
  "japan-airport-to-city": {
    title: "Recommended services for airport-to-city travel",
    intro:
      "These are practical services that solve common transport and luggage problems after you land.",
  },
  "japan-travel-insurance": {
    title: "Recommended services for travel insurance in Japan",
    intro:
      "These are practical services that solve common coverage questions before you fly.",
  },
  "japan-luggage-shipping": {
    title: "Recommended services for luggage forwarding in Japan",
    intro:
      "These are practical services that solve common baggage handling problems between hotels and airports.",
  },
  "japan-itinerary": {
    title: "Recommended services for planning a Japan itinerary",
    intro:
      "These are practical services that solve common booking and connectivity problems while you map your route.",
  },
  "japan-budget-breakdown": {
    title: "Recommended services for budgeting a Japan trip",
    intro:
      "These are practical services that help you price lodging, data, activities, and coverage before you commit.",
  },
  "japan-trains": {
    title: "Recommended services for Japan train travel",
    intro:
      "These are practical services that solve common navigation, booking, and luggage problems on rail-heavy trips.",
  },
  "money-payments-japan": {
    title: "Recommended services for paying in Japan",
    intro:
      "These are practical services that solve common card, ATM, and booking setup problems before you land.",
  },
  "where-to-stay-tokyo": {
    title: "Recommended services for booking Tokyo stays",
    intro:
      "These are practical services that solve common hotel search, luggage, and arrival-day problems in Tokyo.",
  },
  "shinkansen-guide": {
    title: "Recommended services for Shinkansen travel",
    intro:
      "These are practical services that solve common ticket, pass, and luggage problems on bullet train legs.",
  },
  "japan-cash-withdrawal-guide": {
    title: "Recommended services for cash and ATMs in Japan",
    intro:
      "These are practical services that solve common card decline and travel money problems at Japanese ATMs.",
  },
  "jr-pass-worth-it": {
    title: "Recommended services for JR Pass planning",
    intro:
      "These are practical services that solve common pass purchase, lodging, and multi-city routing problems.",
  },
  "japan-mobile-phone-plans": {
    title: "Recommended services for phone plans in Japan",
    intro:
      "These are practical services that solve common connectivity setup problems for residents and long stays.",
  },
};

export const recommendedServicePresetItems: Record<
  string,
  RecommendedServicePresetItem[]
> = {
  "sim-card-japan": [
    {
      name: "Japan eSIM provider",
      category: "Mobile data",
      bestFor: "Solo travelers with an unlocked, eSIM-compatible phone",
      reason:
        "Install before you fly so maps, train apps, and hotel messages work in the arrivals hall without a kiosk queue.",
      linkId: "esim-japan",
      caution:
        "Confirm your phone supports eSIM and is unlocked for international use before you buy.",
    },
    {
      name: "Pocket WiFi rental",
      category: "Shared hotspot",
      bestFor: "Families or groups sharing one connection across several devices",
      reason:
        "One hotspot can cover phones, tablets, and a laptop when you do not want separate plans per person.",
      linkId: "pocket-wifi-japan",
      caution:
        "You must pick up and return the device. Battery life and bag space matter on long days.",
    },
    {
      name: "Long-stay visitor SIM",
      category: "Physical SIM",
      bestFor: "Trips of two weeks or more, or phones without eSIM",
      reason:
        "A local data SIM with a higher cap can cost less per day than topping up short eSIM plans repeatedly.",
      linkId: "visitor-sim-long-stay",
      caution:
        "Delivery timing and activation steps vary by seller. Order before you fly when possible.",
    },
  ],
  "japan-airport-first-steps": [
    {
      name: "Japan eSIM provider",
      category: "Mobile data",
      bestFor: "Travelers who want internet before leaving the airport",
      reason:
        "Useful if you need maps, train routes, translation, or hotel directions immediately after landing.",
      linkId: "esim-japan",
      caution:
        "Check that your phone is unlocked and eSIM-compatible before buying.",
    },
    {
      name: "Airport transfer booking",
      category: "Ground transport",
      bestFor: "Late arrivals, heavy luggage, or hotels away from a main rail hub",
      reason:
        "Pre-booking a train seat, bus, or private transfer reduces decision fatigue when you are tired.",
      linkId: "airport-transfer-booking",
      caution:
        "Match the service to your terminal and hotel area. Narita and Haneda use different lines.",
    },
    {
      name: "Luggage delivery service",
      category: "Baggage forwarding",
      bestFor: "Travelers heading straight into the city with large suitcases",
      reason:
        "Ship bags from the airport counter to your hotel so you can take trains with a light daypack.",
      linkId: "luggage-delivery",
      caution:
        "Hotels must accept courier deliveries. Confirm with the front desk before you pay.",
    },
  ],
  "japan-airport-to-city": [
    {
      name: "Airport train or bus booking",
      category: "Public transit",
      bestFor: "First-time visitors who want a reserved seat on NEX, Skyliner, or airport buses",
      reason:
        "Some airport express tickets are easier to buy online before you stand in a tired queue at a machine.",
      linkId: "airport-express-booking",
      caution:
        "Your hotel neighborhood should drive the line you pick. The fastest train is not always the simplest.",
    },
    {
      name: "Private airport transfer",
      category: "Door-to-door transport",
      bestFor: "Families, mobility needs, or arrivals after sparse train hours",
      reason:
        "A fixed-price car can beat juggling tickets and stairs when bags are heavy or children are with you.",
      linkId: "private-airport-transfer",
      caution:
        "Narita to central Tokyo by taxi is expensive. Compare against train plus one short metro leg.",
    },
    {
      name: "Luggage delivery service",
      category: "Baggage forwarding",
      bestFor: "Travelers connecting through Tokyo with more than a carry-on",
      reason:
        "Forward suitcases from the airport to your hotel so platform changes stay manageable.",
      linkId: "luggage-delivery",
      caution:
        "Same-day delivery is not guaranteed at every airport desk. Ask about timing before you ship.",
    },
  ],
  "japan-travel-insurance": [
    {
      name: "Travel insurance comparison",
      category: "Trip coverage",
      bestFor: "Visitors comparing medical, baggage, and delay benefits in one place",
      reason:
        "Side-by-side policies help you see deductibles and caps instead of guessing from marketing pages.",
      linkId: "travel-insurance-comparison",
      caution:
        "Read the certificate for exclusions, especially adventure activities and pre-existing conditions.",
    },
    {
      name: "Medical travel insurance",
      category: "Health coverage",
      bestFor: "Travelers without overseas medical benefits at home",
      reason:
        "Clinic and hospital bills in Japan are paid upfront. Coverage reduces large out-of-pocket risk.",
      linkId: "travel-insurance-medical",
      caution:
        "Emergency evacuation and dental limits vary. Check per-incident caps before you buy.",
    },
    {
      name: "Emergency assistance service",
      category: "Travel support",
      bestFor: "Trips where you want a 24-hour helpline for hospitals and rebooking help",
      reason:
        "Useful when you do not speak Japanese and need guidance finding English-friendly care or rebooking flights.",
      linkId: "emergency-assistance",
      caution:
        "Assistance lines coordinate care; they do not replace paying providers upfront in many cases.",
    },
  ],
  "japan-luggage-shipping": [
    {
      name: "Luggage delivery service",
      category: "Courier forwarding",
      bestFor: "Hotel-to-hotel moves and airport-to-hotel drops",
      reason:
        "Yamato-style forwarding lets you ride trains with a daypack while bags travel on a separate schedule.",
      linkId: "luggage-delivery",
      caution:
        "Print the destination address in Japanese when staff ask for it. Not every hostel accepts courier bags.",
    },
    {
      name: "Airport luggage storage",
      category: "Short-term storage",
      bestFor: "Layovers or day trips when you cannot check in yet",
      reason:
        "Coin lockers and staffed counters free your hands for a few hours without shipping a full suitcase.",
      linkId: "airport-luggage-storage",
      caution:
        "Large lockers sell out on holidays at major stations. Have a backup plan.",
    },
    {
      name: "Hotel luggage forwarding support",
      category: "Concierge help",
      bestFor: "Travelers staying at hotels with front desks used to courier tags",
      reason:
        "Staff can print labels, store bags until pickup, and confirm delivery windows in Japanese.",
      linkId: "hotel-luggage-forwarding",
      caution:
        "Budget hostels may not handle forwarding. Ask before you assume the desk will ship for you.",
    },
  ],
  "japan-itinerary": [
    {
      name: "Hotel booking platform",
      category: "Accommodation",
      bestFor: "Comparing neighborhoods and cancellation rules before you lock train routes",
      reason:
        "Booking near the right station cuts daily transit time more than adding another city to the list.",
      linkId: "hotel-booking",
      caution:
        "Check last-train times if you plan late dinners far from your hotel.",
    },
    {
      name: "Activity booking platform",
      category: "Tours and tickets",
      bestFor: "Timed-entry museums, food tours, and day trips with fixed schedules",
      reason:
        "Reserved slots prevent wasted mornings in lines for popular sights during peak season.",
      linkId: "activity-booking",
      caution:
        "Leave open time between bookings. Japan days run long when transit and meals slip.",
    },
    {
      name: "Japan eSIM provider",
      category: "Mobile data",
      bestFor: "Travelers building routes in maps and train apps day to day",
      reason:
        "Reliable data makes on-the-fly changes easier when weather or fatigue shifts your plan.",
      linkId: "esim-japan",
      caution:
        "Set up data before your first airport train. WiFi alone is not enough for ticket gates and QR codes.",
    },
    {
      name: "Travel insurance",
      category: "Trip coverage",
      bestFor: "Trips with prepaid hotels, flights, and limited home medical cover abroad",
      reason:
        "Insurance does not prevent problems, but it can limit medical and cancellation costs far from home.",
      linkId: "travel-insurance",
      caution:
        "Match the policy to your activities. Ski, dive, and pre-existing rules differ by plan.",
    },
  ],
  "japan-budget-breakdown": [
    {
      name: "Hotel booking platform",
      category: "Accommodation",
      bestFor: "Comparing capsule, business hotel, and apartment rates by neighborhood",
      reason:
        "Lodging is usually the largest daily cost. Filtering by station area keeps transport spending down too.",
      linkId: "hotel-booking",
      caution:
        "Weekend and holiday prices jump in Tokyo. Book early for cherry blossom and New Year windows.",
    },
    {
      name: "Japan eSIM provider",
      category: "Mobile data",
      bestFor: "Budgeting connectivity separately from pocket WiFi rental",
      reason:
        "eSIM plans are often cheaper per day than airport kiosk SIMs or multi-device hotspot rentals.",
      linkId: "esim-japan",
      caution:
        "Count your travel days honestly. Topping up mid-trip can erase short-plan savings.",
    },
    {
      name: "Activity booking platform",
      category: "Tours and tickets",
      bestFor: "Pricing museums, day tours, and timed experiences before you commit",
      reason:
        "Seeing ticket costs early helps you decide which paid sights fit a mid-range daily budget.",
      linkId: "activity-booking",
      caution:
        "Many temples and neighborhoods are free. Do not stack paid tours every day by default.",
    },
    {
      name: "Travel insurance",
      category: "Trip coverage",
      bestFor: "Travelers without overseas medical coverage who want predictable trip risk",
      reason:
        "A single clinic or hospital visit in Japan can cost far more than a basic policy premium.",
      linkId: "travel-insurance",
      caution:
        "Credit card travel perks may already include limited medical cover. Verify limits before you double-buy.",
    },
  ],
  "japan-trains": [
    {
      name: "Japan eSIM provider",
      category: "Mobile data",
      bestFor: "Travelers who rely on Google Maps or NAVITIME for every transfer",
      reason:
        "Train apps need live data for platform changes, delays, and last-minute route swaps in busy stations.",
      linkId: "esim-japan",
      caution:
        "Install and test before you enter the ticket gates on day one.",
    },
    {
      name: "JR Pass or regional rail pass",
      category: "Rail passes",
      bestFor: "Trips with several long JR legs in a short window",
      reason:
        "A pass can cap cost when you stack Tokyo, Kyoto, Osaka, or Hiroshima rides. Run your real itinerary math first.",
      linkId: "jr-rail-pass",
      caution:
        "Many passes exclude Nozomi. IC cards still pay for metros and non-JR lines the pass does not cover.",
    },
    {
      name: "Luggage delivery service",
      category: "Baggage forwarding",
      bestFor: "Travelers changing hotels between cities by train",
      reason:
        "Ship suitcases ahead so you can use stairs and crowded platforms without dragging full-size bags.",
      linkId: "luggage-delivery",
      caution:
        "Book pickup windows that match hotel check-out and check-in times.",
    },
    {
      name: "Hotel booking platform",
      category: "Lodging",
      bestFor: "Visitors who want stations near Shinjuku, Tokyo, or Kyoto bases",
      reason:
        "Staying near the right hub cuts daily train time more than any app trick.",
      linkId: "hotel-booking",
      caution:
        "Read the nearest station exit, not just the ward name on the listing.",
    },
  ],
  "money-payments-japan": [
    {
      name: "Travel money card or fee-friendly debit",
      category: "Cards and ATMs",
      bestFor: "Visitors who plan to withdraw yen at 7-Eleven or Japan Post ATMs",
      reason:
        "Some home debit cards decline or add heavy fees abroad. A travel-focused card reduces ATM surprises on day one.",
      linkId: "travel-money-card",
      caution:
        "Notify your bank before you fly and test one withdrawal early, not on your last day in a rural town.",
    },
    {
      name: "Hotel booking platform",
      category: "Lodging",
      bestFor: "Travelers who want to prepay hotels on card and carry less cash",
      reason:
        "Major hotels and chains take cards reliably. Prepaying lodging frees daily cash for small shops and temples.",
      linkId: "hotel-booking",
      caution:
        "Ryokan and tiny guesthouses may still want cash on arrival. Read payment notes on the listing.",
    },
    {
      name: "Travel insurance comparison",
      category: "Trip coverage",
      bestFor: "Travelers without overseas medical coverage on their home card",
      reason:
        "A clinic visit or hospital stay in Japan can cost far more than a basic policy premium if payment fails abroad.",
      linkId: "travel-insurance-comparison",
      caution:
        "Check existing credit card travel perks before you buy overlapping cover.",
    },
  ],
  "where-to-stay-tokyo": [
    {
      name: "Hotel booking platform",
      category: "Lodging",
      bestFor: "First-time visitors comparing Shinjuku, Shibuya, and Ueno bases",
      reason:
        "Filter by station name and guest rating before you commit to a cheap room far from the Yamanote loop.",
      linkId: "hotel-booking",
      caution:
        "Photos can mislead on room size. Read recent reviews about noise and elevator access.",
    },
    {
      name: "Luggage delivery service",
      category: "Baggage forwarding",
      bestFor: "Travelers who might switch neighborhoods mid-trip",
      reason:
        "Forward bags between hotels so you are not hauling suitcases on rush-hour trains between areas.",
      linkId: "luggage-delivery",
      caution:
        "Same-day delivery is not always available. Book when you know check-out and check-in dates.",
    },
    {
      name: "Japan eSIM provider",
      category: "Mobile data",
      bestFor: "Visitors comparing hotel pins against real station exits",
      reason:
        "Maps and street view checks help you avoid listings that look central but sit 20 minutes from the nearest hub.",
      linkId: "esim-japan",
      caution:
        "Confirm eSIM support on your phone before you rely on data for booking decisions on arrival day.",
    },
    {
      name: "Activity booking platform",
      category: "Tours and tickets",
      bestFor: "Travelers anchoring stays near timed experiences or day tours",
      reason:
        "Seeing meeting points and start times early helps you pick a hotel within an easy morning commute.",
      linkId: "activity-booking",
      caution:
        "Many Tokyo neighborhoods are walkable without paid tours. Book only what you will actually attend.",
    },
  ],
  "shinkansen-guide": [
    {
      name: "JR Pass or regional rail pass",
      category: "Rail passes",
      bestFor: "Visitors planning several bullet train legs on JR lines",
      reason:
        "Passes bundle long Shinkansen rides when individual tickets would exceed the pass price on your dates.",
      linkId: "jr-rail-pass",
      caution:
        "Standard national passes often exclude Nozomi. Check train names against your pass rules before you board.",
    },
    {
      name: "Luggage delivery service",
      category: "Baggage forwarding",
      bestFor: "Tokyo to Kyoto or Osaka moves with large suitcases",
      reason:
        "Oversize bags belong in forwarding, not in overhead racks. Travel light on the train day itself.",
      linkId: "luggage-delivery",
      caution:
        "Delivery windows vary by route. Ship a day before you ride when possible.",
    },
    {
      name: "Japan eSIM provider",
      category: "Mobile data",
      bestFor: "First-time riders checking car numbers and platform screens",
      reason:
        "Live train apps reduce platform mistakes when several departures share the same board.",
      linkId: "esim-japan",
      caution:
        "Download offline station maps as backup in tunnels with weak signal.",
    },
    {
      name: "Hotel booking platform",
      category: "Lodging",
      bestFor: "Travelers pairing Shinkansen days with Kyoto or Osaka hotel bases",
      reason:
        "Stations like Kyoto and Shin-Osaka have clear hotel clusters within walking distance of the bullet train exit.",
      linkId: "hotel-booking",
      caution:
        "Shin-Osaka and Osaka Station are different hubs. Match the hotel to the station on your ticket.",
    },
  ],
  "japan-cash-withdrawal-guide": [
    {
      name: "Travel money card or fee-friendly debit",
      category: "Cards and ATMs",
      bestFor: "Visitors whose home debit card declined at a Japanese ATM",
      reason:
        "A card marketed for overseas ATM use often clears Seven Bank and Japan Post machines when tourist cards fail.",
      linkId: "travel-money-card",
      caution:
        "Decline dynamic currency conversion at the ATM. Choose yen billing when offered.",
    },
    {
      name: "Japan eSIM provider",
      category: "Mobile data",
      bestFor: "Travelers searching for the nearest 7-Eleven ATM after dark",
      reason:
        "Maps with live data help you find konbini ATMs in unfamiliar neighborhoods without wandering cashless.",
      linkId: "esim-japan",
      caution:
        "Rural areas have fewer 24-hour machines. Withdraw in cities before side trips.",
    },
    {
      name: "Travel insurance",
      category: "Trip coverage",
      bestFor: "Travelers without medical cover if a payment or health issue escalates",
      reason:
        "Hospital deposits and clinic bills can require large card holds or cash even when ATMs usually work.",
      linkId: "travel-insurance",
      caution:
        "Keep a backup card and some yen. Insurance claims happen after the bill, not at the ATM screen.",
    },
  ],
  "jr-pass-worth-it": [
    {
      name: "JR Pass or regional rail pass",
      category: "Rail passes",
      bestFor: "Trips where your planned JR legs exceed separate ticket totals",
      reason:
        "Buy only after you list each long ride, train type, and date. The pass is a cap, not a default discount.",
      linkId: "jr-rail-pass",
      caution:
        "Regional passes sometimes beat the national pass when you stay in one macro-region.",
    },
    {
      name: "Luggage delivery service",
      category: "Baggage forwarding",
      bestFor: "Multi-city loops that maximize pass days",
      reason:
        "Heavy bags slow you down on days when you need to ride several JR segments back to back.",
      linkId: "luggage-delivery",
      caution:
        "Forwarding does not replace knowing which trains your pass covers.",
    },
    {
      name: "Hotel booking platform",
      category: "Lodging",
      bestFor: "Visitors anchoring each pass day near a major JR station",
      reason:
        "Hotels within walking distance of Tokyo, Kyoto, or Hiroshima stations protect your early Shinkansen departures.",
      linkId: "hotel-booking",
      caution:
        "A cheap room far from the station can erase the time you saved with a pass.",
    },
    {
      name: "Activity booking platform",
      category: "Tours and tickets",
      bestFor: "Travelers adding paid day trips between JR cities",
      reason:
        "Pricing tours early helps you see whether rail savings should go toward experiences or extra nights.",
      linkId: "activity-booking",
      caution:
        "Many sights are reachable on JR plus local lines without a packaged tour.",
    },
  ],
  "japan-mobile-phone-plans": [
    {
      name: "Resident MVNO plan (SIM-only)",
      category: "Mobile plans",
      bestFor: "Residents with a Japanese bank or card who want lower monthly data",
      reason:
        "MVNOs such as IIJmio or mineo often cost less than docomo or SoftBank flagship contracts for similar radio use.",
      linkId: "resident-mvno-japan",
      caution:
        "Check band support on your phone and whether your visa status meets the carrier rules.",
    },
    {
      name: "Long-stay visitor SIM",
      category: "Physical SIM",
      bestFor: "New arrivals waiting on residence paperwork or apartment internet install",
      reason:
        "A data SIM bridges the first weeks without locking you into a two-year handset bundle.",
      linkId: "visitor-sim-long-stay",
      caution:
        "Activation steps and delivery timing vary. Order before you move in when possible.",
    },
    {
      name: "Pocket WiFi rental",
      category: "Shared hotspot",
      bestFor: "Households sharing one connection before home fiber is live",
      reason:
        "One hotspot can cover laptops and phones while you compare MVNO contracts.",
      linkId: "pocket-wifi-japan",
      caution:
        "You must pick up and return the device. Home fiber is usually cheaper after setup.",
    },
    {
      name: "Japan eSIM provider",
      category: "Mobile data",
      bestFor: "Residents with eSIM-capable unlocked phones who want a quick data line",
      reason:
        "Some travelers and residents add an eSIM data plan while keeping a separate voice SIM or home WiFi.",
      linkId: "esim-japan",
      caution:
        "eSIM does not replace a Japanese phone number for banks or delivery apps that require SMS.",
    },
  ],
};

function resolveServiceItems(
  items: RecommendedServicePresetItem[],
): RecommendedServiceItem[] {
  return items.map(({ linkId, name, category, bestFor, reason, caution }) => ({
    name,
    category,
    bestFor,
    reason,
    href: resolveAffiliateLink(linkId),
    linkId,
    ...(caution ? { caution } : {}),
  }));
}

export const recommendedServicePresets: Record<string, RecommendedServiceItem[]> =
  Object.fromEntries(
    Object.entries(recommendedServicePresetItems).map(([serviceId, items]) => [
      serviceId,
      resolveServiceItems(items),
    ]),
  );

export function getRecommendedServicePreset(
  serviceId: string,
): RecommendedServiceItem[] | undefined {
  const items = recommendedServicePresetItems[serviceId];
  if (!items) {
    return undefined;
  }
  return resolveServiceItems(items);
}

export function getRecommendedServicePresetMeta(
  serviceId: string,
): RecommendedServicePresetMeta | undefined {
  return recommendedServicePresetMeta[serviceId];
}
