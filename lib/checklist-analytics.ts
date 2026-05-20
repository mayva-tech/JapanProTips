import { trackGtagClick } from "@/lib/gtag-events";

export function checklistViewGtagLabel(downloadId: string): string {
  return `checklist_view:${downloadId}`;
}

export function checklistSubmitGtagLabel(downloadId: string): string {
  return `checklist_submit:${downloadId}`;
}

export function checklistDownloadGtagLabel(downloadId: string): string {
  return `checklist_download:${downloadId}`;
}

export function trackChecklistView(downloadId: string): void {
  trackGtagClick(checklistViewGtagLabel(downloadId));
}

export function trackChecklistSubmit(downloadId: string): void {
  trackGtagClick(checklistSubmitGtagLabel(downloadId));
}

export function trackChecklistDownload(downloadId: string): void {
  trackGtagClick(checklistDownloadGtagLabel(downloadId));
}
