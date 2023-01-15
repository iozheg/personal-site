import { createRouter, createWebHistory } from "vue-router";
import SkillsView from "../views/SkillsView.vue";
import ContactsView from "../views/ContactsView.vue";

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
      name: "contacts",
      component: ContactsView
    },
  ],
});

export default router;
