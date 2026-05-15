"use client";

import Link from "next/link";
import type { ConversionGtagLabel } from "@/lib/gtag-events";
import { conversionLabelForHref, trackGtagClick } from "@/lib/gtag-events";

export type ComparisonRow = {
  name: string;
  price: string;
  pros: string;
  bestFor: string;
  link: string;
  /** Label for the row CTA; defaults to "Open" */
  buttonText?: string;
  /** GA4 click label; defaults from `link` via `conversionLabelForHref`. */
  gtagLabel?: ConversionGtagLabel;
};

export type ComparisonTableProps = {
  items: ComparisonRow[];
  className?: string;
};

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

const cellTh =
  "border-b border-[#d4c9b0] bg-cream px-4 py-3 text-left font-sans text-xs font-bold uppercase tracking-wider text-dark";
const cellTd =
  "border-b border-[#e8e0d0] px-4 py-3 align-top font-serif text-sm leading-relaxed text-muted";
const btnClass =
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-lg bg-maroon px-4 py-2 font-sans text-xs font-bold uppercase tracking-widest text-white transition-colors duration-150 hover:bg-rust";

function RowButton({
  href,
  label,
  gtagLabel,
}: {
  href: string;
  label: string;
  gtagLabel: ConversionGtagLabel;
}) {
  const onClick = () => trackGtagClick(gtagLabel);

  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={btnClass}
        onClick={onClick}
      >
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={btnClass} onClick={onClick}>
      {label}
    </Link>
  );
}

export function ComparisonTable({ items, className = "" }: ComparisonTableProps) {
  return (
    <div
      className={`overflow-x-auto rounded-xl border border-[#d4c9b0] bg-white shadow-sm [-webkit-overflow-scrolling:touch] ${className}`.trim()}
    >
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr>
            <th className={cellTh}>Name</th>
            <th className={cellTh}>Price</th>
            <th className={cellTh}>Pros</th>
            <th className={cellTh}>Best for</th>
            <th className={`${cellTh} w-px`} aria-label="Action" />
          </tr>
        </thead>
        <tbody>
          {items.map((row, index) => (
            <tr key={`${row.link}-${index}`} className="hover:bg-cream/60">
              <td className={`${cellTd} font-sans font-bold text-dark`}>
                {row.name}
              </td>
              <td className={`${cellTd} font-sans text-dark`}>{row.price}</td>
              <td className={cellTd}>{row.pros}</td>
              <td className={cellTd}>{row.bestFor}</td>
              <td className={`${cellTd} text-right`}>
                <RowButton
                  href={row.link}
                  label={row.buttonText ?? "Open"}
                  gtagLabel={row.gtagLabel ?? conversionLabelForHref(row.link)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
