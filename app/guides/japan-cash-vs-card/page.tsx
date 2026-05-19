import { MdxGuidePage } from "@/components/guides/MdxGuidePage";
import { createMdxGuideMetadata } from "@/lib/content/mdx-guide-route";

const SLUG = "japan-cash-vs-card";

export const generateMetadata = () => createMdxGuideMetadata(SLUG);

export default function JapanCashVsCardGuidePage() {
  return <MdxGuidePage slug={SLUG} />;
}
