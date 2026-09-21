type CategoryGridProps = {
  categories: Array<{
    id: string;
    title: string;
    description: string;
  }>;
};

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <article
          key={category.id}
          className="editorial-card border border-paper-edge bg-paper-card p-5"
        >
          <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-dark">
            {category.title}
          </h3>
          <p className="article-body mt-2 text-sm">{category.description}</p>
          <p className="mt-4 font-sans text-xs font-bold uppercase tracking-widest text-muted">
            Guides coming soon
          </p>
        </article>
      ))}
    </div>
  );
}
