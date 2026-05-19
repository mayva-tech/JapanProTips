import { MdxGuidePage } from "@/components/guides/MdxGuidePage";
import { createMdxGuideMetadata } from "@/lib/content/mdx-guide-route";

const SLUG = "shinkansen-guide";

export const generateMetadata = () => createMdxGuideMetadata(SLUG);

export default function ShinkansenGuidePage() {
  return <MdxGuidePage slug={SLUG} />;
}
