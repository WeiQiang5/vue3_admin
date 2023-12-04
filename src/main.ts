import { createApp } from "vue";
import App from "./App.vue";
import "@/style/index.scss";
import router from "@/router/index.ts";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./pemission";

const app = createApp(App);

app.use(router).use(store).use(ElementPlus).mount("#app");
