import { GuideArticleShell } from "@/components/guides/GuideArticleShell";
import { GuideEndCta } from "@/components/guides/GuideEndCta";
import { GuidePageReadAloud } from "@/components/guides/GuidePageReadAloud";
import { GuidePageTitle } from "@/components/guides/GuidePageTitle";
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

  const title = <GuidePageTitle title={frontmatter.title} />;

  const intro = frontmatter.intro?.length ? (
    <div className="article-body space-y-4 lg:max-w-2xl">
      {frontmatter.intro.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  ) : null;

  if (layout === "resident") {
    const residentHref = `/residents/${slug}`;
    return (
      <main className="bg-cream min-h-screen font-sans">
        <article
          data-guide-read-aloud-root
          className="page-x mx-auto min-w-0 max-w-3xl pt-10 pb-14"
        >
          {title}
          <GuidePageReadAloud guideSlug={slug} />
          {intro ? <div className="mb-6">{intro}</div> : null}
          <MdxGuideContent source={beforeComparison} slug={slug} />
          <MdxGuideContent source={afterComparison} slug={slug} />
          <div data-guide-read-aloud-skip>
            <ResidentsCrosslinks currentHref={residentHref} />
          </div>
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
      guideSlug={slug}
      title={title}
      intro={intro}
      beforeComparison={
        <MdxGuideContent source={beforeComparison} slug={slug} />
      }
      afterComparison={
        <>
          <MdxGuideContent source={afterComparison} slug={slug} />
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
