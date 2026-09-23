"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type LearnNavItem = {
  label: string;
  href: string;
  /** Exact match only (section home), otherwise prefix match. */
  exact?: boolean;
};

/** Phase 1: only live routes appear here. Add trainers as they migrate. */
const LEARN_NAV_ITEMS: LearnNavItem[] = [
  { label: "Learn Home", href: "/learn-japanese", exact: true },
  { label: "Konbini Trainer", href: "/learn-japanese/konbini" },
];

function isActive(pathname: string, item: LearnNavItem): boolean {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

/** Secondary nav under the main site navbar for /learn-japanese routes. */
export function JapaneseLearningNav() {
  const pathname = usePathname() ?? "";

  return (
    <nav
      aria-label="Japanese learning"
      className="border-b border-paper-edge bg-paper-elevated"
    >
      <div className="page-x mx-auto flex w-full max-w-6xl items-center gap-5 overflow-x-auto py-2.5 sm:gap-7">
        <span className="editorial-kicker shrink-0 text-xs">Learn Japanese</span>
        <span aria-hidden className="h-4 w-px shrink-0 bg-paper-edge" />
        {LEARN_NAV_ITEMS.map((item) => {
          const active = isActive(pathname, item);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`shrink-0 border-b-2 pb-0.5 font-sans text-sm font-bold uppercase tracking-wide no-underline transition-colors ${
                active
                  ? "border-rust text-maroon"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
