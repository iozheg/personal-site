<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue';

const props = defineProps<{
  content: string;
}>();

let currentContent = ref("");
let timeout: number;
let i = 0;
const sliceLength = 10;

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

onBeforeUnmount(() => {
  clearTimeout(timeout);
});

function type() {
    if (i < props.content.length) {
      currentContent.value += props.content.slice(i, i + sliceLength);
      i += sliceLength;
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

<style lang="scss">
.code-viewer {
  height: 100%;
  font-size: 0.8rem;

  pre {
    height: 100%;
    line-height: 1.2;

    .hljs {
      height: 100%;
    }
  }
}
</style>