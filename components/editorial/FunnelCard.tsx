import Image from "next/image";
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
  imageAlt?: string;
};

export function FunnelCard({
  eyebrow,
  title,
  description,
  cta,
  href,
  gtagLabel,
  featured = false,
  imageSrc,
  imageAlt,
}: FunnelCardProps) {
  return (
    <TrackedCtaLink
      href={href}
      label={gtagLabel}
      className={`editorial-card group flex h-full flex-col overflow-hidden ${
        imageSrc ? "" : "p-6 sm:p-7"
      } ${featured && !imageSrc ? "sm:p-8" : ""}`}
    >
      {imageSrc && imageAlt ? (
        <div
          className={`relative overflow-hidden border-b border-paper-edge bg-paper-elevated ${
            featured ? "aspect-[16/10]" : "aspect-[5/3]"
          }`}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes={
              featured
                ? "(max-width: 1024px) 100vw, 50vw"
                : "(max-width: 640px) 100vw, 33vw"
            }
            className="hero-image object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        </div>
      ) : null}
      <div
        className={`flex flex-1 flex-col ${imageSrc ? "p-6 sm:p-7" : ""} ${
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
      </div>
    </TrackedCtaLink>
  );
}
