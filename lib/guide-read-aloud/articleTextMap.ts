import {
  japaneseNeedsPhraseLevelFallback,
  splitLangSegments,
} from "./splitLangSegments";
import type { ArticleSpeechSegment, ArticleTextMap, TextNodeSlice } from "./types";

const SKIP_SELECTOR = [
  "script",
  "style",
  "noscript",
  "nav",
  "footer",
  "button",
  "form",
  "input",
  "textarea",
  "select",
  "option",
  "code",
  "pre",
  "svg",
  "canvas",
  "[hidden]",
  "[aria-hidden='true']",
  ".sr-only",
  "[data-guide-read-aloud-skip]",
  "[data-guide-read-aloud-controls]",
  "[data-guide-audio-player]",
  "[data-site-talking-heads]",
  ".th-root",
  ".th-dock",
].join(",");

function isExcluded(node: Node, root: Element): boolean {
  let current: Node | null = node;
  while (current && current !== root) {
    if (current instanceof Element) {
      if (current.matches(SKIP_SELECTOR)) return true;
      const style = typeof window !== "undefined" ? window.getComputedStyle(current) : null;
      if (style && (style.display === "none" || style.visibility === "hidden")) {
        return true;
      }
    }
    current = current.parentNode;
  }
  return false;
}

/**
 * Build concatenated eligible text + text-node slices + EN/JA speech segments
 * from the same walk so speech offsets map 1:1 onto displayed nodes.
 */
export function buildArticleTextMap(root: Element): ArticleTextMap {
  const slices: TextNodeSlice[] = [];
  let text = "";

  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
    {
      acceptNode(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // Only <br> matters as an element (line break); descend into the rest.
          return (node as Element).tagName === "BR" && !isExcluded(node, root)
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
        }
        if (!node.nodeValue) return NodeFilter.FILTER_REJECT;
        if (isExcluded(node, root)) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (parent?.closest(SKIP_SELECTOR)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    },
  );

  const lineBreaks: number[] = [];
  let prevBlock: Element | null = null;
  let prevColor: string | null = null;
  let pendingBr = false;

  let current: Node | null = walker.nextNode();
  while (current) {
    if (current.nodeType === Node.ELEMENT_NODE) {
      pendingBr = true;
      current = walker.nextNode();
      continue;
    }
    const value = current.nodeValue ?? "";
    if (value.length > 0) {
      const start = text.length;
      if (value.trim()) {
        const block = nearestBlock(current, root);
        const color = textColor(current);
        const colorLineChange =
          block === prevBlock &&
          HEADING_TAGS.has(block.tagName) &&
          color !== null &&
          prevColor !== null &&
          color !== prevColor;
        if (prevBlock && (block !== prevBlock || pendingBr || colorLineChange)) {
          lineBreaks.push(start);
        }
        prevBlock = block;
        prevColor = color;
        pendingBr = false;
      }
      text += value;
      slices.push({
        node: current as Text,
        start,
        end: text.length,
      });
    }
    current = walker.nextNode();
  }

  addListMarkerBreaks(text, lineBreaks);

  // Indices must match displayed text nodes exactly, so the text is not
  // normalized; speech trims whitespace per segment instead.
  const segments = splitRunsAtLineBreaks(splitLangSegments(text), lineBreaks, text);

  return { text, slices, segments };
}

const BLOCK_SELECTOR = [
  "p",
  "li",
  "dt",
  "dd",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "blockquote",
  "td",
  "th",
  "caption",
  "figcaption",
  "summary",
  "div",
  "section",
  "header",
  "article",
].join(",");

const LIST_MARKER_RE = /\s*\d{1,3}[.)]\s+(?=\S)/y;

/**
 * "1. SIM / Internet" — speak the number as its own line ("one", pause,
 * "SIM…") instead of running it into the heading.
 */
function addListMarkerBreaks(text: string, lineBreaks: number[]): void {
  const lineStarts = [0, ...lineBreaks];
  for (const start of lineStarts) {
    LIST_MARKER_RE.lastIndex = start;
    const m = LIST_MARKER_RE.exec(text);
    if (m) lineBreaks.push(start + m[0].length);
  }
  lineBreaks.sort((a, b) => a - b);
}

/**
 * Headings often stack differently coloured lines in one element
 * (e.g. "START HERE" / accent "PLAN YOUR TRIP"). Colour changes elsewhere are
 * usually inline links or emphasis, so they do not end a line.
 */
const HEADING_TAGS = new Set(["H1", "H2", "H3", "H4", "H5", "H6"]);

function textColor(node: Node): string | null {
  const parent = node.parentElement;
  if (!parent || typeof window === "undefined") return null;
  return window.getComputedStyle(parent).color || null;
}

function nearestBlock(node: Node, root: Element): Element {
  const block = node.parentElement?.closest(BLOCK_SELECTOR);
  return block && root.contains(block) ? block : root;
}

/**
 * Cut language runs at displayed line boundaries and flag the segment that
 * closes each line, so the reader can pause before the next line.
 */
export function splitRunsAtLineBreaks(
  runs: Array<{ lang: "en" | "ja"; text: string; start: number; end: number }>,
  lineBreaks: number[],
  fullText: string,
): ArticleSpeechSegment[] {
  const pieces: ArticleSpeechSegment[] = [];
  for (const run of runs) {
    let cursor = run.start;
    const cuts = lineBreaks.filter((b) => b > run.start && b < run.end);
    for (const cut of [...cuts, run.end]) {
      const pieceText = fullText.slice(cursor, cut);
      if (pieceText.trim()) {
        pieces.push({
          lang: run.lang,
          text: pieceText,
          articleStart: cursor,
          phraseLevel:
            run.lang === "ja" && japaneseNeedsPhraseLevelFallback(pieceText),
        });
      }
      cursor = cut;
    }
  }

  for (let i = 0; i < pieces.length; i += 1) {
    const seg = pieces[i]!;
    const segEnd = seg.articleStart + seg.text.length;
    const nextStart = pieces[i + 1]?.articleStart ?? Infinity;
    if (lineBreaks.some((b) => b >= segEnd && b <= nextStart)) {
      seg.lineEnd = true;
    }
  }
  return pieces;
}

/** Map an absolute article range onto live text-node slices (after DOM mutations, rebuild map). */
export function slicesOverlapping(
  slices: TextNodeSlice[],
  start: number,
  end: number,
): Array<{ slice: TextNodeSlice; localStart: number; localEnd: number }> {
  const out: Array<{
    slice: TextNodeSlice;
    localStart: number;
    localEnd: number;
  }> = [];
  for (const slice of slices) {
    if (slice.end <= start || slice.start >= end) continue;
    out.push({
      slice,
      localStart: Math.max(0, start - slice.start),
      localEnd: Math.min(slice.end - slice.start, end - slice.start),
    });
  }
  return out;
}
