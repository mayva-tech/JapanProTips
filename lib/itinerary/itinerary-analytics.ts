import type { GenerateItineraryRequest } from "@/types/itinerary-api";
import type {
  GeneratedItinerary,
  ItineraryDuration,
  ItineraryTheme,
  StartCity,
  TravelPace,
  TravelStyle,
} from "@/types/itinerary";

export type ItineraryAnalyticsSource = "openai" | "mock";

export type ItineraryEditActionType = "move_up" | "move_down" | "remove";

export type ItineraryFormAnalyticsPayload = {
  duration: ItineraryDuration;
  startCity: StartCity;
  theme: ItineraryTheme;
  travelStyle: TravelStyle;
  pace: TravelPace;
};

export type ItineraryCountsPayload = {
  dayCount: number;
  stopCount: number;
};

export type ItineraryGenerateAnalyticsPayload = ItineraryFormAnalyticsPayload & {
  source?: ItineraryAnalyticsSource;
  cached?: boolean;
  dayCount?: number;
  stopCount?: number;
  errorType?: string;
  itineraryTemplateSlug?: string;
};

export type ItinerarySaveAnalyticsPayload = ItineraryFormAnalyticsPayload &
  ItineraryCountsPayload & {
    readOnly?: boolean;
    errorType?: string;
  };

export type ItineraryPdfAnalyticsPayload = ItineraryFormAnalyticsPayload &
  ItineraryCountsPayload & {
    readOnly?: boolean;
    errorType?: string;
  };

export type ItineraryEditAnalyticsPayload = ItineraryFormAnalyticsPayload &
  ItineraryCountsPayload & {
    action: ItineraryEditActionType;
    dayNumber: number;
  };

export type ItineraryCopyLinkAnalyticsPayload = ItineraryFormAnalyticsPayload &
  ItineraryCountsPayload & {
    readOnly?: boolean;
  };

export type ItineraryGearAnalyticsPayload = ItineraryFormAnalyticsPayload & {
  source?: ItineraryAnalyticsSource;
  readOnly?: boolean;
  itemId?: string;
  itemName?: string;
};

export type ItineraryTemplateAnalyticsPayload = {
  templateSlug: string;
  duration: ItineraryDuration;
  startCity: StartCity;
  theme: ItineraryTheme;
  pace: TravelPace;
};

export type ItineraryGuideCtaAnalyticsPayload = {
  source_page: string;
  cta_variant: "planner" | "template" | "compact";
  target_type: "planner" | "template";
  target_path: string;
};

export type ItineraryHubCtaAnalyticsPayload = {
  source_page: string;
  target_type: "planner" | "templates" | "template";
  target_path: string;
  cta_position?: string;
};

const LABELS = {
  formChange: "itinerary_form_change",
  generateStart: "itinerary_generate_start",
  generateSuccess: "itinerary_generate_success",
  generateError: "itinerary_generate_error",
  saveStart: "itinerary_save_start",
  saveSuccess: "itinerary_save_success",
  saveError: "itinerary_save_error",
  copyLink: "itinerary_copy_link",
  pdfDownload: "itinerary_pdf_download",
  pdfError: "itinerary_pdf_error",
  editAction: "itinerary_edit_action",
  gearBoxView: "itinerary_gear_box_view",
  gearLinkClick: "itinerary_gear_link_click",
  templateView: "itinerary_template_view",
  templatePlannerCta: "itinerary_template_planner_cta_click",
  plannerTemplateCard: "itinerary_planner_template_card_click",
  guideCtaClick: "itinerary_guide_cta_click",
  hubCtaClick: "itinerary_hub_cta_click",
} as const;

function currentRoutePath(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return `${window.location.pathname}${window.location.search}`;
}

function emitItineraryEvent(
  label: string,
  params: Record<string, string | number | boolean | undefined>,
): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;

  const cleaned: Record<string, string | number | boolean> = { label };
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      cleaned[key] = value;
    }
  }

  window.gtag("event", "click", cleaned);
}

function formParams(
  payload: ItineraryFormAnalyticsPayload,
): Record<string, string | number | boolean | undefined> {
  return {
    itinerary_duration: payload.duration,
    itinerary_start_city: payload.startCity,
    itinerary_theme: payload.theme,
    itinerary_travel_style: payload.travelStyle,
    itinerary_pace: payload.pace,
    page_path: currentRoutePath(),
  };
}

export function itineraryCountsFrom(
  itinerary: GeneratedItinerary,
): ItineraryCountsPayload {
  return {
    dayCount: itinerary.days.length,
    stopCount: itinerary.days.reduce((total, day) => total + day.stops.length, 0),
  };
}

export function analyticsPayloadFromItinerary(
  itinerary: GeneratedItinerary,
): ItineraryFormAnalyticsPayload & ItineraryCountsPayload {
  return {
    ...formParamsFromItinerary(itinerary),
    ...itineraryCountsFrom(itinerary),
  };
}

export function analyticsPayloadFromRequest(
  request: GenerateItineraryRequest,
  itineraryTemplateSlug?: string | null,
): ItineraryGenerateAnalyticsPayload {
  return {
    duration: request.duration,
    startCity: request.startCity,
    theme: request.theme,
    travelStyle: request.travelStyle,
    pace: request.pace,
    ...(itineraryTemplateSlug
      ? { itineraryTemplateSlug: itineraryTemplateSlug }
      : {}),
  };
}

function generateEventParams(
  payload: ItineraryGenerateAnalyticsPayload,
): Record<string, string | number | boolean | undefined> {
  return {
    ...formParams(payload),
    ...(payload.itineraryTemplateSlug
      ? { itinerary_template_slug: payload.itineraryTemplateSlug }
      : {}),
    ...(payload.source ? { itinerary_source: payload.source } : {}),
    ...(payload.cached !== undefined
      ? { itinerary_cached: payload.cached }
      : {}),
    ...(payload.dayCount !== undefined
      ? { itinerary_day_count: payload.dayCount }
      : {}),
    ...(payload.stopCount !== undefined
      ? { itinerary_stop_count: payload.stopCount }
      : {}),
    ...(payload.errorType ? { itinerary_error_type: payload.errorType } : {}),
  };
}

function formParamsFromItinerary(
  itinerary: GeneratedItinerary,
): ItineraryFormAnalyticsPayload {
  return {
    duration: itinerary.duration,
    startCity: itinerary.startCity,
    theme: itinerary.theme,
    travelStyle: itinerary.travelStyle,
    pace: itinerary.pace,
  };
}

export function trackItineraryFormChange(
  field: keyof ItineraryFormAnalyticsPayload,
  value: ItineraryFormAnalyticsPayload[keyof ItineraryFormAnalyticsPayload],
  form: ItineraryFormAnalyticsPayload,
): void {
  emitItineraryEvent(LABELS.formChange, {
    ...formParams(form),
    itinerary_field: field,
    itinerary_field_value: String(value),
  });
}

export function trackItineraryGenerateStart(
  payload: ItineraryGenerateAnalyticsPayload,
): void {
  emitItineraryEvent(LABELS.generateStart, generateEventParams(payload));
}

export function trackItineraryGenerateSuccess(
  payload: ItineraryGenerateAnalyticsPayload,
): void {
  emitItineraryEvent(LABELS.generateSuccess, generateEventParams(payload));
}

export function trackItineraryGenerateError(
  payload: ItineraryGenerateAnalyticsPayload,
): void {
  emitItineraryEvent(LABELS.generateError, generateEventParams(payload));
}

export function trackItinerarySaveStart(
  payload: ItinerarySaveAnalyticsPayload,
): void {
  emitItineraryEvent(LABELS.saveStart, {
    ...formParams(payload),
    itinerary_day_count: payload.dayCount,
    itinerary_stop_count: payload.stopCount,
    ...(payload.readOnly !== undefined
      ? { itinerary_read_only: payload.readOnly }
      : {}),
  });
}

export function trackItinerarySaveSuccess(
  payload: ItinerarySaveAnalyticsPayload,
): void {
  emitItineraryEvent(LABELS.saveSuccess, {
    ...formParams(payload),
    itinerary_day_count: payload.dayCount,
    itinerary_stop_count: payload.stopCount,
    ...(payload.readOnly !== undefined
      ? { itinerary_read_only: payload.readOnly }
      : {}),
  });
}

export function trackItinerarySaveError(
  payload: ItinerarySaveAnalyticsPayload,
): void {
  emitItineraryEvent(LABELS.saveError, {
    ...formParams(payload),
    itinerary_day_count: payload.dayCount,
    itinerary_stop_count: payload.stopCount,
    ...(payload.readOnly !== undefined
      ? { itinerary_read_only: payload.readOnly }
      : {}),
    ...(payload.errorType ? { itinerary_error_type: payload.errorType } : {}),
  });
}

export function trackItineraryCopyLink(
  payload: ItineraryCopyLinkAnalyticsPayload,
): void {
  emitItineraryEvent(LABELS.copyLink, {
    ...formParams(payload),
    itinerary_day_count: payload.dayCount,
    itinerary_stop_count: payload.stopCount,
    ...(payload.readOnly !== undefined
      ? { itinerary_read_only: payload.readOnly }
      : {}),
  });
}

export function trackItineraryPdfDownload(
  payload: ItineraryPdfAnalyticsPayload,
): void {
  emitItineraryEvent(LABELS.pdfDownload, {
    ...formParams(payload),
    itinerary_day_count: payload.dayCount,
    itinerary_stop_count: payload.stopCount,
    ...(payload.readOnly !== undefined
      ? { itinerary_read_only: payload.readOnly }
      : {}),
  });
}

export function trackItineraryPdfError(
  payload: ItineraryPdfAnalyticsPayload,
): void {
  emitItineraryEvent(LABELS.pdfError, {
    ...formParams(payload),
    itinerary_day_count: payload.dayCount,
    itinerary_stop_count: payload.stopCount,
    ...(payload.readOnly !== undefined
      ? { itinerary_read_only: payload.readOnly }
      : {}),
    ...(payload.errorType ? { itinerary_error_type: payload.errorType } : {}),
  });
}

export function trackItineraryEditAction(
  payload: ItineraryEditAnalyticsPayload,
): void {
  emitItineraryEvent(LABELS.editAction, {
    ...formParams(payload),
    itinerary_day_count: payload.dayCount,
    itinerary_stop_count: payload.stopCount,
    itinerary_edit_action: payload.action,
    itinerary_day_number: payload.dayNumber,
  });
}

export function trackItineraryGearBoxView(
  payload: ItineraryGearAnalyticsPayload,
): void {
  emitItineraryEvent(LABELS.gearBoxView, {
    ...formParams(payload),
    ...(payload.source ? { itinerary_source: payload.source } : {}),
    ...(payload.readOnly !== undefined
      ? { itinerary_read_only: payload.readOnly }
      : {}),
  });
}

export function trackItineraryGearLinkClick(
  payload: ItineraryGearAnalyticsPayload,
): void {
  emitItineraryEvent(LABELS.gearLinkClick, {
    ...formParams(payload),
    ...(payload.source ? { itinerary_source: payload.source } : {}),
    ...(payload.readOnly !== undefined
      ? { itinerary_read_only: payload.readOnly }
      : {}),
    ...(payload.itemId ? { itinerary_gear_item_id: payload.itemId } : {}),
    ...(payload.itemName ? { itinerary_gear_item_name: payload.itemName } : {}),
  });
}

function templateParams(
  payload: ItineraryTemplateAnalyticsPayload,
): Record<string, string | number | boolean | undefined> {
  return {
    template_slug: payload.templateSlug,
    itinerary_duration: payload.duration,
    itinerary_start_city: payload.startCity,
    itinerary_theme: payload.theme,
    itinerary_pace: payload.pace,
    page_path: currentRoutePath(),
  };
}

export function trackItineraryTemplateView(
  payload: ItineraryTemplateAnalyticsPayload,
): void {
  emitItineraryEvent(LABELS.templateView, templateParams(payload));
}

export function trackItineraryTemplatePlannerCtaClick(
  payload: ItineraryTemplateAnalyticsPayload,
): void {
  emitItineraryEvent(LABELS.templatePlannerCta, templateParams(payload));
}

export function trackItineraryPlannerTemplateCardClick(
  payload: ItineraryTemplateAnalyticsPayload,
): void {
  emitItineraryEvent(LABELS.plannerTemplateCard, templateParams(payload));
}

export function trackItineraryGuideCtaClick(
  payload: ItineraryGuideCtaAnalyticsPayload,
): void {
  emitItineraryEvent(LABELS.guideCtaClick, {
    source_page: payload.source_page,
    cta_variant: payload.cta_variant,
    target_type: payload.target_type,
    target_path: payload.target_path,
    page_path: currentRoutePath(),
  });
}

export function trackItineraryHubCtaClick(
  payload: ItineraryHubCtaAnalyticsPayload,
): void {
  emitItineraryEvent(LABELS.hubCtaClick, {
    source_page: payload.source_page,
    target_type: payload.target_type,
    target_path: payload.target_path,
    cta_position: payload.cta_position,
    page_path: currentRoutePath(),
  });
}
