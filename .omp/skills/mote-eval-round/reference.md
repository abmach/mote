# mote-eval-round — reference

The dispatch procedure, templates, and learned protocols. The skill never
hardcodes library facts — those are derived from the repo at dispatch
time so the skill stays valid as mote evolves.

## Filling the context contract

The builders' context block is assembled from the repo *at dispatch time*.
Never reuse a previous round's copy; never write library claims from
memory. Sources:

1. `D:\Personal\mote\README.md` — positioning and claims (what the
   library says it is), package shape, the zero-JS stance, the
   feature/class/token tables. The context's *positioning paragraph*
   is a compressed restatement of the README's own framing.
2. `D:\Personal\mote\docs\index.html` — read the section **headings**
   only; they give the reference map ("Tokens", "Notes and callouts",
   "Hero and bands", "Gallery", "Patterns", …) that tells builders what
   documentation exists and where. Write the map as it currently is.
3. `D:\Personal\mote\CHANGELOG.md` — the current version's section. Its
   bullets become the `{{NEW_FEATURES}}` list, each rephrased as a
   behavior promise a browser can verify ("badges never grow past body
   scale — measure one inside a heading").
4. Any gotchas the docs currently warn about (case-sensitive selectors,
   class-merge traps, placement rules) — list them verbatim-in-spirit
   under "gotchas".

What the derived context must always tell builders, whatever the current
wording:

- **Positioning**: what mote is and its class-optional claim, per the
  README intro.
- **Linking**: scratch path, both stylesheets linked relatively, core
  first. (Scratch mechanics are below — stable.)
- **Docs map**: the current section list with one clause each, plus the
  paths to `docs/index.html`, `README.md`, and `tests/fixture.html`
  ("the library's own regression page — a quick map of intended
  behaviors").
- **Design language**: semantic HTML first, `.mote-*` opt-in, and the
  current fonts policy exactly as the docs' Fonts section states it.
- **Status principle**: however the docs phrase status inheritance and
  gating today — the builders must know which surfaces inherit and
  which elements are gated, in the docs' current words.
- **JavaScript policy**: "ONLY snippets documented on the docs page"
  — name the snippets exactly as the docs currently document them
  (the list grows release by release; do not enumerate from memory).
- **Gotchas**: the current documented traps.

## Stable contract skeleton (dispatch verbatim)

```
# Goal
Round {{N}} of hands-on evaluation of mote.css. Ten independent agents
each build one realistic temporary webpage using the library, then
report honestly on developer experience. This round tests v{{VERSION}},
which just shipped:

{{NEW_FEATURES}}

{{LIBRARY_FACTS — the block assembled per "Filling the context contract"}}

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

Scratch mechanics (stable, part of every round):

```
- Scratch workspace: `{{OS-TEMP}}\mote-tmp\round{{N}}\` — contains fresh
  copies of the two stylesheets. Link them RELATIVELY:
  `<link rel="stylesheet" href="mote.css">`.
- Write your page to `<scratch>/<your-page>.html` and your report to
  `<scratch>/report-<name>.md`. If either file already exists,
  overwrite it completely.
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

Seventy used across rounds 5–11 — do not repeat. Track additions here.

**Used (round 5):** pricing, blog post, login, 404, settings, dashboard,
knowledge-base, landing, release-notes, contact.
**Used (round 6):** forum thread, product page, status page, checkout,
inbox, photo gallery, profile, FAQ help-center, poll, playlist.
**Used (round 7):** chat, job board, calendar, recipe, transactions,
course lesson, search results, team, hotel booking, podcast episode.
**Used (round 8):** event registration, comparison/review, docs version
landing, migration guide, wiki edit history, support ticket queue,
appointment scheduling, invoice/receipt, legal/terms, book chapter.
**Used (round 9):** cookbook index, offline/print-first document,
real-estate listing, app-store page, spec comparison, member onboarding,
community guidelines, archive/tag index, download checksums, API reference.
**Used (round 10):** notification settings, admin user table, achievement
profile, form-builder preview, release timeline, community directory,
embeddable support widget, transit departures, match scorecard,
accessibility statement.
**Used (round 11):** airport check-in counter status board, warehouse
inventory exception report, volunteer shift signup, parcel tracking timeline,
digital museum collection record, nonprofit donation campaign, library
catalog search, property-maintenance request form, cybersecurity incident
bulletin, emergency-preparedness checklist.
**Used (round 12):** tax-document organizer, restaurant menu, weather forecast,
sports fixture schedule, pet adoption listing, museum exhibition guide, map
directions, workout plan, university thesis repository, government benefits
application guide.

**Candidates (unexercised):** music album discography.

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
- **JavaScript allowlists must match the docs**: when a brief needs a
  documented JavaScript workflow (for example, `beforeprint` / `afterprint`
  to print closed `<details>` content), include that workflow in the shared
  contract. A contract that excludes the documented solution cannot turn
  the resulting limitation into a library finding.
- **Print verification**: use the underlying page's native
  `emulateMediaType('print')`, not a higher-level wrapper emulation option;
  generate and inspect PDFs for paper claims; isolate browser sessions when
  concurrent PDF generation could capture another page.
- **Conventions**: `EVALUATION-R<N>.md` is deleted only when the round's
  fixes ship; the round takes no fix actions until the user says so.
- **Fix-phase reminders** (for after the user approves): docs edits are
  entity-escaped (`<`/`>` in `<pre><code>`) — build old-strings with a
  runtime `esc()` helper, never literal angle brackets; `<pre>` blocks
  are two-space indented; verify every anchor with one grep pass BEFORE
  a multi-edit script because a failed assert discards all in-memory
  edits; verify CSS changes via live computed-style probes, then pin
  them in `tests/fixture.html`.
