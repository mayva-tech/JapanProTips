import { MdxGuidePage } from "@/components/guides/MdxGuidePage";
import { createMdxGuideMetadata } from "@/lib/content/mdx-guide-route";

const SLUG = "japan-conbini-food-guide";

export const generateMetadata = () => createMdxGuideMetadata(SLUG);

export default function JapanConbiniFoodGuidePage() {
  return <MdxGuidePage slug={SLUG} />;
}
