import Link from "next/link";
import { PopularGuideCard } from "@/components/editorial/PopularGuideCard";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { POPULAR_START_HERE_GUIDES } from "@/lib/popular-start-here-guides";

export function PopularStartHereGuides() {
  return (
    <section className="border-b border-paper-edge bg-paper-elevated py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel>Start here</SectionLabel>
        <h2 className="editorial-heading mb-3 text-ink">
          Popular Start Here Guides
        </h2>
        <p className="article-body mb-10 max-w-2xl">
          Six field-guide articles most first-time visitors open first. Pick one
          and go deep before you add more tabs.
        </p>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {POPULAR_START_HERE_GUIDES.map((item) => (
            <li key={item.href} className="min-h-0">
              <PopularGuideCard item={item} />
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center sm:justify-start">
          <Link href="/tourists" className="editorial-btn-primary">
            View all tourist guides
          </Link>
        </div>
      </div>
    </section>
  );
}
