<script setup lang="ts">
import type { ITile } from '@/types';
import { computed } from 'vue';

const props = defineProps<{
  tile: ITile;
  clickable?: boolean;
  hidden?: boolean;
  dark?: boolean;
}>();

const emit = defineEmits<{
  (e: "select"): void;
  (e: "return"): void;
}>();

const isClickable = computed(() => props.clickable ?? true);
</script>

<template>
  <div
    class="single-tile"
    :class="{
      'single-tile--clickable': isClickable,
      'single-tile--hidden': hidden,
      'single-tile--dark': dark
    }"
    @click="emit('select')"
  >
    <button
      v-if="!isClickable && dark"
      class="single-tile__back-button"
      @click="emit('return')"
    >
      &larr; back
    </button>
    <div class="single-tile__title">
      {{ tile.title }}
    </div>
    <div v-if="!isClickable" v-html="tile.description" class="single-tile__description">
    </div>
  </div>
</template>

<style scoped lang="scss">
.single-tile {
  flex-shrink: 0;
  width: var(--big-tile-size);
  height: var(--big-tile-size);
  padding: 15px 30px;
  background-color: #FFFFFF;
  transition: box-shadow 0.5s, left 0.5s;

  &--clickable {
    cursor: pointer;
    z-index: 2;

    &:hover {
      box-shadow: 0px 0px 3px 0px #333333;
      z-index: 99;
    }
  }

  &--hidden {
    animation: hide var(--tile-transition-time) forwards;
  }

  &--dark {
    background-color: #2D2D2D;
  }

  &__title {
    font-size: 36px;
    color: #000000;
  }

  &--dark &__description {
    color: var(--color-text);
  }

  &--dark &__title {
    color: #FFFFFF;
  }

  &__back-button {
    padding: 0;
    border: none;
    background: none;
    color: #FFFFFF;
    cursor: pointer;
  }

  &__description {
    color: #000000;
    overflow-wrap: break-word;
  }
}

@keyframes hide {
    to {
        height: 0;
    }
}

@keyframes show {
    to {
        height: unset;
    }
}

@media (min-width: 480px) {
  .single-tile {
    width: var(--small-tile-size);
    height: var(--small-tile-size);

    &--dark {
      width: calc(var(--small-tile-size) * 2);
    width: 100%;
      height: 100%;
    }
  }

  .single-tile__title {
    font-size: 28px;
  }
}

@media (min-width: 768px) {
  .single-tile {
    width: var(--big-tile-size);
    height: var(--big-tile-size);
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