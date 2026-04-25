import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { z } from "zod";
import { THEMES } from "../brand/themes";
import { ThemeProvider } from "../brand/ThemeContext";
import { GrainVignette } from "../effects/GrainVignette";
import { Captions } from "../effects/Captions";
import { LogoReveal } from "../scenes/LogoReveal";
import { TaglineCard } from "../scenes/TaglineCard";
import { OutroCTA } from "../scenes/OutroCTA";
import { QrEndCard } from "../scenes/QrEndCard";
import {
  themeControlSchema,
  captionsSchema,
  outroSchema,
} from "./shared";

export const teaser15Schema = z.object({
  ...themeControlSchema.shape,
  logoDurationFrames: z.number().min(30).max(600),
  tagline: z.object({
    eyebrow: z.string(),
    headline: z.string(),
    durationFrames: z.number().min(30).max(600),
  }),
  outro: outroSchema,
  captions: captionsSchema,
});

export const teaser15Total = (p: z.infer<typeof teaser15Schema>) =>
  p.logoDurationFrames + p.tagline.durationFrames + p.outro.durationFrames;

export const Teaser15: React.FC<z.infer<typeof teaser15Schema>> = ({
  theme,
  grain,
  vignette,
  logoDurationFrames,
  tagline,
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
          <Series.Sequence durationInFrames={tagline.durationFrames}>
            <TaglineCard eyebrow={tagline.eyebrow} headline={tagline.headline} />
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
