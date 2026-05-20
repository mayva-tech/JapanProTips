/**
 * "Can I Bring This to Japan?" heuristic guidance.
 * Not legal, medical, or customs advice. Users must verify with official sources.
 */

export type BringStatus =
  | "usually-ok"
  | "check-before-travel"
  | "restricted"
  | "do-not-bring";

export type BringCategoryId =
  | "prescription-medicine"
  | "otc-medicine"
  | "adhd-medication"
  | "vitamins-supplements"
  | "food-snacks"
  | "meat-products"
  | "fresh-fruit-plants"
  | "vape-nicotine"
  | "alcohol"
  | "electronics"
  | "power-banks"
  | "cosmetics-skincare"
  | "cash";

export type BringCategoryEntry = {
  id: BringCategoryId;
  label: string;
  /** Lowercase hints for client-side search */
  searchText: string;
  status: BringStatus;
  explanation: string;
  whatToPrepare: string;
  commonMistake: string;
  officialReminder: string;
};

export const BRING_CHECKER_DISCLAIMER =
  "This tool is general guidance only. Always check official Japanese customs, quarantine, airline, and medication rules before travel.";

export const STATUS_LABELS: Record<BringStatus, string> = {
  "usually-ok": "Usually OK",
  "check-before-travel": "Check before travel",
  restricted: "Restricted",
  "do-not-bring": "Do not bring",
};

export const BRING_CATEGORIES: readonly BringCategoryEntry[] = [
  {
    id: "prescription-medicine",
    label: "Prescription medicine",
    searchText:
      "prescription medicine pills pharmacy doctor rx import personal use",
    status: "check-before-travel",
    explanation:
      "Japan regulates personal imports of medicine. What is legal at home may still need paperwork, quantity limits, or advance approval depending on the drug class and how you carry it.",
    whatToPrepare:
      "Keep medicines in original packaging with your name and prescriber details when possible. Contact the relevant Japanese health authority and customs guidance for your specific drug before you book, not at the airport.",
    commonMistake:
      "Assuming a short tourist trip means no rules apply, or packing a large supply that looks commercial.",
    officialReminder:
      "Use official Ministry of Health, Labour and Welfare and Japan Customs sources for your exact medicine and route.",
  },
  {
    id: "otc-medicine",
    label: "Over-the-counter medicine",
    searchText:
      "over the counter otc painkiller ibuprofen acetaminophen cold flu tablets",
    status: "check-before-travel",
    explanation:
      "Small amounts for personal use are often fine, but some ingredients (for example certain cold medicines) can be controlled or restricted in Japan even if they are sold over the counter where you live.",
    whatToPrepare:
      "Check ingredient lists against official Japanese lists. Keep original retail packaging and a reasonable quantity only for your trip.",
    commonMistake:
      "Bringing a big bottle of multi-symptom cold medicine without reading the active ingredients.",
    officialReminder:
      "Confirm with official customs and health agency pages for controlled ingredients and quantity guidance.",
  },
  {
    id: "adhd-medication",
    label: "ADHD medication",
    searchText:
      "adhd stimulant adderall ritalin vyvanse concerta methylphenidate controlled",
    status: "restricted",
    explanation:
      "Many ADHD treatments are strictly controlled. Import rules can be tight, and you must follow official procedures. This site cannot tell you what is permitted for your prescription.",
    whatToPrepare:
      "Verify in advance with official Japanese health authorities and written customs guidance for your exact medication and dosage. Ask your clinician for documentation you are allowed to share for travel planning.",
    commonMistake:
      "Carrying extra tablets, repackaging pills, or assuming a US or EU prescription label is enough on its own.",
    officialReminder:
      "Do not attempt to bypass customs. Only follow published official import and possession rules.",
  },
  {
    id: "vitamins-supplements",
    label: "Vitamins and supplements",
    searchText:
      "vitamins supplements protein powder melatonin gummies health capsules",
    status: "usually-ok",
    explanation:
      "Typical personal-use vitamins and supplements in reasonable retail packaging are often treated like normal personal items, but products that look medicinal or contain unusual botanicals can get extra questions.",
    whatToPrepare:
      "Keep factory labels, avoid bulk powders that look commercial, and carry amounts that match a short trip.",
    commonMistake:
      "Huge tubs of powder or unlabeled baggies that are hard to explain at inspection.",
    officialReminder:
      "If the product makes strong medical claims or contains uncommon ingredients, double-check official import lists before travel.",
  },
  {
    id: "food-snacks",
    label: "Food and snacks",
    searchText:
      "food snacks candy chocolate cookies chips instant noodles sealed packaged",
    status: "check-before-travel",
    explanation:
      "Japan uses strict plant and animal quarantine rules. Many packaged snacks are allowed within personal limits, but anything with meat, dairy, fresh produce, or seeds can cross into restricted territory fast.",
    whatToPrepare:
      "Read official quarantine and customs guidance for your exact product. Prefer commercially packaged items with clear ingredient lists.",
    commonMistake:
      "Packing homemade jerky, sandwiches with meat, or trail mix with dried fruit without checking quarantine categories.",
    officialReminder:
      "Japan Customs and plant and animal quarantine official pages explain what must be declared or is prohibited.",
  },
  {
    id: "meat-products",
    label: "Meat products",
    searchText:
      "meat beef pork sausage jerky bacon ham sandwich salami",
    status: "do-not-bring",
    explanation:
      "Many meat and animal products are prohibited or tightly controlled for quarantine reasons. Do not assume cooking or vacuum sealing changes the rule set.",
    whatToPrepare:
      "Plan to buy meat dishes in Japan. If you have a rare official exception for a specific product class, carry only what written official guidance explicitly allows.",
    commonMistake:
      "Hiding food in a bag or not declaring items on arrival forms.",
    officialReminder:
      "Attempting to evade inspection is illegal. Follow official quarantine and customs rules only.",
  },
  {
    id: "fresh-fruit-plants",
    label: "Fresh fruit or plants",
    searchText:
      "fresh fruit vegetables plants seeds soil flowers cutting apple orange",
    status: "do-not-bring",
    explanation:
      "Fresh fruit, vegetables, plants, seeds, and soil are classic quarantine risk items. Many items are banned or need permits you will not get at the airport as a tourist.",
    whatToPrepare:
      "Buy produce in Japan. If you must move a rare regulated item, work only through official channels before travel.",
    commonMistake:
      "An apple or orange left in a carry-on from the last flight, or a cute plant cutting as a gift.",
    officialReminder:
      "Check official plant and animal quarantine notices from Japanese authorities for any exception list updates.",
  },
  {
    id: "vape-nicotine",
    label: "Vape or nicotine products",
    searchText:
      "vape e-cigarette nicotine liquid pods heated tobacco iqos juul",
    status: "restricted",
    explanation:
      "Japan regulates nicotine and related products. Limits and types that are legal can differ from your home country, and liquids can also trigger airline rules.",
    whatToPrepare:
      "Read official Japanese tobacco and customs guidance and your airline rules before you pack anything with nicotine.",
    commonMistake:
      "Carrying large bottles of nicotine liquid or devices you cannot show are for legal personal use.",
    officialReminder:
      "Use only official government and airline sources. Do not rely on forum shortcuts.",
  },
  {
    id: "alcohol",
    label: "Alcohol",
    searchText:
      "alcohol wine beer spirits liquor duty free bottle",
    status: "check-before-travel",
    explanation:
      "Travelers often bring small amounts within duty-free allowances, but bottles add weight and allowances change. You may owe tax or paperwork above allowed limits.",
    whatToPrepare:
      "Check current Japan Customs duty-free allowances and your airline baggage policy. Keep receipts when you buy at a duty-free shop in transit.",
    commonMistake:
      "Assuming two extra bottles are fine without reading the allowance table for your age and entry type.",
    officialReminder:
      "Confirm declaration rules on official Japan Customs pages before you fly.",
  },
  {
    id: "electronics",
    label: "Electronics",
    searchText:
      "electronics laptop camera tablet charger adapter phone kindle reader",
    status: "usually-ok",
    explanation:
      "Personal electronics for the trip, such as a phone, laptop, or camera, are normally fine. Commercial quantities or items you plan to resell are a different category.",
    whatToPrepare:
      "Charge devices before security, know which items must come out of the bag, and keep lithium batteries where the airline asks.",
    commonMistake:
      "Packing ten identical new phones that look like inventory, not personal use.",
    officialReminder:
      "If you are carrying unusual high-value gear for work, check customs value rules and invoices if they apply to you.",
  },
  {
    id: "power-banks",
    label: "Power banks",
    searchText:
      "power bank battery pack portable charger mah lithium spare external",
    status: "check-before-travel",
    explanation:
      "Spare lithium batteries and power banks are heavily regulated in the air. Limits depend on watt-hour rating, how many you carry, and whether they go in carry-on versus checked baggage. Rules differ by airline and regulator.",
    whatToPrepare:
      "Read your airline printed or online policy for spare batteries and power banks. Prefer carry-on placement when the airline requires it, and carry clear specs printed on the device.",
    commonMistake:
      "Checking a power bank in a suitcase, or carrying several huge packs without checking watt-hour limits.",
    officialReminder:
      "Follow your airline and the official aviation authority guidance for your itinerary. Japan airport security will apply those rules at screening.",
  },
  {
    id: "cosmetics-skincare",
    label: "Cosmetics and skincare",
    searchText:
      "cosmetics skincare makeup lotion serum sunscreen cream beauty",
    status: "usually-ok",
    explanation:
      "Reasonable personal quantities of cosmetics and skincare for your trip are typically fine. Liquids still need to meet airline carry-on limits for security.",
    whatToPrepare:
      "Use travel sizes for carry-on, seal liquids well, and keep clearly labeled retail products.",
    commonMistake:
      "A toiletry bag full of unmarked refill pouches that slow down inspection.",
    officialReminder:
      "If you carry very large amounts or products for resale, read official customs guidance on personal use versus commercial import.",
  },
  {
    id: "cash",
    label: "Cash",
    searchText:
      "cash yen dollars currency money declaration traveler checks",
    status: "check-before-travel",
    explanation:
      "Traveling with cash is legal, but many countries require a declaration when the total crosses a set threshold. The threshold and what counts toward it can change, and forms matter.",
    whatToPrepare:
      "Look up the current Japan Customs rules for reporting cash and other monetary instruments before you travel. Keep amounts consistent with your itinerary and carry proof of source if you legitimately need large sums.",
    commonMistake:
      "Splitting cash between pockets to stay under a limit you read online, which can still count as structuring if authorities treat it that way where rules apply.",
    officialReminder:
      "Only follow published official customs declaration requirements. If unsure, declare and ask an official channel rather than guessing.",
  },
] as const;

const CATEGORY_IDS = new Set<BringCategoryId>(
  BRING_CATEGORIES.map((c) => c.id),
);

export function getBringCategoryById(
  id: BringCategoryId | null | undefined,
): BringCategoryEntry | undefined {
  if (!id || !CATEGORY_IDS.has(id)) return undefined;
  return BRING_CATEGORIES.find((c) => c.id === id);
}

export type BringCheckerUrlState = {
  categoryId: BringCategoryId | null;
  /** Search box text for filtering cards */
  q: string;
};

export const BRING_CHECKER_DEFAULTS: BringCheckerUrlState = {
  categoryId: null,
  q: "",
};

function clampQueryLength(s: string, max: number): string {
  const t = s.trim();
  if (t.length <= max) return t;
  return t.slice(0, max);
}

export function parseBringCheckerSearchParams(
  searchParams: URLSearchParams,
): BringCheckerUrlState {
  const rawCat = searchParams.get("category");
  let categoryId: BringCategoryId | null = null;
  if (rawCat && CATEGORY_IDS.has(rawCat as BringCategoryId)) {
    categoryId = rawCat as BringCategoryId;
  }

  const q = clampQueryLength(searchParams.get("q") ?? "", 120);

  return { categoryId, q };
}

export function serializeBringCheckerQuery(state: BringCheckerUrlState): string {
  const params = new URLSearchParams();
  if (state.categoryId && CATEGORY_IDS.has(state.categoryId)) {
    params.set("category", state.categoryId);
  }
  const q = clampQueryLength(state.q, 120);
  if (q) params.set("q", q);
  return params.toString();
}

export function normalizeBringCheckerQueryString(raw: string): string {
  const sp = new URLSearchParams(raw.startsWith("?") ? raw.slice(1) : raw);
  return serializeBringCheckerQuery(parseBringCheckerSearchParams(sp));
}

export function bringCheckerStateEqual(
  a: BringCheckerUrlState,
  b: BringCheckerUrlState,
): boolean {
  return a.categoryId === b.categoryId && a.q === b.q;
}

export function filterBringCategories(
  q: string,
): readonly BringCategoryEntry[] {
  const needle = q.trim().toLowerCase();
  if (!needle) return BRING_CATEGORIES;
  return BRING_CATEGORIES.filter((c) => {
    if (c.label.toLowerCase().includes(needle)) return true;
    if (c.id.replace(/-/g, " ").includes(needle)) return true;
    return c.searchText.includes(needle);
  });
}

export function buildBringResultSummaryText(
  entry: BringCategoryEntry,
): string {
  const lines = [
    "Can I Bring This to Japan? (summary)",
    "",
    BRING_CHECKER_DISCLAIMER,
    "",
    `Category: ${entry.label}`,
    `Status: ${STATUS_LABELS[entry.status]}`,
    "",
    "Explanation",
    entry.explanation,
    "",
    "What to prepare",
    entry.whatToPrepare,
    "",
    "Common mistake",
    entry.commonMistake,
    "",
    "Official source reminder",
    entry.officialReminder,
  ];
  return lines.join("\n");
}
