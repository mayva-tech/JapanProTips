import Image from "next/image";
import { TrackedOutboundSimLink } from "@/components/TrackedOutboundSimLink";
import type { ConversionGtagLabel } from "@/lib/gtag-events";

type EditorialImageProps = {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  className?: string;
  aspect?: "video" | "wide" | "square";
  /** cover fills the frame (may crop). contain shows the full image without trimming. */
  fit?: "cover" | "contain";
  href?: string;
  hrefAriaLabel?: string;
  gtagLabel?: ConversionGtagLabel;
  /** When set with href, splits the image into left (href) and right (secondaryHref) click targets. */
  secondaryHref?: string;
  secondaryHrefAriaLabel?: string;
};

const aspectClass = {
  video: "aspect-video",
  wide: "aspect-[21/9]",
  square: "aspect-[4/3]",
};

export function EditorialImage({
  src,
  alt,
  caption,
  priority = false,
  className = "",
  aspect = "video",
  fit = "cover",
  href,
  hrefAriaLabel,
  gtagLabel = "esim",
  secondaryHref,
  secondaryHrefAriaLabel,
}: EditorialImageProps) {
  const showFullImage = fit === "contain";
  const hasSplitLinks = Boolean(href && secondaryHref);
  const hasSingleLink = Boolean(href && !secondaryHref);

  const frameClass = `relative overflow-hidden rounded-xl border border-paper-edge bg-paper-elevated shadow-editorial transition-shadow duration-150 ${
    showFullImage ? "" : aspectClass[aspect]
  } ${hasSingleLink || hasSplitLinks ? "group cursor-pointer hover:shadow-lg hover:border-maroon/25" : ""}`.trim();

  const imageContent = showFullImage ? (
    <Image
      src={src}
      alt={alt}
      width={0}
      height={0}
      sizes="(max-width: 768px) 100vw, 720px"
      priority={priority}
      className="h-auto w-full object-contain saturate-[0.82] contrast-[1.05]"
    />
  ) : (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes="(max-width: 768px) 100vw, 720px"
      className="hero-image"
    />
  );

  const splitLinkClass =
    "absolute inset-y-0 z-10 w-1/2 opacity-0 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-maroon/50";

  return (
    <figure className={`my-10 ${className}`.trim()}>
      {hasSingleLink ? (
        <TrackedOutboundSimLink
          href={href!}
          className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon/40"
          aria-label={hrefAriaLabel ?? alt}
          gtagLabel={gtagLabel}
        >
          <div className={frameClass}>{imageContent}</div>
        </TrackedOutboundSimLink>
      ) : (
        <div className={frameClass}>
          {imageContent}
          {hasSplitLinks ? (
            <>
              <TrackedOutboundSimLink
                href={href!}
                className={`${splitLinkClass} left-0`}
                aria-label={hrefAriaLabel ?? "Open link in a new tab"}
                gtagLabel={gtagLabel}
              >
                <span className="sr-only">{hrefAriaLabel ?? "Left link"}</span>
              </TrackedOutboundSimLink>
              <TrackedOutboundSimLink
                href={secondaryHref!}
                className={`${splitLinkClass} right-0`}
                aria-label={secondaryHrefAriaLabel ?? "Open link in a new tab"}
                gtagLabel={gtagLabel}
              >
                <span className="sr-only">{secondaryHrefAriaLabel ?? "Right link"}</span>
              </TrackedOutboundSimLink>
            </>
          ) : null}
        </div>
      )}
      {caption ? (
        <figcaption className="mt-2 font-sans text-sm leading-snug text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
