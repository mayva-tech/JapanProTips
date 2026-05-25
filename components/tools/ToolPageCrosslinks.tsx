import { ToolRecommendationStrip } from "@/components/tools/ToolRecommendationStrip";
import { TrackedToolLink } from "@/components/tools/TrackedToolLink";
import { otherToolStripCards } from "@/lib/site-tools";

const browseClass =
  "font-sans text-sm font-bold uppercase tracking-widest text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon";

export function ToolPageCrosslinks({ currentSlug }: { currentSlug: string }) {
  const tools = otherToolStripCards(currentSlug);
  return (
    <div className="mt-6">
      <ToolRecommendationStrip
        headingId={`cross-tools-${currentSlug}`}
        title="Use another Japan tool"
        deck="Each tool keeps its own inputs. Open another when you want a different question answered."
        tools={tools}
        analyticsSourceSlug={currentSlug}
        variant="compact"
      />
      <p className="mt-4 text-center sm:text-left">
        <TrackedToolLink href="/tools" sourceSlug={currentSlug} className={browseClass}>
          Browse all tools →
        </TrackedToolLink>
      </p>
    </div>
  );
}
