<template>
  <el-container class="w-screen h-screen">
    <SideBar />
    <Transition name="move">
      <el-container>
        <Header />
        <AppMain />
      </el-container>
    </Transition>
  </el-container>
</template>

<script lang="ts" setup>
import Header from "./components/Header/index.vue";
import SideBar from "./components/SideBar/index.vue";
import AppMain from "./components/AppMain/index.vue";
</script>

<style scoped lang="scss"></style>
