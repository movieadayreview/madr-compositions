import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { z } from "zod";
import { THEMES } from "../brand/themes";
import { ThemeProvider } from "../brand/ThemeContext";
import { GrainVignette } from "../effects/GrainVignette";
import { Captions } from "../effects/Captions";
import { PullQuote } from "../scenes/PullQuote";
import { OutroCTA } from "../scenes/OutroCTA";
import { QrEndCard } from "../scenes/QrEndCard";
import {
  themeControlSchema,
  captionsSchema,
  outroSchema,
} from "./shared";

/**
 * Quote Card — single full-screen pull quote, ~8-10s.
 * Shape: PullQuote (animated quote + attribution) → outro CTA.
 *
 * Use for: review excerpts, fan-quote-of-the-week, podcast pull quotes.
 * Tight, single-purpose, perfect for IG feed (1080x1080) or stories (vertical).
 */
export const quoteCardSchema = z.object({
  ...themeControlSchema.shape,
  quote: z.object({
    text: z.string(),
    attribution: z.string(),
    durationFrames: z.number().min(30).max(600),
  }),
  outro: outroSchema,
  captions: captionsSchema,
});

export const quoteCardTotal = (p: z.infer<typeof quoteCardSchema>) =>
  p.quote.durationFrames + p.outro.durationFrames;

export const QuoteCard: React.FC<z.infer<typeof quoteCardSchema>> = ({
  theme,
  grain,
  vignette,
  quote,
  outro,
  captions,
}) => {
  const t = THEMES[theme];
  return (
    <ThemeProvider theme={t}>
      <AbsoluteFill style={{ background: t.black }}>
        <Series>
          <Series.Sequence durationInFrames={quote.durationFrames}>
            <PullQuote quote={quote.text} attribution={quote.attribution} />
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
