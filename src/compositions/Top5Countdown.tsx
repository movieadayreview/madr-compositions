import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { z } from "zod";
import { THEMES } from "../brand/themes";
import { ThemeProvider } from "../brand/ThemeContext";
import { GrainVignette } from "../effects/GrainVignette";
import { Captions } from "../effects/Captions";
import { LogoReveal } from "../scenes/LogoReveal";
import { TaglineCard } from "../scenes/TaglineCard";
import { CountdownItem } from "../scenes/CountdownItem";
import { OutroCTA } from "../scenes/OutroCTA";
import { QrEndCard } from "../scenes/QrEndCard";
import {
  themeControlSchema,
  captionsSchema,
  outroSchema,
} from "./shared";

/**
 * Top-5 Countdown — numbered list of movies, ~30-45s.
 * Shape: LogoReveal → intro card (eyebrow + headline) → N item slides
 * (each = CountdownItem with #rank + title + rating chip + optional blurb)
 * → outro CTA.
 *
 * The schema accepts a flexible `items` array so you can do Top-3 or Top-7
 * by adjusting length. The ranks are user-controlled so you can render them
 * in any order (5 → 4 → 3 → 2 → 1, or any other ordering).
 */
export const top5CountdownSchema = z.object({
  ...themeControlSchema.shape,
  logoDurationFrames: z.number().min(30).max(600),
  intro: z.object({
    eyebrow: z.string(),
    headline: z.string(),
    durationFrames: z.number().min(30).max(600),
  }),
  items: z.array(
    z.object({
      rank: z.number().min(1).max(99),
      title: z.string(),
      rating: z.string(),
      blurb: z.string().optional(),
      durationFrames: z.number().min(30).max(600),
      // Optional poster + year + tmdbId. When posterUrl is set, the item
      // renders with the poster-led layout (cinematic backdrop + foreground
      // poster + rank-as-corner-badge). When empty, falls back to the
      // original rank-glyph layout. tmdbId is only stored so re-edits can
      // re-fetch the poster detail without a fresh search.
      posterUrl: z.string().optional(),
      year: z.string().optional(),
      tmdbId: z.number().optional(),
    }),
  ),
  outro: outroSchema,
  captions: captionsSchema,
});

export const top5CountdownTotal = (
  p: z.infer<typeof top5CountdownSchema>,
) =>
  p.logoDurationFrames +
  p.intro.durationFrames +
  p.items.reduce((sum, item) => sum + item.durationFrames, 0) +
  p.outro.durationFrames;

export const Top5Countdown: React.FC<
  z.infer<typeof top5CountdownSchema>
> = ({
  theme,
  grain,
  vignette,
  logoDurationFrames,
  intro,
  items,
  outro,
  captions,
}) => {
  const t = THEMES[theme];
  return (
    <ThemeProvider theme={t}>
      <AbsoluteFill style={{ background: t.black }}>
        <Series>
          <Series.Sequence durationInFrames={logoDurationFrames}>
            <LogoReveal size={420} showWordmark={false} />
          </Series.Sequence>
          <Series.Sequence durationInFrames={intro.durationFrames}>
            <TaglineCard eyebrow={intro.eyebrow} headline={intro.headline} />
          </Series.Sequence>
          {items.map((item, i) => (
            <Series.Sequence
              key={`${i}-${item.rank}`}
              durationInFrames={item.durationFrames}
            >
              <CountdownItem
                rank={item.rank}
                title={item.title}
                rating={item.rating}
                blurb={item.blurb}
                posterUrl={item.posterUrl}
                year={item.year}
              />
            </Series.Sequence>
          ))}
          <Series.Sequence durationInFrames={outro.durationFrames}>
            {outro.type === "qr" ? (
              <QrEndCard url={outro.url} displayUrl={outro.displayUrl} />
            ) : (
              <OutroCTA url={outro.displayUrl ?? outro.url} />
            )}
          </Series.Sequence>
        </Series>
        <GrainVignette grain={grain} vignette={vignette} />
        <Captions captions={captions} fps={30} />
      </AbsoluteFill>
    </ThemeProvider>
  );
};
