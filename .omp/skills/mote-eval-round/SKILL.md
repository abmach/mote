---
name: mote-eval-round
description: Dispatch a ten-agent build round against the current mote.css release — each agent builds one realistic page in OS-temp scratch, verifies it in a browser, and reports DX honestly; then compile the aggregate evaluation. Use whenever the user asks for a test round, evaluation round, or "another round of tests" on mote.
---

# mote.css evaluation round

A build round = ten independent agents, each building one realistic page
against the **just-shipped** release, then reporting developer experience
honestly. Rounds find real bugs, doc gaps, and design friction that review
rounds miss; three rounds of fixes trace almost entirely to them.

Read `skill://mote-eval-round/reference.md` before dispatching — it holds
the verbatim context contract, report template, archetype pool, and the
learned protocols (respawns, scratch rules). Do not
improvise those pieces; they encode real failures.

## Flow

1. **Pre-flight** (from reference.md):
   - Confirm the registry's `dist-tags.latest` matches the working copy
     (the round tests the *shipped* release, or the staged next one if
     the user says so).
   - Create `<os-temp>/mote-tmp/round<N>/` and copy the two stylesheets
     in fresh. Never put scratch inside the repo.
2. **Pick archetypes** from the pool in reference.md — ten per round,
   never repeating any previous round's pages. Each brief names what the
   page should exercise, including the current release's new features.
3. **Dispatch** one `task` call with the shared context (reference.md
   contract, filled in) + ten self-contained briefs, on the default
   model.
4. **Wait; respawn failures.** Provider TCP drops kill ~1 in 10 agents
   mid-build — respawn with the same brief; keep completed results.
5. **Gather** all ten reports; compile `EVALUATION-R<N>.md` in the repo
   root using the aggregate structure in reference.md.
6. **Present** the summary and STOP. No fixes until the user says so.
   The evaluation file is deleted only when the round's fixes ship.

## Hard rules

- Builders touch ONLY the scratch directory. Never let them near the
  repo, git, or previous rounds' files.
- The round reports honestly or it is worthless: praise must be earned,
  and every friction point lands in the report even if the builder
  worked around it.
- Ten pages, ten reports — a round is not complete with fewer. Respawn
  until all ten deliver.
- After fixes ship: `tests/fixture.html` must be green (title = PASS)
  before any tag, per the repo's `AGENTS.md` regression gate.
