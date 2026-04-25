import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { FONT } from "../brand/tokens";
import { useTheme } from "../brand/ThemeContext";

type Props = {
  quote: string;
  attribution?: string;
};

export const PullQuote: React.FC<Props> = ({ quote, attribution }) => {
  const frame = useCurrentFrame();
  const theme = useTheme();
  const markOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const quoteOpacity = interpolate(frame, [8, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const quoteY = interpolate(frame, [8, 28], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const attrOpacity = interpolate(frame, [22, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: theme.black,
        padding: "0 14%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 32,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: FONT.display,
          color: theme.gold,
          fontSize: 180,
          lineHeight: 0.6,
          fontWeight: 500,
          opacity: markOpacity,
          height: 80,
        }}
      >
        &ldquo;
      </div>
      <div
        style={{
          fontFamily: FONT.display,
          color: theme.cream,
          fontSize: 76,
          fontWeight: 400,
          letterSpacing: "-0.025em",
          lineHeight: 1.18,
          maxWidth: "24ch",
          opacity: quoteOpacity,
          transform: `translateY(${quoteY}px)`,
          fontStyle: "italic",
          textWrap: "balance",
        }}
      >
        {quote}
      </div>
      {attribution ? (
        <div
          style={{
            fontFamily: FONT.display,
            color: theme.goldSoft,
            fontSize: 22,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            fontWeight: 500,
            opacity: attrOpacity,
          }}
        >
          — {attribution}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
