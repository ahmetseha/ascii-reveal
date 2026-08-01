import { cleanup, fireEvent, render, waitFor } from "@testing-library/vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { defineComponent, h, nextTick, ref } from "vue";
import { AsciiReveal } from "../src";

afterEach(cleanup);

describe("AsciiReveal", () => {
  it("renders accessible text, a custom element, and forwarded attributes", () => {
    const view = render(AsciiReveal, {
      props: { text: "EXPLORE", as: "button", trigger: "manual" },
      attrs: { class: "demo", "data-kind": "reveal", "aria-label": "Explore" },
    });
    const button = view.getByRole("button");
    expect(button.classList.contains("demo")).toBe(true);
    expect(button.getAttribute("data-kind")).toBe("reveal");
    expect(button.querySelector("span:not([aria-hidden])")?.textContent).toBe(
      "EXPLORE",
    );
  });

  it("supports mount, hover, focus, and manual template-ref controls", async () => {
    const complete = vi.fn();
    render(AsciiReveal, {
      props: { text: "MOUNT", duration: 0, onComplete: complete },
    });
    await waitFor(() => expect(complete).toHaveBeenCalled());
    cleanup();

    const hover = render(AsciiReveal, {
      props: { text: "HOVER", as: "button", trigger: "hover", duration: 0 },
    });
    await nextTick();
    await fireEvent.pointerEnter(hover.getByRole("button"));
    expect(
      hover.getByRole("button").querySelector("[aria-hidden=true]")
        ?.textContent,
    ).toBe("HOVER");
    cleanup();

    const focus = render(AsciiReveal, {
      props: { text: "FOCUS", as: "button", trigger: "focus", duration: 0 },
    });
    await nextTick();
    await fireEvent.focusIn(focus.getByRole("button"));
    expect(
      focus.getByRole("button").querySelector("[aria-hidden=true]")
        ?.textContent,
    ).toBe("FOCUS");
    cleanup();

    const exposed = ref<{ play(): Promise<void> } | null>(null);
    const Host = defineComponent(
      () => () =>
        h(AsciiReveal, {
          ref: exposed,
          text: "MANUAL",
          trigger: "manual",
          duration: 0,
        }),
    );
    const manual = render(Host);
    await nextTick();
    await exposed.value?.play();
    expect(
      manual.container.querySelector("[aria-hidden=true]")?.textContent,
    ).toBe("MANUAL");
  });

  it("cleans up after unmount and honors reduced motion", () => {
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
    const view = render(AsciiReveal, {
      props: { text: "CALM", duration: 5000 },
    });
    expect(
      view.container.querySelector("[aria-hidden=true]")?.textContent,
    ).toBe("CALM");
    expect(() => view.unmount()).not.toThrow();
  });
});
