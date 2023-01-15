<script setup lang="ts">
import { RouterView } from "vue-router";
import TheTitle from "./components/TheTitle.vue";
import MainMenu from "./components/MainMenu.vue";
</script>

<template>
  <header>
    <TheTitle />
    <MainMenu />
  </header>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.wrapper {
  position: relative;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
