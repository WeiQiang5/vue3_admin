<template>
  <el-container class="w-screen h-screen">
    <SideBar />
    <el-container class="main">
      <Header />
      <AppMain />
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import Header from "./components/Header/index.vue";
import SideBar from "./components/SideBar/index.vue";
import AppMain from "./components/AppMain/index.vue";
</script>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: column;
}
</style>
