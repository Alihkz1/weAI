import Index from "@/pages/upload/index.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes: any[] = [
  {
    path: "/",
    redirect: { name: "upload" },
  },
  {
    path: "/upload",
    name: 'upload',
    component: Index,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
