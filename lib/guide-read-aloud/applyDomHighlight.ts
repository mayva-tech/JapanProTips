import { slicesOverlapping } from "./articleTextMap";
import type { ArticleRange, TextNodeSlice } from "./types";

export const SPEECH_MARK_ATTR = "data-guide-speech-mark";
export const SPEECH_ACTIVE_CLASS = "guide-speech-active";
export const SPEECH_SPOKEN_CLASS = "guide-speech-spoken";

/**
 * Unwrap all karaoke mark spans under root and normalize text nodes so the
 * article markup (links, emphasis, etc.) is restored.
 */
export function clearDomHighlights(root: Element): void {
  const marks = Array.from(root.querySelectorAll(`[${SPEECH_MARK_ATTR}]`));
  for (const mark of marks) {
    const parent = mark.parentNode;
    if (!parent) continue;
    while (mark.firstChild) {
      parent.insertBefore(mark.firstChild, mark);
    }
    parent.removeChild(mark);
  }
  root.normalize();
}

function wrapTextRange(
  node: Text,
  localStart: number,
  localEnd: number,
  className: string,
): void {
  if (!node.parentNode) return;
  if (localStart >= localEnd) return;
  const length = node.data.length;
  const start = Math.max(0, Math.min(localStart, length));
  const end = Math.max(start, Math.min(localEnd, length));
  if (start >= end) return;

  let target: Text = node;
  if (end < target.data.length) {
    target.splitText(end);
  }
  if (start > 0) {
    target = target.splitText(start);
  }

  const span = document.createElement("span");
  span.setAttribute(SPEECH_MARK_ATTR, "1");
  span.className = className;
  const parent = target.parentNode;
  if (!parent) return;
  parent.insertBefore(span, target);
  span.appendChild(target);
}

function paintRange(
  slices: TextNodeSlice[],
  start: number,
  end: number,
  className: string,
): void {
  if (end <= start) return;
  for (const hit of slicesOverlapping(slices, start, end)) {
    wrapTextRange(hit.slice.node, hit.localStart, hit.localEnd, className);
  }
}

/**
 * Clear marks, then paint spoken-through and active ranges.
 * `rebuildSlices` must return slices against the current (unmarked) DOM.
 */
export function applyDomHighlightsSafe(
  root: Element,
  rebuildSlices: () => TextNodeSlice[],
  spokenThrough: number,
  active: ArticleRange | null,
): void {
  clearDomHighlights(root);

  // Prefer the live active cursor so mid-utterance words mark as spoken.
  const spokenEnd = active ? active.start : spokenThrough;
  if (spokenEnd > 0) {
    paintRange(rebuildSlices(), 0, spokenEnd, SPEECH_SPOKEN_CLASS);
  }

  if (active && active.end > active.start) {
    // Spoken wraps split text nodes — rebuild before painting active.
    paintRange(rebuildSlices(), active.start, active.end, SPEECH_ACTIVE_CLASS);
  }
}
