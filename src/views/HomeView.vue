<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref, computed } from 'vue'
import labList from '@/components/labList.vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const router = useRouter()
const toLabList = '/labList'

// 将 notificationList 改为计算属性，这样当 t 函数的结果变化时会自动更新
const notificationList = computed(() => [
  { id: '18eg40', version: t('version') + ' 1.0.0', contents: [t('content12'), t('content11')] },
  { id: '18eg41', version: t('version') + ' 1.0.1', contents: [t('content10'), t('content9')] },
  { id: '18eg42', version: t('version') + ' 1.0.2', contents: [t('content8'), t('content7')] },
  { id: '18eg43', version: t('version') + ' 1.0.3', contents: [t('content6'), t('content5')] },
  { id: '18eg44', version: t('version') + ' 1.0.4', contents: [t('content4'), t('content3')] },
  { id: '18eg45', version: t('version') + ' 1.0.4', contents: [t('content2'), t('content1')] }
])

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
        <span @click="toNotification">{{ t('HomeViewNotification') }}</span>
        <RouterLink to="/notification" class="router-link"> {{ t('More') }} </RouterLink>
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
    <labList :name="t('msg')" :toWhere="toLabList" />
    <div class="footer">
      <div class="txt">© 2025 KieNoeLab 保留所有权利</div>
      <div class="txt">苏ICP备2025171457号</div>
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
