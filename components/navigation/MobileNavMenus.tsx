"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { NavDropdown, NavPrimaryLink } from "@/lib/nav-config";
import { NavChevron } from "@/components/navigation/NavChevron";

type MobileNavMenusProps = {
  menus: NavDropdown[];
  links?: NavPrimaryLink[];
};

/** Mobile primary nav: tap opens a panel that overlays page content (no layout shift). */
export function MobileNavMenus({ menus, links = [] }: MobileNavMenusProps) {
  const rootRef = useRef<HTMLElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const openMenu = menus.find((m) => m.id === openId) ?? null;

  const close = useCallback(() => setOpenId(null), []);

  const toggle = useCallback((id: string) => {
    setOpenId((current) => (current === id ? null : id));
  }, []);

  useEffect(() => {
    if (!openId) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (rootRef.current && !rootRef.current.contains(target)) {
        close();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openId, close]);

  return (
    <nav
      ref={rootRef}
      className="relative border-t border-paper-edge lg:hidden"
      aria-label="Primary mobile"
    >
      <div className="flex gap-4 overflow-x-auto px-4 py-2">
        {menus.map((menu) => {
          const isOpen = openId === menu.id;
          return (
            <button
              key={menu.id}
              type="button"
              className="aom-nav-link inline-flex shrink-0 items-center border-0 bg-transparent p-0"
              aria-expanded={isOpen}
              aria-controls={isOpen ? `mobile-nav-panel-${menu.id}` : undefined}
              onClick={() => toggle(menu.id)}
            >
              {menu.label}
              <NavChevron open={isOpen} />
            </button>
          );
        })}
        {links.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className="aom-nav-link inline-flex shrink-0 items-center"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {openMenu ? (
        <div
          id={`mobile-nav-panel-${openMenu.id}`}
          className="aom-nav-mobile-panel"
          role="region"
          aria-label={`${openMenu.label} menu`}
        >
          <ul className="list-none p-0">
            {openMenu.items.map((item) => (
              <li key={item.href} className="border-t border-paper-edge/80 first:border-t-0">
                <Link
                  href={item.href}
                  className="aom-nav-dropdown-link block py-2.5"
                  onClick={close}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </nav>
  );
}
