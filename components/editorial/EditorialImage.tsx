import Image from "next/image";

type EditorialImageProps = {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  className?: string;
  aspect?: "video" | "wide" | "square";
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
}: EditorialImageProps) {
  return (
    <figure className={`my-10 ${className}`.trim()}>
      <div
        className={`relative overflow-hidden rounded-xl border border-paper-edge bg-paper-elevated shadow-editorial ${aspectClass[aspect]}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 720px"
          className="hero-image"
        />
      </div>
      {caption ? (
        <figcaption className="mt-2 font-sans text-sm leading-snug text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
