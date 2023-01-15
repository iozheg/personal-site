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
  display: flex;
  flex-direction: column;
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
