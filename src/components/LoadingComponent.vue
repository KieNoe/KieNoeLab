<script setup lang="ts">
import { useGlobalStore } from '@/stores/pageLoad'
import { watch } from 'vue'
import { nextTick } from 'vue'

const globalStore = useGlobalStore()
window.addEventListener('load', () => {
  if (window.customElements.get('ion-icon')) {
    setTimeout(() => {
      document.querySelector('.loading')?.classList.remove('active')
    }, 1000)
  }
})
watch(
  () => globalStore.pageLoaded,
  async (newVal) => {
    await nextTick() // 确保 DOM 更新完成
    if (newVal) {
      document.querySelector('.loading')?.classList.remove('active')
    } else {
      document.querySelector('.loading')?.classList.add('active')
    }
  }
)
</script>
<template>
  <div class="loading active">
    <div class="layout">
      <img src="../assets/LOGO.png" alt="" />
    </div>
  </div>
</template>
<style scoped>
.loading {
  position: fixed;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: #8cc8ff;
  z-index: 1000000;
  transform: translateX(100vw);
  transition: 0.7s ease;
  animation-delay: 0.5s;
}
.layout {
  width: 100%;
  height: 100%;
  background: #d9ebff;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(100vw);
  transition: 0.7s ease;
}
.loading.active {
  transform: translateX(0);
}
.loading.active .layout {
  transform: translateX(0);
}
</style>
