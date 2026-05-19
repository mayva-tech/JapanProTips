import { MdxGuidePage } from "@/components/guides/MdxGuidePage";
import { createMdxGuideMetadata } from "@/lib/content/mdx-guide-route";

const SLUG = "japan-rainy-season-guide";

export const generateMetadata = () => createMdxGuideMetadata(SLUG);

export default function JapanRainySeasonGuidePage() {
  return <MdxGuidePage slug={SLUG} />;
}
