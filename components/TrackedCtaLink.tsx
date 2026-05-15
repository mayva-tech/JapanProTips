"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { ConversionGtagLabel } from "@/lib/gtag-events";
import { trackGtagClick } from "@/lib/gtag-events";

export type TrackedCtaLinkProps = {
  href: string;
  label: ConversionGtagLabel;
  className: string;
  children: ReactNode;
  prefetch?: boolean;
  /** Used for external links only (default: sponsored outbound). */
  target?: string;
  /** Used for external links only. */
  rel?: string;
};

export function TrackedCtaLink({
  href,
  label,
  className,
  children,
  prefetch,
  target = "_blank",
  rel = "noopener noreferrer nofollow sponsored",
}: TrackedCtaLinkProps) {
  const onClick = () => trackGtagClick(label);

  if (/^https?:\/\//i.test(href)) {
    return (
      <a
        href={href}
        className={className}
        onClick={onClick}
        target={target}
        rel={rel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick} prefetch={prefetch}>
      {children}
    </Link>
  );
}
