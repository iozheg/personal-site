<script setup lang="ts">
import { SceneObjects } from "@/graphics";
import * as PIXI from "pixijs";
import { ref, onMounted } from "vue";

const SCENE_PADDING = -10;

const pixiContainer = ref<HTMLElement | null>(null);

const app = new PIXI.Application({
  width: 512,
  height: 512,
  antialias: true
});

enablePixiConsole();

onMounted(() => {
  pixiContainer.value?.appendChild(app.view as HTMLCanvasElement);

  const sceneObjects = new SceneObjects(app.stage, {
    x: SCENE_PADDING,
    y: SCENE_PADDING,
    width: 512 - SCENE_PADDING,
    height: 512 - SCENE_PADDING,
  });

  app.ticker.add(sceneObjects.update.bind(sceneObjects));
});

function enablePixiConsole() {
  window.PIXI = PIXI;
}
</script>

<template>
  <div id="pixi-container" ref="pixiContainer"></div>
</template>