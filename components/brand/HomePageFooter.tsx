import Link from "next/link";
import { SiteLogo } from "@/components/brand/SiteLogo";
import { ENGINEERING_FOOTER_LINKS } from "@/lib/nav-config";
import { SITE_TAGLINE } from "@/lib/site";

/** Homepage footer: travel/resident identity plus secondary engineering links. */
export function HomePageFooter() {
  return (
    <footer className="border-t-2 border-ink bg-paper">
      <div className="page-x mx-auto max-w-6xl py-8">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div className="min-w-0">
            <SiteLogo variant="footer" />
            <p className="article-body mt-4 max-w-md italic text-muted">
              {SITE_TAGLINE} Travel planning, resident guides, and practical tools
              for life in Japan.
            </p>
          </div>
          <nav aria-label="Engineering in Japan" className="flex flex-col gap-2">
            <p className="font-sans text-xs font-bold uppercase tracking-widest text-muted">
              Engineering in Japan
            </p>
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
      </div>
    </footer>
  );
}
