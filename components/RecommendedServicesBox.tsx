import type { ReactNode } from "react";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { TrackedAffiliateRecommendationLink } from "@/components/TrackedAffiliateRecommendationLink";
import type { AffiliateLinkId } from "@/lib/affiliate-links";
import {
  getRecommendedServicePreset,
  getRecommendedServicePresetMeta,
} from "@/lib/recommended-service-presets";

export { RECOMMENDATION_AFFILIATE_DISCLOSURE } from "@/lib/editorial-copy";

export const RECOMMENDED_SERVICES_DEFAULT_INTRO =
  "These are practical services that solve common setup or travel problems in Japan.";

export type RecommendedServiceItem = {
  name: string;
  category: string;
  bestFor: string;
  reason: string;
  href: string;
  /** Set when resolved from presets; used for GA4 affiliate click labels. */
  linkId?: AffiliateLinkId;
  caution?: string;
};

export type RecommendedServicesBoxProps = {
  /** Optional when `serviceId` includes a default title in presets. */
  title?: string;
  intro?: string;
  /** Inline list for TSX pages. Prefer `serviceId` in MDX when inline arrays are not passed through. */
  services?: RecommendedServiceItem[];
  /** Loads services from `lib/recommended-service-presets.ts` (used by MDX guides). */
  serviceId?: string;
  note?: ReactNode;
  className?: string;
  /** Set false when another block nearby already shows the shared disclosure. */
  showDisclosure?: boolean;
};

const MIN_SERVICES = 3;
const MAX_SERVICES = 5;

const boxClass =
  "not-prose my-10 max-w-2xl overflow-hidden rounded-xl border border-maroon/25 bg-gradient-to-br from-paper-card via-paper-elevated to-[#efe2d6] px-5 py-5 shadow-editorial sm:px-6 sm:py-6";
const metaClass =
  "font-sans text-xs font-bold uppercase tracking-widest text-rust";
const itemClass =
  "relative overflow-hidden rounded-lg border border-paper-edge/80 bg-paper-card px-4 py-4 shadow-sm transition-colors duration-150 hover:border-rust/45 sm:px-5";
const badgeClass =
  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-maroon font-sans text-xs font-black text-paper-card shadow-sm";

/**
 * Editorial service list for guides. Use between block elements, not inside a paragraph.
 * Pass 3-5 services with practical reasons; use [affiliate-link-here] until links are live.
 */
export function RecommendedServicesBox({
  title,
  intro,
  services,
  serviceId,
  note,
  className = "",
  showDisclosure = true,
}: RecommendedServicesBoxProps) {
  const presetMeta = serviceId ? getRecommendedServicePresetMeta(serviceId) : undefined;
  const resolvedTitle = title ?? presetMeta?.title;
  const resolvedIntro = intro ?? presetMeta?.intro ?? RECOMMENDED_SERVICES_DEFAULT_INTRO;
  const resolvedServices =
    services ?? (serviceId ? getRecommendedServicePreset(serviceId) : undefined) ?? [];

  if (!resolvedTitle) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "RecommendedServicesBox requires `title` or a known `serviceId` with preset metadata.",
      );
    }
    return null;
  }

  if (process.env.NODE_ENV !== "production") {
    if (
      resolvedServices.length < MIN_SERVICES ||
      resolvedServices.length > MAX_SERVICES
    ) {
      console.warn(
        `RecommendedServicesBox "${resolvedTitle}" expects ${MIN_SERVICES}-${MAX_SERVICES} services; received ${resolvedServices.length}.`,
      );
    }
  }

  if (!resolvedServices.length) {
    return null;
  }

  const visibleServices = resolvedServices.slice(0, MAX_SERVICES);

  return (
    <aside
      className={`${boxClass} ${className}`.trim()}
      aria-label={resolvedTitle}
    >
      <p className="mb-2 font-sans text-xs font-black uppercase tracking-widest text-rust">
        Recommended services
      </p>
      <h2 className="editorial-heading mb-3 text-xl text-maroon sm:text-2xl">
        {resolvedTitle}
      </h2>
      <p className="article-body mb-5 text-muted">{resolvedIntro}</p>

      <ol className="list-none space-y-4 pl-0">
        {visibleServices.map((service, index) => (
          <li
            key={`${service.name}-${index}`}
            className={itemClass}
          >
            <span className="absolute inset-y-0 left-0 w-1 bg-rust" aria-hidden />
            <div className="flex gap-3">
              <span className={badgeClass}>{index + 1}</span>
              <div className="min-w-0">
                <p className={`${metaClass} mb-1`}>{service.category}</p>
                <div className="mb-2">
                  <TrackedAffiliateRecommendationLink
                    box="service"
                    name={service.name}
                    href={service.href}
                    linkId={service.linkId}
                  />
                </div>
                <p className="article-body-sm mb-2 text-dark">
                  <span className="font-sans font-bold text-maroon">
                    Best for:{" "}
                  </span>
                  {service.bestFor}
                </p>
                <p className="article-body-sm text-muted">
                  <span className="font-sans font-bold text-rust">
                    Why it helps:{" "}
                  </span>
                  {service.reason}
                </p>
                {service.caution ? (
                  <p className="article-body-sm mt-2 text-muted/90">
                    <span className="font-sans font-bold text-maroon">
                      Note:{" "}
                    </span>
                    {service.caution}
                  </p>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ol>

      {note ? (
        <p className="article-body-sm mt-5 text-muted">{note}</p>
      ) : null}

      {showDisclosure ? <AffiliateDisclosure /> : null}
    </aside>
  );
}
