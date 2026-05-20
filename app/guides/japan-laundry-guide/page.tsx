import { MdxGuidePage } from "@/components/guides/MdxGuidePage";
import { createMdxGuideMetadata } from "@/lib/content/mdx-guide-route";

const SLUG = "japan-laundry-guide";

export const generateMetadata = () => createMdxGuideMetadata(SLUG);

export default function JapanLaundryGuidePage() {
  return <MdxGuidePage slug={SLUG} />;
}
