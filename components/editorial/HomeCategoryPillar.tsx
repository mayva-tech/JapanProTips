import type { ReactNode } from "react";
import { MagazineSectionTitle } from "@/components/editorial/MagazineSectionTitle";

type HomeCategoryPillarProps = {
  title: string;
  description?: string;
  browseHref?: string;
  browseLabel?: string;
  children: ReactNode;
  className?: string;
};

/** AoM "Get Style" style content pillar block. */
export function HomeCategoryPillar({
  title,
  description,
  browseHref,
  browseLabel,
  children,
  className = "",
}: HomeCategoryPillarProps) {
  return (
    <section className={`mb-12 sm:mb-14 ${className}`.trim()}>
      <MagazineSectionTitle
        title={title}
        browseHref={browseHref}
        browseLabel={browseLabel}
      />
      {description ? (
        <p className="article-body mb-6 max-w-none lg:max-w-2xl">{description}</p>
      ) : null}
      {children}
    </section>
  );
}
