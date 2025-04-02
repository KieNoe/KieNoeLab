<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const isDark = ref(localStorage.getItem('theme') === 'dark')
const isButtonEnabled = ref(true)
function handleThemeToggle() {
  if (isButtonEnabled.value) {
    isButtonEnabled.value = false
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark')
    setTimeout(() => {
      isButtonEnabled.value = true
    }, 500)
  }
}
function initTheme() {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  }
}
function handleToggleLanguage() {
  const currentLanguage = localStorage.getItem('language') || 'zh'
  const newLanguage = currentLanguage === 'zh' ? 'en' : 'zh'
  locale.value = newLanguage
  localStorage.setItem('language', newLanguage)
}
// 初始化主题
onMounted(() => {
  initTheme()
})
</script>

<template>
  <div class="banner">
    <div class="left">
      <div class="name">
        <RouterLink to="/" class="router-link">KieNoeLab</RouterLink>
      </div>
    </div>
    <div class="right">
      <div class="language" @click="handleToggleLanguage">
        <ion-icon name="language-outline"></ion-icon>
      </div>
      <div class="theme" @click="handleThemeToggle">
        <ion-icon :name="isDark ? 'moon-outline' : 'sunny-outline'"></ion-icon>
      </div>
      <div class="notification">
        <RouterLink to="/notification" class="router-link"
          ><ion-icon name="notifications-outline"></ion-icon
        ></RouterLink>
      </div>
      <div class="me">
        <RouterLink to="/me" class="router-link"
          ><ion-icon name="person-circle-outline"></ion-icon
        ></RouterLink>
      </div>
    </div>
  </div>
  <div class="main">
    <RouterView />
  </div>
  <div class="clip"></div>
</template>

<style>
/* 全局CSS变量 */
:root {
  --background-color: #fff;
  --text-color: #222;
  --color-01: rgba(0, 0, 0, 0.1);
  --border-color: rgba(0, 0, 0, 0.2);
  --border-color-deep: rgba(0, 0, 0, 0.25);
  --hover-color: rgba(0, 0, 0, 0.2);
  --middle-color: rgba(0, 0, 0, 0.5);
  --deep-color-8: rgba(0, 0, 0, 0.8);
  --deep-color-10: rgba(0, 0, 0, 1);
  --main-background: #3d4152;
  --main-color-666: rgb(102, 102, 102);
  --more-color-1: rgb(245, 247, 250);
  --more-color-2: rgb(228, 231, 237);
  --theme-background-inverted: #1c1b20;
  --show-color: rgba(0, 0, 0, 0.2);
}

:root.dark {
  --background-color: #1c1b20;
  --text-color: #f5f7fa;
  --color-01: rgba(255, 255, 255, 0.1);
  --border-color: rgba(255, 255, 255, 0.2);
  --middle-color: rgba(255, 255, 255, 0.5);
  --border-color-deep: rgba(255, 255, 255, 0.25);
  --hover-color: rgba(255, 255, 255, 0.2);
  --deep-color-8: rgba(255, 255, 255, 0.8);
  --deep-color-10: rgba(255, 255, 255, 1);
  --main-background: #222126;
  --main-color-666: rgb(200, 200, 200);
  --more-color-1: #1c1b20;
  --more-color-2: #222126;
  --theme-background-inverted: #e0e0e5;
  --show-color: rgba(0, 0, 0, 0.7);
}
</style>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 移除主题切换动画样式，使用ThemeToggleAnimation组件 */
.banner {
  position: fixed;
  height: 50px;
  width: 100vw;
  top: 0;
  right: 0;
  background: var(--background-color);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
}
.banner .left {
  width: 320px;
  height: 50px;
  display: flex;
  align-items: flex-end;
  flex: 1;
}
.banner .left .router-link {
  height: 50px;
  line-height: 50px;
  padding: 0 0 0 130px;
  font-weight: 700;
  font-size: 30px;
  color: var(--text-color);
  text-decoration: none;
  transition: 0.5s;
}
.banner .left .router-link:hover {
  font-size: 40px;
}
.banner .right {
  height: 50px;
  width: 220px;
  display: flex;
  padding: 0 20px 0 0;
}
.banner .right .notification {
  flex: 1;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
}
.banner .right .notification::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--hover-color);
  border-radius: 50%;
  transition: 0.5s;
  opacity: 0;
}
.banner .right .notification:hover::before {
  opacity: 1;
}
.banner .right .notification ion-icon {
  color: var(--text-color);
  font-size: 35px;
}
.banner .right .me {
  flex: 1;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
}
.banner .right .me::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--hover-color);
  border-radius: 50%;
  transition: 0.5s;
  opacity: 0;
}
.banner .right .me:hover::before {
  opacity: 1;
}
.banner .right .me ion-icon {
  color: var(--text-color);
  font-size: 40px;
}
.banner .right .language {
  flex: 1;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
}
.banner .right .language ion-icon {
  color: var(--text-color);
  font-size: 35px;
  padding: 0 0 5px 0;
}
.banner .right .language::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--hover-color);
  border-radius: 50%;
  transition: 0.5s;
  opacity: 0;
}
.banner .right .language:hover::before {
  opacity: 1;
}
.banner .right .theme {
  flex: 1;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.banner .right .theme ion-icon {
  color: var(--text-color);
  width: 35px;
  height: 35px;
}
.banner .right .theme::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--hover-color);
  border-radius: 50%;
  transition: 0.5s;
  opacity: 0;
}
.banner .right .theme:hover::before {
  opacity: 1;
}
.main {
  position: absolute;
  top: 0;
  padding-top: 50px;
  padding-left: 75px;
  background: var(--main-background);
  width: 100%;
  height: 100vh;
}
</style>
