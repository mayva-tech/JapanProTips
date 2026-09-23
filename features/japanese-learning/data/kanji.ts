/**
 * PHASE 1 STUB. This is NOT the JLPT-Trainer kanji dictionary.
 *
 * The real `src/data/kanji.ts` in JLPT-Trainer (~115 KB) seeds per-kanji
 * reading candidates for `utils/alignFurigana.ts`. alignFurigana is only
 * reached when a caller passes a kana `reading` to speechService
 * (`speakJapanese(text, cb, rate, { reading })`), which drives reading-aware
 * karaoke timing.
 *
 * Konbini Trainer never passes a `reading` (it speaks `stripFurigana(jp)`),
 * so that path is unreachable in Phase 1 and this empty table keeps the
 * dictionary out of the bundle while alignFurigana.ts stays byte-identical
 * to the source.
 *
 * BEFORE migrating any trainer that passes `reading` (JLPT Player,
 * vocabulary/grammar courses), replace this file with the real
 * `src/data/kanji.ts` and port `src/types/vocabulary.ts` alongside it.
 * With this stub in place those trainers would still speak correctly, but
 * reading-aware karaoke alignment would degrade.
 */

type KanjiDictionaryEntry = {
  meaning: string;
  onyomi?: string[];
  kunyomi?: string[];
};

export const KANJI: Record<string, KanjiDictionaryEntry> = {};
