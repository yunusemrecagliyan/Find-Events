import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { getToken, getUser } from "../services/jwt";
import { useAuthStore } from "../stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        layout: "search",
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      meta: {
        redirectIfLoggedIn: true,
        layout: "auth",
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
      meta: {
        redirectIfLoggedIn: true,
        layout: "auth",
      },
    },
    {
      path: "/purchase",
      name: "purchase",
      component: () => import("../views/PurchaseView.vue"),
      meta: {
        redirectIfNotLoggedIn: true,
        layout: "normal",
      },
    },
    {
      path: "/:slug/:id",
      name: "eventDetail",
      component: () => import("../views/EventDetailView.vue"),
      meta: {
        layout: "search",
      },
    },
    {
      path: "/sanatci/:slug/:id",
      name: "artist",
      component: () => import("../views/ArtistView.vue"),
      meta: {
        layout: "search",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  authStore.user = getUser();

  const token = getToken();
  // Redirect if not logged in
  if (to.meta.redirectIfNotLoggedIn && !token) {
    return next({ path: "/login" });
  }

  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && token) {
    return next({ path: "/" });
  }
  return next();
});

export default router;
