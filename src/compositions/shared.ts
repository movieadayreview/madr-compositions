import { z } from "zod";
import { THEME_NAMES } from "../brand/themes";

export const themeControlSchema = z.object({
  theme: z.enum(THEME_NAMES),
  grain: z.boolean(),
  vignette: z.boolean(),
});

export const captionsSchema = z.array(
  z.object({
    fromSeconds: z.number().min(0),
    toSeconds: z.number().min(0),
    text: z.string(),
  }),
);

export const outroSchema = z.object({
  type: z.enum(["simple", "qr"]),
  url: z.string(),
  displayUrl: z.string().optional(),
  durationFrames: z.number().min(30).max(600),
});
