/** User-facing generate errors (no API internals or stack traces). */
export function friendlyGenerateErrorMessage(
  raw: string | null | undefined,
): string {
  if (!raw?.trim()) {
    return "Something went wrong while building your itinerary. Please try again, or switch to a simpler trip style.";
  }

  const lower = raw.toLowerCase();

  if (lower.includes("too many") || lower.includes("try again later")) {
    return "You have made several requests in a short time. Please wait a few minutes, then try again.";
  }

  if (lower.includes("network") || lower.includes("connection")) {
    return "We could not reach the planner. Check your connection and try again.";
  }

  if (lower.includes("invalid json") || lower.includes("invalid request")) {
    return "Your trip settings could not be read. Refresh the page and try again.";
  }

  if (
    lower.includes("unexpected response") ||
    lower.includes("could not generate")
  ) {
    return "Something went wrong while building your itinerary. Please try again, or switch to a simpler trip style.";
  }

  return "Something went wrong while building your itinerary. Please try again, or switch to a simpler trip style.";
}
