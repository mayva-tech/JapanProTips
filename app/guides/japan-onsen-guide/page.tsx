import { MdxGuidePage } from "@/components/guides/MdxGuidePage";
import { createMdxGuideMetadata } from "@/lib/content/mdx-guide-route";

const SLUG = "japan-onsen-guide";

export const generateMetadata = () => createMdxGuideMetadata(SLUG);

export default function JapanOnsenGuidePage() {
  return <MdxGuidePage slug={SLUG} />;
}
