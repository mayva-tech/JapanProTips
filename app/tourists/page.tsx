import { ESimConversionBlock, HotelConversionBlock, StartHereFunnelBlock } from "@/components/conversion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { conversionLabelForHref } from "@/lib/gtag-events";

export const metadata = {
  title: "Planning a Trip to Japan",
  description:
    "Practical guides for tourists visiting Japan. Transport, SIM cards, money, and the mistakes worth avoiding before you land.",
};

// TODO: Section 1: Hero
// Headline: "Going to Japan? Start here before you waste money."
// Subheadline: "Practical guides for transport, SIM cards, money, and first-time mistakes.
//               Written by someone who lives here, not someone who visited once."
// CTA: "Read the Start Here guide →" → /start-here

// TODO: Section 2: Situation router
// Purpose: decision engine, not just a guide grid.
// Split visitors into sub-paths:
//   - First time in Japan
//   - Returning visitor planning a longer trip
//   - Coming for a specific reason (work trip, family, event)
// Each card routes to a focused guide cluster, not a generic list.

// TODO: Section 3: First-time visitor path
// Ordered checklist of decisions to make before arrival:
//   1. Sort your SIM card → /guides/sim-card-japan
//   2. Understand IC cards before buying a JR Pass → /guides/ic-card-jr-pass
//   3. Know how much cash to carry → /guides/cost-of-living-japan
//   4. Read what trips people up → /guides/japan-tourist-mistakes
// Present as a numbered or sequenced list, not a card grid.
// The point is sequence: do this, then this, then this.

// TODO: Section 4: Reality check
// Short, opinionated prose section (no cards).
// Topics:
//   - Japan is not as expensive as people fear, but cash is still king
//   - The JR Pass math people get wrong
//   - Why English is less available outside Tokyo
//   - Things that feel hard but aren't (trains, convenience stores, etiquette)
//   - Things that feel easy but trip people up (cash, trash, some addresses)
// Tone: direct, specific, slightly wry. Not a listicle.

// TODO: Section 5: Tourist guide list
// Full grid of tourist-relevant guides.
// All cards use Pill color="coral" for tourist track color throughout.
// Categories: Transport, Money, Connectivity, Accommodation, Food, Day trips
// Each card: category pill, title, one-line description, "Read the guide →" CTA

// TODO: Section 6: Recommended setup block
// Title: "The setup most people get right the second time."
// Three things in sequence, not a grid:
//   1. Get a SIM card at the convenience store, not the airport
//   2. Load your IC card before you leave the airport
//   3. Get ¥30,000-50,000 cash from a 7-Eleven ATM on arrival
// Short, numbered, specific. Not a card layout: plain text or a simple ordered list.

// TODO: Section 7: Final CTA
// Headline: "Plan smarter before you land."
// Body: "The Start Here guide covers the ten things worth knowing before you
//         do anything else, whether tourist or resident."
// CTA: "Read the Start Here guide →" → /start-here

export default function TouristsPage() {
  return (
    <main>
      {/* Placeholder hero: replace with full section when ready */}
      <section className="border-b border-stone-200 py-16">
        <Container>
          <SectionLabel>Visiting Japan</SectionLabel>
          <h1 className="mb-4 text-4xl font-medium leading-snug tracking-tight text-stone-900 sm:text-5xl">
            Going to Japan? Start here before you waste money.
          </h1>
          <p className="mb-3 max-w-lg text-body text-stone-500">
            Practical guides for transport, SIM cards, money, and first-time
            mistakes.
          </p>
          <p className="mb-8 max-w-lg text-sm font-semibold uppercase tracking-widest text-stone-500">
            Independent. Engineer based in Japan—not a travel agency.
          </p>
          <Button href="/start-here" variant="primary" gtagLabel="start_here">
            Walk through the trip planning checklist →
          </Button>
          <div className="mx-auto mt-10 max-w-2xl">
            <ESimConversionBlock />
          </div>
          <div className="mx-auto mt-8 max-w-2xl">
            <HotelConversionBlock />
          </div>
          <div className="mx-auto mt-8 max-w-2xl">
            <StartHereFunnelBlock />
          </div>
        </Container>
      </section>

      {/* Placeholder guide cards: replace with full section grid when ready */}
      <section className="border-b border-stone-200 py-12">
        <Container>
          <SectionLabel>Tourist guides</SectionLabel>
          <p className="mb-5 text-base text-stone-500">
            The guides first-time visitors actually need.
          </p>
          <div className="flex flex-col gap-3">
            <Card>
              <Pill color="coral">Connectivity</Pill>
              <h3 className="mt-2 text-base font-medium leading-snug text-stone-900">
                Getting a SIM card in Japan without overpaying
              </h3>
              <p className="mb-3 mt-1 text-base text-stone-500">
                What to buy, where to get it, and why the airport kiosk is a
                trap.
              </p>
              <Button href="/guides/sim-card-japan" gtagLabel="esim">
                Best SIM card for Japan →
              </Button>
            </Card>
            <Card>
              <Pill color="coral">Transport</Pill>
              <h3 className="mt-2 text-base font-medium leading-snug text-stone-900">
                IC cards, JR Pass, and when not to buy one
              </h3>
              <p className="mb-3 mt-1 text-base text-stone-500">
                The JR Pass is not always worth it. Here&apos;s the math and
                when it makes sense.
              </p>
              <Button href="/guides/ic-card-jr-pass" gtagLabel="transport">
                JR Pass & IC cards in Japan →
              </Button>
            </Card>
            <Card>
              <Pill color="coral">Money</Pill>
              <h3 className="mt-2 text-base font-medium leading-snug text-stone-900">
                How much money you actually need for Japan
              </h3>
              <p className="mb-3 mt-1 text-base text-stone-500">
                Japan is cheaper than most expect and more cash-heavy than most
                prepare for.
              </p>
              <Button
                href="/guides/cost-of-living-japan"
                gtagLabel={conversionLabelForHref("/guides/cost-of-living-japan")}
              >
                Cost of living & cash needs in Japan →
              </Button>
            </Card>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="bg-stone-100 py-16">
        <Container>
          <SectionLabel>Before you land</SectionLabel>
          <h2 className="mb-3 text-2xl font-medium leading-snug text-stone-900">
            Plan smarter before you land.
          </h2>
          <p className="article-body-sm mb-6 text-stone-500">
            The Start Here guide covers the ten things worth knowing before you
            do anything else, whether tourist or resident.
          </p>
          <Button
            href="/start-here"
            variant="primary"
            className="w-full text-center sm:w-auto"
            gtagLabel="start_here"
          >
            Walk through the trip planning checklist →
          </Button>
        </Container>
      </section>
    </main>
  );
}
