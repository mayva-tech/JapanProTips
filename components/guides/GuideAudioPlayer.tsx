"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { trackReadAloudEvent } from "@/lib/read-aloud-analytics";

type GuideAudioPlayerProps = {
  guideSlug: string;
  basePath: string;
  parts: string[];
};

type AudioStatus = "idle" | "playing" | "paused";

export function GuideAudioPlayer({
  guideSlug,
  basePath,
  parts,
}: GuideAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [status, setStatus] = useState<AudioStatus>("idle");
  const partIndexRef = useRef(0);
  const statusRef = useRef<AudioStatus>("idle");
  const sessionRef = useRef(0);

  const playPart = useCallback((index: number, sessionId: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (sessionId !== sessionRef.current) return;

    const part = parts[index];
    if (!part) {
      statusRef.current = "idle";
      setStatus("idle");
      partIndexRef.current = 0;
      return;
    }

    const normalizedBase = basePath.replace(/\/$/, "");
    partIndexRef.current = index;
    audio.src = `${normalizedBase}/${part}`;
    void audio.play().then(() => {
      if (sessionId !== sessionRef.current) return;
      statusRef.current = "playing";
      setStatus("playing");
    }).catch(() => {
      statusRef.current = "idle";
      setStatus("idle");
      partIndexRef.current = 0;
    });
  }, [basePath, parts]);

  const stopWithoutTracking = useCallback(() => {
    const audio = audioRef.current;
    sessionRef.current += 1;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.removeAttribute("src");
      audio.load();
    }
    partIndexRef.current = 0;
    statusRef.current = "idle";
    setStatus("idle");
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onEnded = () => {
      if (statusRef.current !== "playing") return;
      const next = partIndexRef.current + 1;
      if (!parts[next]) {
        stopWithoutTracking();
        return;
      }
      playPart(next, sessionRef.current);
    };

    audio.addEventListener("ended", onEnded);
    return () => audio.removeEventListener("ended", onEnded);
  }, [parts, playPart, stopWithoutTracking]);

  useEffect(() => {
    const onLeave = () => stopWithoutTracking();
    window.addEventListener("pagehide", onLeave);
    window.addEventListener("beforeunload", onLeave);
    return () => {
      window.removeEventListener("pagehide", onLeave);
      window.removeEventListener("beforeunload", onLeave);
      stopWithoutTracking();
    };
  }, [stopWithoutTracking]);

  const play = () => {
    if (!parts.length || status !== "idle") return;
    sessionRef.current += 1;
    playPart(0, sessionRef.current);
    trackReadAloudEvent("read_aloud_play", {
      guideSlug,
      provider: "google_standard",
    });
  };

  const pause = () => {
    if (status !== "playing") return;
    audioRef.current?.pause();
    statusRef.current = "paused";
    setStatus("paused");
    trackReadAloudEvent("read_aloud_pause", {
      guideSlug,
      provider: "google_standard",
    });
  };

  const resume = () => {
    if (status !== "paused") return;
    void audioRef.current?.play().then(() => {
      statusRef.current = "playing";
      setStatus("playing");
    }).catch(() => {
      statusRef.current = "idle";
      setStatus("idle");
      partIndexRef.current = 0;
    });
    trackReadAloudEvent("read_aloud_resume", {
      guideSlug,
      provider: "google_standard",
    });
  };

  const stop = () => {
    if (status === "idle") return;
    stopWithoutTracking();
    trackReadAloudEvent("read_aloud_stop", {
      guideSlug,
      provider: "google_standard",
    });
  };

  if (!parts.length) return null;

  return (
    <section
      className="mb-6 max-w-2xl rounded-lg border border-paper-edge bg-paper/80 p-4 sm:p-5"
      aria-label="Listen to this guide"
    >
      <audio ref={audioRef} preload="none" />
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
            onClick={stop}
            disabled={status === "idle"}
            className="rounded-lg border border-maroon px-3.5 py-2 font-sans text-xs font-black uppercase tracking-widest text-maroon transition-colors hover:border-rust hover:text-rust focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust disabled:cursor-not-allowed disabled:border-tan disabled:text-muted"
          >
            Stop
          </button>
        </div>
      </div>
    </section>
  );
}
