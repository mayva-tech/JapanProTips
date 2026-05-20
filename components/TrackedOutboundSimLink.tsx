"use client";

import type { ReactNode } from "react";
import { trackGtagClick } from "@/lib/gtag-events";

type TrackedOutboundSimLinkProps = {
  href: string;
  className: string;
  children: ReactNode;
};

export function TrackedOutboundSimLink({
  href,
  className,
  children,
}: TrackedOutboundSimLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow sponsored"
      className={className}
      onClick={() => trackGtagClick("esim")}
    >
      {children}
    </a>
  );
}
