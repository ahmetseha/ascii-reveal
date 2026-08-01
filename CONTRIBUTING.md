# Contributing to AsciiReveal

Thank you for helping keep AsciiReveal small, reliable, and accessible. Version 1 has a deliberately narrow scope: scramble one final text value and progressively reveal it. Features such as image conversion, AI, timelines, page transitions, canvas, analytics, and unrelated animation primitives do not belong in this project.

## Prerequisites and setup

Use Node.js 22.18 or later, pnpm 11.18, and Git.

```sh
git clone https://github.com/YOUR_GITHUB_ORG/ascii-reveal.git
cd ascii-reveal
pnpm install
pnpm dev
```

`packages/core` owns all frame generation and DOM animation behavior. `packages/react` and `packages/vue` are thin lifecycle adapters. `apps/playground` is the development harness, and `apps/docs` is the public VitePress documentation.

## Development checks

```sh
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test:unit
pnpm test:e2e
pnpm build
pnpm size
pnpm docs:build
pnpm check:exports
```

Tests should assert behavior and cleanup, not private implementation structure. Test keyboard and reduced-motion behavior for UI changes. Public API changes require documentation for core and both adapters where relevant.

## Changes and pull requests

Create a Changeset for every user-facing change:

```sh
pnpm changeset
```

Use focused commits with descriptive imperative messages. Pull requests should explain the problem, API effect, accessibility effect, and measured bundle-size effect; include tests and docs; and pass every CI check. Do not add a runtime dependency or duplicate core logic in an adapter. New features must preserve the package's one-problem scope.

Bug reports should use the issue form and include a minimal reproduction. Security reports must follow [SECURITY.md](SECURITY.md), not the public issue tracker.

Contributors are recognized in release notes and the repository history. Maintainers may also add recurring contributors to project acknowledgements with their consent.

## Maintainer release setup

Before the first release, replace the repository placeholders listed in `repo.config.ts`, package manifests, GitHub templates, and Changesets config; replace the CODEOWNERS maintainer and security email; create or claim the `@ascii-reveal` npm scope; and add an npm automation token as the GitHub Actions secret `NPM_TOKEN`. Keep branch protection enabled on `main` and allow the release workflow to write contents and pull requests. Never commit npm or GitHub tokens.

Pushing a Changeset to `main` makes `changesets/action` open or update a release pull request. Review and merge that pull request; the next `main` run publishes versions not yet present on npm and creates GitHub releases. The workflow skips publishing when no package version is pending.
