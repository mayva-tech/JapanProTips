import type { ReactNode } from "react";
import Link from "next/link";
import type { ConversionGtagLabel } from "@/lib/gtag-events";
import { TrackedCtaLink } from "@/components/TrackedCtaLink";

export type InlineAffiliateProps = {
  /** Short line of copy (use instead of children for simple text) */
  text?: string;
  children?: ReactNode;
  buttonText: string;
  link: string;
  className?: string;
  /** When set, fires GA4 `click` with this label on CTA tap. */
  gtagLabel?: ConversionGtagLabel;
};

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

const wrapClass =
  "not-prose my-4 max-w-full rounded-lg border border-[#d4c9b0] bg-white px-4 py-3 shadow-sm";
const copyClass =
  "article-body-sm";
const btnClass =
  "inline-flex w-full shrink-0 items-center justify-center rounded-md bg-maroon px-4 py-2 font-sans text-sm font-bold uppercase tracking-widest text-white transition-colors duration-150 hover:bg-rust sm:w-auto";

/**
 * Compact offer block for guides. Place between block elements, not nested inside a paragraph.
 */
export function InlineAffiliate({
  text,
  children,
  buttonText,
  link,
  className = "",
  gtagLabel,
}: InlineAffiliateProps) {
  const body = children ?? text;
  if (body == null) return null;

  const cta = gtagLabel ? (
    <TrackedCtaLink
      href={link}
      label={gtagLabel}
      className={btnClass}
      rel={
        isExternalHref(link)
          ? "noopener noreferrer nofollow sponsored"
          : undefined
      }
      target={isExternalHref(link) ? "_blank" : undefined}
    >
      {buttonText}
    </TrackedCtaLink>
  ) : isExternalHref(link) ? (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer nofollow sponsored"
      className={btnClass}
    >
      {buttonText}
    </a>
  ) : (
    <Link href={link} className={btnClass}>
      {buttonText}
    </Link>
  );

  return (
    <aside className={`${wrapClass} ${className}`.trim()} aria-label="Partner offer">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <span className={copyClass}>{body}</span>
        {cta}
      </div>
    </aside>
  );
}
