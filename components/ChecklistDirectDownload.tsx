"use client";

import { trackChecklistDownload } from "@/lib/checklist-analytics";
import { stripTrailingArrowFromText } from "@/lib/cta-chevron";

type ChecklistDirectDownloadProps = {
  downloadId: string;
  filePath: string;
  label?: string;
};

const buttonClass =
  "editorial-chevron-cta inline-flex rounded-lg bg-maroon px-7 py-3.5 font-sans text-base font-bold uppercase tracking-widest text-white transition-colors duration-150 hover:bg-rust";

export function ChecklistDirectDownload({
  downloadId,
  filePath,
  label = "Get the PDF",
}: ChecklistDirectDownloadProps) {
  const buttonLabel = stripTrailingArrowFromText(label);

  return (
    <a
      href={filePath}
      download
      className={buttonClass}
      onClick={() => trackChecklistDownload(downloadId)}
    >
      {buttonLabel}
    </a>
  );
}
