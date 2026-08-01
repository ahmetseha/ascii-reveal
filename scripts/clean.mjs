import { rm } from "node:fs/promises";

const paths = [
  ".turbo",
  "apps/docs/.turbo",
  "apps/docs/.vitepress",
  "apps/docs/docs/.vitepress/.temp",
  "apps/playground/.turbo",
  "coverage",
  "packages/core/.turbo",
  "packages/react/.turbo",
  "packages/vue/.turbo",
  "playwright-report",
  "test-results",
];
await Promise.all(
  paths.map((path) => rm(path, { force: true, recursive: true })),
);
