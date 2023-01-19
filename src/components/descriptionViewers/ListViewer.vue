<script setup lang="ts">
defineProps<{
  items: string[];
}>();
</script>

<template>
  <div class="list-viewer">
    <ul>
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.list-viewer {
  color: var(--color-text);

  ul {
    padding-left: 16px;
  }
}
</style>