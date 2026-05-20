import { MdxGuidePage } from "@/components/guides/MdxGuidePage";
import { createMdxGuideMetadata } from "@/lib/content/mdx-guide-route";

const SLUG = "japan-cash-withdrawal-guide";

export const generateMetadata = () => createMdxGuideMetadata(SLUG);

export default function JapanCashWithdrawalGuidePage() {
  return <MdxGuidePage slug={SLUG} />;
}
