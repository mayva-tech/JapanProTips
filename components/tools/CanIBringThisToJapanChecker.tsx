"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Callout } from "@/components/editorial/Callout";
import {
  type BringCategoryId,
  type BringCheckerUrlState,
  type BringStatus,
  BRING_CHECKER_DEFAULTS,
  BRING_CHECKER_DISCLAIMER,
  STATUS_LABELS,
  bringCheckerStateEqual,
  buildBringResultSummaryText,
  filterBringCategories,
  getBringCategoryById,
  normalizeBringCheckerQueryString,
  parseBringCheckerSearchParams,
  serializeBringCheckerQuery,
} from "@/lib/can-i-bring-this-to-japan";

const controlLabel =
  "mb-2 block font-sans text-xs font-bold uppercase tracking-widest text-rust";

const actionBtn =
  "inline-flex min-h-[2.5rem] flex-1 items-center justify-center rounded-md border border-paper-edge bg-paper-elevated/90 px-3 py-2 font-sans text-xs font-bold uppercase tracking-widest text-dark transition-colors duration-150 hover:border-rust/45 hover:bg-paper sm:text-[0.7rem]";

const statusBadgeClass: Record<BringStatus, string> = {
  "usually-ok":
    "border border-tan/80 bg-paper-elevated/90 text-dark",
  "check-before-travel":
    "border border-rust/40 bg-paper-elevated text-dark",
  restricted:
    "border border-maroon/35 bg-maroon/[0.08] text-maroon",
  "do-not-bring":
    "border border-maroon/60 bg-maroon/15 text-dark",
};

function CanIBringThisToJapanCheckerClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [state, setState] = useState<BringCheckerUrlState>(() => ({
    ...BRING_CHECKER_DEFAULTS,
  }));

  const serialized = useMemo(() => serializeBringCheckerQuery(state), [state]);

  useLayoutEffect(() => {
    const next = parseBringCheckerSearchParams(searchParams);
    setState((prev) => (bringCheckerStateEqual(prev, next) ? prev : next));
  }, [searchParams]);

  useEffect(() => {
    const norm = normalizeBringCheckerQueryString(searchParams.toString());
    if (serialized === norm) return;
    router.replace(
      serialized ? `${pathname}?${serialized}` : pathname,
      { scroll: false },
    );
  }, [serialized, searchParams, pathname, router]);

  const filtered = useMemo(
    () => filterBringCategories(state.q),
    [state.q],
  );

  const selected = useMemo(
    () => getBringCategoryById(state.categoryId ?? undefined),
    [state.categoryId],
  );

  const selectCategory = useCallback((id: BringCategoryId) => {
    setState((s) => ({
      ...s,
      categoryId: s.categoryId === id ? null : id,
    }));
  }, []);

  const [copied, setCopied] = useState<"summary" | "link" | null>(null);
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCopiedSoon = useCallback(() => {
    if (copiedTimer.current) clearTimeout(copiedTimer.current);
    copiedTimer.current = setTimeout(() => {
      setCopied(null);
      copiedTimer.current = null;
    }, 2200);
  }, []);

  const copyText = useCallback(
    async (text: string, kind: "summary" | "link") => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(kind);
        clearCopiedSoon();
      } catch {
        setCopied(null);
      }
    },
    [clearCopiedSoon],
  );

  const onCopySummary = useCallback(() => {
    if (!selected) return;
    void copyText(buildBringResultSummaryText(selected), "summary");
  }, [copyText, selected]);

  const onCopyLink = useCallback(() => {
    if (typeof window === "undefined") return;
    const qs = serializeBringCheckerQuery(state);
    const url = qs
      ? `${window.location.origin}${pathname}?${qs}`
      : `${window.location.origin}${pathname}`;
    void copyText(url, "link");
  }, [copyText, state, pathname]);

  useEffect(() => {
    return () => {
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
    };
  }, []);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <Callout variant="warning" title="Disclaimer" className="max-w-full">
        <p className="article-body-sm leading-relaxed">{BRING_CHECKER_DISCLAIMER}</p>
      </Callout>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,22rem)] lg:items-start xl:gap-10">
        <div className="min-w-0 space-y-5">
          <div>
            <label className={controlLabel} htmlFor="bring-search">
              Search categories
            </label>
            <input
              id="bring-search"
              type="search"
              value={state.q}
              onChange={(e) =>
                setState((s) => ({ ...s, q: e.target.value }))
              }
              placeholder="e.g. meat, ADHD, power bank"
              autoComplete="off"
              className="w-full rounded-md border border-paper-edge bg-paper px-3 py-2.5 font-sans text-sm text-dark placeholder:text-muted/80 focus:border-maroon/40 focus:outline-none focus:ring-1 focus:ring-maroon/25"
            />
          </div>

          <section aria-labelledby="categories-heading">
            <h2
              id="categories-heading"
              className="editorial-heading mb-3 text-lg text-dark sm:text-xl"
            >
              Categories
            </h2>
            {filtered.length === 0 ? (
              <p className="article-body-sm text-muted">
                No categories match that search. Try a shorter word like
                &quot;med&quot; or &quot;food&quot;.
              </p>
            ) : (
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {filtered.map((c) => {
                  const on = state.categoryId === c.id;
                  return (
                    <li key={c.id}>
                      <button
                        type="button"
                        onClick={() => selectCategory(c.id)}
                        aria-pressed={on}
                        className={`flex w-full flex-col rounded-lg border p-4 text-left shadow-editorial transition-colors duration-150 ${
                          on
                            ? "border-maroon bg-maroon/10 ring-1 ring-maroon/25"
                            : "border-paper-edge bg-paper-card hover:border-rust/40"
                        }`}
                      >
                        <span className="font-display text-base font-bold text-dark sm:text-lg">
                          {c.label}
                        </span>
                        <span
                          className={`mt-2 inline-flex w-fit rounded px-2 py-0.5 font-sans text-[0.65rem] font-bold uppercase tracking-widest ${statusBadgeClass[c.status]}`}
                        >
                          {STATUS_LABELS[c.status]}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>

        <aside className="min-w-0 space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-lg border border-paper-edge bg-paper-card p-5 shadow-editorial sm:p-6">
            <h2 className="font-display text-lg font-bold italic text-dark sm:text-xl">
              Result
            </h2>
            {!selected ? (
              <p className="article-body-sm mt-3 text-muted">
                Choose a category from the list, or narrow the cards with search.
                Your selection can also load from a shared link.
              </p>
            ) : (
              <div className="mt-4 space-y-5">
                <div>
                  <p className="font-sans text-xs font-bold uppercase tracking-widest text-muted">
                    Category
                  </p>
                  <p className="font-display text-xl font-bold text-dark">
                    {selected.label}
                  </p>
                  <p
                    className={`mt-2 inline-flex rounded px-2.5 py-1 font-sans text-xs font-bold uppercase tracking-widest ${statusBadgeClass[selected.status]}`}
                  >
                    {STATUS_LABELS[selected.status]}
                  </p>
                </div>
                <div>
                  <p className="font-sans text-xs font-bold uppercase tracking-widest text-rust">
                    Explanation
                  </p>
                  <p className="article-body-sm mt-1.5 leading-relaxed text-muted">
                    {selected.explanation}
                  </p>
                </div>
                <div>
                  <p className="font-sans text-xs font-bold uppercase tracking-widest text-rust">
                    What to prepare
                  </p>
                  <p className="article-body-sm mt-1.5 leading-relaxed text-muted">
                    {selected.whatToPrepare}
                  </p>
                </div>
                <div>
                  <p className="font-sans text-xs font-bold uppercase tracking-widest text-rust">
                    Common mistake
                  </p>
                  <p className="article-body-sm mt-1.5 leading-relaxed text-muted">
                    {selected.commonMistake}
                  </p>
                </div>
                <div>
                  <p className="font-sans text-xs font-bold uppercase tracking-widest text-rust">
                    Official source reminder
                  </p>
                  <p className="article-body-sm mt-1.5 leading-relaxed text-muted">
                    {selected.officialReminder}
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-col gap-2 border-t border-paper-edge pt-5 sm:flex-row">
              <button
                type="button"
                className={actionBtn}
                onClick={onCopySummary}
                disabled={!selected}
              >
                Copy result summary
              </button>
              <button type="button" className={actionBtn} onClick={onCopyLink}>
                Copy share link
              </button>
            </div>
            <p
              className="mt-2 min-h-[1.25rem] font-sans text-xs font-semibold text-maroon"
              aria-live="polite"
            >
              {copied === "summary" ? "Copied result summary." : null}
              {copied === "link" ? "Copied link." : null}
            </p>
          </div>

          <div className="rounded-lg border border-paper-edge bg-paper-elevated/70 p-5 shadow-inner sm:p-6">
            <p className="font-display text-base font-bold text-dark">
              Read next
            </p>
            <ul className="mt-3 flex flex-col gap-2 font-sans text-sm font-semibold">
              <li>
                <Link
                  href="/guides/japan-packing-list"
                  className="text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
                >
                  Japan packing list →
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/japan-packing-generator"
                  className="text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
                >
                  Japan packing generator →
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/japan-airport-first-steps"
                  className="text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
                >
                  Japan airport first steps →
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/japan-convenience-store-guide"
                  className="text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
                >
                  Japan convenience store guide →
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

function CheckerFallback() {
  return (
    <div
      className="rounded-lg border border-paper-edge bg-paper-card/80 p-8 text-center shadow-editorial"
      aria-busy="true"
    >
      <p className="font-serif text-muted">Loading checker…</p>
    </div>
  );
}

export function CanIBringThisToJapanChecker() {
  return (
    <Suspense fallback={<CheckerFallback />}>
      <CanIBringThisToJapanCheckerClient />
    </Suspense>
  );
}
