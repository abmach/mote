# mote

A tiny class-optional CSS framework: two committed stylesheets, zero dependencies, zero build step. GitLab canonical (`gitlab.com/abmach/mote`), mirrored to GitHub for display.

## Principles checklist

Every change, evaluation round, and release MUST satisfy these rules:

1. **Core semantic baseline** — `mote.css` remains complete and usable with zero classes. Semantic HTML stays the primary API; classes are opt-in conveniences.
2. **No automatic API growth** — evaluation findings may justify fixing existing behavior, but every new public class, helper, token, or behavior requires explicit user acceptance before implementation. A report, evaluation result, or apparent convenience is not approval.
3. **Platform first** — do not add a helper when native HTML or CSS expresses the behavior adequately. mote ships no JavaScript runtime.
4. **Measured size budget** — judge runtime weight by minified CSS, not repository, documentation, changelog, or npm package size. Using clean-css 5.3.3 level 2, the budgets are 18,000 bytes for `mote.css` and 13,000 bytes for `mote.components.css`; exceeding either requires explicit acceptance.
5. **Behavioral test boundary** — permanent tests assert consumer-visible behavior, boundaries, invariants, transitions, precedence, and errors. Do not pin documentation prose, source text, exact incidental implementation, or copy-ready markup shape. Structural documentation checks such as the heading/link outline remain valid.
6. **Browser gate before release** — `tests/fixture.html` must show `PASS — N checks` in a foreground browser before any tag, so `document.hasFocus()` is true while focus-dependent assertions run. CI browser execution is recommended once a stable pinned runner is available, but it is not required for the current release process.
7. **No release on a red gate** — do not tag or publish while any required gate fails. Diagnose and fix the product or the gate, and classify environment-specific anomalies explicitly rather than ignoring them.

## Release

- npm package: mote.css (the bare `mote` name is a dead 2012 package; `.css` suffix follows the mvp.css/sakura.css/hint.css convention)
- mirror: github.com/abmach/mote
- package shape: css
- build needed in CI: no — both CSS files ship exactly as committed
- version stamps: `mote.css` and `mote.components.css` header stamps (vX.Y.Z · MIT)
- files whitelist notes: ships `mote.css`, `mote.components.css`, `README.md`, `LICENSE`, `CHANGELOG.md`; `docs/`, `tests/`, CI config stay out
- regression gate: `tests/fixture.html` must show all assertions green (page title = PASS) before any tag — any browser, headless is fine
- CDN minifier gate: both stylesheets must minify with clean-css 5.3.3 at level 2 with zero errors or warnings; the components file's Baseline 2024 `@starting-style` and `allow-discrete` rules use narrow `clean-css ignore` guards
- minifier test: `tests/minify.cjs`; budget regression: `tests/minify-budget.cjs`; CI installs `clean-css@5.3.3` into a temporary prefix and runs `NODE_PATH="$CI_PROJECT_DIR/.tmp/clean-css/node_modules" node tests/minify.cjs` followed by the budget regression
- CDN verify URLs:
  - `https://cdn.jsdelivr.net/npm/mote.css@X.Y.Z/mote.css`
  - `https://cdn.jsdelivr.net/npm/mote.css@X.Y.Z/mote.components.css`
  - auto-minified variants insert `.min` before the last extension: `mote.min.css` (not `mote.css.min.css`)
