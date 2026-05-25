import type { MetadataRoute } from "next";
import { BRAND_COLORS, BRAND_LOGO } from "@/lib/brand";
import { DEFAULT_DESCRIPTION, SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "JapanProTips",
    description: DEFAULT_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: BRAND_COLORS.cream,
    theme_color: BRAND_COLORS.brown,
    icons: [
      {
        src: BRAND_LOGO.src,
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
