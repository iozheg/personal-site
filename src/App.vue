<script setup lang="ts">
import TheTitle from "./components/TheTitle.vue";
import TileContainer from "./components/TileContainer.vue";
import FeatureContainer from "./components/FeatureContainer.vue";
import { computed, reactive } from "vue";
import type { ITile } from "./types";
import { content, tiles } from "@/content";
import type { TILES } from "./enums";

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
</script>

<template>
  <header>
    <TheTitle />
  </header>
  <div class="wrapper">
    <FeatureContainer
      v-if="state.selectedTile"
      :tile="state.selectedTile"
      :content="tileContent"
    />
    <TileContainer
      :tiles="state.tiles"
      @select="selectTile"
    />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.wrapper {
  position: relative;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
