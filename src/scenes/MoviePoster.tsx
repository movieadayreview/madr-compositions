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

type Props = {
  posterUrl: string;
  eyebrow: string;
  title: string;
  year?: string;
};

const Placeholder: React.FC<{ eyebrow: string }> = ({ eyebrow }) => {
  const theme = useTheme();
  return (
    <AbsoluteFill
      style={{
        background: theme.black,
        display: "flex",
        flexDirection: "column",
        padding: "8%",
        gap: "4%",
        alignItems: "center",
        justifyContent: "center",
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
        {eyebrow}
      </div>
      <div
        style={{
          aspectRatio: "2 / 3",
          height: "60%",
          maxWidth: "70%",
          border: `2px dashed ${theme.gold}`,
          borderRadius: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "8%",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: FONT.display,
            color: theme.creamDim,
            fontSize: 26,
            lineHeight: 1.4,
          }}
        >
          Paste a poster URL — TMDB image links work directly
          (e.g. https://image.tmdb.org/t/p/w780/...).
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * Movie-poster scene for the Today's Review composition. The poster is
 * displayed at its natural 2:3 aspect ratio (no cover-cropping), centered
 * in a flex column with eyebrow above and title below. A blurred copy of
 * the same poster fills the canvas behind, giving cinematic ambient color
 * without obscuring the foreground.
 *
 * Works for any aspect: on 16:9 / 1:1 / 9:16 the foreground poster fits the
 * available height, the side margins (or stacked margins on portrait) auto-
 * compute, and the backdrop fills bleed-to-edge. TMDB poster URLs render
 * directly — no proxy needed.
 */
export const MoviePoster: React.FC<Props> = ({
  posterUrl,
  eyebrow,
  title,
  year,
}) => {
  const frame = useCurrentFrame();
  const theme = useTheme();

  const fadeIn = interpolate(frame, [0, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const posterScale = interpolate(frame, [0, 180], [1.0, 1.04]);
  const eyebrowOpacity = interpolate(frame, [8, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleOpacity = interpolate(frame, [20, 38], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [20, 38], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (!posterUrl || posterUrl.trim() === "") {
    return <Placeholder eyebrow={eyebrow} />;
  }

  const resolved =
    posterUrl.startsWith("http") || posterUrl.startsWith("data:")
      ? posterUrl
      : staticFile(posterUrl);

  return (
    <AbsoluteFill style={{ background: theme.black, overflow: "hidden" }}>
      {/* Ambient blurred backdrop — same poster, scaled up and blurred. Gives
          the scene cinematic color without fighting the foreground for focus. */}
      <AbsoluteFill
        style={{
          opacity: fadeIn * 0.45,
          transform: "scale(1.4)",
          filter: "blur(60px)",
        }}
      >
        <Img
          src={resolved}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.55) 50%, rgba(10,10,10,0.85) 100%)",
        }}
      />

      {/* Foreground content — eyebrow / poster / title stacked vertically with
          flex:1 on the poster row so it absorbs the remaining space without
          overflowing into the text rows. */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "5% 5%",
          gap: "3%",
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
            opacity: eyebrowOpacity,
          }}
        >
          {eyebrow}
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 0,
          }}
        >
          <Img
            src={resolved}
            style={{
              height: "100%",
              width: "auto",
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              borderRadius: 12,
              boxShadow: "0 30px 80px rgba(0, 0, 0, 0.7)",
              transform: `scale(${posterScale})`,
              opacity: fadeIn,
            }}
          />
        </div>

        <div
          style={{
            fontFamily: FONT.display,
            color: theme.cream,
            fontSize: 56,
            fontWeight: 500,
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            maxWidth: "30ch",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            textWrap: "balance",
          }}
        >
          {title}
          {year ? (
            <span style={{ color: theme.creamDim, fontWeight: 400 }}>
              {" "}
              · {year}
            </span>
          ) : null}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
