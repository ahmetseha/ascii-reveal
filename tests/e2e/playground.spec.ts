import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" || message.text().includes("Hydration")) {
      const location = message.location();
      errors.push(
        `[${message.type()}] ${message.text()} (${location.url}:${location.lineNumber})`,
      );
    }
  });
  await page.goto("/");
  await expect(page.locator("#preview")).toBeVisible();
  errors.length = 0;
  (page as typeof page & { __consoleErrors?: string[] }).__consoleErrors =
    errors;
});

test.afterEach(async ({ page }) => {
  expect(
    (page as typeof page & { __consoleErrors?: string[] }).__consoleErrors,
  ).toEqual([]);
});

test("hover and keyboard focus trigger the exact final text", async ({
  page,
}) => {
  await page.getByLabel("Duration (ms)").fill("0");
  await page.getByLabel("Trigger").selectOption("hover");
  await page.locator("#preview").hover();
  await expect(page.locator("#state")).toHaveText("complete");
  await expect(page.locator("#preview [aria-hidden=true]")).toHaveText(
    "BUILD SOMETHING MEMORABLE",
  );

  await page.getByLabel("Trigger").selectOption("focus");
  await page.locator("#preview").focus();
  await expect(page.locator("#state")).toHaveText("complete");
});

test("in-view triggers, replaying, and final text work", async ({ page }) => {
  await page.getByLabel("Duration (ms)").fill("0");
  await page.getByLabel("Trigger").selectOption("in-view");
  await expect(page.locator("#state")).toHaveText("complete");
  await page.getByRole("button", { name: "Reset" }).click();
  await expect(page.locator("#state")).toHaveText("idle");
  await page.getByRole("button", { name: "Replay" }).click();
  await expect(page.locator("#state")).toHaveText("complete");
  await expect(page.locator("#rendered")).toHaveText(
    "BUILD SOMETHING MEMORABLE",
  );
});

test("reduced motion renders the final text immediately", async ({
  browser,
}) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on(
    "console",
    (message) => message.type() === "error" && errors.push(message.text()),
  );
  await page.goto("/");
  await expect(page.locator("#state")).toHaveText("complete");
  await expect(page.locator("#preview [aria-hidden=true]")).toHaveText(
    "BUILD SOMETHING MEMORABLE",
  );
  expect(errors).toEqual([]);
  await context.close();
});

test("documentation homepage playground updates options and replays", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4174/examples");
  await expect(page.getByRole("heading", { name: "Examples" })).toBeVisible();
  await expect(page.locator("pre").first()).toContainText("createAsciiReveal");
  await page.goto("http://127.0.0.1:4174/");
  await expect(
    page.getByRole("heading", { name: "AsciiReveal", level: 1 }),
  ).toBeVisible();

  const demo = page.getByRole("button", {
    name: "ASCII reveal preview",
  });
  await expect(page.locator(".inline-preview-status")).toContainText(
    "complete",
  );
  await demo.click();
  await expect(page.locator(".inline-preview-status")).toContainText("playing");
  await expect(page.locator(".inline-preview-status")).toContainText(
    "complete",
  );

  await page.getByLabel("Text").fill("seha");
  await page
    .getByRole("group", { name: "Trigger" })
    .getByRole("button", { name: "manual" })
    .click();
  await demo.click();
  await expect(demo.locator("[aria-hidden=true]")).toHaveText("seha", {
    timeout: 3_000,
  });
  await expect(page.locator(".inline-code")).toContainText(
    '"trigger": "manual"',
  );
  await expect(page.locator(".inline-code")).toContainText(
    '"characters": "ascii"',
  );

  await page
    .getByRole("group", { name: "Characters" })
    .getByRole("button", { name: "Binary" })
    .click();
  await expect(page.locator(".inline-code")).toContainText(
    '"characters": "binary"',
  );
  await expect(page.locator(".inline-code")).not.toContainText(
    '"characters": "01"',
  );

  await page.getByRole("tab", { name: "React" }).click();
  await expect(page.locator(".inline-code")).toContainText(
    "@ascii-reveal/react",
  );
  await expect(page.locator(".inline-code")).toContainText(
    'characters="binary"',
  );
  await page.getByRole("tab", { name: "Vue" }).click();
  await expect(page.locator(".inline-code")).toContainText("@ascii-reveal/vue");
  await expect(page.locator(".inline-code")).toContainText(
    'characters="binary"',
  );
});
