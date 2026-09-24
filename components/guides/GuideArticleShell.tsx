import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  ComparisonTable,
  ESimConversionBlock,
  HotelConversionBlock,
  StartHereFunnelBlock,
  type ComparisonRow,
} from "@/components/conversion";
import { GuidePageReadAloud } from "@/components/guides/GuidePageReadAloud";
import { GuideTitleText, textFromPlainTitleChildren } from "./GuidePageTitle";
import { DEFAULT_GUIDE_COMPARISON_ROWS } from "./guide-conversion-defaults";

export type GuideArticleShellProps = {
  title: ReactNode;
  /** Opening copy placed above the first conversion card (typically two paragraphs). */
  intro: ReactNode;
  /** Main content before the comparison table. */
  beforeComparison: ReactNode;
  /** Main content after the comparison table (include GuideEndCta and footer links here). */
  afterComparison: ReactNode;
  /** Pass `null` to hide the conversion table (for example when the page already has a large comparison). */
  comparisonItems?: ComparisonRow[] | null;
  /** Pass `false` to hide the hotel conversion block (for example on resident-only guides). */
  showHotelConversion?: boolean;
  maxWidthClass?: string;
  /** Optional slug for read-aloud analytics; defaults to the URL path segment. */
  guideSlug?: string;
};

function hasGuideTitleClass(className: unknown) {
  return typeof className === "string" && className.includes("guide-page-title");
}

function accentGuideTitleNode(node: ReactNode): ReactNode {
  if (!isValidElement(node)) return node;

  const element = node as ReactElement<{
    className?: unknown;
    children?: ReactNode;
  }>;
  const { children, className } = element.props;

  if (hasGuideTitleClass(className)) {
    const title = textFromPlainTitleChildren(children);
    if (!title) return node;

    return cloneElement(element, undefined, (
      <GuideTitleText title={title.replace(/\s+/g, " ")} />
    ));
  }

  if (!children) return node;

  return cloneElement(
    element,
    undefined,
    Children.map(children, accentGuideTitleNode),
  );
}

export function GuideArticleShell({
  title,
  intro,
  beforeComparison,
  afterComparison,
  comparisonItems = DEFAULT_GUIDE_COMPARISON_ROWS,
  showHotelConversion = true,
  maxWidthClass = "max-w-4xl",
  guideSlug,
}: GuideArticleShellProps) {
  const showComparison = comparisonItems !== null;
  const tableRows =
    comparisonItems === null
      ? []
      : comparisonItems ?? DEFAULT_GUIDE_COMPARISON_ROWS;

  return (
    <main className="bg-cream min-h-screen font-sans">
      <article
        data-guide-read-aloud-root
        className={`${maxWidthClass} page-x mx-auto min-w-0 pt-10 pb-14`}
      >
        {accentGuideTitleNode(title)}

        <GuidePageReadAloud guideSlug={guideSlug} />

        <div className="mb-6 lg:max-w-2xl">{intro}</div>

        <div className="mb-6 lg:max-w-2xl" data-guide-read-aloud-skip>
          <ESimConversionBlock />
        </div>

        <div>{beforeComparison}</div>

        {showComparison ? (
          <div className="mb-6 max-w-full" data-guide-read-aloud-skip>
            <ComparisonTable items={tableRows} />
          </div>
        ) : null}

        {showHotelConversion ? (
          <div className="mb-6 lg:max-w-2xl" data-guide-read-aloud-skip>
            <HotelConversionBlock />
          </div>
        ) : null}

        <div>{afterComparison}</div>

        <div
          className="mt-10 border-t border-tan pt-8 lg:max-w-2xl"
          data-guide-read-aloud-skip
        >
          <StartHereFunnelBlock />
        </div>
      </article>
    </main>
  );
}
