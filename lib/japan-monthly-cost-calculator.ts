/**
 * Heuristic monthly resident cost bands for Japan (2026 style planning).
 * Not a quote or tax advice. Rounded for display.
 */

export type JapanCityType =
  | "tokyo-central"
  | "tokyo-suburbs"
  | "osaka-kyoto"
  | "regional"
  | "rural";

export type JapanHousehold = "single" | "couple" | "family-child";

export type JapanHousing =
  | "share-house"
  | "1k-studio"
  | "1ldk"
  | "2ldk-plus";

export type JapanResidentLifestyle = "frugal" | "normal" | "comfortable";

export type JapanCommute =
  | "walk-bike"
  | "local-train"
  | "long-commute"
  | "car";

export type JapanEatingStyle = "mostly-cook" | "mixed" | "eat-out-often";

export type JapanMonthlyCostForm = {
  cityType: JapanCityType;
  household: JapanHousehold;
  housing: JapanHousing;
  lifestyle: JapanResidentLifestyle;
  commute: JapanCommute;
  eatingStyle: JapanEatingStyle;
  addonMobile: boolean;
  addonInternet: boolean;
  addonInsurance: boolean;
  addonSchool: boolean;
  addonCarParking: boolean;
};

export const JAPAN_MONTHLY_COST_DEFAULTS: JapanMonthlyCostForm = {
  cityType: "tokyo-suburbs",
  household: "single",
  housing: "1k-studio",
  lifestyle: "normal",
  commute: "local-train",
  eatingStyle: "mixed",
  addonMobile: true,
  addonInternet: true,
  addonInsurance: false,
  addonSchool: false,
  addonCarParking: false,
};

export type JapanMonthlyCostBreakdown = {
  rentYen: number;
  foodYen: number;
  utilitiesYen: number;
  transportYen: number;
  phoneYen: number;
  internetYen: number;
  insurancePensionYen: number;
  schoolChildcareYen: number;
  lifestyleBufferYen: number;
  /** Included inside transport when relevant (parking, extra car upkeep). */
  transportParkingExtraYen: number;
  totalMonthlyYen: number;
  moveInWarningYen: number;
  emergencySavingsTargetYen: number;
  /** Short reminder when insurance is not modeled in yen. */
  insuranceReminderNote: string;
};

const CITY_SET = new Set<JapanCityType>([
  "tokyo-central",
  "tokyo-suburbs",
  "osaka-kyoto",
  "regional",
  "rural",
]);

const HOUSEHOLD_SET = new Set<JapanHousehold>([
  "single",
  "couple",
  "family-child",
]);

const HOUSING_SET = new Set<JapanHousing>([
  "share-house",
  "1k-studio",
  "1ldk",
  "2ldk-plus",
]);

const LIFESTYLE_SET = new Set<JapanResidentLifestyle>([
  "frugal",
  "normal",
  "comfortable",
]);

const COMMUTE_SET = new Set<JapanCommute>([
  "walk-bike",
  "local-train",
  "long-commute",
  "car",
]);

const EATING_SET = new Set<JapanEatingStyle>([
  "mostly-cook",
  "mixed",
  "eat-out-often",
]);

/** Base rent for 1K / studio, single, normal market pressure, yen. */
const RENT_BASE_BY_CITY: Record<JapanCityType, number> = {
  "tokyo-central": 168000,
  "tokyo-suburbs": 108000,
  "osaka-kyoto": 90000,
  regional: 64000,
  rural: 44000,
};

const HOUSING_RENT_MULT: Record<JapanHousing, number> = {
  "share-house": 0.5,
  "1k-studio": 1,
  "1ldk": 1.4,
  "2ldk-plus": 1.82,
};

const HOUSEHOLD_RENT_MULT: Record<JapanHousehold, number> = {
  single: 1,
  couple: 1.08,
  "family-child": 1.26,
};

const HOUSEHOLD_FOOD_MULT: Record<JapanHousehold, number> = {
  single: 1,
  couple: 1.72,
  "family-child": 2.15,
};

const HOUSEHOLD_UTIL_MULT: Record<JapanHousehold, number> = {
  single: 1,
  couple: 1.14,
  "family-child": 1.26,
};

const CITY_COST_MULT: Record<JapanCityType, number> = {
  "tokyo-central": 1.06,
  "tokyo-suburbs": 1,
  "osaka-kyoto": 0.94,
  regional: 0.88,
  rural: 0.84,
};

const UTIL_BY_HOUSING: Record<JapanHousing, number> = {
  "share-house": 7800,
  "1k-studio": 11800,
  "1ldk": 15200,
  "2ldk-plus": 20500,
};

const COMMUTE_BASE: Record<JapanCommute, number> = {
  "walk-bike": 4200,
  "local-train": 11200,
  "long-commute": 20500,
  car: 30500,
};

const EATING_FOOD_MULT: Record<JapanEatingStyle, number> = {
  "mostly-cook": 0.8,
  mixed: 1,
  "eat-out-often": 1.46,
};

const LIFESTYLE_FOOD_MULT: Record<JapanResidentLifestyle, number> = {
  frugal: 0.88,
  normal: 1,
  comfortable: 1.12,
};

const LIFESTYLE_TRANSPORT_MULT: Record<JapanResidentLifestyle, number> = {
  frugal: 0.9,
  normal: 1,
  comfortable: 1.08,
};

const LIFESTYLE_BUFFER: Record<JapanResidentLifestyle, number> = {
  frugal: 5000,
  normal: 15000,
  comfortable: 29000,
};

const BASE_FOOD_SINGLE = 47000;

function roundYen(n: number): number {
  return Math.round(n / 500) * 500;
}

export function formatYenJpy(value: number): string {
  return new Intl.NumberFormat("en-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(value);
}

export function computeJapanMonthlyCost(
  form: JapanMonthlyCostForm,
): JapanMonthlyCostBreakdown {
  const rentRaw =
    RENT_BASE_BY_CITY[form.cityType] *
    HOUSING_RENT_MULT[form.housing] *
    HOUSEHOLD_RENT_MULT[form.household];
  const rentYen = roundYen(rentRaw);

  const foodRaw =
    BASE_FOOD_SINGLE *
    HOUSEHOLD_FOOD_MULT[form.household] *
    EATING_FOOD_MULT[form.eatingStyle] *
    LIFESTYLE_FOOD_MULT[form.lifestyle] *
    CITY_COST_MULT[form.cityType];
  const foodYen = roundYen(foodRaw);

  const utilRaw =
    UTIL_BY_HOUSING[form.housing] *
    HOUSEHOLD_UTIL_MULT[form.household] *
    CITY_COST_MULT[form.cityType];
  const utilitiesYen = roundYen(utilRaw);

  let transportParkingExtraYen = 0;
  if (form.addonCarParking) {
    transportParkingExtraYen =
      form.commute === "car" ? 16000 : 22000;
  }

  const transportRaw =
    COMMUTE_BASE[form.commute] *
    LIFESTYLE_TRANSPORT_MULT[form.lifestyle] *
    HOUSEHOLD_UTIL_MULT[form.household] +
    transportParkingExtraYen;
  const transportYen = roundYen(transportRaw);

  const phoneYen = form.addonMobile ? roundYen(7800) : 0;
  const internetYen = form.addonInternet ? roundYen(5400) : 0;

  const insurancePensionYen = form.addonInsurance ? roundYen(31000) : 0;
  const schoolChildcareYen = form.addonSchool ? roundYen(39000) : 0;

  const lifestyleBufferYen = roundYen(LIFESTYLE_BUFFER[form.lifestyle]);

  const insuranceReminderNote = form.addonInsurance
    ? "Rough national-style health plus pension band for planning. Employee social insurance, dependents, and municipality notices change the real number."
    : "Not included in your total: health insurance and pension depend on visa, employer, and city hall rules. Budget them separately after you know your category.";

  const totalMonthlyYen =
    rentYen +
    foodYen +
    utilitiesYen +
    transportYen +
    phoneYen +
    internetYen +
    insurancePensionYen +
    schoolChildcareYen +
    lifestyleBufferYen;

  const moveInWarningYen = roundYen(rentYen * 3.8 + 95000);

  const emergencyMonths =
    form.household === "single" ? 3.5 : form.household === "couple" ? 4.5 : 5.5;
  const emergencySavingsTargetYen = roundYen(
    totalMonthlyYen * emergencyMonths,
  );

  return {
    rentYen,
    foodYen,
    utilitiesYen,
    transportYen,
    phoneYen,
    internetYen,
    insurancePensionYen,
    schoolChildcareYen,
    lifestyleBufferYen,
    transportParkingExtraYen,
    totalMonthlyYen,
    moveInWarningYen,
    emergencySavingsTargetYen,
    insuranceReminderNote,
  };
}

function parseBool(raw: string | null, fallback: boolean): boolean {
  if (raw == null || raw === "") return fallback;
  const v = raw.trim().toLowerCase();
  if (v === "1" || v === "true" || v === "yes") return true;
  if (v === "0" || v === "false" || v === "no") return false;
  return fallback;
}

export function parseJapanMonthlyCostSearchParams(
  searchParams: URLSearchParams,
): JapanMonthlyCostForm {
  const d = { ...JAPAN_MONTHLY_COST_DEFAULTS };

  const city = searchParams.get("city");
  if (city && CITY_SET.has(city as JapanCityType)) {
    d.cityType = city as JapanCityType;
  }

  const hh = searchParams.get("hh");
  if (hh && HOUSEHOLD_SET.has(hh as JapanHousehold)) {
    d.household = hh as JapanHousehold;
  }

  const housing = searchParams.get("housing");
  if (housing && HOUSING_SET.has(housing as JapanHousing)) {
    d.housing = housing as JapanHousing;
  }

  const life = searchParams.get("life");
  if (life && LIFESTYLE_SET.has(life as JapanResidentLifestyle)) {
    d.lifestyle = life as JapanResidentLifestyle;
  }

  const commute = searchParams.get("commute");
  if (commute && COMMUTE_SET.has(commute as JapanCommute)) {
    d.commute = commute as JapanCommute;
  }

  const eat = searchParams.get("eat");
  if (eat && EATING_SET.has(eat as JapanEatingStyle)) {
    d.eatingStyle = eat as JapanEatingStyle;
  }

  d.addonMobile = parseBool(searchParams.get("mob"), d.addonMobile);
  d.addonInternet = parseBool(searchParams.get("net"), d.addonInternet);
  d.addonInsurance = parseBool(searchParams.get("hi"), d.addonInsurance);
  d.addonSchool = parseBool(searchParams.get("sch"), d.addonSchool);
  d.addonCarParking = parseBool(searchParams.get("park"), d.addonCarParking);

  return d;
}

export function serializeJapanMonthlyCostQuery(form: JapanMonthlyCostForm): string {
  const p = new URLSearchParams();
  p.set("city", form.cityType);
  p.set("hh", form.household);
  p.set("housing", form.housing);
  p.set("life", form.lifestyle);
  p.set("commute", form.commute);
  p.set("eat", form.eatingStyle);
  p.set("mob", form.addonMobile ? "1" : "0");
  p.set("net", form.addonInternet ? "1" : "0");
  p.set("hi", form.addonInsurance ? "1" : "0");
  p.set("sch", form.addonSchool ? "1" : "0");
  p.set("park", form.addonCarParking ? "1" : "0");
  return p.toString();
}

export function normalizeJapanMonthlyCostQueryString(query: string): string {
  return serializeJapanMonthlyCostQuery(
    parseJapanMonthlyCostSearchParams(new URLSearchParams(query)),
  );
}

export function japanMonthlyCostFormsEqual(
  a: JapanMonthlyCostForm,
  b: JapanMonthlyCostForm,
): boolean {
  return (
    a.cityType === b.cityType &&
    a.household === b.household &&
    a.housing === b.housing &&
    a.lifestyle === b.lifestyle &&
    a.commute === b.commute &&
    a.eatingStyle === b.eatingStyle &&
    a.addonMobile === b.addonMobile &&
    a.addonInternet === b.addonInternet &&
    a.addonInsurance === b.addonInsurance &&
    a.addonSchool === b.addonSchool &&
    a.addonCarParking === b.addonCarParking
  );
}

export function buildJapanMonthlyCostSummaryText(
  form: JapanMonthlyCostForm,
  breakdown: JapanMonthlyCostBreakdown,
  labels: {
    city: string;
    household: string;
    housing: string;
    lifestyle: string;
    commute: string;
    eating: string;
  },
): string {
  const lines = [
    "Japan Monthly Cost Calculator (resident estimate)",
    "",
    `City type: ${labels.city}`,
    `Household: ${labels.household}`,
    `Housing: ${labels.housing}`,
    `Lifestyle: ${labels.lifestyle}`,
    `Commute: ${labels.commute}`,
    `Eating style: ${labels.eating}`,
    `Add-ons: mobile ${form.addonMobile ? "yes" : "no"}, internet ${
      form.addonInternet ? "yes" : "no"
    }, health/pension modeled ${form.addonInsurance ? "yes" : "no"}, school/childcare ${
      form.addonSchool ? "yes" : "no"
    }, car parking/maintenance ${form.addonCarParking ? "yes" : "no"}`,
    "",
    `Estimated monthly total: ${formatYenJpy(breakdown.totalMonthlyYen)}`,
    "",
    `Rent: ${formatYenJpy(breakdown.rentYen)}`,
    `Food: ${formatYenJpy(breakdown.foodYen)}`,
    `Utilities: ${formatYenJpy(breakdown.utilitiesYen)}`,
    `Transport (includes parking add-on if selected): ${formatYenJpy(
      breakdown.transportYen,
    )}`,
    `Mobile phone: ${formatYenJpy(breakdown.phoneYen)}`,
    `Home internet: ${formatYenJpy(breakdown.internetYen)}`,
    `Health insurance / pension (if modeled): ${formatYenJpy(
      breakdown.insurancePensionYen,
    )}`,
    `School / childcare buffer (if on): ${formatYenJpy(
      breakdown.schoolChildcareYen,
    )}`,
    `Lifestyle buffer: ${formatYenJpy(breakdown.lifestyleBufferYen)}`,
    "",
    `Insurance note: ${breakdown.insuranceReminderNote}`,
    "",
    `Move-in cash warning (one-time band): about ${formatYenJpy(
      breakdown.moveInWarningYen,
    )} on top of first month rent, not monthly.`,
    `Suggested emergency savings target: ${formatYenJpy(
      breakdown.emergencySavingsTargetYen,
    )}`,
  ];
  return lines.join("\n");
}
