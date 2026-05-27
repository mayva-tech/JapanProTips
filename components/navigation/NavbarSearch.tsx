"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { searchGuides, type GuideSearchEntry } from "@/lib/guide-search-index";
import { conversionLabelForHref, trackGtagClick } from "@/lib/gtag-events";
import { NavSearchIcon } from "@/components/navigation/NavSearchIcon";

type NavbarSearchProps = {
  entries: GuideSearchEntry[];
};

export function NavbarSearch({ entries }: NavbarSearchProps) {
  const inputId = useId();
  const panelId = `${inputId}-panel`;
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
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

  const openSearch = useCallback(() => {
    flushSync(() => setOpen(true));
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) {
        close();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [close, open]);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") close();
      }}
    >
      <button
        type="button"
        className="aom-nav-link aom-nav-search-trigger inline-flex items-center gap-2 border-0 bg-transparent p-0"
        aria-expanded={open}
        aria-controls={panelId}
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse") {
            event.preventDefault();
            openSearch();
          }
        }}
        onClick={openSearch}
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
        id={panelId}
        role="region"
        aria-label="Search guides"
        onKeyDown={(event) => {
          if (event.key === "Escape") close();
        }}
        className={`aom-nav-search-panel ${open ? "aom-nav-search-panel--open" : ""}`}
      >
        <div className="aom-nav-search-panel-box">
        <label htmlFor={inputId} className="sr-only">
          Search guides
        </label>
        <div className="flex items-center gap-2 border-b border-paper-edge pb-3">
          <NavSearchIcon className="shrink-0 opacity-90" />
          <input
            ref={inputRef}
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
