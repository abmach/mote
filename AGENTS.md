# mote

A tiny classless CSS framework: two committed stylesheets, zero dependencies, zero build step. GitLab canonical (`gitlab.com/abmach/mote`), mirrored to GitHub for display.

## Release

- npm package: mote.css (the bare `mote` name is a dead 2012 package; `.css` suffix follows the mvp.css/sakura.css/hint.css convention)
- mirror: github.com/abmach/mote
- package shape: css
- build needed in CI: no — both CSS files ship exactly as committed
- version stamps: `mote.css` and `mote.components.css` header stamps (vX.Y.Z · MIT)
- files whitelist notes: ships `mote.css`, `mote.components.css`, `README.md`, `LICENSE`, `CHANGELOG.md`; `docs/`, `tests/`, CI config stay out
- regression gate: `tests/fixture.html` must show all assertions green (page title = PASS) before any tag — any browser, headless is fine
- CDN minifier gate: both stylesheets must minify with clean-css 5.3.3 at level 2 with zero errors or warnings; the components file's Baseline 2024 `@starting-style` and `allow-discrete` rules use narrow `clean-css ignore` guards
- minifier test: `tests/minify.cjs`; CI installs `clean-css@5.3.3` into a temporary prefix and runs `NODE_PATH="$CI_PROJECT_DIR/.tmp/clean-css/node_modules" node tests/minify.cjs`
- CDN verify URLs:
  - `https://cdn.jsdelivr.net/npm/mote.css@X.Y.Z/mote.css`
  - `https://cdn.jsdelivr.net/npm/mote.css@X.Y.Z/mote.components.css`
  - auto-minified variants insert `.min` before the last extension: `mote.min.css` (not `mote.css.min.css`)
