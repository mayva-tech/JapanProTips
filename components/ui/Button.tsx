"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
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

  if (href) {
    return (
      <a
        href={href}
        className={cn(base, variants[variant], className)}
        onClick={() => {
          if (gtagLabel) trackGtagClick(gtagLabel);
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={cn(base, variants[variant], className)}>
      {children}
    </button>
  );
}
