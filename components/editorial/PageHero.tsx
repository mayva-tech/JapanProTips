import Image from "next/image";
import type { ReactNode } from "react";
import { HeroTextStrip } from "@/components/editorial/HeroTextStrip";
import { cn } from "@/lib/utils";

export type PageHeroProps = {
  src: string;
  alt: string;
  caption?: string;
  children: ReactNode;
  priority?: boolean;
  /** `home` = tall centered hero; `article` = guide header */
  variant?: "home" | "article";
  align?: "start" | "center";
  className?: string;
  contentClassName?: string;
};

const variantClass = {
  home: {
    section: "min-h-[min(72vh,640px)]",
    content:
      "min-h-[min(72vh,640px)] justify-center py-20 text-center sm:py-24",
    maxWidth: "max-w-4xl",
  },
  article: {
    section: "min-h-[min(44vh,400px)] sm:min-h-[min(48vh,440px)]",
    content: "min-h-[min(44vh,400px)] justify-end pb-8 pt-16 sm:min-h-[min(48vh,440px)] sm:pb-10 sm:pt-20",
    maxWidth: "max-w-3xl",
  },
} as const;

export function PageHero({
  src,
  alt,
  caption,
  children,
  priority = false,
  variant = "article",
  align = "start",
  className,
  contentClassName,
}: PageHeroProps) {
  const v = variantClass[variant];
  const centered = align === "center" || variant === "home";

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden",
        variant === "home" && "page-hero--home",
        v.section,
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="hero-image"
      />
      <div
        className={cn(
          "hero-on-image page-x relative z-10 mx-auto flex flex-col",
          v.maxWidth,
          v.content,
          centered ? "items-center" : "items-start",
          contentClassName,
        )}
      >
        {children}
      </div>
      {caption ? (
        <div
          className={cn(
            "page-x relative z-10 mx-auto pb-6",
            v.maxWidth,
            centered && "text-center",
          )}
        >
          <HeroTextStrip className="font-sans text-sm leading-snug text-paper-card/75">
            {caption}
          </HeroTextStrip>
        </div>
      ) : null}
    </section>
  );
}
