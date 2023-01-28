<script setup lang="ts">
import { SceneObjects } from "@/logic/graphics";
import * as PIXI from "pixijs";
import { ref, onMounted } from "vue";

const SCENE_PADDING = -10;

const pixiContainer = ref<HTMLElement | null>(null);

const app = new PIXI.Application({
  width: 512,
  height: 512,
  antialias: true,
  resolution: window.devicePixelRatio % 1 !== 0 ? 1 : 2,
  autoDensity: true
});

enablePixiConsole();

onMounted(() => {
  pixiContainer.value?.appendChild(app.view as HTMLCanvasElement);
  app.resizeTo = pixiContainer.value as HTMLElement;

  const size = getSceneSize();
  const sceneObjects = new SceneObjects(app.stage, {
    x: SCENE_PADDING,
    y: SCENE_PADDING,
    width: size.width - SCENE_PADDING,
    height: size.height - SCENE_PADDING,
  });

  app.ticker.add(sceneObjects.update.bind(sceneObjects));

  addEventListener("resize", () => {
    const size = getSceneSize();

    sceneObjects.updateSceneSize({
      x: SCENE_PADDING,
      y: SCENE_PADDING,
      width: size.width - SCENE_PADDING,
      height: size.height - SCENE_PADDING,
    });
  });
});

function getSceneSize(): { width: number; height: number; } {
  const bigTileSize = 256;
  const smallTileSize = 240;

  const mediaQueries = [{
    query: "(min-width: 480px)",
    condition: (x: number) => x >= 480 && x < 768,
    width: smallTileSize * 2,
    height: smallTileSize * 2
  }, {
    query: "(min-width: 768px)",
    condition: (x: number) => x >= 768 && x < 1024,
    width: bigTileSize * 2,
    height: bigTileSize * 2
  }, {
    query: "(min-width: 1024px)",
    condition: (x: number) => x >= 1024,
    width: bigTileSize * 3,
    height: bigTileSize * 2
  }];

  const defaultSize = {
    width: pixiContainer.value?.clientWidth || 0,
    height: pixiContainer.value?.clientHeight || 0
  };

  return mediaQueries.find(({ condition }) => condition(window.innerWidth)) || defaultSize;
}

function enablePixiConsole() {
  window.PIXI = PIXI;
}
</script>

<template>
  <div id="pixi-container" ref="pixiContainer"></div>
</template>

<style>
#pixi-container{
  height: 100%;
}
</style>