<script setup lang="ts">
import { reactive } from 'vue';
import SingleTile from './SingleTile.vue';
import FeatureData from './FeatureData.vue';
import { CONTENT_TYPES } from '@/enums';

const state = reactive({
  tile: {
    title: "Test title",
    description: "Description"
  },
  type: CONTENT_TYPES.code,
  content: `
    interface ITile {
      title?: string;
      description?: string;
      hide?: boolean;
      size?: number;
    }

    interface IState {
      tiles: ITile[];
      visibleTiles: ITile[];
      selected: ITile | null;
    }

    const state = reactive<IState>({
      tiles: [{
        title: "HTML",
        description: "HTML",
        hide: false
      }, {
        title: "CSS",
        description: "CSS",
        hide: false,
        size: 1
      }, {
        title: "JavaScript / TypeScript",
        description: "JavaScript / TypeScript",
        hide: false
      }, {
        title: "Vue",
        description: "Vue",
        hide: false
      }, {
        title: "PixiJS",
        description: "PixiJS",
        hide: false
      }],
      visibleTiles: [],
      selected: null
    });
  `
});
</script>

<template>
  <div class="feature-container">
    <SingleTile 
      :key="state.tile.title"
      :title="state.tile.title"
      :description="state.tile.description"
      :highlighted="true"
    />
    <FeatureData
      :type="state.type"
      :content="state.content"
    />
  </div>
</template>

<style scoped>
.feature-container {
  position: relative;
  left: 0;
  display: flex;
  justify-content: left;
  background-color: #1e1e1e;
}
</style>