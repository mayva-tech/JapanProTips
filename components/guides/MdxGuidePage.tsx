import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";
import { MdxGuideErrorView } from "@/components/guides/MdxGuideErrorView";
import { ResidentsCrosslinks } from "@/components/guides/ResidentsCrosslinks";
import { MdxGuideContent } from "@/components/mdx/MdxGuideContent";
import { splitGuideContent, tryLoadGuide } from "@/lib/content/guides";
import type { ContentCollection } from "@/lib/content/types";

type MdxGuideLayout = "tourist" | "resident";

type MdxGuidePageProps = {
  slug: string;
  collection?: ContentCollection;
  layout?: MdxGuideLayout;
};

export async function MdxGuidePage({
  slug,
  collection = "guides",
  layout = collection === "residents" ? "resident" : "tourist",
}: MdxGuidePageProps) {
  const result = tryLoadGuide(slug, collection);
  if (!result.ok) {
    return (
      <MdxGuideErrorView
        error={result.error}
        hubHref={collection === "residents" ? "/residents" : "/tourists"}
        hubLabel={
          collection === "residents"
            ? "Residents hub →"
            : "Browse all guides →"
        }
      />
    );
  }

  const { guide } = result;
  const { frontmatter } = guide;
  const { beforeComparison, afterComparison } = splitGuideContent(guide.content);

  const title = (
    <h1
      className="font-display text-dark tracking-wide leading-tight mb-8"
      style={{ fontSize: "clamp(36px, 5.5vw, 56px)" }}
    >
      {frontmatter.title}
    </h1>
  );

  const intro = frontmatter.intro?.length ? (
    <div className="article-body space-y-4 max-w-2xl">
      {frontmatter.intro.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  ) : null;

  if (layout === "resident") {
    const residentHref = `/residents/${slug}`;
    return (
      <main className="bg-cream min-h-screen font-sans">
        <article className="mx-auto min-w-0 max-w-3xl px-6 pt-12 pb-16">
          {title}
          {intro ? <div className="mb-12">{intro}</div> : null}
          <MdxGuideContent source={beforeComparison} />
          <MdxGuideContent source={afterComparison} />
          <ResidentsCrosslinks currentHref={residentHref} />
        </article>
      </main>
    );
  }

  const comparisonItems =
    frontmatter.comparisonItems === "none" || frontmatter.showComparison === false
      ? null
      : undefined;

  return (
    <GuideArticleShell
      title={title}
      intro={intro}
      beforeComparison={<MdxGuideContent source={beforeComparison} />}
      afterComparison={
        <>
          <MdxGuideContent source={afterComparison} />
          {frontmatter.parentHref && frontmatter.parentLabel ? (
            <GuideEndCta
              parentHref={frontmatter.parentHref}
              parentLabel={frontmatter.parentLabel}
            />
          ) : null}
        </>
      }
      comparisonItems={comparisonItems}
      showHotelConversion={frontmatter.showHotelConversion !== false}
    />
  );
}
