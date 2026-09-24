import type { ReactNode } from "react";
import { TrackedNextStepGuideLink } from "@/components/TrackedNextStepGuideLink";
import { getNextStepGuidePreset } from "@/lib/next-step-guide-presets";

export const NEXT_STEP_GUIDES_DEFAULT_TITLE = "Recommended Next Steps";

export const NEXT_STEP_GUIDES_DEFAULT_INTRO =
  "If this guide helped, these are the next practical guides to read.";

export type NextStepGuideLabel =
  | "Start here"
  | "Next"
  | "Related"
  | "Before you go"
  | "Resident setup";

export type NextStepGuideItem = {
  title: string;
  href: string;
  reason: string;
  label?: NextStepGuideLabel | string;
};

export type NextStepGuidesProps = {
  title?: string;
  intro?: string;
  /** Inline list for TSX pages. Prefer `guideId` in MDX when inline arrays are not passed through. */
  items?: NextStepGuideItem[];
  /** Loads items from `lib/next-step-guide-presets.ts` (used by MDX guides). */
  guideId?: string;
  note?: ReactNode;
  className?: string;
};

const MIN_ITEMS = 3;
const MAX_ITEMS = 5;

const boxClass = "not-prose my-10 max-w-2xl border-t border-tan pt-8";
const labelClass =
  "mb-1 font-sans text-xs font-bold uppercase tracking-widest text-muted/90";

/**
 * Context-aware next-article navigation for guides. Use between block elements.
 * Pass 3-5 items with short reasons, or a preset `guideId`.
 */
export function NextStepGuides({
  title = NEXT_STEP_GUIDES_DEFAULT_TITLE,
  intro = NEXT_STEP_GUIDES_DEFAULT_INTRO,
  items,
  guideId,
  note,
  className = "",
}: NextStepGuidesProps) {
  const resolvedItems =
    items ?? (guideId ? getNextStepGuidePreset(guideId) : undefined) ?? [];

  if (process.env.NODE_ENV !== "production") {
    if (resolvedItems.length < MIN_ITEMS || resolvedItems.length > MAX_ITEMS) {
      console.warn(
        `NextStepGuides "${title}" expects ${MIN_ITEMS}-${MAX_ITEMS} items; received ${resolvedItems.length}.`,
      );
    }
  }

  if (!resolvedItems.length) {
    return null;
  }

  const trackingGuideId = guideId ?? "unknown";
  const visibleItems = resolvedItems.slice(0, MAX_ITEMS);

  return (
    <nav
      data-guide-read-aloud-skip
      className={`${boxClass} ${className}`.trim()}
      aria-label={title}
    >
      <h2 className="editorial-heading mb-3 text-xl sm:text-2xl">{title}</h2>
      <p className="article-body mb-6 text-muted">{intro}</p>

      <ol className="list-none space-y-5 pl-0">
        {visibleItems.map((item, index) => (
          <li
            key={`${item.href}-${index}`}
            className="border-t border-paper-edge/60 pt-5 first:border-t-0 first:pt-0"
          >
            {item.label ? (
              <p className={labelClass}>{item.label}</p>
            ) : null}
            <p className="mb-1.5">
              <TrackedNextStepGuideLink
                currentGuideId={trackingGuideId}
                href={item.href}
              >
                {item.title}
              </TrackedNextStepGuideLink>
            </p>
            <p className="article-body-sm m-0 text-muted">{item.reason}</p>
          </li>
        ))}
      </ol>

      {note ? (
        <p className="article-body-sm mt-5 text-muted">{note}</p>
      ) : null}
    </nav>
  );
}
