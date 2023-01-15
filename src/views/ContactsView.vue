<script setup lang="ts">
import { reactive } from "vue";
import TileContainer from "@/components/TileContainer.vue";
import type { ITile } from "@/types";
import { contactTiles } from "@/content";

interface IState {
  tiles: ITile[];
  selectedTile: ITile | null;
}

const state = reactive<IState>({
  tiles: contactTiles,
  selectedTile: null
});
</script>

<template>
  <div class="wrapper">
    <TileContainer
      :tiles="state.tiles"
      :hide="!!state.selectedTile"
      :interactive="false"
    />
  </div>
</template>