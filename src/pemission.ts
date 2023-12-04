import router from "@/router";
import useUserStore from "./store/modules/user";

const white = ["/login", "/404", "/401"];

router.beforeEach((to, form, next) => {
  // 1.用户已登录，则不允许进入login
  // 2.用户未登录，只允许进入login
  const store = useUserStore();
  console.log(store.token);

  if (store.token) {
    if (to.path === "/login") {
      next("/");
    } else {
      next();
    }
  } else {
    if (white.includes(to.path)) {
      next();
    } else {
      next("/login");
    }
  }
});
