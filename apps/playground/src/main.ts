import { createAsciiReveal } from "@ascii-reveal/core";
import type {
  AsciiRevealControls,
  AsciiRevealDirection,
  AsciiRevealOptions,
  AsciiRevealTrigger,
} from "@ascii-reveal/core";
import "./style.css";

const DEFAULT_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*+-=?";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <header>
    <a class="wordmark" href="/" aria-label="AsciiReveal home"><img src="/mark.svg" alt="" /><span>AsciiReveal</span></a>
    <span class="environment"><i></i> playground / local</span>
    <a class="docs-link" href="/guide/getting-started">Docs <span>↗</span></a>
  </header>
  <section class="layout">
    <form id="controls" aria-label="Animation controls">
      <div class="controls-heading">
        <span>01 / Input</span>
        <h1>Shape the signal</h1>
        <p>Change any value. The preview and generated API call stay in sync.</p>
      </div>
      <label>Text<textarea name="text" rows="3">BUILD SOMETHING MEMORABLE</textarea></label>
      <label>Characters<input name="characters" value="${DEFAULT_CHARACTERS}" /></label>
      <div class="pair">
        <label>Duration (ms)<input name="duration" type="number" min="0" value="700" /></label>
        <label>FPS<input name="fps" type="number" min="1" value="30" /></label>
      </div>
      <div class="pair">
        <label>Trigger<select name="trigger">
          <option value="mount">mount</option><option value="hover">hover</option>
          <option value="focus">focus</option><option value="in-view">in-view</option>
          <option value="manual">manual</option>
        </select></label>
        <label>Direction<select name="direction">
          <option value="left">left</option><option value="right">right</option>
          <option value="center">center</option><option value="random">random</option>
        </select></label>
      </div>
      <label>Seed <input name="seed" type="number" value="42" /></label>
      <label class="check"><input name="preserveSpaces" type="checkbox" checked /> Preserve spaces</label>
      <label class="check"><input name="preservePunctuation" type="checkbox" /> Preserve punctuation</label>
      <label class="check"><input name="respectReducedMotion" type="checkbox" checked /> Respect reduced motion</label>
    </form>
    <div class="stage-column">
      <div class="stage-heading">
        <div><span>02 / Output</span><h2>Live preview</h2></div>
        <p>Click the message or use the controls below to replay the animation.</p>
      </div>
      <section class="stage" aria-labelledby="preview-title">
        <div class="stage-label"><span id="preview-title"><i></i> Live signal</span><span id="state">idle</span></div>
        <button id="preview" type="button"></button>
        <output id="rendered" aria-live="off"></output>
        <div class="actions">
          <button id="replay" type="button">Replay</button>
          <button id="reset" type="button">Reset</button>
          <button id="finish" type="button">Finish</button>
        </div>
      </section>
      <section class="code-panel">
        <div class="stage-label"><span>Generated code</span><button id="copy" type="button">Copy <span>↗</span></button></div>
        <pre><code id="code"></code></pre>
      </section>
      <section class="sizes">
        <div><span>03 / Footprint</span><h2>Current build metadata</h2></div>
        <div id="sizes"></div>
      </section>
    </div>
  </section>
`;

const form = document.querySelector<HTMLFormElement>("#controls")!;
const preview = document.querySelector<HTMLButtonElement>("#preview")!;
const rendered = document.querySelector<HTMLOutputElement>("#rendered")!;
const state = document.querySelector<HTMLSpanElement>("#state")!;
const code = document.querySelector<HTMLElement>("#code")!;
let controls: AsciiRevealControls | undefined;

const readOptions = (): AsciiRevealOptions => {
  const data = new FormData(form);
  const seed = String(data.get("seed") ?? "");
  return {
    text: String(data.get("text") ?? ""),
    characters: String(data.get("characters") ?? ""),
    duration: Number(data.get("duration")),
    fps: Number(data.get("fps")),
    trigger: String(data.get("trigger")) as AsciiRevealTrigger,
    direction: String(data.get("direction")) as AsciiRevealDirection,
    preserveSpaces: data.has("preserveSpaces"),
    preservePunctuation: data.has("preservePunctuation"),
    respectReducedMotion: data.has("respectReducedMotion"),
    seed: seed ? Number(seed) : undefined,
    onStart: () => {
      state.textContent = "playing";
    },
    onUpdate: (value) => {
      rendered.value = value;
    },
    onComplete: () => {
      state.textContent = "complete";
    },
  };
};

const codeFor = (
  options: AsciiRevealOptions,
) => `import { createAsciiReveal } from "@ascii-reveal/core";

const reveal = createAsciiReveal(element, ${JSON.stringify(
  {
    text: options.text,
    ...(options.characters === DEFAULT_CHARACTERS
      ? {}
      : { characters: options.characters }),
    duration: options.duration,
    fps: options.fps,
    trigger: options.trigger,
    direction: options.direction,
    preserveSpaces: options.preserveSpaces,
    preservePunctuation: options.preservePunctuation,
    seed: options.seed,
    respectReducedMotion: options.respectReducedMotion,
  },
  null,
  2,
)});`;

const initialize = () => {
  controls?.destroy();
  const options = readOptions();
  preview.textContent = options.text;
  state.textContent = "idle";
  controls = createAsciiReveal(preview, options);
  code.textContent = codeFor(options);
};

form.addEventListener("input", initialize);
document
  .querySelector("#replay")!
  .addEventListener("click", () => void controls?.play());
document.querySelector("#reset")!.addEventListener("click", () => {
  controls?.reset();
  state.textContent = "idle";
});
document.querySelector("#finish")!.addEventListener("click", () => {
  controls?.finish();
  state.textContent = "complete";
});
document.querySelector("#copy")!.addEventListener("click", async (event) => {
  await navigator.clipboard.writeText(code.textContent ?? "");
  (event.currentTarget as HTMLButtonElement).textContent = "Copied ✓";
});

const formatSize = (value: number | null) =>
  value === null ? "build required" : `${(value / 1000).toFixed(2)} kB gzip`;
document.querySelector("#sizes")!.innerHTML = Object.entries(__PACKAGE_SIZES__)
  .map(([name, value]) => `<span><b>${name}</b>${formatSize(value)}</span>`)
  .join("");

initialize();
