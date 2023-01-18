<script setup lang="ts">
import { reactive } from "vue";
import TileContainer from "@/components/TileContainer.vue";
import type { ITile } from "@/types";
import { aboutTiles } from "@/content";

interface IState {
  tiles: ITile[];
}

const state = reactive<IState>({
  tiles: aboutTiles
});
</script>

<template>
  <div class="wrapper">
    <TileContainer
      :tiles="state.tiles"
      :interactive="false"
    />
  </div>
</template>