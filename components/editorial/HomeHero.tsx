import { SiteLogo } from "@/components/brand/SiteLogo";
import { IMAGES } from "@/lib/images";
import { HeroTextStrip } from "@/components/editorial/HeroTextStrip";
import { PageHero } from "@/components/editorial/PageHero";
import { TrackedCtaLink } from "@/components/TrackedCtaLink";
import { TrackedStartHereLink } from "@/components/TrackedStartHereLink";

export function HomeHero() {
  return (
    <PageHero
      src={IMAGES.hero.primary}
      alt="Train platform in Japan at dusk"
      variant="home"
      align="center"
      priority
    >
      <div className="mb-6 rounded-md bg-black/55 px-4 py-3 backdrop-blur-md">
        <SiteLogo variant="masthead" linked={false} className="mx-auto" />
      </div>
      <HeroTextStrip
        as="p"
        className="editorial-deck mx-auto mb-3 max-w-xl text-paper-card/95"
      >
        Practical Japan travel and life guides, explained simply.
      </HeroTextStrip>
      <HeroTextStrip
        as="p"
        className="mx-auto mb-6 max-w-lg text-center font-sans text-body text-paper-card/80"
      >
        No fluff. No tourist traps. Real tips for visitors and residents
        navigating Japan.
      </HeroTextStrip>
      <TrackedStartHereLink
        href="/guides/start-here-japan"
        className="editorial-btn-primary"
      >
        Start Here
      </TrackedStartHereLink>
      <HeroTextStrip
        as="p"
        className="mx-auto mt-6 font-sans text-body text-paper-card/75"
      >
        Already live here?{" "}
        <TrackedCtaLink
          href="/residents"
          label="resident_guides"
          className="font-bold text-tan underline decoration-tan/50 underline-offset-2 transition-colors hover:text-paper-card"
        >
          Residents hub →
        </TrackedCtaLink>
      </HeroTextStrip>
    </PageHero>
  );
}
