import Link from "next/link";
import type { CornerstoneGuide } from "@/lib/engineering-copy";

type CornerstoneGuideGridProps = {
  guides: CornerstoneGuide[];
};

export function CornerstoneGuideGrid({ guides }: CornerstoneGuideGridProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {guides.map((guide) => (
        <article
          key={guide.id}
          className="editorial-card flex flex-col border-2 border-maroon/15 bg-paper-card p-6"
        >
          <p className="editorial-kicker mb-2">
            {guide.href ? "Cornerstone guide" : "Coming soon"}
          </p>
          <h3 className="editorial-heading mb-3 text-ink">{guide.title}</h3>
          <p className="article-body mb-5 flex-1 text-sm">{guide.description}</p>
          {guide.href ? (
            <Link
              href={guide.href}
              className="editorial-chevron-link font-sans text-sm font-bold uppercase tracking-widest text-rust transition-colors hover:text-maroon"
            >
              Read guide
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className="inline-flex w-fit rounded-lg border border-paper-edge bg-paper-elevated px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-widest text-muted"
            >
              Coming soon
            </span>
          )}
        </article>
      ))}
    </div>
  );
}
