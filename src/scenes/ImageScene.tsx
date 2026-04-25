import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { FONT } from "../brand/tokens";
import { useTheme } from "../brand/ThemeContext";

const Placeholder: React.FC<{ hint: string }> = ({ hint }) => {
  const theme = useTheme();
  return (
    <AbsoluteFill
      style={{
        background: theme.black,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 18,
        padding: "0 10%",
        textAlign: "center",
        border: `2px dashed ${theme.gold}`,
      }}
    >
      <div
        style={{
          fontFamily: FONT.display,
          color: theme.gold,
          fontSize: 22,
          letterSpacing: "0.36em",
          textTransform: "uppercase",
          fontWeight: 500,
        }}
      >
        No image set
      </div>
      <div
        style={{
          fontFamily: FONT.display,
          color: theme.creamDim,
          fontSize: 24,
          maxWidth: "44ch",
          lineHeight: 1.4,
        }}
      >
        {hint}
      </div>
    </AbsoluteFill>
  );
};

type Props = {
  src: string;
  caption?: string;
  label?: string;
  kenBurns?: boolean;
  fit?: "cover" | "contain";
};

export const ImageScene: React.FC<Props> = ({
  src,
  caption,
  label,
  kenBurns = true,
  fit = "cover",
}) => {
  const frame = useCurrentFrame();
  const theme = useTheme();

  const fade = interpolate(frame, [0, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = kenBurns ? interpolate(frame, [0, 180], [1.0, 1.08]) : 1;
  const panX = kenBurns ? interpolate(frame, [0, 180], [0, -20]) : 0;

  const labelOpacity = interpolate(frame, [14, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const captionOpacity = interpolate(frame, [22, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const captionY = interpolate(frame, [22, 40], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (!src || src.trim() === "") {
    return (
      <Placeholder hint="Drop an image into public/ and set src to its filename (e.g. tiernight.png)." />
    );
  }

  const resolved = src.startsWith("http") || src.startsWith("data:")
    ? src
    : staticFile(src);

  return (
    <AbsoluteFill style={{ background: theme.black, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          opacity: fade,
          transform: `scale(${scale}) translateX(${panX}px)`,
        }}
      >
        <Img
          src={resolved}
          style={{
            width: "100%",
            height: "100%",
            objectFit: fit,
          }}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0) 40%, rgba(10,10,10,0) 55%, rgba(10,10,10,0.9) 100%)`,
        }}
      />
      <AbsoluteFill
        style={{
          padding: "8% 8%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {label ? (
          <div
            style={{
              fontFamily: FONT.display,
              color: theme.gold,
              fontSize: 20,
              letterSpacing: "0.36em",
              textTransform: "uppercase",
              fontWeight: 500,
              opacity: labelOpacity,
            }}
          >
            {label}
          </div>
        ) : (
          <div />
        )}
        {caption ? (
          <div
            style={{
              fontFamily: FONT.display,
              color: theme.cream,
              fontSize: 56,
              fontWeight: 500,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              maxWidth: "22ch",
              opacity: captionOpacity,
              transform: `translateY(${captionY}px)`,
            }}
          >
            {caption}
          </div>
        ) : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
