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

test("documentation examples load and the live example replays", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4174/examples");
  await expect(page.getByRole("heading", { name: "Examples" })).toBeVisible();
  await expect(page.locator("pre").first()).toContainText("createAsciiReveal");
  await page.goto("http://127.0.0.1:4174/");
  const demo = page.locator(".ascii-demo button");
  await expect(demo).toHaveAccessibleName("BUILD SOMETHING MEMORABLE");
  await demo.click();
  await expect(demo.locator("[aria-hidden=true]")).toHaveText(
    "BUILD SOMETHING MEMORABLE",
    {
      timeout: 3_000,
    },
  );
});
