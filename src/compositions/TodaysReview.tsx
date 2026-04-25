import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { z } from "zod";
import { THEMES } from "../brand/themes";
import { ThemeProvider } from "../brand/ThemeContext";
import { GrainVignette } from "../effects/GrainVignette";
import { Captions } from "../effects/Captions";
import { LogoReveal } from "../scenes/LogoReveal";
import { ImageScene } from "../scenes/ImageScene";
import { BrandBeat } from "../scenes/BrandBeat";
import { OutroCTA } from "../scenes/OutroCTA";
import { QrEndCard } from "../scenes/QrEndCard";
import {
  themeControlSchema,
  captionsSchema,
  outroSchema,
} from "./shared";

/**
 * Today's Review — single-movie spotlight, ~15-20s.
 * Shape: LogoReveal → poster (Ken Burns) with title overlay → verdict
 * (rating + one-line take, BrandBeat) → outro CTA.
 *
 * `movie.posterUrl` accepts an absolute http(s) URL or a filename relative
 * to madr-trailers/public/. Empty/missing renders the ImageScene placeholder
 * so the composition still resolves cleanly.
 */
export const todaysReviewSchema = z.object({
  ...themeControlSchema.shape,
  logoDurationFrames: z.number().min(30).max(600),
  movie: z.object({
    title: z.string(),
    year: z.string().optional(),
    posterUrl: z.string(),
    durationFrames: z.number().min(30).max(600),
  }),
  verdict: z.object({
    label: z.string(),
    rating: z.string(),
    blurb: z.string(),
    durationFrames: z.number().min(30).max(600),
  }),
  outro: outroSchema,
  captions: captionsSchema,
});

export const todaysReviewTotal = (p: z.infer<typeof todaysReviewSchema>) =>
  p.logoDurationFrames +
  p.movie.durationFrames +
  p.verdict.durationFrames +
  p.outro.durationFrames;

export const TodaysReview: React.FC<z.infer<typeof todaysReviewSchema>> = ({
  theme,
  grain,
  vignette,
  logoDurationFrames,
  movie,
  verdict,
  outro,
  captions,
}) => {
  const t = THEMES[theme];
  const movieLabel = movie.year ? `${movie.title} (${movie.year})` : movie.title;
  return (
    <ThemeProvider theme={t}>
      <AbsoluteFill style={{ background: t.black }}>
        <Series>
          <Series.Sequence durationInFrames={logoDurationFrames}>
            <LogoReveal size={420} showWordmark={false} />
          </Series.Sequence>
          <Series.Sequence durationInFrames={movie.durationFrames}>
            <ImageScene
              src={movie.posterUrl}
              label="Today's Review"
              caption={movieLabel}
              kenBurns
            />
          </Series.Sequence>
          <Series.Sequence durationInFrames={verdict.durationFrames}>
            <BrandBeat
              label={verdict.label}
              title={verdict.rating}
              blurb={verdict.blurb}
              index={0}
              total={1}
            />
          </Series.Sequence>
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
