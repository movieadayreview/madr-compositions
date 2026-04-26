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
  rank: number;
  title: string;
  rating: string;
  blurb?: string;
  posterUrl?: string;
  year?: string;
};

/**
 * One slide in a Top-5-style countdown.
 *
 * Two layouts:
 *
 * - **With posterUrl**: cinematic poster-led layout. Same visual language as
 *   MoviePoster.tsx: blurred ambient backdrop of the same poster, dark
 *   gradient overlay, contained foreground poster centered with a
 *   rank-as-corner-badge. Title + rating chip + blurb stacked below.
 *
 * - **Without posterUrl** (or empty string): falls back to the original
 *   rank-glyph layout (giant `#N` on the left, title/rating/blurb stacked
 *   right). Keeps existing configs visually unchanged after upgrade.
 */
export const CountdownItem: React.FC<Props> = (props) => {
  if (props.posterUrl && props.posterUrl.trim()) {
    return <PosterLedLayout {...props} />;
  }
  return <RankGlyphLayout {...props} />;
};

/* ------------------------------------------------------------------ */
/* Poster-led layout (when posterUrl is set)                          */
/* ------------------------------------------------------------------ */

const PosterLedLayout: React.FC<Props> = ({
  rank,
  title,
  rating,
  blurb,
  posterUrl,
  year,
}) => {
  const frame = useCurrentFrame();
  const theme = useTheme();

  const fadeIn = interpolate(frame, [0, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const eyebrowOpacity = interpolate(frame, [8, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rankBadgeOpacity = interpolate(frame, [8, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rankBadgeScale = interpolate(frame, [8, 22], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleOpacity = interpolate(frame, [18, 34], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [18, 34], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ratingOpacity = interpolate(frame, [26, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const blurbOpacity = interpolate(frame, [26, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Subtle Ken-Burns drift on the foreground poster across the slide.
  const posterScale = interpolate(frame, [0, 180], [1.0, 1.04]);

  const resolved =
    posterUrl!.startsWith("http") || posterUrl!.startsWith("data:")
      ? posterUrl!
      : staticFile(posterUrl!);

  return (
    <AbsoluteFill style={{ background: theme.black, overflow: "hidden" }}>
      {/* Ambient blurred backdrop — same poster, scaled up + blurred. */}
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

      {/* Foreground content — eyebrow / poster / title stacked vertically */}
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
          Top 5
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 0,
            position: "relative",
          }}
        >
          {/* Poster wrapper holds the rank badge in a corner that scales with
              the poster (so the badge stays anchored on landscape vs vertical). */}
          <div
            style={{
              position: "relative",
              height: "100%",
              maxHeight: "100%",
              aspectRatio: "2 / 3",
              maxWidth: "100%",
              transform: `scale(${posterScale})`,
              opacity: fadeIn,
            }}
          >
            <Img
              src={resolved}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 12,
                boxShadow: "0 30px 80px rgba(0, 0, 0, 0.7)",
              }}
            />
            {/* Rank badge — stamp-style overlay in the top-left corner. */}
            <div
              style={{
                position: "absolute",
                top: -16,
                left: -16,
                background: theme.gold,
                color: theme.black,
                fontFamily: FONT.display,
                fontSize: 88,
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: "-0.04em",
                padding: "16px 24px 18px",
                borderRadius: 12,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.55)",
                opacity: rankBadgeOpacity,
                transform: `scale(${rankBadgeScale})`,
                transformOrigin: "top left",
              }}
            >
              #{rank}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div
            style={{
              fontFamily: FONT.display,
              color: theme.cream,
              fontSize: 56,
              fontWeight: 500,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
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

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: FONT.display,
                color: theme.black,
                background: theme.gold,
                borderRadius: 999,
                padding: "8px 20px",
                fontSize: 30,
                fontWeight: 700,
                letterSpacing: "0.02em",
                lineHeight: 1,
                opacity: ratingOpacity,
              }}
            >
              {rating}
            </span>
            {blurb ? (
              <div
                style={{
                  fontFamily: FONT.display,
                  color: theme.creamDim,
                  fontSize: 26,
                  fontWeight: 400,
                  letterSpacing: "0.005em",
                  lineHeight: 1.3,
                  flex: 1,
                  minWidth: "12ch",
                  opacity: blurbOpacity,
                  textWrap: "balance",
                }}
              >
                {blurb}
              </div>
            ) : null}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Rank-glyph layout (fallback when posterUrl is empty)               */
/* Original layout — preserved for backward compat.                   */
/* ------------------------------------------------------------------ */

const RankGlyphLayout: React.FC<Props> = ({ rank, title, rating, blurb }) => {
  const frame = useCurrentFrame();
  const theme = useTheme();

  const rankFade = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rankClip = interpolate(frame, [0, 18], [60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [10, 26], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleOpacity = interpolate(frame, [10, 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ratingOpacity = interpolate(frame, [22, 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const blurbOpacity = interpolate(frame, [30, 48], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: theme.black,
        padding: "8% 8%",
        display: "flex",
        alignItems: "center",
        gap: 60,
      }}
    >
      <div
        style={{
          fontFamily: FONT.display,
          color: theme.gold,
          fontSize: 540,
          fontWeight: 700,
          lineHeight: 0.85,
          letterSpacing: "-0.06em",
          opacity: rankFade,
          transform: `translateY(${rankClip}px)`,
          flexShrink: 0,
        }}
      >
        #{rank}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 28,
          flex: 1,
          minWidth: 0,
        }}
      >
        <div
          style={{
            fontFamily: FONT.display,
            color: theme.cream,
            fontSize: 96,
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: 1.0,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            textWrap: "balance",
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            opacity: ratingOpacity,
          }}
        >
          <span
            style={{
              fontFamily: FONT.display,
              color: theme.black,
              background: theme.gold,
              borderRadius: 999,
              padding: "10px 22px",
              fontSize: 36,
              fontWeight: 700,
              letterSpacing: "0.02em",
              lineHeight: 1,
            }}
          >
            {rating}
          </span>
        </div>

        {blurb ? (
          <div
            style={{
              fontFamily: FONT.display,
              color: theme.creamDim,
              fontSize: 32,
              fontWeight: 400,
              letterSpacing: "0.005em",
              lineHeight: 1.3,
              maxWidth: "32ch",
              opacity: blurbOpacity,
              textWrap: "balance",
            }}
          >
            {blurb}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
