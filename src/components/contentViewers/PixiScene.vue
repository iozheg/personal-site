<script setup lang="ts">
import { SceneObjects } from "@/logic/graphics";
import * as PIXI from "pixijs";
import { ref, onMounted, onBeforeUnmount } from "vue";

const SCENE_PADDING = -10;

const pixiContainer = ref<HTMLElement | null>(null);

const pixiApp = new PIXI.Application({
  width: 512,
  height: 512,
  antialias: true,
  resolution: window.devicePixelRatio % 1 !== 0 ? 1 : 2,
  autoDensity: true
});

let sceneObjects: SceneObjects;

enablePixiConsole();

onMounted(() => {
  pixiContainer.value?.appendChild(pixiApp.view as HTMLCanvasElement);
  pixiApp.resizeTo = pixiContainer.value as HTMLElement;

  const size = getSceneSize();
  sceneObjects = new SceneObjects(pixiApp.stage, {
    x: SCENE_PADDING,
    y: SCENE_PADDING,
    width: size.width - SCENE_PADDING,
    height: size.height - SCENE_PADDING,
  });

  pixiApp.ticker.add(sceneObjects.update.bind(sceneObjects));

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

onBeforeUnmount(() => {
  sceneObjects?.destroy();
  pixiApp.destroy(true, true);
});

function getSceneSize(): { width: number; height: number; } {
  const bigTileSize = 256;
  const smallTileSize = 240;

  const mediaQueries = [{
    condition: (x: number) => x >= 480 && x < 768,
    width: smallTileSize * 2,
    height: smallTileSize * 2
  }, {
    condition: (x: number) => x >= 768 && x < 1024,
    width: bigTileSize * 2,
    height: bigTileSize * 2
  }, {
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
  //@ts-ignore
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