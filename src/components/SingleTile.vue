<script setup lang="ts">
defineProps<{
  title?: string;
  description?: string;
  highlighted?: boolean;
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
      'single-tile--clickable': title && !highlighted,
      'single-tile--highlighted': highlighted
    }"
    @click="select"
  >
    <button v-if="highlighted" class="single-tile__back-button">
      &larr;back
    </button>
    <div class="single-tile__title">
      {{ title }}
    </div>
    <div class="single-tile__description">
      {{ description }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.single-tile {
  flex-shrink: 0;
  width: 256px;
  height: 256px;
  padding: 15px 30px;
  background-color: #FFFFFF;

  transition: opacity 0.5s linear, box-shadow 0.5s, left 0.5s;

  &--clickable {
    cursor: pointer;
    z-index: 2;

    &:hover {
      box-shadow: 0px 0px 3px 0px #333333;
      z-index: 99;
    }
  }

  &__title {
    font-size: 36px;
    color: #000000;
  }

  &--highlighted {
    background-color: #2D2D2D;
  }

  &--highlighted &__title {
    color: #FFFFFF;
  }

  &__back-button {
    padding: 0;
    border: none;
    background: none;
    color: #FFFFFF;
    cursor: pointer;
  }
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