"use client";

import Link from "next/link";
import {
  type AffiliateLinkId,
  isAffiliatePlaceholder,
  isExternalAffiliateHref,
} from "@/lib/affiliate-links";
import {
  type AffiliateRecommendationBox,
  trackAffiliateRecommendationClick,
} from "@/lib/gtag-events";

const itemLinkClass =
  "font-sans text-base font-bold text-rust transition-colors duration-150 hover:text-maroon";
const placeholderLinkClass =
  "font-sans text-base font-bold text-muted/80 cursor-default";

type TrackedAffiliateRecommendationLinkProps = {
  box: AffiliateRecommendationBox;
  name: string;
  href: string;
  linkId?: AffiliateLinkId;
};

export function TrackedAffiliateRecommendationLink({
  box,
  name,
  href,
  linkId,
}: TrackedAffiliateRecommendationLinkProps) {
  if (isAffiliatePlaceholder(href)) {
    return (
      <span
        className={placeholderLinkClass}
        aria-label={`${name} (affiliate link pending)`}
      >
        {name}
      </span>
    );
  }

  const onClick = () => trackAffiliateRecommendationClick(box, href, linkId);

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={itemLinkClass} onClick={onClick}>
        {name}
      </Link>
    );
  }

  if (isExternalAffiliateHref(href)) {
    return (
      <a
        href={href}
        className={itemLinkClass}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={onClick}
      >
        {name}
      </a>
    );
  }

  return (
    <a href={href} className={itemLinkClass} onClick={onClick}>
      {name}
    </a>
  );
}

export const affiliateRecommendationLinkClass = itemLinkClass;
export const affiliateRecommendationPlaceholderClass = placeholderLinkClass;
