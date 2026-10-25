# Evaluation — Round 10

- **Target:** mote.css v0.10.3 (published npm `latest` and GitLab tag `v0.10.3`)
- **Date:** 2026-10-25
- **Method:** ten independent builders, each creating one realistic page in OS-temp scratch, loading the shipped stylesheets relatively, and browser-verifying the result at 1280px and 390px.

Round 10 tested ten new page types: notification settings, an admin user table, an achievement profile, a form-builder preview, a release timeline, a community directory, an embeddable support widget, transit departures, a match scorecard, and an accessibility statement.

## Verdicts

| Page | Would use again | Page CSS | Failures |
|---|---|---:|---|
| Notification settings | Yes | 19 lines | 0 library; 1 self-caught page issue |
| Admin user table | Yes | 28 lines | 0 library; 2 self-caught page issues |
| Achievement profile | Yes | 45 lines | 0 library; 0 page issues |
| Form-builder preview | Yes | 68 lines | 0 library; 0 page issues |
| Release timeline | Yes | 29 lines | 0 library; 0 page issues |
| Community directory | Yes | 25 lines | 0 library; 1 self-caught page issue |
| Embeddable support widget | Yes | 43 lines | 0 library; 1 self-caught page issue |
| Transit departures | Yes | 17 lines | 0 library; 1 self-caught page issue |
| Match scorecard | Yes | 82 lines | 0 library; 1 self-caught page issue |
| Accessibility statement | Yes | 36 lines | 0 library; 0 page issues |

**Headline:** 10/10 would use mote again. All ten final pages had zero page-level horizontal overflow at both tested widths and zero browser console errors; no library rendering or CSS-application failure was confirmed.

## Feature verification

| v0.10.3 promise | Agents | What was measured |
|---|---:|---|
| Grouped definition lists keep terms and descriptions aligned | 5 without alignment-mechanism overrides — notification settings, achievement profile, community directory, match scorecard, embeddable widget; 2 customized — form builder, accessibility statement | The five cases measured consistent term and description left edges at 1280px and 390px, with grouped wrappers occupying one row per term/description pair. Directory and embeddable widget restyled text and margins but did not override the layout mechanism. The form builder reimplemented the grid with `display: contents`; the accessibility statement changed the term track, so their alignment does not independently verify the library default. |
| Direct and grouped definition-list structures are distinguished | 5 grouped without alignment-mechanism overrides + 2 customized grouped; 1 direct — achievement profile exercised both | The achievement page measured aligned direct children at x=57/x=209px desktop and x=16/x=168px mobile, plus aligned grouped wrappers at x=57/x=235px and x=16/x=194px. Both structures occupied one row per term/description pair without alignment-mechanism overrides. |
| Fieldsets may shrink; file inputs stay in their container | 3 fieldsets; 2 file inputs — notification settings, form builder, embeddable widget | Form builder: fieldset right edge 348px and file-input right edge 327.8px inside a 365px canvas at 390px. Embeddable widget: file-input right edge 1161px inside a fieldset ending at 1181px. Notification settings: the long intrinsic email field and nested fieldsets remained within parent edges. |
| Responsive composition: auto-fitting grids, narrow toolbars, narrow header navigation | 5 grids; 4 toolbars; 3 own-row headers; 1 additional header observation | Achievement grid measured four 273px desktop columns and one 343px mobile column; directory three 360px columns to one 342px; match two 360px panels to one 327px. Admin, directory, embeddable widget, and transit stacked narrow toolbar controls to full width. Admin, directory, and embeddable widget moved navigation to its own row while keeping the primary action outside the scroll region. Notification settings found that scroll-only navigation left its final pill clipped at 390px. |
| Choose a contained table or semantic records for narrow screens | 4 — admin users, release timeline, community directory, transit departures | Admin and release timeline retained one contained semantic table; directory used nine semantic records and no table; transit retained a matrix and separately labelled highlighted records. In every case the page stayed at viewport width and only intended table regions scrolled. |
| Print-and-paper helpers, contained-table expansion, disclosures, and page breaks | 3 — release timeline, match scorecard, accessibility statement | Release timeline measured screen helper `none`/`visible` switching to print `block`/`none`, table expansion from 256px to 525px with `max-height: none` and `overflow-x: visible`, and `beforeprint`/`afterprint` restoring four disclosures. Match and accessibility statement independently confirmed helper visibility switching; match confirmed table expansion. |
| Long-form reading with companion TOC, numbered references, and backlinks | 1 — accessibility statement | At 1280px the reading column measured 672px and sticky TOC 256px; at 390px both measured 342px with the TOC static and before the article in source order. All ten internal reference/backlink targets resolved. |

## What was good

- **Semantic HTML carried the work.** Every page used native tables, definition lists, fieldsets, details, progress, dialog/popover behavior, or document landmarks as real structure. ARIA was used to name regions and navigation, not to recreate visual layout.
- **The responsive helpers did not impose breakpoints.** Builders let `.mote-grid` choose track counts and used one deliberate page rule for narrow composition. Six of ten pages used no fixed column-count utility.
- **Containment was dependable.** Where wide data remained tabular, `.mote-table-scroll` owned the sideways scroll. All ten final pages had page-level `scrollWidth <= innerWidth` at both widths.
- **Status tokens were predictable.** Notes and content surfaces inherited status as documented, while badges and actions declared their own status. The achievement, transit, admin, and embeddable-widget builds all observed the intended distinction.
- **Print behavior was useful and mostly explicit.** Three builders exercised the new print guidance; screen/paper helpers, table expansion, disclosure restoration, and page-break rules all behaved as documented under native Chromium print-media emulation. Those were computed-style checks; later A4 PDF sampling confirmed that the two sampled tables fit portrait, not that every matrix fits.
- **Native platform behavior remained a strong point.** The embeddable widget's tooltip and menu opened, escaped, light-dismissed, returned focus, and stayed inside the viewport without page JavaScript.
- **Page CSS remained modest.** Counts ranged from 17 to 82 lines, with a 32.5-line median and 39.2-line mean. The two highest counts belonged to the three-panel form builder and the event-rich match scorecard.

## What was bad

Ranked by recurrence, then severity. These are discussion items, not fixes.

| Rank | Friction | Recurrence | Evidence | Severity |
|---:|---|---:|---|---|
| 1 | Narrow-paper behavior of a wide contained table is ambiguous | 2 | Release timeline and match scorecard confirmed that print media removes the cap and sets `overflow-x: visible`, but the expanded table remained wider than its narrow screen client. Later A4 portrait PDFs confirmed both sampled tables fit the paper, yet the docs did not distinguish “no artificial clipping” from the broader promise that every matrix fits. | Low-medium |
| 2 | The narrow-toolbar example assumes controls are direct children | 1 confirmed | Transit departures wrapped selects in labels, so the documented `> :where(input, select, button)` rule did not stack them until the page selector targeted labels. Notification settings likewise had to distinguish field shrinking from field stretching explicitly. | Low-medium |
| 3 | A two-row narrow header needs a custom sticky-toolbar offset | 1 | Admin users had to introduce a page-owned `--admin-header-offset` because the documented header rule changes header height but supplies no matching sticky offset. | Low-medium |
| 4 | Status-inheritance documentation contradicts badge gating | 1 | The status section says a badge inside `.mote-error` inherits the brick tint and demonstrates `.mote-reset` with a badge, while the badge section and `mote.components.css` make badges self-declaring: a plain badge stays accent-tinted. The implementation is consistent; the inheritance prose and example are not. | Low, documentation inconsistency |
| 5 | Anchored-popover spacing from the trigger is undocumented | 1 | Embeddable widget measured the built-in 0.45rem margin as effectively touching its trigger and needed a page-owned 0.7rem override. The anchor-positioning recipe documents positioning and flipping but not separation. | Low |
| 6 | Brand re-theming does not call out the accent/on-accent pair | 1 | Embeddable widget found that overriding `--mote-accent` also requires `--mote-on-accent` for readable filled controls. | Low, documentation gap |
| 7 | Scroll-only header navigation reduces final-item discoverability | 1 | Notification settings reported the clipped final pill as less discoverable than a wrapped or own-row navigation, even though page overflow stayed at zero. | Low |
| 8 | “Table plus highlighted records” can blur the duplicate-content warning | 1 | Transit departures followed the brief's matrix-plus-highlight split, but the highlighted rows duplicated matrix data in a second representation. This was complementary, not breakpoint-specific duplication, yet the distinction is not stated in the docs. | Low, discussion clarity |

## Failures

### Confirmed library failures

**None.** No builder found broken rendering, a CSS rule that failed to apply, a collapsed layout, an unresolved current-release promise, or a final console error.

### Self-caught and self-fixed page issues

- Notification settings: an email input's `size="48"` initially widened its fieldset; an explicit `max-width: 100%` rule fixed it.
- Admin users: the first table was too narrow to exercise horizontal containment, and the first sticky-toolbar offset did not account for the two-row mobile header. Both were corrected in page CSS.
- Community directory: the “List an organization” action initially targeted a nonexistent `#submit` anchor and was changed to a real `mailto:` destination.
- Embeddable widget: literal `<link>` tags in a code sample were parsed and requested before the sample was entity-escaped; the final run had zero console errors.
- Transit departures: the first narrow-toolbar selector missed label-wrapped selects; the controls were then measured at 342px per row.
- Match scorecard: the initial match header used a fixed three-column narrow layout and received one deliberate stacking rule.

### Verification-tool issues, not library issues

- Release timeline and accessibility statement initially used a higher-level media-emulation option that did not change computed styles. Direct Chromium `emulateMediaType('print')` produced the documented print behavior in both builds.

## Common patterns

1. **Containment was a solved problem once the right representation was chosen.** Tables were retained for comparison matrices and transformed into records for independently read items.
2. **Page CSS supplied composition, not a second styling system.** The median page needed 32.5 lines; most of those lines implemented one responsive shell, a page-specific header/grid, or print rules.
3. **Status remained an indirection layer.** Builders repeatedly avoided putting status on ancestor wrappers to recolor action surfaces, and the gating rules held.
4. **Native elements did more than expected.** Fieldset/file controls, details, progress, popovers, and print events covered the interactive requirements without application JavaScript.
5. **Current-release promises measured true.** Grouped definition lists, fieldset/file containment, responsive rules, and print helpers passed every direct check in this round.
6. **Print verification needs native print-media checks and generated-PDF inspection for paper guarantees.** A higher-level wrapper may report success without changing computed styles. Native emulation verifies CSS behavior; sampled PDF inspection verifies fit and legibility.
7. **The library's sharpest edge is composition guidance, not element styling.** Missing recipes appeared around paper-width tables, sticky offsets, popover spacing, and labelled toolbar controls.

## Suggested discussion items

1. Define and verify the promise for wide tables on narrow paper: contained expansion, readable scaling, or explicit page guidance.
2. Extend the responsive-toolbar recipe to cover controls wrapped in labels.
3. Decide whether the multi-row narrow-header recipe should expose a sticky-offset variable or token.
4. Update the `.mote-reset` example to use an inheriting content surface rather than a gated badge.
5. Document anchored-popover separation and flipping behavior.
6. Document `--mote-accent` together with `--mote-on-accent` for brand overrides.
7. Clarify how complementary highlighted records differ from the discouraged duplicate table/card representation.
8. Consider whether scroll-only navigation needs a stronger overflow affordance when the final pill is clipped.

Remediation was approved after the round; no fixes were applied during the builders’ evaluation.
