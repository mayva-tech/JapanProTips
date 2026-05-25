import type { ReactNode } from "react";
import { HeroIntroGroup, HeroTitleGroup } from "@/components/editorial/hero-blocks";
import { PageHero } from "@/components/editorial/PageHero";
import { cn } from "@/lib/utils";

export type ArticleHeroImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type ArticleHeroProps = {
  title: ReactNode;
  intro?: ReactNode;
  heroImage?: ArticleHeroImage;
  /** Paper layout only; spacing below the header block */
  className?: string;
  priority?: boolean;
};

/**
 * Guide, article, and landing page hero: image overlay with text strips,
 * or paper header when no image is provided.
 */
export function ArticleHero({
  title,
  intro,
  heroImage,
  className,
  priority = false,
}: ArticleHeroProps) {
  if (heroImage) {
    return (
      <PageHero
        src={heroImage.src}
        alt={heroImage.alt}
        caption={heroImage.caption}
        variant="article"
        priority={priority}
        className={className}
      >
        <HeroTitleGroup>{title}</HeroTitleGroup>
        {intro ? <HeroIntroGroup className="mt-3 sm:mt-4">{intro}</HeroIntroGroup> : null}
      </PageHero>
    );
  }

  return (
    <header className={cn("mb-6", className)}>
      {title}
      {intro ? (
        <div className="editorial-deck mt-6 max-w-2xl space-y-4">{intro}</div>
      ) : null}
    </header>
  );
}
