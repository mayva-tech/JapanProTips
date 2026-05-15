import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: string;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "mb-3 text-[11px] font-medium uppercase tracking-widest text-stone-400",
        className
      )}
    >
      {children}
    </p>
  );
}
