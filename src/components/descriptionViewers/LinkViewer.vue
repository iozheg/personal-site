<script setup lang="ts">
defineProps<{
  label: string;
  href: string;
}>();
</script>

<template>
  <a class="link-viewer" :href="href" target="_blank">{{ label }}</a>
</template>

<style scoped lang="scss">
.link-viewer {
  overflow-wrap: break-word;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
}
</style>