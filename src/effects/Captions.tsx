import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { FONT } from "../brand/tokens";
import { useTheme } from "../brand/ThemeContext";

export type Caption = {
  fromSeconds: number;
  toSeconds: number;
  text: string;
};

type Props = {
  captions: Caption[];
  fps: number;
  position?: "bottom" | "top";
};

export const Captions: React.FC<Props> = ({
  captions,
  fps,
  position = "bottom",
}) => {
  const frame = useCurrentFrame();
  const theme = useTheme();

  const active = captions.find(
    (c) => frame >= c.fromSeconds * fps && frame < c.toSeconds * fps,
  );

  if (!active) return null;

  const localFrame = frame - active.fromSeconds * fps;
  const durationFrames = (active.toSeconds - active.fromSeconds) * fps;
  const opacity = Math.min(
    interpolate(localFrame, [0, 6], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
    interpolate(localFrame, [durationFrames - 6, durationFrames], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        display: "flex",
        alignItems: position === "bottom" ? "flex-end" : "flex-start",
        justifyContent: "center",
        padding: "0 10%",
        paddingBottom: position === "bottom" ? "8%" : 0,
        paddingTop: position === "top" ? "8%" : 0,
      }}
    >
      <div
        style={{
          fontFamily: FONT.display,
          color: theme.cream,
          fontSize: 34,
          fontWeight: 500,
          letterSpacing: "0.005em",
          lineHeight: 1.25,
          textAlign: "center",
          maxWidth: "36ch",
          textWrap: "balance",
          padding: "14px 28px",
          background: "rgba(10, 10, 10, 0.82)",
          border: `1px solid rgba(212, 178, 84, 0.28)`,
          borderRadius: 8,
          opacity,
          backdropFilter: "blur(4px)",
        }}
      >
        {active.text}
      </div>
    </AbsoluteFill>
  );
};
