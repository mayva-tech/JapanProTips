"use client";

import { useState } from "react";
import { exportItineraryToPdf } from "@/lib/itinerary/export-itinerary-pdf";
import {
  analyticsPayloadFromItinerary,
  trackItineraryPdfDownload,
  trackItineraryPdfError,
} from "@/lib/itinerary/itinerary-analytics";
import type { GeneratedItinerary } from "@/types/itinerary";

const secondaryBtn =
  "inline-flex min-h-[44px] w-full items-center justify-center rounded-md border border-paper-edge bg-paper-elevated/90 px-5 py-3 font-sans text-sm font-bold uppercase tracking-widest text-dark transition-colors duration-150 hover:border-rust/45 hover:bg-paper disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto";

export function ItineraryExportButton({
  itinerary,
  readOnly = false,
}: {
  itinerary: GeneratedItinerary;
  readOnly?: boolean;
}) {
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const onDownloadPdf = async () => {
    const payload = { ...analyticsPayloadFromItinerary(itinerary), readOnly };
    trackItineraryPdfDownload(payload);

    setExporting(true);
    setExportError(null);
    try {
      await exportItineraryToPdf(itinerary);
    } catch {
      trackItineraryPdfError({ ...payload, errorType: "export_failed" });
      setExportError(
        "Could not prepare the PDF. Try again, or use your browser print option.",
      );
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        className={secondaryBtn}
        onClick={() => void onDownloadPdf()}
        disabled={exporting}
        aria-busy={exporting}
      >
        {exporting ? "Preparing PDF…" : "Download PDF"}
      </button>
      {exportError ? (
        <p className="article-body-sm font-sans text-sm text-muted">{exportError}</p>
      ) : null}
    </div>
  );
}
