import { MdxGuidePage } from "@/components/guides/MdxGuidePage";
import { createMdxGuideMetadata } from "@/lib/content/mdx-guide-route";

const SLUG = "japan-healthcare-costs";
const COLLECTION = "residents" as const;

export const generateMetadata = () => createMdxGuideMetadata(SLUG, COLLECTION);

export default function JapanHealthcareCostsPage() {
  return (
    <MdxGuidePage slug={SLUG} collection={COLLECTION} layout="resident" />
  );
}
