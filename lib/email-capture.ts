import {
  getDownloadableChecklist,
  listDownloadableChecklistIds,
} from "@/lib/downloadable-checklists";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ChecklistCaptureResult = {
  ok: boolean;
  downloadUrl?: string;
  message?: string;
  error?: string;
};

export function isValidChecklistEmail(email: string): boolean {
  const trimmed = email.trim();
  return (
    trimmed.length >= 5 && trimmed.length <= 254 && EMAIL_PATTERN.test(trimmed)
  );
}

/**
 * Server-side handler for checklist email + download requests.
 * Swap the webhook block later for Mailchimp, ConvertKit, Beehiiv, etc.
 */
export async function processChecklistCaptureRequest(input: {
  downloadId: string;
  email?: string;
}): Promise<ChecklistCaptureResult> {
  const downloadId = input.downloadId.trim();
  const email = input.email?.trim() ?? "";

  if (!downloadId || !listDownloadableChecklistIds().includes(downloadId)) {
    return { ok: false, error: "Unknown checklist." };
  }

  const checklist = getDownloadableChecklist(downloadId);
  if (!checklist) {
    return { ok: false, error: "Unknown checklist." };
  }

  if (!checklist.emailRequired) {
    return { ok: true, downloadUrl: checklist.filePath };
  }

  if (!isValidChecklistEmail(email)) {
    return { ok: false, error: "Enter a valid email address." };
  }

  await persistChecklistEmailCapture({
    email,
    downloadId,
    filePath: checklist.filePath,
    category: checklist.category,
  });

  return {
    ok: true,
    downloadUrl: checklist.filePath,
    message:
      checklist.successMessage ??
      "Download started. Check your downloads folder.",
  };
}

/**
 * Client-side submit via API route. Keeps provider logic out of components.
 */
export async function submitChecklistEmailCapture(
  email: string,
  downloadId: string,
): Promise<ChecklistCaptureResult> {
  try {
    const response = await fetch("/api/checklist-subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, downloadId }),
    });

    const data = (await response.json()) as ChecklistCaptureResult;

    if (!response.ok || !data.ok) {
      return {
        ok: false,
        error: data.error ?? "Something went wrong. Try again.",
      };
    }

    return data;
  } catch {
    return {
      ok: false,
      error: "Network error. Check your connection and try again.",
    };
  }
}

/** Stub persistence: webhook only until ESP integration ships. */
async function persistChecklistEmailCapture(payload: {
  email: string;
  downloadId: string;
  filePath: string;
  category: string;
}): Promise<void> {
  const webhookUrl = process.env.CHECKLIST_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    if (process.env.NODE_ENV !== "production") {
      console.info(
        "[checklist-capture] stored locally (stub):",
        payload.downloadId,
        payload.email,
      );
    }
    return;
  }

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        source: "japanprotips-checklist",
        capturedAt: new Date().toISOString(),
      }),
    });
  } catch {
    // Provider failures should not block the download.
  }
}
