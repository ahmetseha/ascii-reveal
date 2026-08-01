import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createAsciiReveal } from "../src";

const callbacks: FrameRequestCallback[] = [];

beforeEach(() => {
  callbacks.length = 0;
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
    callbacks.push(callback);
    return callbacks.length;
  });
  vi.stubGlobal("cancelAnimationFrame", vi.fn());
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }),
  );
});

afterEach(() => vi.unstubAllGlobals());

const nextFrame = (time: number) => callbacks.shift()?.(time);

describe("createAsciiReveal", () => {
  it("resets, finishes, and keeps stable accessible text", () => {
    const element = document.createElement("span");
    const reveal = createAsciiReveal(element, {
      text: "READY",
      trigger: "manual",
      characters: "_",
    });
    expect(element.querySelector("[aria-hidden=true]")?.textContent).toBe(
      "_____",
    );
    expect(element.querySelector("span:not([aria-hidden])")?.textContent).toBe(
      "READY",
    );
    reveal.finish();
    expect(element.querySelector("[aria-hidden=true]")?.textContent).toBe(
      "READY",
    );
    reveal.reset();
    expect(element.querySelector("[aria-hidden=true]")?.textContent).toBe(
      "_____",
    );
  });

  it("returns one promise for simultaneous plays and reaches the exact text", async () => {
    const element = document.createElement("span");
    const start = performance.now();
    const reveal = createAsciiReveal(element, {
      text: "DONE",
      trigger: "manual",
      duration: 100,
      fps: 60,
    });
    const first = reveal.play();
    const second = reveal.play();
    expect(first).toBe(second);
    expect(reveal.isPlaying).toBe(true);
    nextFrame(start + 20);
    nextFrame(start + 200);
    await first;
    expect(reveal.isPlaying).toBe(false);
    expect(element.querySelector("[aria-hidden=true]")?.textContent).toBe(
      "DONE",
    );
  });

  it("supports finish while playing and resolves the play promise", async () => {
    const element = document.createElement("span");
    const complete = vi.fn();
    const reveal = createAsciiReveal(element, {
      text: "FINISH",
      trigger: "manual",
      onComplete: complete,
    });
    const playing = reveal.play();
    reveal.finish();
    await playing;
    expect(complete).toHaveBeenCalledOnce();
  });

  it("restores the original content and ignores calls after destroy", async () => {
    const element = document.createElement("span");
    element.textContent = "ORIGINAL";
    const reveal = createAsciiReveal(element, {
      text: "NEW",
      trigger: "manual",
    });
    reveal.destroy();
    expect(element.textContent).toBe("ORIGINAL");
    await expect(reveal.play()).resolves.toBeUndefined();
    reveal.reset();
    reveal.finish();
    reveal.update({ text: "IGNORED" });
    expect(element.textContent).toBe("ORIGINAL");
  });

  it("completes synchronously when reduced motion is requested", async () => {
    vi.mocked(matchMedia).mockReturnValue({
      matches: true,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });
    const element = document.createElement("span");
    const complete = vi.fn();
    const reveal = createAsciiReveal(element, {
      text: "CALM",
      trigger: "manual",
      onComplete: complete,
    });
    await reveal.play();
    expect(element.querySelector("[aria-hidden=true]")?.textContent).toBe(
      "CALM",
    );
    expect(complete).toHaveBeenCalledOnce();
  });

  it("does not replay completed animations when replay is false", async () => {
    const element = document.createElement("span");
    const start = vi.fn();
    const reveal = createAsciiReveal(element, {
      text: "ONCE",
      trigger: "manual",
      duration: 0,
      replay: false,
      onStart: start,
    });
    await reveal.play();
    await reveal.play();
    expect(start).toHaveBeenCalledOnce();
  });

  it("attaches hover and keyboard focus triggers without duplicate starts", () => {
    const element = document.createElement("button");
    const start = vi.fn();
    const reveal = createAsciiReveal(element, {
      text: "OPEN",
      trigger: "hover",
      replay: false,
      duration: 0,
      onStart: start,
    });
    element.dispatchEvent(new PointerEvent("pointerenter"));
    element.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
    expect(start).toHaveBeenCalledOnce();
    reveal.destroy();
    element.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
    expect(start).toHaveBeenCalledOnce();
  });
});
