/**
 * Heuristic 2026 Japan trip cost estimates for the budget calculator.
 * Not a quote. Rounded to sensible yen for display.
 */

export type BudgetStyle = "budget" | "mid-range" | "comfortable" | "premium";

export type CityKey = "tokyo" | "osaka" | "kyoto" | "rural";

export type TransportStyle =
  | "mostly-local"
  | "frequent-shinkansen"
  | "taxi-heavy";

export type ShoppingLevel = "minimal" | "moderate" | "heavy";

export type HotelType = "hostel" | "business" | "mid-range" | "luxury";

export type JapanTripBudgetInput = {
  days: number;
  travelers: number;
  budgetStyle: BudgetStyle;
  cities: CityKey[];
  transportStyle: TransportStyle;
  shoppingLevel: ShoppingLevel;
  /** 0 = all restaurant style meals, 100 = mostly convenience store meals */
  conbiniMealsPercent: number;
  hotelType: HotelType;
};

export type JapanTripBudgetBreakdown = {
  hotelYen: number;
  foodYen: number;
  transportYen: number;
  shoppingYen: number;
  subtotalYen: number;
  emergencyBufferYen: number;
  totalYen: number;
  dailyAverageYen: number;
  suggestedCashYen: number;
};

const CITY_MULT: Record<CityKey, number> = {
  tokyo: 1.07,
  osaka: 0.97,
  kyoto: 1.05,
  rural: 0.9,
};

/** One hotel room per night (yen), before city multiplier. */
const ROOM_RATE: Record<
  HotelType,
  Record<BudgetStyle, number>
> = {
  hostel: {
    budget: 7200,
    "mid-range": 8800,
    comfortable: 10500,
    premium: 13500,
  },
  business: {
    budget: 11800,
    "mid-range": 14200,
    comfortable: 17200,
    premium: 21500,
  },
  "mid-range": {
    budget: 16800,
    "mid-range": 20500,
    comfortable: 26500,
    premium: 34500,
  },
  luxury: {
    budget: 38000,
    "mid-range": 48000,
    comfortable: 68000,
    premium: 105000,
  },
};

const RESTAURANT_DAY: Record<BudgetStyle, number> = {
  budget: 4800,
  "mid-range": 6800,
  comfortable: 9500,
  premium: 13500,
};

const CONBINI_DAY: Record<BudgetStyle, number> = {
  budget: 2300,
  "mid-range": 2900,
  comfortable: 3600,
  premium: 4400,
};

function averageCityMultiplier(cities: CityKey[]): number {
  if (cities.length === 0) return 1;
  let sum = 0;
  for (const c of cities) {
    sum += CITY_MULT[c];
  }
  return sum / cities.length;
}

function roomsNeeded(travelers: number): number {
  return Math.max(1, Math.ceil(travelers / 2));
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export function computeJapanTripBudget(
  input: JapanTripBudgetInput,
): JapanTripBudgetBreakdown {
  const days = clamp(Math.round(input.days), 1, 30);
  const travelers = clamp(Math.round(input.travelers), 1, 8);
  const cityMult = averageCityMultiplier(
    input.cities.length ? input.cities : (["tokyo"] as CityKey[]),
  );
  const style = input.budgetStyle;
  const conbiniP = clamp(input.conbiniMealsPercent, 0, 100) / 100;
  const restaurantP = 1 - conbiniP;

  const roomNight = ROOM_RATE[input.hotelType][style];
  const rooms = roomsNeeded(travelers);
  const hotelYen = Math.round(days * rooms * roomNight * cityMult);

  const foodPerPersonDay =
    restaurantP * RESTAURANT_DAY[style] + conbiniP * CONBINI_DAY[style];
  const foodYen = Math.round(days * travelers * foodPerPersonDay * cityMult);

  let transportYen = 0;
  switch (input.transportStyle) {
    case "mostly-local":
      transportYen = Math.round(
        1800 * days * travelers * (0.85 + 0.08 * cityMult),
      );
      break;
    case "frequent-shinkansen": {
      const longLegs = Math.max(1, Math.floor((days - 1) / 4) + 1);
      transportYen = Math.round(
        18500 * longLegs * travelers * 0.72 + 1400 * days * travelers,
      );
      break;
    }
    case "taxi-heavy":
      transportYen = Math.round(6200 * days * travelers);
      break;
    default:
      transportYen = 0;
  }

  const tripWeight = Math.sqrt(days / 7);
  let shoppingYen = 0;
  switch (input.shoppingLevel) {
    case "minimal":
      shoppingYen = Math.round(9000 * (1 + 0.18 * (travelers - 1)));
      break;
    case "moderate":
      shoppingYen = Math.round(
        38000 * tripWeight * (1 + 0.22 * (travelers - 1)),
      );
      break;
    case "heavy":
      shoppingYen = Math.round(
        95000 * tripWeight * (1 + 0.28 * (travelers - 1)),
      );
      break;
    default:
      shoppingYen = 0;
  }

  const subtotalYen = hotelYen + foodYen + transportYen + shoppingYen;
  const emergencyBufferYen = Math.round(subtotalYen * 0.12);
  const totalYen = subtotalYen + emergencyBufferYen;
  const dailyAverageYen = Math.round(totalYen / days);

  const suggestedCashYen = Math.round(
    clamp(
      foodYen * 0.28 + shoppingYen * 0.12 + emergencyBufferYen * 0.55,
      28000,
      130000,
    ),
  );

  return {
    hotelYen,
    foodYen,
    transportYen,
    shoppingYen,
    subtotalYen,
    emergencyBufferYen,
    totalYen,
    dailyAverageYen,
    suggestedCashYen,
  };
}

export function formatYenJpy(value: number): string {
  return new Intl.NumberFormat("en-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(value);
}
