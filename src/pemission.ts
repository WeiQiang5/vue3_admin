import router from "@/router";
import useUserStore from "./store/modules/user";

const white = ["/login", "/404", "/401"];

router.beforeEach(async (to, form, next) => {
  // 1.用户已登录，则不允许进入login
  // 2.用户未登录，只允许进入login
  const store = useUserStore();
  console.log("路由守卫==>token", store.token);

  if (store.token) {
    if (to.path === "/login") {
      next("/");
    } else {
      // 判断用户资料是否存在,如果不存在,则获取用户信息
      if (!store.hasUserInfo) {
        const res = await store.getUserInfo();
        store.userInfo = res.data;
      }
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
