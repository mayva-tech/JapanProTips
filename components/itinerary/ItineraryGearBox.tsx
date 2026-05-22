"use client";

import { useEffect, useRef } from "react";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { RecommendationItemHeader } from "@/components/recommendations/RecommendationItemHeader";
import { recommendationGridShell } from "@/components/recommendations/recommendation-styles";
import {
  ITINERARY_GEAR_ANALYTICS_CONTEXT,
  getItineraryGearRecommendations,
  itineraryGearReason,
} from "@/lib/itinerary/itinerary-gear-recommendations";
import {
  analyticsPayloadFromItinerary,
  trackItineraryGearBoxView,
  trackItineraryGearLinkClick,
  type ItineraryAnalyticsSource,
} from "@/lib/itinerary/itinerary-analytics";
import type { ResolvedRecommendation } from "@/lib/recommendations";
import type { GeneratedItinerary } from "@/types/itinerary";

const TITLE = "Useful things before you follow this itinerary";
const INTRO =
  "If you want the easiest setup, these are the small items most Japan travelers end up needing anyway.";

export function ItineraryGearBox({
  itinerary,
  source,
  readOnly = false,
}: {
  itinerary: GeneratedItinerary;
  source?: ItineraryAnalyticsSource;
  readOnly?: boolean;
}) {
  const items = getItineraryGearRecommendations(itinerary.theme, itinerary.pace);
  const viewedRef = useRef(false);

  useEffect(() => {
    if (viewedRef.current) return;
    viewedRef.current = true;
    trackItineraryGearBoxView({
      ...analyticsPayloadFromItinerary(itinerary),
      source,
      readOnly,
    });
  }, [itinerary, source, readOnly]);

  if (!items.length) {
    return null;
  }

  const analyticsBase = analyticsPayloadFromItinerary(itinerary);

  const onAffiliateClick = (item: ResolvedRecommendation) => {
    trackItineraryGearLinkClick({
      ...analyticsBase,
      source,
      readOnly,
      itemId: item.id,
      itemName: item.title,
    });
  };

  return (
    <aside
      className={`${recommendationGridShell} mt-6 border-t border-paper-edge pt-5`}
      aria-label={TITLE}
      data-itinerary-gear-box
    >
      <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-rust">
        Optional gear picks
      </h3>
      <p className="article-body-sm mb-3 mt-2 text-muted">{INTRO}</p>

      <ol className="list-none space-y-3 pl-0">
        {items.map((item) => (
          <li
            key={item.id}
            className="border-t border-paper-edge/70 pt-3 first:border-t-0 first:pt-0"
          >
            <div
              onClickCapture={(event) => {
                if (!item.hasLiveAffiliate) return;
                const target = event.target as HTMLElement;
                if (target.closest("a[href]")) {
                  onAffiliateClick(item);
                }
              }}
            >
              <RecommendationItemHeader
                item={item}
                context={ITINERARY_GEAR_ANALYTICS_CONTEXT}
              />
            </div>
            <p className="article-body-sm mt-1 text-muted">
              {itineraryGearReason(item)}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-4">
        <AffiliateDisclosure />
      </div>
    </aside>
  );
}
