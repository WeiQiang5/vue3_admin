<template>
  <!-- 展示内部·图标 -->
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    :class="className"
    class="svg-external-icon svg-icon"
  ></div>
  <!-- 展示外部图标 -->
  <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { isExternal as external } from "@/utils/validate";
interface SvgIconProps {
  // icon图标
  icon: string;
  //   图标类名
  className: string;
}
const props = withDefaults(defineProps<SvgIconProps>(), {});

// 判断当前图标是否为外部图标
const isExternal = computed(() => external(props.icon));
// 外部图标样式
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  "-webkit-mask": `url(${props.icon}) no-repeat`,
}));
// 内部图标
const iconName = computed(() => `#icon-${props.icon}`);
</script>

<style scoped lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
