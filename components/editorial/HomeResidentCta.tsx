"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { HOME_RESIDENT_CTA_LINKS } from "@/lib/resident-starter-path";
import {
  residentStarterPathGtagLabel,
  trackResidentStarterPathClick,
  trackToolClick,
  toolClickGtagLabel,
} from "@/lib/gtag-events";

const SOURCE_SLUG = "home-resident-cta";

function HomeResidentLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className: string;
}) {
  const isTool = href.startsWith("/tools");
  const dataLabel = isTool
    ? toolClickGtagLabel(SOURCE_SLUG, href)
    : residentStarterPathGtagLabel(SOURCE_SLUG, href);

  return (
    <Link
      href={href}
      className={className}
      data-cta-label={dataLabel}
      onClick={() =>
        isTool
          ? trackToolClick(SOURCE_SLUG, href)
          : trackResidentStarterPathClick(SOURCE_SLUG, href)
      }
    >
      {children}
    </Link>
  );
}

export function HomeResidentCta({ embedded = false }: { embedded?: boolean }) {
  const [checklist, calculator] = HOME_RESIDENT_CTA_LINKS;

  const card = (
        <div
          className={
            embedded
              ? "magazine-sidebar-card"
              : "editorial-card mx-auto max-w-2xl p-6 sm:p-8 lg:max-w-3xl"
          }
        >
          <SectionLabel>Residents</SectionLabel>
          <h2
            id="home-resident-cta-heading"
            className="editorial-heading mb-3 text-ink"
          >
            Moving to Japan?
          </h2>
          <p className="article-body mb-6 max-w-xl">
            Start with the first-month checklist, then stress test monthly cash
            before you sign rent.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {checklist ? (
              <HomeResidentLink
                href={checklist.href}
                className="editorial-btn-primary text-center sm:inline-block"
              >
                {checklist.cta}
              </HomeResidentLink>
            ) : null}
            {calculator ? (
              <HomeResidentLink
                href={calculator.href}
                className="editorial-btn-card text-center sm:inline-block"
              >
                {calculator.cta}
              </HomeResidentLink>
            ) : null}
          </div>
          <p className="article-body-sm mt-5">
            <HomeResidentLink
              href="/residents"
              className="font-sans font-bold text-rust hover:text-maroon"
            >
              Browse all resident guides →
            </HomeResidentLink>
          </p>
        </div>
  );

  if (embedded) {
    return (
      <div aria-labelledby="home-resident-cta-heading">{card}</div>
    );
  }

  return (
    <section
      className="border-b border-paper-edge bg-cream py-8 sm:py-12"
      aria-labelledby="home-resident-cta-heading"
    >
      <div className="page-x mx-auto max-w-6xl">{card}</div>
    </section>
  );
}
