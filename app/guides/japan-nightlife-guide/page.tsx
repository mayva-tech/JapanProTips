import { MdxGuidePage } from "@/components/guides/MdxGuidePage";
import { createMdxGuideMetadata } from "@/lib/content/mdx-guide-route";

const SLUG = "japan-nightlife-guide";

export const generateMetadata = () => createMdxGuideMetadata(SLUG);

export default function JapanNightlifeGuidePage() {
  return <MdxGuidePage slug={SLUG} />;
}
