# @madr/compositions — session state (2026-04-25)

## Purpose

Remotion composition components for the MADR trailer system. Pure React + Remotion + Zod — no Next.js, no main-app dependencies. Depends on `@madr/core` for tokens/themes; everything else (react, remotion, @remotion/google-fonts, qrcode.react, zod) is a peer dep so consumers control versions.

## Consumers

- `madr-trailers/src/Root.tsx` — registers components with `<Composition>` tags + inline `defaultProps` (Studio's Save-to-code rewrites them in place; do not refactor to constants).
- `movie-a-day-review/src/app/admin/trailers/[id]/TrailerPlayer.tsx` — embeds components in `@remotion/player` for live preview.

## Exports

| Path | Contents |
|---|---|
| `@madr/compositions` | All re-exports from `src/index.ts` (use this) |
| `./compositions/*` | `Teaser15`, `Trailer30`, `Trailer60`, `TodaysReview`, `QuoteCard`, `Top5Countdown`, `Showcase` |
| `./brand/fonts` | `loadMadrFonts()` — idempotent, call once on the client before mounting `<Player>` |
| `./brand/{ThemeContext,Monogram,GoldRule,themes,tokens}` | brand utilities |
| `./scenes/{MoviePoster,CountdownItem,...}` | individual scene components if you want to compose custom shapes |
| `./effects/{GrainVignette,Captions}` | overlay layers |

## Critical conventions

- **No `.js` extensions in relative re-exports.** Remotion's webpack resolver doesn't map them to `.ts`/`.tsx`. TypeScript with `moduleResolution: "bundler"` happily resolves either way; webpack does not. `src/index.ts` re-exports all use bare paths.
- **Each composition exports `<Name>`, `<name>Schema`, `<name>Total`.** The `Total(props)` helper is used by both madr-trailers' `calculateMetadata` and the editor's `<Player durationInFrames>`.
- **Schemas use the shared helpers from `compositions/shared.ts`** (`themeControlSchema`, `outroSchema`, `captionsSchema`) for consistency.
- **Field-name collisions matter.** The main app's editor uses `hasObject(config, "fieldName")` to decide which form section to render. New compositions should not reuse existing field names with different shapes (TodaysReview's quote field was renamed `pullQuote` for this reason).

## Adding a composition

1. Build the React component in `src/compositions/<Name>.tsx`. Reuse scenes from `src/scenes/` where possible. Export `<Name>`, `<name>Schema`, `<name>Total`.
2. Add to `src/index.ts` re-exports.
3. Push.
4. In `@madr/core/src/compositions.ts`: add to `CompositionId` union, `COMPOSITION_LABELS`, `VARIANT_COMPOSITIONS`, `DEFAULTS`. Push.
5. In `madr-trailers/src/Root.tsx`: add 3 `<Composition>` tags (landscape / square / vertical) with inline `defaultProps`. `npm install @madr/compositions@github:movieadayreview/madr-compositions` to bump lockfile. Push.
6. In `movie-a-day-review/src/app/admin/trailers/new/page.tsx`: add to `ORDER` + `hintForComposition`.
7. In `movie-a-day-review/src/app/admin/trailers/[id]/TrailerPlayer.tsx`: add to `resolve()` switch (component + Total helper).
8. In `movie-a-day-review/src/app/admin/trailers/[id]/TrailerEditor.tsx`: add a field section if the composition has prop shapes the existing TextCardSection / BeatsSection / etc. don't already cover.
9. `npm install @madr/core@github:... @madr/compositions@github:...` in main app to bump lockfile. Push.

A test render via `gh workflow run render.yml --repo movieadayreview/madr-trailers -f compositionId=<NewName> -f propsJson='{}' -f webhookUrl=` confirms CI works end-to-end.
