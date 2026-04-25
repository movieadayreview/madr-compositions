import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { FONT } from "../brand/tokens";
import { useTheme } from "../brand/ThemeContext";

type Props = {
  label: string;
  title: string;
  blurb: string;
  index: number;
  total: number;
};

export const BrandBeat: React.FC<Props> = ({
  label,
  title,
  blurb,
  index,
  total,
}) => {
  const frame = useCurrentFrame();
  const theme = useTheme();
  const fadeIn = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [8, 24], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const blurbOpacity = interpolate(frame, [20, 34], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const counterValue = `0${index + 1}`.slice(-2);
  const counterTotal = `0${total}`.slice(-2);

  return (
    <AbsoluteFill
      style={{
        background: theme.black,
        padding: "8% 10%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          opacity: fadeIn,
        }}
      >
        <div
          style={{
            fontFamily: FONT.display,
            color: theme.gold,
            fontSize: 20,
            letterSpacing: "0.36em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: FONT.display,
            color: theme.creamDim,
            fontSize: 20,
            letterSpacing: "0.2em",
            fontWeight: 500,
          }}
        >
          {counterValue} <span style={{ color: theme.gold }}>/</span>{" "}
          {counterTotal}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div
          style={{
            fontFamily: FONT.display,
            color: theme.cream,
            fontSize: 148,
            fontWeight: 500,
            letterSpacing: "-0.045em",
            lineHeight: 0.95,
            transform: `translateY(${titleY}px)`,
            opacity: fadeIn,
            maxWidth: "20ch",
            textWrap: "balance",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: FONT.display,
            color: theme.creamDim,
            fontSize: 36,
            fontWeight: 400,
            letterSpacing: "0.005em",
            lineHeight: 1.3,
            maxWidth: "38ch",
            opacity: blurbOpacity,
            textWrap: "balance",
          }}
        >
          {blurb}
        </div>
      </div>

      <div
        style={{
          height: 2,
          background: theme.gold,
          transform: `scaleX(${fadeIn})`,
          transformOrigin: "left center",
          opacity: 0.6,
        }}
      />
    </AbsoluteFill>
  );
};
