/** UTF-16 exclusive range into the concatenated eligible article string. */
export type ArticleRange = {
  start: number;
  end: number;
};

/** One spoken utterance mapped onto the article display string. */
export type ArticleSpeechSegment = {
  lang: "en" | "ja";
  /** Display text for this utterance (same string speechService highlights against). */
  text: string;
  /** Absolute UTF-16 start in the concatenated eligible article text. */
  articleStart: number;
  /**
   * When true, highlight the whole segment as one phrase (JA kanji without an
   * explicit kana reading — avoids wrong word-by-word animation).
   */
  phraseLevel: boolean;
  /** True when this segment ends a displayed line (paragraph, heading, list item, cell). */
  lineEnd?: boolean;
};

export type TextNodeSlice = {
  node: Text;
  /** Absolute start of this node's text in the concatenated article string. */
  start: number;
  /** Absolute exclusive end. */
  end: number;
};

export type ArticleTextMap = {
  /** Concatenated eligible display text (source of truth for speech + highlights). */
  text: string;
  slices: TextNodeSlice[];
  segments: ArticleSpeechSegment[];
};
