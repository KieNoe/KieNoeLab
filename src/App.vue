<script setup lang="ts">
import BannerComponent from './components/BannerComponent.vue'
import SideBar from './components/SideBar.vue'
import LoadingComponent from './components/LoadingComponent.vue'
</script>

<template>
  <div class="content-container">
    <LoadingComponent />
    <SideBar />
    <BannerComponent />
  </div>
</template>

<style>
/* 移除 scoped，使样式全局可用 */
.ripple-effect {
  position: fixed; /* 改为 fixed 定位，相对于视口 */
  width: 20px;
  height: 20px;
  background: rgba(0, 0, 0, 0.2); /* 背景色为半透明黑色 */
  border-radius: 50%;
  transform: scale(0);
  animation: rippleEffect 0.6s linear;
  pointer-events: none;
  z-index: 9999; /* 添加高 z-index 确保在最上层 */
}

@keyframes rippleEffect {
  to {
    transform: scale(10);
    opacity: 0;
  }
}
</style>
