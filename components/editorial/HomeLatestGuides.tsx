import Image from "next/image";
import { TrackedCtaLink } from "@/components/TrackedCtaLink";
import { HOME_LATEST_GUIDES } from "@/lib/home-latest-guides";

/** AoM "The latest" list: thumbnail left, headline and deck right. */
export function HomeLatestGuides() {
  return (
    <ul className="list-none divide-y divide-paper-edge p-0">
      {HOME_LATEST_GUIDES.map((item) => (
        <li key={item.href}>
          <TrackedCtaLink
            href={item.href}
            label={item.gtagLabel}
            prefetch
            className="aom-latest-row group py-6 first:pt-0 last:pb-0"
          >
            <div className="editorial-thumb relative shrink-0 overflow-hidden rounded-sm border border-paper-edge bg-paper-elevated">
              <Image
                src={item.imageSrc}
                alt={item.imageAlt}
                fill
                sizes="160px"
                className="hero-image object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="editorial-kicker mb-1.5">{item.category}</p>
              <h3 className="font-heading text-xl font-bold italic leading-snug text-ink transition-colors group-hover:text-maroon sm:text-2xl">
                {item.title}
              </h3>
              <p className="article-body-sm mt-2 line-clamp-2 sm:line-clamp-3">
                {item.description}
              </p>
              <span className="editorial-chevron-link mt-3 font-sans text-nav font-bold uppercase tracking-wide text-rust transition-colors group-hover:text-maroon">
                Read article
              </span>
            </div>
          </TrackedCtaLink>
        </li>
      ))}
    </ul>
  );
}
