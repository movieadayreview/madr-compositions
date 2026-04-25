import React from "react";
import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { useTheme } from "../brand/ThemeContext";

type Props = {
  grain?: boolean;
  vignette?: boolean;
  grainScale?: number;
  vignetteScale?: number;
};

export const GrainVignette: React.FC<Props> = ({
  grain = true,
  vignette = true,
  grainScale = 1,
  vignetteScale = 1,
}) => {
  const frame = useCurrentFrame();
  const theme = useTheme();
  const seed = Math.floor(frame / 2);
  const shiftX = (random(`gx-${seed}`) - 0.5) * 10;
  const shiftY = (random(`gy-${seed}`) - 0.5) * 10;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {vignette ? (
        <AbsoluteFill
          style={{
            background: `radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(0,0,0,${
              theme.vignetteIntensity * vignetteScale
            }) 100%)`,
          }}
        />
      ) : null}
      {grain ? (
        <AbsoluteFill
          style={{
            transform: `translate(${shiftX}px, ${shiftY}px)`,
            opacity: theme.grainIntensity * grainScale,
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
            backgroundSize: "200px 200px",
            mixBlendMode: "overlay",
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};
