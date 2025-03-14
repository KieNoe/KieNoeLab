<script setup lang="ts">
import { ref } from 'vue'
import labList from '@/components/labList.vue'

const showMore = false
const selectedGrade = ref('')
const selectedSubject = ref('')

const grades = [
  { label: '高一', value: '高一' },
  { label: '高二', value: '高二' },
  { label: '高三', value: '高三' }
]

const subjects = [
  { label: '力学', value: '力学' },
  { label: '热学', value: '热学' },
  { label: '电磁学', value: '电磁学' },
  { label: '光学', value: '光学' },
  { label: '近代物理', value: '近代物理' }
]
</script>

<template>
  <div class="lab-list-container">
    <div class="header">
      <div class="filters">
        <el-select v-model="selectedGrade" placeholder="选择年级" class="filter-select">
          <el-option
            v-for="grade in grades"
            :key="grade.value"
            :label="grade.label"
            :value="grade.value"
            class="filter-option"
          />
        </el-select>
        <el-select v-model="selectedSubject" placeholder="选择知识点" class="filter-select">
          <el-option
            v-for="subject in subjects"
            :key="subject.value"
            :label="subject.label"
            :value="subject.value"
            class="filter-option"
          />
        </el-select>
      </div>
    </div>
    <div class="lab-content">
      <labList name="实验列表" toWhere="/lab" :ifMore="showMore" />
    </div>
  </div>
</template>

<style scoped>
.lab-list-container {
  padding: 20px;
  min-height: 100vh;
  background: #fff;
}

.header {
  display: flex;
  align-items: center;
  position: absolute;
  top: 90px;
  right: 70px;
  width: 300px;
  height: 40px;
  margin-bottom: 20px;
  gap: 30px;
}

.filters {
  display: flex;
  gap: 15px;
}

.filter-select {
  width: 150px;
  transition: transform 0.5s;
}

.filter-select:hover {
  transform: scale(1.2);
}
.filter-option {
  width: 150px;
  transition: 0.5s;
}
.filter-option:hover {
  transform: scale(1.2) translateX(10px);
  background: rgba(0, 0, 0, 0.15);
}

.lab-content {
  width: 100%;
}
</style>
