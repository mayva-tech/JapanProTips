"use client";

import type { ReactNode } from "react";
import Link from "next/link";
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
  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackGtagClick("start_here")}
    >
      {children}
    </Link>
  );
}
