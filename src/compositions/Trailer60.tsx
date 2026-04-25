import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { z } from "zod";
import { THEMES } from "../brand/themes";
import { ThemeProvider } from "../brand/ThemeContext";
import { GrainVignette } from "../effects/GrainVignette";
import { Captions } from "../effects/Captions";
import { LogoReveal } from "../scenes/LogoReveal";
import { TaglineCard } from "../scenes/TaglineCard";
import { BrandBeat } from "../scenes/BrandBeat";
import { PullQuote } from "../scenes/PullQuote";
import { Stats } from "../scenes/Stats";
import { OutroCTA } from "../scenes/OutroCTA";
import { QrEndCard } from "../scenes/QrEndCard";
import {
  themeControlSchema,
  captionsSchema,
  outroSchema,
} from "./shared";

const beatSchema = z.object({
  label: z.string(),
  title: z.string(),
  blurb: z.string(),
  durationFrames: z.number().min(30).max(600),
});

const longTaglineSchema = z.object({
  eyebrow: z.string().optional(),
  headline: z.string(),
  subhead: z.string().optional(),
  durationFrames: z.number().min(30).max(600),
});

const statsSchema = z.object({
  enabled: z.boolean(),
  headline: z.string().optional(),
  items: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    }),
  ),
  durationFrames: z.number().min(30).max(600),
});

const quoteSchema = z.object({
  enabled: z.boolean(),
  quote: z.string(),
  attribution: z.string().optional(),
  durationFrames: z.number().min(30).max(600),
});

export const trailer60Schema = z.object({
  ...themeControlSchema.shape,
  logoDurationFrames: z.number().min(30).max(600),
  manifesto: longTaglineSchema,
  stats: statsSchema,
  beats: z.array(beatSchema),
  quote: quoteSchema,
  promise: longTaglineSchema,
  closer: z.object({
    headline: z.string(),
    durationFrames: z.number().min(30).max(600),
  }),
  outro: outroSchema,
  captions: captionsSchema,
});

export const trailer60Total = (p: z.infer<typeof trailer60Schema>) =>
  p.logoDurationFrames +
  p.manifesto.durationFrames +
  (p.stats.enabled ? p.stats.durationFrames : 0) +
  p.beats.reduce((sum, b) => sum + b.durationFrames, 0) +
  (p.quote.enabled ? p.quote.durationFrames : 0) +
  p.promise.durationFrames +
  p.closer.durationFrames +
  p.outro.durationFrames;

export const Trailer60: React.FC<z.infer<typeof trailer60Schema>> = ({
  theme,
  grain,
  vignette,
  logoDurationFrames,
  manifesto,
  stats,
  beats,
  quote,
  promise,
  closer,
  outro,
  captions,
}) => {
  const t = THEMES[theme];
  return (
    <ThemeProvider theme={t}>
      <AbsoluteFill style={{ background: t.black }}>
        <Series>
          <Series.Sequence durationInFrames={logoDurationFrames}>
            <LogoReveal size={460} />
          </Series.Sequence>
          <Series.Sequence durationInFrames={manifesto.durationFrames}>
            <TaglineCard
              eyebrow={manifesto.eyebrow}
              headline={manifesto.headline}
              subhead={manifesto.subhead}
            />
          </Series.Sequence>
          {stats.enabled ? (
            <Series.Sequence durationInFrames={stats.durationFrames}>
              <Stats headline={stats.headline} stats={stats.items} />
            </Series.Sequence>
          ) : null}
          {beats.map((b, i) => (
            <Series.Sequence
              key={`${b.label}-${i}`}
              durationInFrames={b.durationFrames}
            >
              <BrandBeat
                label={b.label}
                title={b.title}
                blurb={b.blurb}
                index={i}
                total={beats.length}
              />
            </Series.Sequence>
          ))}
          {quote.enabled ? (
            <Series.Sequence durationInFrames={quote.durationFrames}>
              <PullQuote quote={quote.quote} attribution={quote.attribution} />
            </Series.Sequence>
          ) : null}
          <Series.Sequence durationInFrames={promise.durationFrames}>
            <TaglineCard
              eyebrow={promise.eyebrow}
              headline={promise.headline}
              subhead={promise.subhead}
            />
          </Series.Sequence>
          <Series.Sequence durationInFrames={closer.durationFrames}>
            <TaglineCard headline={closer.headline} />
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
