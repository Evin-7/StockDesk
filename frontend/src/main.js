import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import VueScrollTo from "vue-scrollto";

import "@/assets/styles/global.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";
async function initApp() {
  const app = createApp(App);
  app.config.performance = true;
  app.use(VueScrollTo);
  app.use(createPinia());
  app.use(router);

  app.mount("#app");
}

initApp();
