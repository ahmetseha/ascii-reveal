# Contributing to AsciiReveal

Thank you for helping keep AsciiReveal small, reliable, and accessible. Version 1 has a deliberately narrow scope: scramble one final text value and progressively reveal it. Features such as image conversion, AI, timelines, page transitions, canvas, analytics, and unrelated animation primitives do not belong in this project.

## Prerequisites and setup

Use Node.js 22.22.2 or later, pnpm 11.18, and Git.

```sh
git clone https://github.com/ahmetseha/ascii-reveal.git
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
pnpm test:compat
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

Before the first release, create or claim the `@ascii-reveal` npm scope and add a granular npm access token with read/write access to that scope and 2FA bypass as the GitHub Actions secret `NPM_TOKEN`. The token is only needed to bootstrap packages that do not yet exist on npm; after the first release, configure `release.yml` as the trusted publisher for each package and remove the long-lived token. Keep branch protection enabled on `main` and allow the release workflow to write contents, pull requests, and OIDC identity tokens. Never commit npm or GitHub tokens.

After the first publish, open the settings for each public package on npm and add a GitHub Actions trusted publisher with these exact values:

- Organization or user: `ahmetseha`
- Repository: `ascii-reveal`
- Workflow filename: `release.yml`
- Allowed action: `npm publish`

Leave the environment field empty unless the workflow is later assigned to a protected GitHub environment. Once all three packages trust this workflow, remove the `NPM_TOKEN` secret; npm CLI uses the short-lived OIDC identity and generates provenance automatically.

Pushing a Changeset to `main` makes `changesets/action` open or update a release pull request. Review and merge that pull request; the next `main` run publishes versions not yet present on npm and creates GitHub releases. The workflow skips publishing when no package version is pending.
