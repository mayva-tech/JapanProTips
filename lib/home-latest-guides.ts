import type { GuideCardItem } from "@/lib/guide-card-item";
import { HOME_GUIDE_CAROUSEL_ITEMS } from "@/lib/home-guide-carousel";

/** Homepage "The latest" row list (AoM-style). */
export const HOME_LATEST_GUIDES: GuideCardItem[] = HOME_GUIDE_CAROUSEL_ITEMS.slice(
  0,
  5,
).map((item) => ({
  category: item.category,
  title: item.title,
  description: item.description,
  href: item.href,
  imageSrc: item.imageSrc,
  imageAlt: item.imageAlt,
  gtagLabel: item.gtagLabel,
}));
