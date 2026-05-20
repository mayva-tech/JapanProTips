"use client";

import { TrackedOutboundSimLink } from "@/components/TrackedOutboundSimLink";
import {
  editorialEsimProviderById,
  resolveEditorialEsimProviderHref,
  type EditorialEsimProviderId,
} from "@/lib/esim-editorial-providers";

export type EditorialEsimProviderLinkItem = {
  providerId: EditorialEsimProviderId;
  /** Optional heading above the CTA (price-check block). */
  label?: string;
};

export type EditorialEsimProviderLinksProps = {
  items: EditorialEsimProviderLinkItem[];
  linkClassName: string;
  /** Simple list vs labeled rows for the dark price-check panel. */
  layout?: "list" | "labeled";
  className?: string;
};

/**
 * Editorial Airalo / Ubigi CTAs. Hrefs resolve from `lib/affiliate-links.ts` when set,
 * otherwise provider homepages. GA4 uses the shared `esim` click label.
 */
export function EditorialEsimProviderLinks({
  items,
  linkClassName,
  layout = "list",
  className = "",
}: EditorialEsimProviderLinksProps) {
  const resolved = items
    .map((item) => {
      const provider = editorialEsimProviderById(item.providerId);
      if (!provider) {
        return null;
      }
      return { item, provider, href: resolveEditorialEsimProviderHref(provider) };
    })
    .filter((row): row is NonNullable<typeof row> => row != null);

  if (!resolved.length) {
    return null;
  }

  if (layout === "labeled") {
    return (
      <ul className={`space-y-5 list-none pl-0 ${className}`.trim()}>
        {resolved.map(({ item, provider, href }) => (
          <li key={provider.id}>
            {item.label ? (
              <p className="font-sans font-bold text-sm tracking-widest uppercase text-tan mb-2">
                {item.label}
              </p>
            ) : null}
            <TrackedOutboundSimLink href={href} className={linkClassName}>
              {provider.ctaLabel}
            </TrackedOutboundSimLink>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={`space-y-3 list-none pl-0 ${className}`.trim()}>
      {resolved.map(({ provider, href }) => (
        <li key={provider.id}>
          <TrackedOutboundSimLink href={href} className={linkClassName}>
            {provider.ctaLabel}
          </TrackedOutboundSimLink>
        </li>
      ))}
    </ul>
  );
}
