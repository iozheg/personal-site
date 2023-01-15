<script setup lang="ts">
import { computed, reactive } from "vue";
import TileContainer from "@/components/TileContainer.vue";
import FeatureContainer from "@/components/FeatureContainer.vue";
import type { ITile } from "@/types";
import { content, tiles } from "@/content";
import type { TILES } from "@/enums";

interface IState {
  tiles: ITile[];
  selectedTile: ITile | null;
}

const state = reactive<IState>({
  tiles,
  selectedTile: null
});

const tileContent = computed<string>(() => {
  if (state.selectedTile) {
    return content[state.selectedTile.id];
  }
  return "";
});

function selectTile(id: TILES) {
  state.selectedTile = state.tiles.find(tile => tile.id === id) || null;
}

function unselectTile() {
  state.selectedTile = null;
}
</script>

<template>
  <div class="wrapper">
    <FeatureContainer
      v-if="state.selectedTile"
      :tile="state.selectedTile"
      :content="tileContent"
      @return="unselectTile"
    />
    <TileContainer
      :tiles="state.tiles"
      :hide="!!state.selectedTile"
      @select="selectTile"
    />
  </div>
</template>