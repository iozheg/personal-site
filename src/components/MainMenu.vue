<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
  menu: [{
      label: "skills",
      route: "/skills"
    }, {
      label: "contacts",
      route: "/contacts"
    }, {
      label: "about",
      route: "/about"
    }
  ]
});
</script>

<template>
  <nav class="main-menu">
    <RouterLink
      v-for="item in state.menu"
      :key="item.label"
      :to="item.route"
      class="main-menu__item"
    >{{ item.label }}</RouterLink>
  </nav>
</template>

<style scoped lang="scss">
.main-menu {
  margin: 3rem 0 1rem 0;
  font-size: 1rem;
  text-align: center;

  &__item {
    margin: 0 6px;
    padding: 5px;

    &:hover {
      border-bottom: 2px solid;
    }

    &.router-link-exact-active {
      background-color: #2D2D2D;
      color: var(--color-text-white-soft);
    }
  }
}

@media (max-width: 480px) {
  .main-menu {
    margin: 1.5rem 0 .5rem 0;
  }
}
</style>