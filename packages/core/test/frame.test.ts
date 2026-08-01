import { describe, expect, it } from "vitest";
import { generateAsciiFrame } from "../src";
import { DEFAULT_CHARACTERS, segmentText } from "../src/frame";
import { resolveOptions } from "../src/options";

describe("generateAsciiFrame", () => {
  it("always returns the exact final text", () => {
    const text = "BUILDING\nCafé 👨‍👩‍👧‍👦";
    expect(generateAsciiFrame({ text, progress: 1 })).toBe(text);
  });

  it.each([
    ["left", "AB__"],
    ["right", "__CD"],
    ["center", "_BC_"],
  ] as const)("reveals in the %s direction", (direction, expected) => {
    expect(
      generateAsciiFrame({
        text: "ABCD",
        progress: 0.5,
        direction,
        characters: "_",
        seed: 1,
      }),
    ).toBe(expected);
  });

  it("uses a deterministic shuffled order for random reveals", () => {
    const options = {
      text: "DETERMINISTIC",
      progress: 0.45,
      direction: "random" as const,
      characters: "01",
      seed: 42,
    };
    expect(generateAsciiFrame(options)).toBe(generateAsciiFrame(options));
    expect(generateAsciiFrame({ ...options, seed: 43 })).not.toBe(
      generateAsciiFrame(options),
    );
  });

  it("preserves spaces, tabs, and new lines by default", () => {
    expect(
      generateAsciiFrame({ text: "A B\tC\nD", progress: 0, characters: "_" }),
    ).toBe("_ _\t_\n_");
  });

  it("optionally preserves punctuation", () => {
    expect(
      generateAsciiFrame({
        text: "GO, NOW!",
        progress: 0,
        characters: "_",
        preservePunctuation: true,
      }),
    ).toBe("__, ___!");
  });

  it("uses the actual text center when spaces are preserved", () => {
    expect(
      generateAsciiFrame({
        text: "A  BC",
        progress: 0.34,
        direction: "center",
        characters: "_",
      }),
    ).toBe("_  B_");
  });

  it("handles empty text and falls back from an empty character set", () => {
    expect(generateAsciiFrame({ text: "", progress: 0 })).toBe("");
    expect(
      generateAsciiFrame({ text: "A", progress: 0, characters: "", seed: 1 }),
    ).toMatch(
      new RegExp(`[${DEFAULT_CHARACTERS.replace(/[\\\]^]/g, "\\$&")}]`),
    );
  });

  it("segments surrogate pairs, emoji sequences, and combining marks safely when supported", () => {
    expect(segmentText("😀")).toEqual(["😀"]);
    if ("Segmenter" in Intl) {
      expect(segmentText("👨‍👩‍👧‍👦")).toEqual(["👨‍👩‍👧‍👦"]);
      expect(segmentText("e\u0301")).toEqual(["e\u0301"]);
    }
  });

  it("normalizes invalid numeric options without mutating the input", () => {
    const input = {
      text: "SAFE",
      duration: -1,
      delay: Number.NaN,
      fps: 0,
      characters: "",
    };
    const result = resolveOptions(input);
    expect(result).toMatchObject({
      duration: 700,
      delay: 0,
      fps: 1,
      characters: DEFAULT_CHARACTERS,
    });
    expect(input).toEqual({
      text: "SAFE",
      duration: -1,
      delay: Number.NaN,
      fps: 0,
      characters: "",
    });
  });
});
