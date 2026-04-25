import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { FONT } from "../brand/tokens";
import { useTheme } from "../brand/ThemeContext";
import { Monogram } from "../brand/Monogram";

type Props = {
  size?: number;
  showWordmark?: boolean;
};

export const LogoReveal: React.FC<Props> = ({
  size = 420,
  showWordmark = true,
}) => {
  const frame = useCurrentFrame();
  const theme = useTheme();
  const wordmarkOpacity = interpolate(frame, [24, 38], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const wordmarkY = interpolate(frame, [24, 38], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const vignette = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: theme.black }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(212,178,84,${
            0.08 * vignette
          }) 0%, rgba(10,10,10,0) 55%)`,
        }}
      />
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 28,
        }}
      >
        <Monogram size={size} startFrame={4} staggerFrames={5} />
        {showWordmark ? (
          <div
            style={{
              fontFamily: FONT.display,
              color: theme.cream,
              fontSize: size * 0.11,
              letterSpacing: "0.32em",
              fontWeight: 400,
              opacity: wordmarkOpacity,
              transform: `translateY(${wordmarkY}px)`,
              textTransform: "uppercase",
            }}
          >
            Movie A Day Review
          </div>
        ) : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
