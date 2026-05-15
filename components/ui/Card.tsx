import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  accent?: "teal" | "coral" | "none";
}

const accents: Record<string, string> = {
  teal: "border-l-2 border-l-teal-600 rounded-l-none",
  coral: "border-l-2 border-l-orange-500 rounded-l-none",
  none: "",
};

export function Card({ children, className, accent = "none" }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-stone-200 bg-white p-4",
        accents[accent],
        className
      )}
    >
      {children}
    </div>
  );
}
