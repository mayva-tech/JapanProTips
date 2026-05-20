import { MdxGuidePage } from "@/components/guides/MdxGuidePage";
import { createMdxGuideMetadata } from "@/lib/content/mdx-guide-route";

const SLUG = "japan-bank-transfers-furikomi";
const COLLECTION = "residents" as const;

export const generateMetadata = () => createMdxGuideMetadata(SLUG, COLLECTION);

export default function JapanBankTransfersFurikomiPage() {
  return (
    <MdxGuidePage slug={SLUG} collection={COLLECTION} layout="resident" />
  );
}
