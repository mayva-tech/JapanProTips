import fs from "node:fs";
import path from "node:path";
import { pageImagePath, type PageImageCategory } from "@/lib/images";

const PAGE_IMAGE_EXTENSIONS = [".webp", ".jpg", ".jpeg", ".png"] as const;

/**
 * Resolve a guide slot image at build time: prefers .webp, then .jpg/jpeg, then .png.
 * Pass the basename only (e.g. "hero", "section-01"), not the extension.
 */
export function resolvePageImagePath(
  category: PageImageCategory,
  slug: string,
  basename: string,
): string {
  const publicDir = path.join(process.cwd(), "public", "images", category, slug);

  for (const ext of PAGE_IMAGE_EXTENSIONS) {
    const filename = `${basename}${ext}`;
    if (fs.existsSync(path.join(publicDir, filename))) {
      return pageImagePath(category, slug, filename);
    }
  }

  return pageImagePath(category, slug, `${basename}.webp`);
}

/** Standard editorial guide image slots under /public/images/guides/{slug}/ */
export function guidePageImages(slug: string) {
  return {
    hero: resolvePageImagePath("guides", slug, "hero"),
    section01: resolvePageImagePath("guides", slug, "section-01"),
    section02: resolvePageImagePath("guides", slug, "section-02"),
    step01: resolvePageImagePath("guides", slug, "step-01"),
    step02: resolvePageImagePath("guides", slug, "step-02"),
    mainPhoto: resolvePageImagePath("guides", slug, "main-photo"),
  } as const;
}
