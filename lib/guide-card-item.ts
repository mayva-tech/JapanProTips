import type { ConversionGtagLabel } from "@/lib/gtag-events";

export type GuideCardItem = {
  category: string;
  title: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  gtagLabel: ConversionGtagLabel;
};

export type GuideCardSection = {
  label: string;
  items: GuideCardItem[];
};
