<template>
  <div class="w-full h-screen bg-slate-400">
    <div
      class="w-[400px] h-full m-auto flex flex-col justify-center items-center"
    >
      <el-form
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
          <el-button class="w-full" type="primary" @click="clickLogin"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FormRules } from "element-plus";
import { validatePassword } from "./rules";

interface LoginParams {
  username: string;
  password: string;
}
const loginForm = ref<LoginParams>({
  username: "",
  password: "",
});
// 验证规则

const loginRules = ref<InstanceType<typeof FormRules>>({
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
// 登录
const clickLogin = () => {};
</script>

<style scoped lang="scss">
:deep(.el-form-item__label) {
  color: rgb(255 255 255 / 1);
  font-size: 16px;
}
</style>
