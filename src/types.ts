import type { DESCRIPTION_TYPES, CONTENT_TYPES, TILES } from "./enums";

interface IGenericDescription {
  type: DESCRIPTION_TYPES;
}

export type ILinkDescription = IGenericDescription & {
  label: string;
  href: string;
}

export type IDescription = ILinkDescription;

export interface ITile {
  id: TILES;
  title?: string;
  description?: string | IDescription;
  contentType?: CONTENT_TYPES;
}