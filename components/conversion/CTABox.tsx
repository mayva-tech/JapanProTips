import Link from "next/link";
import type { ConversionGtagLabel } from "@/lib/gtag-events";
import { TrackedCtaLink } from "@/components/TrackedCtaLink";

export type CTABoxProps = {
  title: string;
  description: string;
  buttonText: string;
  link: string;
  className?: string;
  /** When set, fires GA4 `click` with this label on CTA tap. */
  gtagLabel?: ConversionGtagLabel;
};

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

const cardClass =
  "rounded-xl border border-[#d4c9b0] bg-white px-6 py-6 shadow-sm";
const btnClass =
  "inline-flex w-full items-center justify-center rounded-lg bg-maroon px-6 py-3.5 font-sans text-base font-bold uppercase tracking-widest text-white transition-colors duration-150 hover:bg-rust sm:w-auto sm:min-w-[200px]";

export function CTABox({
  title,
  description,
  buttonText,
  link,
  className = "",
  gtagLabel,
}: CTABoxProps) {
  return (
    <div className={`${cardClass} ${className}`.trim()}>
      <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-dark">
        {title}
      </h3>
      <p className="article-body mt-3">
        {description}
      </p>
      <div className="mt-5 sm:inline-block sm:w-auto">
        {gtagLabel ? (
          <TrackedCtaLink
            href={link}
            label={gtagLabel}
            className={btnClass}
            rel={
              isExternalHref(link)
                ? "noopener noreferrer"
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
            rel="noopener noreferrer"
            className={btnClass}
          >
            {buttonText}
          </a>
        ) : (
          <Link href={link} className={btnClass}>
            {buttonText}
          </Link>
        )}
      </div>
    </div>
  );
}
