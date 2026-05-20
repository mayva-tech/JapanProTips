/**
 * Japan Packing Generator: heuristic checklist from trip profile.
 * Not medical or legal advice. Tailor to your own needs.
 */

export const TRAVEL_MONTHS = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
] as const;

export type TravelerType =
  | "first-timer"
  | "family"
  | "business"
  | "backpacker";

export type PackingCity =
  | "tokyo"
  | "kyoto"
  | "osaka"
  | "hokkaido"
  | "okinawa"
  | "rural";

export type LaundryOption = "none" | "coin" | "hotel";

export type ActivityKey =
  | "theme-parks"
  | "temples"
  | "hiking"
  | "business"
  | "winter-snow"
  | "beach-islands";

export type RainLevel = "low" | "medium" | "high";

export type JapanPackingGeneratorForm = {
  month: number;
  days: number;
  travelerType: TravelerType;
  cities: PackingCity[];
  laundry: LaundryOption;
  activities: ActivityKey[];
  rain: RainLevel;
};

export const JAPAN_PACKING_GENERATOR_DEFAULTS: JapanPackingGeneratorForm = {
  month: 4,
  days: 7,
  travelerType: "first-timer",
  cities: ["tokyo"],
  laundry: "coin",
  activities: ["temples"],
  rain: "medium",
};

export type PackingSectionId =
  | "documents"
  | "clothing"
  | "shoes"
  | "tech"
  | "toiletries"
  | "weather"
  | "japan-specific"
  | "optional";

export type PackingChecklistSection = {
  id: PackingSectionId;
  title: string;
  items: string[];
};

export type PackingGeneratorOutput = {
  sections: PackingChecklistSection[];
  overpackWarning: string;
  buyInJapan: string[];
};

const SECTION_TITLES: Record<PackingSectionId, string> = {
  documents: "Documents and money",
  clothing: "Clothing",
  shoes: "Shoes",
  tech: "Tech",
  toiletries: "Toiletries and medicine",
  weather: "Weather-specific items",
  "japan-specific": "Japan-specific useful items",
  optional: "Optional extras",
};

const TRAVELER_TYPES = new Set<TravelerType>([
  "first-timer",
  "family",
  "business",
  "backpacker",
]);

const CITIES = new Set<PackingCity>([
  "tokyo",
  "kyoto",
  "osaka",
  "hokkaido",
  "okinawa",
  "rural",
]);

const LAUNDRY = new Set<LaundryOption>(["none", "coin", "hotel"]);

const ACTIVITIES = new Set<ActivityKey>([
  "theme-parks",
  "temples",
  "hiking",
  "business",
  "winter-snow",
  "beach-islands",
]);

const RAIN = new Set<RainLevel>(["low", "medium", "high"]);

function clampInt(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, Math.round(n)));
}

function seasonFromMonth(month: number): "winter" | "spring" | "summer" | "fall" {
  if (month === 12 || month <= 2) return "winter";
  if (month <= 5) return "spring";
  if (month <= 8) return "summer";
  return "fall";
}

function hasCity(form: JapanPackingGeneratorForm, c: PackingCity): boolean {
  return form.cities.includes(c);
}

function hasActivity(form: JapanPackingGeneratorForm, a: ActivityKey): boolean {
  return form.activities.includes(a);
}

function uniq(items: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const x of items) {
    const t = x.trim();
    if (!t || seen.has(t)) continue;
    seen.add(t);
    out.push(t);
  }
  return out;
}

function section(
  id: PackingSectionId,
  items: string[],
): PackingChecklistSection {
  return { id, title: SECTION_TITLES[id], items: uniq(items) };
}

export function buildPackingGeneratorOutput(
  form: JapanPackingGeneratorForm,
): PackingGeneratorOutput {
  const season = seasonFromMonth(form.month);
  const docs: string[] = [
    "Passport (six month validity rule: check yours before you fly)",
    "Printed or offline hotel names and addresses in Japanese if you can",
    "Travel insurance card or policy number on your phone",
    "Bank cards you actually use abroad, plus a backup card if you have one",
    "Some yen in small bills for arrival day lockers and drinks",
  ];

  if (form.travelerType === "business") {
    docs.push("Business visa or invitation letter if your trip needs it");
    docs.push("Meeting schedule or conference QR codes saved offline");
  }
  if (form.travelerType === "family") {
    docs.push("Copies of passports and emergency contacts for kids");
    docs.push("Any custody letter if only one parent is traveling");
  }

  const clothing: string[] = [
    "Underwear for roughly half your trip if you can wash, otherwise full trip",
    "Socks that dry overnight (thin layers beat one huge sweater indoors)",
    "One nicer outfit if you plan a sit-down dinner or a skyline bar",
  ];

  if (form.laundry === "none") {
    clothing.push(
      "Extra tops: without laundry you need more changes than you think in humid months",
    );
  }
  if (form.travelerType === "backpacker") {
    clothing.push("Merino or quick-dry base layers you can re-wear");
  }
  if (form.travelerType === "business") {
    clothing.push("Wrinkle-aware shirts or a travel steamer if your hotel has none");
    clothing.push("Neutral blazer or jacket that works for meetings and dinner");
  }

  if (season === "winter" || hasActivity(form, "winter-snow")) {
    clothing.push("Warm mid-layer (fleece or light down) under a wind shell");
    clothing.push("Hat and gloves if Hokkaido or mountain legs are on the list");
  }
  if (season === "summer" || hasCity(form, "okinawa")) {
    clothing.push("Breathable linen or loose cotton for heat and humidity");
    clothing.push("Light long sleeve for sun and overly cold train cars");
  }
  if (hasActivity(form, "temples")) {
    clothing.push("Shoulders and knees covered options for conservative temple days");
  }
  if (hasActivity(form, "beach-islands") || hasCity(form, "okinawa")) {
    clothing.push("Swimwear and a quick-dry cover-up");
  }

  const shoes: string[] = [
    "Broken-in walking shoes with cushion for 15k to 25k steps days",
    "Compact slippers or hotel flip flops if you dislike shared onsen floors",
  ];
  if (hasActivity(form, "hiking")) {
    shoes.push("Trail shoes with grip if you leave paved paths");
  }
  if (hasActivity(form, "theme-parks")) {
    shoes.push("Second pair of socks in your daypack for wet rides or blisters");
  }
  if (form.travelerType === "business") {
    shoes.push("One pair of dress shoes that still tolerates a ten minute walk");
  }

  const tech: string[] = [
    "Unlocked phone or eSIM-ready device",
    "Charging brick and cable (Type A plugs match many US chargers)",
    "Small power bank for long train days",
  ];
  if (form.travelerType === "business") {
    tech.push("Laptop, dongles, and VPN if your employer requires it");
    tech.push("Noise cancelling earbuds for open offices and shinkansen");
  }
  if (form.travelerType === "family") {
    tech.push("Tablet loaded with offline shows for queues and late trains");
  }

  const toiletries: string[] = [
    "Toothbrush and travel toothpaste",
    "Deodorant you trust (Western brands can be harder to match overseas)",
    "Sunscreen you like (face sticks are easy in summer)",
    "Any prescription meds in original packaging plus a short doctor note",
    "Blister plasters and basic pain relief you already tolerate",
  ];
  if (form.travelerType === "family") {
    toiletries.push("Kid-sized fever relief and bandages you know how to use");
  }

  const weather: string[] = [];
  if (form.rain === "high" || form.rain === "medium") {
    weather.push("Packable rain jacket or compact umbrella");
    weather.push("Dry bag or ziplock for phone and passport in sudden storms");
  } else if (season === "spring" || season === "summer") {
    weather.push("Small umbrella anyway: surprise showers still happen");
  }
  if (season === "summer") {
    weather.push("Cooling towel or handheld fan for July and August heat");
    weather.push("Electrolyte packets if you sweat hard walking");
  }
  if (hasCity(form, "hokkaido") && season === "winter") {
    weather.push("Insulated boots with grip for ice and packed snow");
  }

  const japanSpecific: string[] = [
    "IC card (Suica style) on phone or plastic for trains and conbini buys",
    "Coin pouch: you will still handle a lot of small change",
    "Hand towel for restrooms without dryers",
    "Small bag for separating trash until you find the right bin",
  ];
  if (form.laundry === "coin") {
    japanSpecific.push("100 yen coins for washers and dryers");
    japanSpecific.push("Mesh laundry bag so clothes do not tangle in public machines");
  }
  if (form.laundry === "hotel") {
    japanSpecific.push("Hotel laundry bag if the property charges per item");
  }
  if (hasActivity(form, "theme-parks")) {
    japanSpecific.push("Portable phone strap or lanyard for rides and rain");
  }
  if (form.travelerType === "first-timer") {
    japanSpecific.push("Pocket WiFi or eSIM QR saved offline before you land");
  }

  const optional: string[] = [
    "Foldable tote for tax-free shopping bags",
    "Eye mask and earplugs for bright hotel curtains and early garbage trucks",
    "Tiny sewing kit or safety pins",
  ];
  if (hasActivity(form, "hiking")) {
    optional.push("Compact binoculars if you bird or whale watch");
  }

  let overpackWarning: string;
  const cityCount = form.cities.length;
  if (form.days >= 14 && cityCount >= 4) {
    overpackWarning =
      "Long trip, many regions: trains and coin lockers punish heavy bags. Aim for one checked bag and a slim daypack, then plan laundry instead of a fresh outfit for every day.";
  } else if (form.days >= 10 && cityCount >= 3) {
    overpackWarning =
      "You are moving often. Pack for three to four days of clothing and lean on laundry or hotel wash rather than a full wardrobe.";
  } else if (form.days >= 7 && cityCount >= 3) {
    overpackWarning =
      "Do not overpack: a week across several cities still means stairs, tight lockers, and rainy walks. Leave room for one practical souvenir layer.";
  } else {
    overpackWarning =
      "Do not overpack: Japanese hotel rooms are compact. One spare pair of shoes is usually enough beyond your walkers.";
  }

  const buyInJapan: string[] = [
    "Umbrellas and cheap rain gear at conbini when the sky opens",
    "Travel size toiletries and sunscreen once you land if you want to save weight",
    "Pocket WiFi or local SIM if you did not set up eSIM before departure",
    "Heat pads in winter and cooling wipes in summer from any drugstore",
    "Snacks and drinks for the last train: conbini density is your friend",
  ];
  if (hasCity(form, "rural")) {
    buyInJapan.push("Cash-heavy small towns: get more yen at a city ATM before you head out");
  }

  const sections: PackingChecklistSection[] = [
    section("documents", docs),
    section("clothing", clothing),
    section("shoes", shoes),
    section("tech", tech),
    section("toiletries", toiletries),
    section("weather", weather.length ? weather : ["Nothing extra beyond your usual layers for this profile"]),
    section("japan-specific", japanSpecific),
    section("optional", optional),
  ];

  return { sections, overpackWarning, buyInJapan: uniq(buyInJapan) };
}

export function buildPackingChecklistPlainText(
  form: JapanPackingGeneratorForm,
  out: PackingGeneratorOutput,
): string {
  const monthLabel =
    TRAVEL_MONTHS.find((m) => m.value === form.month)?.label ?? String(form.month);
  const lines = [
    "Japan Packing Generator checklist",
    "",
    `Month: ${monthLabel}`,
    `Trip length: ${form.days} days`,
    `Traveler type: ${form.travelerType}`,
    `Cities: ${form.cities.join(", ")}`,
    `Laundry: ${form.laundry}`,
    `Activities: ${form.activities.length ? form.activities.join(", ") : "none selected"}`,
    `Rain concern: ${form.rain}`,
    "",
  ];
  if (out.overpackWarning) {
    lines.push("Note", out.overpackWarning, "");
  }
  for (const s of out.sections) {
    lines.push(s.title);
    for (const item of s.items) {
      lines.push(`- ${item}`);
    }
    lines.push("");
  }
  lines.push("Buy in Japan instead");
  for (const b of out.buyInJapan) {
    lines.push(`- ${b}`);
  }
  return lines.join("\n");
}

export function parseJapanPackingGeneratorSearchParams(
  searchParams: URLSearchParams,
): JapanPackingGeneratorForm {
  const d = { ...JAPAN_PACKING_GENERATOR_DEFAULTS };

  d.month = clampInt(
    Number.parseInt(searchParams.get("month") ?? "", 10) || d.month,
    1,
    12,
  );
  d.days = clampInt(
    Number.parseInt(searchParams.get("days") ?? "", 10) || d.days,
    3,
    21,
  );

  const tt = searchParams.get("traveler");
  if (tt && TRAVELER_TYPES.has(tt as TravelerType)) {
    d.travelerType = tt as TravelerType;
  }

  const laundry = searchParams.get("laundry");
  if (laundry && LAUNDRY.has(laundry as LaundryOption)) {
    d.laundry = laundry as LaundryOption;
  }

  const rain = searchParams.get("rain");
  if (rain && RAIN.has(rain as RainLevel)) {
    d.rain = rain as RainLevel;
  }

  const citiesRaw = searchParams.get("cities");
  if (citiesRaw != null && citiesRaw.trim() !== "") {
    const picked: PackingCity[] = [];
    const seen = new Set<PackingCity>();
    for (const part of citiesRaw.split(",")) {
      const p = part.trim().toLowerCase();
      if (!CITIES.has(p as PackingCity)) continue;
      const c = p as PackingCity;
      if (seen.has(c)) continue;
      seen.add(c);
      picked.push(c);
    }
    if (picked.length > 0) d.cities = picked.sort((a, b) => a.localeCompare(b));
  }

  const actRaw = searchParams.get("activities");
  if (actRaw != null && actRaw.trim() !== "") {
    const picked: ActivityKey[] = [];
    const seen = new Set<ActivityKey>();
    for (const part of actRaw.split(",")) {
      const p = part.trim().toLowerCase();
      if (!ACTIVITIES.has(p as ActivityKey)) continue;
      const a = p as ActivityKey;
      if (seen.has(a)) continue;
      seen.add(a);
      picked.push(a);
    }
    if (picked.length > 0) {
      d.activities = picked.sort((a, b) => a.localeCompare(b));
    }
  }

  return d;
}

function sortedCities(c: PackingCity[]): PackingCity[] {
  return [...c].sort((a, b) => a.localeCompare(b));
}

function sortedActivities(a: ActivityKey[]): ActivityKey[] {
  return [...a].sort((a, b) => a.localeCompare(b));
}

export function serializeJapanPackingGeneratorQuery(
  form: JapanPackingGeneratorForm,
): string {
  const cities =
    form.cities.length > 0 ? form.cities : JAPAN_PACKING_GENERATOR_DEFAULTS.cities;
  const activities =
    form.activities.length > 0
      ? form.activities
      : JAPAN_PACKING_GENERATOR_DEFAULTS.activities;
  const params = new URLSearchParams();
  params.set("activities", sortedActivities(activities).join(","));
  params.set("cities", sortedCities(cities).join(","));
  params.set("days", String(clampInt(form.days, 3, 21)));
  params.set("laundry", form.laundry);
  params.set("month", String(clampInt(form.month, 1, 12)));
  params.set("rain", form.rain);
  params.set("traveler", form.travelerType);
  return params.toString();
}

export function normalizeJapanPackingGeneratorQueryString(raw: string): string {
  const sp = new URLSearchParams(raw.startsWith("?") ? raw.slice(1) : raw);
  return serializeJapanPackingGeneratorQuery(
    parseJapanPackingGeneratorSearchParams(sp),
  );
}

export function japanPackingGeneratorFormsEqual(
  a: JapanPackingGeneratorForm,
  b: JapanPackingGeneratorForm,
): boolean {
  if (a.month !== b.month) return false;
  if (a.days !== b.days) return false;
  if (a.travelerType !== b.travelerType) return false;
  if (a.laundry !== b.laundry) return false;
  if (a.rain !== b.rain) return false;
  if (sortedCities(a.cities).join(",") !== sortedCities(b.cities).join(",")) {
    return false;
  }
  if (
    sortedActivities(a.activities).join(",") !==
    sortedActivities(b.activities).join(",")
  ) {
    return false;
  }
  return true;
}
