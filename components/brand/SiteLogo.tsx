import Image from "next/image";
import Link from "next/link";
import { BRAND_LOGO } from "@/lib/brand";

export type SiteLogoVariant = "nav" | "footer" | "masthead" | "sm";

const VARIANTS: Record<
  SiteLogoVariant,
  {
    width: number;
    height: number;
    className: string;
    sizes?: string;
    priority?: boolean;
  }
> = {
  nav: {
    width: BRAND_LOGO.width,
    height: BRAND_LOGO.height,
    className: "h-10 w-auto max-w-[min(100%,340px)] sm:h-11 md:h-12",
    sizes: "(max-width: 640px) 55vw, 340px",
    priority: true,
  },
  footer: {
    width: BRAND_LOGO.width,
    height: BRAND_LOGO.height,
    className: "h-9 w-auto max-w-[300px] sm:h-10 md:h-11",
    sizes: "300px",
  },
  masthead: {
    width: BRAND_LOGO.width,
    height: BRAND_LOGO.height,
    className: "block h-auto w-full max-w-6xl",
    sizes: "(max-width: 640px) 100vw, 1152px",
    priority: true,
  },
  sm: {
    width: BRAND_LOGO.width,
    height: BRAND_LOGO.height,
    className: "h-8 w-auto max-w-[240px] sm:h-9",
    sizes: "240px",
  },
};

type SiteLogoProps = {
  variant?: SiteLogoVariant;
  linked?: boolean;
  className?: string;
};

export function SiteLogo({
  variant = "nav",
  linked = true,
  className = "",
}: SiteLogoProps) {
  const v = VARIANTS[variant];
  const image = (
    <Image
      src={BRAND_LOGO.src}
      alt={BRAND_LOGO.alt}
      width={v.width}
      height={v.height}
      sizes={v.sizes}
      priority={v.priority}
      className={`${v.className} ${className}`.trim()}
    />
  );

  if (!linked) {
    return image;
  }

  return (
    <Link
      href="/"
      className="inline-block shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon/50"
      aria-label="JapanProTips home"
    >
      {image}
    </Link>
  );
}
