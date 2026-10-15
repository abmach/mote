# mote.css

> The smallest thing that can carry style — a tiny, semantic, classless CSS layer for plain HTML.

A mote of styling for plain HTML: **zero dependencies, zero build step, zero classes required**. Write semantic HTML, drop in one file, and it looks like a place you'd want to stay a while — modern, warm, unobtrusive. Inspired by the quiet excellence of [oat](https://github.com/knadh/oat), with its own cozy voice.

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

## Why mote

- **Classless & semantic** — styles elements by tag, not by utility soup. Your HTML stays clean and portable.
- **One variable-driven token system** — every color, radius, shadow and font flows from `--mote-*` custom properties. Re-theme the whole library in a handful of lines, no rebuild, no preprocessor.
- **Zero dependencies** — `mote.css` is a single ~15 KB file. No JavaScript, no framework tie-ins, no `@font-face` payloads.
- **Framework-agnostic** — it's just CSS. Use it with plain HTML, Svelte, Vue, React, HTMX, PHP, your CMS, anything.
- **Light & dark, automatically** — warm-paper light and warm-charcoal dark themes, honoring `prefers-color-scheme`, with manual overrides.
- **Accessible by default** — every token pair passes WCAG AA contrast or better; visible focus rings; reduced-motion respected.
- **Modern CSS, honestly used** — `color-mix()` for derived tones (graceful degradation), `:focus-visible`, `accent-color`, native `dialog`, `:user-invalid`.

## Install

**Download** [`mote.css`](mote.css) and link it:

```html
<link rel="stylesheet" href="mote.css">
```

**npm** (when published):

```sh
npm install mote.css
```

## Theming

Everything is a variable. Override the ones you care about:

```css
:root {
  --mote-accent: #4a7a5b;   /* your brand color */
  --mote-bg: #fffdf5;       /* your paper */
  --mote-radius: 6px;       /* your edges */
}
```

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

mote is classless, but three tiny helpers cover the gaps semantics can't:

| Class | Purpose |
|---|---|
| `.mote-container` | Centered page wrapper: `width: min(100% - 3rem, 70rem)` |
| `.mote-muted` | Dimmed secondary text |
| `.mote-note` + `.mote-note-{success,warning,error,info}` | Tinted message surfaces |

## Browser support

Modern evergreen browsers (uses `color-mix()`, `:focus-visible`, `accent-color`, `:user-invalid`):
Chrome/Edge 111+, Firefox 113+, Safari 16.2+. `color-mix()`-dependent niceties degrade gracefully on older browsers.

## Demo

Open [`demo.html`](demo.html) for a gallery of every styled element — typography, inline text, lists, code, tables, all form controls, `details`, `dialog`, `progress`/`meter`, and both themes.

## Contributing

The project lives at [github.com/abmach/mote](https://github.com/abmach/mote) — issues and pull requests welcome there. Keep contributions in the spirit of the project: small, semantic, zero dependencies.

## License

[MIT](LICENSE). Fonts referenced by the stacks (Inter, Commit Mono) are SIL OFL 1.1 — see their respective projects.
