/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from "vitest";
import { planSegmentsFromMap, segmentsFromOffset } from "./selectionOffset";
import type { ArticleSpeechSegment, ArticleTextMap } from "./types";

describe("segmentsFromOffset", () => {
  const segments: ArticleSpeechSegment[] = [
    { lang: "en", text: "Hello ", articleStart: 0, phraseLevel: false },
    { lang: "ja", text: "駅", articleStart: 6, phraseLevel: true },
    { lang: "en", text: " today", articleStart: 7, phraseLevel: false },
  ];

  it("returns all segments from the top", () => {
    expect(segmentsFromOffset(segments, 0)).toEqual(segments);
  });

  it("skips fully-passed segments and trims the partial one", () => {
    const next = segmentsFromOffset(segments, 8);
    expect(next).toEqual([
      { lang: "en", text: "today", articleStart: 8, phraseLevel: false },
    ]);
  });

  it("starts at a later whole segment", () => {
    const next = segmentsFromOffset(segments, 6);
    expect(next.map((s) => s.text)).toEqual(["駅", " today"]);
  });
});

describe("planSegmentsFromMap", () => {
  it("filters empty and applies offset", () => {
    const map: ArticleTextMap = {
      text: "Hi 駅",
      slices: [],
      segments: [
        { lang: "en", text: "Hi ", articleStart: 0, phraseLevel: false },
        { lang: "ja", text: "駅", articleStart: 3, phraseLevel: true },
      ],
    };
    expect(planSegmentsFromMap(map, 3).map((s) => s.text)).toEqual(["駅"]);
  });
});
