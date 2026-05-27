"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  stripTrailingArrowFromNode,
  withChevronClass,
} from "@/lib/cta-chevron";
import { trackGtagClick } from "@/lib/gtag-events";

type TrackedStartHereLinkProps = {
  className?: string;
  children: ReactNode;
  /**
   * Defaults to `/start-here`. Use `/guides/start-here-japan` for the marketing
   * funnel URL (permanent redirect to Start Here).
   */
  href?: string;
};

export function TrackedStartHereLink({
  className,
  children,
  href = "/start-here",
}: TrackedStartHereLinkProps) {
  const arrow = stripTrailingArrowFromNode(children);
  const resolvedClassName = withChevronClass(className, arrow.hadTrailingArrow);

  return (
    <Link
      href={href}
      className={resolvedClassName}
      onClick={() => trackGtagClick("start_here")}
    >
      {arrow.children}
    </Link>
  );
}
