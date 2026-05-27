"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ConversionGtagLabel } from "@/lib/gtag-events";
import { stripTrailingArrowFromText } from "@/lib/cta-chevron";
import { trackGtagClick } from "@/lib/gtag-events";

export type StickyCTAProps = {
  /** Primary CTA target (internal guide or outbound vendor). */
  href: string;
  /** Bar headline */
  text?: string;
  /** Primary button label */
  buttonText?: string;
  className?: string;
  /** GA4 click label for the sticky primary CTA. */
  gtagLabel?: ConversionGtagLabel;
};

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

const TOP_THRESHOLD = 64;
const SCROLL_DELTA = 6;

const btnClass = "editorial-btn-primary editorial-chevron-cta w-full shrink-0 py-3 text-sm sm:w-auto sm:min-w-[140px]";

export function StickyCTA({
  href,
  text = "Get Internet Before You Land",
  buttonText = "Get an eSIM",
  className = "",
  gtagLabel = "esim",
}: StickyCTAProps) {
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  const onScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const dy = y - lastY.current;

      if (y < TOP_THRESHOLD) {
        setOpen(false);
      } else if (dy > SCROLL_DELTA) {
        setOpen(true);
      } else if (dy < -SCROLL_DELTA) {
        setOpen(false);
      }

      lastY.current = y;
      ticking.current = false;
    });
  }, []);

  useEffect(() => {
    lastY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const onCtaClick = () => trackGtagClick(gtagLabel);
  const label = stripTrailingArrowFromText(buttonText);

  const cta = isExternalHref(href) ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow sponsored"
      className={btnClass}
      onClick={onCtaClick}
    >
      {label}
    </a>
  ) : (
    <Link href={href} className={btnClass} onClick={onCtaClick}>
      {label}
    </Link>
  );

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-50 md:hidden ${className}`.trim()}
    >
      <div
        inert={open ? undefined : true}
        className={`pointer-events-auto border-t border-paper-edge bg-paper/95 px-4 py-3 shadow-editorial backdrop-blur-sm transition-transform duration-300 ease-out pb-[max(0.75rem,env(safe-area-inset-bottom))] ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto flex max-w-lg flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="font-sans text-body font-bold leading-snug text-ink">
            {text}
          </p>
          {cta}
        </div>
      </div>
    </div>
  );
}
