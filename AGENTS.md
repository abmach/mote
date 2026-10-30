# mote

A tiny class-optional CSS framework: two source stylesheets plus their committed minified variants, zero dependencies, zero build step for consumers. GitLab canonical (`gitlab.com/abmach/mote`), mirrored to GitHub for display.

## Principles checklist

Every change, evaluation round, and release MUST satisfy these rules:

1. **Core semantic baseline** — `mote.css` remains complete and usable with zero classes. Semantic HTML stays the primary API; classes are opt-in conveniences.
2. **No automatic API growth** — evaluation findings may justify fixing existing behavior, but every new public class, helper, token, or behavior requires explicit user acceptance before implementation. A report, evaluation result, or apparent convenience is not approval.
3. **Platform first** — do not add a helper when native HTML or CSS expresses the behavior adequately. mote ships no JavaScript runtime.
4. **Measured size budget** — judge runtime weight by minified CSS, not repository, documentation, changelog, or npm package size. The committed minified budgets are 18,000 bytes for `mote.css` and 13,000 bytes for `mote.components.css`; exceeding either requires explicit acceptance.
5. **Behavioral test boundary** — permanent tests assert consumer-visible behavior, boundaries, invariants, transitions, precedence, and errors. Do not pin documentation prose, source text, exact incidental implementation, or copy-ready markup shape. Structural documentation checks such as the heading/link outline remain valid.
6. **Browser gate before release** — `tests/fixture.html` must show `PASS — N checks` in a foreground browser before any tag, so `document.hasFocus()` is true while focus-dependent assertions run. CI browser execution is recommended once a stable pinned runner is available, but it is not required for the current release process.
7. **No release on a red gate** — do not tag or publish while any required gate fails. Diagnose and fix the product or the gate, and classify environment-specific anomalies explicitly rather than ignoring them.

## Release

- npm package: mote.css (the bare `mote` name is a dead 2012 package; `.css` suffix follows the mvp.css/sakura.css/hint.css convention)
- mirror: github.com/abmach/mote
- package shape: css
- build needed in CI: no — source and minified CSS files ship exactly as committed
- version stamps: all four CSS variants carry `vX.Y.Z · MIT`; `minified-manifest.json`'s `packageVersion` must equal `package.json`'s version
- files whitelist notes: ships `mote.css`, `mote.min.css`, `mote.components.css`, `mote.components.min.css`, `README.md`, `LICENSE`, `CHANGELOG.md`; `docs/`, `tests/`, CI config, the manifest, and scripts stay out
- regression gate: `tests/fixture.html` must show all assertions green (page title = PASS) in a foreground browser before any tag, so `document.hasFocus()` is true while focus-dependent assertions run; headless alone is insufficient for the current fixture
- minifier gate: `scripts/minify.mjs` minifies the staged source blobs in one `bun x clean-css-cli@latest -O2` invocation, records the exact resolved `clean-css-cli` and `clean-css` versions in the manifest, enforces zero warnings, byte budgets, version stamps, and Baseline 2024 construct counts, then stages the generated artifacts; run `./scripts/install-hooks` after cloning, verify the active path with `git rev-parse --git-path hooks/pre-commit`, and commit the hook with mode `100755` (e.g. `git add --chmod=+x .githooks/pre-commit`)
- committed artifact check: `tests/minified-artifacts.cjs` verifies the committed outputs and manifest without invoking the moving latest minifier
- npm staging flow: after pushing tag `vX.Y.Z`, wait for the GitLab tag pipeline to stage the package, then review and approve it with `npm stage list`, `npm stage view <stage-id>`, `npm stage download <stage-id>`, and `npm stage approve <stage-id>` (approval requires the maintainer's 2FA); verify `npm view mote.css@X.Y.Z` and all four CDN URLs afterward
- CDN verify URLs:
  - `https://cdn.jsdelivr.net/npm/mote.css@X.Y.Z/mote.css`
  - `https://cdn.jsdelivr.net/npm/mote.css@X.Y.Z/mote.min.css`
  - `https://cdn.jsdelivr.net/npm/mote.css@X.Y.Z/mote.components.css`
  - `https://cdn.jsdelivr.net/npm/mote.css@X.Y.Z/mote.components.min.css`
