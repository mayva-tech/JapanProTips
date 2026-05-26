"use client";

import Link from "next/link";
import { useCallback, useId, useMemo, useRef, useState } from "react";
import { searchGuides, type GuideSearchEntry } from "@/lib/guide-search-index";
import { conversionLabelForHref, trackGtagClick } from "@/lib/gtag-events";
import { NavSearchIcon } from "@/components/navigation/NavSearchIcon";

type NavbarSearchProps = {
  entries: GuideSearchEntry[];
};

export function NavbarSearch({ entries }: NavbarSearchProps) {
  const inputId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const results = useMemo(
    () => searchGuides(query, entries, 6),
    [query, entries],
  );

  const hasQuery = query.trim().length >= 2;

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="aom-nav-link aom-nav-search-trigger inline-flex items-center gap-2 border-0 bg-transparent p-0"
        aria-expanded={open}
        aria-controls="navbar-search-panel"
        onClick={() => setOpen((v) => !v)}
      >
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-[1.05em] w-[1.05em] shrink-0 text-rust"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.4"
        >
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4.5 4.5" />
        </svg>
        <span>SEARCH</span>
      </button>

      <div
        id="navbar-search-panel"
        role="region"
        aria-label="Search guides"
        className={`aom-nav-search-panel ${open ? "aom-nav-search-panel--open" : ""}`}
      >
        <div className="aom-nav-search-panel-box">
        <label htmlFor={inputId} className="sr-only">
          Search guides
        </label>
        <div className="flex items-center gap-2 border-b border-paper-edge pb-3">
          <NavSearchIcon className="shrink-0 opacity-90" />
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SIM, trains, rent, visa…"
            autoComplete="off"
            className="w-full border-0 bg-transparent font-serif text-base text-ink outline-none placeholder:text-muted/70"
          />
        </div>

        {hasQuery && results.length > 0 ? (
          <ul className="mt-3 max-h-72 list-none space-y-0 overflow-y-auto p-0">
            {results.map((entry) => (
              <li key={entry.href} className="border-t border-paper-edge/80 first:border-t-0">
                <Link
                  href={entry.href}
                  className="block py-2.5 font-serif text-sm text-oxblood hover:text-oxblood/80"
                  onClick={() => {
                    trackGtagClick(conversionLabelForHref(entry.href));
                    close();
                  }}
                >
                  <span className="font-sans text-[0.65rem] font-bold uppercase tracking-widest text-muted">
                    {entry.section}
                  </span>
                  <span className="mt-0.5 block font-bold leading-snug">{entry.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}

        {hasQuery && results.length === 0 ? (
          <p className="mt-3 font-serif text-sm text-muted">No guides match. Try another word.</p>
        ) : null}

        {!hasQuery ? (
          <p className="mt-3 font-serif text-sm text-muted">
            Type at least 2 characters.{" "}
            <Link href="/tourists" className="font-bold text-oxblood underline">
              Browse guides
            </Link>
          </p>
        ) : null}
        </div>
      </div>
    </div>
  );
}
