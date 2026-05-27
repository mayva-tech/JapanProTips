"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { stripTrailingArrowFromText } from "@/lib/cta-chevron";
import type { ConversionGtagLabel } from "@/lib/gtag-events";
import { trackGtagClick } from "@/lib/gtag-events";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "outline";
  className?: string;
  /** When set, fires `gtag('event', 'click', { label })` on link click */
  gtagLabel?: ConversionGtagLabel;
}

export function Button({
  children,
  href,
  variant = "outline",
  className,
  gtagLabel,
}: ButtonProps) {
  const base =
    "inline-block text-base font-medium px-4 py-2 rounded-md transition-colors";
  const variants = {
    primary: "bg-stone-900 text-stone-50 hover:bg-stone-700",
    outline: "border border-stone-300 text-stone-800 hover:bg-stone-100",
  };
  const strippedChildren =
    typeof children === "string" ? stripTrailingArrowFromText(children) : children;
  const hasTrailingArrow = strippedChildren !== children;
  const renderedChildren = hasTrailingArrow
    ? strippedChildren
    : children;
  const resolvedClassName = cn(
    base,
    variants[variant],
    hasTrailingArrow && "editorial-chevron-cta",
    className,
  );

  if (href) {
    return (
      <a
        href={href}
        className={resolvedClassName}
        onClick={() => {
          if (gtagLabel) trackGtagClick(gtagLabel);
        }}
      >
        {renderedChildren}
      </a>
    );
  }

  return (
    <button className={resolvedClassName}>
      {renderedChildren}
    </button>
  );
}
