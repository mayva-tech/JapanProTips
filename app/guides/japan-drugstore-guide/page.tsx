import { MdxGuidePage } from "@/components/guides/MdxGuidePage";
import { createMdxGuideMetadata } from "@/lib/content/mdx-guide-route";

const SLUG = "japan-drugstore-guide";

export const generateMetadata = () => createMdxGuideMetadata(SLUG);

export default function JapanDrugstoreGuidePage() {
  return <MdxGuidePage slug={SLUG} />;
}
