/** GA4 `click` event labels used across conversion CTAs (keep in sync with reporting). */
export const CONVERSION_GTAG_LABELS = [
  "start_here",
  "esim",
  "hotel",
  "transport",
  "budget",
  "resident_guides",
  "newsletter",
] as const;

export type ConversionGtagLabel = (typeof CONVERSION_GTAG_LABELS)[number];

export function trackGtagClick(label: string) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", "click", { label });
}

/** Map internal (or known external) URLs to a single conversion label for GA4 click events. */
export function conversionLabelForHref(href: string): ConversionGtagLabel {
  const h = href.trim().toLowerCase();
  if (h.includes("newsletter")) return "newsletter";
  if (h.includes("/residents")) return "resident_guides";
  if (h.includes("/tourists")) return "start_here";
  if (
    h.includes("sim-card") ||
    h.includes("airalo") ||
    h.includes("ubigi") ||
    h.includes("esim") ||
    h.includes("pocket-wifi") ||
    h.includes("do-you-need-sim")
  ) {
    return "esim";
  }
  if (
    h.includes("where-to-stay") ||
    h.includes("best-area") ||
    h.includes("shinjuku-vs-shibuya")
  ) {
    return "hotel";
  }
  if (
    h.includes("budget") ||
    h.includes("money-payment") ||
    h.includes("living-cost") ||
    h.includes("cost-of-living")
  ) {
    return "budget";
  }
  if (
    h.includes("part-time-jobs") ||
    h.includes("japan-phone-plans") ||
    h.includes("renting-apartment") ||
    h.includes("japan-bank-account") ||
    h.includes("my-number")
  ) {
    return "resident_guides";
  }
  if (h.includes("start-here")) return "start_here";
  if (h.includes("trip-checklist") || h.includes("moving-to-japan")) {
    return h.includes("moving-to-japan") ? "resident_guides" : "start_here";
  }
  if (h.startsWith("http://") || h.startsWith("https://")) {
    if (/(airalo|ubigi|esim|sim)/.test(h)) return "esim";
    return "transport";
  }
  return "transport";
}
