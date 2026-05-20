import { MdxGuidePage } from "@/components/guides/MdxGuidePage";
import { createMdxGuideMetadata } from "@/lib/content/mdx-guide-route";

const SLUG = "japan-public-wifi";

export const generateMetadata = () => createMdxGuideMetadata(SLUG);

export default function JapanPublicWifiPage() {
  return <MdxGuidePage slug={SLUG} />;
}
