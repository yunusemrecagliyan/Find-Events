import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import config from "../services/jwt/config";

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
  ],
});

router.beforeEach((to, _, next) => {
  const isLoggedIn = getUserData();

  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    next(getHomeRouteForLoggedInUser());
  }

  // Redirect if not logged in
  if (to.meta.redirectIfNotLoggedIn && !isLoggedIn) {
    next({ name: "/login" });
  }

  return next();
});

const getUserData = () =>
  JSON.parse(localStorage.getItem(config.STORAGE_TOKEN_KEY_NAME));

const getHomeRouteForLoggedInUser = () => {
  const userData = getUserData();
  if (userData) return "/";
  return { name: "/login" };
};

export default router;
