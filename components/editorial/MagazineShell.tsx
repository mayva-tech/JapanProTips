import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MagazineShellProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
};

/** AoM-style centered magazine column (max 6xl). */
export function MagazineShell({
  children,
  className = "",
  as: Tag = "div",
}: MagazineShellProps) {
  return (
    <Tag className={cn("page-x mx-auto w-full max-w-6xl", className)}>{children}</Tag>
  );
}
