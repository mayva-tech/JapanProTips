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
}: GuideArticleShellProps) {
  const showComparison = comparisonItems !== null;
  const tableRows =
    comparisonItems === null
      ? []
      : comparisonItems ?? DEFAULT_GUIDE_COMPARISON_ROWS;

  return (
    <main className="bg-cream min-h-screen font-sans">
      <article
        className={`${maxWidthClass} page-x mx-auto min-w-0 pt-10 pb-14`}
      >
        {accentGuideTitleNode(title)}

        <div className="mb-6 lg:max-w-2xl">{intro}</div>

        <div className="mb-6 lg:max-w-2xl">
          <ESimConversionBlock />
        </div>

        {beforeComparison}

        {showComparison ? (
          <div className="mb-6 max-w-full">
            <ComparisonTable items={tableRows} />
          </div>
        ) : null}

        {showHotelConversion ? (
          <div className="mb-6 lg:max-w-2xl">
            <HotelConversionBlock />
          </div>
        ) : null}

        {afterComparison}

        <div className="mt-10 border-t border-tan pt-8 lg:max-w-2xl">
          <StartHereFunnelBlock />
        </div>
      </article>
    </main>
  );
}
