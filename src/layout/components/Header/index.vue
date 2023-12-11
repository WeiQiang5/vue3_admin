<template>
  <el-header
    :height="customHeight"
    class="flex items-center relative border-b-2 border-slate-200 shadow-sm"
    style="width: 100%"
  >
    <!-- 折叠按钮 -->
    <div
      class="absolute left-[20px] w-[25px] h-[25px] cursor-pointer"
      @click="clickCollapse"
    >
      <el-icon size="25" v-if="isCollapse">
        <Expand />
      </el-icon>
      <el-icon v-else size="25">
        <Fold />
      </el-icon>
    </div>
    <div class="absolute right-[20px]">
      <el-dropdown trigger="click">
        <div class="flex items-center">
          <el-avatar
            shape="square"
            :size="40"
            :src="userStore.userInfo.avatar"
          ></el-avatar>
          <el-icon size="25" class="ml-1">
            <Tools />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/"
              ><el-dropdown-item> 主页 </el-dropdown-item></router-link
            >
            <el-dropdown-item divided @click="handleLogout">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import useUserStore from "@/store/modules/user";
import useLayout from "@/store/modules/layout";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
// 用户状态
const userStore = useUserStore();
// 导航栏状态
const layoutStore = useLayout();

// 导航栏收缩
const isCollapse = computed(() => layoutStore.collapse);
const clickCollapse = () => {
  layoutStore.handleCollapse();
};

interface HeaderProps {
  height: number;
}
const props = withDefaults(defineProps<HeaderProps>(), {
  height: 60,
});
// 高度
const customHeight = computed(() => `${props.height}px`);

// 退出登录
const router = useRouter();
const handleLogout = () => {
  userStore.logout();

  ElMessage.success("退出登录成功");
  setTimeout(() => {
    router.push("/login");
  }, 500);
};
</script>
<style scoped lang="scss"></style>
