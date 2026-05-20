import { MdxGuidePage } from "@/components/guides/MdxGuidePage";
import { createMdxGuideMetadata } from "@/lib/content/mdx-guide-route";

const SLUG = "japan-hotel-room-size";

export const generateMetadata = () => createMdxGuideMetadata(SLUG);

export default function JapanHotelRoomSizePage() {
  return <MdxGuidePage slug={SLUG} />;
}
