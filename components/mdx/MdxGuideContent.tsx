import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxGuideComponents } from "./mdx-guide-components";

type MdxGuideContentProps = {
  source: string;
};

export async function MdxGuideContent({ source }: MdxGuideContentProps) {
  if (!source.trim()) return null;

  return (
    <div className="mdx-guide-body min-w-0 lg:max-w-2xl">
      <MDXRemote
        source={source}
        components={mdxGuideComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </div>
  );
}
