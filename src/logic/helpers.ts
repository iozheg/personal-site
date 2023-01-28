import { MAX_VELOCITY, MIN_VELOCITY } from "./settings";
import type { IPoint } from "./types";

export function getRandomValue(min: number = 0, max: number = 1): number {
  return Math.random() * (max - min) + min;
}

export function getSqrtDistance(pointA: IPoint, pointB: IPoint): number {
  return Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2);
}

export function getVelocity(): number {
  const direction = getRandomValue(-1, 1);

  let velocity = 0;
  if (direction < 0) {
    velocity = Math.min(direction * MAX_VELOCITY, -MIN_VELOCITY);
  } else {
    velocity = Math.max(direction * MAX_VELOCITY, MIN_VELOCITY);
  }
  
  return velocity;
}