"use client";

import Image from "next/image";
import type { GuideCardItem } from "@/lib/guide-card-item";
import { TrackedCtaLink } from "@/components/TrackedCtaLink";

type PopularGuideCardProps = {
  item: GuideCardItem;
};

export function PopularGuideCard({ item }: PopularGuideCardProps) {
  return (
    <TrackedCtaLink
      href={item.href}
      label={item.gtagLabel}
      prefetch
      className="editorial-card group flex h-full flex-col overflow-hidden"
    >
      <div className="relative aspect-[5/3] overflow-hidden border-b border-paper-edge bg-paper-elevated">
        <Image
          src={item.imageSrc}
          alt={item.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="hero-image object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="editorial-kicker mb-2">{item.category}</p>
        <h3 className="editorial-heading mb-2 text-ink">{item.title}</h3>
        <p className="article-body flex-1">{item.description}</p>
        <span className="editorial-chevron-link mt-4 font-sans text-nav font-bold uppercase tracking-wide text-rust transition-colors group-hover:text-maroon">
          Read guide
        </span>
      </div>
    </TrackedCtaLink>
  );
}
