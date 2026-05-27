import type { ReactNode } from "react";
import Link from "next/link";
import { Callout } from "@/components/editorial/Callout";
import { InlineAffiliate } from "@/components/conversion";
import {
  stripTrailingArrowFromNode,
  withChevronClass,
} from "@/lib/cta-chevron";
import type { ConversionGtagLabel } from "@/lib/gtag-events";

type TipBoxProps = {
  title?: string;
  children: ReactNode;
};

export function TipBox({ title, children }: TipBoxProps) {
  return (
    <Callout variant="tip" title={title} className="max-w-2xl">
      {children}
    </Callout>
  );
}

type InfoBoxProps = {
  title?: string;
  children: ReactNode;
};

export function InfoBox({ title, children }: InfoBoxProps) {
  return (
    <Callout variant="warning" title={title} className="max-w-2xl">
      {children}
    </Callout>
  );
}

type AffiliateBlockProps = {
  text?: string;
  buttonText: string;
  link: string;
  gtagLabel?: ConversionGtagLabel;
  children?: ReactNode;
  showDisclosure?: boolean;
};

export function AffiliateBlock({
  text,
  buttonText,
  link,
  gtagLabel,
  children,
  showDisclosure = true,
}: AffiliateBlockProps) {
  return (
    <InlineAffiliate
      text={text}
      buttonText={buttonText}
      link={link}
      gtagLabel={gtagLabel}
      className="max-w-2xl"
      showDisclosure={showDisclosure}
    >
      {children}
    </InlineAffiliate>
  );
}

export type RelatedGuideItem = {
  href: string;
  label: string;
};

type RelatedGuidesProps = {
  items?: RelatedGuideItem[];
  children?: ReactNode;
};

const relatedLinkClass =
  "font-sans font-bold text-base text-rust hover:text-maroon transition-colors duration-150";

export function RelatedGuides({ items = [], children }: RelatedGuidesProps) {
  if (children) {
    return (
      <nav
        className="mdx-related-guides mb-0 max-w-2xl"
        aria-label="Related guides"
      >
        {children}
      </nav>
    );
  }

  if (!items.length) return null;

  return (
    <nav className="mb-0 max-w-2xl" aria-label="Related guides">
      <ul className="article-body list-none space-y-3 pl-0">
        {items.map((item) => (
          <li key={item.href}>
            {(() => {
              const arrow = stripTrailingArrowFromNode(item.label);
              return (
                <Link
                  href={item.href}
                  className={withChevronClass(
                    relatedLinkClass,
                    arrow.hadTrailingArrow,
                  )}
                >
                  {arrow.children}
                </Link>
              );
            })()}
          </li>
        ))}
      </ul>
    </nav>
  );
}
