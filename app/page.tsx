import type { Metadata } from "next";
import { FunnelCard } from "@/components/editorial/FunnelCard";
import { HomeCategoryPillar } from "@/components/editorial/HomeCategoryPillar";
import { HomeLatestGuides } from "@/components/editorial/HomeLatestGuides";
import { HomeMasthead } from "@/components/editorial/HomeMasthead";
import { ImportantGuidesCarousel } from "@/components/editorial/ImportantGuidesCarousel";
import { GuideSearch } from "@/components/editorial/GuideSearch";
import { MagazineShell } from "@/components/editorial/MagazineShell";
import { MagazineSectionTitle } from "@/components/editorial/MagazineSectionTitle";
import { ToolRecommendationStrip } from "@/components/tools/ToolRecommendationStrip";
import { TrackedToolLink } from "@/components/tools/TrackedToolLink";
import { buildGuideSearchIndex } from "@/lib/guide-search-index.server";
import { IMAGES } from "@/lib/images";
import { SITE_TOOLS, toRecommendationCard } from "@/lib/site-tools";
import { HomeResidentCta } from "@/components/editorial/HomeResidentCta";
import { PopularStartHereGuides } from "@/components/editorial/PopularStartHereGuides";
import { ItineraryHubCta } from "@/components/itinerary/ItineraryHubCta";
import { TrackedStartHereLink } from "@/components/TrackedStartHereLink";
import { SiteLogo } from "@/components/brand/SiteLogo";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: DEFAULT_TITLE },
  description: DEFAULT_DESCRIPTION,
};

export default function HomePage() {
  const guideSearchIndex = buildGuideSearchIndex();

  return (
    <main className="min-h-screen bg-paper font-sans">
      <HomeMasthead />

      <section className="border-b border-paper-edge bg-paper py-8 sm:py-12">
        <MagazineShell>
          <MagazineSectionTitle
            title="The latest"
            browseHref="/tourists"
            browseLabel="Browse all guides"
          />
          <HomeLatestGuides />
        </MagazineShell>
      </section>

      <section className="py-10 sm:py-14">
        <MagazineShell>
          <div className="lg:grid lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 lg:col-span-8">
              <HomeCategoryPillar
                title="Get Planning"
                description="Land, connect, and move before you worry about the rest."
                browseHref="/start-here"
                browseLabel="Full trip checklist"
              >
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
                      imageSrc={IMAGES.hero.airport}
                      imageAlt="Travelers at a Japan airport arrivals hall"
                    />
                  </div>
                  <FunnelCard
                    eyebrow="Connectivity"
                    title="SIM Card Guide"
                    description="eSIM, pocket WiFi, and physical SIM: what actually works for your trip."
                    cta="Pick your SIM path →"
                    href="/guides/sim-card-japan"
                    gtagLabel="esim"
                    imageSrc={IMAGES.guides.esim}
                    imageAlt="Phone showing eSIM setup for travel in Japan"
                  />
                  <FunnelCard
                    eyebrow="Transport"
                    title="Transport Guide"
                    description="Trains, IC cards, and apps so you are not guessing at the gate."
                    cta="Learn how to get around →"
                    href="/guides/getting-around-japan"
                    gtagLabel="transport"
                    imageSrc={IMAGES.hero.shinkansen}
                    imageAlt="Shinkansen train at a station in Japan"
                  />
                </div>
              </HomeCategoryPillar>

              <HomeCategoryPillar
                title="Get Essentials"
                description="Lock these in early so money and sleep do not fight your itinerary."
                browseHref="/guides/japan-itinerary"
                browseLabel="Itinerary guide"
              >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FunnelCard
                    eyebrow="Lodging"
                    title="Where to Stay"
                    description="Why station distance beats hotel stars, especially in Tokyo."
                    cta="Find a neighborhood →"
                    href="/guides/where-to-stay-tokyo"
                    gtagLabel="hotel"
                    imageSrc={IMAGES.guides.maps}
                    imageAlt="Map planning for Tokyo neighborhoods and stations"
                  />
                  <FunnelCard
                    eyebrow="Money"
                    title="Budget Guide"
                    description="Real yen ranges for food, trains, and sleep so you do not under-plan."
                    cta="See trip cost breakdown →"
                    href="/guides/japan-budget-breakdown"
                    gtagLabel="budget"
                    imageSrc={IMAGES.hero.suica}
                    imageAlt="Suica IC card used for payments and trains in Japan"
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
                    imageSrc={IMAGES.guides.esim}
                    imageAlt="eSIM and pocket WiFi options for Japan travel"
                  />
                </div>
              </HomeCategoryPillar>

              <PopularStartHereGuides />

              <section className="mb-12 sm:mb-14">
                <MagazineSectionTitle title="Important Japan Guides" />
                <ImportantGuidesCarousel />
              </section>

              <section className="mb-6">
                <MagazineSectionTitle
                  title="Search guides"
                  browseHref="/tourists"
                  browseLabel="View index"
                />
                <GuideSearch entries={guideSearchIndex} />
              </section>
            </div>

            <aside className="mt-6 space-y-8 lg:col-span-4 lg:mt-0">
              <div className="magazine-sidebar-card">
                <ItineraryHubCta
                  sourcePage="/"
                  ctaPosition="sidebar"
                  className="!border-0 !bg-transparent !p-0 !shadow-none"
                />
              </div>

              <div className="magazine-sidebar-card">
                <ToolRecommendationStrip
                  headingId="home-sidebar-tools"
                  title="Japan Travel Tools"
                  deck="Calculators and checkers for planning without guesswork."
                  tools={SITE_TOOLS.map(toRecommendationCard)}
                  analyticsSourceSlug="home"
                  variant="compact"
                  layout="stack"
                />
                <p className="mt-4">
                  <TrackedToolLink
                    href="/tools"
                    sourceSlug="home"
                    className="font-sans text-sm font-bold uppercase tracking-widest text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
                  >
                    Browse all tools →
                  </TrackedToolLink>
                </p>
              </div>

              <HomeResidentCta embedded />
            </aside>
          </div>
        </MagazineShell>
      </section>

      <section className="bg-ink py-14 sm:py-16">
        <MagazineShell>
          <div className="border border-paper-edge/20 px-8 py-8 sm:px-10 sm:py-8">
            <p className="editorial-kicker text-tan">Why this exists</p>
            <h2 className="editorial-heading mb-5 text-paper-card">
              Japan info you can actually use.
            </h2>
            <p className="article-body max-w-2xl text-paper-card/75">
              Most Japan guides are generic or written for SEO. This one focuses
              on what matters when you are on the ground.
            </p>
            <TrackedStartHereLink
              href="/start-here"
              className="editorial-btn-primary mt-6"
            >
              Start the full checklist →
            </TrackedStartHereLink>
          </div>
        </MagazineShell>
      </section>

      <footer className="border-t-2 border-ink bg-paper">
        <MagazineShell className="flex flex-wrap items-center justify-between gap-4 py-8">
          <SiteLogo variant="footer" />
          <span className="article-body max-w-md italic sm:text-right">
            Practical Japan explained simply.
          </span>
        </MagazineShell>
      </footer>
    </main>
  );
}
