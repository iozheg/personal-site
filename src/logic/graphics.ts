import * as PIXI from "pixijs";
import { getRandomValue, getSqrtDistance, getVelocity } from "./helpers";
import {
  DOT_COLOR,
  DOT_NUMBER,
  DOT_SIZE,
  LINE_COLOR,
  LINE_WIDTH,
  MAX_CONNECTIONS,
  MAX_SQRT_DISTANCE,
  MIN_SQRT_DISTANCE
} from "./settings";
import type { IDot, IConnection, IArea } from "./types";

let dotId = 0;
let connectionId = 0;

export class SceneObjects {
  private dots: IDot[] = [];
  private connections: IConnection[] = [];

  private stage: PIXI.Container;
  private area: IArea;

  private connectionsGraphics: PIXI.Graphics;

  private updateInProgress = false;
  private lastTimer = 0;
  private frameCount = 0;

  constructor(stage: PIXI.Container, area: IArea) {
    this.stage = stage;
    this.area = area;
    this.connectionsGraphics = new PIXI.Graphics();
    this.stage.addChild(this.connectionsGraphics);

    this.generateDots();
    this.drawDots();
  }

  private generateDots() {
    const amountToGenerate = DOT_NUMBER - this.dots.length;
    const newDots = [];
    if (amountToGenerate > 0) {
      for (let i = 0; i < amountToGenerate; i++) {
        newDots.push(this.createDot());
      }
    }
    this.dots.push(...newDots);
  }

  private createDot(): IDot {
    return <IDot>{
      id: dotId++,
      position: {
        x: getRandomValue(this.area.x, this.area.width),
        y: getRandomValue(this.area.y, this.area.height)
      },
      velocity: {
        x: getVelocity(),
        y: getVelocity()
      },
      size: getRandomValue(1, DOT_SIZE),
      connections: [],
      shouldDestroy: false
    };
  }

  private prepareToRemoveDot(dot: IDot): void {
    [...dot.connections].forEach(connection => this.removeConnection(connection));
    dot.shouldDestroy = true;
    dot.displayObject?.destroy();
  }

  private disconnectDot(dot: IDot, connection: IConnection): void {
    const index = dot.connections.findIndex(con => con === connection);
    dot.connections.splice(index, 1);
  }

  private findClosestFreeDots(baseDot: IDot, amount: number): IDot[] {
    const freeDots = this.dots.filter(dot =>
      dot !== baseDot
      && dot.connections.length < MAX_CONNECTIONS
      && !dot.connections.some(({ dotA, dotB }) => dotA === baseDot || dotB === baseDot)
    );

    const neighbours: IDot[] = [];
    for (let i = 0; i < freeDots.length && neighbours.length < amount; i++) {
        if (getSqrtDistance(baseDot.position, freeDots[i].position) < MIN_SQRT_DISTANCE) {
          neighbours.push(freeDots[i]);
        }
    }
    return neighbours;
  }

  private checkDots(): void {
    this.dots.forEach(dot => {
      const { x = 0, y = 0 } = dot.displayObject?.position || {};
      if (x < this.area.x || x > this.area.width || y < this.area.y || y > this.area.height) {
        this.prepareToRemoveDot(dot);
      }
    });
  }

  private generateConnections(): void {
    this.dots.forEach(dot => {
      if (dot.connections.length < MAX_CONNECTIONS) {
        const neighbours = this.findClosestFreeDots(dot, MAX_CONNECTIONS - dot.connections.length);
        neighbours.forEach(newNeighbour => this.createConnection(dot, newNeighbour));
      }
    });
  }

  private createConnection(dotA: IDot, dotB: IDot): void {
    const connection: IConnection = {
      id: connectionId++,
      dotA,
      dotB,
      shouldDestroy: false,
      distance: getSqrtDistance(dotA.position, dotB.position)
    };
  dotA.connections.push(connection);
    dotB.connections.push(connection);

    this.connections.push(connection);
  }

  private removeConnection(connection: IConnection): void {
    this.disconnectDot(connection.dotA, connection);
    this.disconnectDot(connection.dotB, connection);
    connection.shouldDestroy = true;
  }

  private checkConnections(): void {
    this.connections.forEach(connection => {
      const distance = getSqrtDistance(connection.dotA.position, connection.dotB.position);
      if (!connection.shouldDestroy && distance >= MAX_SQRT_DISTANCE) {
        this.removeConnection(connection);
      } else {
        connection.distance = distance;
      }
    });
  }

  private cleanScene(): void {
    this.dots = this.dots.filter(dot => !dot.shouldDestroy);
    this.connections = this.connections.filter(connection => !connection.shouldDestroy);
  }

  private drawDots(): void {
    const newDots = this.dots.filter(dot => !dot.displayObject);
    newDots.forEach(dot => {
      const gDot = new PIXI.Graphics();
      gDot.beginFill(DOT_COLOR);
      gDot.drawCircle(0, 0, dot.size);
      gDot.endFill();
      gDot.position.set(dot.position.x, dot.position.y);

      dot.displayObject = gDot;
      dot.displayObject.name = dot.id;

      this.stage.addChild(gDot);
    });
  }

  private drawConnections(): void {
    this.connectionsGraphics.clear();

    this.connections.forEach(connection => {
      const alpha = connection.distance
        ? (connection.distance - 0) / (MAX_SQRT_DISTANCE - 0)
        : 1;

      this.connectionsGraphics
        .lineStyle(LINE_WIDTH, LINE_COLOR, 1 - Math.abs(alpha))
        .moveTo(
            connection.dotA.displayObject?.position.x || 0,
            connection.dotA.displayObject?.position.y || 0
          )
        .lineTo(
          connection.dotB.displayObject?.position.x || 0,
          connection.dotB.displayObject?.position.y || 0
        );
    });
  }

  private renewDots(): void {
    this.updateInProgress = true;
    this.checkDots();
    this.checkConnections();
    this.cleanScene();

    this.generateDots();
    this.generateConnections();
    this.drawDots();
    this.drawConnections();
    this.updateInProgress = false;
  }

  private updateDotsPosition(delta: number): void {
    const frame = delta / 60;
    for (let i = 0; i < this.dots.length; i++) {
      const dot = this.dots[i];
      dot.position.x += dot.velocity.x * frame;
      dot.position.y += dot.velocity.y * frame;
      dot.displayObject?.position.set(dot.position.x, dot.position.y);
    }
  }

  public update(delta: number): void {
    this.lastTimer += delta;
    this.frameCount++;
    // const t0 = performance.now();
    if (!this.updateInProgress) {
      this.renewDots();
    }

    if (this.lastTimer > 10) {
      // const t1 = performance.now();
      // console.log("average", (t1 - t0)/this.frameCount, this.frameCount, delta);
      this.lastTimer = 0;
      this.frameCount = 0
    }
    this.updateDotsPosition(delta);
  }
}