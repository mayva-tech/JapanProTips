import { MdxGuidePage } from "@/components/guides/MdxGuidePage";
import { createMdxGuideMetadata } from "@/lib/content/mdx-guide-route";

const SLUG = "japan-familymart-lawson-7eleven-comparison";

export const generateMetadata = () => createMdxGuideMetadata(SLUG);

export default function JapanKonbiniComparisonPage() {
  return <MdxGuidePage slug={SLUG} />;
}
