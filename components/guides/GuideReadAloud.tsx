"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { trackReadAloudEvent } from "@/lib/read-aloud-analytics";

type ReadAloudStatus = "idle" | "playing" | "paused" | "unsupported";

type GuideReadAloudProps = {
  text: string;
  guideSlug: string;
};

const MAX_CHUNK_LENGTH = 240;

function canUseSpeechSynthesis() {
  return (
    typeof window !== "undefined" &&
    "speechSynthesis" in window &&
    "SpeechSynthesisUtterance" in window
  );
}

function splitLongTextByWords(text: string) {
  const chunks: string[] = [];
  const words = text.split(/\s+/);
  let current = "";

  for (const word of words) {
    const next = `${current} ${word}`.trim();
    if (next.length <= MAX_CHUNK_LENGTH) {
      current = next;
      continue;
    }

    if (current) chunks.push(current);
    current = word;
  }

  if (current) chunks.push(current);
  return chunks;
}

function pushSpeechChunk(chunks: string[], text: string) {
  if (text.length <= MAX_CHUNK_LENGTH) {
    chunks.push(text);
    return;
  }

  chunks.push(...splitLongTextByWords(text));
}

function splitSpeechText(text: string) {
  const chunks: string[] = [];
  const paragraphs = text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  for (const paragraph of paragraphs) {
    const sentences = paragraph.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [paragraph];
    let current = "";

    for (const sentence of sentences) {
      const nextSentence = sentence.trim();
      if (!nextSentence) continue;

      const nextChunk = `${current} ${nextSentence}`.trim();
      if (nextChunk.length <= MAX_CHUNK_LENGTH) {
        current = nextChunk;
        continue;
      }

      if (current) pushSpeechChunk(chunks, current);
      current = nextSentence;
    }

    if (current) pushSpeechChunk(chunks, current);
  }

  return chunks;
}

export function GuideReadAloud({ text, guideSlug }: GuideReadAloudProps) {
  const [status, setStatus] = useState<ReadAloudStatus>("idle");
  const chunksRef = useRef<string[]>([]);
  const chunkIndexRef = useRef(0);
  const playbackIdRef = useRef(0);

  const speakChunk = useCallback((playbackId: number) => {
    if (!canUseSpeechSynthesis()) {
      setStatus("unsupported");
      return;
    }

    if (playbackId !== playbackIdRef.current) return;

    const nextText = chunksRef.current[chunkIndexRef.current];
    if (!nextText) {
      setStatus("idle");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(nextText);
    utterance.lang = "en-US";
    utterance.rate = 0.95;

    utterance.onend = () => {
      if (playbackId !== playbackIdRef.current) return;

      chunkIndexRef.current += 1;
      speakChunk(playbackId);
    };

    utterance.onerror = () => {
      if (playbackId !== playbackIdRef.current) return;
      setStatus("idle");
    };

    window.speechSynthesis.speak(utterance);
  }, []);

  const stopSpeech = useCallback(
    (shouldTrack: boolean) => {
      playbackIdRef.current += 1;
      chunkIndexRef.current = 0;
      chunksRef.current = [];

      if (canUseSpeechSynthesis()) {
        window.speechSynthesis.cancel();
      }

      setStatus("idle");
      if (shouldTrack) {
        trackReadAloudEvent("read_aloud_stop", {
          guideSlug,
          provider: "browser_speech",
        });
      }
    },
    [guideSlug],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!canUseSpeechSynthesis()) {
      setStatus("unsupported");
    }

    const stopWithoutTracking = () => stopSpeech(false);
    window.addEventListener("pagehide", stopWithoutTracking);
    window.addEventListener("beforeunload", stopWithoutTracking);

    return () => {
      window.removeEventListener("pagehide", stopWithoutTracking);
      window.removeEventListener("beforeunload", stopWithoutTracking);
      stopWithoutTracking();
    };
  }, [stopSpeech]);

  const play = () => {
    if (!canUseSpeechSynthesis()) {
      setStatus("unsupported");
      return;
    }

    const chunks = splitSpeechText(text);
    if (!chunks.length) return;

    const playbackId = playbackIdRef.current + 1;
    playbackIdRef.current = playbackId;
    chunksRef.current = chunks;
    chunkIndexRef.current = 0;
    window.speechSynthesis.cancel();
    setStatus("playing");
    speakChunk(playbackId);
    trackReadAloudEvent("read_aloud_play", {
      guideSlug,
      provider: "browser_speech",
    });
  };

  const pause = () => {
    if (!canUseSpeechSynthesis() || status !== "playing") return;
    window.speechSynthesis.pause();
    setStatus("paused");
    trackReadAloudEvent("read_aloud_pause", {
      guideSlug,
      provider: "browser_speech",
    });
  };

  const resume = () => {
    if (!canUseSpeechSynthesis() || status !== "paused") return;
    window.speechSynthesis.resume();
    setStatus("playing");
    trackReadAloudEvent("read_aloud_resume", {
      guideSlug,
      provider: "browser_speech",
    });
  };

  if (status === "unsupported") {
    return (
      <p className="article-body-sm mb-6 max-w-2xl text-muted">
        Audio playback is not available in this browser.
      </p>
    );
  }

  return (
    <section
      className="mb-6 max-w-2xl rounded-lg border border-paper-edge bg-paper/80 p-4 sm:p-5"
      aria-label="Listen to this guide"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-sans text-base font-bold text-ink">
            Listen to this guide
          </h2>
          <p className="mt-1 font-serif text-sm text-muted">
            Useful if you prefer to listen while walking, commuting, or planning.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={play}
            disabled={status !== "idle"}
            className="rounded-lg bg-maroon px-3.5 py-2 font-sans text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-rust focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust disabled:cursor-not-allowed disabled:bg-tan"
          >
            Play
          </button>
          <button
            type="button"
            onClick={pause}
            disabled={status !== "playing"}
            className="rounded-lg border border-maroon px-3.5 py-2 font-sans text-xs font-black uppercase tracking-widest text-maroon transition-colors hover:border-rust hover:text-rust focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust disabled:cursor-not-allowed disabled:border-tan disabled:text-muted"
          >
            Pause
          </button>
          <button
            type="button"
            onClick={resume}
            disabled={status !== "paused"}
            className="rounded-lg border border-maroon px-3.5 py-2 font-sans text-xs font-black uppercase tracking-widest text-maroon transition-colors hover:border-rust hover:text-rust focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust disabled:cursor-not-allowed disabled:border-tan disabled:text-muted"
          >
            Resume
          </button>
          <button
            type="button"
            onClick={() => stopSpeech(true)}
            disabled={status === "idle"}
            className="rounded-lg border border-maroon px-3.5 py-2 font-sans text-xs font-black uppercase tracking-widest text-maroon transition-colors hover:border-rust hover:text-rust focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust disabled:cursor-not-allowed disabled:border-tan disabled:text-muted"
          >
            Stop
          </button>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        Read aloud status: {status}
      </p>
    </section>
  );
}
