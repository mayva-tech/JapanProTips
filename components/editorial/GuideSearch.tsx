"use client";

import Link from "next/link";
import { useCallback, useId, useMemo, useState } from "react";
import { searchGuides, type GuideSearchEntry } from "@/lib/guide-search-index";
import { conversionLabelForHref, trackGtagClick } from "@/lib/gtag-events";

function SearchResultItem({ entry }: { entry: GuideSearchEntry }) {
  return (
    <li>
      <Link
        href={entry.href}
        onClick={() => trackGtagClick(conversionLabelForHref(entry.href))}
        className="editorial-card group block px-5 py-4 transition-colors hover:border-maroon/30"
      >
        <p className="editorial-kicker mb-1">
          {entry.section} · {entry.category}
        </p>
        <p className="font-heading text-lg font-bold italic text-ink group-hover:text-maroon">
          {entry.title}
        </p>
        <p className="article-body mt-1 line-clamp-2">{entry.description}</p>
        <span className="editorial-chevron-link mt-2 font-sans text-nav font-bold uppercase tracking-wide text-rust group-hover:text-maroon">
          Read guide
        </span>
      </Link>
    </li>
  );
}

type GuideSearchProps = {
  entries: GuideSearchEntry[];
};

export function GuideSearch({ entries }: GuideSearchProps) {
  const inputId = useId();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const results = useMemo(
    () => searchGuides(query, entries, 8),
    [query, entries],
  );

  const showResults = focused && query.trim().length >= 2;
  const hasQuery = query.trim().length >= 2;
  const noResults = hasQuery && results.length === 0;

  const onChange = useCallback((value: string) => {
    setQuery(value);
  }, []);

  return (
    <section
      className="border-b border-paper-edge bg-paper py-8 sm:py-12"
      aria-label="Search guides"
    >
      <div className="page-x mx-auto max-w-2xl">
        <label htmlFor={inputId} className="editorial-kicker mb-2 block">
          Find a guide
        </label>
        <h2 className="editorial-heading mb-3 text-ink">Search by topic</h2>
        <p className="article-body mb-5">
          Type a word like SIM, rent, delivery, train, or visa. Search covers{" "}
          {entries.length} tourist and resident guides and opens the full article
          when you tap a result.
        </p>

        <div className="relative">
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              window.setTimeout(() => setFocused(false), 150);
            }}
            placeholder="e.g. sim, rent, yamato, nhi, shinkansen"
            autoComplete="off"
            className="w-full border border-paper-edge bg-paper-card px-4 py-3.5 font-serif text-body text-ink shadow-editorial outline-none transition-colors placeholder:text-muted/60 focus:border-maroon/50 focus:ring-2 focus:ring-maroon/20"
          />
        </div>

        {showResults && results.length > 0 ? (
          <ul
            className="mt-4 flex flex-col gap-3"
            role="listbox"
            aria-label="Search results"
          >
            {results.map((entry) => (
              <SearchResultItem key={entry.href} entry={entry} />
            ))}
          </ul>
        ) : null}

        {showResults && noResults ? (
          <p className="article-body mt-4 rounded-md border border-paper-edge bg-paper-elevated px-4 py-3 text-muted">
            No guides match that word. Try SIM, rent, delivery, allergy, or{" "}
            <Link
              href="/tourists"
              className="font-sans font-bold text-rust hover:text-maroon"
            >
              tourist guides
            </Link>{" "}
            and{" "}
            <Link
              href="/residents"
              className="font-sans font-bold text-rust hover:text-maroon"
            >
              resident guides
            </Link>
            .
          </p>
        ) : null}

        {!hasQuery && focused ? (
          <p className="article-body-sm mt-3 text-muted">
            Type at least 2 characters to search.
          </p>
        ) : null}
      </div>
    </section>
  );
}
