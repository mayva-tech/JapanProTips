"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { usePathname } from "next/navigation";
import {
  AndrewHead,
  NanamiHead,
  useHeadTilt,
} from "@/features/japanese-learning/components/TalkingHead/TalkingHead";
import "@/features/japanese-learning/components/TalkingHead/talking-head.css";
import { useSpeechFace } from "@/features/japanese-learning/hooks/useSpeechFace";
import { speechService } from "@/features/japanese-learning/services/speechService";
import {
  createArticleSpeechController,
  type ArticleSpeechController,
} from "@/lib/guide-read-aloud/articleSpeechController";
import { buildArticleTextMap } from "@/lib/guide-read-aloud/articleTextMap";
import { emitGuideAudioBus } from "@/lib/guide-read-aloud/guideAudioBus";
import { getSelectionStartOffset } from "@/lib/guide-read-aloud/selectionOffset";
import { trackReadAloudEvent } from "@/lib/read-aloud-analytics";

const HEAD_POS_KEY = "japanprotips:talking-head-pos:v1";
const PAGE_READER_SLUG = "site-page-reader";
const TAP_MOVE_PX = 10;
/** Head shown before anything has been spoken on the page. */
const DEFAULT_LANG = "en";

type HeadPos = { x: number; y: number };

function loadHeadPos(): HeadPos | null {
  try {
    const raw = globalThis.localStorage?.getItem(HEAD_POS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<HeadPos>;
    if (typeof parsed.x === "number" && typeof parsed.y === "number") {
      return { x: parsed.x, y: parsed.y };
    }
  } catch {
    // private mode / quota
  }
  return null;
}

function saveHeadPos(pos: HeadPos) {
  try {
    globalThis.localStorage?.setItem(HEAD_POS_KEY, JSON.stringify(pos));
  } catch {
    // private mode / quota
  }
}

function clampHeadPos(x: number, y: number, el: HTMLElement): HeadPos {
  const { width, height } = el.getBoundingClientRect();
  const maxX = Math.max(4, window.innerWidth - width - 4);
  const maxY = Math.max(4, window.innerHeight - height - 4);
  return {
    x: Math.min(Math.max(4, x), maxX),
    y: Math.min(Math.max(4, y), maxY),
  };
}

function resolvePageRoot(): Element {
  return (
    document.querySelector("[data-guide-read-aloud-root]") ??
    document.querySelector("main") ??
    document.body
  );
}

/**
 * Global talking head. Always visible; like the Trainer, a single head flips
 * between Nanami (ja) and Andrew (en) as the spoken language changes.
 * Tap: read eligible page text top-down (or from the current text selection).
 * Tap again while speaking: stop. Drag to reposition.
 * Lip-sync uses the same speech-bus unit timings as karaoke.
 */
export function SiteTalkingHeads() {
  const pathname = usePathname();
  const { lang, viseme, speaking } = useSpeechFace();
  const tiltDeg = useHeadTilt(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<ArticleSpeechController | null>(null);
  const [pos, setPos] = useState<HeadPos | null>(() => loadHeadPos());
  const [dragging, setDragging] = useState(false);
  const [reading, setReading] = useState(false);
  const dragRef = useRef<{
    pointerId: number;
    offsetX: number;
    offsetY: number;
    startX: number;
    startY: number;
    moved: boolean;
  } | null>(null);

  const destroyController = useCallback(() => {
    controllerRef.current?.destroy();
    controllerRef.current = null;
    setReading(false);
  }, []);

  const stopReading = useCallback(
    (track: boolean) => {
      controllerRef.current?.stop();
      destroyController();
      speechService.stop();
      if (track) {
        trackReadAloudEvent("read_aloud_stop", {
          guideSlug: PAGE_READER_SLUG,
          provider: "browser_speech",
        });
      }
    },
    [destroyController],
  );

  const startReading = useCallback(() => {
    const root = resolvePageRoot();
    const map = buildArticleTextMap(root);
    const fromOffset = getSelectionStartOffset(root, map.slices) ?? 0;

    controllerRef.current?.destroy();
    const controller = createArticleSpeechController({
      root,
      guideSlug: PAGE_READER_SLUG,
      onStatus: (status) => {
        if (status === "idle") {
          setReading(false);
          controllerRef.current = null;
        }
      },
    });
    controllerRef.current = controller;
    setReading(true);
    emitGuideAudioBus({ type: "tts-start", guideSlug: PAGE_READER_SLUG });
    controller.start({ fromOffset });
    trackReadAloudEvent("read_aloud_play", {
      guideSlug: PAGE_READER_SLUG,
      provider: "browser_speech",
    });
  }, []);

  const onActivate = useCallback(() => {
    if (reading || speaking) {
      stopReading(true);
      return;
    }
    startReading();
  }, [reading, speaking, startReading, stopReading]);

  // Stop on route change / unmount.
  useEffect(() => {
    return () => {
      stopReading(false);
    };
  }, [pathname, stopReading]);

  useEffect(() => {
    const onLeave = () => stopReading(false);
    window.addEventListener("pagehide", onLeave);
    window.addEventListener("beforeunload", onLeave);
    return () => {
      window.removeEventListener("pagehide", onLeave);
      window.removeEventListener("beforeunload", onLeave);
    };
  }, [stopReading]);

  useEffect(() => {
    const onResize = () => {
      const el = rootRef.current;
      if (!el) return;
      setPos((prev) => {
        if (!prev) return prev;
        const clamped = clampHeadPos(prev.x, prev.y, el);
        saveHeadPos(clamped);
        return clamped;
      });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const start: HeadPos = pos ?? { x: rect.left, y: rect.top };
    if (!pos) setPos(start);
    dragRef.current = {
      pointerId: e.pointerId,
      offsetX: e.clientX - start.x,
      offsetY: e.clientY - start.y,
      startX: e.clientX,
      startY: e.clientY,
      moved: false,
    };
    el.setPointerCapture(e.pointerId);
    setDragging(true);
    e.preventDefault();
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const el = rootRef.current;
    if (!drag || drag.pointerId !== e.pointerId || !el) return;
    const dist = Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY);
    if (dist > TAP_MOVE_PX) drag.moved = true;
    if (!drag.moved) return;
    const next = clampHeadPos(
      e.clientX - drag.offsetX,
      e.clientY - drag.offsetY,
      el,
    );
    setPos(next);
  };

  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    const wasTap = !drag.moved;
    dragRef.current = null;
    setDragging(false);
    try {
      rootRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      // already released
    }
    setPos((prev) => {
      if (!prev) return prev;
      saveHeadPos(prev);
      return prev;
    });
    if (wasTap) onActivate();
  };

  // Trainer wiring: one head, chosen by the current (or last) speech language.
  const showNanami = (lang ?? DEFAULT_LANG) === "ja";
  const live = reading || speaking;

  return (
    <div
      ref={rootRef}
      data-site-talking-heads
      className={[
        "th-dock",
        "th-root",
        dragging ? "th-dragging" : "",
        pos ? "th-placed" : "",
        live ? "th-dock-live" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        pos
          ? { left: pos.x, top: pos.y, right: "auto", bottom: "auto" }
          : undefined
      }
      role="button"
      tabIndex={0}
      title={live ? "Tap to stop" : "Tap to read page"}
      aria-label={
        live
          ? "Stop page read-aloud"
          : "Read this page aloud. Select text first to start from there."
      }
      aria-pressed={live}
      aria-grabbed={dragging}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate();
        }
      }}
    >
      <div
        key={showNanami ? "ja" : "en"}
        className="th-dock-face th-dock-flip"
        aria-hidden
      >
        {showNanami ? (
          <NanamiHead
            viseme={viseme}
            blinking={false}
            speaking={speaking}
            tiltDeg={tiltDeg}
          />
        ) : (
          <AndrewHead
            viseme={viseme}
            blinking={false}
            speaking={speaking}
            tiltDeg={tiltDeg}
          />
        )}
      </div>
    </div>
  );
}
