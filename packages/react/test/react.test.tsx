import { StrictMode, createRef, type RefObject } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { AsciiRevealControls } from "@ascii-reveal/core";
import { AsciiReveal } from "../src";

afterEach(cleanup);

describe("AsciiReveal", () => {
  it("renders stable accessible text and forwards element attributes and refs", () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <AsciiReveal
        as="button"
        ref={ref}
        text="VIEW PROJECT"
        trigger="manual"
        className="demo"
        data-kind="reveal"
        aria-label="View the project"
      />,
    );
    expect(ref.current?.tagName).toBe("BUTTON");
    expect(ref.current?.classList.contains("demo")).toBe(true);
    expect(ref.current?.getAttribute("data-kind")).toBe("reveal");
    expect(ref.current?.getAttribute("aria-label")).toBe("View the project");
    expect(
      screen.getByText("VIEW PROJECT", { selector: "span:not([aria-hidden])" }),
    ).toBeTruthy();
  });

  it("supports mount, hover, focus, and manual controls", async () => {
    const mountComplete = vi.fn();
    const { rerender } = render(
      <AsciiReveal text="MOUNT" duration={0} onComplete={mountComplete} />,
    );
    expect(mountComplete).toHaveBeenCalled();

    rerender(
      <AsciiReveal as="button" text="HOVER" trigger="hover" duration={0} />,
    );
    fireEvent.pointerEnter(screen.getByRole("button"));
    expect(
      screen.getByRole("button").querySelector("[aria-hidden=true]")
        ?.textContent,
    ).toBe("HOVER");

    rerender(
      <AsciiReveal as="button" text="FOCUS" trigger="focus" duration={0} />,
    );
    fireEvent.focusIn(screen.getByRole("button"));
    expect(
      screen.getByRole("button").querySelector("[aria-hidden=true]")
        ?.textContent,
    ).toBe("FOCUS");

    const controls = createRef<AsciiRevealControls>();
    rerender(
      <AsciiReveal
        text="MANUAL"
        trigger="manual"
        duration={0}
        controlsRef={controls}
      />,
    );
    await controls.current?.play();
    expect(
      screen.getByText("MANUAL", { selector: "[aria-hidden=true]" }),
    ).toBeTruthy();
  });

  it("mounts and cleans up safely in strict mode", () => {
    const controls = createRef<AsciiRevealControls>();
    const view = render(
      <StrictMode>
        <AsciiReveal text="STRICT" trigger="manual" controlsRef={controls} />
      </StrictMode>,
    );
    expect(controls.current).not.toBeNull();
    expect(() => view.unmount()).not.toThrow();
    expect(
      (controls as RefObject<AsciiRevealControls | null>).current,
    ).toBeNull();
  });

  it("honors reduced motion", () => {
    vi.mocked(window.matchMedia).mockReturnValue({
      matches: true,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });
    render(<AsciiReveal text="NO MOTION" duration={5000} />);
    expect(
      screen.getByText("NO MOTION", { selector: "[aria-hidden=true]" }),
    ).toBeTruthy();
  });
});
