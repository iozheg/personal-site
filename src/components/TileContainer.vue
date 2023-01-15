<script setup lang="ts">
import SingleTile from './SingleTile.vue';
import type { ITile } from '@/types';
import type { TILES } from '@/enums';

defineProps<{
  tiles: ITile[];
  hide: boolean;
}>();

const emit = defineEmits<{
  (e: "select", tileId: TILES): void;
}>();

function selectTile(tileId: TILES) {
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
      :title="tile.title"
      :clickable="true"
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
  background-color: #FFFFFF;
  transition: left 0.5s linear;

  &--hidden {
    display: none;
  }
}
</style>