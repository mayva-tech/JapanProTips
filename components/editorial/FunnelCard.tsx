import type { ConversionGtagLabel } from "@/lib/gtag-events";
import { TrackedCtaLink } from "@/components/TrackedCtaLink";

export type FunnelCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  gtagLabel: ConversionGtagLabel;
  featured?: boolean;
  imageSrc?: string;
};

export function FunnelCard({
  eyebrow,
  title,
  description,
  cta,
  href,
  gtagLabel,
  featured = false,
}: FunnelCardProps) {
  return (
    <TrackedCtaLink
      href={href}
      label={gtagLabel}
      className={`editorial-card group flex h-full flex-col p-6 sm:p-7 ${
        featured ? "sm:p-8" : ""
      }`}
    >
      <p className="editorial-kicker mb-2">{eyebrow}</p>
      <h3
        className={`editorial-heading mb-3 text-ink ${
          featured ? "sm:text-h2-lg" : ""
        }`}
      >
        {title}
      </h3>
      <p
        className={`article-body mb-6 flex-1 ${
          featured ? "sm:text-lead" : ""
        }`}
      >
        {description}
      </p>
      <span className="editorial-btn-card mt-auto">{cta}</span>
    </TrackedCtaLink>
  );
}
