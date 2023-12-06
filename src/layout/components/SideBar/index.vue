<template>
  <el-aside class="h-screen" width="auto">
    <el-menu
      class="el-menu-vertical"
      :default-active="current"
      unique-opened
      :collapse="isCollapse"
      mode="vertical"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      router
    >
      <template v-for="item in routes">
        <!-- 有子路由 -->
        <template v-if="item.children">
          <el-sub-menu :index="item.index" :key="item.index">
            <template #title>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.children">
              <el-sub-menu
                v-if="subItem.children"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template #title>{{ subItem.title }}</template>
                <el-menu-item
                  v-for="childItem in subItem.children"
                  :key="childItem.index"
                  :index="childItem.index"
                >
                  {{ childItem.title }}</el-menu-item
                >
              </el-sub-menu>
            </template>
          </el-sub-menu>
        </template>
        <!-- 无子路由 -->
        <template v-else>
          <el-menu-item
            :index="item.index"
            :key="item.index"
            v-permiss="item.permiss"
          >
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </el-aside>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import useSideBar from "@/store/modules/sidebar";
import { Variable } from "@/constant";
interface AsideProps {
  width: number;
}
// 导航栏宽度
const props = withDefaults(defineProps<AsideProps>(), {
  width: Variable.RIGHT_WIDTH,
});

// 导航栏收缩
const sidebarStore = useSideBar();
const isCollapse = computed((): boolean => sidebarStore.collapse);
const menuClass = computed((): string => `${props.width}px`);
// 导航栏当前索引
const current = ref<string>("0");

// 路由表
const routes = [
  {
    icon: "Odometer",
    index: "/dashboard",
    title: "系统首页",
    permiss: "1",
  },
  {
    icon: "Calendar",
    index: "1",
    title: "表格相关",
    permiss: "2",
    children: [
      {
        index: "/table",
        title: "常用表格",
        permiss: "2",
      },
      {
        index: "/import",
        title: "导入Excel",
        permiss: "2",
      },
      {
        index: "/export",
        title: "导出Excel",
        permiss: "2",
      },
    ],
  },
  {
    icon: "DocumentCopy",
    index: "/tabs",
    title: "tab选项卡",
    permiss: "3",
  },
  {
    icon: "Edit",
    index: "3",
    title: "表单相关",
    permiss: "4",
    children: [
      {
        index: "/form",
        title: "基本表单",
        permiss: "5",
      },
      {
        index: "/upload",
        title: "文件上传",
        permiss: "6",
      },
      {
        index: "4",
        title: "三级菜单",
        permiss: "7",
        children: [
          {
            index: "/editor",
            title: "富文本编辑器",
            permiss: "8",
          },
          {
            index: "/markdown",
            title: "markdown编辑器",
            permiss: "9",
          },
        ],
      },
    ],
  },
  {
    icon: "Setting",
    index: "/icon",
    title: "自定义图标",
    permiss: "10",
  },
  {
    icon: "PieChart",
    index: "/charts",
    title: "schart图表",
    permiss: "11",
  },
  {
    icon: "Warning",
    index: "/permission",
    title: "权限管理",
    permiss: "13",
  },
  {
    icon: "CoffeeCup",
    index: "/donate",
    title: "支持作者",
    permiss: "14",
  },
];
</script>

<style scoped lang="scss">
::v-deep(.el-menu) {
  height: 100%;
  .el-sub-menu {
    width: 100%;
    .div {
      width: 100%;
    }
  }
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: v-bind(menuClass);
  min-height: 400px;
}
</style>
