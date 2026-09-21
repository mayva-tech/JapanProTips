type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

type ProcessSectionProps = {
  steps: readonly ProcessStep[];
};

export function ProcessSection({ steps }: ProcessSectionProps) {
  return (
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((item) => (
        <li
          key={item.step}
          className="editorial-card border border-paper-edge bg-paper-card p-5"
        >
          <p className="mb-3 font-sans text-2xl font-black text-rust">{item.step}</p>
          <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-dark">
            {item.title}
          </h3>
          <p className="article-body mt-3 text-sm">{item.description}</p>
        </li>
      ))}
    </ol>
  );
}
