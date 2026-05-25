"use client";

import Link from "next/link";
import {
  RESIDENT_STARTER_PATH_ITEMS,
  type ResidentStarterPathItem,
} from "@/lib/resident-starter-path";
import {
  residentStarterPathGtagLabel,
  trackResidentStarterPathClick,
  trackToolClick,
  toolClickGtagLabel,
} from "@/lib/gtag-events";

export type ResidentStarterPathProps = {
  /** GA4 context: `residents-hub`, `resident-starter-path`, etc. */
  sourceSlug: string;
  variant?: "hub" | "compact";
  /** Hide this href in compact mode (you are already on it). */
  currentHref?: string;
  headingId?: string;
  className?: string;
};

function isToolHref(href: string): boolean {
  return href.startsWith("/tools");
}

function StarterPathLink({
  item,
  sourceSlug,
  className,
}: {
  item: ResidentStarterPathItem;
  sourceSlug: string;
  className: string;
}) {
  const dataLabel = isToolHref(item.href)
    ? toolClickGtagLabel(sourceSlug, item.href)
    : residentStarterPathGtagLabel(sourceSlug, item.href);

  const onClick = () => {
    if (isToolHref(item.href)) {
      trackToolClick(sourceSlug, item.href);
    } else {
      trackResidentStarterPathClick(sourceSlug, item.href);
    }
  };

  return (
    <Link
      href={item.href}
      className={className}
      data-cta-label={dataLabel}
      onClick={onClick}
    >
      {item.cta}
    </Link>
  );
}

export function ResidentStarterPath({
  sourceSlug,
  variant = "compact",
  currentHref,
  headingId = "resident-starter-path-heading",
  className = "",
}: ResidentStarterPathProps) {
  const items = RESIDENT_STARTER_PATH_ITEMS.filter(
    (item) => item.href !== currentHref,
  );

  if (variant === "hub") {
    return (
      <section
        className={`mb-6 ${className}`.trim()}
        aria-labelledby={headingId}
      >
        <p className="editorial-kicker mb-2">New in Japan</p>
        <h2 id={headingId} className="editorial-heading mb-3">
          Moving to Japan starter path
        </h2>
        <p className="article-body mb-6 max-w-2xl">
          Work this order in month one: checklist and budget first, then housing,
          insurance, and bills. Each step links to a focused guide or tool.
        </p>
        <ol className="grid list-none gap-4 pl-0 sm:grid-cols-2">
          {RESIDENT_STARTER_PATH_ITEMS.map((item, index) => (
            <li key={item.href}>
              <article className="editorial-card flex h-full flex-col p-5 sm:p-6">
                <p className="mb-2 font-sans text-xs font-bold uppercase tracking-widest text-rust">
                  Step {index + 1}
                </p>
                <h3 className="editorial-heading mb-2 text-lg text-ink">
                  {item.title}
                </h3>
                <p className="article-body mb-4 flex-1 text-sm text-muted">
                  {item.description}
                </p>
                <StarterPathLink
                  item={item}
                  sourceSlug={sourceSlug}
                  className="editorial-btn-card mt-auto text-sm"
                />
              </article>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <aside
      className={`mb-6 max-w-2xl rounded-lg border border-paper-edge bg-paper-card px-5 py-5 shadow-editorial sm:px-6 ${className}`.trim()}
      aria-labelledby={headingId}
    >
      <h2
        id={headingId}
        className="font-display text-xl tracking-wide text-dark sm:text-2xl"
      >
        Moving to Japan starter path
      </h2>
      <p className="article-body-sm mb-4 mt-2 text-muted">
        Month-one order. Open another step when you are ready.
      </p>
      <ul className="list-none space-y-3 pl-0">
        {items.map((item) => (
          <li
            key={item.href}
            className="border-t border-paper-edge/70 pt-3 first:border-t-0 first:pt-0"
          >
            <p className="font-sans text-sm font-bold text-dark">{item.title}</p>
            <p className="article-body-sm mb-2 text-muted">{item.description}</p>
            <StarterPathLink
              item={item}
              sourceSlug={sourceSlug}
              className="font-sans text-sm font-bold text-rust hover:text-maroon"
            />
          </li>
        ))}
      </ul>
    </aside>
  );
}
