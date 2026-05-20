import { RecommendationItemHeader } from "@/components/recommendations/RecommendationItemHeader";
import {
  VARIANT_KICKER,
  recommendationShellBase,
  variantShellClass,
} from "@/components/recommendations/recommendation-styles";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import {
  getRecommendationById,
  type ResolvedRecommendation,
} from "@/lib/recommendations";

export type RecommendationBoxProps = {
  item: ResolvedRecommendation;
  /** GA4 `recommendation_click` context, e.g. `japan-packing-list`. */
  context: string;
  showDisclosure?: boolean;
  className?: string;
};

function MetaLine({ label, value }: { label: string; value: string }) {
  return (
    <p className="article-body-sm text-muted">
      <span className="font-sans font-bold text-dark">{label}: </span>
      {value}
    </p>
  );
}

export function RecommendationBox({
  item,
  context,
  showDisclosure = false,
  className = "",
}: RecommendationBoxProps) {
  const kicker = VARIANT_KICKER[item.variant];

  return (
    <aside
      className={`${recommendationShellBase} ${variantShellClass(item.variant)} ${className}`.trim()}
      aria-label={item.title}
      data-recommendation-variant={item.variant}
    >
      <div className="mb-2 flex flex-wrap items-center gap-2">
        {kicker ? (
          <p className="font-sans text-[0.65rem] font-bold uppercase tracking-widest text-muted">
            {kicker}
          </p>
        ) : null}
        {item.categoryLabel ? (
          <p className="font-sans text-[0.65rem] font-bold uppercase tracking-widest text-rust/90">
            {item.categoryLabel}
          </p>
        ) : null}
      </div>

      <RecommendationItemHeader item={item} context={context} />

      <p className="article-body mt-2 text-muted">{item.operationalReason}</p>

      {item.bestFor ? <MetaLine label="Best for" value={item.bestFor} /> : null}
      {item.avoidIf ? (
        <p className="article-body-sm mt-2 text-muted">
          <span className="font-sans font-bold text-dark">Avoid if: </span>
          {item.avoidIf}
        </p>
      ) : null}
      {item.note ? (
        <p className="article-body-sm mt-3 text-muted/90">{item.note}</p>
      ) : null}

      {showDisclosure ? <AffiliateDisclosure /> : null}
    </aside>
  );
}

export type RecommendationBoxFromIdProps = {
  id: string;
  context: string;
  showDisclosure?: boolean;
  className?: string;
};

export function RecommendationBoxFromId({
  id,
  context,
  showDisclosure,
  className,
}: RecommendationBoxFromIdProps) {
  const item = getRecommendationById(id);
  if (!item) {
    return null;
  }
  return (
    <RecommendationBox
      item={item}
      context={context}
      showDisclosure={showDisclosure}
      className={className}
    />
  );
}
