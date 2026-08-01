import { existsSync, readFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));
const root = fileURLToPath(new URL("../..", import.meta.url));
const sizes = Object.fromEntries(
  ["core", "react", "vue"].map((name) => {
    const path = `${root}/packages/${name}/dist/index.js`;
    return [
      name,
      existsSync(path) ? gzipSync(readFileSync(path)).byteLength : null,
    ];
  }),
);

export default defineConfig({
  root: projectRoot,
  define: { __PACKAGE_SIZES__: JSON.stringify(sizes) },
  server: { fs: { allow: [root] } },
});
