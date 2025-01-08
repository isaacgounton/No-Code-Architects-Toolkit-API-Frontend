export type VideoPosition = 
  'bottom_left' | 'bottom_center' | 'bottom_right' |
  'middle_left' | 'middle_center' | 'middle_right' |
  'top_left' | 'top_center' | 'top_right';

export type CaptionStyle = 'classic' | 'karaoke' | 'highlight' | 'underline' | 'word_by_word';

export type TextAlignment = 'left' | 'center' | 'right';

export interface CaptionSettings {
  line_color?: string;
  word_color?: string;
  outline_color?: string;
  all_caps?: boolean;
  max_words_per_line?: number;
  x?: number;
  y?: number;
  position?: VideoPosition;
  alignment?: TextAlignment;
  font_family?: string;
  font_size?: number;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikeout?: boolean;
  style?: CaptionStyle;
  outline_width?: number;
  spacing?: number;
  angle?: number;
  shadow_offset?: number;
}

export interface TextReplacement {
  find: string;
  replace: string;
}

export interface Caption {
  text: string;
  startTime?: number;
  endTime?: number;
}
