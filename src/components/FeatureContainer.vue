<script setup lang="ts">
import SingleTile from './SingleTile.vue';
import FeatureData from './FeatureData.vue';
import type { ITile } from '@/types';

defineProps<{
  tile: ITile;
  content: string;
}>();

const emit = defineEmits<{
  (e: "return"): void;
}>();
</script>

<template>
  <div class="feature-container">
    <SingleTile 
      :key="tile.id"
      :tile="tile"
      :clickable="false"
      :dark="true"
      @return="emit('return')"
    />
    <FeatureData
      :type="tile.contentType"
      :content="content"
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

@media (max-width: 768px) {
  .feature-container {
    flex-wrap: wrap;
  }
}
</style>