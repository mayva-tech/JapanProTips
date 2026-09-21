import Link from "next/link";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import {
  HOME_ENGINEERING_SECTION_DESCRIPTION,
  HOME_ENGINEERING_SECTION_TITLE,
} from "@/lib/engineering-copy";

/** Lower-homepage engineering vertical: smaller than travel/resident pillars. */
export function HomeEngineeringCta() {
  return (
    <section
      className="border-b border-paper-edge bg-paper-elevated py-8 sm:py-10"
      aria-labelledby="home-engineering-heading"
    >
      <div className="page-x mx-auto max-w-6xl">
        <div className="editorial-card max-w-3xl border border-paper-edge bg-paper-card p-6 sm:p-8">
          <SectionLabel>Professional resources</SectionLabel>
          <h2
            id="home-engineering-heading"
            className="font-sans text-lg font-bold uppercase tracking-widest text-dark sm:text-xl"
          >
            {HOME_ENGINEERING_SECTION_TITLE}
          </h2>
          <p className="article-body mt-3 max-w-2xl text-sm sm:text-base">
            {HOME_ENGINEERING_SECTION_DESCRIPTION}
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/engineer"
              className="editorial-btn-card text-center sm:inline-block"
            >
              Explore Engineer Hub
            </Link>
            <Link
              href="/engineering-services"
              className="editorial-chevron-link inline-flex items-center justify-center rounded-lg border border-paper-edge bg-paper-elevated px-6 py-3 font-sans text-sm font-bold uppercase tracking-widest text-rust transition-colors hover:border-maroon/30 hover:text-maroon"
            >
              Engineering Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
