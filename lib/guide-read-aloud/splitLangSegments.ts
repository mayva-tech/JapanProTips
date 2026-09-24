/**
 * Split mixed EN/JA display text into language runs (Phone Trainer policy).
 * Offsets are UTF-16 indices into the input string.
 */

const JP_RE =
  /[\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u3400-\u4DBF\uFF00-\uFFEF\u3005\u3006\u30F6、。！？「」『』（）〜]+/gu;

const KANJI_RE = /[\u4E00-\u9FAF\u3400-\u4DBF]/u;

export type LangRun = {
  lang: "en" | "ja";
  text: string;
  start: number;
  end: number;
};

export function splitLangSegments(text: string): LangRun[] {
  const segments: LangRun[] = [];
  let last = 0;
  JP_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = JP_RE.exec(text)) !== null) {
    if (match.index > last) {
      segments.push({
        lang: "en",
        text: text.slice(last, match.index),
        start: last,
        end: match.index,
      });
    }
    const end = match.index + match[0].length;
    segments.push({
      lang: "ja",
      text: match[0],
      start: match.index,
      end,
    });
    last = end;
  }
  if (last < text.length) {
    segments.push({
      lang: "en",
      text: text.slice(last),
      start: last,
      end: text.length,
    });
  }
  return segments.filter((s) => s.text.trim().length > 0);
}

/** True when JA surface contains kanji and needs phrase-level fallback without a reading. */
export function japaneseNeedsPhraseLevelFallback(text: string): boolean {
  if (KANJI_RE.test(text)) return true;
  // カード is spoken as カド (shorter than the display); avoid wrong word-level karaoke.
  if (/カード/.test(text)) return true;
  return false;
}
