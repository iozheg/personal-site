import type * as PIXI from "pixijs";

export interface IDot {
  id: number;
  position: IPoint;
  velocity: IPoint;
  size: number;
  connections: IConnection[];
  shouldDestroy: boolean;
  displayObject?: PIXI.Graphics;
}

export interface IConnection {
  id: number;
  dotA: IDot;
  dotB: IDot;
  distance?: number;
  shouldDestroy: boolean;
}

export interface IArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type IPoint = {
  x: number;
  y: number;
}