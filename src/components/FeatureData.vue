<script setup lang="ts">
import { CONTENT_TYPES } from "@/enums";
import { defineAsyncComponent, type Component } from "vue";
import CodeViewer from "./contentViewers/CodeViewer.vue";

defineProps<{
  type?: CONTENT_TYPES;
  content: string;
}>();

const typeComponents: { [key in CONTENT_TYPES]: Component } = {
  code: CodeViewer,
  pixi: defineAsyncComponent({ loader: () => import('./contentViewers/PixiScene.vue') })
}
</script>

<template>
  <div class="feature-data">
    <component
      :is="typeComponents[type || CONTENT_TYPES.code]"
      :content="content"
    />
  </div>
</template>

<style scoped>
.feature-data {
  flex-grow: 1;
  width: 100%;
  height: calc(var(--big-tile-size) * 2);
  overflow: hidden;
}
</style>