import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Pill } from "@/components/ui/Pill";
import { conversionLabelForHref } from "@/lib/gtag-events";

type PillColor = "coral" | "teal" | "gray";

interface Guide {
  category: string;
  categoryColor: PillColor;
  title: string;
  description: string;
  slug: string;
  cta: string;
}

const guides: Guide[] = [
  {
    category: "Transport",
    categoryColor: "coral",
    title: "How to get a SIM card in Japan without overpaying",
    description:
      "What to buy, where to get it, and why the airport kiosk is a trap.",
    slug: "/guides/sim-card-japan",
    cta: "Pick a SIM that fits your trip →",
  },
  {
    category: "Transport",
    categoryColor: "coral",
    title: "IC cards, JR Pass, and when not to buy one",
    description:
      "The JR Pass is not always worth it. Here's the math and when it makes sense.",
    slug: "/guides/ic-card-jr-pass",
    cta: "Decide if you need a JR Pass →",
  },
  {
    category: "Living here",
    categoryColor: "teal",
    title: "The My Number card, explained simply",
    description:
      "What it does, how to get it, and why you need it before you can do almost anything else.",
    slug: "/guides/my-number-card",
    cta: "Line up your My Number card early →",
  },
  {
    category: "Money",
    categoryColor: "coral",
    title: "How much money you actually need for Japan",
    description:
      "Japan is cheaper than most expect and more cash-heavy than most prepare for.",
    slug: "/guides/cost-of-living-japan",
    cta: "Budget cash and card spending →",
  },
];

export function FeaturedGuides() {
  return (
    <section className="border-b border-stone-200 py-12">
      <Container>
        <SectionLabel>Featured guides</SectionLabel>
        <p className="mb-5 text-sm text-stone-500">
          The guides most people need first.
        </p>
        <div className="flex flex-col gap-3">
          {guides.map((guide) => (
            <Card key={guide.slug}>
              <Pill color={guide.categoryColor}>{guide.category}</Pill>
              <h3 className="mt-2 text-sm font-medium leading-snug text-stone-900">
                {guide.title}
              </h3>
              <p className="mb-3 mt-1 text-sm text-stone-500">
                {guide.description}
              </p>
              <Button href={guide.slug} gtagLabel={conversionLabelForHref(guide.slug)}>
                {guide.cta}
              </Button>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
