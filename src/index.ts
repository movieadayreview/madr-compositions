// Compositions — full trailer narratives
export {
  Teaser15,
  teaser15Schema,
  teaser15Total,
} from "./compositions/Teaser15";
export {
  Trailer30,
  trailer30Schema,
  trailer30Total,
} from "./compositions/Trailer30";
export {
  Trailer60,
  trailer60Schema,
  trailer60Total,
} from "./compositions/Trailer60";

// Compositions — single-purpose social shapes
export {
  TodaysReview,
  todaysReviewSchema,
  todaysReviewTotal,
} from "./compositions/TodaysReview";
export {
  QuoteCard,
  quoteCardSchema,
  quoteCardTotal,
} from "./compositions/QuoteCard";
export {
  Top5Countdown,
  top5CountdownSchema,
  top5CountdownTotal,
} from "./compositions/Top5Countdown";

// Compositions — standalone scene showcases (for stills, social posts)
export {
  PullQuoteShowcase,
  pullQuoteShowcaseSchema,
  StatsShowcase,
  statsShowcaseSchema,
  ImageShowcase,
  imageShowcaseSchema,
} from "./compositions/Showcase";

// Brand utilities
export { loadMadrFonts } from "./brand/fonts";
export { ThemeProvider, useTheme } from "./brand/ThemeContext";
export { Monogram } from "./brand/Monogram";
export { GoldRule } from "./brand/GoldRule";
