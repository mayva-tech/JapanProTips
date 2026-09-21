type PlaceholderGuideGridProps = {
  titles: readonly string[];
};

export function PlaceholderGuideGrid({ titles }: PlaceholderGuideGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {titles.map((title) => (
        <article
          key={title}
          className="editorial-card flex flex-col border border-paper-edge bg-paper-card p-5"
        >
          <p className="editorial-kicker mb-2">Coming soon</p>
          <h3 className="editorial-heading mb-3 text-ink">{title}</h3>
          <p className="article-body mt-auto text-sm text-muted">
            Placeholder for a future engineer authority guide.
          </p>
        </article>
      ))}
    </div>
  );
}
