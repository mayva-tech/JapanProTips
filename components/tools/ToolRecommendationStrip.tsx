import { TrackedToolLink } from "@/components/tools/TrackedToolLink";
import Link from "next/link";

export type ToolRecommendationStripCard = {
  label: string;
  description: string;
  href: string;
};

export type ToolRecommendationStripProps = {
  title: string;
  deck: string;
  tools: ToolRecommendationStripCard[];
  /** Optional extra classes on the outer section (for homepage spacing, etc.). */
  className?: string;
  /** Optional heading id for aria-labelledby */
  headingId?: string;
  /** When set, tool link clicks send GA4 `tool_click:source:target` and set `data-cta-label`. */
  analyticsSourceSlug?: string;
  /** Tighter layout for bottom-of-page crosslinks. */
  variant?: "default" | "compact";
  /**
   * `stack`: one tool per row (sidebar / narrow columns).
   * `responsive`: 1–2 columns by breakpoint (default for compact).
   */
  layout?: "stack" | "responsive";
};

const pillClass =
  "inline-flex shrink-0 rounded-full border border-rust/30 bg-rust/10 px-2.5 py-0.5 font-sans text-[0.65rem] font-bold uppercase tracking-widest text-rust";

const cardClassDefault =
  "group relative flex h-full flex-col overflow-hidden rounded-lg border border-paper-edge bg-paper-card p-5 shadow-editorial transition-colors duration-150 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-rust hover:border-rust/45 sm:p-6";

const cardClassCompact =
  "group relative flex h-full flex-col overflow-hidden rounded-lg border border-paper-edge bg-paper-card p-4 shadow-editorial transition-colors duration-150 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-rust hover:border-rust/45 sm:p-5";

function gridClassForTools(
  count: number,
  variant: "default" | "compact",
  layout: "stack" | "responsive",
): string {
  if (variant === "compact") {
    if (layout === "stack" || count <= 1) {
      return "grid grid-cols-1 gap-3";
    }
    if (count === 2) return "grid grid-cols-1 gap-3 sm:grid-cols-2";
    return "grid grid-cols-1 gap-3 sm:grid-cols-2";
  }
  if (count === 1) return "grid grid-cols-1 gap-4 sm:max-w-xl";
  if (count === 2) return "grid grid-cols-1 gap-4 sm:grid-cols-2";
  if (count >= 5) {
    return "grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5";
  }
  return "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3";
}

export function ToolRecommendationStrip({
  title,
  deck,
  tools,
  className = "",
  headingId = "tool-recommendation-strip-heading",
  analyticsSourceSlug,
  variant = "default",
  layout = "responsive",
}: ToolRecommendationStripProps) {
  const gridClass = gridClassForTools(tools.length, variant, layout);
  const isCompact = variant === "compact";
  const cardClass = isCompact ? cardClassCompact : cardClassDefault;
  const shellClass = isCompact
    ? "rounded-xl border border-maroon/20 bg-gradient-to-br from-paper-card via-paper-elevated to-[#efe2d6] p-4 shadow-inner sm:p-5"
    : "rounded-xl border border-maroon/20 bg-gradient-to-br from-paper-card via-paper-elevated to-[#efe2d6] p-5 shadow-inner sm:p-7";

  const titleClass = isCompact
    ? "font-display text-lg font-bold italic text-maroon sm:text-xl"
    : "font-display text-xl font-bold italic text-maroon sm:text-2xl";

  return (
    <section
      className={`${shellClass} ${className}`.trim()}
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className={titleClass}>
        {title}
      </h2>
      <p className="article-body-sm mt-2 max-w-2xl text-pretty leading-relaxed text-muted">
        {deck}
      </p>
      <ul className={`mt-6 list-none p-0 ${gridClass}`}>
        {tools.map((tool) => {
          const inner = (
            <>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className={pillClass}>Tool</span>
              </div>
              <span
                className={`font-display font-bold text-dark group-hover:text-maroon ${
                  isCompact ? "text-base sm:text-lg" : "text-lg sm:text-xl"
                }`}
              >
                {tool.label}
              </span>
              <p className="article-body-sm mt-2 flex-1 leading-relaxed text-muted">
                {tool.description}
              </p>
              <span className="mt-3 inline-block font-sans text-xs font-bold uppercase tracking-widest text-rust transition-colors group-hover:text-maroon sm:mt-4">
                Open tool →
              </span>
            </>
          );

          return (
            <li key={tool.href} className="min-w-0">
              {analyticsSourceSlug ? (
                <TrackedToolLink
                  href={tool.href}
                  sourceSlug={analyticsSourceSlug}
                  className={`${cardClass} no-underline`}
                >
                  {inner}
                </TrackedToolLink>
              ) : (
                <Link href={tool.href} className={`${cardClass} no-underline`}>
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
