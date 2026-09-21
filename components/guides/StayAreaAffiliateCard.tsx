"use client";

import Image from "next/image";
import { trackGtagClick } from "@/lib/gtag-events";

export type StayAreaAffiliateCardProps = {
  href: string;
  imageSrc: string;
  imageAlt: string;
  name: string;
  caption: string;
  cta: string;
};

export function StayAreaAffiliateCard({
  href,
  imageSrc,
  imageAlt,
  name,
  caption,
  cta,
}: StayAreaAffiliateCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      onClick={() => trackGtagClick("hotel")}
      className="editorial-card group flex h-full flex-col overflow-hidden no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon/40"
    >
      <div className="relative aspect-video overflow-hidden border-b border-paper-edge bg-paper-elevated">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="hero-image object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="editorial-heading mb-2 text-ink">{name}</h3>
        <p className="article-body flex-1 text-muted">{caption}</p>
        <span className="editorial-chevron-link mt-4 font-sans text-nav font-bold uppercase tracking-wide text-rust transition-colors group-hover:text-maroon">
          {cta}
        </span>
      </div>
    </a>
  );
}
