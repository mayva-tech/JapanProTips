import Link from "next/link";

export function GuideBreadcrumbs({ current }: { current: string }) {
  return (
    <nav
      className="mb-8 max-w-2xl font-sans text-sm font-semibold text-muted"
      aria-label="Breadcrumb"
    >
      <Link href="/" className="text-rust hover:text-maroon">
        Home
      </Link>
      <span aria-hidden className="mx-2 text-tan">
        /
      </span>
      <Link href="/tourists" className="text-rust hover:text-maroon">
        Guides
      </Link>
      <span aria-hidden className="mx-2 text-tan">
        /
      </span>
      <span className="text-dark">{current}</span>
    </nav>
  );
}
