import type { Metadata } from "next";
import Link from "next/link";
import { ESimConversionBlock } from "@/components/conversion";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { TouristGuidesIndex } from "@/components/editorial/TouristGuidesIndex";
import { ItineraryHubCta } from "@/components/itinerary/ItineraryHubCta";
import { ALL_TOURIST_GUIDES } from "@/lib/tourist-guides";
import { TrackedStartHereLink } from "@/components/TrackedStartHereLink";

export const metadata: Metadata = {
  title: "Planning a Trip to Japan",
  description:
    "All tourist guides for Japan: trip planning, airports, SIM cards, trains, money, and where to stay. Click any guide to read the full article.",
};

export default function TouristsPage() {
  const guideCount = ALL_TOURIST_GUIDES.length;

  return (
    <main className="min-h-screen bg-paper font-sans">
      <section className="border-b border-paper-edge bg-paper-elevated py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel>Visiting Japan</SectionLabel>
          <h1
            className="editorial-heading mb-4 max-w-3xl text-ink"
            style={{ fontSize: "clamp(32px, 5vw, 48px)" }}
          >
            Tourist guides for Japan
          </h1>
          <p className="article-body mb-4 max-w-2xl">
            Practical field guides for transport, SIM cards, money, airports, and
            where to stay. Each card opens the full article. Pick what matches
            your trip stage.
          </p>
          <p className="mb-8 font-sans text-kicker font-black uppercase text-muted">
            {guideCount} guides · Independent · Engineer based in Japan
          </p>
          <div className="flex flex-wrap gap-4">
            <TrackedStartHereLink className="editorial-btn-primary">
              Start with the trip checklist →
            </TrackedStartHereLink>
            <Link
              href="/"
              className="inline-flex items-center justify-center border border-paper-edge bg-paper-card px-6 py-3.5 font-sans text-kicker font-black uppercase text-ink transition-colors hover:border-maroon/40"
            >
              Back to home →
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <ESimConversionBlock />
        <div className="mt-10">
          <ItineraryHubCta
            sourcePage="/tourists"
            ctaPosition="before-guide-index"
          />
        </div>
      </div>

      <TouristGuidesIndex />
    </main>
  );
}
