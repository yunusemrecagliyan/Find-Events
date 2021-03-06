import { createApp } from "vue";
import { createPinia } from "pinia";
import VueClickAway from "vue3-click-away";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import App from "./App.vue";
import router from "./router";
import "./index.css";
import { TurkishSuffixPlugin } from "./plugins/turkish-suffix";
import { TurkishSlugPlugin } from "./plugins/turkish-slug";
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Toast, {});
app.use(TurkishSuffixPlugin);
app.use(TurkishSlugPlugin);

app.use(VueClickAway);
app.mount("#app");
