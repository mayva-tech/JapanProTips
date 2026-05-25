import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Pill } from "@/components/ui/Pill";
import { conversionLabelForHref } from "@/lib/gtag-events";

type PillColor = "teal" | "coral";
type AccentColor = "teal" | "coral";

interface Category {
  pill: string;
  pillColor: PillColor;
  accent: AccentColor;
  title: string;
  description: string;
  href: string;
  cta: string;
}

const categories: Category[] = [
  {
    pill: "Tourists",
    pillColor: "coral",
    accent: "coral",
    title: "Planning a trip to Japan?",
    description:
      "Transport, SIM cards, money, IC cards, what to sort before you fly.",
    href: "/tourists",
    cta: "Plan your trip →",
  },
  {
    pill: "Residents",
    pillColor: "teal",
    accent: "teal",
    title: "Living in Japan as a foreigner?",
    description:
      "My Number, banking, health insurance, housing: the systems stack, explained.",
    href: "/residents",
    cta: "Set up daily life after you move →",
  },
];

export function AudiencePaths() {
  return (
    <section className="border-b border-stone-200 py-8">
      <Container>
        <SectionLabel>Where do you need help?</SectionLabel>
        <div className="flex flex-col gap-3">
          {categories.map((cat) => (
            <Card key={cat.title} accent={cat.accent}>
              <Pill color={cat.pillColor}>{cat.pill}</Pill>
              <h2 className="mt-2 text-lg font-medium text-stone-900">
                {cat.title}
              </h2>
              <p className="mb-3 mt-1 text-base text-stone-500">
                {cat.description}
              </p>
              <Button href={cat.href} gtagLabel={conversionLabelForHref(cat.href)}>
                {cat.cta}
              </Button>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
