import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { QRCodeSVG } from "qrcode.react";
import { FONT } from "../brand/tokens";
import { useTheme } from "../brand/ThemeContext";
import { Monogram } from "../brand/Monogram";

type Props = {
  url?: string;
  displayUrl?: string;
};

export const QrEndCard: React.FC<Props> = ({
  url = "https://movieadayreview.com",
  displayUrl,
}) => {
  const frame = useCurrentFrame();
  const theme = useTheme();
  const shown = displayUrl ?? url.replace(/^https?:\/\//, "");

  const urlOpacity = interpolate(frame, [18, 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const urlY = interpolate(frame, [18, 36], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const qrOpacity = interpolate(frame, [36, 56], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const qrScale = interpolate(frame, [36, 56], [0.92, 1], {
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
      <Monogram size={200} startFrame={0} staggerFrames={3} />
      <div
        style={{
          fontFamily: FONT.display,
          color: theme.cream,
          fontSize: 48,
          fontWeight: 500,
          letterSpacing: "0.02em",
          opacity: urlOpacity,
          transform: `translateY(${urlY}px)`,
        }}
      >
        {shown}
      </div>
      <div
        style={{
          padding: 22,
          background: theme.cream,
          borderRadius: 14,
          opacity: qrOpacity,
          transform: `scale(${qrScale})`,
          boxShadow: `0 0 0 3px ${theme.gold}, 0 30px 60px rgba(0,0,0,0.5)`,
        }}
      >
        <QRCodeSVG
          value={url}
          size={360}
          bgColor={theme.cream}
          fgColor={theme.black}
          level="M"
          marginSize={0}
        />
      </div>
      <div
        style={{
          fontFamily: FONT.display,
          color: theme.gold,
          fontSize: 20,
          letterSpacing: "0.36em",
          textTransform: "uppercase",
          fontWeight: 500,
          opacity: qrOpacity,
        }}
      >
        Scan to visit
      </div>
    </AbsoluteFill>
  );
};
