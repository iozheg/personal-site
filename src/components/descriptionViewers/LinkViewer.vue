<script setup lang="ts">
defineProps<{
  label: string;
  href: string;
}>();
</script>

<template>
  <a :href="href" target="_blank">{{ label }}</a>
</template>