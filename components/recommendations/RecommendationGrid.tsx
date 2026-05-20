import type { ReactNode } from "react";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { RecommendationItemHeader } from "@/components/recommendations/RecommendationItemHeader";
import {
  VARIANT_KICKER,
  recommendationGridShell,
} from "@/components/recommendations/recommendation-styles";
import {
  getRecommendationsByIds,
  getRecommendationsForPlacement,
  type RecommendationPlacementKey,
  type ResolvedRecommendation,
} from "@/lib/recommendations";

export type RecommendationGridProps = {
  title: string;
  intro?: string;
  /** GA4 context slug, e.g. `japan-packing-list`. */
  context: string;
  /** Catalog ids in display order. */
  ids?: readonly string[];
  /** Shorthand for ids from `RECOMMENDATION_PLACEMENTS`. */
  placement?: RecommendationPlacementKey;
  note?: ReactNode;
  showDisclosure?: boolean;
  className?: string;
};

function GridItem({
  item,
  context,
}: {
  item: ResolvedRecommendation;
  context: string;
}) {
  const kicker = VARIANT_KICKER[item.variant];

  return (
    <li className="border-t border-paper-edge/70 pt-4 first:border-t-0 first:pt-0">
      <div className="mb-1 flex flex-wrap items-center gap-2">
        {kicker ? (
          <span className="font-sans text-[0.6rem] font-bold uppercase tracking-widest text-muted">
            {kicker}
          </span>
        ) : null}
        {item.categoryLabel ? (
          <span className="font-sans text-[0.6rem] font-bold uppercase tracking-widest text-rust/80">
            {item.categoryLabel}
          </span>
        ) : null}
      </div>
      <div className="mb-1">
        <RecommendationItemHeader item={item} context={context} />
      </div>
      <p className="article-body-sm text-muted">{item.operationalReason}</p>
      {item.bestFor ? (
        <p className="article-body-sm mt-1.5 text-muted">
          <span className="font-sans font-bold text-dark">Best for: </span>
          {item.bestFor}
        </p>
      ) : null}
      {item.avoidIf ? (
        <p className="article-body-sm mt-1 text-muted">
          <span className="font-sans font-bold text-dark">Avoid if: </span>
          {item.avoidIf}
        </p>
      ) : null}
      {item.note ? (
        <p className="article-body-sm mt-2 text-muted/85">{item.note}</p>
      ) : null}
    </li>
  );
}

export function RecommendationGrid({
  title,
  intro = "Practical gear and tools that solve common problems on the ground. Calm picks, not a shopping list.",
  context,
  ids,
  placement,
  note,
  showDisclosure = true,
  className = "",
}: RecommendationGridProps) {
  const items = placement
    ? getRecommendationsForPlacement(placement)
    : getRecommendationsByIds(ids ?? []);

  if (!items.length) {
    return null;
  }

  return (
    <aside
      className={`${recommendationGridShell} ${className}`.trim()}
      aria-label={title}
      data-recommendation-context={context}
    >
      <h2 className="editorial-heading mb-2 text-xl sm:text-2xl">{title}</h2>
      <p className="article-body mb-5 text-muted">{intro}</p>

      <ol className="list-none space-y-4 pl-0">
        {items.map((item) => (
          <GridItem key={item.id} item={item} context={context} />
        ))}
      </ol>

      {note ? <p className="article-body-sm mt-5 text-muted">{note}</p> : null}

      {showDisclosure ? <AffiliateDisclosure /> : null}
    </aside>
  );
}
