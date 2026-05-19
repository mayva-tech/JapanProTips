import { MdxGuidePage } from "@/components/guides/MdxGuidePage";
import { createMdxGuideMetadata } from "@/lib/content/mdx-guide-route";

const SLUG = "japan-anime-shopping-guide";

export const generateMetadata = () => createMdxGuideMetadata(SLUG);

export default function JapanAnimeShoppingGuidePage() {
  return <MdxGuidePage slug={SLUG} />;
}
