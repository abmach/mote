# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
[0.4.0]: https://gitlab.com/abmach/mote/compare/v0.3.0...v0.4.0
[0.2.1]: https://gitlab.com/abmach/mote/compare/v0.2.0...v0.2.1
[0.2.0]: https://gitlab.com/abmach/mote/compare/v0.1.0...v0.2.0
[0.1.0]: https://gitlab.com/abmach/mote/-/tags/v0.1.0

---

Copyright (c) 2026 Arthur Biazon Machado. All rights reserved.
