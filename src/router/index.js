import { createRouter, createWebHistory } from "vue-router";

import ContactVue from "../Contact.vue";
import AdminVue from "../Admin/Admin.vue";

const routes = [
  { path: "/contact", component: ContactVue },
  { path: "/admin", component: AdminVue },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
