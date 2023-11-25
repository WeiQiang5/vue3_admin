import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

// 公开路由表
const publicRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes,
});

export default router;
