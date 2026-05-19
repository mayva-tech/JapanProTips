import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import {
  AffiliateBlock,
  InfoBox,
  RelatedGuides,
  TipBox,
} from "./mdx-wrappers";

const inlineLinkClass =
  "font-sans font-bold text-base text-rust hover:text-maroon transition-colors duration-150";

function MdxLink({
  href,
  children,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  if (!href) {
    return <span>{children}</span>;
  }

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={inlineLinkClass} {...props}>
        {children}
      </Link>
    );
  }

  const isExternal = /^https?:\/\//i.test(href);
  return (
    <a
      href={href}
      className={inlineLinkClass}
      {...(isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
      {...props}
    >
      {children}
    </a>
  );
}

function MdxHeading2({
  children,
  ...props
}: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      className="font-display text-dark tracking-wide text-4xl mb-5"
      {...props}
    >
      {children}
    </h2>
  );
}

function MdxHeading3({
  children,
  ...props
}: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      className="font-display text-dark tracking-wide text-2xl mb-4"
      {...props}
    >
      {children}
    </h3>
  );
}

function MdxParagraph({
  children,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return (
    <p className="article-body mb-4 last:mb-0" {...props}>
      {children}
    </p>
  );
}

function MdxUnorderedList({
  children,
  ...props
}: ComponentPropsWithoutRef<"ul">) {
  return (
    <ul
      className="article-body list-none space-y-3.5 pl-0 mb-0"
      {...props}
    >
      {children}
    </ul>
  );
}

function MdxOrderedList({
  children,
  ...props
}: ComponentPropsWithoutRef<"ol">) {
  return (
    <ol
      className="article-body list-decimal space-y-3.5 pl-6 mb-0"
      {...props}
    >
      {children}
    </ol>
  );
}

function MdxListItem({
  children,
  ...props
}: ComponentPropsWithoutRef<"li">) {
  return <li {...props}>{children}</li>;
}

function MdxStrong({
  children,
  ...props
}: ComponentPropsWithoutRef<"strong">) {
  return (
    <strong className="font-sans font-bold text-dark" {...props}>
      {children}
    </strong>
  );
}

function MdxTable({ children, ...props }: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="overflow-x-auto mb-0 max-w-full">
      <table
        className="w-full min-w-[560px] border-collapse border border-[#d4c9b0] bg-white font-sans text-base text-dark"
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

function MdxThead({ children, ...props }: ComponentPropsWithoutRef<"thead">) {
  return (
    <thead
      className="[&_tr]:border-b [&_tr]:border-[#d4c9b0] [&_tr]:bg-cream"
      {...props}
    >
      {children}
    </thead>
  );
}

function MdxTbody({ children, ...props }: ComponentPropsWithoutRef<"tbody">) {
  return (
    <tbody className="text-muted" {...props}>
      {children}
    </tbody>
  );
}

function MdxTr({ children, ...props }: ComponentPropsWithoutRef<"tr">) {
  return (
    <tr className="border-b border-[#d4c9b0]" {...props}>
      {children}
    </tr>
  );
}

function MdxTh({ children, ...props }: ComponentPropsWithoutRef<"th">) {
  return (
    <th
      className="text-left font-bold uppercase tracking-widest px-4 py-3 border-r border-[#d4c9b0] last:border-r-0"
      {...props}
    >
      {children}
    </th>
  );
}

function MdxTd({ children, ...props }: ComponentPropsWithoutRef<"td">) {
  return (
    <td
      className="px-4 py-3 border-r border-[#d4c9b0] last:border-r-0 [&:first-child]:font-bold [&:first-child]:text-dark"
      {...props}
    >
      {children}
    </td>
  );
}

export const mdxGuideComponents = {
  h2: MdxHeading2,
  h3: MdxHeading3,
  p: MdxParagraph,
  ul: MdxUnorderedList,
  ol: MdxOrderedList,
  li: MdxListItem,
  strong: MdxStrong,
  a: MdxLink,
  table: MdxTable,
  thead: MdxThead,
  tbody: MdxTbody,
  tr: MdxTr,
  th: MdxTh,
  td: MdxTd,
  TipBox,
  InfoBox,
  AffiliateBlock,
  RelatedGuides,
};
