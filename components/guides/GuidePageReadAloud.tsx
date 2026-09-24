"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  createArticleSpeechController,
  type ArticleSpeechController,
  type ArticleSpeechStatus,
} from "@/lib/guide-read-aloud/articleSpeechController";
import { subscribeGuideAudioBus } from "@/lib/guide-read-aloud/guideAudioBus";
import { trackReadAloudEvent } from "@/lib/read-aloud-analytics";

type GuidePageReadAloudProps = {
  /** Optional override; defaults to the last path segment. */
  guideSlug?: string;
  /**
   * CSS selector for the article root that contains eligible prose.
   * Defaults to the nearest ancestor `[data-guide-read-aloud-root]`.
   */
  rootSelector?: string;
};

function canUseSpeechSynthesis() {
  return (
    typeof window !== "undefined" &&
    "speechSynthesis" in window &&
    "SpeechSynthesisUtterance" in window
  );
}

function resolveSlug(explicit: string | undefined, pathname: string) {
  if (explicit) return explicit;
  const parts = pathname.split("/").filter(Boolean);
  return parts[parts.length - 1] ?? "guide";
}

/**
 * Compact Read page ON/OFF control. Starts karaoke TTS over eligible article
 * text; OFF / unmount / route change stops speech and clears highlights.
 */
export function GuidePageReadAloud({
  guideSlug,
  rootSelector,
}: GuidePageReadAloudProps) {
  const pathname = usePathname();
  const slug = resolveSlug(guideSlug, pathname);
  const controlsId = useId();
  const [enabled, setEnabled] = useState(false);
  const [status, setStatus] = useState<ArticleSpeechStatus>("idle");
  const [unsupported, setUnsupported] = useState(false);
  const controllerRef = useRef<ArticleSpeechController | null>(null);
  const rootRef = useRef<Element | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const findRoot = useCallback((): Element | null => {
    if (rootSelector) {
      return document.querySelector(rootSelector);
    }
    return (
      wrapRef.current?.closest("[data-guide-read-aloud-root]") ??
      document.querySelector("[data-guide-read-aloud-root]")
    );
  }, [rootSelector]);

  const destroyController = useCallback(() => {
    controllerRef.current?.destroy();
    controllerRef.current = null;
  }, []);

  const ensureController = useCallback(() => {
    const root = findRoot();
    if (!root) return null;
    rootRef.current = root;
    if (controllerRef.current) return controllerRef.current;
    controllerRef.current = createArticleSpeechController({
      root,
      guideSlug: slug,
      onStatus: (next) => {
        setStatus(next);
        if (next === "idle") {
          setEnabled(false);
        }
      },
    });
    return controllerRef.current;
  }, [findRoot, slug]);

  const turnOff = useCallback(
    (track: boolean) => {
      setEnabled(false);
      controllerRef.current?.stop();
      destroyController();
      setStatus("idle");
      if (track) {
        trackReadAloudEvent("read_aloud_stop", {
          guideSlug: slug,
          provider: "browser_speech",
        });
      }
    },
    [destroyController, slug],
  );

  const turnOn = useCallback(() => {
    if (!canUseSpeechSynthesis()) {
      setUnsupported(true);
      return;
    }
    const controller = ensureController();
    if (!controller) return;
    setEnabled(true);
    controller.start();
    trackReadAloudEvent("read_aloud_play", {
      guideSlug: slug,
      provider: "browser_speech",
    });
  }, [ensureController, slug]);

  // Stop on route change / unmount.
  useEffect(() => {
    return () => {
      destroyController();
    };
  }, [destroyController, pathname]);

  useEffect(() => {
    if (!canUseSpeechSynthesis()) {
      setUnsupported(true);
    }
    const onLeave = () => turnOff(false);
    window.addEventListener("pagehide", onLeave);
    window.addEventListener("beforeunload", onLeave);
    return () => {
      window.removeEventListener("pagehide", onLeave);
      window.removeEventListener("beforeunload", onLeave);
      onLeave();
    };
  }, [turnOff]);

  // Prerecorded audio or the global page-reader dock wins: stop this control.
  useEffect(() => {
    return subscribeGuideAudioBus((event) => {
      if (event.type === "prerecorded-start" && event.guideSlug === slug) {
        turnOff(false);
      }
      if (event.type === "tts-start" && event.guideSlug !== slug) {
        turnOff(false);
      }
    });
  }, [slug, turnOff]);

  const onToggle = () => {
    if (enabled) {
      turnOff(true);
      return;
    }
    turnOn();
  };

  if (unsupported) {
    return (
      <div
        ref={wrapRef}
        data-guide-read-aloud-controls
        className="mb-4 max-w-2xl"
      >
        <p className="article-body-sm text-muted">
          Page read-aloud is not available in this browser.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={wrapRef}
      data-guide-read-aloud-controls
      className="mb-4 flex max-w-2xl flex-wrap items-center gap-3"
    >
      <button
        type="button"
        id={controlsId}
        role="switch"
        aria-checked={enabled}
        aria-label="Read page aloud"
        onClick={onToggle}
        className={
          enabled
            ? "rounded-lg bg-maroon px-3 py-1.5 font-sans text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-rust focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
            : "rounded-lg border border-maroon px-3 py-1.5 font-sans text-xs font-black uppercase tracking-widest text-maroon transition-colors hover:border-rust hover:text-rust focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
        }
      >
        Read page {enabled ? "ON" : "OFF"}
      </button>
      {enabled && status === "playing" ? (
        <button
          type="button"
          onClick={() => {
            controllerRef.current?.pause();
            trackReadAloudEvent("read_aloud_pause", {
              guideSlug: slug,
              provider: "browser_speech",
            });
          }}
          className="rounded-lg border border-maroon px-3 py-1.5 font-sans text-xs font-black uppercase tracking-widest text-maroon transition-colors hover:border-rust hover:text-rust focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
        >
          Pause
        </button>
      ) : null}
      {enabled && status === "paused" ? (
        <button
          type="button"
          onClick={() => {
            controllerRef.current?.resume();
            trackReadAloudEvent("read_aloud_resume", {
              guideSlug: slug,
              provider: "browser_speech",
            });
          }}
          className="rounded-lg border border-maroon px-3 py-1.5 font-sans text-xs font-black uppercase tracking-widest text-maroon transition-colors hover:border-rust hover:text-rust focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
        >
          Resume
        </button>
      ) : null}
      <p className="sr-only" aria-live="polite">
        Read page {enabled ? "on" : "off"}
        {enabled ? `, ${status}` : ""}
      </p>
    </div>
  );
}
