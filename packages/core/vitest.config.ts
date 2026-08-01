import { defineProject } from "vitest/config";

export default defineProject({
  test: {
    name: "core",
    environment: "jsdom",
    include: ["test/**/*.test.ts"],
  },
});
