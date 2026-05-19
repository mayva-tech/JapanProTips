import { compileMDX } from "next-mdx-remote/rsc";
import { mdxGuideComponents } from "@/components/mdx/mdx-guide-components";

/**
 * Compiles MDX source for metadata extraction or non-React outputs.
 * Guide pages should render prose with {@link MdxGuideContent} instead.
 */
export async function compileGuideMdx(source: string) {
  return compileMDX({
    source,
    components: mdxGuideComponents,
    options: {
      parseFrontmatter: false,
    },
  });
}
