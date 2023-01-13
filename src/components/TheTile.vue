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
    class="tile"
    :class="{
      'tile--big': (size || 0) > 1,
      'tile--clickable': title,
      'tile--transparent': hide,
      'tile--hidden': !title
    }"
    @click="select"
  >
    <div class="tile__title">
      {{ title }}
    </div>
  </div>
</template>

<style scoped>
.tile {
  width: 256px;
  height: 256px;
  background-color: #FFFFFF;

  transition: opacity 0.5s linear, box-shadow 0.5s, left 0.5s;
}

.tile--clickable {
  cursor: pointer;
  z-index: 2;
}

.tile--big {
  width: 640px;
}

.tile--clickable:hover {
  box-shadow: 0px 0px 3px 0px #333333;
  z-index: 99;
}

.tile--transparent {
  opacity: 0;
}

.tile__title {
  margin: 15px 30px;
  font-size: 36px;
  color: #000000;
}

@media (min-width: 480px) {
  .tile {
    width: 240px;
    height: 240px;
  }

  .tile__title {
    font-size: 28px;
  }
}

@media (min-width: 768px) {
  .tile {
    width: 256px;
    height: 256px;
  }

  .tile__title {
    font-size: 32px;
  }
}

@media (min-width: 1024px) {
  .tile__title {
    font-size: 36px;
  }
}

@media (max-width: 480px) {
  .tile {
    width: 100%;
    height: 100%;
  }

  .tile__title {
    font-size: 28px;
  }
}
</style>