import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type GuidePageTitleProps = {
  title: string;
  className?: string;
};

function splitGuideTitle(title: string) {
  const parentheticalIndex = title.search(/\s+\([^)]*\)/);
  if (parentheticalIndex >= 0) {
    return {
      primary: title.slice(0, parentheticalIndex),
      secondary: title.slice(parentheticalIndex),
    };
  }

  const colonIndex = title.indexOf(": ");
  if (colonIndex >= 0) {
    return {
      primary: title.slice(0, colonIndex),
      secondary: title.slice(colonIndex),
    };
  }

  const spacedHyphenIndex = title.indexOf(" - ");
  if (spacedHyphenIndex >= 0) {
    return {
      primary: title.slice(0, spacedHyphenIndex),
      secondary: title.slice(spacedHyphenIndex),
    };
  }

  return { primary: title, secondary: "" };
}

export function GuideTitleText({ title }: { title: string }) {
  const { primary, secondary } = splitGuideTitle(title.trim());

  if (!secondary) {
    return primary;
  }

  return (
    <>
      {primary}
      <span className="guide-title-accent">{secondary}</span>
    </>
  );
}

export function GuidePageTitle({ title, className }: GuidePageTitleProps) {
  return (
    <h1 className={cn("guide-page-title", className)}>
      <GuideTitleText title={title} />
    </h1>
  );
}

export function textFromPlainTitleChildren(children: ReactNode) {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (!Array.isArray(children)) {
    return null;
  }

  let text = "";

  for (const child of children) {
    if (child === null || child === undefined || typeof child === "boolean") {
      continue;
    }

    if (typeof child !== "string" && typeof child !== "number") {
      return null;
    }

    text += child;
  }

  return text;
}
