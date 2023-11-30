import { defineStore } from "pinia";
import { LoginParams } from "@/interface/login";
import { login } from "@/api/login";
import md5 from "md5";

export interface UserState {
  userInfo: string;
}

// 一般的
const useUserStore = defineStore("user", {
  state: (): UserState => {
    return {
      userInfo: "",
    };
  },
  getters: {
    getUserInfo(): string {
      return this.userInfo;
    },
  },
  actions: {
    login(loginParams: LoginParams) {
      const { username, password } = loginParams;
      return new Promise((resolve, reject) => {
        return login({
          username,
          password: md5(password),
        })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});

// 函数式写法
// const useUserStore = defineStore("user", () => {
//   // state
//   const state = reactive<UserState>({
//     userInfo: {},
//   });
//   //   getters
//   const getUserInfo = () => state.userInfo;
//   return {
//     ...toRefs(state),
//     getUserInfo,
//   };
// });

export default useUserStore;
