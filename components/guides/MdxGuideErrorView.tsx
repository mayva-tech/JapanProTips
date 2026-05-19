import Link from "next/link";
import type { GuideContentError } from "@/lib/content/errors";

type MdxGuideErrorViewProps = {
  error: GuideContentError;
  hubHref?: string;
  hubLabel?: string;
};

export function MdxGuideErrorView({
  error,
  hubHref = "/tourists",
  hubLabel = "Browse all guides →",
}: MdxGuideErrorViewProps) {
  const heading =
    error.code === "NOT_FOUND" ? "Guide not found" : "Guide could not be loaded";

  return (
    <main className="bg-cream min-h-screen font-sans">
      <article className="max-w-3xl mx-auto px-6 pt-12 pb-16">
        <h1
          className="font-display text-dark tracking-wide leading-tight mb-6"
          style={{ fontSize: "clamp(36px, 5.5vw, 56px)" }}
        >
          {heading}
        </h1>
        <div className="article-body max-w-2xl space-y-4 mb-10">
          <p>{error.message}</p>
          <p className="article-body-sm">
            Slug: <code className="font-sans text-sm text-dark">{error.slug}</code>
          </p>
        </div>
        <Link
          href={hubHref}
          className="inline-flex items-center justify-center bg-maroon px-8 py-4 font-sans text-base font-bold uppercase tracking-widest text-white hover:bg-rust transition-colors duration-150"
        >
          {hubLabel}
        </Link>
      </article>
    </main>
  );
}
