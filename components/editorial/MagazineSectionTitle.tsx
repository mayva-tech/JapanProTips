import Link from "next/link";

type MagazineSectionTitleProps = {
  title: string;
  browseHref?: string;
  browseLabel?: string;
  className?: string;
};

/** AoM section heads: italic serif title + optional "Browse all" link. */
export function MagazineSectionTitle({
  title,
  browseHref,
  browseLabel = "Browse all",
  className = "",
}: MagazineSectionTitleProps) {
  return (
    <div
      className={`mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-paper-edge pb-4 ${className}`.trim()}
    >
      <h2 className="aom-section-title">{title}</h2>
      {browseHref ? (
        <Link
          href={browseHref}
          className="editorial-chevron-link font-sans text-sm font-bold uppercase tracking-widest text-rust underline decoration-rust/35 underline-offset-2 hover:text-maroon"
        >
          {browseLabel}
        </Link>
      ) : null}
    </div>
  );
}
