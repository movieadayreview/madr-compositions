import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { FONT } from "../brand/tokens";
import { useTheme } from "../brand/ThemeContext";

type Props = {
  rank: number;
  title: string;
  rating: string;
  blurb?: string;
};

/**
 * One slide in a Top-5-style countdown. Big rank glyph on the left, title +
 * rating chip + optional blurb stacked on the right. Title and rating wipe
 * in from below; the rank glyph fades + crops in.
 */
export const CountdownItem: React.FC<Props> = ({
  rank,
  title,
  rating,
  blurb,
}) => {
  const frame = useCurrentFrame();
  const theme = useTheme();

  const rankFade = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rankClip = interpolate(frame, [0, 18], [60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [10, 26], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleOpacity = interpolate(frame, [10, 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ratingOpacity = interpolate(frame, [22, 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const blurbOpacity = interpolate(frame, [30, 48], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: theme.black,
        padding: "8% 8%",
        display: "flex",
        alignItems: "center",
        gap: 60,
      }}
    >
      {/* Big rank glyph */}
      <div
        style={{
          fontFamily: FONT.display,
          color: theme.gold,
          fontSize: 540,
          fontWeight: 700,
          lineHeight: 0.85,
          letterSpacing: "-0.06em",
          opacity: rankFade,
          transform: `translateY(${rankClip}px)`,
          flexShrink: 0,
        }}
      >
        #{rank}
      </div>

      {/* Stacked title + rating chip + blurb */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 28,
          flex: 1,
          minWidth: 0,
        }}
      >
        <div
          style={{
            fontFamily: FONT.display,
            color: theme.cream,
            fontSize: 96,
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: 1.0,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            textWrap: "balance",
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            opacity: ratingOpacity,
          }}
        >
          <span
            style={{
              fontFamily: FONT.display,
              color: theme.black,
              background: theme.gold,
              borderRadius: 999,
              padding: "10px 22px",
              fontSize: 36,
              fontWeight: 700,
              letterSpacing: "0.02em",
              lineHeight: 1,
            }}
          >
            {rating}
          </span>
        </div>

        {blurb ? (
          <div
            style={{
              fontFamily: FONT.display,
              color: theme.creamDim,
              fontSize: 32,
              fontWeight: 400,
              letterSpacing: "0.005em",
              lineHeight: 1.3,
              maxWidth: "32ch",
              opacity: blurbOpacity,
              textWrap: "balance",
            }}
          >
            {blurb}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
