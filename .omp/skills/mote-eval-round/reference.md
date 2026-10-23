# mote-eval-round — reference

Verbatim templates and learned protocols. Fill the `{{PLACEHOLDERS}}` per
round; change nothing else without cause.

## Context contract (dispatched to every builder)

```
# Goal
Round {{N}} of hands-on evaluation of mote.css — a class-optional CSS
library (zero classes required; opt-in `.mote-*` classes). Ten
independent agents each build one realistic temporary webpage using the
library, then report honestly on developer experience. This round tests
v{{VERSION}}, which just shipped:

{{NEW_FEATURES — 4-7 bullets, one line each, phrased as behavior promises
the builder can verify in a browser}}

# Library facts (canonical — do not re-derive)
- Scratch workspace: `{{SCRATCH}}` — contains fresh copies of `mote.css`
  (core, load first) and `mote.components.css` (opt-in, load second).
  Link them RELATIVELY: `<link rel="stylesheet" href="mote.css">`.
- Write your page to `<scratch>/<your-page>.html` and your report to
  `<scratch>/report-<name>.md`. If either file already exists, overwrite
  it completely.
- Reference documentation: `D:\Personal\mote\docs\index.html` — read the
  sections relevant to your brief BEFORE building. It has a full **Tokens**
  reference, **Notes and callouts**, **Hero and bands**, a **Gallery**
  (every element), and a **Patterns** section with copy-paste recipes.
  Also: `D:\Personal\mote\README.md` and `D:\Personal\mote\tests\fixture.html`
  (the library's own regression page — a quick map of intended behaviors).
- Design language: semantic HTML first; `.mote-*` classes are opt-in
  extras. Fonts: Inter + Commit Mono stacks — you MAY add the fontsource
  CDN links the docs show, nothing else.
- Two-tier status principle: content surfaces (notes, blockquotes,
  progress, card borders, bands, display) inherit `--mote-status` from
  ancestors; actions (buttons, ghosts) and content markers (badges) are
  GATED — status class on the element itself.
- JavaScript: ONLY documented snippets (theme toggle, toast, dialog, nav
  scroll hints). CSS-only techniques preferred.
- The semantic `aria-label` selectors (`pagination`, `breadcrumb`, `toc`)
  match case-sensitively — copy exact lowercase.

# Contract (all agents)
1. Read the relevant docs sections BEFORE writing markup. Check the
   Tokens section before writing custom CSS — a `--mote-*` knob may
   already exist.
2. Build ONE self-contained HTML page at the exact path given in your
   task. No frameworks, no other CSS files, no lorem ipsum, no "TODO".
   Realistic copy and plausible data throughout.
3. Write your report to the exact report path, using the template below.
4. Do NOT edit any file outside the round scratch directory. Do NOT
   touch the repo, git, or earlier round files.
5. Report HONESTLY: your job is to find friction. If something was
   awkward, undocumented, inconsistent, or broke — that goes in the
   report.
6. Where your brief fits a current-release feature, USE IT.

# Report template (use exactly these headings)
# <page-name> — <one-line description>

## The build
One paragraph: what you built, which classes/semantic elements you
reached for.

## What worked well
- ...

## What required a docs lookup (and was the doc helpful?)
- ...

## What didn't work as expected
- ...

## Failures (broken rendering, CSS not applying, layout collapse)
- ...

## v{{VERSION}} features exercised
- ... (did each do what the docs promise?)

## Verdict
One sentence: would you reach for this library again for this kind of
page?
```

## Brief shape (one per agent)

```
# Target
Build `<page>.html` — <archetype>. Report to `report-<name>.md`.

# Change
<2-4 sentences of realistic composition requirements, naming which
library surfaces to exercise — enough that a builder with no
conversation history can produce a real page, not a demo.>

# Acceptance
- One HTML file, realistic copy, links both stylesheets relatively.
- <2-3 measurable outcomes: renders, aligns, scrolls, distinguishes.>
- Report follows the exact template.
```

## Archetype pool

Thirty used across rounds 5–7 — do not repeat. Track additions here.

**Used (round 5):** pricing, blog post, login, 404, settings, dashboard,
knowledge-base, landing, release-notes, contact.
**Used (round 6):** forum thread, product page, status page, checkout,
inbox, photo gallery, profile, FAQ help-center, poll, playlist.
**Used (round 7):** chat, job board, calendar, recipe, transactions,
course lesson, search results, team, hotel booking, podcast episode.

**Candidates (unexercised):** event registration, comparison/review
site, documentation landing with version switcher, changelog-adjacent
migration guide, wiki page with edit history, support ticket queue,
appointment scheduling, invoice/receipt, legal/terms long-form, book
chapter with footnotes, interactive cookbook index, real-estate
listing, app store page, comparison table-heavy spec sheet, member
onboarding wizard, community guidelines with callouts, archive/tag
index, sitemap-style directory, offline/print-first document, embed
widget demo page, download page with checksums, api reference (table +
toc heavy), settings-notifications with switches, admin user table
(actions column), badge-heavy gamification profile, embeddable form
builder preview, changelog timeline with bands.

## Aggregate structure (EVALUATION-R<N>.md)

1. **Verdicts table** — page, would-use-again, page-CSS count, failures.
2. **Feature verification table** — every current-release feature with
   how many agents exercised it and what they measured.
3. **What was good** — cross-agent consistency, load-bearing pieces.
4. **What was bad** — friction ranked by recurrence/severity, each with
   the agents that hit it.
5. **Failures** — distinguish real library bugs from self-caught/self-
   fixed page issues.
6. **Common patterns** — what the round taught at the meta level.
7. **Suggested discussion items** — ranked, no actions taken.

Present a compact summary in chat (headline verdict table, top findings),
then stop for discussion.

## Learned protocols

- **Scratch lives in OS temp**, never the repo: the user's standing
  preference (`%TEMP%\mote-tmp\round<N>\`). A `.gitignore` for repo
  scratch was tried and rejected as bloat.
- **Respawn on failure**: `Error reading stream: read tcp …` is a
  provider drop, not a library finding — respawn the same brief; keep
  anything that completed (its result is valid).
- **Gathering**: read all ten `report-*.md` in one `read` call (multi-
  path); the read tool elides middles on very large batches — read the
  artifact for elided ranges before synthesizing.
- **Conventions**: `EVALUATION-R<N>.md` is deleted only when the round's
  fixes ship; the round takes no fix actions until the user says so.
- **Fix-phase reminders** (for after the user approves): docs edits are
  entity-escaped (`<`/`>` in `<pre><code>`) — build old-strings with a
  runtime `esc()` helper, never literal angle brackets; `<pre>` blocks
  are two-space indented; verify every anchor with one grep pass BEFORE
  a multi-edit script because a failed assert discards all in-memory
  edits; verify CSS changes via live computed-style probes, then pin
  them in `tests/fixture.html`.
