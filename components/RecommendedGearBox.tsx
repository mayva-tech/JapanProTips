import type { ReactNode } from "react";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { TrackedAffiliateRecommendationLink } from "@/components/TrackedAffiliateRecommendationLink";
import type { AffiliateLinkId } from "@/lib/affiliate-links";
import { getRecommendedGearPreset } from "@/lib/recommended-gear-presets";

export { AFFILIATE_LINK_PLACEHOLDER } from "@/lib/affiliate-links";
export { RECOMMENDATION_AFFILIATE_DISCLOSURE } from "@/lib/editorial-copy";

export const RECOMMENDED_GEAR_DEFAULT_INTRO =
  "These are practical items that solve common problems travelers run into in Japan.";

export type RecommendedGearItem = {
  name: string;
  reason: string;
  href: string;
  /** Set when resolved from presets; used for GA4 affiliate click labels. */
  linkId?: AffiliateLinkId;
};

export type RecommendedGearBoxProps = {
  title: string;
  intro?: string;
  /** Inline list for TSX pages. Prefer `gearId` in MDX when inline arrays are not passed through. */
  items?: RecommendedGearItem[];
  /** Loads items from `lib/recommended-gear-presets.ts` (used by MDX guides). */
  gearId?: string;
  note?: ReactNode;
  className?: string;
  /** Set false when another block nearby already shows the shared disclosure. */
  showDisclosure?: boolean;
};

const MIN_ITEMS = 4;
const MAX_ITEMS = 6;

const boxClass =
  "not-prose my-10 max-w-2xl rounded-lg border border-[#d4c9b0] bg-paper-elevated px-5 py-5 sm:px-6 sm:py-6";
/**
 * Editorial gear list for guides. Use between block elements, not inside a paragraph.
 * Pass 4-6 items with practical reasons; use [affiliate-link-here] until links are live.
 */
export function RecommendedGearBox({
  title,
  intro = RECOMMENDED_GEAR_DEFAULT_INTRO,
  items,
  gearId,
  note,
  className = "",
  showDisclosure = true,
}: RecommendedGearBoxProps) {
  const resolvedItems =
    items ?? (gearId ? getRecommendedGearPreset(gearId) : undefined) ?? [];

  if (process.env.NODE_ENV !== "production") {
    if (resolvedItems.length < MIN_ITEMS || resolvedItems.length > MAX_ITEMS) {
      console.warn(
        `RecommendedGearBox "${title}" expects ${MIN_ITEMS}-${MAX_ITEMS} items; received ${resolvedItems.length}.`,
      );
    }
  }

  if (!resolvedItems.length) {
    return null;
  }

  const visibleItems = resolvedItems.slice(0, MAX_ITEMS);

  return (
    <aside
      className={`${boxClass} ${className}`.trim()}
      aria-label={title}
    >
      <h2 className="editorial-heading mb-3 text-xl sm:text-2xl">{title}</h2>
      <p className="article-body mb-5 text-muted">{intro}</p>

      <ol className="list-none space-y-5 pl-0">
        {visibleItems.map((item, index) => (
          <li key={`${item.name}-${index}`} className="border-t border-[#d4c9b0] pt-4 first:border-t-0 first:pt-0">
            <div className="mb-1.5">
              <TrackedAffiliateRecommendationLink
                box="gear"
                name={item.name}
                href={item.href}
                linkId={item.linkId}
              />
            </div>
            <p className="article-body-sm text-muted">{item.reason}</p>
          </li>
        ))}
      </ol>

      {note ? (
        <p className="article-body-sm mt-5 text-muted">{note}</p>
      ) : null}

      {showDisclosure ? <AffiliateDisclosure /> : null}
    </aside>
  );
}
