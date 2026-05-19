import { MdxGuidePage } from "@/components/guides/MdxGuidePage";
import { createMdxGuideMetadata } from "@/lib/content/mdx-guide-route";

const SLUG = "japan-travel-insurance";

export const generateMetadata = () => createMdxGuideMetadata(SLUG);

export default function JapanTravelInsuranceGuidePage() {
  return <MdxGuidePage slug={SLUG} />;
}
