import type { ReactNode } from "react";

type CalloutVariant = "tip" | "warning" | "mistake";

const variantLabel: Record<CalloutVariant, string> = {
  tip: "Field note",
  warning: "Watch for this",
  mistake: "What people get wrong",
};

const variantClass: Record<CalloutVariant, string> = {
  tip: "callout-tip",
  warning: "callout-warning",
  mistake: "callout-mistake",
};

type CalloutProps = {
  variant?: CalloutVariant;
  title?: string;
  children: ReactNode;
  className?: string;
};

export function Callout({
  variant = "tip",
  title,
  children,
  className = "",
}: CalloutProps) {
  return (
    <aside className={`${variantClass[variant]} ${className}`.trim()}>
      <span className="callout-label">{title ?? variantLabel[variant]}</span>
      <div className="text-muted [&>p]:mt-2 [&>p:first-child]:mt-0">{children}</div>
    </aside>
  );
}
