/**
 * Orchestrates Trainer speechService over article DOM text with karaoke marks.
 * Does not fork the karaoke timeline — only remaps utterance offsets onto nodes.
 */

import {
  isSpeechCancelled,
  SPEECH_RATE_NORMAL,
  speechService as defaultSpeechService,
  type SpeechHighlight,
  type SpeakCallbacks,
} from "@/features/japanese-learning/services/speechService";
import { buildArticleTextMap } from "./articleTextMap";
import { applyDomHighlightsSafe, clearDomHighlights } from "./applyDomHighlight";
import { emitGuideAudioBus } from "./guideAudioBus";
import { planSegmentsFromMap } from "./selectionOffset";
import type { ArticleSpeechSegment, ArticleTextMap } from "./types";

export type ArticleSpeechStatus = "idle" | "playing" | "paused";

/** Silence between displayed lines (paragraphs, headings, list items, cells). */
export const LINE_PAUSE_MS = 550;

/** Narrow surface used by the controller so tests can inject a fake. */
export type ArticleSpeechEngine = {
  speakJapanese: (
    text: string,
    callbacks?: SpeakCallbacks,
    rate?: number,
  ) => void;
  speakEnglish: (
    text: string,
    callbacks?: SpeakCallbacks,
    rate?: number,
  ) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
};

export type ArticleSpeechControllerOptions = {
  root: Element;
  guideSlug: string;
  onStatus?: (status: ArticleSpeechStatus) => void;
  speech?: ArticleSpeechEngine;
};

export type ArticleSpeechController = {
  start: (options?: { fromOffset?: number }) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  getStatus: () => ArticleSpeechStatus;
  destroy: () => void;
};

export function createArticleSpeechController(
  options: ArticleSpeechControllerOptions,
): ArticleSpeechController {
  const {
    root,
    guideSlug,
    onStatus,
    speech = defaultSpeechService,
  } = options;
  let generation = 0;
  let status: ArticleSpeechStatus = "idle";
  let map: ArticleTextMap | null = null;
  let segmentIndex = 0;
  let spokenThrough = 0;
  let lineGapTimer: ReturnType<typeof setTimeout> | null = null;
  let lineGapDueAt = 0;
  /** Remaining gap (ms) captured when the user pauses mid-gap. */
  let lineGapRemaining: number | null = null;
  let lineGapPlaybackId = 0;

  const clearLineGap = () => {
    if (lineGapTimer !== null) clearTimeout(lineGapTimer);
    lineGapTimer = null;
    lineGapRemaining = null;
  };

  const armLineGap = (playbackId: number, ms: number) => {
    lineGapPlaybackId = playbackId;
    lineGapDueAt = Date.now() + ms;
    lineGapTimer = setTimeout(() => {
      lineGapTimer = null;
      playSegment(playbackId);
    }, ms);
  };

  const setStatus = (next: ArticleSpeechStatus) => {
    status = next;
    onStatus?.(next);
  };

  const rebuildSlices = () => buildArticleTextMap(root).slices;

  const paint = (active: SpeechHighlight | null) => {
    applyDomHighlightsSafe(
      root,
      rebuildSlices,
      spokenThrough,
      active ? { start: active.start, end: active.end } : null,
    );
  };

  const clear = () => {
    clearDomHighlights(root);
    spokenThrough = 0;
  };

  const finishIdle = () => {
    clear();
    setStatus("idle");
    emitGuideAudioBus({ type: "tts-stop", guideSlug });
  };

  const playSegment = (playbackId: number) => {
    if (playbackId !== generation) return;
    if (!map) return;

    while (segmentIndex < map.segments.length) {
      const seg = map.segments[segmentIndex];
      if (seg.text.trim()) break;
      segmentIndex += 1;
    }

    if (segmentIndex >= map.segments.length) {
      spokenThrough = map.text.length;
      paint(null);
      finishIdle();
      return;
    }

    const seg = map.segments[segmentIndex];
    const absolute = (h: SpeechHighlight): SpeechHighlight => ({
      start: seg.articleStart + h.start,
      end: seg.articleStart + h.end,
    });

    const onBoundary = (h: SpeechHighlight) => {
      if (playbackId !== generation) return;
      if (status === "paused") return;
      if (seg.phraseLevel) {
        paint({
          start: seg.articleStart,
          end: seg.articleStart + seg.text.length,
        });
        return;
      }
      paint(absolute(h));
    };

    const onStart = () => {
      if (playbackId !== generation) return;
      if (seg.phraseLevel) {
        paint({
          start: seg.articleStart,
          end: seg.articleStart + seg.text.length,
        });
      }
    };

    const advance = () => {
      if (playbackId !== generation) return;
      spokenThrough = seg.articleStart + seg.text.length;
      segmentIndex += 1;
      const hasNext = segmentIndex < (map?.segments.length ?? 0);
      if (seg.lineEnd && hasNext) {
        paint(null);
        if (status === "paused") {
          lineGapPlaybackId = playbackId;
          lineGapRemaining = LINE_PAUSE_MS;
          return;
        }
        armLineGap(playbackId, LINE_PAUSE_MS);
        return;
      }
      playSegment(playbackId);
    };

    const callbacks: SpeakCallbacks = {
      onStart,
      onBoundary,
      onEnd: advance,
      onError: (error?: unknown) => {
        if (isSpeechCancelled(error)) return;
        if (playbackId !== generation) return;
        advance();
      },
    };

    if (seg.lang === "ja") {
      speech.speakJapanese(seg.text, callbacks, SPEECH_RATE_NORMAL);
    } else {
      speech.speakEnglish(seg.text, callbacks, SPEECH_RATE_NORMAL);
    }
  };

  return {
    start(options?: { fromOffset?: number }) {
      generation += 1;
      const playbackId = generation;
      clearLineGap();
      speech.stop();
      clear();
      const full = buildArticleTextMap(root);
      const fromOffset = Math.max(0, options?.fromOffset ?? 0);
      const segments = planSegmentsFromMap(full, fromOffset);
      map = { ...full, segments };
      segmentIndex = 0;
      spokenThrough = fromOffset;
      if (!segments.length) {
        setStatus("idle");
        return;
      }
      setStatus("playing");
      emitGuideAudioBus({ type: "tts-start", guideSlug });
      playSegment(playbackId);
    },

    stop() {
      generation += 1;
      clearLineGap();
      speech.stop();
      finishIdle();
    },

    pause() {
      if (status !== "playing") return;
      if (lineGapTimer !== null) {
        clearTimeout(lineGapTimer);
        lineGapTimer = null;
        lineGapRemaining = Math.max(0, lineGapDueAt - Date.now());
      } else {
        speech.pause();
      }
      setStatus("paused");
    },

    resume() {
      if (status !== "paused") return;
      setStatus("playing");
      if (lineGapRemaining !== null) {
        const remaining = lineGapRemaining;
        lineGapRemaining = null;
        speech.resume();
        armLineGap(lineGapPlaybackId, remaining);
        return;
      }
      speech.resume();
    },

    getStatus() {
      return status;
    },

    destroy() {
      generation += 1;
      clearLineGap();
      speech.stop();
      clear();
      setStatus("idle");
    },
  };
}

/** Test helper: build segments the controller would speak, without DOM speech. */
export function planArticleSpeechSegments(
  map: ArticleTextMap,
  fromOffset = 0,
): ArticleSpeechSegment[] {
  return planSegmentsFromMap(map, fromOffset);
}
