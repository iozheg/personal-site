import type { CONTENT_TYPES, TILES } from "./enums";

export interface ITile {
  id: TILES;
  title?: string;
  description?: string;
  contentType?: CONTENT_TYPES;
  hide?: boolean;
  size?: number;
}