# @madr/compositions

Remotion composition components for the MADR trailer system. Consumed by:

- **`madr-trailers`** — registers each composition with a `<Composition>` tag in `src/Root.tsx`, so Studio + the `npx remotion render` CLI can find them.
- **`movie-a-day-review` `/admin/trailers/[id]`** — embeds them in `@remotion/player` for live preview as the user edits text.

Both consumers install via:

```json
{
  "dependencies": {
    "@madr/compositions": "github:movieadayreview/madr-compositions"
  }
}
```

The package depends on [`@madr/core`](https://github.com/movieadayreview/madr-core) for tokens, themes, and composition metadata. `react`, `remotion`, `@remotion/google-fonts`, `qrcode.react`, and `zod` are peer deps — every consumer pins those itself.

## Exports

| Path                                     | Contents                                                    |
| ---------------------------------------- | ----------------------------------------------------------- |
| `@madr/compositions`                     | Everything (re-exported from `src/index.ts`)                |
| `@madr/compositions/compositions/*`      | `Teaser15`, `Trailer30`, `Trailer60`, `Showcase`, `shared`  |
| `@madr/compositions/brand/fonts`         | `loadMadrFonts()` — call once in your client entry          |
| `@madr/compositions/brand/ThemeContext`  | `ThemeProvider`, `useTheme`                                 |
| `@madr/compositions/brand/Monogram`      | 2×2 monogram React component                                |
| `@madr/compositions/brand/GoldRule`      | Gold horizontal rule                                        |
| `@madr/compositions/brand/themes`        | Re-exports from `@madr/core/themes`                         |
| `@madr/compositions/brand/tokens`        | Re-exports from `@madr/core/tokens`                         |
| `@madr/compositions/scenes/*`            | Individual scene components                                 |
| `@madr/compositions/effects/*`           | `Captions`, `GrainVignette`                                 |

## Important: defaultProps stay in madr-trailers' Root.tsx

Remotion Studio's "Save" feature rewrites the `defaultProps` literals inline in `<Composition>` tags. They cannot be replaced with imported constants without breaking that workflow. So `madr-trailers/src/Root.tsx` keeps the literals; this package owns the *components* and *schemas*. Programmatic defaults (used by the main app's admin form and the GH Actions render workflow) live in `@madr/core/compositions.ts`.

## Updating

1. Edit a composition or scene here.
2. Push.
3. In each consumer, run `npm install @madr/compositions` (forces re-fetch of the github URL) or just `npm install` if the package is being pinned to `main`.
