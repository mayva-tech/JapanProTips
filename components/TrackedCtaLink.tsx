"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  stripTrailingArrowFromNode,
  withChevronClass,
} from "@/lib/cta-chevron";
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
  const arrow = stripTrailingArrowFromNode(children);
  const resolvedClassName = withChevronClass(className, arrow.hadTrailingArrow);

  if (/^https?:\/\//i.test(href)) {
    return (
      <a
        href={href}
        className={resolvedClassName}
        onClick={onClick}
        target={target}
        rel={rel}
      >
        {arrow.children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={resolvedClassName}
      onClick={onClick}
      prefetch={prefetch}
    >
      {arrow.children}
    </Link>
  );
}
