import {
  type BudgetStyle,
  type CityKey,
  type HotelType,
  type ShoppingLevel,
  type TransportStyle,
} from "@/lib/japan-trip-budget-calculator";

export type JapanTripBudgetCalculatorForm = {
  days: number;
  travelers: number;
  budgetStyle: BudgetStyle;
  transportStyle: TransportStyle;
  shoppingLevel: ShoppingLevel;
  hotelType: HotelType;
  conbiniMealsPercent: number;
  cities: CityKey[];
};

const BUDGET_STYLES = new Set<BudgetStyle>([
  "budget",
  "mid-range",
  "comfortable",
  "premium",
]);

const TRANSPORT_STYLES = new Set<TransportStyle>([
  "mostly-local",
  "frequent-shinkansen",
  "taxi-heavy",
]);

const SHOPPING_LEVELS = new Set<ShoppingLevel>([
  "minimal",
  "moderate",
  "heavy",
]);

const HOTEL_TYPES = new Set<HotelType>([
  "hostel",
  "business",
  "mid-range",
  "luxury",
]);

const CITY_KEYS = new Set<CityKey>(["tokyo", "osaka", "kyoto", "rural"]);

export const JAPAN_TRIP_BUDGET_CALCULATOR_DEFAULTS: JapanTripBudgetCalculatorForm =
  {
    days: 7,
    travelers: 2,
    budgetStyle: "mid-range",
    cities: ["tokyo"],
    transportStyle: "mostly-local",
    shoppingLevel: "moderate",
    conbiniMealsPercent: 35,
    hotelType: "business",
  };

function clampInt(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, Math.round(n)));
}

function parsePositiveInt(
  raw: string | null,
  min: number,
  max: number,
  fallback: number,
): number {
  if (raw == null || raw === "") return fallback;
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n)) return fallback;
  return clampInt(n, min, max);
}

function roundConbiniStep(n: number): number {
  return clampInt(Math.round(n / 5) * 5, 0, 100);
}

function parseCities(raw: string | null): CityKey[] | null {
  if (raw == null || raw.trim() === "") return null;
  const parts = raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const picked: CityKey[] = [];
  const seen = new Set<CityKey>();
  for (const p of parts) {
    if (!CITY_KEYS.has(p as CityKey)) continue;
    const c = p as CityKey;
    if (seen.has(c)) continue;
    seen.add(c);
    picked.push(c);
  }
  if (picked.length === 0) return null;
  return picked.sort((a, b) => a.localeCompare(b));
}

/**
 * Merge URL params with defaults. Invalid or missing keys keep defaults.
 */
export function parseJapanTripBudgetCalculatorSearchParams(
  searchParams: URLSearchParams,
): JapanTripBudgetCalculatorForm {
  const d = { ...JAPAN_TRIP_BUDGET_CALCULATOR_DEFAULTS };

  d.days = parsePositiveInt(searchParams.get("days"), 3, 21, d.days);
  d.travelers = parsePositiveInt(
    searchParams.get("travelers"),
    1,
    6,
    d.travelers,
  );

  const bs = searchParams.get("budgetStyle");
  if (bs && BUDGET_STYLES.has(bs as BudgetStyle)) {
    d.budgetStyle = bs as BudgetStyle;
  }

  const ts = searchParams.get("transportStyle");
  if (ts && TRANSPORT_STYLES.has(ts as TransportStyle)) {
    d.transportStyle = ts as TransportStyle;
  }

  const sl = searchParams.get("shoppingLevel");
  if (sl && SHOPPING_LEVELS.has(sl as ShoppingLevel)) {
    d.shoppingLevel = sl as ShoppingLevel;
  }

  const ht = searchParams.get("hotelType");
  if (ht && HOTEL_TYPES.has(ht as HotelType)) {
    d.hotelType = ht as HotelType;
  }

  const cr = searchParams.get("conbiniRatio");
  if (cr != null && cr !== "") {
    const n = Number.parseInt(cr, 10);
    if (Number.isFinite(n)) {
      d.conbiniMealsPercent = roundConbiniStep(n);
    }
  }

  const cities = parseCities(searchParams.get("cities"));
  if (cities) d.cities = cities;

  return d;
}

function sortedCities(cities: CityKey[]): CityKey[] {
  return [...cities].sort((a, b) => a.localeCompare(b));
}

/**
 * Canonical query string (sorted keys, stable city order) without leading "?".
 */
export function serializeJapanTripBudgetCalculatorQuery(
  form: JapanTripBudgetCalculatorForm,
): string {
  const cities = sortedCities(form.cities).join(",");
  const params = new URLSearchParams();
  params.set("budgetStyle", form.budgetStyle);
  params.set("cities", cities);
  params.set("conbiniRatio", String(roundConbiniStep(form.conbiniMealsPercent)));
  params.set("days", String(clampInt(form.days, 3, 21)));
  params.set("hotelType", form.hotelType);
  params.set("shoppingLevel", form.shoppingLevel);
  params.set("transportStyle", form.transportStyle);
  params.set("travelers", String(clampInt(form.travelers, 1, 6)));
  return params.toString();
}

export function normalizeJapanTripBudgetCalculatorQueryString(
  raw: string,
): string {
  const sp = new URLSearchParams(raw.startsWith("?") ? raw.slice(1) : raw);
  return serializeJapanTripBudgetCalculatorQuery(
    parseJapanTripBudgetCalculatorSearchParams(sp),
  );
}

export function japanTripBudgetCalculatorFormsEqual(
  a: JapanTripBudgetCalculatorForm,
  b: JapanTripBudgetCalculatorForm,
): boolean {
  if (a.days !== b.days) return false;
  if (a.travelers !== b.travelers) return false;
  if (a.budgetStyle !== b.budgetStyle) return false;
  if (a.transportStyle !== b.transportStyle) return false;
  if (a.shoppingLevel !== b.shoppingLevel) return false;
  if (a.hotelType !== b.hotelType) return false;
  if (a.conbiniMealsPercent !== b.conbiniMealsPercent) return false;
  if (a.cities.length !== b.cities.length) return false;
  const ac = sortedCities(a.cities).join(",");
  const bc = sortedCities(b.cities).join(",");
  return ac === bc;
}
