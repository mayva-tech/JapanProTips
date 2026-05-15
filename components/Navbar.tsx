import Link from "next/link";
import { TrackedCtaLink } from "@/components/TrackedCtaLink";
import { TrackedStartHereLink } from "@/components/TrackedStartHereLink";

export function Navbar() {
  return (
    <header className="border-b-2 border-dark bg-cream">
      <div className="max-w-4xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <span className="font-display text-dark tracking-wide text-xl">
          JAPAN PRO TIPS
        </span>
        <nav className="flex items-center gap-8">
          <Link
            href="/"
            className="font-sans font-bold text-sm tracking-widest uppercase text-dark hover:text-rust transition-colors duration-150"
          >
            Home
          </Link>
          <TrackedStartHereLink className="font-sans font-bold text-sm tracking-widest uppercase text-dark hover:text-rust transition-colors duration-150">
            Start Here
          </TrackedStartHereLink>
          <TrackedCtaLink
            href="/guides/sim-card-japan"
            label="esim"
            className="font-sans font-bold text-sm tracking-widest uppercase text-dark hover:text-rust transition-colors duration-150"
          >
            SIM Guide
          </TrackedCtaLink>
        </nav>
      </div>
    </header>
  );
}
