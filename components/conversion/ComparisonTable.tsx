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
  buttonText?: string;
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
  "border-b border-paper-edge bg-paper-elevated px-4 py-3 text-left font-sans text-kicker font-black uppercase text-maroon";
const cellTd =
  "border-b border-paper-edge/60 px-4 py-3 align-top font-serif text-body text-muted";

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
  const className =
    "inline-flex shrink-0 items-center justify-center whitespace-nowrap bg-maroon px-4 py-2 font-sans text-kicker font-black uppercase text-white transition-colors duration-150 hover:bg-rust";

  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
      >
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick}>
      {label}
    </Link>
  );
}

export function ComparisonTable({ items, className = "" }: ComparisonTableProps) {
  return (
    <div
      className={`overflow-x-auto rounded-xl border border-maroon/20 bg-paper-card shadow-editorial [-webkit-overflow-scrolling:touch] ${className}`.trim()}
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
            <tr key={`${row.link}-${index}`} className="hover:bg-paper-elevated/80">
              <td className={`${cellTd} font-sans font-bold text-maroon`}>
                {row.name}
              </td>
              <td className={`${cellTd} font-sans font-bold text-rust`}>
                {row.price}
              </td>
              <td className={cellTd}>{row.pros}</td>
              <td className={`${cellTd} text-ink`}>{row.bestFor}</td>
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
