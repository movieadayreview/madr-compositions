import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { FONT } from "./tokens";
import { useTheme } from "./ThemeContext";

type Props = {
  size?: number;
  startFrame?: number;
  staggerFrames?: number;
};

const CELLS: Array<{ letter: string; row: number; col: number }> = [
  { letter: "M", row: 0, col: 0 },
  { letter: "A", row: 0, col: 1 },
  { letter: "D", row: 1, col: 0 },
  { letter: "R", row: 1, col: 1 },
];

export const Monogram: React.FC<Props> = ({
  size = 360,
  startFrame = 0,
  staggerFrames = 4,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();
  const cell = size / 2;
  const strokeW = Math.max(2, size * 0.008);

  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
      }}
    >
      {CELLS.map((c, i) => {
        const local = frame - startFrame - i * staggerFrames;
        const appear = spring({
          frame: local,
          fps,
          config: { damping: 200, stiffness: 140, mass: 0.7 },
        });
        const opacity = interpolate(local, [0, 6], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={c.letter}
            style={{
              width: cell,
              height: cell,
              border: `${strokeW}px solid ${theme.gold}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: FONT.display,
              color: theme.gold,
              fontWeight: 600,
              fontSize: cell * 0.56,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              opacity,
              transform: `scale(${0.85 + appear * 0.15})`,
              transformOrigin: "center",
            }}
          >
            {c.letter}
          </div>
        );
      })}
    </div>
  );
};
