import type { Metadata } from "next";
import Link from "next/link";
import { ESimConversionBlock } from "@/components/conversion";
import { MagazinePageHeader } from "@/components/editorial/MagazinePageHeader";
import { MagazineShell } from "@/components/editorial/MagazineShell";
import { TouristGuidesIndex } from "@/components/editorial/TouristGuidesIndex";
import { ItineraryHubCta } from "@/components/itinerary/ItineraryHubCta";
import { ALL_TOURIST_GUIDES } from "@/lib/tourist-guides";
import { IMAGES } from "@/lib/images";
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
      <MagazinePageHeader
        kicker="Visiting Japan"
        title="Tourist guides for Japan"
        description="Practical field guides for transport, SIM cards, money, airports, and where to stay. Each card opens the full article. Pick what matches your trip stage."
        imageSrc={IMAGES.hero.airport}
        imageAlt="Travelers at a Japan airport"
        meta={
          <p className="font-sans text-kicker font-black uppercase text-muted">
            {guideCount} guides
          </p>
        }
        actions={
          <>
            <TrackedStartHereLink className="editorial-btn-primary">
              Start with the trip checklist →
            </TrackedStartHereLink>
            <Link
              href="/"
              className="inline-flex items-center justify-center border border-paper-edge bg-paper-card px-6 py-3.5 font-sans text-kicker font-black uppercase text-ink transition-colors hover:border-maroon/40"
            >
              Back to home →
            </Link>
          </>
        }
      />

      <MagazineShell className="py-8">
        <ESimConversionBlock />
        <div className="mt-6">
          <ItineraryHubCta
            sourcePage="/tourists"
            ctaPosition="before-guide-index"
          />
        </div>
      </MagazineShell>

      <TouristGuidesIndex />
    </main>
  );
}
