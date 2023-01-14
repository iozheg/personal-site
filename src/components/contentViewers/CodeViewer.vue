<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  content: string;
}>();

let currentContent = ref("");
let timeout: number;
let i = 0;

watch(
  () => props.content,
  () => {
    currentContent.value = "";
    clearTimeout(timeout);
    i = 0;
    type();
  },
  {
    immediate: true
  }
);

function type() {
    if (i < props.content.length) {
      currentContent.value += props.content[i];
      i++;
      timeout = setTimeout(type, 10);
    } else {
      clearTimeout(timeout);
    }
}

</script>

<template>
  <div class="code-viewer">
    <highlightjs
        autodetect
        :code="currentContent"
    />
  </div>
</template>