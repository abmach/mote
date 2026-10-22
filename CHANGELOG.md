# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.7.0] - 2026-10-21

### Changed

- **Badges are gated** (same as buttons): a plain `.mote-badge` is always
  accent-tinted; a status class on the badge itself provides the tint —
  never inherited from context. Closes the "tag chips silently re-tint
  inside themed cards" surprise from four evaluation rounds.
  Two-tier principle: **content surfaces follow context; content markers
  and actions declare their own status.**

### Fixed

- `.mote-table-scroll` sticky-header borders: Chromium paints collapsed
  borders at the original flow position, not with the sticky cell —
  switched to `border-collapse: separate; border-spacing: 0` inside the
  wrapper.
- `.mote-table-scroll` clips rows in print: `max-height: none;
  overflow: visible` added to the `@media print` block.
- Bare `<pre>` without `<code>` now gets the mono stack and 0.875rem size.
- `.mote-btn` now reads `var(--mote-control-pad, …)` instead of hardcoded
  `0.5rem 1.1rem` — density overrides reach all buttons uniformly.
- Form controls (input/select/textarea) now read the same density tokens
  as buttons: `var(--mote-control-pad, …) var(--mote-control-pad-inline, …)`.
- `.mote-stack` now stretches `progress` and `meter` alongside fields.
- `.mote-doc > aside` resets to `position: static` under 50rem (was
  staying sticky while the nav went static — clipped scroll region on mobile).
- `.mote-table-scroll` max-height tokenized: `var(--mote-table-max, 60vh)`.
- Badge links get a hover state: `filter: brightness(0.92)`.
- Docs: theme-toggle snippet now 3-state (auto→light→dark) matching the
  working demo; Patterns error-page uses `.mote-hero`; docs' own header
  uses `.mote-row`/`.mote-push` instead of inline styles.

### Added

- `.mote-hero`: vertically centers content in the remaining viewport
  height — for error pages, login screens, empty states. Uses
  `--mote-hero-offset` (default 12rem) to account for header/footer.
- `.mote-card-media`: flush-top cover images for cards — negative margins,
  clipped overflow, radius matched to the card, all in one class. Replaces
  the 5-line page recipe that broke card corners.
- `.mote-brand`: quiet wordmark link for site headers — `font-weight: 700`,
  fg color, no underline.
- `.mote-num`: right-aligned tabular figures for data table columns.

### Changed (evaluation)

- Fourth ten-app evaluation completed against v0.6.1; all round-3 fixes
  verified holding. Round-4 findings addressed in this minor release.

### Fixed

- `.mote-print-only` now actually displays in print (the unconditional
  `display: none` was after the print block at equal specificity —
  scoped to `@media not print` and moved before it).
- `.mote-stack` no longer stretches `.mote-sr-only` inputs to 100%
  width (hidden file inputs were creating invisible horizontal scroll).
- `.mote-doc > main` now uses `overflow-x: auto` (was `clip`, which
  made wide tables invisible rather than scrollable).
- `.mote-theme-switch` shipped in mote.css: disables transitions during
  `data-theme` flips so Chromium doesn't wedge elements at stale colors
  (custom-property changes don't restart CSS transitions). The docs'
  toggle snippet now includes it; the demo uses it.
- `.mote-doc > aside` gets the same sticky treatment as the nav rail
  (top, max-height, overflow) — TOCs and aside content no longer scroll
  out of view.
- Nav rail `max-height` accounts for `--mote-rail-top` (was
  `calc(100svh - 2rem)` regardless of header height).
- Rail heading treatment (small uppercase labels) now applies to
  `.mote-doc > aside` and `nav[aria-label="toc"]` headings too.
- `legend` gets `font-weight: 600` so the group caption reads stronger
  than the field labels inside it.

### Added

- `tabular-nums` on all `td` — figures align in data tables without
  any page CSS (invisible on non-numeric content).
- `.mote-table-scroll`: scrollable table wrapper with sticky `thead`,
  no margin jump on scroll start, and no page-level horizontal scroll.
- `.mote-grid-sparse`: auto-fit variant that collapses empty grid
  tracks (footers, short card rows).
- `--mote-control-pad` / `--mote-control-pad-inline` and
  `--mote-cell-pad` / `--mote-cell-pad-inline` density tokens.
- Docs: toggle snippet includes the theme-switch workaround; Chromium
  note references the shipped class.

### Changed

- Third ten-app evaluation completed against v0.6.0; all round-2 fixes
  verified holding. Round-3 findings addressed in this patch release.

### Fixed

- Pagination `<span>` current page: the pill box (display, min-width,
  padding) now targets `[aria-current="page"]` as well as `<a>` — the
  docs-recommended span form renders correctly (was a 6.5px sliver).
- Pagination: `flex-wrap: wrap` on the link row — 10 pills at 390px
  no longer scroll the page horizontally.
- Anchor ghosts: `.mote-ghost` now carries its own padding, border-radius,
  text-decoration:none and cursor:pointer — `<a class="mote-ghost">`
  renders as a proper pill (was an underlined unpadded rectangle).
- Badge links: `a.mote-badge` no longer underlines; `user-select: none`
  dropped from badges so version numbers and tags can be copied.
- `.mote-display` reads `--mote-status` — themed pages (error, warning)
  tint their giant display text automatically.
- Default `--mote-rail-top` is now 4.75rem when `body > header` exists
  (the sticky rail clears the sticky header without manual overrides).
- `.mote-doc > main` gets `overflow-x: clip` — wide tables truly scroll
  inside main, never the page.
- Sticky header: default `padding-block: 0.7rem` — content no longer hugs
  the border.
- `.mote-row` zeroes heading margins inside the row — version headers
  and card titles no longer balloon the flex context.
- Checkbox/radio `width: 1em` hardened against page-level
  `width: 100%` rules.

### Added

- `.mote-btn`: solid button recipe on any element (anchors, spans) —
  the full solid chrome including gated status classes; hero CTAs and
  pricing links no longer need page CSS.
- `.mote-media`: media object (avatar/icon beside body) — flex row,
  last child grows; forum posts, comments, chat.
- `nav[aria-label="toc"]`: semantic table-of-contents pattern (mirrors
  breadcrumbs and pagination) — right-rail asides, "On this page" nav.
- `.mote-no-print` / `.mote-print-only`: opt-in print visibility helpers.
- `aria-invalid="true"` styled alongside `:user-invalid` — programmatic
  validation states (server-side, failed-save) without waiting for user
  interaction.
- Rail headings: `.mote-doc > nav :is(h2, h3)` at label scale —
  grouped sidebar navigation without page CSS.
- `.mote-card` reads `--mote-status` for its border — featured/emphasized
  cards from one status class.
- Docs recipes: card flush-media, numeric table columns with sticky
  headers, sparse grids (auto-fit), canonical search form.
- `.mote-stack` opt-in class: stretches form fields to 100% while
  keeping checkboxes/radios at native 1em — no page CSS needed.
- `--mote-container-max` token (default 70rem): narrow the reading
  measure for long-form pages without new classes.
- Spinner sized in em (1.25em, 0.15em border) — scales with context
  (buttons, table rows, loading text).
- Docs: display text section with error-code example and status tinting;
  `--mote-avatar` sizing variable documented; `--mote-grid-min` density
  variable documented; `[role="alert"]`/`[role="status"]` semantic
  feedback helpers documented; safe stacked-form recipe and `.mote-stack`;
  Chromium theme-toggle transition workaround.

### Changed

- Second ten-app evaluation completed against v0.5.1; all round-1 fixes
  verified holding. Round-2 findings addressed in this release.

### Fixed

- Pagination: the current page (`aria-current`) kept its pill state on
  hover — previously the generic link hover overrode the accent pill,
  making "you are here" indistinguishable from hovering any other page.
  The current page now deepens on hover (same accent-mix pattern as solid
  buttons); non-current links keep the soft-tint hover. Docs recommend a
  `<span>` for the current page (you are already there — not a link).

### Added

- Logo: a cinematic photograph of a single dust mote floating in warm
  golden sunbeams (docs/img/mote-logo.jpg), integrated into the docs hero.
- Repositioned from "classless" to "class-optional" throughout — more
  honest now that the library ships ~25 opt-in classes for statuses,
  components, helpers, and layout. The core promise is unchanged:
  zero classes required, semantic elements are the default.
- Pagination documentation: code sample and live example in the Layout
  section, alongside the breadcrumbs it mirrors.

## [0.5.0] - 2026-10-20

### Added

- Semantic buttons: solid buttons take a status class (`.mote-success`,
  `.mote-warning`, `.mote-error`, `.mote-info`, `.mote-muted`) — gated, so
  the class must be on the button itself. Themed sections (error notes,
  toasts, page-level status) never recolor the actions inside them; the
  intent of an action is declared at the action site. Text color on
  semantic solids is `--mote-on-status` (set by the status classes to the
  page color, AA-verified in both themes).
- Ghost buttons (`.mote-ghost`): transparent fill, status-tinted border
  and text. Gated like solids — the status class on the element itself
  provides the tint, never the surrounding context.
- `.mote-default` and `.mote-reset`: control status inheritance for
  the non-gated consumers (badges, notes, spinners, …). Default forces the
  accent down the tree; reset clears the inherited status so each
  element's own classes decide.
- `.mote-row` + `.mote-push`: flex row helper + right-align helper —
  for headers, footers, toolbars, chip lists, form rows.
- `.mote-display` + `--mote-display` token: opt-in display/hero scale.
- `--mote-grid-min` variable on `.mote-grid`: density without a class API.
- `.mote-sr-only`: visually-hidden helper; doubles as a skip link when
  focused.
- Semantic pagination: `nav[aria-label="pagination"]` — flex row of
  pills with `aria-current` state, no class (mirrors breadcrumbs).
- Footer baseline: `body > footer` gets a top border and block padding
  (the quiet sibling of the site header).
- `.mote-card` is now `display: flex; flex-direction: column` —
  CTA-in-bottom-of-card aligns with `margin-block-start: auto` for free.
- Theme-aware hover deepening for buttons: `color-mix(accent/status,
  fg 14%)` — darkens in light themes, brightens in dark ones.

### Changed

- Docs: buttons and statuses section (gating rationale, ghost inheritance),
  `.mote-default`/`.mote-reset` guidance, new component table entries.

### Fixed

Layout shell (`mote.components.css`), from the ten-app evaluation:
- `.mote-doc` mobile: nav/main/aside overlapped in one grid cell — the
  collapse media query now resets `grid-row: auto`.
- `.mote-doc` blowout on wide content: content tracks are `minmax(0, 1fr)`
  (+ `min-width: 0` on items); a wide table scrolls inside `main`, never the page.
- Rail nav no longer renders as the horizontal pill row: pill styles scoped
  to `body > header nav`; rails get a quiet vertical list with
  `aria-current` states.
 Sticky rails and anchored content clear the site header via
  `--mote-rail-top` (token) and automatic `scroll-padding` when
  `body > header` exists. `body.mote-doc` gains page gutters.

Core (`mote.css`):
- `:user-invalid` kept its error border through hover and focus
  (`:is(input, select, textarea):user-invalid`, placed to win the cascade) —
  previously the field the user must fix showed the accent focus border.
- `--mote-accent-deep` now brightens in dark mode (`color-mix(accent,
  white 14%)`); dark hovers, badges and notes no longer dim.
- `input[type="range"]` stripped of text-input chrome; `select[multiple]`
  restored to native listbox appearance.
- `[role="status"]` / `[role="alert"]` read `--mote-status` (semantic
  colors as fallback) instead of hard-coding.
- `.mote-note` gains block margin; `.mote-badge` line-height tamed in
  headings; `blockquote` code no longer italic; `.mote-card` first/last-child
  rules moved into `:where()` so page classes win; dialogs get
  `max-width: min(90vw, 44rem)`; `.mote-avatar` sized by
  `--mote-avatar` token; `.mote-skeleton` gets intrinsic size.
- Print: the light palette is forced on paper — dark fills (zebra, notes,
  open details) no longer print as near-black bands.
- Focus rings no longer fade in (box-shadow removed from transitions).

Components:
- Popovers and dialogs now animate on exit, not just entrance
  (closed-state deltas for the `allow-discrete` transitions).
- `details[name]` content padding fixed for multiple children
  (was padding every child; now only the last).
- Toasts documented with `popover="manual"` (auto popovers light-dismiss);
  samples corrected.

### Changed

- README and docs CDN snippets use `mote.css@0` (range pin) so they never go
  stale; exact-version pinning documented for reproducible builds.
- Docs: wide-table wrapper recipe, form-width guidance, document-shell
  real-page notes (gutters, rail-top token), print caveats for exclusive
  accordions, toast stacking guidance; section numbering fixed.

## [0.4.0] - 2026-10-20

### Fixed

Layout shell (`mote.components.css`), from the ten-app evaluation:
- `.mote-doc` mobile: nav/main/aside overlapped in one grid cell — the
  collapse media query now resets `grid-row: auto`.
- `.mote-doc` blowout on wide content: content tracks are `minmax(0, 1fr)`
  (+ `min-width: 0` on items); a wide table scrolls inside `main`, never the page.
- Rail nav no longer renders as the horizontal pill row: pill styles scoped
  to `body > header nav`; rails get a quiet vertical list with
  `aria-current` states.
 Sticky rails and anchored content clear the site header via
  `--mote-rail-top` (token) and automatic `scroll-padding` when
  `body > header` exists. `body.mote-doc` gains page gutters.

Core (`mote.css`):
- `:user-invalid` kept its error border through hover and focus
  (`:is(input, select, textarea):user-invalid`, placed to win the cascade) —
  previously the field the user must fix showed the accent focus border.
- `--mote-accent-deep` now brightens in dark mode (`color-mix(accent,
  white 14%)`); dark hovers, badges and notes no longer dim.
- `input[type="range"]` stripped of text-input chrome; `select[multiple]`
  restored to native listbox appearance.
- `[role="status"]` / `[role="alert"]` read `--mote-status` (semantic
  colors as fallback) instead of hard-coding.
- `.mote-note` gains block margin; `.mote-badge` line-height tamed in
  headings; `blockquote` code no longer italic; `.mote-card` first/last-child
  rules moved into `:where()` so page classes win; dialogs get
  `max-width: min(90vw, 44rem)`; `.mote-avatar` sized by
  `--mote-avatar` token; `.mote-skeleton` gets intrinsic size.
- Print: the light palette is forced on paper — dark fills (zebra, notes,
  open details) no longer print as near-black bands.
- Focus rings no longer fade in (box-shadow removed from transitions).

Components:
- Popovers and dialogs now animate on exit, not just entrance
  (closed-state deltas for the `allow-discrete` transitions).
- `details[name]` content padding fixed for multiple children
  (was padding every child; now only the last).
- Toasts documented with `popover="manual"` (auto popovers light-dismiss);
  samples corrected.

### Changed

- README and docs CDN snippets use `mote.css@0` (range pin) so they never go
  stale; exact-version pinning documented for reproducible builds.
- Docs: wide-table wrapper recipe, form-width guidance, document-shell
  real-page notes (gutters, rail-top token), print caveats for exclusive
  accordions, toast stacking guidance; section numbering fixed.

## [0.3.0] - 2026-10-19

### Added

- Layout module in `mote.components.css`:
  - `.mote-doc` document shell — opt in with one class on `<body>` and the
    landmarks become the layout via `:has()`: sticky left rail for `nav`,
    right rail for `aside`, `main` flexing between them, footer pinned to the
    viewport bottom on short pages (body-scoped `min-height: 100svh`),
    everything collapsing to a single column under 50rem. No classes on the
    landmarks; `:where()` keeps every rule overridable.
  - `.mote-grid` card grid — auto-fill columns computed from the container;
    no breakpoints, no column utilities.
- Classless page shell: `body > header` and its nav are styled from landmarks
  alone (sticky translucent bar + nav pills). `.mote-header` / `.mote-nav`
  remain for the one case landmarks cannot express — shells wrapped in a
  `<div>`.

### Changed

- Documentation restructured: every element documented exactly once, with all
  its status variants in place; the Status classes section is now the token
  contract plus a consumer map. Complete status coverage (including muted)
  across notes, badges, toasts, blockquotes, progress, meters, spinners and
  summary markers.

## [0.2.1] - 2026-10-16

### Fixed

- README: correct minified CDN URL — jsDelivr publishes the minified variant
  of a dotted filename as `mote.min.css`, not `mote.css.min.css` (verified live).

### Changed

- Release CI moved to GitLab CI (`.gitlab-ci.yml`): tag-triggered `npm stage
  publish` with OIDC trusted publishing — no tokens anywhere; a maintainer
  still approves every release with 2FA. The GitHub mirror is distribution-only.
- Provenance-ready: trusted publishing is configured and the source repository
  is public; whether attestations survive the staged-approval flow gets proven
  by the pipeline's `--provenance` flag at the next release.
- Package metadata points to the canonical GitLab source; GitHub remains the
  distribution mirror.

## [0.2.0] - 2026-10-15

### Added

- Documentation completeness pass: every documented item now has a working
  live example and its code sample; all status variations are shown —
  notes and toasts in all four statuses, spinner status variants,
  status-tinted blockquote rule and summary marker, plus a live
  token-cascade demo (a card re-themed by two inline variables).
- `mote.components.css`: opt-in, CSS-only components — cards, badges, avatars,
  skeleton, spinner, sticky header, nav pills, breadcrumbs (semantic selector),
  popover tooltips/menus/toasts, exclusive `<details name>` accordions, and
  popover/dialog entrance animations via `@starting-style` + `allow-discrete`.
- Status classes (`mote-success`, `mote-warning`, `mote-error`, `mote-info`,
  `mote-muted`) as pure `--mote-status` / `--mote-status-soft` token assignments,
  consumed by notes, badges and toasts with accent fallback — one override re-skins
  every status surface; inline `--mote-status` works too.
- Live documentation page at `docs/index.html`.
- Anchored popover placement via CSS anchor positioning (Chrome 125+,
  Safari 26+): inline `anchor-name` + `position-anchor` places a popover
  below its trigger with viewport flip; centered fallback elsewhere.
- Accordion open/close animation in Chromium via `details::details-content`
  + `interpolate-size` (gated on support; instant toggle elsewhere).
- Status-token consumption extended to blockquote rules, `progress`/`meter`,
  spinners and `summary` markers.

### Fixed

- Accordion end-of-transition snap: content margins do not interpolate, so
  the animated `details::details-content` height target differed from the
  settled layout by exactly the content's bottom margin (16px jump on open).
  The animated box is now kept flush (child margins zeroed inside the
  `@supports` gate, spacing provided by padding, `display: flow-root`
  containment), verified frame-by-frame.
- Popovers no longer snap to the viewport's top-left corner: mote no longer
  overrides the native `margin: auto` centering.
- Spinner no longer rides high next to text: baseline-lowered alignment.

### Changed

- `.mote-note-*` and `.mote-badge-*` compound status classes replaced by the
  shared status classes (`.mote-note mote-success` instead of
  `.mote-note mote-note-success`).

## [0.1.0] - 2026-10-15

### Added

- Initial release: a tiny, semantic, classless CSS layer for plain HTML.
- Variable-driven token system (`--mote-*`) — palette, typography, shape, depth,
  motion; derived tones computed via `color-mix()`.
- Automatic dark mode via `prefers-color-scheme` with manual `data-theme`
  overrides on `<html>`.
- Warm-paper / warm-charcoal palettes with muted plum accent and moss, honey,
  brick, dusty-blue semantic colors — all WCAG AA or better.
- Element styles: headings and inline text, links, lists, definition lists,
  blockquotes, `hr`, `figure`/`figcaption`, `code`/`pre`/`kbd`/`samp`/`var`,
  tables (with caption, footer, zebra), all form controls and states, buttons,
  `details`/`summary`, `dialog`, `progress`/`meter`, media elements.
- Focus-visible rings, `:user-invalid` feedback, reduced-motion support,
  minimal print styles.
- Opt-in helpers: `.mote-container`, `.mote-muted`, `.mote-note` surfaces.
- Element gallery demo page (`demo.html`).

[0.3.0]: https://gitlab.com/abmach/mote/compare/v0.2.1...v0.3.0
[0.7.0]: https://gitlab.com/abmach/mote/compare/v0.6.1...v0.7.0
[0.6.1]: https://gitlab.com/abmach/mote/compare/v0.6.0...v0.6.1
[0.6.0]: https://gitlab.com/abmach/mote/compare/v0.5.1...v0.6.0
[0.5.1]: https://gitlab.com/abmach/mote/compare/v0.5.0...v0.5.1
[0.5.0]: https://gitlab.com/abmach/mote/compare/v0.4.0...v0.5.0
[0.4.0]: https://gitlab.com/abmach/mote/compare/v0.3.0...v0.4.0
[0.3.0]: https://gitlab.com/abmach/mote/compare/v0.2.1...v0.3.0
[0.2.1]: https://gitlab.com/abmach/mote/compare/v0.2.0...v0.2.1
[0.2.0]: https://gitlab.com/abmach/mote/compare/v0.1.0...v0.2.0
[0.1.0]: https://gitlab.com/abmach/mote/-/tags/v0.1.0
