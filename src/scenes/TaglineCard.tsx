import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { FONT } from "../brand/tokens";
import { useTheme } from "../brand/ThemeContext";
import { GoldRule } from "../brand/GoldRule";

type Props = {
  eyebrow?: string;
  headline: string;
  subhead?: string;
};

export const TaglineCard: React.FC<Props> = ({
  eyebrow,
  headline,
  subhead,
}) => {
  const frame = useCurrentFrame();
  const theme = useTheme();
  const headlineOpacity = interpolate(frame, [6, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headlineY = interpolate(frame, [6, 22], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subOpacity = interpolate(frame, [20, 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const eyebrowOpacity = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: theme.black,
        padding: "0 8%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        gap: 28,
      }}
    >
      {eyebrow ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            opacity: eyebrowOpacity,
          }}
        >
          <GoldRule width={56} startFrame={0} durationFrames={14} />
          <div
            style={{
              fontFamily: FONT.display,
              color: theme.gold,
              fontSize: 22,
              letterSpacing: "0.36em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            {eyebrow}
          </div>
          <GoldRule width={56} startFrame={0} durationFrames={14} />
        </div>
      ) : null}

      <div
        style={{
          fontFamily: FONT.display,
          color: theme.cream,
          fontSize: 112,
          fontWeight: 500,
          letterSpacing: "-0.04em",
          lineHeight: 1.02,
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
          maxWidth: "22ch",
          textWrap: "balance",
        }}
      >
        {headline}
      </div>

      {subhead ? (
        <div
          style={{
            fontFamily: FONT.display,
            color: theme.creamDim,
            fontSize: 32,
            fontWeight: 400,
            letterSpacing: "0.01em",
            lineHeight: 1.35,
            opacity: subOpacity,
            maxWidth: "42ch",
            textWrap: "balance",
          }}
        >
          {subhead}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
