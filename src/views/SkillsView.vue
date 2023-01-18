<script setup lang="ts">
import { computed, reactive } from "vue";
import TileContainer from "@/components/TileContainer.vue";
import FeatureContainer from "@/components/FeatureContainer.vue";
import type { ITile } from "@/types";
import { skillContent, skillTiles } from "@/content";

interface IState {
  tiles: ITile[];
  selectedTile: ITile | null;
}

const state = reactive<IState>({
  tiles: skillTiles,
  selectedTile: null
});

const tileContent = computed<string>(() => { 
  return state.selectedTile
    ? skillContent[state.selectedTile?.id] || ""
    : ""
});

function selectTile(id: string) {
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
      :interactive="true"
      @select="selectTile"
    />
  </div>
</template>