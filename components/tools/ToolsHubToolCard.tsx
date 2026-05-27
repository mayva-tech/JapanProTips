"use client";

import { TrackedToolLink } from "@/components/tools/TrackedToolLink";

const cardClass =
  "group editorial-card flex flex-col border border-maroon/30 bg-paper-card p-6 shadow-editorial ring-1 ring-maroon/15 sm:p-8";

export function ToolsHubToolCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <TrackedToolLink href={href} sourceSlug="tools" className={`${cardClass} no-underline`}>
      <p className="font-sans text-xs font-bold uppercase tracking-widest text-maroon">
        Live
      </p>
      <h3 className="font-display mt-2 text-xl font-bold text-dark group-hover:text-maroon sm:text-2xl">
        {title}
      </h3>
      <p className="article-body mt-3 flex-1 text-muted">{description}</p>
      <span className="editorial-chevron-link mt-4 font-sans text-xs font-bold uppercase tracking-widest text-rust transition-colors group-hover:text-maroon">
        Open tool
      </span>
    </TrackedToolLink>
  );
}
