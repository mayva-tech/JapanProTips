/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { buildArticleTextMap } from "./articleTextMap";
import {
  clearDomHighlights,
  SPEECH_ACTIVE_CLASS,
  SPEECH_MARK_ATTR,
} from "./applyDomHighlight";
import {
  createArticleSpeechController,
  LINE_PAUSE_MS,
  type ArticleSpeechEngine,
} from "./articleSpeechController";
import {
  emitGuideAudioBus,
  subscribeGuideAudioBus,
} from "./guideAudioBus";
import type { SpeakCallbacks } from "@/features/japanese-learning/services/speechService";
import { buildEnglishSpeakText } from "@/features/japanese-learning/utils/englishSpeakText";

function createFakeSpeech() {
  let lastCallbacks: SpeakCallbacks | undefined;
  let paused = false;
  const speech: ArticleSpeechEngine = {
    speakEnglish: (_text, callbacks) => {
      lastCallbacks = callbacks;
      callbacks?.onStart?.();
      if (!paused) callbacks?.onBoundary?.({ start: 0, end: 5 });
    },
    speakJapanese: (_text, callbacks) => {
      lastCallbacks = callbacks;
      callbacks?.onStart?.();
      if (!paused) callbacks?.onBoundary?.({ start: 0, end: 2 });
    },
    stop: vi.fn(),
    pause: vi.fn(() => {
      paused = true;
    }),
    resume: vi.fn(() => {
      paused = false;
    }),
  };
  return {
    speech,
    getCallbacks: () => lastCallbacks,
    setPaused: (value: boolean) => {
      paused = value;
    },
    isPaused: () => paused,
  };
}

describe("articleTextMap + DOM highlight", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("maps displayed text nodes and skips controls, buttons, and ads", () => {
    document.body.innerHTML = `
      <article data-guide-read-aloud-root>
        <div data-guide-read-aloud-controls>Read page OFF</div>
        <p>Buy at the <a href="/x">駅</a> today.</p>
        <button type="button">Donate</button>
        <div data-guide-read-aloud-skip><p>Hotel deal ad</p></div>
        <nav>Home</nav>
      </article>
    `;
    const root = document.querySelector("[data-guide-read-aloud-root]")!;
    const map = buildArticleTextMap(root);
    expect(map.text).toContain("Buy at the");
    expect(map.text).toContain("駅");
    expect(map.text).toContain("today");
    expect(map.text).not.toContain("Donate");
    expect(map.text).not.toContain("Hotel deal");
    expect(map.text).not.toContain("Home");
    expect(map.text).not.toContain("Read page");
    expect(map.segments.some((s) => s.lang === "ja")).toBe(true);
    expect(map.segments.find((s) => s.text.includes("駅"))?.phraseLevel).toBe(
      true,
    );
  });
});

describe("guideAudioBus mutex", () => {
  it("notifies listeners when the other player starts", () => {
    const events: string[] = [];
    const unsub = subscribeGuideAudioBus((e) => events.push(e.type));
    emitGuideAudioBus({ type: "tts-start", guideSlug: "demo" });
    emitGuideAudioBus({ type: "prerecorded-start", guideSlug: "demo" });
    unsub();
    expect(events).toEqual(["tts-start", "prerecorded-start"]);
  });
});

describe("article speech controller", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("switches EN then JA segments and remaps highlight offsets", () => {
    document.body.innerHTML = `
      <article data-guide-read-aloud-root>
        <p>Hi 駅 ok</p>
      </article>
    `;
    const root = document.querySelector("[data-guide-read-aloud-root]")!;
    const fake = createFakeSpeech();
    const spokenLangs: string[] = [];
    const engine: ArticleSpeechEngine = {
      ...fake.speech,
      speakEnglish: (text, cb) => {
        spokenLangs.push("en");
        fake.speech.speakEnglish(text, cb);
        cb?.onEnd?.();
      },
      speakJapanese: (text, cb) => {
        spokenLangs.push("ja");
        expect(text).toContain("駅");
        fake.speech.speakJapanese(text, cb);
        expect(root.querySelector(`.${SPEECH_ACTIVE_CLASS}`)?.textContent).toBe(
          "駅",
        );
        cb?.onEnd?.();
      },
    };

    const controller = createArticleSpeechController({
      root,
      guideSlug: "demo",
      speech: engine,
    });
    controller.start();
    expect(spokenLangs[0]).toBe("en");
    expect(spokenLangs).toContain("ja");
    controller.destroy();
  });

  it("ignores boundaries while paused and resumes without clearing", () => {
    document.body.innerHTML = `
      <article data-guide-read-aloud-root>
        <p>Hello world today</p>
      </article>
    `;
    const root = document.querySelector("[data-guide-read-aloud-root]")!;
    const fake = createFakeSpeech();
    let boundary: SpeakCallbacks["onBoundary"];
    const engine: ArticleSpeechEngine = {
      ...fake.speech,
      speakEnglish: (_text, cb) => {
        boundary = cb?.onBoundary;
        cb?.onStart?.();
        cb?.onBoundary?.({ start: 0, end: 5 });
      },
    };
    const controller = createArticleSpeechController({
      root,
      guideSlug: "demo",
      speech: engine,
    });
    controller.start();
    expect(root.querySelector(`.${SPEECH_ACTIVE_CLASS}`)).toBeTruthy();
    controller.pause();
    expect(engine.pause).toHaveBeenCalled();
    boundary?.({ start: 6, end: 11 });
    // Still has a mark from before pause; pause must not advance via boundary.
    expect(controller.getStatus()).toBe("paused");
    controller.resume();
    expect(engine.resume).toHaveBeenCalled();
    expect(controller.getStatus()).toBe("playing");
    controller.destroy();
  });

  it("stop cancels playback and clears marks; stale boundaries are ignored", () => {
    document.body.innerHTML = `
      <article data-guide-read-aloud-root>
        <p>Short English sentence for tests.</p>
      </article>
    `;
    const root = document.querySelector("[data-guide-read-aloud-root]")!;
    const fake = createFakeSpeech();
    let retained: SpeakCallbacks | undefined;
    const engine: ArticleSpeechEngine = {
      ...fake.speech,
      speakEnglish: (_text, cb) => {
        retained = cb;
        cb?.onStart?.();
        cb?.onBoundary?.({ start: 0, end: 5 });
      },
    };
    const controller = createArticleSpeechController({
      root,
      guideSlug: "demo",
      speech: engine,
    });
    controller.start();
    expect(root.querySelector(`.${SPEECH_ACTIVE_CLASS}`)).toBeTruthy();
    controller.stop();
    expect(engine.stop).toHaveBeenCalled();
    expect(root.querySelector(`[${SPEECH_MARK_ATTR}]`)).toBeNull();
    retained?.onBoundary?.({ start: 6, end: 12 });
    expect(root.querySelector(`[${SPEECH_MARK_ATTR}]`)).toBeNull();
    clearDomHighlights(root);
    controller.destroy();
  });

  it("splits paragraphs, headings and list items into separate lines", () => {
    document.body.innerHTML = `
      <article data-guide-read-aloud-root>
        <h2>Title here</h2>
        <p>First <strong>para</strong> text.</p>
        <ul><li>One</li><li>Two 駅</li></ul>
      </article>
    `;
    const root = document.querySelector("[data-guide-read-aloud-root]")!;
    const segs = buildArticleTextMap(root).segments.map((s) => ({
      text: s.text.trim(),
      lineEnd: !!s.lineEnd,
    }));
    expect(segs).toEqual([
      { text: "Title here", lineEnd: true },
      { text: "First para text.", lineEnd: true },
      { text: "One", lineEnd: true },
      { text: "Two", lineEnd: false },
      { text: "駅", lineEnd: false },
    ]);
  });

  it("breaks a heading at <br> and at a colour change, but not at a coloured link", () => {
    document.body.innerHTML = `
      <article data-guide-read-aloud-root>
        <h1>START HERE<br /><span style="color: rgb(180, 90, 40)">PLAN YOUR TRIP</span></h1>
        <h2>Big <span style="color: rgb(180, 90, 40)">Accent</span></h2>
        <p>Read <a href="/x" style="color: rgb(180, 90, 40)">this guide</a> first.</p>
      </article>
    `;
    const root = document.querySelector("[data-guide-read-aloud-root]")!;
    const segs = buildArticleTextMap(root).segments.map((s) => ({
      text: s.text.trim(),
      lineEnd: !!s.lineEnd,
    }));
    expect(segs).toEqual([
      { text: "START HERE", lineEnd: true },
      { text: "PLAN YOUR TRIP", lineEnd: true },
      { text: "Big", lineEnd: true },
      { text: "Accent", lineEnd: true },
      { text: "Read this guide first.", lineEnd: false },
    ]);
  });

  it("speaks a leading list number as its own line", () => {
    document.body.innerHTML = `
      <article data-guide-read-aloud-root>
        <h3>1. SIM / Internet</h3>
        <p>Costs 1.5 times more.</p>
      </article>
    `;
    const root = document.querySelector("[data-guide-read-aloud-root]")!;
    const segs = buildArticleTextMap(root).segments.map((s) => ({
      text: s.text.trim(),
      lineEnd: !!s.lineEnd,
    }));
    expect(segs).toEqual([
      { text: "1.", lineEnd: true },
      { text: "SIM / Internet", lineEnd: true },
      { text: "Costs 1.5 times more.", lineEnd: false },
    ]);
    expect(buildEnglishSpeakText("1. ")).toBe("one");
    expect(buildEnglishSpeakText("12)")).toBe("twelve");
  });

  it("pauses between lines; pause/resume and stop respect the gap", () => {
    vi.useFakeTimers();
    try {
      document.body.innerHTML = `
        <article data-guide-read-aloud-root>
          <p>Line one.</p>
          <p>Line two.</p>
          <p>Line three.</p>
        </article>
      `;
      const root = document.querySelector("[data-guide-read-aloud-root]")!;
      const spoken: string[] = [];
      let end: (() => void) | undefined;
      const engine: ArticleSpeechEngine = {
        speakEnglish: (text, cb) => {
          spoken.push(text.trim());
          end = cb?.onEnd;
        },
        speakJapanese: vi.fn(),
        stop: vi.fn(),
        pause: vi.fn(),
        resume: vi.fn(),
      };
      const controller = createArticleSpeechController({
        root,
        guideSlug: "demo",
        speech: engine,
      });
      controller.start();
      expect(spoken).toEqual(["Line one."]);

      end?.();
      expect(spoken).toEqual(["Line one."]);
      vi.advanceTimersByTime(LINE_PAUSE_MS - 50);
      expect(spoken).toEqual(["Line one."]);

      controller.pause();
      vi.advanceTimersByTime(LINE_PAUSE_MS * 4);
      expect(spoken).toEqual(["Line one."]);
      controller.resume();
      vi.advanceTimersByTime(60);
      expect(spoken).toEqual(["Line one.", "Line two."]);

      end?.();
      controller.stop();
      vi.advanceTimersByTime(LINE_PAUSE_MS * 2);
      expect(spoken).toEqual(["Line one.", "Line two."]);
      controller.destroy();
    } finally {
      vi.useRealTimers();
    }
  });

  it("missing boundary events still phrase-highlight JA kanji on start", () => {
    document.body.innerHTML = `
      <article data-guide-read-aloud-root>
        <p>駅</p>
      </article>
    `;
    const root = document.querySelector("[data-guide-read-aloud-root]")!;
    const engine: ArticleSpeechEngine = {
      speakEnglish: vi.fn(),
      speakJapanese: (_text, cb) => {
        cb?.onStart?.();
        // No onBoundary — phrase-level must still light the kanji.
      },
      stop: vi.fn(),
      pause: vi.fn(),
      resume: vi.fn(),
    };
    const controller = createArticleSpeechController({
      root,
      guideSlug: "demo",
      speech: engine,
    });
    controller.start();
    expect(root.querySelector(`.${SPEECH_ACTIVE_CLASS}`)?.textContent).toBe("駅");
    controller.destroy();
  });
});
