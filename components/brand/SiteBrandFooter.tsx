import Link from "next/link";
import { SiteLogo } from "@/components/brand/SiteLogo";

/** Guide page footer with brand logo link home. */
export function SiteBrandFooter() {
  return (
    <div data-guide-read-aloud-skip className="mt-6 border-t border-tan pt-8">
      <Link
        href="/"
        className="inline-flex flex-col items-start gap-3 transition-opacity hover:opacity-90 sm:flex-row sm:items-center"
      >
        <SiteLogo variant="sm" linked={false} />
        <span className="editorial-chevron-link font-sans text-sm font-bold uppercase tracking-widest text-rust">
          Back to home
        </span>
      </Link>
    </div>
  );
}
