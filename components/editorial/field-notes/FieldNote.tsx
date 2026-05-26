"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  guideSlugFromPathname,
  trackFieldNoteCopy,
  trackFieldNoteLinkClick,
  trackFieldNoteView,
  trackFieldNoteVisible,
} from "@/lib/field-note-analytics";
import {
  FIELD_NOTE_DATA_ATTR,
  FIELD_NOTE_KIND_ATTR,
  FIELD_NOTE_TONES,
  type FieldNoteTone,
} from "@/lib/field-notes";

export type FieldNoteProps = {
  children: ReactNode;
  /** Visual and semantic tone. Defaults to `field`. */
  tone?: FieldNoteTone;
  /** Overrides the default kicker for this tone. */
  label?: string;
  /** Stable id for snippets, search, or CMS (exposed as `id` on the root when set). */
  noteId?: string;
  className?: string;
  /**
   * Optional slug override for analytics when the note is not under
   * `/guides/{slug}` or `/residents/{slug}` (defaults from `usePathname()`).
   */
  analyticsSlug?: string;
};

const shellClass =
  "field-note not-prose my-7 max-w-2xl rounded-lg border border-paper-edge px-4 py-3.5 shadow-editorial sm:px-5 sm:py-4";

const kickerClass =
  "field-note__kicker mb-2 block font-sans text-xs font-bold uppercase tracking-widest text-rust";

const bodyClass =
  "field-note__body article-body-sm text-dark [&>p]:mb-2 [&>p:last-child]:mb-0 [&>ul]:mb-0 [&>ul]:mt-2";

const VIEW_RATIO = 0.12;
const ENGAGED_RATIO = 0.5;

export function FieldNote({
  children,
  tone = "field",
  label,
  noteId,
  className = "",
  analyticsSlug: analyticsSlugProp,
}: FieldNoteProps) {
  const pathname = usePathname();
  const slug =
    analyticsSlugProp ?? guideSlugFromPathname(pathname ?? null);

  const rootRef = useRef<HTMLElement>(null);
  const sawViewRef = useRef(false);
  const sawVisibleRef = useRef(false);
  const lastCopyAtRef = useRef(0);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    sawViewRef.current = false;
    sawVisibleRef.current = false;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const ratio = entry.intersectionRatio;
          if (!sawViewRef.current && ratio >= VIEW_RATIO) {
            sawViewRef.current = true;
            trackFieldNoteView(tone, slug, noteId);
          }
          if (!sawVisibleRef.current && ratio >= ENGAGED_RATIO) {
            sawVisibleRef.current = true;
            trackFieldNoteVisible(tone, slug, noteId);
          }
        }
      },
      { threshold: [0, 0.05, 0.1, 0.12, 0.2, 0.35, 0.5, 0.75, 1] },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [tone, slug, noteId]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const onCopy = () => {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) return;
      const node = sel.getRangeAt(0).commonAncestorContainer;
      const element = node.nodeType === Node.ELEMENT_NODE
        ? (node as Element)
        : node.parentElement;
      if (!element || !el.contains(element)) return;
      const now = Date.now();
      if (now - lastCopyAtRef.current < 2500) return;
      lastCopyAtRef.current = now;
      trackFieldNoteCopy(tone, slug, noteId);
    };

    document.addEventListener("copy", onCopy);
    return () => document.removeEventListener("copy", onCopy);
  }, [tone, slug, noteId]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const onClickCapture = (event: MouseEvent) => {
      if (event.button !== 0) return;
      const t = event.target;
      if (!(t instanceof Element)) return;
      const anchor = t.closest("a[href]");
      if (!anchor || !el.contains(anchor)) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      trackFieldNoteLinkClick(tone, slug, noteId, href);
    };

    el.addEventListener("click", onClickCapture, true);
    return () => el.removeEventListener("click", onClickCapture, true);
  }, [tone, slug, noteId]);

  const meta = FIELD_NOTE_TONES[tone];
  const kicker = label ?? meta.defaultLabel;
  const rootClass = `${shellClass} field-note--${meta.classSuffix} ${className}`.trim();

  return (
    <aside
      ref={rootRef}
      id={noteId}
      className={rootClass}
      {...{ [FIELD_NOTE_DATA_ATTR]: "true", [FIELD_NOTE_KIND_ATTR]: tone }}
      aria-label={kicker}
      role="note"
    >
      <span className={kickerClass}>{kicker}</span>
      <div className={bodyClass}>{children}</div>
    </aside>
  );
}

export function RealityCheck(props: Omit<FieldNoteProps, "tone">) {
  return <FieldNote tone="reality-check" {...props} />;
}

export function LocalTip(props: Omit<FieldNoteProps, "tone">) {
  return <FieldNote tone="local-habit" {...props} />;
}

export function WhatPeopleMiss(props: Omit<FieldNoteProps, "tone">) {
  return <FieldNote tone="what-people-miss" {...props} />;
}

export function OperationalWarning(props: Omit<FieldNoteProps, "tone">) {
  return <FieldNote tone="operational-warning" {...props} />;
}

export function SeasonalNote(props: Omit<FieldNoteProps, "tone">) {
  return <FieldNote tone="seasonal" {...props} />;
}

export function TouristMistakeNote(props: Omit<FieldNoteProps, "tone">) {
  return <FieldNote tone="tourist-mistake" {...props} />;
}

export function ResidentLearnedNote(props: Omit<FieldNoteProps, "tone">) {
  return <FieldNote tone="resident-learned" {...props} />;
}
