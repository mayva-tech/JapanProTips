import { MdxGuidePage } from "@/components/guides/MdxGuidePage";
import { createMdxInternalTestMetadata } from "@/lib/content/mdx-internal-test-metadata";

const SLUG = "mdx-pilot";

export const generateMetadata = () => createMdxInternalTestMetadata(SLUG);

export default function MdxPilotGuidePage() {
  return <MdxGuidePage slug={SLUG} />;
}
