import { DESCRIPTION_TYPES, CONTENT_TYPES } from "./enums";
import type { ITile } from "./types";

export const skillTiles: ITile[] = [{
  id: "html",
  title: "HTML",
  description: "Template for SingleTile component."
}, {
  id: "css",
  title: "CSS / SASS",
  description: "Some styles from SingleTile with simple animation."
}, {
  id: "js",
  title: "JavaScript / TypeScript",
  description: "Class that manages PixiJs scene."
}, {
  id: "vue",
  title: "Vue",
  description: "VueJS 3 component for SingleTile using Composition API."
}, {
  id: "pixijs",
  title: "PixiJS",
  description: "Simple WebGL animation.",
  contentType: CONTENT_TYPES.pixi
}];

export const skillContent: {
  [key in string]?: string;
} = {
  html: `
<div
  class="single-tile"
  :class="{
    'single-tile--clickable': isClickable,
    'single-tile--hidden': hidden,
    'single-tile--dark': dark
  }"
  @click="emit('select')"
>
  <button
    v-if="!isClickable && dark"
    class="single-tile__back-button"
    @click="emit('return')"
  >
    &larr; back
  </button>
  <div class="single-tile__title">
    {{ tile.title }}
  </div>
  <template v-if="showDescription">
    <component
      v-if="descViewer"
      :is="descViewer"
      v-bind="tile.description"
    />
    <div v-else v-html="tile.description" class="single-tile__description">
  </div>
  </template>
</div>
  `,
  css: `
.single-tile {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  flex-shrink: 0;
  width: var(--big-tile-size);
  height: var(--big-tile-size);
  padding: 15px 30px;
  background-color: #FFFFFF;
  transition: box-shadow 0.5s, left 0.5s;

  &--clickable {
    cursor: pointer;
    z-index: 2;

    &:hover {
      box-shadow: 0px 0px 3px 0px #333333;
      z-index: 99;
    }
  }

  &--hidden {
    animation: hide var(--tile-transition-time) forwards;
  }

  &--dark {
    background-color: #2D2D2D;
  }

  &__title {
    min-height: 56px;
    font-size: 36px;
    color: #000000;
  }

  &--dark &__description {
    color: var(--color-text);
  }

  &--dark &__title {
    color: #FFFFFF;
  }

  &__back-button {
    padding: 0;
    border: none;
    background: none;
    color: #FFFFFF;
    cursor: pointer;
  }

  &__description {
    color: #000000;
    overflow-wrap: break-word;
  }
}

@keyframes hide {
    to {
        height: 0;
    }
}

@keyframes show {
    to {
        height: unset;
    }
}
  `,
  js: `
export class SceneObjects {
  private dots: IDot[] = [];
  private connections: IConnection[] = [];

  private stage: PIXI.Container | undefined;
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
      //@ts-ignore
      dot.displayObject.name = dot.id;

      this.stage?.addChild(gDot);
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

  public updateSceneSize(area: IArea): void {
    this.area = area;
  }

  public destroy(): void {
    this.dots = [];
    this.connections = [];
    this.lastTimer = 0;
    this.stage = undefined;

    dotId = 0;
    connectionId = 0;
  }
}`,
  vue: `
import { DESCRIPTION_TYPES } from '@/enums';
import type { ITile } from '@/types';
import { computed } from 'vue';
import ImageViewer from './descriptionViewers/ImageViewer.vue';
import EmailViewer from './descriptionViewers/LinkViewer.vue';
import ListViewer from './descriptionViewers/ListViewer.vue';

const props = defineProps<{
  tile: ITile;
  clickable?: boolean;
  hidden?: boolean;
  dark?: boolean;
}>();

const emit = defineEmits<{
  (e: "select"): void;
  (e: "return"): void;
}>();

const descriptionViewers = {
  [DESCRIPTION_TYPES.string]: undefined,
  [DESCRIPTION_TYPES.link]: EmailViewer,
  [DESCRIPTION_TYPES.image]: ImageViewer,
  [DESCRIPTION_TYPES.list]: ListViewer
};

const descViewer = computed(() => {
  return typeof props.tile.description === "object"
    ? descriptionViewers[props.tile.description.type]
    : descriptionViewers[DESCRIPTION_TYPES.string];
});

const isClickable = computed(() => props.clickable ?? true);
const showDescription = computed(() => !isClickable.value);
  `,
  pixijs: ""
};

export const contactTiles: ITile[] = [{
  id: "email",
  title: "E-mail",
  description: {
    type: DESCRIPTION_TYPES.link,
    label: "aknetsev@gmail.com",
    href: "mailto:https://github.com/iozheg"
  }
}, {
  id: "github",
  title: "GitHub",
  description: {
    type: DESCRIPTION_TYPES.link,
    label: "https://github.com/iozheg",
    href: "https://github.com/iozheg"
  }
}, {
  id: "linkedin",
  title: "LinkedIn",
  description: {
    type: DESCRIPTION_TYPES.link,
    label: "https://www.linkedin.com/in/aleksandr-netsev/",
    href: "https://www.linkedin.com/in/aleksandr-netsev/g"
  }
}, {
  id: "telegram",
  title: "Telegram",
  description: {
    type: DESCRIPTION_TYPES.link,
    label: "@netsev",
    href: "tg://resolve?domain=@netsev"
  }
}, {
  id: "instagram",
  title: "Instagram",
  description: {
    type: DESCRIPTION_TYPES.link,
    label: "@alex.netsev",
    href: "https://www.instagram.com/alex.netsev/"
  }
}];

export const aboutTiles: ITile[] = [{
  id: "photo",
  title: "Photo",
  description: {
    type: DESCRIPTION_TYPES.image,
    imageUrl: "me.jpg"
  }
}, {
    id: "techStack",
    title: "Tech stack",
    description: {
      type: DESCRIPTION_TYPES.list,
      items: ["JS/TS", "VueJS", "PixiJS", "Webpack", "GraphQL", "CSS/SCSS", "Git"]
    }
}, {
  id: "experience",
  title: "Experience",
  description: {
    type: DESCRIPTION_TYPES.list,
    items: ["Web dev from 2017", "JS: 6+ years", "TS: 2 years", "Vue: 3+ years", "PixiJS: 2+ years"]
  }
}, {
  id: "passions",
  title: "Passions",
  description: {
    type: DESCRIPTION_TYPES.list,
    items: ["clean code", "linting", "bug search", "new technologies"]
  }
}, {
  id: "languages",
  title: "Languages",
  description: {
    type: DESCRIPTION_TYPES.list,
    items: ["russian (native)", "english (B1/B2)"]
  }
}, {
  id: "education",
  title: "Education",
  description: {
    type: DESCRIPTION_TYPES.list,
    items: ["Web dev (self-study)", "Google ML crush course (in progress)"]
  }
}, {
  id: "hobbies",
  title: "Hobbies",
  description: {
    type: DESCRIPTION_TYPES.list,
    items: ["motorcycles", "snowbording", "walking", "coding"]
  }
}];