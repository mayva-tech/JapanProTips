import { MdxGuidePage } from "@/components/guides/MdxGuidePage";
import { createMdxGuideMetadata } from "@/lib/content/mdx-guide-route";

const SLUG = "japan-official-mail-guide";
const COLLECTION = "residents" as const;

export const generateMetadata = () => createMdxGuideMetadata(SLUG, COLLECTION);

export default function JapanOfficialMailGuidePage() {
  return (
    <MdxGuidePage slug={SLUG} collection={COLLECTION} layout="resident" />
  );
}
