import type { Metadata } from "next";
import { FunnelCard } from "@/components/editorial/FunnelCard";
import { HomeHero } from "@/components/editorial/HomeHero";
import { ImportantGuidesCarousel } from "@/components/editorial/ImportantGuidesCarousel";
import { GuideSearch } from "@/components/editorial/GuideSearch";
import { ToolRecommendationStrip } from "@/components/tools/ToolRecommendationStrip";
import { TrackedToolLink } from "@/components/tools/TrackedToolLink";
import { buildGuideSearchIndex } from "@/lib/guide-search-index.server";
import { SITE_TOOLS, toRecommendationCard } from "@/lib/site-tools";
import { HomeResidentCta } from "@/components/editorial/HomeResidentCta";
import { PopularStartHereGuides } from "@/components/editorial/PopularStartHereGuides";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { TrackedStartHereLink } from "@/components/TrackedStartHereLink";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: DEFAULT_TITLE },
  description: DEFAULT_DESCRIPTION,
};

export default function HomePage() {
  const guideSearchIndex = buildGuideSearchIndex();

  return (
    <main className="min-h-screen font-sans">
      <HomeHero />

      <section className="border-b border-paper-edge bg-paper-elevated py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-6">
          <ToolRecommendationStrip
            headingId="home-japan-travel-tools"
            title="Japan Travel Tools"
            deck="Practical calculators and checkers for planning Japan without guessing."
            tools={SITE_TOOLS.map(toRecommendationCard)}
            analyticsSourceSlug="home"
          />
          <p className="mt-5 text-center sm:text-left">
            <TrackedToolLink
              href="/tools"
              sourceSlug="home"
              className="font-sans text-sm font-bold uppercase tracking-widest text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
            >
              Browse all tools →
            </TrackedToolLink>
          </p>
        </div>
      </section>

      <HomeResidentCta />

      <GuideSearch entries={guideSearchIndex} />

      <PopularStartHereGuides />

      <section className="border-b border-paper-edge bg-paper py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="editorial-heading mb-2 text-ink">
            Important Japan Guides
          </h2>
          <ImportantGuidesCarousel />
        </div>
      </section>

      <section className="bg-paper-elevated py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <SectionLabel>Trip prep</SectionLabel>
          <h2 className="editorial-heading mb-4 text-ink">Start Here</h2>
          <p className="article-body mb-12 max-w-2xl">
            Land, connect, and move before you worry about the rest.
          </p>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:grid-rows-2">
            <div className="lg:col-span-2 lg:row-span-2">
              <FunnelCard
                featured
                eyebrow="Airport"
                title="Airport Guide"
                description="First hour at Narita or Haneda, then how to reach the city without getting stuck. The decisions you make in the first sixty minutes set the tone for the whole trip."
                cta="Read airport guide →"
                href="/guides/japan-airport-first-steps"
                gtagLabel="transport"
              />
            </div>
            <FunnelCard
              eyebrow="Connectivity"
              title="SIM Card Guide"
              description="eSIM, pocket WiFi, and physical SIM: what actually works for your trip."
              cta="Pick your SIM path →"
              href="/guides/sim-card-japan"
              gtagLabel="esim"
            />
            <FunnelCard
              eyebrow="Transport"
              title="Transport Guide"
              description="Trains, IC cards, and apps so you are not guessing at the gate."
              cta="Learn how to get around →"
              href="/guides/getting-around-japan"
              gtagLabel="transport"
            />
          </div>
        </div>
      </section>

      <div className="editorial-divider-strong mx-auto max-w-4xl" />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <SectionLabel>Essentials</SectionLabel>
          <h2 className="editorial-heading mb-4 text-ink">
            Most Important Guides
          </h2>
          <p className="article-body mb-12 max-w-2xl">
            Lock these in early so money and sleep do not fight your itinerary.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FunnelCard
              eyebrow="Lodging"
              title="Where to Stay"
              description="Why station distance beats hotel stars, especially in Tokyo."
              cta="Find a neighborhood →"
              href="/guides/where-to-stay-tokyo"
              gtagLabel="hotel"
            />
            <FunnelCard
              eyebrow="Money"
              title="Budget Guide"
              description="Real yen ranges for food, trains, and sleep so you do not under-plan."
              cta="See trip cost breakdown →"
              href="/guides/japan-budget-breakdown"
              gtagLabel="budget"
            />
          </div>
          <div className="mt-6">
            <FunnelCard
              eyebrow="Connectivity"
              title="eSIM vs Pocket WiFi"
              description="Honest tradeoffs for Japan data, battery life, and rental pickup."
              cta="Compare both options →"
              href="/guides/esim-vs-pocket-wifi-japan"
              gtagLabel="esim"
            />
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="border border-paper-edge/20 px-8 py-10 sm:px-10 sm:py-12">
            <SectionLabel className="text-tan">Why this exists</SectionLabel>
            <h2 className="editorial-heading mb-5 text-paper-card">
              Japan info you can actually use.
            </h2>
            <p className="article-body max-w-2xl text-paper-card/75">
              Most Japan guides are generic or written for SEO. This one focuses
              on what matters when you are on the ground.
            </p>
            <p className="mt-5 font-sans text-kicker font-black uppercase text-paper-card/60">
              Built by a Japan-based engineer. Not a travel agency.
            </p>
            <TrackedStartHereLink
              href="/guides/start-here-japan"
              className="editorial-btn-primary mt-8"
            >
              Start the full checklist →
            </TrackedStartHereLink>
          </div>
        </div>
      </section>

      <footer className="border-t-2 border-ink bg-paper">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-6 py-10">
          <span className="font-sans text-lead font-black uppercase text-maroon">
            JapanProTips
          </span>
          <span className="article-body max-w-xs italic sm:max-w-none sm:text-right">
            Practical Japan explained simply.
          </span>
        </div>
      </footer>
    </main>
  );
}
