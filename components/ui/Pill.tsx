import { cn } from "@/lib/utils";

type PillColor = "teal" | "coral" | "gray" | "free";

interface PillProps {
  children: string;
  color?: PillColor;
}

const colors: Record<PillColor, string> = {
  teal: "bg-teal-50 text-teal-800",
  coral: "bg-orange-50 text-orange-800",
  gray: "bg-stone-100 text-stone-600",
  free: "bg-teal-50 text-teal-700",
};

export function Pill({ children, color = "gray" }: PillProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium",
        colors[color]
      )}
    >
      {children}
    </span>
  );
}
