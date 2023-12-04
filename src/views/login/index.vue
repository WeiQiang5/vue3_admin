<template>
  <div class="w-full h-screen bg-slate-400">
    <div
      class="w-[400px] h-full m-auto flex flex-col justify-center items-center"
    >
      <el-form
        ref="loginFormRef"
        label-width="80px"
        label-position="left"
        :model="loginForm"
        class="w-full"
        :rules="loginRules"
      >
        <div class="w-full text-center py-3">
          <h3 class="text-white text-2xl">用户登录</h3>
        </div>
        <el-form-item label="账号" prop="username">
          <el-input v-model="loginForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item label-width="0">
          <el-button
            :loading="loading"
            class="w-full"
            type="primary"
            @click="clickLogin"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { validatePassword } from "./rules";
import { LoginParams } from "@/interface/login";
import useUserStore from "@/store/modules/user";
import { FormInstance, FormRules } from "element-plus";
import { useRouter } from "vue-router";

// 登录参数
const loginForm = ref<LoginParams>({
  username: "",
  password: "",
});
// 按钮loading状态
const loading = ref<boolean>(false);
// 验证规则
const loginRules = ref<FormRules>({
  username: [
    {
      required: true,
      trigger: "blur",
      message: "请输入用户名",
    },
  ],
  password: [
    {
      required: true,
      trigger: "blur",
      message: "请输入密码",
    },
    { validator: validatePassword, trigger: "blur" },
  ],
});
/**
 * 1.通过pinia获取全局用户状态
 * 2.通过storeToRefs获取解构后的响应式数据
 * 3.修改属性store.$patch(attr) 批量修改store.$patch(state=>{})
 * 4.重置state store.$reset()
 */
const store = useUserStore();
const router = useRouter();
const loginFormRef = ref<FormInstance>();
// 登录
const clickLogin = () => {
  // 1.进行表单校验
  loginFormRef.value?.validate(async (valid: boolean) => {
    if (!valid) return;
    loading.value = true;
    try {
      const { username, password } = loginForm.value;
      const res = await store.login({ username, password });
      store.token = res.data.token;
      loading.value = false;
      // 跳转
      router.push("/");
      console.log(res);
    } catch (e) {
      loading.value = false;
    }
  });
  // 2.触发登录动作
  // 3.进行登录后处理
};
</script>

<style scoped lang="scss">
:deep(.el-form-item__label) {
  color: rgb(255 255 255 / 1);
  font-size: 16px;
}
</style>
