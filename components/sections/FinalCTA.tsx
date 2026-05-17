import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function FinalCTA() {
  return (
    <section className="bg-stone-100 py-16">
      <Container>
        <SectionLabel>Before you go further</SectionLabel>
        <h2 className="mb-3 text-2xl font-medium leading-snug text-stone-900">
          Don&apos;t figure Japan out the hard way.
        </h2>
        <p className="article-body-sm mb-6 text-stone-500">
          Start with the guide that covers the decisions most people get wrong
          before they arrive or settle in.
        </p>
        <Button
          href="/start-here"
          variant="primary"
          className="w-full text-center sm:w-auto"
          gtagLabel="start_here"
        >
          Walk through trip planning in order →
        </Button>
      </Container>
    </section>
  );
}
