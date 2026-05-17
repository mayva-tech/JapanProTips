import {
  Children,
  Fragment,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { HeroTextStrip } from "@/components/editorial/HeroTextStrip";
import { cn } from "@/lib/utils";

function unwrapSingleContainer(node: ReactNode): ReactNode[] {
  const nodes = Children.toArray(node);
  if (nodes.length !== 1 || !isValidElement(nodes[0])) {
    return nodes;
  }

  const el = nodes[0] as ReactElement<{ children?: ReactNode }>;
  if (el.type === Fragment || el.type === "motion.div" || el.type === "div") {
    return Children.toArray(el.props.children);
  }

  return nodes;
}

type HeroBlockProps = {
  children: ReactNode;
  className?: string;
  align?: "start" | "center";
};

/** Wraps each title line (kicker, h1, etc.) in a hero text strip. */
export function HeroTitleGroup({
  children,
  className,
  align = "start",
}: HeroBlockProps) {
  const items = unwrapSingleContainer(children);

  return (
    <header
      className={cn(
        "hero-on-image flex flex-col gap-2 sm:gap-2.5",
        align === "center" && "items-center",
        className,
      )}
    >
      {items.map((child, index) => (
        <HeroTextStrip
          key={index}
          className={cn("block", align === "center" && "text-center")}
        >
          {child}
        </HeroTextStrip>
      ))}
    </header>
  );
}

/** Wraps each intro paragraph or block in a hero text strip. */
export function HeroIntroGroup({
  children,
  className,
  align = "start",
}: HeroBlockProps) {
  const items = unwrapSingleContainer(children);

  return (
    <div
      className={cn(
        "hero-on-image flex flex-col gap-2 sm:gap-2.5",
        align === "center" && "items-center",
        className,
      )}
    >
      {items.map((child, index) => (
        <HeroTextStrip
          key={index}
          className={cn("block max-w-2xl", align === "center" && "text-center")}
        >
          {child}
        </HeroTextStrip>
      ))}
    </div>
  );
}
