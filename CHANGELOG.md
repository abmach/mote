# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed (documentation)

- Split the monolithic live documentation into seven canonical, task-oriented pages:
  an overview map, getting started, elements and platform behavior, layout and
  components, helpers and print, patterns, and reference.
- Added shared documentation CSS and JavaScript assets plus a compact,
  link-checked `docs/llms.txt` discovery index for retrieval tools.

### Tests

- Documentation outline checks now validate every page's local outline,
  cross-page fragments, shared assets, and discovery-index links.
- Recipe checks now scan the complete documentation set rather than a single
  monolithic page.

## [0.12.0] - 2026-10-29

### Removed

- Removed the public `.mote-card-actions` and `.mote-row-status` micro-helpers. Card action rows
  now use the page-owned `.card-actions` class with
  `.mote-card > .card-actions { margin-block-start: auto; }`; status rows use
  the page-owned `.status-row` class with
  `tr.status-row:is(.mote-success, .mote-warning, .mote-error, .mote-info) > :is(td, th[scope="row"]) { background-color: var(--mote-status-soft); }`.
- This is a clean cutover: there are no aliases, shims, or replacement mote
  classes. `.mote-row` continues to own content-row layout.

### Tests

- The minification gate now enforces byte-exact minified budgets of 18,000
  bytes for `mote.css` and 13,000 bytes for `mote.components.css`. A focused
  regression proves that an over-budget result fails the gate.

## [0.11.0] - 2026-10-29

### Added (components — round-15 findings)

- `.mote-card-media` now sizes a direct inline SVG cover while preserving the
  SVG's own `viewBox` ratio. Nested SVG icons remain unaffected.
- `.mote-card-actions` bottom-aligns a card action row without owning the
  row's display, gap, or wrapping.
- `.mote-row-status` paints a status row's direct cells with
  `background-color`, preserving semantic row headers and background-image
  layers. Status classes remain token carriers without the helper.

### Fixed (docs — round-15 findings)

- The phone-record recipe now requires a non-empty `data-label` on every
  transformed data cell and warns that a missing label renders blank.
- The recipe states that its breakpoint is an example, that media-query
  thresholds cannot be parameterized with CSS variables, and that the
  transform and cap-release queries must use the same chosen threshold.
- Table documentation now distinguishes page and wrapper scrolling and
  explains that the 60vh cap does not crop content.
- Print guidance now includes a practical paper checklist covering content,
  tables, pagination, forms, and generated-PDF inspection.
- Card documentation now covers direct inline SVG covers and the
  `.mote-card-actions` helper.

### Tests

- The regression fixture asserts direct SVG cover sizing and ratio, nested SVG
  isolation, card-action bottom alignment, status-row painting, background
  image preservation, and gated badge behavior.
- Documentation source checks cover the new guidance, reject leaked live
  tags in copy-ready samples, and pin both the encoded and live SVG card-cover
  structures, including their wrapper, SVG, rectangle, and circle elements.
- The fixture's screen-only status and card probes stay off paper through a
  fixture-local print rule, so the print-emulation PDF remains a focused
  four-page regression artifact without repurposing `.mote-no-print`.

### Evaluation

- Fifteenth round: ten independent agents built ten new page types against
  v0.10.9. All ten would use mote again. The final pages had no confirmed
  library failures; these changes address the recurring authoring friction
  and documentation gaps surfaced by the round.

## [0.10.9] - 2026-10-29

### Fixed (components — round-14 findings)

- Scrollable-table header cells now become static on paper. The print
  override follows the sticky-cell rule, so Chromium can repeat the semantic
  `<thead>` at the top of continuation pages instead of painting it after the
  rows.

### Fixed (docs — round-14 findings)

- The phone-record recipe now start-aligns numeric values in its label/value
  branch, removes generated labels during narrow-viewport print emulation,
  and resets sticky header cells while restoring the table.
- The row-status recipe now includes semantic row headers
  (`th[scope="row"]`) and uses `background-color`, preserving background
  image layers such as the documented weekend-column shading.
- The narrow-header recipe now states that it applies to mote's canonical
  composition, where `.mote-row` owns the header row. Custom flex headers
  need page-owned rules for their own structure.
- Print guidance no longer implies that restoring `position: sticky`
  guarantees a repeated running head; repetition depends on the browser's
  paged-media implementation and the generated PDF must be inspected.
- Clarified card flex behavior and bottom-aligned actions, inline SVG media
  sizing, prose-heavy card-grid density, and badge scaling.

### Tests

- The regression fixture asserts that scrollable-table header cells are
  static on paper.
- Docs-source checks pin the phone-record print and numeric-alignment rules,
  the row-header and background-color contract, and the canonical narrow
  header row owner.

### Evaluation

- Fourteenth round: ten independent agents built ten new page types against
  v0.10.8. All ten would use mote again. The builders' final pages had no
  confirmed failures; remediation confirmed one library-facing print defect in
  the scrollable-table header, fixed here alongside the documentation gaps
  surfaced by the round.

## [0.10.8] - 2026-10-28

### Fixed (components — round-13 findings)

- The sticky site header goes static on paper, so it no longer repeats over
  every printed page. A page that wants a running head re-applies
  `position: sticky` in its own print CSS.

### Fixed (docs — round-13 findings)

- The phone-record recipe keeps one label column for the whole table
  (`--records-label`, 7rem by default) instead of a fixed 6rem track, so
  longer labels no longer wrap and every record's labels line up. The label
  keeps `text-align: start`, so a right-aligned numeric column no longer
  drags the label away from its value.
- The phone-record recipe now covers `<caption>` and row headers
  (`th[scope="row"]`), and its print guard restores the table, the hidden
  header row and the caption: the phone layout hides the header, so a print
  rule that only reverted `display` would have printed a table with no
  columns.
- The phone-record recipe now states that the transform branch does not need
  `.mote-table-scroll`, and that a table serving both branches must release
  the panel cap in the narrow query (`--mote-table-max: none`) — the shipped
  60vh cap otherwise crops the records it contains.
- Status on a table row now has a documented page rule, and the status
  reference states that progress and meter inherit a status while badges and
  buttons are gated.
- Small clarifications: an exclusive `<details name>` group spans the whole
  document; badge scale follows the surrounding font size, not the body;
  definition lists need one column in a narrow rail; a left-rail contents
  list is a `nav` before `main`; Chromium repeats `tfoot` totals across page
  breaks; `.mote-card-media` sizes a direct `img` or `video` child.

### Added (docs — round-13 findings)

- A reusable-dialog example: one `<dialog>` filled from the trigger before
  `showModal()`. mote ships no JavaScript and the docs keep saying so.

### Tests

- The published phone-record recipe is pinned by a docs-source check
  (`tests/docs-recipes.cjs`), which also fails if a code sample leaks a live
  tag into the page.
- The regression fixture asserts that mote's sticky header is sticky on
  screen and static on paper.

### Evaluation

- Thirteenth round: ten independent agents built ten new page types against
  v0.10.7. All ten would use mote again; no library failure was confirmed.
  The round surfaced the recipe, print and documentation gaps fixed here.

## [0.10.7] - 2026-10-26

### Fixed (docs — round-12 findings)

- The contents rail now includes the identified “Narrow screens: scroll or
  transform” subsection. A regression check keeps the rail's links synchronized
  with every identified `h2`–`h4` heading in the docs page.

### Added (docs — round-12 findings)

- Added copy-ready recipes for narrow definition lists, dense tables that
  become phone-readable records, and headers that give navigation its own row.
- Added a narrow-page TOC recipe that places the TOC before `main` in source
  order; on narrow screens, the shell's column layout preserves that relative
  order visually, native focus order follows DOM order, and the contents
  disclosure starts closed.
- Added the complete disclosure print workflow: it opens every panel, removes
  exclusive-group names while printing, and restores the original state.
- Clarified that `.mote-doc` paper layout is page-owned, while mote ships the
  light paper palette and table expansion.

## [0.10.6] - 2026-10-26

### Added (docs)

- **The documentation page is navigable again**: a contents rail on wide
  screens lists every section and subsection and marks the one in view, and on
  narrow screens it folds into a one-line "On this page" bar under the header.
  Every section and subsection heading is now deep-linkable, the header strip
  is the complete section index, and a "Back to top" link closes the page.
  The rail is screen chrome: on paper the shell collapses to one column, the
  outline does not print, and the shell's inner scroll no longer clips wide
  tables.

## [0.10.5] - 2026-10-25

### Fixed (docs — round-11 findings)

- **A lone `:root` brand override no longer looks like it works**: the theming
  section now carries a complete brand recipe — base, explicit dark,
  automatic dark, and print — because mote's own palette rules outrank a plain
  `:root` declaration in automatic dark mode and on paper. Every state pairs
  `--mote-accent` with `--mote-on-accent`.
- **The anchored-popover separation is now described as measured**: the popover
  section states the 0.45rem margin and Chromium's own offset to the popover's
  placement, instead of promising a gap the browser does not produce.
- The status reference is now one table: every status-consuming surface carries
  an *Inheriting* or *Gated* mode, and the missing Cards row is in.
- The theme-toggle snippet now writes the current state into the button label.
- The own-row narrow-navigation recipe is labeled as page CSS, so it is no
  longer read as a rule mote ships.
- The sticky-toolbar section now explains how to measure the header's real
  bottom edge instead of copying a sample offset; the console expression lives
  in a code block, so the documentation page keeps its width on narrow screens.
- Added the native `<progress>` width note and the native validity-timing note
  for required selects.

### Added (tests)

- Narrow-header containment coverage for both documented header shapes
  (`body > header nav` and `.mote-header` + `.mote-nav`): the nav yields space,
  stays inside its row and the viewport, and its pill row scrolls instead of
  widening the page.
- Anchored-popover coverage: the 0.45rem separation margin, placement below
  the trigger with horizontal centering, and the viewport-edge flip.

### Evaluation

- Eleventh round: ten independent agents built ten new page types against
  v0.10.4. All ten would use mote again; every final page kept page-level
  horizontal overflow at zero at 1280px and 390px, and no library failure was
  confirmed. The round surfaced the documentation gaps fixed here and left the
  anchored-popover promise uncovered — the new fixture checks cover it now.

## [0.10.4] - 2026-10-25

### Fixed (docs — round-10 findings)

- **Status inheritance now matches badge gating in the documentation**: the
  status section no longer claims that a badge inherits an ancestor's status,
  and the `.mote-reset` example now uses an inheriting `.mote-note` surface.
  The badge section links back to the gating rules.

### Changed (docs — round-10 findings)

- Clarified that `.mote-table-scroll` guarantees the complete table is present
  without artificial clipping on paper, not that every matrix fits narrow
  paper. Added an opt-in, document-wide landscape recipe and guidance to check
  generated PDFs for legibility.
- Expanded the responsive-toolbar recipe to cover label-wrapped controls and
  documented a page-owned sticky-toolbar offset for one- and two-row headers.
- Documented the default anchored-popover gap, the `--mote-accent` /
  `--mote-on-accent` override pair, own-row navigation for long narrow headers,
  and the boundary between complementary representations and duplicated records.

## [0.10.3] - 2026-10-25

### Fixed

- **Definition lists keep grouped terms and descriptions aligned**: valid
  grouped definition-list markup no longer turns each grouping wrapper into an
  alternating grid cell. Terms and descriptions share aligned columns within
  each list when direct children alternate one term and one description; grouped
  wrappers support one term and one description per group; fixture-pinned.
- **Form fieldsets no longer force narrow pages sideways**: fieldsets may shrink
  below their intrinsic content width, and file inputs stay within their
  container; fixture-pinned.

### Changed (docs — round-9 findings)

- Added responsive-composition guidance for grids, toolbars, and narrow header
  navigation, including a page-owned toolbar recipe; wide reference tables now
  use contained scroll regions instead of widening the page.
- Documented the choice between a contained scrolling table and a semantic
  record layout for narrow screens.
- Added a dedicated print-and-paper section covering screen/paper helpers,
  table expansion, disclosures, and page-break rules.
- Added a long-form reading recipe with a companion table of contents and
  numbered references with backlinks.
- Documented direct and grouped definition-list structures.

### Evaluation

- Ninth round: ten independent agents built ten new page types against
  v0.10.2. All ten would use mote again, and every final page kept
  page-level horizontal overflow at zero. The round exposed the grouped
  definition-list defect and the documentation gaps fixed here. Narrow
  documentation verification also exposed the fieldset/file-input overflow
  fixed above.

## [0.10.2] - 2026-10-24

### Fixed

- **jsDelivr now minifies `mote.components.css`**: clean-css 5.3.3 could not
  parse the Baseline 2024 `@starting-style` rules and `allow-discrete`
  transition values, so the automatic `mote.components.min.css` URL served
  the unminified source. Narrow ignore guards preserve those modern rules
  verbatim while allowing jsDelivr's minifier to produce a compact stylesheet.

## [0.10.1] - 2026-10-24

### Fixed

- **Narrow `.mote-doc` layouts keep landmark order**: the collapsed shell no
  longer places the footer before `main` when guide and context rails are
  present.
- **`.mote-table-scroll` expands on paper**: the optional components file
  now owns its print override, so loading it can no longer undo the core
  print behavior.
- **`.mote-skip-link` reveals on any focus**: programmatic focus now gets
  the same fixed skip-link pill as keyboard focus, removing a focus-modality
  dependency from the accessibility helper and regression fixture.

### Changed (tests — round-8 findings)

- The regression fixture now selects an active screen or print-specific
  assertion suite, rebuilds its results on media changes, and self-checks both
  paper helpers and printable table expansion.

### Changed (docs — round-8 findings)

- Document-layout guidance now states that the collapsed shell preserves
  source order, distinguishes `main` overflow from table-wrapper overflow,
  and calls out the body-level gutter.
- Header guidance now includes a narrow-screen recipe that gives the nav its
  own row when the brand and pushed controls leave too little room.
- The helper map now includes print helpers and a right-rail TOC recipe.

### Evaluation

- Eighth round: ten independent agents built ten new page types against
  v0.10.0. All ten would use mote again and kept page-level horizontal
  overflow at zero; the round exposed the collapsed document-order and
  cross-file print defects fixed in this release.

## [0.10.0] - 2026-10-23

### Fixed

- **`.mote-doc > header` was missing `min-width: 0`** (the shell gives it
  to main, nav, and aside but not the header): a header carrying long nav
  content pushed the *page* sideways at narrow viewports. Found by the
  round-7 course builder; fixture-pinned.

### Added

- `.mote-tabular`: tabular figures without the right-alignment — day
  numbers, headline balances, meta lines. `.mote-num` keeps
  alignment + figures for table columns (tables already render tabular
  numerals on every cell, so alignment is the column class's real job).
  Five round-7 builds hit the old coupling.
- `--mote-avatar-radius` (default 999px): square cover art and favicons
  no longer fight the circular default — three round-7 builds overrode it
  by hand.

### Changed

- Header nav pills never break mid-label (`white-space: nowrap`): the
  pill row scrolls instead — three round-7 builds added this rule by
  hand; deferred from round 6 as a recipe, three recurrences made it a
  default.

### Fixed (docs — round-7 findings)

- Status classes are token carriers, not text colors — documented with
  the tinted-text recipe (`color: var(--mote-success)`).
- `.mote-stack` on a `<fieldset>` flattens the legend notch — documented.
- Nav hints only exist while the pills overflow — documented.
- New recipes: small indicator dots (skeleton `min-height`), grouped
  messages (`.mote-media` + `aria-hidden` spacer), weekend columns
  (row-tint-safe column shading), quiet captions.
- `--mote-avatar-radius` and `.mote-tabular` in the token and class
  tables.

### Evaluation

- Seventh round: ten agents built ten NEW page types (chat, job board,
  calendar, recipe, transactions, lesson, search results, team, hotel,
  podcast) against v0.9.1 on a faster builder model. 10/10
  would-use-again, zero final-state rendering failures; every v0.9.x
  feature verified in the wild by every agent that touched it.

## [0.9.1] - 2026-10-23

### Fixed

- The header hairline is now fully snippet-driven: it paints only
  while the nav actually scrolls. With the snippet, an empty
  `data-nav` (a single pill, nothing to scroll) leaves the line gone;
  without the snippet there is no line at all — zero-JS headers keep
  just the pills, and the cut pill is the overflow signal. Both states
  fixture-pinned.

## [0.9.0] - 2026-10-22

### Added

- **`tests/fixture.html` — the regression fixture**: a self-checking page
  loading the real committed stylesheets, with 54 assertions pinning the
  principle invariants (two-tier gating, status inheritance, control
  density, stack behavior, zebra-vs-`aria-current` order, skip-link states,
  landmark styling, theme flip). Open it in any browser — the title shows
  PASS or FAIL. Its first run caught two real bugs, both fixed in this
  release.
- `tr[aria-current]` current-row treatment: accent-soft tint that reads
  over zebra (same vocabulary as nav pills and pagination). The fixture
  asserts it on both parities.
- `.mote-grid-sparse` is now standalone-complete (`display: grid` + gap) —
  it was a columns-only modifier that silently rendered as a plain block
  when used alone, as the README advertised it (fixture-caught).

### Changed

- **Badges never grow past body scale**: `font-size: min(0.8em, 0.8rem)` —
  a pill inside a heading stays readable (three round-6 builds hit the old
  heading-scale default), small contexts still scale down with the em side.
- **`.mote-stack` is now a real stack**: flex column with
  `--mote-stack-gap` (default 1.25rem) and zeroed child margins, so the
  name is honest for any content — form rhythm is designed, not `<p>`
  margin luck. Field stretching and the 1em checkbox/radio exception are
  unchanged. The sr-only control rule inside stacks was strengthened to
  beat the checkbox width rule on specificity.
- **Header navs scroll instead of wrapping**: `body > header nav` /
  `.mote-nav` pill rows stay one line at any width — a long section list
  (the docs' own ten pills) scrolls inside the bar instead of pushing the
  brand or the theme toggle to a second row. The scrollbar is hidden;
  a hairline under the pills carries directional accent fades pinned to
  the nav edges — they never float with scroll position. Pure CSS cannot
  distinguish "at the start" from "nothing to scroll", so the fades key
  off a `data-nav` attribute kept current by a seven-line documented
  snippet (the theme-toggle precedent, including a webfont-load re-sync);
  without it, the hairline and the
  cut pill are the whole hint. Direction-agnostic snippet math; the
  gradients flip under `[dir="rtl"]`.
- Tokenized the hardcoded paddings: `--mote-grid-gap` (1.25rem) and
  `--mote-band-pad` (4rem) — thin strips and matched split rhythms no
  longer need hand-copied values.

### Fixed (docs — round-6 build findings)

- Band placement warning: inside `main.mote-container` a band bleeds only
  to the container edge — the docs now say so (the one round-6 trap that
  actually broke a build mid-flight)
- `.mote-card` + `.mote-media` merge warning: the card's column direction
  silently wins; nest instead.
- `aria-label` case-sensitivity warning on the semantic selectors.
- `.mote-num` widened: "table columns or any figure block".
- Media-object default alignment (`flex-start`) documented.
- Skip-link mechanism wording: clipped via `clip-path`, not `display: none`.
- Badge and stack paragraphs rewritten for the new behavior; note-width
  recipe added; three new token rows.
- Six new pattern recipes: toolbar row, result rows, price line, post
  actions, growing input, prominent search.
- **`demo.html` merged into the docs page as the Gallery section** (every
  input type, footnoted table, sample output) and deleted — one canonical
  page, no drift risk. README and in-page links updated.

### Evaluation

- Sixth round: ten agents built ten NEW page types (forum, product,
  status, checkout, inbox, gallery, profile, FAQ, poll, playlist) against
  v0.8.0. 10/10 would-use-again, zero rendering failures; every v0.8.0
  fix verified load-bearing. Asymmetric grid splits stay page CSS by
  design (documented, not a gap).

## [0.8.0] - 2026-10-22

### Added

- `.mote-band`: full-bleed tinted section — CTA bands, section dividers,
  announcement strips. Opaque `color-mix()` (unlike `--mote-accent-soft`,
  which is transparent and can vanish over dark backgrounds). Reads
  `--mote-status`, so bands are content surfaces under the two-tier
  principle.
- `.mote-skip-link`: sr-only until keyboard focus, then a fixed pill.
  Split from `.mote-sr-only`, which is now pure hiding — using sr-only to
  hide toggle radios made them pop a skip-link pill on focus.

### Changed

- `.mote-card` normalizes `text-align: start` — form labels inside a card
  read normally even when the card sits in a centered `.mote-hero`
  (cards already zeroed first/last-child margins; this finishes the job).
- Page footer navs (`body > footer nav ul`) render as quiet wrapped rows —
  no bullets — matching the header's semantic treatment. No class needed.
- File inputs use the density tokens (`--mote-control-pad`), so their
  height matches sibling fields in a stack (was 41px vs 44px).
- Labels wrapping checkboxes/radios get `cursor: pointer` — the label is
  the click target. Scoped via `label:has()`; text-input labels untouched.

### Fixed (docs — the bulk of this release, from a ten-agent build round)

- **Tokens reference**: new section listing every `--mote-*` knob — palette,
  type/shape/motion, layout/density — including the actual
  `--mote-accent-soft` definition (9% *transparent* mix) and a pointer to
  `.mote-band` for opaque tints. Nav pill added.
- **Simple-page header snippet now shows the real composition**
  (`.mote-container.mote-row` + `.mote-brand` + `.mote-push` inside the
  header) — the old "no classes at all" snippet left the brand flush at
  the viewport edge.
- **Notes and callouts** section: `.mote-note` (shipped since 0.3.0, never
  documented as a concept) framed alongside the `blockquote` + status
  quote treatment. Cross-linked from Blockquote and the consumer map.
- `.mote-num` documented (replaces the DIY `.num` page recipe);
  `--mote-table-max` documented next to `.mote-table-scroll` (with the
  sticky-engages-on-scroll note); `.mote-hero` + `--mote-hero-offset`
  documented in Layout under "Hero and bands" — all previously findable
  only by grepping the stylesheet.
- `.mote-card-media` documented (replaces the DIY `.card-media` recipe and
  the false "cards don't ship this" claim); live band, hero and card-media
  examples added.
- `--mote-rail-top`: docs now say it auto-derives from the sticky header —
  set it only for wrapped shells (`.mote-header`).
- File-input treatment, badge context-scaling, and label-cursor behavior
  documented.
- Seven new pattern recipes: login page, marketing hero (+ CTA band),
  stat row, CSS-only billing toggle (with the sr-only-is-not-hiding
  warning), display pull-quote, row hover, feedback row.
- Docs page gets a `.mote-skip-link` (dogfooding the new class).

### Evaluation

- Fifth round: ten agents each built a real page (pricing, blog, login,
  404, settings, dashboard, KB, landing, release notes, contact) against
  v0.7.0 and reported DX honestly. 10/10 would-use-again, zero rendering
  failures; every change above traces to that round.

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

[Unreleased]: https://gitlab.com/abmach/mote/compare/v0.12.0...HEAD
[0.12.0]: https://gitlab.com/abmach/mote/compare/v0.11.0...v0.12.0
[0.11.0]: https://gitlab.com/abmach/mote/compare/v0.10.9...v0.11.0
[0.10.9]: https://gitlab.com/abmach/mote/compare/v0.10.8...v0.10.9
[0.10.8]: https://gitlab.com/abmach/mote/compare/v0.10.7...v0.10.8
[0.10.7]: https://gitlab.com/abmach/mote/compare/v0.10.6...v0.10.7
[0.10.6]: https://gitlab.com/abmach/mote/compare/v0.10.5...v0.10.6
[0.10.5]: https://gitlab.com/abmach/mote/compare/v0.10.4...v0.10.5
[0.10.4]: https://gitlab.com/abmach/mote/compare/v0.10.3...v0.10.4
[0.3.0]: https://gitlab.com/abmach/mote/compare/v0.2.1...v0.3.0
[0.8.0]: https://gitlab.com/abmach/mote/compare/v0.7.0...v0.8.0
[0.9.0]: https://gitlab.com/abmach/mote/compare/v0.8.0...v0.9.0
[0.9.1]: https://gitlab.com/abmach/mote/compare/v0.9.0...v0.9.1
[0.10.3]: https://gitlab.com/abmach/mote/compare/v0.10.2...v0.10.3
[0.10.2]: https://gitlab.com/abmach/mote/compare/v0.10.1...v0.10.2
[0.10.1]: https://gitlab.com/abmach/mote/compare/v0.10.0...v0.10.1
[0.10.0]: https://gitlab.com/abmach/mote/compare/v0.9.1...v0.10.0
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
