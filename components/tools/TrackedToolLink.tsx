"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  toolClickGtagLabel,
  trackToolClick,
} from "@/lib/gtag-events";

export type TrackedToolLinkProps = {
  href: string;
  /** Source context, e.g. `home`, `tools`, `nav`, or a tool slug. */
  sourceSlug: string;
  className: string;
  children: ReactNode;
  prefetch?: boolean;
};

export function TrackedToolLink({
  href,
  sourceSlug,
  className,
  children,
  prefetch,
}: TrackedToolLinkProps) {
  const dataLabel = toolClickGtagLabel(sourceSlug, href);
  return (
    <Link
      href={href}
      className={className}
      prefetch={prefetch}
      data-cta-label={dataLabel}
      onClick={() => trackToolClick(sourceSlug, href)}
    >
      {children}
    </Link>
  );
}
