import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { isValidElement } from "react";
import Link from "next/link";
import { MdxPinchZoomTable } from "./MdxPinchZoomTable";
import {
  FieldNote,
  LocalTip,
  OperationalWarning,
  RealityCheck,
  ResidentLearnedNote,
  SeasonalNote,
  TouristMistakeNote,
  WhatPeopleMiss,
} from "@/components/editorial/field-notes";
import { DownloadChecklistBox } from "@/components/DownloadChecklistBox";
import { NextStepGuides } from "@/components/NextStepGuides";
import { RecommendedGearBox } from "@/components/RecommendedGearBox";
import { RecommendedServicesBox } from "@/components/RecommendedServicesBox";
import {
  AffiliateBlock,
  InfoBox,
  RelatedGuides,
  TipBox,
} from "./mdx-wrappers";

const inlineLinkClass =
  "font-sans font-bold text-base text-rust hover:text-maroon transition-colors duration-150";

function getPlainText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(getPlainText).join("");
  }
  if (isValidElement<{ children?: ReactNode }>(node) && node.props.children) {
    return getPlainText(node.props.children);
  }
  return "";
}

function isFaqSectionHeading(children: ReactNode): boolean {
  const text = getPlainText(children).trim().toLowerCase();
  return text === "faq" || text === "frequently asked questions";
}

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
  const isFaq = isFaqSectionHeading(children);
  return (
    <h2 id={isFaq ? "faq" : undefined} {...props}>
      {children}
    </h2>
  );
}

function MdxHeading3({
  children,
  ...props
}: ComponentPropsWithoutRef<"h3">) {
  return <h3 {...props}>{children}</h3>;
}

function MdxParagraph({
  children,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return (
    <p className="article-body mb-3 last:mb-0" {...props}>
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
      className="article-body mb-3 list-none space-y-2.5 pl-0 last:mb-0"
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
      className="article-body mb-3 list-decimal space-y-2.5 pl-6 last:mb-0"
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
    <strong
      className="box-decoration-clone rounded-sm bg-rust/10 px-1 py-0.5 font-sans font-bold text-maroon"
      {...props}
    >
      {children}
    </strong>
  );
}

function MdxTable({ children }: ComponentPropsWithoutRef<"table">) {
  return <MdxPinchZoomTable>{children}</MdxPinchZoomTable>;
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
      className="break-words text-left font-bold uppercase tracking-wide px-2 py-2 text-xs border-r border-[#d4c9b0] last:border-r-0 sm:tracking-widest sm:px-4 sm:py-3 sm:text-sm"
      {...props}
    >
      {children}
    </th>
  );
}

function MdxTd({ children, ...props }: ComponentPropsWithoutRef<"td">) {
  return (
    <td
      className="break-words px-2 py-2 text-sm border-r border-[#d4c9b0] last:border-r-0 sm:px-4 sm:py-3 sm:text-base [&:first-child]:font-bold [&:first-child]:text-dark"
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
  RecommendedGearBox,
  RecommendedServicesBox,
  NextStepGuides,
  DownloadChecklistBox,
  FieldNote,
  LocalTip,
  OperationalWarning,
  RealityCheck,
  ResidentLearnedNote,
  SeasonalNote,
  TouristMistakeNote,
  WhatPeopleMiss,
};
