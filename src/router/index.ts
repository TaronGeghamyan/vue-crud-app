import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "States Cases",
    component: HomeView,
  },
  {
    path: "/national",
    name: "National Cases",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/NationalView.vue"),
  },
  {
    path: "/history",
    name: "History",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/HistoryView.vue"),
  },
  {
    path: "/States",
    name: "States",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/StatesView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
