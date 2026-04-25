import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { FONT } from "../brand/tokens";
import { useTheme } from "../brand/ThemeContext";
import { Monogram } from "../brand/Monogram";

type Props = {
  url?: string;
  qrDataUrl?: string;
};

export const OutroCTA: React.FC<Props> = ({
  url = "movieadayreview.com",
  qrDataUrl,
}) => {
  const frame = useCurrentFrame();
  const theme = useTheme();
  const urlOpacity = interpolate(frame, [18, 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const urlY = interpolate(frame, [18, 36], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ruleProgress = interpolate(frame, [24, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const qrOpacity = interpolate(frame, [36, 54], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: theme.black,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 48,
      }}
    >
      <Monogram size={320} startFrame={0} staggerFrames={3} />
      <div
        style={{
          height: 2,
          width: 380,
          background: theme.gold,
          transform: `scaleX(${ruleProgress})`,
          transformOrigin: "center",
        }}
      />
      <div
        style={{
          fontFamily: FONT.display,
          color: theme.cream,
          fontSize: 54,
          fontWeight: 500,
          letterSpacing: "0.02em",
          opacity: urlOpacity,
          transform: `translateY(${urlY}px)`,
        }}
      >
        {url}
      </div>
      {qrDataUrl ? (
        <div
          style={{
            marginTop: 12,
            padding: 12,
            background: theme.cream,
            borderRadius: 8,
            opacity: qrOpacity,
          }}
        >
          <img
            src={qrDataUrl}
            alt={`QR code for ${url}`}
            width={140}
            height={140}
            style={{ display: "block" }}
          />
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
