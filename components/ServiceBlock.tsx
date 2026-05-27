import Link from "next/link";
import {
  stripTrailingArrowFromNode,
  withChevronClass,
} from "@/lib/cta-chevron";

export type ServiceBlockProps = {
  title: string;
  description: string;
  linkText: string;
  href: string;
};

const linkClassName =
  "font-sans text-base font-bold text-muted hover:text-rust transition-colors duration-150";

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

export function ServiceBlock({
  title,
  description,
  linkText,
  href,
}: ServiceBlockProps) {
  const arrow = stripTrailingArrowFromNode(linkText);
  const resolvedLinkClassName = withChevronClass(
    linkClassName,
    arrow.hadTrailingArrow,
  );

  return (
    <div className="border border-[#d4c9b0] bg-white px-6 py-5">
      <h3 className="font-sans font-bold text-sm tracking-widest uppercase text-dark mb-2">
        {title}
      </h3>
      <p className="article-body-sm mb-4">
        {description}
      </p>
      {isExternalHref(href) ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={resolvedLinkClassName}
        >
          {arrow.children}
        </a>
      ) : (
        <Link href={href} className={resolvedLinkClassName}>
          {arrow.children}
        </Link>
      )}
    </div>
  );
}
