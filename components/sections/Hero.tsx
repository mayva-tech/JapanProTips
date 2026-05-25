import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Hero() {
  return (
    <section className="border-b border-stone-200 py-8">
      <Container>
        <SectionLabel>JapanProTips</SectionLabel>
        <h1 className="mb-4 text-4xl font-medium leading-snug tracking-tight text-stone-900 sm:text-5xl">
          Clear, practical Japan guides from someone living in Japan.
        </h1>
        <p className="mb-6 max-w-lg text-body text-stone-500">
          For tourists planning a trip and foreigners building a life here.
          Specific, honest, and written from the inside.
        </p>
        <Button href="/start-here" variant="primary" gtagLabel="start_here">
          Open the trip planning checklist →
        </Button>
      </Container>
    </section>
  );
}
