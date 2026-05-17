import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Pill } from "@/components/ui/Pill";
import { conversionLabelForHref } from "@/lib/gtag-events";

type PillColor = "free" | "gray";

interface Resource {
  title: string;
  description: string;
  pill: string;
  pillColor: PillColor;
  cta: string;
  href: string;
}

const resources: Resource[] = [
  {
    title: "Trip planning checklist",
    description: "PDF. Nothing left off.",
    pill: "Free",
    pillColor: "free",
    cta: "Download the trip checklist PDF →",
    href: "/resources/trip-checklist",
  },
  {
    title: "Pocket phrasebook",
    description: "20 phrases that matter.",
    pill: "Free",
    pillColor: "free",
    cta: "Download the pocket phrasebook →",
    href: "/resources/phrasebook",
  },
  {
    title: "IC card calculator",
    description: "Find your best transit pass.",
    pill: "Tool",
    pillColor: "gray",
    cta: "Run the IC card pass calculator →",
    href: "/tools/ic-card",
  },
  {
    title: "Visa checker",
    description: "What you need by nationality.",
    pill: "Tool",
    pillColor: "gray",
    cta: "Check visa rules for your passport →",
    href: "/tools/visa-checker",
  },
];

export function Resources() {
  return (
    <section className="border-b border-stone-200 py-12">
      <Container>
        <SectionLabel>Resources & tools</SectionLabel>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {resources.map((r) => (
            <div key={r.title} className="rounded-lg bg-stone-100 p-3">
              <Pill color={r.pillColor}>{r.pill}</Pill>
              <p className="mt-2 text-sm font-medium leading-snug text-stone-900">
                {r.title}
              </p>
              <p className="mb-3 mt-0.5 text-sm text-stone-500">
                {r.description}
              </p>
              <Button
                href={r.href}
                className="px-3 py-1.5 text-sm"
                gtagLabel={conversionLabelForHref(r.href)}
              >
                {r.cta}
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
