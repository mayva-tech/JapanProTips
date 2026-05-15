"use client";

import type { ReactNode } from "react";
import type { ConversionGtagLabel } from "@/lib/gtag-events";
import { trackGtagClick } from "@/lib/gtag-events";

type TrackedProductDownloadButtonProps = {
  href: string;
  className: string;
  children: ReactNode;
  /** GA4 click label; defaults to resident product funnel. */
  gtagLabel?: ConversionGtagLabel;
};

export function TrackedProductDownloadButton({
  href,
  className,
  children,
  gtagLabel = "resident_guides",
}: TrackedProductDownloadButtonProps) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => trackGtagClick(gtagLabel)}
    >
      {children}
    </a>
  );
}
