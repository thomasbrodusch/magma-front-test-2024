// NPM
import { createApp } from "vue";
import { createPinia } from "pinia";
import { Vue3Mq } from "vue3-mq";

// Plugins
import i18n from "@/plugins/i18n";
import FloatingVue from "floating-vue";

// Vue
import App from "@/App.vue";
import router from "@/router";

// Stylesheets
import "magma-design-system-test/dist/style.css";
import "@/assets/base.css";
import "@/assets/floating-vue.css";

// Initialize Vue App
const app = createApp(App);

// Set up plugins
app.use(createPinia());
app.use(i18n);
app.use(Vue3Mq, {
  preset: "tailwind",
  breakpoints: {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536
  }
});
app.use(FloatingVue);
app.use(router);

// Attach Vue instance to the DOM
router.isReady().then(() => {
  app.mount("#app");
});
