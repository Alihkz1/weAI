import Index from "@/pages/upload/index.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/upload",
    component: Index,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
