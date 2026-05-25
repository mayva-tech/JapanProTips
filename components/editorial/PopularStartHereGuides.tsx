import Link from "next/link";
import { HomeCategoryPillar } from "@/components/editorial/HomeCategoryPillar";
import { PopularGuideCard } from "@/components/editorial/PopularGuideCard";
import { POPULAR_START_HERE_GUIDES } from "@/lib/popular-start-here-guides";

export function PopularStartHereGuides() {
  return (
    <HomeCategoryPillar
      title="Popular Start Here Guides"
      description="Six field-guide articles most first-time visitors open first. Pick one and go deep before you add more tabs."
      browseHref="/start-here"
      browseLabel="Trip checklist"
    >
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {POPULAR_START_HERE_GUIDES.map((item) => (
            <li key={item.href} className="min-h-0">
              <PopularGuideCard item={item} />
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-center sm:justify-start">
          <Link href="/tourists" className="editorial-btn-primary">
            View all tourist guides
          </Link>
        </div>
    </HomeCategoryPillar>
  );
}
