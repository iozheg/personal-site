import * as PIXI from "pixijs";

type IPoint = {
  x: number;
  y: number;
}

interface IDot {
  id: number;
  position: IPoint;
  velocity: IPoint;
  size: number;
  connections: IConnection[];
  shouldDestroy: boolean;
  displayObject?: PIXI.Graphics;
}

interface IConnection {
  id: number;
  dotA: IDot;
  dotB: IDot;
  distance?: number;
  shouldDestroy: boolean;
}

interface IArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

const DOT_NUMBER = 30;
const MAX_CONNECTIONS = 10;
const MIN_SQRT_DISTANCE = 20000;
const MAX_SQRT_DISTANCE = 50000;
const MIN_VELOCITY = 5;
const MAX_VELOCITY = 20;
const DOT_SIZE = 3;
const DOT_COLOR =  0xffffff;
const LINE_WIDTH = 1;
const LINE_COLOR =  0xffffff;

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
        x: this.getRandomPosition(this.area.x, this.area.width),
        y: this.getRandomPosition(this.area.y, this.area.height)
      },
      velocity: {
        x: this.getVelocity(),
        y: this.getVelocity()
      },
      size: DOT_SIZE,
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
        if (this.getDistance(baseDot, freeDots[i]) < MIN_SQRT_DISTANCE) {
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
      distance: this.getDistance(dotA, dotB)
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
      const distance = this.getDistance(connection.dotA, connection.dotB);
      if (!connection.shouldDestroy && distance >= MAX_SQRT_DISTANCE) {
        this.removeConnection(connection);
      } else {
        connection.distance = distance;
      }
    });
  }

  private getDistance(dotA: IDot, dotB: IDot): number {
    const sqrtDistance = Math.pow(dotA.position.x - dotB.position.x, 2)
    + Math.pow(dotA.position.y - dotB.position.y, 2);

    return sqrtDistance;
  }

  private getRandomPosition(min: number = 0, max: number = 1): number {
    return Math.random() * (max - min) + min;
  }

  private getVelocity(): number {
    const direction = this.getRandomPosition(-1, 1);

    let velocity = 0;
    if (direction < 0) {
      velocity = Math.min(direction * MAX_VELOCITY, -MIN_VELOCITY);
    } else {
      velocity = Math.max(direction * MAX_VELOCITY, MIN_VELOCITY);
    }
    
    return velocity;
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