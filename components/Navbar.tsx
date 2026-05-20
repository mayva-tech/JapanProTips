import Link from "next/link";
import { TrackedCtaLink } from "@/components/TrackedCtaLink";
import { TrackedStartHereLink } from "@/components/TrackedStartHereLink";
import { TrackedToolLink } from "@/components/tools/TrackedToolLink";

export function Navbar() {
  return (
    <header className="border-b border-paper-edge bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="font-sans text-lg font-black uppercase tracking-[0.05em] text-maroon sm:text-lead"
        >
          JapanProTips
        </Link>
        <nav className="flex flex-wrap items-center gap-5 sm:gap-8">
          <Link href="/" className="editorial-nav-link">
            Home
          </Link>
          <TrackedStartHereLink className="editorial-nav-link">
            Start Here
          </TrackedStartHereLink>
          <TrackedToolLink
            href="/tools"
            sourceSlug="nav"
            className="editorial-nav-link"
          >
            Tools
          </TrackedToolLink>
          <TrackedCtaLink
            href="/guides/sim-card-japan"
            label="esim"
            className="editorial-nav-link"
          >
            SIM Guide
          </TrackedCtaLink>
        </nav>
      </div>
    </header>
  );
}
