import type { DESCRIPTION_TYPES, CONTENT_TYPES, TILES } from "./enums";

interface IGenericDescription {
  type: DESCRIPTION_TYPES;
}

type ILinkDescription = IGenericDescription & {
  label: string;
  href: string;
}

type IImageDescription = IGenericDescription & {
  imageUrl: string;
}

type IListDescription = IGenericDescription & {
  items: string[];
}

export type IDescription = ILinkDescription | IImageDescription | IListDescription;

export interface ITile {
  id: TILES | string;
  title?: string;
  description?: string | IDescription;
  contentType?: CONTENT_TYPES;
}