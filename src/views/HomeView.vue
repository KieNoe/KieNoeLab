<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import labList from '@/components/labList.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const msg = '实验样例'
const toLabList = '/labList'
const content1 = ` 进行整体设计风格的规划，确保图标、文字、元素位置等方面的一致性；
                  配置路由跳转及页面切换功能的实现；`
const content2 = `  设计并实现 Banner、SideBar、Loading 等核心组件；完成
                  Notification、labList、Content、Footer 等页面的设计与实现。 `
const content3 = `  完成登录与注册页面的设计，实现了邮箱注册与登录功能，以及邮箱找回密码机制 `
const content4 = `  优化页面元素的交互效果，使操作更加流畅自然，并通过多元化的页面配色方案提升视觉体验 `
const notificationList = [
  { id: '18eg40', version: '版本更新 1.0.0', contents: [content1, content2] },
  { id: '18eg41', version: '版本更新 1.0.1', contents: [content3, content4] },
  { id: '18eg42', version: '版本更新 1.0.2', contents: [content1, content2] },
  { id: '18eg43', version: '版本更新 1.0.3', contents: [content1, content2] },
  { id: '18eg44', version: '版本更新 1.0.4', contents: [content1, content2] },
  { id: '18eg45', version: '版本更新 1.0.4', contents: [content1, content2] }
]
const activeIndex = ref<number | null>(null)

const toggleActive = (index: number) => {
  if (activeIndex.value === index) {
    activeIndex.value = null
  } else {
    activeIndex.value = index
  }
}
const toNotification = () => {
  router.push('/notification')
}
</script>
<template>
  <div class="page">
    <div class="notification">
      <div class="title">
        <span @click="toNotification">通知</span>
        <RouterLink to="/notification" class="router-link"> 更多 </RouterLink>
      </div>
      <el-card :body-style="{ padding: '0' }">
        <ul class="demo-collapse">
          <li
            v-for="(item, index) in notificationList"
            :key="item.id"
            :class="{ active: activeIndex === index }"
            @click="toggleActive(index)"
          >
            <div class="all">
              <div class="out">
                {{ item.version }}
                <span><ion-icon name="caret-forward-outline"></ion-icon></span>
              </div>
              <div class="in">
                <div v-for="(content, idx) in item.contents" :key="idx">{{ content }}</div>
              </div>
            </div>
          </li>
        </ul>
      </el-card>
    </div>
    <labList :name="msg" :toWhere="toLabList" />
    <div class="footer">
      <div class="txt">© 2025 KieNoeLab 保留所有权利</div>
      <div class="txt">苏A093JDU8261号</div>
    </div>
  </div>
</template>
<style scoped>
* {
  padding: 0;
  margin: 0;
  color: var(--text-color);
}
.page {
  width: 100%;
  min-height: 100vh;
  background: var(--background-color);
  padding-top: 2vh;
}
.notification {
  margin: 0 2vw;
  min-height: 60vh;
}

.notification ul li {
  height: 48px;
  list-style: none;
  cursor: pointer;
  background: var(--background-color);
  overflow: hidden;
  transition: 0.5s;
}
.notification ul li:hover {
  background: var(--show-color);
}
.notification ul li.active {
  height: 120px;
}
.notification ul li .all {
  border-top: 1px solid var(--border-color-deep);
  margin: 0 12px;
  height: 48px;
  transition: 0.5s;
}
.notification ul li.active .all {
  height: 120px;
}
.notification ul li:nth-child(1) .all {
  border-top: 0 solid #000;
}
.notification ul li .out {
  height: 48px;
  line-height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 0.5s;
}
.notification ul li:hover .out {
  font-size: 17px;
}
.notification ul li .out span {
  color: var(--deep-color-8);
  padding-right: 5px;
  transition: 0.5s;
}
.notification ul li.active .out span {
  transform: rotate(90deg);
}
.notification ul li .in {
  height: 0;
  opacity: 0;
  transition: 0.5s;
}
.notification ul li:hover .in {
  font-size: 17px;
}
.notification ul li.active .in {
  height: 72px;
  opacity: 1;
}
.title {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;
  margin-bottom: 20px;
}
.title span {
  font-size: 45px;
  font-weight: 1200;
  cursor: pointer;
  transition: 0.5s;
}
.title span:hover {
  font-size: 60px;
}
.title .router-link {
  width: 70px;
  height: 30px;
  margin-top: 10px;
  border-radius: 3px;
  border: 1px solid var(--border-color-deep);
  color: var(--deep-color-8);
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
}
.title .router-link:hover {
  border: 1px solid #468faf;
  background: #89c2d9;
  color: var(--background-color);
  width: 80px;
  height: 35px;
}
.footer {
  margin: 2vh 0;
  border-top: 1px solid var(--border-color-deep);
  min-height: 7vh;
  display: flex;
  align-items: center;
  padding: 0 2vw;
}
.footer .txt {
  padding: 0 10px;
  font-size: 15px;
  color: var(--deep-color-8);
  transition: 0.5s;
  cursor: default;
}
.footer .txt:hover {
  font-size: 18px;
}
</style>
