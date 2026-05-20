import { MdxGuidePage } from "@/components/guides/MdxGuidePage";
import { createMdxGuideMetadata } from "@/lib/content/mdx-guide-route";

const SLUG = "japan-travel-fatigue";

export const generateMetadata = () => createMdxGuideMetadata(SLUG);

export default function JapanTravelFatiguePage() {
  return <MdxGuidePage slug={SLUG} />;
}
