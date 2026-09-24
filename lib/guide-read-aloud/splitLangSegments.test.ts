import { describe, expect, it } from "vitest";
import {
  japaneseNeedsPhraseLevelFallback,
  splitLangSegments,
} from "./splitLangSegments";

describe("splitLangSegments", () => {
  it("splits mixed EN/JA into language runs with UTF-16 offsets", () => {
    const text = "Buy an ICカード at the station.";
    const runs = splitLangSegments(text);
    expect(runs.map((r) => r.lang)).toEqual(["en", "ja", "en"]);
    expect(runs[0]?.text).toContain("Buy an");
    expect(runs[1]?.text).toBe("カード");
    expect(runs[2]?.text).toContain("at the station");
    expect(runs[1]?.start).toBe(runs[0]!.end);
    expect(runs[2]?.start).toBe(runs[1]!.end);
  });

  it("keeps pure English as one EN segment", () => {
    const runs = splitLangSegments("Suica and PASMO work the same.");
    expect(runs).toHaveLength(1);
    expect(runs[0]?.lang).toBe("en");
  });

  it("keeps pure Japanese as one JA segment", () => {
    const runs = splitLangSegments("すみません");
    expect(runs).toHaveLength(1);
    expect(runs[0]?.lang).toBe("ja");
    expect(japaneseNeedsPhraseLevelFallback("すみません")).toBe(false);
  });

  it("flags kanji JA for phrase-level fallback", () => {
    expect(japaneseNeedsPhraseLevelFallback("駅")).toBe(true);
    expect(japaneseNeedsPhraseLevelFallback("ICカード")).toBe(true);
    expect(japaneseNeedsPhraseLevelFallback("カード")).toBe(true);
    expect(japaneseNeedsPhraseLevelFallback("こんにちは")).toBe(false);
  });
});
