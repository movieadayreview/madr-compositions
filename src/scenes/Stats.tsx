import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";
import { FONT } from "../brand/tokens";
import { useTheme } from "../brand/ThemeContext";

type Stat = {
  value: string;
  label: string;
};

type Props = {
  headline?: string;
  stats: Stat[];
};

export const Stats: React.FC<Props> = ({ headline, stats }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();
  const headlineOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: theme.black,
        padding: "6% 8%",
        display: "flex",
        flexDirection: "column",
        gap: 60,
        justifyContent: "center",
      }}
    >
      {headline ? (
        <div
          style={{
            fontFamily: FONT.display,
            color: theme.gold,
            fontSize: 22,
            letterSpacing: "0.36em",
            textTransform: "uppercase",
            fontWeight: 500,
            opacity: headlineOpacity,
            textAlign: "center",
          }}
        >
          {headline}
        </div>
      ) : null}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
          gap: 40,
        }}
      >
        {stats.map((s, i) => {
          const local = frame - 10 - i * 8;
          const appear = spring({
            frame: local,
            fps,
            config: { damping: 200, stiffness: 120, mass: 0.8 },
          });
          const y = interpolate(appear, [0, 1], [30, 0]);
          return (
            <div
              key={`${s.label}-${i}`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                opacity: appear,
                transform: `translateY(${y}px)`,
              }}
            >
              <div
                style={{
                  fontFamily: FONT.display,
                  color: theme.cream,
                  fontSize: 180,
                  fontWeight: 500,
                  letterSpacing: "-0.05em",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  height: 2,
                  width: 48,
                  background: theme.gold,
                }}
              />
              <div
                style={{
                  fontFamily: FONT.display,
                  color: theme.creamDim,
                  fontSize: 22,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                {s.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
