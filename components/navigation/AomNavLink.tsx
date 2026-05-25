import Link from "next/link";
import type { NavPrimaryLink } from "@/lib/nav-config";

export function AomNavLink({ link }: { link: NavPrimaryLink }) {
  return (
    <Link href={link.href} className="aom-nav-link inline-flex shrink-0 items-center">
      {link.label}
    </Link>
  );
}
