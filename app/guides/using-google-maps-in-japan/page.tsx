import { MdxGuidePage } from "@/components/guides/MdxGuidePage";
import { createMdxGuideMetadata } from "@/lib/content/mdx-guide-route";

const SLUG = "using-google-maps-in-japan";

export const generateMetadata = () => createMdxGuideMetadata(SLUG);

export default function UsingGoogleMapsInJapanPage() {
  return <MdxGuidePage slug={SLUG} />;
}
