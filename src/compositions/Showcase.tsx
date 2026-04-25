import React from "react";
import { AbsoluteFill } from "remotion";
import { z } from "zod";
import { THEMES } from "../brand/themes";
import { ThemeProvider } from "../brand/ThemeContext";
import { GrainVignette } from "../effects/GrainVignette";
import { PullQuote } from "../scenes/PullQuote";
import { Stats } from "../scenes/Stats";
import { ImageScene } from "../scenes/ImageScene";
import { themeControlSchema } from "./shared";

export const pullQuoteShowcaseSchema = z.object({
  ...themeControlSchema.shape,
  quote: z.string(),
  attribution: z.string().optional(),
});

export const PullQuoteShowcase: React.FC<
  z.infer<typeof pullQuoteShowcaseSchema>
> = ({ theme, grain, vignette, quote, attribution }) => {
  const t = THEMES[theme];
  return (
    <ThemeProvider theme={t}>
      <AbsoluteFill>
        <PullQuote quote={quote} attribution={attribution} />
        <GrainVignette grain={grain} vignette={vignette} />
      </AbsoluteFill>
    </ThemeProvider>
  );
};

export const statsShowcaseSchema = z.object({
  ...themeControlSchema.shape,
  headline: z.string().optional(),
  items: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    }),
  ),
});

export const StatsShowcase: React.FC<z.infer<typeof statsShowcaseSchema>> = ({
  theme,
  grain,
  vignette,
  headline,
  items,
}) => {
  const t = THEMES[theme];
  return (
    <ThemeProvider theme={t}>
      <AbsoluteFill>
        <Stats headline={headline} stats={items} />
        <GrainVignette grain={grain} vignette={vignette} />
      </AbsoluteFill>
    </ThemeProvider>
  );
};

export const imageShowcaseSchema = z.object({
  ...themeControlSchema.shape,
  src: z.string(),
  label: z.string().optional(),
  caption: z.string().optional(),
  kenBurns: z.boolean(),
});

export const ImageShowcase: React.FC<z.infer<typeof imageShowcaseSchema>> = ({
  theme,
  grain,
  vignette,
  src,
  label,
  caption,
  kenBurns,
}) => {
  const t = THEMES[theme];
  return (
    <ThemeProvider theme={t}>
      <AbsoluteFill>
        <ImageScene
          src={src}
          label={label}
          caption={caption}
          kenBurns={kenBurns}
        />
        <GrainVignette grain={grain} vignette={vignette} />
      </AbsoluteFill>
    </ThemeProvider>
  );
};
