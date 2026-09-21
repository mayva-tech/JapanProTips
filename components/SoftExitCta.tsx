import Link from "next/link";
import { SiteLogo } from "@/components/brand/SiteLogo";
import { TrackedStartHereLink } from "@/components/TrackedStartHereLink";
import { ENGINEERING_FOOTER_LINKS } from "@/lib/nav-config";

export function SoftExitCta() {
  return (
    <div className="border-t border-paper-edge bg-paper-elevated">
      <div className="page-x mx-auto flex max-w-4xl flex-col items-center gap-6 py-8">
        <SiteLogo variant="sm" />
        <TrackedStartHereLink className="editorial-nav-link editorial-chevron-link">
          Still figuring things out? Start here
        </TrackedStartHereLink>
        <div className="w-full max-w-md border-t border-paper-edge/80 pt-6 text-center">
          <p className="mb-3 font-sans text-xs font-bold uppercase tracking-widest text-muted">
            Engineering in Japan
          </p>
          <nav
            aria-label="Engineering in Japan"
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
          >
            {ENGINEERING_FOOTER_LINKS.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="editorial-nav-link text-sm text-muted hover:text-rust"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
