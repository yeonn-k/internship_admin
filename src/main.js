import { createApp } from "vue";
import App from "./App.vue";
import "./assets/scss/common.scss";
import "./assets/scss/reset.scss";

import { router } from "./router/index.js";

const app = createApp(App);
app.use(router);
app.mount("#app");
