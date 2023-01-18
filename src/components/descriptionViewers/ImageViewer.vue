<script setup lang="ts">
defineProps<{
  imageUrl: string;
}>();
</script>

<template>
  <div class="image-viewer">
    <img class="image-viewer__image" :src="imageUrl" />
  </div>
</template>

<style scoped lang="scss">
.image-viewer {
  align-self: center;
  min-width: 0;
  min-height: 0;

  &__image {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>