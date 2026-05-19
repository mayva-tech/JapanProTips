import { MdxGuidePage } from "@/components/guides/MdxGuidePage";
import { createMdxGuideMetadata } from "@/lib/content/mdx-guide-route";

const SLUG = "japan-tax-free-shopping";

export const generateMetadata = () => createMdxGuideMetadata(SLUG);

export default function JapanTaxFreeShoppingGuidePage() {
  return <MdxGuidePage slug={SLUG} />;
}
