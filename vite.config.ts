import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// const pathSrc = path.resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // 代理
  server: {
    proxy: {
      // 代理所有 /api 的请求，该求情将被代理到 target 中
      "/api": {
        // 代理请求之后的请求地址
        target: "https://api.imooc-admin.lgdsunday.club/",
        // 跨域
        changeOrigin: true,
      },
    },
  },
});
