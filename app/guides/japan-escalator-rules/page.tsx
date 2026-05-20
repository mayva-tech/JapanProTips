import { MdxGuidePage } from "@/components/guides/MdxGuidePage";
import { createMdxGuideMetadata } from "@/lib/content/mdx-guide-route";

const SLUG = "japan-escalator-rules";

export const generateMetadata = () => createMdxGuideMetadata(SLUG);

export default function JapanEscalatorRulesPage() {
  return <MdxGuidePage slug={SLUG} />;
}
