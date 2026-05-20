"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  isAffiliatePlaceholder,
  isExternalAffiliateHref,
} from "@/lib/affiliate-links";
import {
  recommendationClickGtagLabel,
  trackRecommendationClick,
} from "@/lib/gtag-events";

const linkClass =
  "font-sans text-base font-bold text-rust transition-colors duration-150 hover:text-maroon";
const placeholderClass =
  "font-sans text-base font-bold text-muted/80 cursor-default";

export type TrackedRecommendationLinkProps = {
  href: string;
  recommendationId: string;
  context: string;
  children: ReactNode;
  className?: string;
};

export function TrackedRecommendationLink({
  href,
  recommendationId,
  context,
  children,
  className,
}: TrackedRecommendationLinkProps) {
  const dataLabel = recommendationClickGtagLabel(context, recommendationId);
  const mergedClass = className ?? linkClass;

  if (isAffiliatePlaceholder(href)) {
    return (
      <span
        className={placeholderClass}
        data-recommendation-id={recommendationId}
        data-recommendation-context={context}
        aria-label={`${String(children)} (link pending)`}
      >
        {children}
      </span>
    );
  }

  const onClick = () => trackRecommendationClick(context, recommendationId);

  if (href.startsWith("/")) {
    return (
      <Link
        href={href}
        className={mergedClass}
        data-recommendation-id={recommendationId}
        data-recommendation-context={context}
        data-cta-label={dataLabel}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  if (isExternalAffiliateHref(href)) {
    return (
      <a
        href={href}
        className={mergedClass}
        target="_blank"
        rel="noopener noreferrer sponsored"
        data-recommendation-id={recommendationId}
        data-recommendation-context={context}
        data-cta-label={dataLabel}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      className={mergedClass}
      data-recommendation-id={recommendationId}
      data-recommendation-context={context}
      data-cta-label={dataLabel}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
