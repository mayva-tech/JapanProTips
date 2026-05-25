"use client";

import Link from "next/link";
import type { GuideSearchEntry } from "@/lib/guide-search-index";
import { NAV_DROPDOWNS, NAV_PRIMARY_LINKS } from "@/lib/nav-config";
import { AomNavDropdown } from "@/components/navigation/AomNavDropdown";
import { AomNavLink } from "@/components/navigation/AomNavLink";
import { MobileNavMenus } from "@/components/navigation/MobileNavMenus";
import { NavbarSearch } from "@/components/navigation/NavbarSearch";
import { SiteLogo } from "@/components/brand/SiteLogo";

type NavbarProps = {
  searchEntries: GuideSearchEntry[];
};

/** Art of Manliness-style header: oxblood slab nav, underlines, hover dropdowns, search. */
export function Navbar({ searchEntries }: NavbarProps) {
  return (
    <header className="aom-site-header sticky top-0 z-50 border-b border-paper-edge bg-paper">
      <div className="mx-auto flex max-w-[1200px] items-center gap-6 px-4 py-3 sm:px-6 lg:gap-8">
        <SiteLogo variant="nav" />

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-x-6 lg:flex xl:gap-x-8"
          aria-label="Primary"
        >
          {NAV_DROPDOWNS.map((menu) => (
            <AomNavDropdown key={menu.id} menu={menu} />
          ))}
          {NAV_PRIMARY_LINKS.map((link) => (
            <AomNavLink key={link.id} link={link} />
          ))}
        </nav>

        <div className="ml-auto hidden shrink-0 lg:block">
          <NavbarSearch entries={searchEntries} />
        </div>

        {/* Mobile: compact links + search */}
        <div className="ml-auto flex items-center gap-4 lg:hidden">
          <Link href="/tourists" className="aom-nav-link text-[0.7rem]">
            GUIDES
          </Link>
          <Link href="/tools" className="aom-nav-link text-[0.7rem]">
            TOOLS
          </Link>
          <NavbarSearch entries={searchEntries} />
        </div>
      </div>

      <MobileNavMenus menus={NAV_DROPDOWNS} links={NAV_PRIMARY_LINKS} />
    </header>
  );
}
