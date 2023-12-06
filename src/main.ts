import { createApp } from "vue";
import App from "./App.vue";
import "@/style/index.scss";
import router from "@/router/index.ts";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./pemission";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// 引入图标
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router).use(store).use(ElementPlus).mount("#app");
