import { createRouter, createWebHistory } from "vue-router";
import SkillsView from "../views/SkillsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/skills",
      name: "home"
    },
    {
      path: "/skills",
      name: "skills",
      component: SkillsView,
    },
    {
      path: "/contacts",
      name: "contacts"
    },
  ],
});

export default router;
