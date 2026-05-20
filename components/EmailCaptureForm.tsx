"use client";

import { useState, type FormEvent } from "react";
import {
  trackChecklistDownload,
  trackChecklistSubmit,
} from "@/lib/checklist-analytics";
import { submitChecklistEmailCapture } from "@/lib/email-capture";

export type EmailCaptureFormProps = {
  downloadId: string;
  submitLabel?: string;
  emailPrompt?: string;
  successMessage?: string;
  className?: string;
};

const inputClass =
  "w-full min-w-0 rounded border border-[#d4c9b0] bg-white px-3 py-2.5 font-sans text-base text-dark placeholder:text-muted/70 focus:border-rust focus:outline-none focus:ring-1 focus:ring-rust/30";
const buttonClass =
  "inline-block w-full bg-maroon px-6 py-3 font-sans text-base font-bold uppercase tracking-widest text-white transition-colors duration-150 hover:bg-rust disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto";

function triggerDownload(downloadUrl: string) {
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = "";
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function EmailCaptureForm({
  downloadId,
  submitLabel = "Get the PDF",
  emailPrompt,
  successMessage = "Download started. Check your downloads folder.",
  className = "",
}: EmailCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    const result = await submitChecklistEmailCapture(email, downloadId);

    if (!result.ok || !result.downloadUrl) {
      setStatus("error");
      setErrorMessage(result.error ?? "Something went wrong. Try again.");
      return;
    }

    trackChecklistSubmit(downloadId);
    trackChecklistDownload(downloadId);
    triggerDownload(result.downloadUrl);
    setStatus("success");
  }

  if (status === "success") {
    return (
      <p className={`article-body-sm m-0 text-dark ${className}`.trim()}>
        {successMessage}
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-3 ${className}`.trim()}
      noValidate
    >
      {emailPrompt ? (
        <p className="article-body-sm m-0 text-muted">{emailPrompt}</p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <label className="sr-only" htmlFor={`checklist-email-${downloadId}`}>
          Email address
        </label>
        <input
          id={`checklist-email-${downloadId}`}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className={inputClass}
          disabled={status === "loading"}
        />
        <button type="submit" className={buttonClass} disabled={status === "loading"}>
          {status === "loading" ? "Sending..." : submitLabel}
        </button>
      </div>

      {errorMessage ? (
        <p className="article-body-sm m-0 text-rust" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <p className="article-body-sm m-0 text-muted/90">
        One email to send this PDF. Unsubscribe anytime.
      </p>
    </form>
  );
}
