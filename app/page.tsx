import type { Metadata } from "next";
import type { ConversionGtagLabel } from "@/lib/gtag-events";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: DEFAULT_TITLE },
  description: DEFAULT_DESCRIPTION,
};
import { TrackedCtaLink } from "@/components/TrackedCtaLink";
import { TrackedStartHereLink } from "@/components/TrackedStartHereLink";

type FunnelCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  gtagLabel: ConversionGtagLabel;
};

function FunnelCard({
  eyebrow,
  title,
  description,
  cta,
  href,
  gtagLabel,
}: FunnelCardProps) {
  return (
    <TrackedCtaLink
      href={href}
      label={gtagLabel}
      className="group flex h-full flex-col border border-[#d4c9b0] bg-white p-6 shadow-sm transition-all duration-150 hover:border-maroon hover:shadow-md"
    >
      <p className="mb-2 font-sans text-xs font-bold uppercase tracking-widest text-rust">
        {eyebrow}
      </p>
      <h3 className="mb-3 font-display text-xl leading-tight tracking-wide text-dark sm:text-2xl">
        {title}
      </h3>
      <p className="mb-6 flex-1 font-serif text-sm leading-relaxed text-muted sm:text-base">
        {description}
      </p>
      <span className="mt-auto inline-flex w-full items-center justify-center bg-maroon px-4 py-3.5 font-sans text-xs font-bold uppercase tracking-widest text-white transition-colors duration-150 group-hover:bg-rust">
        {cta}
      </span>
    </TrackedCtaLink>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-cream font-sans">
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pb-14 pt-16 text-center">
        <h1
          className="mb-4 font-display leading-none tracking-wide text-dark"
          style={{ fontSize: "clamp(40px, 7vw, 76px)" }}
        >
          JapanProTips
        </h1>
        <p className="mx-auto mb-4 max-w-xl font-serif text-lg leading-relaxed text-muted">
          Practical Japan travel and life guides, explained simply.
        </p>
        <p className="mx-auto mb-10 max-w-xl font-serif text-base leading-relaxed text-muted">
          No fluff. No tourist traps. Real tips for visitors and residents
          navigating Japan.
        </p>
        <TrackedStartHereLink
          href="/guides/start-here-japan"
          className="inline-block bg-maroon px-10 py-4 font-sans text-sm font-bold uppercase tracking-widest text-white transition-colors duration-150 hover:bg-rust"
        >
          Start Here
        </TrackedStartHereLink>
        <p className="mx-auto mt-6 max-w-md font-serif text-sm text-muted">
          Already live here?{" "}
          <TrackedCtaLink
            href="/residents"
            label="resident_guides"
            className="font-sans font-bold text-rust underline decoration-rust/40 underline-offset-2 transition-colors hover:text-maroon"
          >
            Residents hub →
          </TrackedCtaLink>
        </p>
      </section>

      <div className="mx-auto max-w-4xl px-6">
        <div className="border-t-2 border-dark" />
      </div>

      {/* Start Here: first decisions */}
      <section className="mx-auto max-w-4xl px-6 py-14">
        <h2
          className="mb-3 font-display tracking-wide text-dark"
          style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
        >
          Start Here
        </h2>
        <p className="mb-10 max-w-2xl font-serif text-base leading-relaxed text-muted">
          Land, connect, and move before you worry about the rest.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          <FunnelCard
            eyebrow="Airport"
            title="Airport Guide"
            description="First hour at Narita or Haneda, then how to reach the city without getting stuck."
            cta="Read airport guide →"
            href="/guides/japan-airport-first-steps"
            gtagLabel="transport"
          />
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
      </section>

      <div className="mx-auto max-w-4xl px-6">
        <div className="border-t border-tan" />
      </div>

      {/* Most important guides */}
      <section className="mx-auto max-w-4xl px-6 py-14">
        <h2
          className="mb-3 font-display tracking-wide text-dark"
          style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
        >
          Most Important Guides
        </h2>
        <p className="mb-10 max-w-2xl font-serif text-base leading-relaxed text-muted">
          Lock these in early so money and sleep do not fight your itinerary.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
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
          <FunnelCard
            eyebrow="Connectivity"
            title="eSIM vs Pocket WiFi"
            description="Honest tradeoffs for Japan data, battery life, and rental pickup."
            cta="Compare both options →"
            href="/guides/esim-vs-pocket-wifi-japan"
            gtagLabel="esim"
          />
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6">
        <div className="border-t border-tan" />
      </div>

      {/* Trust */}
      <section className="mx-auto max-w-4xl px-6 py-14">
        <div className="bg-dark px-8 py-10">
          <p className="mb-2 font-display text-xl tracking-widest text-tan">
            WHY THIS SITE EXISTS ///
          </p>
          <h2
            className="mb-5 font-display tracking-wide text-cream"
            style={{ fontSize: "clamp(26px, 3.5vw, 40px)" }}
          >
            Japan info you can actually use.
          </h2>
          <p className="max-w-2xl font-serif text-base leading-relaxed text-[#aab4be]">
            Most Japan guides are generic or written for SEO. This one focuses on
            what matters when you are on the ground.
          </p>
          <p className="mt-5 font-sans text-xs font-bold uppercase tracking-widest text-[#aab4be]">
            Built by a Japan-based engineer. Not a travel agency.
          </p>
          <TrackedStartHereLink
            href="/guides/start-here-japan"
            className="mt-8 inline-block bg-maroon px-9 py-4 font-sans text-sm font-bold uppercase tracking-widest text-white transition-colors duration-150 hover:bg-rust"
          >
            Start the full checklist →
          </TrackedStartHereLink>
        </div>
      </section>

      <footer className="border-t-2 border-dark bg-cream">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-6 py-8">
          <span className="font-display text-xl tracking-wide text-dark">
            JAPAN PRO TIPS
          </span>
          <span className="max-w-xs font-serif text-base italic text-muted sm:max-w-none sm:text-right">
            Practical Japan explained simply.
          </span>
        </div>
      </footer>
    </main>
  );
}
