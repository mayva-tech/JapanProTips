import type { ReactNode } from "react";

const TRAILING_STRAIGHT_ARROW_RE = /\s*\u2192\s*$/;

export function stripTrailingArrowFromText(text: string) {
  return text.replace(TRAILING_STRAIGHT_ARROW_RE, "");
}

export function stripTrailingArrowFromNode(children: ReactNode) {
  if (typeof children !== "string") {
    return { children, hadTrailingArrow: false };
  }

  const nextChildren = stripTrailingArrowFromText(children);

  return {
    children: nextChildren,
    hadTrailingArrow: nextChildren !== children,
  };
}

export function withChevronClass(
  className: string | undefined,
  hadTrailingArrow: boolean,
) {
  if (!hadTrailingArrow) return className;

  const isButtonLike =
    className?.includes("editorial-btn") ||
    className?.includes("bg-maroon") ||
    className?.includes("bg-rust");
  const chevronClass = isButtonLike
    ? "editorial-chevron-cta"
    : "editorial-chevron-link";

  return [className, chevronClass].filter(Boolean).join(" ");
}
