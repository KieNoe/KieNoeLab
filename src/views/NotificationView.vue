<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { ElPagination } from 'element-plus'
import { computed } from 'vue'

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
  { id: '18eg45', version: '版本更新 1.0.4', contents: [content1, content2] },
  { id: '18eg46', version: '版本更新 1.0.4', contents: [content1, content2] },
  { id: '18eg47', version: '版本更新 1.0.4', contents: [content1, content2] },
  { id: '18eg48', version: '版本更新 1.0.4', contents: [content1, content2] }
]

const currentPage = ref(1)
const pageSize = ref(5)
const content = ref<HTMLElement | null>(null)

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  nextTick(() => {
    if (content.value) {
      window.scrollTo({
        behavior: 'smooth',
        top: 0
      })
    }
  })
}

const paginatedNotifications = ref(
  computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return notificationList.slice(start, end)
  })
)
</script>

<template>
  <div class="notification-page">
    <div class="title">
      <span>通知</span>
    </div>
    <div ref="content" class="notification-list">
      <el-card v-for="item in paginatedNotifications" :key="item.id" class="notification-card">
        <div class="card-header">
          <h2>{{ item.version }}</h2>
        </div>
        <div class="card-content">
          <p v-for="(content, index) in item.contents" :key="index">{{ content }}</p>
        </div>
      </el-card>
    </div>
    <div class="pagination-container">
      <el-pagination
        size="large"
        v-model:current-page="currentPage"
        :page-size="pageSize"
        :total="notificationList.length"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        background
      />
    </div>
  </div>
</template>

<style scoped>
* {
  color: var(--text-color);
  background: var(--background-color);
}
.notification-page {
  padding: 30px;
  min-height: 100vh;
  background: var(--background-color);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.title {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.title span {
  font-size: 45px;
  font-weight: 1200;
  color: var(--text-color);
  transition: 0.5s;
}

.title span:hover {
  font-size: 60px;
}

.notification-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.notification-card {
  transition: all 0.5s ease;
  border-radius: 8px;
}

.notification-card:hover {
  transform: translateY(-10px) scale(1.05);
  box-shadow: 0 8px 16px var(--color-01);
}

.card-header {
  margin-bottom: 15px;
}

.card-header h2 {
  font-size: 24px;
  color: var(--text-color);
  margin: 0;
}

.card-content {
  color: var(--text-color);
  line-height: 1.6;
}

.card-content p {
  margin: 10px 0;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  padding: 20px 0;
}

:deep(.el-pager li) {
  transition: 0.5s;
}

:deep(.el-pager li:hover) {
  transform: scale(1.3);
  background: var(--background-color);
}

:deep(.btn-prev),
:deep(.btn-next) {
  transition: 0.5s;
}

:deep(.btn-prev:hover),
:deep(.btn-next:hover) {
  transform: scale(1.3);
  background: var(--background-color);
}
</style>
