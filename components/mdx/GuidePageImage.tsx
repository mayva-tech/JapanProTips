import { EditorialImage } from "@/components/editorial/EditorialImage";
import { guidePageImages } from "@/lib/guide-page-images";

export type GuidePageImageSlot =
  | "hero"
  | "section01"
  | "section02"
  | "step01"
  | "step02"
  | "mainPhoto";

type GuidePageImageProps = {
  slot: GuidePageImageSlot;
  alt: string;
  caption?: string;
  fit?: "contain" | "cover";
  priority?: boolean;
};

export function createGuidePageImage(slug: string) {
  const images = guidePageImages(slug);

  return function GuidePageImage({
    slot,
    alt,
    caption,
    fit = "contain",
    priority,
  }: GuidePageImageProps) {
    return (
      <EditorialImage
        src={images[slot]}
        alt={alt}
        caption={caption}
        fit={fit}
        priority={priority}
        className="max-w-2xl"
      />
    );
  };
}
