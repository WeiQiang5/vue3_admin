import { defineStore } from "pinia";
import { LoginParams } from "@/interface/login";
import { login } from "@/api/login";
import md5 from "md5";
import { LoginReturnValue } from "@/api/login";
import { ApiResponse } from "@/interface/axiosType";

export interface UserState {
  userInfo: string;
  token: string;
}

// 一般的
const useUserStore = defineStore("user", {
  state: (): UserState => {
    return {
      userInfo: "",
      token: "",
    };
  },
  getters: {
    getUserInfo(): string {
      return this.userInfo;
    },
  },
  actions: {
    async login(
      loginParams: LoginParams
    ): Promise<ApiResponse<LoginReturnValue>> {
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
  persist: true,
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
