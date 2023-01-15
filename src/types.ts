import type { CONTENT_TYPES, TILES } from "./enums";

export interface ITile {
  id: TILES;
  title?: string;
  description?: string;
  htmlDescription?: boolean; 
  contentType?: CONTENT_TYPES;
}