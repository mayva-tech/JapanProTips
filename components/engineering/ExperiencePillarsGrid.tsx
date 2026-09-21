import type { ExperiencePillar } from "@/lib/engineering-copy";

type ExperiencePillarsGridProps = {
  pillars: ExperiencePillar[];
};

export function ExperiencePillarsGrid({ pillars }: ExperiencePillarsGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {pillars.map((pillar) => (
        <article
          key={pillar.id}
          className="editorial-card border border-paper-edge bg-paper-card p-5"
        >
          <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-dark">
            {pillar.title}
          </h3>
          <p className="article-body mt-3 text-sm">{pillar.description}</p>
        </article>
      ))}
    </div>
  );
}
