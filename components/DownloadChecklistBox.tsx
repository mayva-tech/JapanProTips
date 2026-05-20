import type { ReactNode } from "react";
import { ChecklistViewTracker } from "@/components/ChecklistViewTracker";
import { EmailCaptureForm } from "@/components/EmailCaptureForm";
import { ChecklistDirectDownload } from "@/components/ChecklistDirectDownload";
import {
  getDownloadableChecklist,
  type DownloadableChecklist,
} from "@/lib/downloadable-checklists";

export type DownloadChecklistBoxProps = {
  /** Loads defaults from `lib/downloadable-checklists.ts`. */
  downloadId: string;
  title?: string;
  /** Overrides registry `shortDescription`. */
  description?: string;
  previewItems?: string[];
  emailRequired?: boolean;
  inline?: boolean;
  note?: ReactNode;
  className?: string;
};

function resolveChecklist(
  downloadId: string,
  overrides: Pick<
    DownloadChecklistBoxProps,
    "title" | "description" | "previewItems" | "emailRequired"
  >,
): DownloadableChecklist | null {
  const preset = getDownloadableChecklist(downloadId);
  if (!preset) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `DownloadChecklistBox: unknown downloadId "${downloadId}".`,
      );
    }
    return null;
  }

  return {
    ...preset,
    title: overrides.title ?? preset.title,
    shortDescription: overrides.description ?? preset.shortDescription,
    previewItems: overrides.previewItems ?? preset.previewItems,
    emailRequired: overrides.emailRequired ?? preset.emailRequired,
  };
}

export function DownloadChecklistBox({
  downloadId,
  title,
  description,
  previewItems,
  emailRequired,
  inline = false,
  note,
  className = "",
}: DownloadChecklistBoxProps) {
  const checklist = resolveChecklist(downloadId, {
    title,
    description,
    previewItems,
    emailRequired,
  });

  if (!checklist) {
    return null;
  }

  const boxClass = inline
    ? `not-prose my-8 max-w-2xl rounded-lg border border-[#d4c9b0]/80 bg-paper-elevated/60 px-4 py-4 sm:px-5 sm:py-5 ${className}`.trim()
    : `not-prose my-10 max-w-2xl border-t border-tan pt-8 ${className}`.trim();

  const items = checklist.previewItems ?? [];

  return (
    <ChecklistViewTracker downloadId={checklist.id}>
      <aside className={boxClass} aria-label={checklist.title}>
        <p className="mb-2 font-sans text-xs font-bold uppercase tracking-widest text-muted/90">
          Free download
        </p>
        <h2
          className={`editorial-heading text-dark ${
            inline ? "mb-2 text-lg sm:text-xl" : "mb-3 text-xl sm:text-2xl"
          }`}
        >
          {checklist.title}
        </h2>
        <p className={`article-body text-muted ${inline ? "mb-4" : "mb-5"}`}>
          {checklist.shortDescription}
        </p>

        {items.length > 0 ? (
          <ul className="article-body-sm mb-5 list-none space-y-2 pl-0 text-dark">
            {items.map((item) => (
              <li
                key={item}
                className="before:mr-3 before:font-bold before:text-rust before:content-['›']"
              >
                {item}
              </li>
            ))}
          </ul>
        ) : null}

        {checklist.emailRequired ? (
          <EmailCaptureForm
            downloadId={checklist.id}
            emailPrompt={checklist.emailPrompt}
            successMessage={checklist.successMessage}
          />
        ) : (
          <ChecklistDirectDownload
            downloadId={checklist.id}
            filePath={checklist.filePath}
          />
        )}

        {note ? (
          <p className="article-body-sm mt-4 text-muted">{note}</p>
        ) : null}
      </aside>
    </ChecklistViewTracker>
  );
}
