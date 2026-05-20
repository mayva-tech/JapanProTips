import type { RecommendationVariant } from "@/lib/recommendations";

export const VARIANT_KICKER: Record<RecommendationVariant, string | null> = {
  essential: null,
  optional: "Optional",
  warning: "Worth knowing",
  resident: "Residents",
};

export function variantShellClass(variant: RecommendationVariant): string {
  switch (variant) {
    case "warning":
      return "border-maroon/25 bg-paper-card ring-1 ring-maroon/10";
    case "optional":
      return "border-paper-edge/80 bg-paper-card/90";
    case "resident":
      return "border-paper-edge bg-paper-elevated";
    case "essential":
    default:
      return "border-paper-edge bg-paper-elevated";
  }
}

export const recommendationShellBase =
  "not-prose rounded-lg border px-4 py-4 sm:px-5 sm:py-5";

export const recommendationGridShell =
  "not-prose my-10 max-w-2xl rounded-lg border border-paper-edge bg-paper-elevated px-5 py-5 sm:px-6 sm:py-6";
