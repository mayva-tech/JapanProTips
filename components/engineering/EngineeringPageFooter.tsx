import Link from "next/link";
import { SiteLogo } from "@/components/brand/SiteLogo";
import { ENGINEERING_FOOTER_LINKS } from "@/lib/nav-config";

/** Page footer for engineering vertical routes. */
export function EngineeringPageFooter() {
  return (
    <footer className="border-t-2 border-ink bg-paper">
      <div className="page-x mx-auto max-w-6xl py-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <SiteLogo variant="footer" />
          <nav aria-label="Engineering" className="flex flex-col gap-2">
            {ENGINEERING_FOOTER_LINKS.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="editorial-chevron-link font-sans text-sm font-bold uppercase tracking-widest text-rust hover:text-maroon"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="article-body mt-6 max-w-2xl italic text-muted">
          Engineering authority built from decades inside Japanese manufacturing
          and product development organizations.
        </p>
      </div>
    </footer>
  );
}
