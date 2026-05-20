import { MdxGuidePage } from "@/components/guides/MdxGuidePage";
import { createMdxGuideMetadata } from "@/lib/content/mdx-guide-route";

const SLUG = "japan-jetlag-survival";

export const generateMetadata = () => createMdxGuideMetadata(SLUG);

export default function JapanJetlagSurvivalPage() {
  return <MdxGuidePage slug={SLUG} />;
}
