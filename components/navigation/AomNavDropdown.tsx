"use client";

import Link from "next/link";
import { useState } from "react";
import type { NavDropdown } from "@/lib/nav-config";
import { NavChevron } from "@/components/navigation/NavChevron";

export function AomNavDropdown({ menu }: { menu: NavDropdown }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="aom-nav-dropdown group relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="aom-nav-link inline-flex items-center border-0 bg-transparent p-0"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        {menu.label}
        <NavChevron open={open} />
      </button>

      <div
        className={`aom-nav-dropdown-panel ${open ? "aom-nav-dropdown-panel--open" : ""}`}
        role="menu"
      >
        <ul className="list-none p-0">
          {menu.items.map((item) => (
            <li key={item.href} role="none">
              <Link
                href={item.href}
                role="menuitem"
                className="aom-nav-dropdown-link"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
