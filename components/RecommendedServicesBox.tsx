import type { ReactNode } from "react";
import { TrackedAffiliateRecommendationLink } from "@/components/TrackedAffiliateRecommendationLink";
import type { AffiliateLinkId } from "@/lib/affiliate-links";
import {
  getRecommendedServicePreset,
  getRecommendedServicePresetMeta,
} from "@/lib/recommended-service-presets";

export const RECOMMENDED_SERVICES_DEFAULT_INTRO =
  "These are practical services that solve common setup or travel problems in Japan.";

export const RECOMMENDED_SERVICES_AFFILIATE_DISCLOSURE =
  "Some links may be affiliate links. This does not change the price you pay.";

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
};

const MIN_SERVICES = 3;
const MAX_SERVICES = 5;

const boxClass =
  "not-prose my-10 max-w-2xl rounded-lg border border-[#d4c9b0] bg-paper-elevated px-5 py-5 sm:px-6 sm:py-6";
const metaClass =
  "font-sans text-xs font-bold uppercase tracking-widest text-muted/90";

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
      <h2 className="editorial-heading mb-3 text-xl sm:text-2xl">{resolvedTitle}</h2>
      <p className="article-body mb-5 text-muted">{resolvedIntro}</p>

      <ol className="list-none space-y-6 pl-0">
        {visibleServices.map((service, index) => (
          <li
            key={`${service.name}-${index}`}
            className="border-t border-[#d4c9b0] pt-5 first:border-t-0 first:pt-0"
          >
            <div className="mb-2">
              <TrackedAffiliateRecommendationLink
                box="service"
                name={service.name}
                href={service.href}
                linkId={service.linkId}
              />
            </div>
            <p className={`${metaClass} mb-1`}>{service.category}</p>
            <p className="article-body-sm mb-2 text-dark">
              <span className="font-sans font-bold">Best for: </span>
              {service.bestFor}
            </p>
            <p className="article-body-sm text-muted">{service.reason}</p>
            {service.caution ? (
              <p className="article-body-sm mt-2 text-muted/90">
                <span className="font-sans font-bold">Note: </span>
                {service.caution}
              </p>
            ) : null}
          </li>
        ))}
      </ol>

      {note ? (
        <p className="article-body-sm mt-5 text-muted">{note}</p>
      ) : null}

      <p className="article-body-sm mt-4 text-muted/80">
        {RECOMMENDED_SERVICES_AFFILIATE_DISCLOSURE}
      </p>
    </aside>
  );
}
