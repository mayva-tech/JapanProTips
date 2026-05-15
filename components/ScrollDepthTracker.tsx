"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const MILESTONES = [25, 50, 75, 100] as const;

function getScrollPercent(): number {
  const el = document.documentElement;
  const scrollTop = window.scrollY ?? el.scrollTop;
  const scrollable = el.scrollHeight - window.innerHeight;
  if (scrollable <= 0) return 100;
  return Math.min(100, Math.round((scrollTop / scrollable) * 100));
}

function sendScrollDepth(percent: (typeof MILESTONES)[number]) {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", "scroll_depth", { scroll_percent: percent });
}

export function ScrollDepthTracker() {
  const pathname = usePathname();
  const fired = useRef<Set<number>>(new Set());
  const ticking = useRef(false);

  useEffect(() => {
    fired.current.clear();

    const check = () => {
      if (typeof window.gtag !== "function") return;
      const pct = getScrollPercent();
      for (const m of MILESTONES) {
        if (pct >= m && !fired.current.has(m)) {
          fired.current.add(m);
          sendScrollDepth(m);
        }
      }
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        check();
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("load", onScroll);
    requestAnimationFrame(check);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("load", onScroll);
    };
  }, [pathname]);

  return null;
}
