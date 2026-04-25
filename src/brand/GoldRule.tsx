import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { useTheme } from "./ThemeContext";

type Props = {
  startFrame?: number;
  durationFrames?: number;
  width?: number | string;
  height?: number;
};

export const GoldRule: React.FC<Props> = ({
  startFrame = 0,
  durationFrames = 18,
  width = 240,
  height = 2,
}) => {
  const frame = useCurrentFrame();
  const theme = useTheme();
  const progress = interpolate(
    frame - startFrame,
    [0, durationFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return (
    <div
      style={{
        width,
        height,
        background: theme.gold,
        transform: `scaleX(${progress})`,
        transformOrigin: "left center",
      }}
    />
  );
};
