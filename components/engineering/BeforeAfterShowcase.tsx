import type { BeforeAfterExample } from "@/lib/engineering-copy";

type BeforeAfterShowcaseProps = {
  examples: BeforeAfterExample[];
};

export function BeforeAfterShowcase({ examples }: BeforeAfterShowcaseProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {examples.map((example) => (
        <article
          key={example.title}
          className="editorial-card flex flex-col overflow-hidden border border-paper-edge bg-paper-card"
        >
          <h3 className="border-b border-paper-edge bg-paper-elevated px-5 py-3 font-sans text-sm font-bold uppercase tracking-widest text-dark">
            {example.title}
          </h3>
          <div className="grid flex-1 grid-cols-1 sm:grid-cols-2">
            <div className="border-b border-paper-edge px-5 py-4 sm:border-b-0 sm:border-r">
              <p className="mb-2 font-sans text-xs font-bold uppercase tracking-widest text-muted">
                Before
              </p>
              <p className="article-body text-sm text-muted">{example.before}</p>
            </div>
            <div className="px-5 py-4">
              <p className="mb-2 font-sans text-xs font-bold uppercase tracking-widest text-rust">
                After
              </p>
              <p className="article-body text-sm text-dark">{example.after}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
