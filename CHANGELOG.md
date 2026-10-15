# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- Consider Inter's `ss02` (disambiguation) + `zero` (dotted zero) OpenType features
  for contexts where `0`/`O` and `1`/`l` confusion matters.

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
