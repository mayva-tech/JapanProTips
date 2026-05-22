import type { GenerateItineraryRequest } from "@/types/itinerary-api";
import type {
  GeneratedItinerary,
  ItineraryDay,
  ItineraryStop,
  ItineraryTheme,
  ItineraryTransportLeg,
  ItineraryTransportMode,
  StartCity,
  TravelPace,
} from "@/types/itinerary";
import {
  buildDefaultItineraryTitle,
  buildDeterministicStopId,
  buildItineraryId,
  buildItinerarySlug,
} from "@/lib/itinerary/itinerary-identifiers";
import { STOPS_PER_PACE } from "@/lib/itinerary/itinerary-pace";
import { normalizeTransportLeg } from "@/lib/itinerary/transport-leg";

type TemplateTransportMode = ItineraryTransportMode | "tram";

type StopTemplate = {
  name: string;
  description: string;
  estimatedTime: string;
  durationMinutes: number;
  transportMode: TemplateTransportMode;
  transportMinutes: number;
  transportNote: string;
};

function stopCategory(theme: ItineraryTheme): string {
  switch (theme) {
    case "food":
      return "meal";
    case "temples":
      return "temple";
    case "anime":
      return "anime";
    case "shopping":
      return "shopping";
    case "photography":
      return "photo_spot";
    default:
      return "sightseeing";
  }
}

const CITY_PATHS: Record<StartCity, string[]> = {
  Tokyo: ["Tokyo", "Tokyo", "Kyoto", "Kyoto", "Osaka", "Osaka", "Tokyo", "Tokyo", "Hiroshima", "Hiroshima", "Tokyo", "Tokyo", "Kyoto", "Kyoto"],
  Osaka: ["Osaka", "Osaka", "Kyoto", "Kyoto", "Nara", "Osaka", "Osaka", "Hiroshima", "Hiroshima", "Osaka", "Kyoto", "Kyoto", "Osaka", "Osaka"],
  Kyoto: ["Kyoto", "Kyoto", "Nara", "Kyoto", "Osaka", "Osaka", "Kyoto", "Kyoto", "Tokyo", "Tokyo", "Kyoto", "Kyoto", "Osaka", "Kyoto"],
  Hiroshima: ["Hiroshima", "Hiroshima", "Miyajima", "Hiroshima", "Osaka", "Kyoto", "Kyoto", "Tokyo", "Tokyo", "Hiroshima", "Hiroshima", "Osaka", "Kyoto", "Hiroshima"],
  Sapporo: ["Sapporo", "Sapporo", "Otaru", "Sapporo", "Sapporo", "Tokyo", "Tokyo", "Kyoto", "Kyoto", "Sapporo", "Sapporo", "Otaru", "Sapporo", "Sapporo"],
  Fukuoka: ["Fukuoka", "Fukuoka", "Dazaifu", "Fukuoka", "Nagasaki", "Fukuoka", "Osaka", "Kyoto", "Kyoto", "Fukuoka", "Fukuoka", "Dazaifu", "Fukuoka", "Fukuoka"],
};

/** Normalize path entries to allowed StartCity values. */
const REGION_TO_CITY: Record<string, StartCity> = {
  Nara: "Kyoto",
  Miyajima: "Hiroshima",
  Otaru: "Sapporo",
  Dazaifu: "Fukuoka",
  Nagasaki: "Fukuoka",
};

function resolveCity(name: string, fallback: StartCity): StartCity {
  if (name in CITY_PATHS) return name as StartCity;
  return REGION_TO_CITY[name] ?? fallback;
}

function cityForDay(startCity: StartCity, dayNumber: number): StartCity {
  const path = CITY_PATHS[startCity];
  const raw = path[(dayNumber - 1) % path.length];
  return resolveCity(raw, startCity);
}

const THEME_STOPS: Record<
  ItineraryTheme,
  Record<StartCity, StopTemplate[]>
> = {
  food: {
    Tokyo: [
      { name: "Tsukiji Outer Market breakfast walk", description: "Grab tamagoyaki, grilled seafood, and coffee before crowds peak.", estimatedTime: "8:00", durationMinutes: 90, transportMode: "subway", transportMinutes: 20, transportNote: "Ginza Line toward central Tokyo" },
      { name: "Depachika tasting loop", description: "Sample bentos and sweets in a department store basement food hall.", estimatedTime: "11:00", durationMinutes: 75, transportMode: "walk", transportMinutes: 12, transportNote: "Short walk to lunch neighborhood" },
      { name: "Ramen lunch in Shinjuku", description: "Pick a shop with ticket machine ordering and counter seating.", estimatedTime: "13:00", durationMinutes: 60, transportMode: "train", transportMinutes: 25, transportNote: "JR or subway toward evening area" },
      { name: "Kissaten coffee break", description: "Old-school café for pour-over and a light snack.", estimatedTime: "16:00", durationMinutes: 45, transportMode: "walk", transportMinutes: 10, transportNote: "Stroll to dinner streets" },
      { name: "Yakitori alley dinner", description: "Small plates and grilled skewers; cash-friendly counters.", estimatedTime: "19:00", durationMinutes: 90, transportMode: "subway", transportMinutes: 15, transportNote: "Return train toward hotel" },
    ],
    Osaka: [
      { name: "Kuromon Market morning", description: "Seafood skewers, fruit, and street snacks.", estimatedTime: "8:30", durationMinutes: 90, transportMode: "walk", transportMinutes: 15, transportNote: "Walk toward Dotonbori" },
      { name: "Okonomiyaki lunch", description: "Share a savory pancake at a local shop.", estimatedTime: "12:00", durationMinutes: 75, transportMode: "subway", transportMinutes: 20, transportNote: "Metro toward Umeda" },
      { name: "Takoyaki snack stop", description: "Standing counter bites between neighborhoods.", estimatedTime: "15:00", durationMinutes: 40, transportMode: "train", transportMinutes: 30, transportNote: "Short hop if pairing with Kyoto" },
      { name: "Kushikatsu dinner strip", description: "Fried skewers with sauce rules posted at the table.", estimatedTime: "18:30", durationMinutes: 90, transportMode: "walk", transportMinutes: 12, transportNote: "Evening walk back" },
      { name: "Late konbini tasting", description: "Onigiri, pudding, and seasonal snacks for comparison.", estimatedTime: "21:00", durationMinutes: 30, transportMode: "walk", transportMinutes: 8, transportNote: "Return to stay" },
    ],
    Kyoto: [
      { name: "Nishiki Market morning", description: "Pickles, mochi, and small bites along the covered arcade.", estimatedTime: "9:00", durationMinutes: 90, transportMode: "bus", transportMinutes: 20, transportNote: "City bus toward lunch area" },
      { name: "Matcha sweets stop", description: "Parfait or soft serve near a temple district.", estimatedTime: "12:00", durationMinutes: 60, transportMode: "walk", transportMinutes: 15, transportNote: "Walk through back streets" },
      { name: "Obanzai-style lunch", description: "Home-style Kyoto side dishes with rice.", estimatedTime: "13:30", durationMinutes: 75, transportMode: "bus", transportMinutes: 25, transportNote: "Bus toward Gion area" },
      { name: "Tea house break", description: "Light wagashi set if reservations allow.", estimatedTime: "16:00", durationMinutes: 50, transportMode: "walk", transportMinutes: 10, transportNote: "Stroll to dinner" },
      { name: "Pontocho alley dinner", description: "River-side lanes with small restaurants.", estimatedTime: "19:00", durationMinutes: 90, transportMode: "walk", transportMinutes: 12, transportNote: "Walk back to hotel" },
    ],
    Hiroshima: [
      { name: "Hiroshima-style okonomiyaki", description: "Layered noodle version at a local counter.", estimatedTime: "11:30", durationMinutes: 75, transportMode: "tram", transportMinutes: 25, transportNote: "Tram toward Peace Park area" },
      { name: "Oysters or seafood lunch", description: "Setagaya riverside grills when in season.", estimatedTime: "13:30", durationMinutes: 70, transportMode: "train", transportMinutes: 35, transportNote: "Ferry area if Miyajima day" },
      { name: "Momiji manju tasting", description: "Maple-leaf cakes from different bakeries.", estimatedTime: "16:00", durationMinutes: 45, transportMode: "walk", transportMinutes: 10, transportNote: "Walk between shops" },
      { name: "Izakaya small plates", description: "Share dishes with local beer or highball.", estimatedTime: "18:30", durationMinutes: 90, transportMode: "tram", transportMinutes: 20, transportNote: "Tram to hotel zone" },
      { name: "Station ekiben preview", description: "Compare boxed lunches for tomorrow's train.", estimatedTime: "20:30", durationMinutes: 30, transportMode: "walk", transportMinutes: 8, transportNote: "Return to stay" },
    ],
    Sapporo: [
      { name: "Nijo Market breakfast", description: "Seafood rice bowls and soup.", estimatedTime: "8:30", durationMinutes: 80, transportMode: "subway", transportMinutes: 18, transportNote: "Subway toward Odori" },
      { name: "Soup curry lunch", description: "Spiced broth with vegetables and rice.", estimatedTime: "12:00", durationMinutes: 70, transportMode: "walk", transportMinutes: 12, transportNote: "Walk to park area" },
      { name: "Soft serve and dairy stop", description: "Hokkaido milk desserts.", estimatedTime: "15:00", durationMinutes: 40, transportMode: "subway", transportMinutes: 22, transportNote: "Toward Susukino" },
      { name: "Genghis Khan dinner", description: "Grilled lamb at a beer hall.", estimatedTime: "18:30", durationMinutes: 90, transportMode: "walk", transportMinutes: 10, transportNote: "Evening walk back" },
      { name: "Conbini Hokkaido snacks", description: "Dairy desserts and local chips.", estimatedTime: "21:00", durationMinutes: 30, transportMode: "walk", transportMinutes: 8, transportNote: "Return to stay" },
    ],
    Fukuoka: [
      { name: "Yatai breakfast ramen", description: "Early bowl before stalls open for dinner.", estimatedTime: "8:00", durationMinutes: 60, transportMode: "subway", transportMinutes: 15, transportNote: "Toward Tenjin" },
      { name: "Hakata ramen lunch", description: "Tonkotsu shop with kaedama option.", estimatedTime: "12:00", durationMinutes: 65, transportMode: "walk", transportMinutes: 12, transportNote: "Walk to shopping street" },
      { name: "Mentaiko and motsunabe tasting", description: "Kyushu specialties at a mid-range izakaya.", estimatedTime: "17:00", durationMinutes: 80, transportMode: "subway", transportMinutes: 18, transportNote: "Toward Nakasu" },
      { name: "Yatai street dinner", description: "Stool seating along the river stalls.", estimatedTime: "19:30", durationMinutes: 90, transportMode: "walk", transportMinutes: 10, transportNote: "Stroll to hotel" },
      { name: "Mizutaki or udon night cap", description: "Light second dinner if energy allows.", estimatedTime: "21:30", durationMinutes: 45, transportMode: "walk", transportMinutes: 8, transportNote: "Return to stay" },
    ],
  },
  temples: {
    Tokyo: [
      { name: "Senso-ji early visit", description: "Main hall and Nakamise before tour buses peak.", estimatedTime: "7:30", durationMinutes: 90, transportMode: "subway", transportMinutes: 25, transportNote: "Toward Meiji area" },
      { name: "Meiji Shrine forest walk", description: "Torii paths and quiet cedar lanes.", estimatedTime: "10:30", durationMinutes: 75, transportMode: "train", transportMinutes: 20, transportNote: "JR toward Nezu" },
      { name: "Nezu Shrine azalea lanes", description: "Smaller grounds with photogenic gates.", estimatedTime: "13:00", durationMinutes: 60, transportMode: "walk", transportMinutes: 15, transportNote: "Walk to lunch" },
      { name: "Zojo-ji temple view", description: "Tokyo Tower backdrop from temple grounds.", estimatedTime: "16:00", durationMinutes: 50, transportMode: "subway", transportMinutes: 18, transportNote: "Return toward stay" },
      { name: "Evening meditation or closing bell", description: "Check last entry times; stay respectful.", estimatedTime: "17:30", durationMinutes: 45, transportMode: "walk", transportMinutes: 10, transportNote: "Walk to dinner" },
    ],
    Osaka: [
      { name: "Shitennoji morning", description: "One of Japan's oldest temple complexes.", estimatedTime: "9:00", durationMinutes: 80, transportMode: "subway", transportMinutes: 22, transportNote: "Toward Sumiyoshi" },
      { name: "Sumiyoshi Taisha visit", description: "Distinct bridge and shrine architecture.", estimatedTime: "11:30", durationMinutes: 75, transportMode: "train", transportMinutes: 35, transportNote: "Train if Kyoto day next" },
      { name: "Hozenji Temple alley", description: "Moss-covered statue lane near Dotonbori.", estimatedTime: "15:00", durationMinutes: 45, transportMode: "walk", transportMinutes: 12, transportNote: "Evening stroll" },
      { name: "Isshinji bronze gate", description: "Unique bone-pagoda story; quiet afternoons.", estimatedTime: "16:30", durationMinutes: 50, transportMode: "subway", transportMinutes: 15, transportNote: "Subway to hotel" },
      { name: "Temple town dinner break", description: "Simple set meal near shrine district.", estimatedTime: "18:30", durationMinutes: 75, transportMode: "walk", transportMinutes: 8, transportNote: "Return to stay" },
    ],
    Kyoto: [
      { name: "Fushimi Inari early torii hike", description: "Go partway up before midday heat.", estimatedTime: "7:00", durationMinutes: 120, transportMode: "train", transportMinutes: 25, transportNote: "Toward Kiyomizu area" },
      { name: "Kiyomizu-dera and slopes", description: "Wooden stage views; one-way downhill walk.", estimatedTime: "11:00", durationMinutes: 90, transportMode: "bus", transportMinutes: 25, transportNote: "Bus to Arashiyama or central" },
      { name: "Ryoan-ji rock garden", description: "Quiet viewing; read temple rules.", estimatedTime: "14:30", durationMinutes: 60, transportMode: "train", transportMinutes: 30, transportNote: "Randen or bus" },
      { name: "Ginkaku-ji silver pavilion path", description: "Philosopher's Path if time allows.", estimatedTime: "16:30", durationMinutes: 75, transportMode: "walk", transportMinutes: 15, transportNote: "Walk toward Gion" },
      { name: "Yasaka Shrine evening lanterns", description: "Gion edge; respectful photos only.", estimatedTime: "18:30", durationMinutes: 60, transportMode: "walk", transportMinutes: 12, transportNote: "Return to stay" },
    ],
    Hiroshima: [
      { name: "Peace Memorial Park reflection", description: "Museum time box; pace emotionally.", estimatedTime: "9:00", durationMinutes: 120, transportMode: "tram", transportMinutes: 40, transportNote: "Tram and ferry toward Miyajima" },
      { name: "Itsukushima Shrine tide check", description: "Verify high tide times for floating torii.", estimatedTime: "14:00", durationMinutes: 90, transportMode: "walk", transportMinutes: 20, transportNote: "Island village walk" },
      { name: "Daisho-in temple steps", description: "Less crowded alternative with sand mandala.", estimatedTime: "16:30", durationMinutes: 70, transportMode: "train", transportMinutes: 35, transportNote: "Ferry and tram back" },
      { name: "Mitaki-dera forest temple", description: "Waterfall and moss if energy remains.", estimatedTime: "17:30", durationMinutes: 55, transportMode: "tram", transportMinutes: 20, transportNote: "Tram to city" },
      { name: "Quiet shrine night walk", description: "Local neighborhood jinja before closing.", estimatedTime: "19:00", durationMinutes: 45, transportMode: "walk", transportMinutes: 10, transportNote: "Return to stay" },
    ],
    Sapporo: [
      { name: "Hokkaido Shrine morning", description: "Forest paths; snow or greenery by season.", estimatedTime: "9:00", durationMinutes: 75, transportMode: "subway", transportMinutes: 20, transportNote: "Toward central Sapporo" },
      { name: "Otowa Temple stop", description: "Smaller grounds near Maruyama.", estimatedTime: "11:30", durationMinutes: 50, transportMode: "walk", transportMinutes: 15, transportNote: "Walk to park" },
      { name: "Maruyama park shrine gate", description: "Combine with zoo area if families travel.", estimatedTime: "13:30", durationMinutes: 60, transportMode: "train", transportMinutes: 45, transportNote: "Train if Otaru half-day" },
      { name: "Shrine town café break", description: "Matcha and light sweets.", estimatedTime: "16:00", durationMinutes: 45, transportMode: "subway", transportMinutes: 18, transportNote: "Toward Susukino" },
      { name: "Evening temple illumination", description: "Seasonal light-up; check dates.", estimatedTime: "18:00", durationMinutes: 60, transportMode: "walk", transportMinutes: 10, transportNote: "Return to stay" },
    ],
    Fukuoka: [
      { name: "Kushida Shrine morning", description: "Hakata Gion Yamakasa museum nearby.", estimatedTime: "9:00", durationMinutes: 70, transportMode: "subway", transportMinutes: 25, transportNote: "Toward Dazaifu if day trip" },
      { name: "Dazaifu Tenmangu approach", description: "Long sando with sweets shops.", estimatedTime: "12:00", durationMinutes: 90, transportMode: "train", transportMinutes: 40, transportNote: "Nishitetsu return" },
      { name: "Miyajidake or local shrine", description: "Coastal shrine option on Kyushu.", estimatedTime: "15:30", durationMinutes: 65, transportMode: "train", transportMinutes: 35, transportNote: "Return to Fukuoka core" },
      { name: "Tochoji temple pagoda", description: "Large wooden Buddha hall.", estimatedTime: "17:00", durationMinutes: 55, transportMode: "subway", transportMinutes: 15, transportNote: "Toward Nakasu" },
      { name: "River shrine evening stroll", description: "Small grounds near yatai zone.", estimatedTime: "19:00", durationMinutes: 45, transportMode: "walk", transportMinutes: 8, transportNote: "Return to stay" },
    ],
  },
  anime: {
    Tokyo: [
      { name: "Akihabara figure shops", description: "Compare tax-free flags; mind suitcase space.", estimatedTime: "10:00", durationMinutes: 90, transportMode: "train", transportMinutes: 25, transportNote: "Yamanote toward Ikebukuro" },
      { name: "Animate flagship browse", description: "Check floor guides for your series.", estimatedTime: "13:00", durationMinutes: 75, transportMode: "subway", transportMinutes: 20, transportNote: "Toward Nakano" },
      { name: "Nakano Broadway maze", description: "Vintage cards and consignment finds.", estimatedTime: "15:30", durationMinutes: 80, transportMode: "train", transportMinutes: 30, transportNote: "Toward Shibuya" },
      { name: "Shibuya character store", description: "Pokemon Center or similar; expect lines.", estimatedTime: "18:00", durationMinutes: 70, transportMode: "walk", transportMinutes: 12, transportNote: "Evening crossing photos" },
      { name: "Themed café reservation block", description: "Book ahead; set time limit expectations.", estimatedTime: "20:00", durationMinutes: 90, transportMode: "subway", transportMinutes: 18, transportNote: "Return to hotel" },
    ],
    Osaka: [
      { name: "Nipponbashi Den Den Town", description: "Retro games and cosplay shops.", estimatedTime: "10:30", durationMinutes: 90, transportMode: "subway", transportMinutes: 22, transportNote: "Toward Umeda" },
      { name: "Jump Shop or character store", description: "Check branch stock online first.", estimatedTime: "14:00", durationMinutes: 70, transportMode: "train", transportMinutes: 35, transportNote: "If Kyoto anime day" },
      { name: "Gacha and capsule row", description: "Set a coin budget; photos OK.", estimatedTime: "16:00", durationMinutes: 50, transportMode: "walk", transportMinutes: 12, transportNote: "Dotonbori evening" },
      { name: "Collaboration café pop-up", description: "Verify reservation system and ID rules.", estimatedTime: "18:30", durationMinutes: 85, transportMode: "subway", transportMinutes: 15, transportNote: "Return to stay" },
      { name: "Late konbini manga corner", description: "Compare magazine and goods aisles.", estimatedTime: "21:00", durationMinutes: 30, transportMode: "walk", transportMinutes: 8, transportNote: "Walk back" },
    ],
    Kyoto: [
      { name: "Kyoto manga museum", description: "Allow time for reading lounge.", estimatedTime: "10:00", durationMinutes: 90, transportMode: "bus", transportMinutes: 25, transportNote: "Toward Teramachi" },
      { name: "Teramachi character shops", description: "Smaller chains and local goods.", estimatedTime: "13:30", durationMinutes: 75, transportMode: "train", transportMinutes: 40, transportNote: "If Osaka anime afternoon" },
      { name: "Toei Kyoto Studio Park", description: "Half-day if live shows matter to you.", estimatedTime: "9:00", durationMinutes: 180, transportMode: "bus", transportMinutes: 30, transportNote: "Return central Kyoto" },
      { name: "Gion side-street photo walk", description: "Costume photos: be polite, no blocking.", estimatedTime: "17:00", durationMinutes: 60, transportMode: "walk", transportMinutes: 12, transportNote: "Evening meal" },
      { name: "Anime-themed dessert bar", description: "Parfait collaborations when in season.", estimatedTime: "19:30", durationMinutes: 60, transportMode: "walk", transportMinutes: 10, transportNote: "Return to stay" },
    ],
    Hiroshima: [
      { name: "Hiroshima city character shop", description: "Smaller selection; good for postcards.", estimatedTime: "11:00", durationMinutes: 60, transportMode: "tram", transportMinutes: 25, transportNote: "Toward station mall" },
      { name: "Station anime pop-up", description: "Check ekimo mall event boards.", estimatedTime: "14:00", durationMinutes: 70, transportMode: "train", transportMinutes: 35, transportNote: "If Miyajima half-day" },
      { name: "Game center crane games", description: "Set a strict coin limit.", estimatedTime: "16:30", durationMinutes: 55, transportMode: "walk", transportMinutes: 10, transportNote: "Central stroll" },
      { name: "Collaboration goods at conbini", description: "Compare campai sets across chains.", estimatedTime: "18:00", durationMinutes: 40, transportMode: "tram", transportMinutes: 18, transportNote: "Tram to hotel" },
      { name: "Evening figure hunt", description: "Last-minute gifts before trains.", estimatedTime: "20:00", durationMinutes: 45, transportMode: "walk", transportMinutes: 8, transportNote: "Return to stay" },
    ],
    Sapporo: [
      { name: "Sapporo anime shop strip", description: "Smaller but less crowded than Tokyo.", estimatedTime: "11:00", durationMinutes: 80, transportMode: "subway", transportMinutes: 20, transportNote: "Toward Susukino" },
      { name: "Game center and gacha hall", description: "Winter coats need locker planning.", estimatedTime: "14:30", durationMinutes: 70, transportMode: "train", transportMinutes: 45, transportNote: "If Otaru side trip" },
      { name: "Character collaboration café", description: "Seasonal only; verify dates.", estimatedTime: "17:00", durationMinutes: 80, transportMode: "subway", transportMinutes: 18, transportNote: "Susukino evening" },
      { name: "Snow Miku goods hunt when active", description: "Event windows are date-specific.", estimatedTime: "19:00", durationMinutes: 60, transportMode: "walk", transportMinutes: 10, transportNote: "Return to stay" },
      { name: "Late snack and manga konbini", description: "Hokkaido-limited collab prints.", estimatedTime: "21:00", durationMinutes: 30, transportMode: "walk", transportMinutes: 8, transportNote: "Walk back" },
    ],
    Fukuoka: [
      { name: "Canal City character pop-ups", description: "Check mall event calendar.", estimatedTime: "11:00", durationMinutes: 75, transportMode: "subway", transportMinutes: 22, transportNote: "Toward Tenjin" },
      { name: "Tenjin underground anime shops", description: "Cards and figures in basement floors.", estimatedTime: "14:00", durationMinutes: 80, transportMode: "train", transportMinutes: 40, transportNote: "If Dazaifu morning" },
      { name: "Gacha and prize shop loop", description: "Budget coins; watch closing times.", estimatedTime: "16:30", durationMinutes: 55, transportMode: "walk", transportMinutes: 12, transportNote: "Nakasu evening" },
      { name: "Collaboration dessert café", description: "Reserve if popular series.", estimatedTime: "18:30", durationMinutes: 75, transportMode: "walk", transportMinutes: 10, transportNote: "Return to stay" },
      { name: "Station limited goods", description: "Ekiben and character sets for gifts.", estimatedTime: "20:30", durationMinutes: 40, transportMode: "walk", transportMinutes: 8, transportNote: "Walk back" },
    ],
  },
  shopping: {
    Tokyo: [
      { name: "Uniqlo or GU wardrobe stop", description: "Japan-only lines; tax-free counter.", estimatedTime: "10:00", durationMinutes: 75, transportMode: "subway", transportMinutes: 20, transportNote: "Toward Ginza" },
      { name: "Ginza department store", description: "Compare depachika and houseware floors.", estimatedTime: "13:00", durationMinutes: 90, transportMode: "walk", transportMinutes: 15, transportNote: "Walk to Omotesando" },
      { name: "Omotesando and Harajuku streets", description: "Mix flagship and local boutiques.", estimatedTime: "16:00", durationMinutes: 90, transportMode: "train", transportMinutes: 25, transportNote: "Toward Shibuya" },
      { name: "Don Quijote tax-free run", description: "Odd souvenirs; keep receipt sealed.", estimatedTime: "19:00", durationMinutes: 80, transportMode: "subway", transportMinutes: 18, transportNote: "Return to hotel" },
      { name: "Konbini unique snacks haul", description: "Limited flavors for gifts.", estimatedTime: "21:00", durationMinutes: 30, transportMode: "walk", transportMinutes: 8, transportNote: "Walk back" },
    ],
    Osaka: [
      { name: "Shinsaibashi covered arcade", description: "Chain stores and drugstores.", estimatedTime: "10:30", durationMinutes: 90, transportMode: "walk", transportMinutes: 15, transportNote: "Toward Umeda" },
      { name: "Umeda sky building mall", description: "Station complex shopping loop.", estimatedTime: "14:00", durationMinutes: 85, transportMode: "train", transportMinutes: 30, transportNote: "If Kyoto shopping day" },
      { name: "Kuromon adjacent kitchenware", description: "Knives need carry rules if flying.", estimatedTime: "16:00", durationMinutes: 60, transportMode: "subway", transportMinutes: 18, transportNote: "Toward Namba" },
      { name: "Namba discount store", description: "Compare Donki and drugstore prices.", estimatedTime: "18:30", durationMinutes: 75, transportMode: "walk", transportMinutes: 10, transportNote: "Return to stay" },
      { name: "Late tax-free check", description: "Passport and same-day rules.", estimatedTime: "20:30", durationMinutes: 40, transportMode: "walk", transportMinutes: 8, transportNote: "Walk back" },
    ],
    Kyoto: [
      { name: "Kyoto Station Isetan", description: "Depachika gifts and tableware.", estimatedTime: "10:00", durationMinutes: 80, transportMode: "bus", transportMinutes: 25, transportNote: "Toward Teramachi" },
      { name: "Teramachi and Shinkyogoku", description: "Covered shopping for casual goods.", estimatedTime: "13:00", durationMinutes: 90, transportMode: "walk", transportMinutes: 15, transportNote: "Walk to Arashiyama or central" },
      { name: "Arashiyama craft street", description: "Bamboo grove early if combined.", estimatedTime: "15:30", durationMinutes: 85, transportMode: "train", transportMinutes: 35, transportNote: "Return central" },
      { name: "Kyoto ceramic and tea tools", description: "Pack fragile items in carry-on.", estimatedTime: "17:30", durationMinutes: 60, transportMode: "bus", transportMinutes: 20, transportNote: "Bus to Gion" },
      { name: "Evening drugstore restock", description: "Sunscreen and face masks for gifts.", estimatedTime: "19:30", durationMinutes: 45, transportMode: "walk", transportMinutes: 10, transportNote: "Return to stay" },
    ],
    Hiroshima: [
      { name: "Hiroshima station mall", description: "Regional omiyage and kitchen goods.", estimatedTime: "11:00", durationMinutes: 70, transportMode: "tram", transportMinutes: 25, transportNote: "Toward Hondori" },
      { name: "Hondori covered street", description: "Fashion chains and cafes.", estimatedTime: "14:00", durationMinutes: 80, transportMode: "train", transportMinutes: 35, transportNote: "If Miyajima half-day" },
      { name: "Miyajima maple souvenir row", description: "Spatulas and snacks; watch closing ferry.", estimatedTime: "16:00", durationMinutes: 75, transportMode: "train", transportMinutes: 35, transportNote: "Ferry back" },
      { name: "Local craft shop", description: "Small makers near Peace Park area.", estimatedTime: "18:00", durationMinutes: 55, transportMode: "tram", transportMinutes: 18, transportNote: "Tram to hotel" },
      { name: "Conbini gift comparison", description: "Regional KitKat and chips.", estimatedTime: "20:00", durationMinutes: 35, transportMode: "walk", transportMinutes: 8, transportNote: "Return to stay" },
    ],
    Sapporo: [
      { name: "Tanukikoji shopping arcade", description: "Clothing and Hokkaido sweets.", estimatedTime: "11:00", durationMinutes: 85, transportMode: "subway", transportMinutes: 20, transportNote: "Toward factory area" },
      { name: "Sapporo factory outlets", description: "Glass workshops and souvenirs.", estimatedTime: "14:30", durationMinutes: 80, transportMode: "train", transportMinutes: 45, transportNote: "If Otaru day" },
      { name: "Drugstore skincare run", description: "Compare chains for gift sets.", estimatedTime: "17:00", durationMinutes: 55, transportMode: "subway", transportMinutes: 18, transportNote: "Susukino area" },
      { name: "Snow gear or outdoor shop", description: "Seasonal; sizes differ from US/EU.", estimatedTime: "18:30", durationMinutes: 70, transportMode: "walk", transportMinutes: 10, transportNote: "Return to stay" },
      { name: "Airport-style omiyage preview", description: "Price-check before last day panic.", estimatedTime: "20:30", durationMinutes: 35, transportMode: "walk", transportMinutes: 8, transportNote: "Walk back" },
    ],
    Fukuoka: [
      { name: "Canal City mall loop", description: "Fashion, ramen stalls, events.", estimatedTime: "11:00", durationMinutes: 90, transportMode: "subway", transportMinutes: 20, transportNote: "Toward Tenjin" },
      { name: "Tenjin underground shops", description: "Basement boutiques and cosmetics.", estimatedTime: "14:30", durationMinutes: 85, transportMode: "train", transportMinutes: 40, transportNote: "If Dazaifu morning" },
      { name: "Hakata station department store", description: "Food gifts and houseware.", estimatedTime: "17:00", durationMinutes: 75, transportMode: "walk", transportMinutes: 12, transportNote: "Nakasu stroll" },
      { name: "Kyushu regional goods", description: "Shochu snacks and ceramics.", estimatedTime: "19:00", durationMinutes: 60, transportMode: "walk", transportMinutes: 10, transportNote: "Return to stay" },
      { name: "Late konbini gift test", description: "Compare mentaiko flavors.", estimatedTime: "21:00", durationMinutes: 30, transportMode: "walk", transportMinutes: 8, transportNote: "Walk back" },
    ],
  },
  photography: {
    Tokyo: [
      { name: "Shibuya scramble at blue hour", description: "Tripod rules vary; respect signage.", estimatedTime: "6:30", durationMinutes: 60, transportMode: "subway", transportMinutes: 25, transportNote: "Toward Asakusa sunrise" },
      { name: "Asakusa temple frontage", description: "Early light on Senso-ji; fewer crowds.", estimatedTime: "8:30", durationMinutes: 75, transportMode: "train", transportMinutes: 30, transportNote: "Toward Odaiba or bay" },
      { name: "TeamLab or bay viewpoint", description: "Check ticket slots; battery backup.", estimatedTime: "13:00", durationMinutes: 90, transportMode: "train", transportMinutes: 25, transportNote: "Toward Shinjuku" },
      { name: "Metropolitan Government free deck", description: "Sunset line if weather clear.", estimatedTime: "17:00", durationMinutes: 70, transportMode: "subway", transportMinutes: 20, transportNote: "Night neon area" },
      { name: "Kabukicho or neon alley night", description: "Shoot respectfully; no tripod blocking.", estimatedTime: "20:00", durationMinutes: 75, transportMode: "subway", transportMinutes: 18, transportNote: "Return to hotel" },
    ],
    Osaka: [
      { name: "Dotonbori sign river walk", description: "Golden hour reflections on canal.", estimatedTime: "17:00", durationMinutes: 75, transportMode: "walk", transportMinutes: 15, transportNote: "Umeda night" },
      { name: "Umeda sky building deck", description: "Ticketed view; wind at dusk.", estimatedTime: "18:30", durationMinutes: 80, transportMode: "subway", transportMinutes: 22, transportNote: "Morning castle next day" },
      { name: "Osaka Castle park wide shot", description: "Moat loop for cherry or maple.", estimatedTime: "8:00", durationMinutes: 90, transportMode: "train", transportMinutes: 35, transportNote: "If Kyoto photo day" },
      { name: "Shinsekai retro street", description: "Tsutenkaku tower frames.", estimatedTime: "15:00", durationMinutes: 70, transportMode: "walk", transportMinutes: 12, transportNote: "Evening neon" },
      { name: "Tenjinbashi sunset tram", description: "Shoot from platform safely.", estimatedTime: "19:00", durationMinutes: 55, transportMode: "subway", transportMinutes: 15, transportNote: "Return to stay" },
    ],
    Kyoto: [
      { name: "Fushimi Inari torii tunnel", description: "Go early; exposure bracket helpful.", estimatedTime: "6:30", durationMinutes: 100, transportMode: "bus", transportMinutes: 30, transportNote: "Toward Arashiyama" },
      { name: "Arashiyama bamboo grove", description: "Quietest before 8:30.", estimatedTime: "9:30", durationMinutes: 90, transportMode: "train", transportMinutes: 35, transportNote: "Philosopher's Path" },
      { name: "Philosopher's Path stream", description: "Seasonal blossoms change timing.", estimatedTime: "14:00", durationMinutes: 75, transportMode: "bus", transportMinutes: 25, transportNote: "Gion dusk" },
      { name: "Yasaka Pagoda lane", description: "Respect residents; no flash at night.", estimatedTime: "17:30", durationMinutes: 70, transportMode: "walk", transportMinutes: 12, transportNote: "Evening meal" },
      { name: "Night Gion alley (no geisha chase)", description: "Documentary style only.", estimatedTime: "19:30", durationMinutes: 60, transportMode: "walk", transportMinutes: 10, transportNote: "Return to stay" },
    ],
    Hiroshima: [
      { name: "Peace Park reflection pool", description: "Sombre framing; allow quiet time.", estimatedTime: "8:30", durationMinutes: 90, transportMode: "tram", transportMinutes: 40, transportNote: "Ferry to Miyajima" },
      { name: "Itsukushima torii at tide", description: "Check tide table for water shots.", estimatedTime: "14:00", durationMinutes: 90, transportMode: "walk", transportMinutes: 20, transportNote: "Island village" },
      { name: "Miyajima maple valley", description: "Autumn peak colors vary yearly.", estimatedTime: "16:00", durationMinutes: 70, transportMode: "train", transportMinutes: 35, transportNote: "Return to city" },
      { name: "Hondori night neon", description: "Handheld high ISO test.", estimatedTime: "19:00", durationMinutes: 55, transportMode: "tram", transportMinutes: 18, transportNote: "Tram to hotel" },
      { name: "Station night long exposure", description: "Stay off tracks; mind commuters.", estimatedTime: "20:30", durationMinutes: 45, transportMode: "walk", transportMinutes: 8, transportNote: "Return to stay" },
    ],
    Sapporo: [
      { name: "Odori Park morning snow or green", description: "Wide shots with TV tower.", estimatedTime: "7:30", durationMinutes: 75, transportMode: "subway", transportMinutes: 45, transportNote: "Otaru canal if day trip" },
      { name: "Otaru canal gas lamps", description: "Blue hour in winter is early.", estimatedTime: "15:00", durationMinutes: 90, transportMode: "train", transportMinutes: 45, transportNote: "Return Sapporo" },
      { name: "Susukino neon night", description: "Cold batteries; keep spares warm.", estimatedTime: "19:00", durationMinutes: 70, transportMode: "subway", transportMinutes: 18, transportNote: "Hotel zone" },
      { name: "Moerenuma park geometry", description: "Half-day if architecture shots matter.", estimatedTime: "10:00", durationMinutes: 120, transportMode: "subway", transportMinutes: 25, transportNote: "Central return" },
      { name: "Night skyline from observation bar", description: "No tripod unless allowed.", estimatedTime: "21:00", durationMinutes: 60, transportMode: "walk", transportMinutes: 10, transportNote: "Return to stay" },
    ],
    Fukuoka: [
      { name: "Ohori Park lake loop", description: "Morning joggers; polite distance.", estimatedTime: "8:00", durationMinutes: 80, transportMode: "subway", transportMinutes: 25, transportNote: "Toward seaside" },
      { name: "Momochi seaside tower view", description: "Beach and city combo shots.", estimatedTime: "11:30", durationMinutes: 85, transportMode: "train", transportMinutes: 40, transportNote: "If Dazaifu morning" },
      { name: "Nakasu yatai glow", description: "ISO noise; ask before close portraits.", estimatedTime: "19:00", durationMinutes: 75, transportMode: "walk", transportMinutes: 12, transportNote: "Canal City night" },
      { name: "Canal City water show", description: "Event times on mall site.", estimatedTime: "20:30", durationMinutes: 55, transportMode: "walk", transportMinutes: 10, transportNote: "Return to stay" },
      { name: "Hakata station light trails", description: "Safe tripod spot away from crowds.", estimatedTime: "21:30", durationMinutes: 45, transportMode: "walk", transportMinutes: 8, transportNote: "Walk back" },
    ],
  },
};

function transportLeg(template: StopTemplate): ItineraryTransportLeg {
  return normalizeTransportLeg({
    mode: template.transportMode as string,
    durationMinutes: template.transportMinutes,
    estimated: true,
    provider: "ai_estimate",
    instructions: template.transportNote,
    note: template.transportNote,
  })!;
}

function buildStops(
  city: StartCity,
  theme: ItineraryTheme,
  dayNumber: number,
  pace: TravelPace,
): ItineraryStop[] {
  const count = STOPS_PER_PACE[pace];
  const pool = THEME_STOPS[theme][city];
  const stops: ItineraryStop[] = [];

  for (let i = 0; i < count; i++) {
    const template = pool[(i + dayNumber - 1) % pool.length];
    const isLast = i === count - 1;
    stops.push({
      id: buildDeterministicStopId(dayNumber, i + 1),
      name: template.name,
      description: template.description,
      category: stopCategory(theme),
      estimatedTime: template.estimatedTime,
      durationMinutes: template.durationMinutes,
      transportToNext: isLast ? null : transportLeg(template),
    });
  }

  return stops;
}

function dayTitle(city: StartCity, dayNumber: number, theme: ItineraryTheme): string {
  const themeLabel =
    theme === "food"
      ? "Food focus"
      : theme === "temples"
        ? "Temples and shrines"
        : theme === "anime"
          ? "Anime and character stops"
          : theme === "shopping"
            ? "Shopping loop"
            : "Photo spots";
  return `Day ${dayNumber}: ${city} (${themeLabel})`;
}

function daySummary(
  city: StartCity,
  dayNumber: number,
  totalDays: number,
  pace: TravelPace,
): string {
  const stops = STOPS_PER_PACE[pace];
  const position =
    dayNumber === 1
      ? "Arrival day"
      : dayNumber === totalDays
        ? "Final day"
        : "Mid-trip";
  return `${position} in ${city} with ${stops} planned stops and buffers for transit.`;
}

function buildDays(request: GenerateItineraryRequest): ItineraryDay[] {
  const days: ItineraryDay[] = [];
  for (let d = 1; d <= request.duration; d++) {
    const city =
      d === 1 ? request.startCity : cityForDay(request.startCity, d);
    days.push({
      dayNumber: d,
      title: dayTitle(city, d, request.theme),
      city,
      summary: daySummary(city, d, request.duration, request.pace),
      stops: buildStops(city, request.theme, d, request.pace),
    });
  }
  return days;
}

export function createMockItinerary(
  request: GenerateItineraryRequest,
): GeneratedItinerary {
  const slug = buildItinerarySlug(request);
  const title = buildDefaultItineraryTitle(request);

  return {
    id: buildItineraryId(slug),
    slug,
    title,
    duration: request.duration,
    startCity: request.startCity,
    theme: request.theme,
    travelStyle: request.travelStyle,
    pace: request.pace,
    days: buildDays(request),
  };
}
