import { describe, expect, it } from "vitest";
import {
  buildJapaneseSpeakText,
  buildJapaneseSpeakToken,
} from "./japaneseSpeakText";

describe("カード TTS", () => {
  it("speaks カード as カド/かど (ka-do), not かあど (ka-ado)", () => {
    expect(buildJapaneseSpeakText("カード")).toBe("カド");
    expect(buildJapaneseSpeakText("ICカード")).toBe("ICカド");
    expect(buildJapaneseSpeakText("ポイントカード")).toBe("ポイントカド");
    expect(buildJapaneseSpeakText("カード", "かーど")).toBe("かど");
    expect(buildJapaneseSpeakToken("カード")).toBe("かど");
    expect(buildJapaneseSpeakText("カード")).not.toMatch(/かあど|かーど|カード/);
  });
});
