import Image from "next/image";
import { IMAGES } from "@/lib/images";
import { TrackedCtaLink } from "@/components/TrackedCtaLink";
import { TrackedStartHereLink } from "@/components/TrackedStartHereLink";
import { SiteLogo } from "@/components/brand/SiteLogo";
import { MagazineShell } from "@/components/editorial/MagazineShell";

/** AoM-style homepage masthead: editorial copy + featured image, not full-viewport hero. */
export function HomeMasthead() {
  return (
    <section className="border-b border-paper-edge bg-paper-elevated py-8 sm:py-12">
      <MagazineShell>
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="col-span-full">
            <SiteLogo variant="masthead" className="mb-6 lg:mb-6" />
          </div>
          <div className="lg:col-span-7">
            <p className="editorial-kicker mb-3 sr-only">Field guide · Japan travel & life</p>
            <p className="editorial-deck mb-4 max-w-none text-muted sm:max-w-xl">
              Practical Japan travel and life guides, explained simply.
            </p>
            <p className="article-body mb-6 max-w-none sm:max-w-xl">
              No fluff. No tourist traps. Real tips for visitors and residents
              navigating Japan.
            </p>
            <div className="flex flex-wrap gap-4">
              <TrackedStartHereLink
                href="/start-here"
                className="editorial-btn-primary"
              >
                Start Here
              </TrackedStartHereLink>
              <TrackedCtaLink
                href="/tourists"
                label="start_here"
                className="inline-flex items-center justify-center border border-paper-edge bg-paper-card px-6 py-3.5 font-sans text-kicker font-black uppercase text-ink transition-colors hover:border-maroon/40"
              >
                All tourist guides →
              </TrackedCtaLink>
            </div>
            <p className="article-body-sm mt-6">
              Already live here?{" "}
              <TrackedCtaLink
                href="/residents"
                label="resident_guides"
                className="font-bold text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
              >
                Residents hub →
              </TrackedCtaLink>
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="editorial-card relative aspect-[4/3] overflow-hidden">
              <Image
                src={IMAGES.hero.primary}
                alt="Train platform in Japan at dusk"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="hero-image object-cover"
              />
              <p className="absolute bottom-0 left-0 right-0 bg-ink/70 px-4 py-2 font-sans text-xs font-semibold text-paper-card/90">
                Photo: Japan rail and city travel
              </p>
            </div>
          </div>
        </div>
      </MagazineShell>
    </section>
  );
}
