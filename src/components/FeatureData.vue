<script setup lang="ts">
import { CONTENT_TYPES } from '@/enums';
import type { Component } from 'vue';
import CodeViewer from './contentViewers/CodeViewer.vue';

defineProps<{
  type?: CONTENT_TYPES;
  content: string;
}>();

const typeComponents: { [key in CONTENT_TYPES]: Component } = {
  code: CodeViewer
}
</script>

<template>
  <div class="feature-data">
    <component
      :is="typeComponents[type || CONTENT_TYPES.code]"
      :content="content"
    />
  </div>
</template>

<style scoped>
.feature-data {
  height: 100%;
  overflow: auto;
}
</style>