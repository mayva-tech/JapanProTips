import { MdxGuidePage } from "@/components/guides/MdxGuidePage";
import { createMdxInternalTestMetadata } from "@/lib/content/mdx-internal-test-metadata";

const SLUG = "mdx-second-test";

export const generateMetadata = () => createMdxInternalTestMetadata(SLUG);

export default function MdxSecondTestGuidePage() {
  return <MdxGuidePage slug={SLUG} />;
}
