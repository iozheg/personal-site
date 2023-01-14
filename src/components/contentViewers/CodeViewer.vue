<script setup lang="ts">
defineProps<{
  content: string;
}>();

</script>

<template>
  <div class="code-viewer">
    <highlightjs
        language="typescript"
        :code="content"
    />
  </div>
</template>