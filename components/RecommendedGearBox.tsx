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
  "not-prose my-10 max-w-2xl overflow-hidden rounded-xl border border-maroon/25 bg-gradient-to-br from-paper-card via-paper-elevated to-[#efe2d6] px-5 py-5 shadow-editorial sm:px-6 sm:py-6";
const itemClass =
  "relative overflow-hidden rounded-lg border border-paper-edge/80 bg-paper-card px-4 py-4 shadow-sm transition-colors duration-150 hover:border-rust/45 sm:px-5";
const badgeClass =
  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-maroon font-sans text-xs font-black text-paper-card shadow-sm";
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
      <p className="mb-2 font-sans text-xs font-black uppercase tracking-widest text-rust">
        Recommended gear
      </p>
      <h2 className="editorial-heading mb-3 text-xl text-maroon sm:text-2xl">
        {title}
      </h2>
      <p className="article-body mb-5 text-muted">{intro}</p>

      <ol className="list-none space-y-4 pl-0">
        {visibleItems.map((item, index) => (
          <li key={`${item.name}-${index}`} className={itemClass}>
            <span className="absolute inset-y-0 left-0 w-1 bg-rust" aria-hidden />
            <div className="flex gap-3">
              <span className={badgeClass}>{index + 1}</span>
              <div className="min-w-0">
                <div className="mb-1.5">
                  <TrackedAffiliateRecommendationLink
                    box="gear"
                    name={item.name}
                    href={item.href}
                    linkId={item.linkId}
                  />
                </div>
                <p className="article-body-sm text-muted">
                  <span className="font-sans font-bold text-maroon">
                    Why it matters:{" "}
                  </span>
                  {item.reason}
                </p>
              </div>
            </div>
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
