export type ReadAloudEventName =
  | "read_aloud_play"
  | "read_aloud_pause"
  | "read_aloud_resume"
  | "read_aloud_stop";

type ReadAloudAnalyticsOptions = {
  guideSlug: string;
  provider?: string;
};

export function trackReadAloudEvent(
  eventName: ReadAloudEventName,
  options: ReadAloudAnalyticsOptions,
) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;

  window.gtag("event", eventName, {
    guide_slug: options.guideSlug,
    ...(options.provider ? { provider: options.provider } : {}),
  });
}
