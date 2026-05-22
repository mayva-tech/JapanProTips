"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PLANNER_PATH } from "@/lib/itinerary/build-planner-url";
import type { CuratedItineraryTemplate } from "@/lib/itinerary/curated-itinerary-templates";

const textLink =
  "font-sans text-sm font-bold text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon";

export function ItineraryTemplatePrefillNotice({
  template,
  onClear,
}: {
  template: CuratedItineraryTemplate;
  onClear: () => void;
}) {
  const router = useRouter();

  const handleClear = () => {
    router.replace(PLANNER_PATH);
    onClear();
  };

  return (
    <div
      className="mb-6 rounded-md border border-maroon/20 bg-maroon/5 px-4 py-3 sm:px-5 sm:py-4"
      role="status"
      aria-live="polite"
    >
      <p className="font-sans text-sm font-bold text-dark">
        You&apos;re starting from: {template.title}
      </p>
      <p className="article-body-sm mt-2 text-muted">
        We pre-filled the planner based on this curated itinerary. You can
        adjust anything before generating.
      </p>
      <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-sm font-semibold">
        <Link
          href={`/itinerary-templates/${template.slug}`}
          className={textLink}
        >
          View template outline
        </Link>
        <button type="button" className={textLink} onClick={handleClear}>
          Clear template
        </button>
      </p>
    </div>
  );
}
