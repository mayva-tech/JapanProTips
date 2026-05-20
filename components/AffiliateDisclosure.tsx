import { RECOMMENDATION_AFFILIATE_DISCLOSURE } from "@/lib/editorial-copy";

const disclosureClass = "article-body-sm mt-4 text-muted/75";

export type AffiliateDisclosureProps = {
  className?: string;
};

/** Calm affiliate disclosure line for monetization blocks. Render once per nearby cluster. */
export function AffiliateDisclosure({ className = "" }: AffiliateDisclosureProps) {
  return (
    <p className={`${disclosureClass} ${className}`.trim()}>
      {RECOMMENDATION_AFFILIATE_DISCLOSURE}
    </p>
  );
}
