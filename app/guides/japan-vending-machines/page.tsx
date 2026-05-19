import { MdxGuidePage } from "@/components/guides/MdxGuidePage";
import { createMdxGuideMetadata } from "@/lib/content/mdx-guide-route";

const SLUG = "japan-vending-machines";

export const generateMetadata = () => createMdxGuideMetadata(SLUG);

export default function JapanVendingMachinesGuidePage() {
  return <MdxGuidePage slug={SLUG} />;
}
