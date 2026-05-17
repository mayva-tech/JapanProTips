import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type HeroTextStripProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/** Per-line translucent backdrop for readable text on hero images. */
export function HeroTextStrip({
  as: Tag = "span",
  className,
  children,
}: HeroTextStripProps) {
  return <Tag className={cn("hero-text-strip", className)}>{children}</Tag>;
}
