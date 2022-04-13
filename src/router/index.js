import { createRouter, createWebHistory } from "vue-router";
import TheNewForm from "@/views/TheNewForm";
import TheAllTasks from "@/views/TheAllTasks";
import TheErrorPage from "@/views/TheErrorPage";
import TheTask from "@/views/TheTask";

const routes = [
  { path: "/all", component: TheAllTasks, alias: '/' },
  { path: "/new", component: TheNewForm },
  { path: "/task/:id", component: TheTask },
  { path: "/:error(.*)", component: TheErrorPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
});

export default router;