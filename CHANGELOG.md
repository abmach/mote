# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/abmach/mote/compare/v0.1.0...main
[0.1.0]: https://github.com/abmach/mote/releases/tag/v0.1.0

---

Copyright (c) 2026 Arthur Biazon Machado. All rights reserved.
