"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  stripTrailingArrowFromNode,
  withChevronClass,
} from "@/lib/cta-chevron";
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
  const arrow = stripTrailingArrowFromNode(children);
  const resolvedClassName = withChevronClass(className, arrow.hadTrailingArrow);

  return (
    <Link
      href={href}
      className={resolvedClassName}
      prefetch={prefetch}
      data-cta-label={dataLabel}
      onClick={() => trackToolClick(sourceSlug, href)}
    >
      {arrow.children}
    </Link>
  );
}
