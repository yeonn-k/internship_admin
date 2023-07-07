import { createRouter, createWebHistory } from "vue-router";

import ContactVue from "../pages/Contact/Contact.vue";
import AdminVue from "../pages/Admin/Admin.vue";

const routes = [
  { path: "/contact", component: ContactVue },
  { path: "/admin", component: AdminVue },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
