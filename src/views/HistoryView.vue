<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Delete, Search } from '@element-plus/icons-vue'

interface HistoryItem {
  id: string
  date: string
  time: string
  name: string
  image: string
}

// 按日期分组的历史记录
const historyData = ref<{ [key: string]: HistoryItem[] }>({
  '2024-01-15': [
    {
      id: '1',
      date: '2024-01-15',
      time: '14:30',
      name: '光学实验：双缝干涉',
      image: '/images/experiments/double-slit.jpg'
    },
    {
      id: '2',
      date: '2024-01-15',
      time: '10:15',
      name: '电磁学实验：法拉第电磁感应',
      image: '/images/experiments/faraday.jpg'
    }
  ],
  '2024-01-14': [
    {
      id: '3',
      date: '2024-01-14',
      time: '16:45',
      name: '量子物理实验：光电效应',
      image: '/images/experiments/photoelectric.jpg'
    }
  ]
})

// 搜索关键词
const searchQuery = ref('')

// 过滤后的历史记录
const filteredHistory = computed(() => {
  if (!searchQuery.value) return historyData.value

  const filtered: { [key: string]: HistoryItem[] } = {}
  Object.entries(historyData.value).forEach(([date, items]) => {
    const matchedItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    if (matchedItems.length > 0) {
      filtered[date] = matchedItems
    }
  })
  return filtered
})

// 删除单个历史记录
const deleteHistoryItem = (date: string, id: string) => {
  const items = historyData.value[date]
  const index = items.findIndex((item) => item.id === id)
  if (index !== -1) {
    items.splice(index, 1)
    if (items.length === 0) {
      delete historyData.value[date]
    }
    ElMessage.success('删除成功')
  }
}

// 清除所有历史记录
const clearAllHistory = () => {
  historyData.value = {}
  ElMessage.success('已清除所有历史记录')
}
</script>

<template>
  <div class="history-page">
    <!-- 左侧内容区 -->
    <div class="history-content">
      <h1 class="history-title">历史记录</h1>

      <div v-if="Object.keys(filteredHistory).length === 0" class="empty-history">
        <el-empty description="暂无历史记录" />
      </div>

      <div v-else class="history-list">
        <div v-for="(items, date) in filteredHistory" :key="date" class="history-group">
          <div class="date-header">{{ date }}</div>

          <div class="history-items">
            <div v-for="item in items" :key="item.id" class="history-item">
              <div class="item-image">
                <img :src="item.image" :alt="item.name" />
              </div>

              <div class="item-content">
                <div class="item-name">{{ item.name }}</div>
                <div class="item-time">{{ item.time }}</div>
              </div>

              <div class="item-actions">
                <el-button
                  plain
                  :icon="Delete"
                  circle
                  class="delete-btn"
                  @click="deleteHistoryItem(String(date), String(item.id))"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧功能区 -->
    <div class="history-sidebar">
      <div class="search-box">
        <el-input
          v-model="searchQuery"
          placeholder="搜索历史记录"
          clearable
          :prefix-icon="Search"
        />
      </div>

      <div class="clear-all">
        <el-button plain :icon="Delete" class="clear-all-btn" @click="clearAllHistory">
          清除所有记录
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.history-page {
  display: flex;
  gap: 20px;
  background: var(--background-color);
  padding: 20px;
  height: 100%;
}

.history-content {
  flex: 1;
  min-width: 0;
}

.history-title {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
  cursor: default;
  color: var(--text-color);
  transition: 0.5s;
}
.history-title:hover {
  font-size: 60px;
}

.history-sidebar {
  width: 300px;
  padding: 20px;
  margin-top: 100px;
  background: var(--background-color);
  border-radius: 8px;
  box-shadow: 0 2px 12px var(--color-01);
  height: fit-content;
}

.search-box {
  margin-bottom: 20px;
}

.search-box .el-input {
  transition: 0.5s;
  background: var(--background-color);
}

.search-box .el-input:hover {
  transform: scale(1.2);
  background: var(--border-color);
  border-radius: 8px;
}

.search-box .el-input:hover .el-input__wrapper {
  background: var(--background-color);
}

.search-box .el-input .el-input__wrapper:focus-within {
  box-shadow: 0 0 0 1px var(--main-background);
}

.search-box .el-input .el-input__wrapper:hover {
  box-shadow: 0 0 0 1px var(--main-background);
}

.history-group {
  margin-bottom: 30px;
}

.date-header {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 15px;
  padding-bottom: 8px;
  cursor: default;
  border-bottom: 2px solid var(--more-color-2);
  transition: 0.5s;
}
.date-header:hover {
  font-size: 22px;
}

.history-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: var(--background-color);
  border-radius: 8px;
  box-shadow: 0 2px 12px var(--color-01);
  transition: transform 0.5s;
}

.history-item:hover {
  transform: translateY(-5px) scale(1.05);
}

.item-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-content {
  flex: 1;
  min-width: 0;
}

.item-name {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 8px;
  cursor: default;
  transition: 0.5s;
}
.item-name:hover {
  font-size: 20px;
}

.item-time {
  font-size: 14px;
  color: var(--text-color);
  cursor: default;
  transition: 0.5s;
}
.item-time:hover {
  font-size: 18px;
}

.empty-history {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
}

@media (max-width: 768px) {
  .history-page {
    flex-direction: column;
  }

  .history-sidebar {
    width: 100%;
    order: -1;
  }
}

.delete-btn {
  transition: 0.5s;
}

.delete-btn:hover {
  transform: scale(1.2);
  background: var(--border-color);
  --el-button-hover-text-color: inherit;
  --el-button-hover-border-color: inherit;
}

.clear-all-btn {
  transition: 0.5s;
  background: var(--background-color);
}

.clear-all-btn:hover {
  transform: scale(1.2);
  background: var(--border-color);
  --el-button-hover-text-color: var(--el-button-text-color);
  --el-button-hover-border-color: var(--el-button-border-color);
}
</style>
