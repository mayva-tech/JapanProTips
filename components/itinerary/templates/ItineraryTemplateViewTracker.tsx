"use client";

import { useEffect, useRef } from "react";
import {
  trackItineraryTemplateView,
  type ItineraryTemplateAnalyticsPayload,
} from "@/lib/itinerary/itinerary-analytics";

export function ItineraryTemplateViewTracker({
  payload,
}: {
  payload: ItineraryTemplateAnalyticsPayload;
}) {
  const viewed = useRef(false);

  useEffect(() => {
    if (viewed.current) return;
    viewed.current = true;
    trackItineraryTemplateView(payload);
  }, [payload]);

  return null;
}
