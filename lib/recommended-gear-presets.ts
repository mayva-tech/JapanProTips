import type { RecommendedGearItem } from "@/components/RecommendedGearBox";
import {
  type AffiliateLinkId,
  resolveAffiliateLink,
} from "@/lib/affiliate-links";

type RecommendedGearPresetItem = {
  name: string;
  reason: string;
  linkId: AffiliateLinkId;
};

export const recommendedGearPresetItems: Record<
  string,
  RecommendedGearPresetItem[]
> = {
  "japan-rainy-season-guide": [
    {
      name: "Compact travel umbrella",
      reason:
        "Sudden rain is common. A small umbrella you carry beats relying on convenience store umbrellas every day.",
      linkId: "gear-travel-umbrella",
    },
    {
      name: "Quick-dry travel towel",
      reason:
        "Useful for wiping bags, shoes, or yourself after rain without carrying a bulky bath towel.",
      linkId: "gear-quick-dry-towel",
    },
    {
      name: "Packable rain jacket or poncho",
      reason:
        "Covers you when wind turns an umbrella useless on open station platforms.",
      linkId: "gear-packable-rain-jacket",
    },
    {
      name: "Waterproof zip pouches",
      reason:
        "Keeps passport, cash, and transit cards dry when your bag gets splashed.",
      linkId: "gear-waterproof-zip-pouches",
    },
    {
      name: "Shoe covers or spare insoles",
      reason:
        "Wet socks all day ruin walking plans. Dry feet matter on 20,000-step days.",
      linkId: "gear-shoe-covers-insoles",
    },
  ],
  "japan-travel-fatigue": [
    {
      name: "Supportive walking shoes or insoles",
      reason:
        "Most fatigue starts in your feet. Cushion and arch support matter more than another museum ticket.",
      linkId: "gear-walking-shoes-insoles",
    },
    {
      name: "Collapsible water bottle",
      reason:
        "Dehydration sneaks up in humid weather. Refill at konbini and station fountains instead of skipping water.",
      linkId: "gear-collapsible-water-bottle",
    },
    {
      name: "Eye mask and earplugs",
      reason:
        "Light hotel rooms and street noise make recovery sleep harder than people expect.",
      linkId: "gear-eye-mask-earplugs",
    },
    {
      name: "Lightweight packable fan",
      reason:
        "Summer and post-tsuyu humidity drain energy fast. A small fan helps on trains and hotel breaks.",
      linkId: "gear-packable-fan",
    },
    {
      name: "Neck pillow for long train legs",
      reason:
        "A 20-minute nap on a Shinkansen can reset your afternoon without adding another sight to the list.",
      linkId: "gear-neck-pillow",
    },
  ],
  "japan-weather-by-month": [
    {
      name: "Packable rain jacket or poncho",
      reason:
        "June rainy season and sudden showers hit every month except peak winter. A jacket beats chasing convenience store umbrellas.",
      linkId: "gear-packable-rain-jacket",
    },
    {
      name: "Lightweight packable fan",
      reason:
        "July and August humidity drain energy on long walking days. A small fan helps on trains and hotel breaks.",
      linkId: "gear-packable-fan",
    },
    {
      name: "Supportive walking shoes",
      reason:
        "Weather changes what you wear, but step counts stay high year round. Cushioned shoes matter more than an extra museum ticket.",
      linkId: "gear-walking-shoes",
    },
    {
      name: "Quick-dry travel towel",
      reason:
        "Humid months slow room drying. A small towel handles sweat, rain, and laundry surprises without bulk.",
      linkId: "gear-quick-dry-towel",
    },
    {
      name: "Compact travel umbrella",
      reason:
        "Spring and autumn showers appear with little warning. Carry a small umbrella instead of buying one every other day.",
      linkId: "gear-travel-umbrella",
    },
  ],
  "japan-laundry-guide": [
    {
      name: "Travel laundry detergent sheets",
      reason:
        "Coin laundry panels are often Japanese only. Sheets are light, TSA-friendly, and work for sink washes between laundromat runs.",
      linkId: "gear-travel-laundry-sheets",
    },
    {
      name: "Quick-dry travel towel",
      reason:
        "Hotel dryers sometimes stop while clothes are still damp. A towel helps you finish drying socks and shirts in the room.",
      linkId: "gear-quick-dry-towel",
    },
    {
      name: "Lightweight packable fan",
      reason:
        "Room drying in humid weather needs airflow. A small fan speeds up laundry you cannot leave hanging overnight.",
      linkId: "gear-packable-fan",
    },
    {
      name: "Lightweight daypack",
      reason:
        "Coin laundries are usually a short walk from the station. A slim bag carries detergent, coins, and damp laundry back.",
      linkId: "gear-lightweight-daypack",
    },
  ],
  "getting-around-japan": [
    {
      name: "Supportive walking shoes",
      reason:
        "Train days still mean 15,000 or more steps between stations, konbini stops, and hotel walks.",
      linkId: "gear-walking-shoes",
    },
    {
      name: "Portable power bank",
      reason:
        "Navigation apps, tickets, and translation drain your phone before you reach the hotel.",
      linkId: "gear-portable-power-bank",
    },
    {
      name: "Lightweight daypack",
      reason:
        "Keeps hands free for IC card taps, stairs, and crowded platforms while you follow app directions.",
      linkId: "gear-lightweight-daypack",
    },
    {
      name: "Crossbody security pouch",
      reason:
        "Busy stations are pickpocket targets. A slim pouch under your jacket holds cash and cards while you transfer.",
      linkId: "gear-crossbody-pouch",
    },
    {
      name: "Phone compatibility check (eSIM ready)",
      reason:
        "Confirm your phone is unlocked and eSIM-capable before you fly so train apps work on arrival day one.",
      linkId: "gear-esim-phone-check",
    },
  ],
};

function resolveGearItems(
  items: RecommendedGearPresetItem[],
): RecommendedGearItem[] {
  return items.map(({ linkId, name, reason }) => ({
    name,
    reason,
    href: resolveAffiliateLink(linkId),
    linkId,
  }));
}

export const recommendedGearPresets: Record<string, RecommendedGearItem[]> =
  Object.fromEntries(
    Object.entries(recommendedGearPresetItems).map(([gearId, items]) => [
      gearId,
      resolveGearItems(items),
    ]),
  );

export function getRecommendedGearPreset(
  gearId: string,
): RecommendedGearItem[] | undefined {
  const items = recommendedGearPresetItems[gearId];
  if (!items) {
    return undefined;
  }
  return resolveGearItems(items);
}
