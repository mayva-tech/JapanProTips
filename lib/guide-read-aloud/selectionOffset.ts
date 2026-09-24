import type { ArticleSpeechSegment, ArticleTextMap, TextNodeSlice } from "./types";

/**
 * Absolute UTF-16 offset of the current selection’s start within the article
 * text map, or null if there is no usable selection inside the root.
 */
export function getSelectionStartOffset(
  root: Element,
  slices: TextNodeSlice[],
): number | null {
  if (typeof window === "undefined") return null;
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
    return null;
  }

  const range = selection.getRangeAt(0);
  if (!root.contains(range.startContainer)) return null;

  let textNode: Text | null = null;
  let localOffset = 0;

  if (range.startContainer.nodeType === Node.TEXT_NODE) {
    textNode = range.startContainer as Text;
    localOffset = range.startOffset;
  } else if (range.startContainer.nodeType === Node.ELEMENT_NODE) {
    const walker = document.createTreeWalker(
      range.startContainer,
      NodeFilter.SHOW_TEXT,
    );
    const first = walker.nextNode() as Text | null;
    if (!first) return null;
    textNode = first;
    localOffset = 0;
  }

  if (!textNode) return null;

  for (const slice of slices) {
    if (slice.node === textNode) {
      return slice.start + Math.min(localOffset, slice.end - slice.start);
    }
  }

  // Selection may sit in a mark span split from a mapped node — walk up and
  // match by comparing node data identity after normalize is unreliable, so
  // fall back to range comparison against each slice node.
  for (const slice of slices) {
    try {
      const probe = document.createRange();
      probe.selectNodeContents(slice.node);
      // startContainer is at/after this slice start if compareBoundaryPoints says so
      const startVsSlice = range.compareBoundaryPoints(Range.START_TO_START, probe);
      const endVsSlice = range.compareBoundaryPoints(Range.START_TO_END, probe);
      if (startVsSlice >= 0 && endVsSlice <= 0) {
        // Approximate: offset within slice by string index of selected prefix
        const pre = document.createRange();
        pre.setStart(slice.node, 0);
        pre.setEnd(range.startContainer, range.startOffset);
        return slice.start + pre.toString().length;
      }
    } catch {
      // Cross-boundary compare can throw; skip slice.
    }
  }

  return null;
}

/** Drop / trim segments so playback begins at fromOffset (inclusive). */
export function segmentsFromOffset(
  segments: ArticleSpeechSegment[],
  fromOffset: number,
): ArticleSpeechSegment[] {
  if (fromOffset <= 0) return segments;
  const out: ArticleSpeechSegment[] = [];
  for (const seg of segments) {
    const segEnd = seg.articleStart + seg.text.length;
    if (segEnd <= fromOffset) continue;
    if (seg.articleStart >= fromOffset) {
      out.push(seg);
      continue;
    }
    const cut = fromOffset - seg.articleStart;
    const text = seg.text.slice(cut);
    if (!text.trim()) continue;
    out.push({
      ...seg,
      text,
      articleStart: fromOffset,
    });
  }
  return out;
}

export function planSegmentsFromMap(
  map: ArticleTextMap,
  fromOffset = 0,
): ArticleSpeechSegment[] {
  return segmentsFromOffset(
    map.segments.filter((s) => s.text.trim().length > 0),
    fromOffset,
  );
}
