# mote.css

> The smallest thing that can carry style — a tiny, semantic, classless CSS layer for plain HTML.

A mote of styling for plain HTML: **zero dependencies, zero build step, zero classes required**. Write semantic HTML, drop in one file, and it looks like a place you'd want to stay a while — modern, warm, unobtrusive. Inspired by the quiet excellence of [oat](https://github.com/knadh/oat), with its own cozy voice.

Source on [GitLab](https://gitlab.com/abmach/mote) · mirrored on [GitHub](https://github.com/abmach/mote).

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="mote.css">
  </head>
  <body>
    <main>
      <h1>Hello, cozy.</h1>
      <p>That's the whole setup.</p>
    </main>
  </body>
</html>
```

## Principles

- **Semantic HTML is the API.** mote styles elements by what they *are* — headings, forms, `dialog`, `menu` — not by the classes they wear. Classes exist only where the platform has no semantic carrier (a "card" is not a semantic concept).
- **The platform before the library.** Interactive components ride on native features: `popover`, `dialog`, `<details name>`, `:user-invalid`. Where the browser can do it, mote never ships JavaScript to do it worse.
- **Tokens all the way down.** Every color, radius, shadow, font and status is a `--mote-*` custom property, and derived tones are computed with `color-mix()`. Status classes set tokens and nothing else — one override re-skins every note, badge and toast. Re-theme by overriding variables, never by fighting selectors.
- **Weightless by default.** `mote.css` styles your elements; `mote.components.css` is opt-in and CSS-only. You ship zero bytes of library JavaScript, ever.
- **Framework-agnostic.** It's just CSS — plain HTML, Svelte, Vue, React, HTMX, PHP, your CMS, anything.
- **Cozy, and unobtrusive about it.** Warm neutrals, soft edges, generous rhythm — styling that never shouts. Automatic light/dark, AA+ contrast, visible focus, reduced-motion respected.

## Install

**CDN** — jsDelivr, serving the npm package, with auto-minified variants:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mote.css@0.2.0/mote.css">
<!-- minified variant (dotted filenames minify to <name>.min.css) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mote.css@0.2.0/mote.min.css">

<!-- optional components file -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mote.css@0.2.0/mote.components.css">
```

Use `mote.css@0` to track the latest 0.x release. CDN URLs go live once the package is published.

**npm**:

```sh
npm install mote.css
```

**Download**: [`mote.css`](mote.css) and [`mote.components.css`](mote.components.css) — link them directly.

## Theming

Everything is a variable. Override the ones you care about:

```css
:root {
  --mote-accent: #4a7a5b;   /* your brand color */
  --mote-bg: #fffdf5;       /* your paper */
  --mote-radius: 6px;       /* your edges */
}
```

### The token cascade

Values flow in layers, each computed from the last — retune a base token and everything downstream re-derives automatically:

1. **Base palette** — the raw tokens: `--mote-bg`, `--mote-fg`, `--mote-accent`, the four semantics, fonts, radii, shadows. Light values live in `:root`; dark values swap in via `prefers-color-scheme` or `data-theme`.
2. **Derived tones** — computed from the base with `color-mix()`: `--mote-accent-deep` (hover deepening), `--mote-accent-soft`, the four `--mote-*-soft` tints, `--mote-focus-ring`, `--mote-border-strong`. They can never go stale — change `--mote-accent` and every tint, ring and hover shade follows.
3. **Status indirection** — status classes assign `--mote-status` / `--mote-status-soft` and nothing else. Components read them with accent fallbacks: `color: var(--mote-status, var(--mote-accent-deep))`.

The consequence: theming is a handful of variable overrides, and an inline tweak (`style="--mote-status: …"`) slots into the same chain at any level.

### Token reference

| Token | Light | Dark | Used for |
|---|---|---|---|
| `--mote-bg` | `#faf9f7` | `#1c1a17` | Page background |
| `--mote-surface` | `#f1eee7` | `#262320` | Code blocks, cards, inputs |
| `--mote-fg` | `#2b2924` | `#eae6de` | Body text |
| `--mote-muted` | `#716a60` | `#a49c90` | Secondary text, captions |
| `--mote-border` | `#e6e0d4` | `#3b362f` | Rules, borders |
| `--mote-accent` | `#6f5486` | `#b8a1ca` | Links, buttons, focus, markers |
| `--mote-on-accent` | `#ffffff` | `#241d28` | Text on accent (buttons) |
| `--mote-success` | `#4e7d51` | `#8ab88c` | Positive semantics |
| `--mote-warning` | `#8a6819` | `#d4b465` | Cautious semantics |
| `--mote-error` | `#b34d4d` | `#d98a8a` | Destructive semantics |
| `--mote-info` | `#527097` | `#96b1d1` | Neutral semantics |
| `--mote-font` | `"Inter", system-ui, …` | | Content typeface stack |
| `--mote-font-mono` | `"Commit Mono", ui-monospace, …` | | Code typeface stack |
| `--mote-radius` | `10px` | | Default corner softness |
| `--mote-radius-sm` | `6px` | | Controls, inline code |
| `--mote-radius-lg` | `16px` | | Dialogs |
| `--mote-shadow` / `--mote-shadow-sm` | warm diffuse | | Elevation |
| `--mote-transition` | `150ms ease` | | Hover/focus timing |

Derived tones (soft tints, focus ring, hover deepening) are computed from these via `color-mix()`, so changing a base token re-themes everything consistently — no redundant palette bookkeeping.

### Dark mode

By default, mote follows the user's system preference. To force a theme, set an attribute on `<html>`:

```html
<html data-theme="dark">  <!-- or "light" -->
```

The accent hue is deliberately plum: it's the one family that doesn't collide with the success/warning/error/info semantics, so a link never looks like a status.

### Fonts (optional, not bundled)

mote's stacks fall back to your system fonts out of the box. For the full experience, add Inter and Commit Mono (both free; Inter is OFL, Commit Mono is OFL):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fontsource-variable/inter@5/index.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fontsource/commit-mono@5/index.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fontsource/commit-mono@5/700.css">
```

Or self-host with `npm install @fontsource-variable/inter @fontsource/commit-mono` — or any fonts you like; the stacks are just variables.

## Opt-in helpers

mote is classless by design; these are the only escape hatches, plus status classes that every status-consuming component reads:

| Class | Purpose |
|---|---|
| `.mote-container` | Centered page wrapper: `width: min(100% - 3rem, 70rem)` |
| `.mote-muted` | Dimmed secondary text (also a neutral status) |
| `.mote-note` + status class | Tinted message surfaces |
| `.mote-success` · `.mote-warning` · `.mote-error` · `.mote-info` | Pure status tokens: they only set `--mote-status` / `--mote-status-soft`, so one override re-skins every note, badge and toast |

## Components

`mote.components.css` is the optional second file: opt-in components, **CSS-only**, riding on native platform features — popovers, dialogs, exclusive `<details>` groups. No JavaScript anywhere.

| Component | Hook |
|---|---|
| Document layout (landmark grid) | `.mote-doc` on `<body>` — `:has()` reads your `header`/`nav`/`main`/`aside`/`footer` |
| Sticky site header / nav pills | `body > header` — classless; `.mote-header`/`.mote-nav` only for shells wrapped in a `<div>` |
| Breadcrumbs | `nav[aria-label="breadcrumb"]` — semantic, no class |
| Card grids | `.mote-grid` — auto-fill columns from the container, no breakpoints |
| Cards | `.mote-card` |
| Badges | `.mote-badge` + optional status class |
| Avatars | `.mote-avatar` |
| Skeleton / spinner | `.mote-skeleton`, `.mote-spinner` |
| Tooltips | `[popover].mote-tooltip` + `popovertarget` button |
| Menus | `menu[popover]` + `popovertarget` button |
| Toasts | `[popover].mote-toast` + status class |
| Exclusive accordions | `<details name="group">` — the browser closes siblings |
| Dialog & popover entrance animations | automatic when the file is loaded |

Full live documentation with copyable markup for everything above: **[docs/index.html](docs/index.html)**.

## Browser support

Modern evergreen browsers (uses `color-mix()`, `:focus-visible`, `accent-color`, `:user-invalid`):
Chrome/Edge 111+, Firefox 113+, Safari 16.2+. `color-mix()`-dependent niceties degrade gracefully on older browsers.

The components file additionally uses Baseline 2024 platform features — `popover`, `<details name>`,
`@starting-style`, `allow-discrete` — each degrading gracefully: accordions stay independent,
animations become instant, on older engines.

## Demo

Open [`docs/index.html`](docs/index.html) for the full live documentation, or [`demo.html`](demo.html) for a quick gallery of every styled element.

## License

[MIT](LICENSE). Fonts referenced by the stacks (Inter, Commit Mono) are SIL OFL 1.1 — see their respective projects.
