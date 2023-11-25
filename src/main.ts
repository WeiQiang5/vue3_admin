import { createApp } from "vue";
import App from "./App.vue";
import "@/style/index.scss";
import router from "@/router/index.ts";

const app = createApp(App);

app.use(router).mount("#app");
