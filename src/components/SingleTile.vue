<script setup lang="ts">
defineProps<{
  title?: string;
  description?: string;
  hide?: boolean;
  size?: number;
}>();

const emit = defineEmits<{
  (e: "select"): void;
}>();

function select() {
  emit("select");
}
</script>

<template>
  <div
    class="single-tile"
    :class="{
      'single-tile--big': (size || 0) > 1,
      'single-tile--clickable': title,
      'single-tile--transparent': hide,
      'single-tile--hidden': !title
    }"
    @click="select"
  >
    <div class="single-tile__title">
      {{ title }}
    </div>
  </div>
</template>

<style scoped>
.single-tile {
  width: 256px;
  height: 256px;
  background-color: #FFFFFF;

  transition: opacity 0.5s linear, box-shadow 0.5s, left 0.5s;
}

.single-tile--clickable {
  cursor: pointer;
  z-index: 2;
}

.single-tile--big {
  width: 640px;
}

.single-tile--clickable:hover {
  box-shadow: 0px 0px 3px 0px #333333;
  z-index: 99;
}

.single-tile--transparent {
  opacity: 0;
}

.single-tile__title {
  margin: 15px 30px;
  font-size: 36px;
  color: #000000;
}

@media (min-width: 480px) {
  .single-tile {
    width: 240px;
    height: 240px;
  }

  .single-tile__title {
    font-size: 28px;
  }
}

@media (min-width: 768px) {
  .single-tile {
    width: 256px;
    height: 256px;
  }

  .single-tile__title {
    font-size: 32px;
  }
}

@media (min-width: 1024px) {
  .single-tile__title {
    font-size: 36px;
  }
}

@media (max-width: 480px) {
  .single-tile {
    width: 100%;
    height: 100%;
  }

  .single-tile__title {
    font-size: 28px;
  }
}
</style>