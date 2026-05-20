export type DownloadableChecklistCategory =
  | "arrival"
  | "packing"
  | "weather"
  | "transport"
  | "resident"
  | "emergency";

export type DownloadableChecklist = {
  id: string;
  title: string;
  shortDescription: string;
  previewItems: string[];
  /** Public path under `/public` (e.g. `/downloads/foo.pdf`). */
  filePath: string;
  category: DownloadableChecklistCategory;
  emailRequired: boolean;
  /** Shown above the email field when email is required. */
  emailPrompt?: string;
  /** Inline confirmation after submit (no modal). */
  successMessage?: string;
};

export const downloadableChecklists: Record<string, DownloadableChecklist> = {
  "japan-arrival-checklist": {
    id: "japan-arrival-checklist",
    title: "Japan arrival checklist",
    shortDescription:
      "A practical checklist covering the first things to do after landing in Japan.",
    previewItems: [
      "SIM or eSIM setup",
      "Cash withdrawal",
      "IC card setup",
      "Train navigation",
    ],
    filePath: "/downloads/japan-arrival-checklist.pdf",
    category: "arrival",
    emailRequired: true,
    emailPrompt: "We email the PDF once. No weekly promo blast.",
  },
  "japan-packing-checklist": {
    id: "japan-packing-checklist",
    title: "Japan packing checklist",
    shortDescription:
      "Carry-on focused list for trains, coin lockers, humidity, and walking-heavy days.",
    previewItems: [
      "Shoes, socks, and rain layer",
      "Power and day bag",
      "Toiletries and laundry backup",
      "Documents and wallet setup",
    ],
    filePath: "/downloads/japan-packing-checklist.pdf",
    category: "packing",
    emailRequired: true,
  },
  "japan-rainy-season-checklist": {
    id: "japan-rainy-season-checklist",
    title: "Japan rainy season checklist",
    shortDescription:
      "What to pack and plan for tsuyu humidity, drying, and indoor backup days.",
    previewItems: [
      "Rain layer and shoe plan",
      "Laundry and drying expectations",
      "Indoor day backups",
    ],
    filePath: "/downloads/japan-rainy-season-checklist.pdf",
    category: "weather",
    emailRequired: true,
  },
  "japan-train-cheat-sheet": {
    id: "japan-train-cheat-sheet",
    title: "Japan train cheat sheet",
    shortDescription:
      "One-page reference for IC cards, train types, and reading a platform screen.",
    previewItems: [
      "IC tap in and out",
      "Local, Rapid, Express",
      "Platform board checks",
    ],
    filePath: "/downloads/japan-train-cheat-sheet.pdf",
    category: "transport",
    emailRequired: false,
  },
  "japan-first-7-days-checklist": {
    id: "japan-first-7-days-checklist",
    title: "First 7 days in Japan",
    shortDescription:
      "Day-by-day priorities for week one: payments, trains, laundry, and pace.",
    previewItems: [
      "Day 1 to 3: connectivity and payments",
      "Day 4 to 7: laundry and weather gear",
      "What to defer until week two",
    ],
    filePath: "/downloads/japan-first-7-days-checklist.pdf",
    category: "arrival",
    emailRequired: true,
  },
  "moving-to-japan-checklist": {
    id: "moving-to-japan-checklist",
    title: "Moving to Japan: first 30 days checklist",
    shortDescription:
      "Printable month-one order for new residents: registration, bank, phone, utilities, insurance, and apartment admin.",
    previewItems: [
      "Before arrival through first month",
      "Housing, bills, and ward office tasks",
      "Emergency numbers and document folder",
    ],
    filePath: "/downloads/moving-to-japan-checklist.pdf",
    category: "resident",
    emailRequired: false,
    successMessage: "Download started. Check your downloads folder.",
  },
  "moving-to-japan-30-days": {
    id: "moving-to-japan-30-days",
    title: "Moving to Japan: first 30 days",
    shortDescription:
      "Month-one order for new residents: ward office, bank, phone, bills, and apartment basics.",
    previewItems: [
      "Residence registration timing",
      "Bank account and bills",
      "Phone and home internet",
      "Apartment admin and garbage",
    ],
    filePath: "/downloads/moving-to-japan-30-days.pdf",
    category: "resident",
    emailRequired: true,
    successMessage: "Download started. Check your downloads folder.",
  },
  "apartment-setup-checklist": {
    id: "apartment-setup-checklist",
    title: "Apartment setup checklist",
    shortDescription:
      "Move-in order: utilities, internet, garbage rules, and easy-to-forget admin.",
    previewItems: [
      "Utilities and gas start dates",
      "Internet install window",
      "Ward garbage chart",
      "Bank auto-debit setup",
    ],
    filePath: "/downloads/apartment-setup-checklist.pdf",
    category: "resident",
    emailRequired: true,
  },
  "japan-emergency-card": {
    id: "japan-emergency-card",
    title: "Japan emergency numbers card",
    shortDescription:
      "Pocket reference for 110, 119, and common help lines. Save offline or print.",
    previewItems: [
      "Police and ambulance",
      "English help lines",
      "Lost property and transit help",
    ],
    filePath: "/downloads/japan-emergency-card.pdf",
    category: "emergency",
    emailRequired: false,
  },
};

/** Pilot routes and the checklist `downloadId` each page should use. */
export const CHECKLIST_PILOT_ROUTES: Record<string, string> = {
  "/guides/japan-airport-first-steps": "japan-arrival-checklist",
  "/guides/japan-packing-list": "japan-packing-checklist",
  "/guides/japan-trains": "japan-train-cheat-sheet",
  "/guides/japan-rainy-season-guide": "japan-rainy-season-checklist",
  "/residents/renting-apartment-japan": "apartment-setup-checklist",
  "/residents/japan-residence-registration": "moving-to-japan-30-days",
  "/residents/japan-utilities-setup": "apartment-setup-checklist",
};

export function getDownloadableChecklist(
  downloadId: string,
): DownloadableChecklist | undefined {
  return downloadableChecklists[downloadId];
}

export function listDownloadableChecklistIds(): string[] {
  return Object.keys(downloadableChecklists);
}
