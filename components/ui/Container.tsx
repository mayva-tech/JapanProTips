import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("page-x mx-auto w-full max-w-none sm:max-w-2xl", className)}>
      {children}
    </div>
  );
}
