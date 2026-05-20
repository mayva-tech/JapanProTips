"use client";

import Link from "next/link";
import { trackNextStepGuideClick } from "@/lib/gtag-events";

const linkClass =
  "font-sans font-bold text-base text-rust transition-colors duration-150 hover:text-maroon";

type TrackedNextStepGuideLinkProps = {
  currentGuideId: string;
  href: string;
  children: string;
};

export function TrackedNextStepGuideLink({
  currentGuideId,
  href,
  children,
}: TrackedNextStepGuideLinkProps) {
  const onClick = () => trackNextStepGuideClick(currentGuideId, href);

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={linkClass} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={linkClass} onClick={onClick}>
      {children}
    </a>
  );
}

export const nextStepGuideLinkClass = linkClass;
