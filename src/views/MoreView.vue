<script setup lang="ts">
import { ref, computed } from 'vue'

interface AnimationOption {
  value: string
  label: string
  selected: boolean
}

const switch1 = ref(false)
const themeColor = ref('#409EFF')
const isDropdownOpen = ref(false)
const animationOptions = ref<AnimationOption[]>([
  { value: 'fade', label: '淡入淡出', selected: false },
  { value: 'slide', label: '滑动', selected: false },
  { value: 'zoom', label: '缩放', selected: false }
])

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const toggleOption = (option: AnimationOption) => {
  option.selected = !option.selected
}

const selectedCount = computed(() => {
  return animationOptions.value.filter((opt) => opt.selected).length
})

const selectedLabels = computed(() => {
  return animationOptions.value
    .filter((opt) => opt.selected)
    .map((opt) => opt.label)
    .join('、')
})
</script>

<template>
  <div class="page">
    <div class="more-content">
      <div class="title">
        <span>更多功能</span>
      </div>
      <el-card :body-style="{ padding: '0', width: '800px', height: '400px' }">
        <div class="card-content">
          <div class="tab-group">
            <div class="switch-item">
              <span class="switch-label">深色模式</span>
              <el-switch v-model="switch1" />
            </div>
            <div class="switch-item">
              <span class="switch-label">自定义主题</span>
              <el-color-picker v-model="themeColor" show-alpha />
            </div>
            <div class="custom-select">
              <div class="select-header" @click="toggleDropdown">
                <span class="switch-label">页面切换动画选择</span>
                <div class="select-content">
                  {{ selectedCount > 0 ? selectedLabels : '请选择动画效果' }}
                </div>
                <div class="arrow" :class="{ 'arrow-up': isDropdownOpen }">▼</div>
              </div>
              <div class="select-dropdown" :class="{ show: isDropdownOpen }">
                <div
                  v-for="option in animationOptions"
                  :key="option.value"
                  class="select-option"
                  :class="{ selected: option.selected }"
                  @click="toggleOption(option)"
                >
                  <span class="checkbox" :class="{ checked: option.selected }">✓</span>
                  {{ option.label }}
                </div>
              </div>
            </div>
          </div>
          <div class="construction-area">
            <ion-icon name="construct-outline"></ion-icon>
            <span>施工中...</span>
          </div>
        </div>
      </el-card>
    </div>
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
  height: 100%;
  background: var(--background-color);
  padding-top: 2vh;
  display: flex;
  flex-direction: column;
}

.more-content {
  margin: 0 2vw;
  min-height: 60vh;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  max-width: 800px;
}

.title span {
  font-size: 45px;
  font-weight: 1200;
  cursor: pointer;
  transition: 0.5s ease-in-out;
}

.title span:hover {
  font-size: 60px;
}

.card-content {
  display: flex;
  height: 100%;
  position: relative;
}

.tab-group {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 600px;
}

.switch-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
  background-color: var(--more-color-1);
  border-radius: 8px;
  transition: all 0.5s ease-in-out;
  width: 100%;
  transform: scale(1);
}

.switch-item:hover {
  background-color: var(--more-color-2);
  transform: translateX(5px) scale(1.07);
  box-shadow: 0 2px 12px 0 var(--color-01);
}

.switch-item :deep(.el-color-picker) {
  transition: all 0.5s ease-in-out;
  transform: scale(1);
}

.switch-item:hover :deep(.el-color-picker) {
  transform: scale(1.2);
}

.switch-label {
  font-size: 20px;
  color: var(--main-background);
  font-weight: 500;
  transition: all 0.5s ease-in-out;
}

.switch-item:hover .switch-label {
  font-size: 22px;
  transform: translateX(5px) scale(1.1);
  color: #409eff;
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
  transition: 0.5s ease-in-out;
  cursor: default;
}

.footer .txt:hover {
  font-size: 18px;
}

.custom-select {
  position: relative;
  width: 100%;
}

.select-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
  background-color: var(--more-color-1);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  position: relative;
  z-index: 1001;
  transform: scale(1);
}

.select-header:hover {
  background-color: var(--more-color-2);
  transform: translateX(5px) scale(1.07);
  box-shadow: 0 2px 12px 0 var(--color-01);
}

.select-header:hover .switch-label {
  font-size: 22px;
  color: #409eff;
}

.select-content {
  flex: 1;
  margin: 0 15px;
  color: var(--main-background);
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.arrow {
  font-size: 12px;
  color: var(--main-background);
  transition: transform 0.5s ease-in-out;
}

.arrow-up {
  transform: rotate(180deg);
}

.select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 5px;
  background-color: var(--background-color);
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 var(--color-01);
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
  opacity: 0;
  transform: translateY(-100px);
  transition: all 0.5s ease-in-out;
  pointer-events: none;
}

.select-dropdown::-webkit-scrollbar {
  display: none;
}

.select-dropdown {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.select-dropdown.show {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.select-option {
  padding: 12px 25px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  transform: scale(1);
}

.select-option:hover {
  background-color: var(--more-color-1);
  transform: scale(1.02);
  box-shadow: 0 2px 12px 0 var(--color-01);
}

.select-option.selected {
  background-color: var(--more-color-1);
  color: #409eff;
  transform: scale(1.02);
  box-shadow: 0 2px 12px 0 var(--color-01);
}

.checkbox {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 1px solid var(--more-color-2);
  border-radius: 2px;
  margin-right: 8px;
  text-align: center;
  line-height: 16px;
  font-size: 12px;
  color: transparent;
  transition: all 0.5s ease-in-out;
}

.checkbox.checked {
  background-color: #409eff;
  border-color: #409eff;
  color: var(--background-color);
}

.construction-area {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-right: 20px;
  color: var(--main-background);
  font-size: 16px;
}
.construction-area span {
  color: var(--deep-color-8);
  font-size: 30px;
  cursor: default;
  transition: 0.5s ease-in-out;
}
.construction-area span:hover {
  font-size: 40px;
}
.construction-area ion-icon {
  color: var(--deep-color-8);
  font-size: 60px;
  transition: 0.5s ease-in-out;
}
.construction-area ion-icon:hover {
  font-size: 80px;
}
</style>
