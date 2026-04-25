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

const quoteSchema = z.object({
  enabled: z.boolean(),
  quote: z.string(),
  attribution: z.string().optional(),
  durationFrames: z.number().min(30).max(600),
});

export const trailer30Schema = z.object({
  ...themeControlSchema.shape,
  logoDurationFrames: z.number().min(30).max(600),
  intro: z.object({
    eyebrow: z.string(),
    headline: z.string(),
    subhead: z.string().optional(),
    durationFrames: z.number().min(30).max(600),
  }),
  beats: z.array(beatSchema),
  quote: quoteSchema,
  closer: z.object({
    headline: z.string(),
    durationFrames: z.number().min(30).max(600),
  }),
  outro: outroSchema,
  captions: captionsSchema,
});

export const trailer30Total = (p: z.infer<typeof trailer30Schema>) =>
  p.logoDurationFrames +
  p.intro.durationFrames +
  p.beats.reduce((sum, b) => sum + b.durationFrames, 0) +
  (p.quote.enabled ? p.quote.durationFrames : 0) +
  p.closer.durationFrames +
  p.outro.durationFrames;

export const Trailer30: React.FC<z.infer<typeof trailer30Schema>> = ({
  theme,
  grain,
  vignette,
  logoDurationFrames,
  intro,
  beats,
  quote,
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
            <LogoReveal size={420} />
          </Series.Sequence>
          <Series.Sequence durationInFrames={intro.durationFrames}>
            <TaglineCard
              eyebrow={intro.eyebrow}
              headline={intro.headline}
              subhead={intro.subhead}
            />
          </Series.Sequence>
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
