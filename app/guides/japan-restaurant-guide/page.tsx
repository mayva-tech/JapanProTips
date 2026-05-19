import { MdxGuidePage } from "@/components/guides/MdxGuidePage";
import { createMdxGuideMetadata } from "@/lib/content/mdx-guide-route";

const SLUG = "japan-restaurant-guide";

export const generateMetadata = () => createMdxGuideMetadata(SLUG);

export default function JapanRestaurantGuidePage() {
  return <MdxGuidePage slug={SLUG} />;
}
