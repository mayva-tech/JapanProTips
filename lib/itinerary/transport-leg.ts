import type {
  ItineraryTransportLeg,
  ItineraryTransportMode,
  TransportLegProvider,
} from "@/types/itinerary";

const ALLOWED_MODES = new Set<ItineraryTransportMode>([
  "walk",
  "transit",
  "train",
  "subway",
  "bus",
  "taxi",
  "unknown",
]);

const LEGACY_MODE_MAP: Record<string, ItineraryTransportMode> = {
  tram: "subway",
};

function coerceMode(value: unknown): ItineraryTransportMode {
  if (typeof value !== "string") return "unknown";
  const lower = value.toLowerCase();
  if (ALLOWED_MODES.has(lower as ItineraryTransportMode)) {
    return lower as ItineraryTransportMode;
  }
  return LEGACY_MODE_MAP[lower] ?? "unknown";
}

function ensureEstimatedInstructions(text: string): string {
  const lower = text.toLowerCase();
  if (
    lower.includes("approximate") ||
    lower.includes("estimate") ||
    lower.includes("not a live") ||
    lower.includes("not an exact")
  ) {
    return text;
  }
  return `${text} (approximate estimate, not an exact schedule.)`;
}

function readDuration(value: unknown, fallback = 10): number {
  if (typeof value === "number" && Number.isInteger(value) && value > 0) {
    return value;
  }
  return fallback;
}

type TransportLegInput = Partial<
  Omit<ItineraryTransportLeg, "mode"> & { mode?: ItineraryTransportMode | string; note?: string }
>;

/** Normalize legacy and partial transport legs for display and routing. */
export function normalizeTransportLeg(
  raw: TransportLegInput | null | undefined,
): ItineraryTransportLeg | null {
  if (raw === null || raw === undefined) return null;

  const instructionsRaw =
    typeof raw.instructions === "string" && raw.instructions.trim() !== ""
      ? raw.instructions.trim()
      : typeof raw.note === "string" && raw.note.trim() !== ""
        ? raw.note.trim()
        : "Transfer between stops.";

  const provider: TransportLegProvider =
    raw.provider === "google_routes" ||
    raw.provider === "ai_estimate" ||
    raw.provider === "manual"
      ? raw.provider
      : "ai_estimate";

  return {
    mode: coerceMode(raw.mode),
    durationMinutes: readDuration(raw.durationMinutes),
    estimated: raw.estimated !== false,
    instructions: ensureEstimatedInstructions(instructionsRaw),
    provider,
    ...(typeof raw.lineName === "string" && raw.lineName.trim() !== ""
      ? { lineName: raw.lineName.trim() }
      : {}),
    ...(typeof raw.transitMode === "string" && raw.transitMode.trim() !== ""
      ? { transitMode: raw.transitMode.trim() }
      : {}),
    ...(typeof raw.distanceMeters === "number" &&
    Number.isFinite(raw.distanceMeters) &&
    raw.distanceMeters > 0
      ? { distanceMeters: Math.round(raw.distanceMeters) }
      : {}),
    cost: raw.cost === null || raw.cost === undefined ? null : raw.cost,
  };
}

export function aiEstimateTransportLeg(
  existing: ItineraryTransportLeg | null | undefined,
  fromName: string,
  toName: string,
): ItineraryTransportLeg {
  const base = normalizeTransportLeg(existing);
  if (base && base.provider === "google_routes") {
    return base;
  }
  return normalizeTransportLeg({
    mode: base?.mode ?? "transit",
    durationMinutes: base?.durationMinutes ?? 15,
    estimated: true,
    provider: "ai_estimate",
    instructions:
      base?.instructions ??
      `Approximate transfer from ${fromName} to ${toName}.`,
    lineName: base?.lineName,
    transitMode: base?.transitMode,
    distanceMeters: base?.distanceMeters,
    cost: null,
  })!;
}
