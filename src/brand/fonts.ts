import { loadFont } from "@remotion/google-fonts/SpaceGrotesk";

let loaded = false;

/**
 * Load the MADR brand font (Space Grotesk) into the page. Idempotent —
 * subsequent calls are no-ops, so it's safe to call from multiple components.
 *
 * In `madr-trailers/src/Root.tsx` this is called at module scope so Studio +
 * CLI renders pick up the font before any composition mounts. In the main
 * app's TrailerEditor, call it inside a `useEffect` before mounting the
 * `<Player>`.
 */
export function loadMadrFonts(): void {
  if (loaded) return;
  loaded = true;
  loadFont();
}
