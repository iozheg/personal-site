<script setup lang="ts">
import { reactive } from 'vue';
import SingleTile from './SingleTile.vue';

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

state.visibleTiles = [...state.tiles];

function selectTile(tileIndex: number) {
  state.selected = state.tiles[tileIndex];
}
</script>

<template>
  <div
    class="tile-container"
  >
    <SingleTile
      v-for="(tile, index) in state.visibleTiles"
      :key="tile.title"
      :title="tile.title"
      :hide="tile.hide"
      :size="tile.size"
      @select="selectTile(index)"
    />
  </div>
</template>

<style scoped>
.tile-container {
  /* position: absolute; */
  top: 0;
  left: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  background-color: #FFFFFF;
  transition: left 0.5s linear;
}
</style>