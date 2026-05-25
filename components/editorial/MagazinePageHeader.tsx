import Image from "next/image";
import type { ReactNode } from "react";
import { MagazineShell } from "@/components/editorial/MagazineShell";

type MagazinePageHeaderProps = {
  kicker: string;
  title: string;
  description: string;
  meta?: ReactNode;
  actions?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
};

/** Hub page header: AoM split layout with optional lead image. */
export function MagazinePageHeader({
  kicker,
  title,
  description,
  meta,
  actions,
  imageSrc,
  imageAlt,
}: MagazinePageHeaderProps) {
  const hasImage = Boolean(imageSrc && imageAlt);

  return (
    <section className="border-b border-paper-edge bg-paper-elevated py-8 sm:py-12">
      <MagazineShell>
        <div
          className={
            hasImage
              ? "grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10"
              : "max-w-3xl"
          }
        >
          <div className={hasImage ? "lg:col-span-7" : undefined}>
            <p className="editorial-kicker mb-3">{kicker}</p>
            <h1
              className="guide-page-title text-balance"
              style={hasImage ? undefined : { fontSize: "clamp(2rem, 5vw, 3rem)" }}
            >
              {title}
            </h1>
            <p className="editorial-deck mt-4 max-w-none text-pretty text-muted lg:max-w-2xl">
              {description}
            </p>
            {meta ? <div className="mt-4">{meta}</div> : null}
            {actions ? <div className="mt-6 flex flex-wrap gap-4">{actions}</div> : null}
          </div>
          {hasImage ? (
            <div className="lg:col-span-5">
              <div className="editorial-card relative aspect-[4/3] overflow-hidden">
                <Image
                  src={imageSrc!}
                  alt={imageAlt!}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="hero-image object-cover"
                />
              </div>
            </div>
          ) : null}
        </div>
      </MagazineShell>
    </section>
  );
}
