import { createRouter, createWebHistory } from "vue-router";
import SkillsView from "../views/SkillsView.vue";
import ContactsView from "../views/ContactsView.vue";
import AboutView from "../views/AboutView.vue";

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
    {
      path: "/about",
      name: "about",
      component: AboutView
    },
  ],
});

export default router;
