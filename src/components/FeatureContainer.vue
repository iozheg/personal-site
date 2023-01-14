<script setup lang="ts">
import SingleTile from './SingleTile.vue';
import FeatureData from './FeatureData.vue';
import type { ITile } from '@/types';

defineProps<{
  tile: ITile;
  content: string;
}>();
</script>

<template>
  <div class="feature-container">
    <SingleTile 
      :key="tile.id"
      :title="tile.title"
      :description="tile.description"
      :highlighted="true"
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
</style>