import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      window.scrollTo(0, 0);
      return { left: 0, top: 0, behavior: "smooth" };
    }
  },

  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },

    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: () => import("@/views/_404.vue"),
    },
  ],
});

export default router;
