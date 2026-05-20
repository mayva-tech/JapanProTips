import { RecommendationItemHeader } from "@/components/recommendations/RecommendationItemHeader";
import { recommendationShellBase, variantShellClass } from "@/components/recommendations/recommendation-styles";
import { getRecommendationById } from "@/lib/recommendations";

export type RecommendationInlineProps = {
  id: string;
  context: string;
  className?: string;
};

/**
 * Single recommendation for use inside article prose (one calm callout line).
 */
export function RecommendationInline({
  id,
  context,
  className = "",
}: RecommendationInlineProps) {
  const item = getRecommendationById(id);
  if (!item) {
    return null;
  }

  return (
    <p
      className={`${recommendationShellBase} ${variantShellClass(item.variant)} my-6 max-w-2xl text-sm ${className}`.trim()}
      data-recommendation-context={context}
      data-recommendation-id={item.id}
    >
      <RecommendationItemHeader item={item} context={context} />
      <span className="article-body-sm mt-2 block text-muted">
        {item.operationalReason}
      </span>
    </p>
  );
}
