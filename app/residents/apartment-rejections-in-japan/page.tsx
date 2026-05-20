import { MdxGuidePage } from "@/components/guides/MdxGuidePage";
import { createMdxGuideMetadata } from "@/lib/content/mdx-guide-route";

const SLUG = "apartment-rejections-in-japan";
const COLLECTION = "residents" as const;

export const generateMetadata = () => createMdxGuideMetadata(SLUG, COLLECTION);

export default function ApartmentRejectionsInJapanPage() {
  return (
    <MdxGuidePage slug={SLUG} collection={COLLECTION} layout="resident" />
  );
}
