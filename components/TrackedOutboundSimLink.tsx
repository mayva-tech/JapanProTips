"use client";

import type { ReactNode } from "react";
import type { ConversionGtagLabel } from "@/lib/gtag-events";
import { trackGtagClick } from "@/lib/gtag-events";

type TrackedOutboundSimLinkProps = {
  href: string;
  className: string;
  children: ReactNode;
  "aria-label"?: string;
  gtagLabel?: ConversionGtagLabel;
};

export function TrackedOutboundSimLink({
  href,
  className,
  children,
  "aria-label": ariaLabel,
  gtagLabel = "esim",
}: TrackedOutboundSimLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow sponsored"
      className={className}
      aria-label={ariaLabel}
      onClick={() => trackGtagClick(gtagLabel)}
    >
      {children}
    </a>
  );
}
