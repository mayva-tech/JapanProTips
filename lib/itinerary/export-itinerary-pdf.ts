import {
  itineraryDurationLabel,
  itineraryThemeLabel,
  startCityLabel,
  travelPaceLabel,
  travelStyleLabel,
} from "@/lib/itinerary/itinerary-options";
import { normalizeTransportLeg } from "@/lib/itinerary/transport-leg";
import type {
  GeneratedItinerary,
  ItineraryStop,
  ItineraryTransportMode,
} from "@/types/itinerary";

const BRAND_LINE = "JapanProTips";
const SITE_LINE = "japanprotips.com";
const DISCLAIMER =
  "Travel times are estimates. Please verify opening hours, routes, and fares before your trip.";

const TRANSPORT_MODE_LABELS: Record<ItineraryTransportMode, string> = {
  walk: "Walk",
  transit: "Transit",
  train: "Train",
  subway: "Subway",
  bus: "Bus",
  taxi: "Taxi",
  unknown: "Transfer",
};

const MARGIN_MM = 15;
const LINE_HEIGHT_BODY = 5;
const LINE_HEIGHT_SMALL = 4.5;
const LINE_HEIGHT_HEADING = 6;
const LINE_HEIGHT_TITLE = 8;

type JsPDFDoc = import("jspdf").jsPDF;

function formatCategory(category: string): string {
  return category.replace(/_/g, " ");
}

function formatExportDate(): string {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function safePdfFilename(slug: string): string {
  const safe = slug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return `${safe || "japan-itinerary"}.pdf`;
}

function transportInstructions(stop: ItineraryStop): string | undefined {
  const leg = normalizeTransportLeg(stop.transportToNext);
  return leg?.instructions ?? leg?.note;
}

function formatTransportLine(stop: ItineraryStop): string | null {
  const transport = normalizeTransportLeg(stop.transportToNext);
  if (!transport) return null;

  const parts = [
    `Estimated travel to next stop: ${TRANSPORT_MODE_LABELS[transport.mode]}, about ${transport.durationMinutes} min.`,
  ];
  if (transport.lineName) {
    parts.push(`Line: ${transport.lineName}.`);
  }
  const instructions = transportInstructions(stop);
  if (instructions) {
    parts.push(instructions);
  }
  return parts.join(" ");
}

class PdfWriter {
  private y = MARGIN_MM;

  constructor(
    private readonly doc: JsPDFDoc,
    private readonly pageWidth: number,
    private readonly pageHeight: number,
    private readonly maxWidth: number,
  ) {}

  private ensureSpace(heightMm: number): void {
    if (this.y + heightMm > this.pageHeight - MARGIN_MM) {
      this.doc.addPage();
      this.y = MARGIN_MM;
    }
  }

  addGap(mm: number): void {
    this.y += mm;
  }

  addWrappedText(
    text: string,
    fontSize: number,
    options?: { bold?: boolean; lineHeight?: number },
  ): void {
    const lineHeight = options?.lineHeight ?? LINE_HEIGHT_BODY;
    this.doc.setFontSize(fontSize);
    this.doc.setFont("helvetica", options?.bold ? "bold" : "normal");
    const lines = this.doc.splitTextToSize(text, this.maxWidth) as string[];
    for (const line of lines) {
      this.ensureSpace(lineHeight);
      this.doc.text(line, MARGIN_MM, this.y);
      this.y += lineHeight;
    }
  }
}

function buildPdfContent(itinerary: GeneratedItinerary, doc: JsPDFDoc): void {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxWidth = pageWidth - MARGIN_MM * 2;
  const writer = new PdfWriter(doc, pageWidth, pageHeight, maxWidth);

  writer.addWrappedText(BRAND_LINE, 11, { bold: true, lineHeight: LINE_HEIGHT_SMALL });
  writer.addWrappedText(SITE_LINE, 9, { lineHeight: LINE_HEIGHT_SMALL });
  writer.addGap(3);
  writer.addWrappedText(itinerary.title, 16, { bold: true, lineHeight: LINE_HEIGHT_TITLE });
  writer.addGap(2);

  const summary = [
    `Duration: ${itineraryDurationLabel(itinerary.duration)}`,
    `Start city: ${startCityLabel(itinerary.startCity)}`,
    `Theme: ${itineraryThemeLabel(itinerary.theme)}`,
    `Travel style: ${travelStyleLabel(itinerary.travelStyle)}`,
    `Pace: ${travelPaceLabel(itinerary.pace)}`,
    `Exported: ${formatExportDate()}`,
  ].join(" · ");

  writer.addWrappedText(summary, 10);
  writer.addGap(2);
  writer.addWrappedText(DISCLAIMER, 9, { lineHeight: LINE_HEIGHT_SMALL });
  writer.addGap(4);

  for (const day of itinerary.days) {
    writer.addWrappedText(
      `Day ${day.dayNumber}: ${day.title}`,
      12,
      { bold: true, lineHeight: LINE_HEIGHT_HEADING },
    );
    writer.addWrappedText(`${day.city} · ${day.summary}`, 10);
    writer.addGap(2);

    day.stops.forEach((stop, index) => {
      writer.addWrappedText(
        `${stop.estimatedTime} · ${stop.name}`,
        11,
        { bold: true, lineHeight: LINE_HEIGHT_HEADING },
      );
      writer.addWrappedText(
        `${formatCategory(stop.category)} · On site: ${stop.durationMinutes} min`,
        9,
        { lineHeight: LINE_HEIGHT_SMALL },
      );
      writer.addWrappedText(stop.description, 10);

      if (stop.formattedAddress) {
        writer.addWrappedText(`Address: ${stop.formattedAddress}`, 9, {
          lineHeight: LINE_HEIGHT_SMALL,
        });
      }
      if (stop.googleMapsUri) {
        writer.addWrappedText(`Google Maps: ${stop.googleMapsUri}`, 9, {
          lineHeight: LINE_HEIGHT_SMALL,
        });
      }

      const transportLine = formatTransportLine(stop);
      if (transportLine && index < day.stops.length - 1) {
        writer.addWrappedText(transportLine, 9, { lineHeight: LINE_HEIGHT_SMALL });
      }

      writer.addGap(2);
    });

    writer.addGap(2);
  }
}

export async function exportItineraryToPdf(
  itinerary: GeneratedItinerary,
): Promise<void> {
  const { default: jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  buildPdfContent(itinerary, doc);
  doc.save(safePdfFilename(itinerary.slug));
}
