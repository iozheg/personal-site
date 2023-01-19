<script setup lang="ts">
import SingleTile from './SingleTile.vue';
import type { ITile } from '@/types';

defineProps<{
  tiles: ITile[];
  hide?: boolean;
  interactive: boolean;
}>();

const emit = defineEmits<{
  (e: "select", tileId: string): void;
}>();

function selectTile(tileId: string) {
  emit("select", tileId);
}
</script>

<template>
  <div
    class="tile-container"
    :class="{ 'tile-container--hidden': hide }"
  >
    <SingleTile
      v-for="tile in tiles"
      :key="tile.id"
      :tile="tile"
      :clickable="interactive"
      :hidden="hide"
      @select="selectTile(tile.id)"
    />
  </div>
</template>

<style scoped lang="scss">
.tile-container {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  background-color: var(--color-text-white-soft);
  transition: left 0.5s linear;
  transition: all var(--tile-transition-time);

  &--hidden {
    visibility: hidden;
    opacity: 0;
    transition: all var(--tile-transition-time);
  }
}
</style>