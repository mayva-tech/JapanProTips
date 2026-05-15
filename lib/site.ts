/** Site-wide brand and SEO constants for JapanProTips. */
export const SITE_NAME = "JapanProTips";
export const SITE_URL = "https://japanprotips.com";
export const SITE_TAGLINE = "Practical Japan explained simply.";
export const SITE_TAGLINE_SHORT = "Real tips for Japan travel and life.";
export const DEFAULT_TITLE =
  "JapanProTips | Practical Japan Travel and Life Guides";
export const DEFAULT_DESCRIPTION =
  "Practical Japan tips for tourists and residents. Simple guides for trains, SIM cards, money, hotels, daily life, and moving around Japan.";

export function siteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
  return SITE_URL;
}

/** Append brand suffix to page-specific titles. */
export function pageTitle(pageTitle: string): string {
  return `${pageTitle} | ${SITE_NAME}`;
}
