import { MdxGuidePage } from "@/components/guides/MdxGuidePage";
import { createMdxGuideMetadata } from "@/lib/content/mdx-guide-route";

const SLUG = "japan-food-allergy-guide";

export const generateMetadata = () => createMdxGuideMetadata(SLUG);

export default function JapanFoodAllergyGuidePage() {
  return <MdxGuidePage slug={SLUG} />;
}
