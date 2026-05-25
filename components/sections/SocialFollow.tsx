import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

interface Channel {
  name: string;
  description: string;
  cta: string;
  href: string;
}

const channels: Channel[] = [
  {
    name: "TikTok",
    description: "Answers in under 60 seconds.",
    cta: "Follow on TikTok →",
    href: "https://tiktok.com/@japanprotips",
  },
  {
    name: "YouTube",
    description: "Longer walkthroughs when they're needed.",
    cta: "Subscribe on YouTube →",
    href: "https://youtube.com/@japanprotips",
  },
  {
    name: "Newsletter",
    description: "One useful Japan thing per week.",
    cta: "Join the weekly email →",
    href: "/newsletter",
  },
];

export function SocialFollow() {
  return (
    <section className="border-b border-stone-200 py-8">
      <Container>
        <SectionLabel>Follow along</SectionLabel>
        <p className="mb-5 text-base text-stone-500">
          The content lives across a few places. Find what works for you.
        </p>
        <div className="divide-y divide-stone-100">
          {channels.map((ch) => (
            <div
              key={ch.name}
              className="flex items-center justify-between py-4"
            >
              <div>
                <p className="text-base font-medium text-stone-900">{ch.name}</p>
                <p className="text-sm text-stone-400">{ch.description}</p>
              </div>
              <Button
                href={ch.href}
                gtagLabel={ch.name === "Newsletter" ? "newsletter" : undefined}
              >
                {ch.cta}
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
