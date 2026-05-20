import type { AffiliateLinkId } from "@/lib/affiliate-links";
import { getAffiliateUrlOrNull } from "@/lib/affiliate-links";

export type EditorialEsimProviderId = "airalo" | "ubigi";

export type EditorialEsimProvider = {
  id: EditorialEsimProviderId;
  name: string;
  ctaLabel: string;
  /** Fallback homepage when no tracked affiliate URL is set on the registry key. */
  defaultUrl: string;
  affiliateLinkId: AffiliateLinkId;
};

/** Named eSIM providers referenced in editorial SIM guides. URLs resolve via `affiliateLinks`. */
export const EDITORIAL_ESIM_PROVIDERS: EditorialEsimProvider[] = [
  {
    id: "airalo",
    name: "Airalo",
    ctaLabel: "Airalo eSIM →",
    defaultUrl: "https://www.airalo.com/",
    affiliateLinkId: "airalo-esim-japan",
  },
  {
    id: "ubigi",
    name: "Ubigi",
    ctaLabel: "Ubigi eSIM →",
    defaultUrl: "https://www.ubigi.com/",
    affiliateLinkId: "ubigi-esim-japan",
  },
];

export function editorialEsimProviderById(
  id: EditorialEsimProviderId,
): EditorialEsimProvider | undefined {
  return EDITORIAL_ESIM_PROVIDERS.find((p) => p.id === id);
}

/** Registry URL when live; otherwise the editorial provider homepage. */
export function resolveEditorialEsimProviderHref(provider: EditorialEsimProvider): string {
  return getAffiliateUrlOrNull(provider.affiliateLinkId) ?? provider.defaultUrl;
}
