import { TrackedRecommendationLink } from "@/components/recommendations/TrackedRecommendationLink";
import type { ResolvedRecommendation } from "@/lib/recommendations";

const titleClass = "font-display text-lg tracking-wide text-dark sm:text-xl";
const titlePlainClass = "font-display text-lg font-semibold tracking-wide text-dark sm:text-xl";
const fallbackLinkClass =
  "font-sans text-sm font-bold text-rust hover:text-maroon transition-colors duration-150";
const checklistHintClass = "article-body-sm mt-1.5 text-muted italic";

export type RecommendationItemHeaderProps = {
  item: ResolvedRecommendation;
  context: string;
  /** When true, title is the primary link (affiliate). When false, title is plain text above the CTA line. */
  titleAsPrimaryLink?: boolean;
};

export function RecommendationItemHeader({
  item,
  context,
  titleAsPrimaryLink = true,
}: RecommendationItemHeaderProps) {
  const { cta } = item;

  if (cta.kind === "affiliate" && cta.href) {
    return (
      <h3 className={titleClass}>
        <TrackedRecommendationLink
          href={cta.href}
          recommendationId={item.id}
          context={context}
        >
          {item.title}
        </TrackedRecommendationLink>
      </h3>
    );
  }

  if (cta.kind === "guide" && cta.href) {
    return (
      <div>
        <p className={titlePlainClass}>{item.title}</p>
        <p className="mt-1.5">
          <TrackedRecommendationLink
            href={cta.href}
            recommendationId={item.id}
            context={context}
            className={fallbackLinkClass}
          >
            {cta.label}
          </TrackedRecommendationLink>
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className={titlePlainClass}>{item.title}</p>
      <p className={checklistHintClass}>{cta.label}</p>
    </div>
  );
}
