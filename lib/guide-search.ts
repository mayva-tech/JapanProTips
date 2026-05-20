export type GuideSearchEntry = {
  title: string;
  description: string;
  href: string;
  category: string;
  section: string;
  keywords: string[];
};

/** Expands common queries so related words still match guides. */
const SEARCH_TERM_ALIASES: Record<string, string[]> = {
  sim: ["esim", "simcard", "data", "phone", "mobile", "lte", "pocket", "wifi"],
  esim: ["sim", "data", "phone", "mobile"],
  phone: ["sim", "mobile", "plan", "carrier"],
  train: ["shinkansen", "jr", "rail", "transit", "metro", "subway"],
  shinkansen: ["train", "bullet", "jr"],
  jr: ["train", "pass", "rail"],
  pass: ["jr", "rail", "train"],
  suica: ["pasmo", "ic", "card", "tap"],
  pasmo: ["suica", "ic", "card"],
  ic: ["suica", "pasmo", "card"],
  rent: ["apartment", "housing", "lease", "landlord", "deposit"],
  apartment: ["rent", "housing", "lease", "room"],
  housing: ["rent", "apartment", "lease"],
  bank: ["account", "banking", "atm", "transfer", "yen"],
  account: ["bank", "banking", "atm"],
  bill: ["utility", "utilities", "payment", "electricity", "gas", "water"],
  utility: ["bill", "utilities", "electricity", "gas", "water"],
  delivery: ["package", "parcel", "yamato", "kuroneko", "amazon", "redelivery"],
  package: ["delivery", "parcel", "yamato"],
  allergy: ["hay", "fever", "pollen", "rhinitis", "cedar"],
  pollen: ["allergy", "hay", "cedar", "fever"],
  visa: ["immigration", "residence", "status", "renewal"],
  health: ["insurance", "nhi", "clinic", "hospital", "doctor"],
  insurance: ["health", "nhi", "kokumin"],
  trash: ["garbage", "recycling", "waste", "sorting"],
  garbage: ["trash", "recycling", "waste"],
  onsen: ["bath", "hot", "spring", "sauna"],
  kyoto: ["stay", "hotel", "area"],
  tokyo: ["stay", "hotel", "shinjuku", "shibuya", "area"],
  airport: ["narita", "haneda", "arrival", "landing"],
  narita: ["airport", "tokyo"],
  haneda: ["airport", "tokyo"],
  money: ["cash", "card", "payment", "yen", "atm"],
  cash: ["money", "card", "atm", "yen"],
  card: ["cash", "credit", "payment", "suica"],
  job: ["work", "part-time", "employment", "hunting"],
  work: ["job", "culture", "office"],
  pet: ["dog", "cat", "apartment"],
  bike: ["bicycle", "cycling", "commute"],
  tax: ["taxes", "pension", "nenkin"],
  pension: ["nenkin", "tax", "retirement"],
  moving: ["move", "apartment", "mover", "relocation"],
  move: ["moving", "apartment", "mover"],
  resident: ["living", "life", "foreigner", "expat"],
  tourist: ["visitor", "travel", "trip", "first-time"],
  travel: ["trip", "tourist", "visitor", "itinerary"],
};

export function normalizeSearchQuery(query: string): string {
  return query.trim().toLowerCase();
}

function expandSearchTerms(terms: string[]): string[] {
  const expanded = new Set(terms);
  for (const term of terms) {
    const aliases = SEARCH_TERM_ALIASES[term];
    if (aliases) {
      for (const alias of aliases) {
        expanded.add(alias);
      }
    }
  }
  return Array.from(expanded);
}

export function searchGuides(
  query: string,
  index: GuideSearchEntry[],
  limit = 8,
): GuideSearchEntry[] {
  const normalized = normalizeSearchQuery(query);
  if (!normalized) return [];

  const terms = normalized.split(/\s+/).filter((t) => t.length >= 2);
  if (terms.length === 0 && normalized.length >= 2) {
    terms.push(normalized);
  }
  if (terms.length === 0) return [];

  const expandedTerms = expandSearchTerms(terms);

  const scored = index
    .map((entry) => {
      const haystack = [
        entry.title,
        entry.description,
        entry.category,
        entry.section,
        entry.keywords.join(" "),
        entry.href,
      ]
        .join(" ")
        .toLowerCase();

      let score = 0;
      for (const term of expandedTerms) {
        if (entry.title.toLowerCase().includes(term)) score += 4;
        if (haystack.includes(term)) score += 2;
        if (entry.href.toLowerCase().includes(term)) score += 1;
      }
      return { entry, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map(({ entry }) => entry);
}
