import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { createGuidePageImage } from "./GuidePageImage";
import { mdxGuideComponents } from "./mdx-guide-components";

type MdxGuideContentProps = {
  source: string;
  slug?: string;
};

export async function MdxGuideContent({ source, slug }: MdxGuideContentProps) {
  if (!source.trim()) return null;

  const components =
    slug != null
      ? { ...mdxGuideComponents, GuidePageImage: createGuidePageImage(slug) }
      : mdxGuideComponents;

  return (
    <div className="mdx-guide-body min-w-0 lg:max-w-2xl">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </div>
  );
}
