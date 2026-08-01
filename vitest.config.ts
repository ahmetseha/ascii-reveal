import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary"],
      include: ["packages/*/src/**/*.{ts,tsx}"],
      exclude: ["**/*.test.*"],
    },
    projects: [
      "packages/core/vitest.config.ts",
      "packages/react/vitest.config.ts",
      "packages/vue/vitest.config.ts",
    ],
  },
});
