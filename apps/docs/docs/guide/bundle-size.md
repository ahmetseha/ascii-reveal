# Bundle size

CI runs `size-limit` against minified ESM builds with these gzip budgets:

| Package               | Budget | Excluded externals |
| --------------------- | -----: | ------------------ |
| `@ascii-reveal/core`  | 2.5 kB | none               |
| `@ascii-reveal/react` | 1.5 kB | React and core     |
| `@ascii-reveal/vue`   | 1.5 kB | Vue and core       |

These are enforced budgets, not claims about the eventual published tarball. Run `pnpm size` locally. Size limits may only change with explicit maintainer approval.
