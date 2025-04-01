<script setup lang="ts">
import BannerComponent from './components/BannerComponent.vue'
import SideBar from './components/SideBar.vue'
import LoadingComponent from './components/LoadingComponent.vue'
import { onMounted } from 'vue'

// 将事件监听放在 onMounted 中，确保 DOM 已加载
onMounted(() => {
  document.addEventListener('click', function (e) {
    const ripple = document.createElement('div')
    ripple.classList.add('ripple-effect') // 修改类名，避免与组件内的样式冲突

    document.body.appendChild(ripple)

    // 设置涟漪的位置（让其中心位于鼠标点击位置）
    ripple.style.left = `${e.clientX - 10}px`
    ripple.style.top = `${e.clientY - 10}px`

    // 动画结束后删除元素，避免 DOM 过多
    ripple.addEventListener('animationend', () => {
      ripple.remove()
    })
  })
})
</script>

<template>
  <LoadingComponent />
  <SideBar />
  <BannerComponent />
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
:root {
  --bg-color: white;
  --text-color: black;
}

.dark {
  --bg-color: #1a202c;
  --text-color: white;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}
</style>
