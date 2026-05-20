"use client";

import { trackChecklistDownload } from "@/lib/checklist-analytics";

type ChecklistDirectDownloadProps = {
  downloadId: string;
  filePath: string;
  label?: string;
};

const buttonClass =
  "inline-block bg-maroon px-7 py-3.5 font-sans text-base font-bold uppercase tracking-widest text-white transition-colors duration-150 hover:bg-rust";

export function ChecklistDirectDownload({
  downloadId,
  filePath,
  label = "Get the PDF",
}: ChecklistDirectDownloadProps) {
  return (
    <a
      href={filePath}
      download
      className={buttonClass}
      onClick={() => trackChecklistDownload(downloadId)}
    >
      {label} →
    </a>
  );
}
