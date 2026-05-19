import { MdxGuidePage } from "@/components/guides/MdxGuidePage";
import { createMdxGuideMetadata } from "@/lib/content/mdx-guide-route";

const SLUG = "jr-pass-worth-it";

export const generateMetadata = () => createMdxGuideMetadata(SLUG);

export default function JrPassWorthItGuidePage() {
  return <MdxGuidePage slug={SLUG} />;
}
