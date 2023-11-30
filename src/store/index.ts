import { createPinia } from "pinia";
// 引入持久化处理
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const store = createPinia();

store.use(piniaPluginPersistedstate);

export default store;
