<script setup lang="ts">
import { RouterLink } from 'vue-router'
import VanillaTilt from 'vanilla-tilt'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
defineProps({
  name: String,
  toWhere: String,
  ifMore: {
    type: Boolean,
    default: true
  }
})
const bookList = [
  {
    id: 'SeniorPhysicsExperiment-0',
    tag: '高一',
    subject: '力学',
    title: '动量守恒',
    iconName: 'podium-outline',
    experimentID: 0
  },
  {
    id: 'SeniorPhysicsExperiment-1',
    tag: '高一',
    subject: '力学',
    title: '自由落体',
    iconName: 'bowling-ball-outline',
    experimentID: 1
  },
  {
    id: 'SeniorPhysicsExperiment-2',
    tag: '高一',
    subject: '力学',
    title: '斜面运动',
    iconName: 'trending-down-outline',
    experimentID: 2
  },
  {
    id: 'SeniorPhysicsExperiment-3',
    tag: '高一',
    subject: '力学',
    title: '弹簧振子',
    iconName: 'pulse-outline',
    experimentID: 3
  },
  {
    id: 'SeniorPhysicsExperiment-4',
    tag: '高一',
    subject: '力学',
    title: '杠杆原理',
    iconName: 'pin-outline',
    experimentID: 4
  },
  {
    id: 'SeniorPhysicsExperiment-5',
    tag: '高一',
    subject: '力学',
    title: '圆周运动',
    iconName: 'reload-circle-outline',
    experimentID: 5
  },
  {
    id: 'SeniorPhysicsExperiment-6',
    tag: '高一',
    subject: '力学',
    title: '摆锤实验',
    iconName: 'git-merge-outline',
    experimentID: 6
  }
]
// 添加倾斜效果处理函数
const initTilt = (element: HTMLElement) => {
  VanillaTilt.init(element, {
    max: 15,
    speed: 400,
    glare: false
  })
}

const removeTilt = (element: HTMLElement) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(element as any).vanillaTilt?.destroy()
}

// 删除原来的 onMounted 钩子
</script>

<template>
  <div class="labList">
    <div class="title">
      <span>{{ name }}</span>
      <RouterLink v-if="ifMore" :to="{ path: toWhere }" class="router-link">
        {{ t('More') }}
      </RouterLink>
    </div>
    <el-card :body-style="{ padding: '0' }">
      <ul>
        <li v-for="item in bookList" :key="item.id">
          <div
            class="tilt-wrapper"
            @mouseenter="
              ($event.currentTarget as HTMLElement) && initTilt($event.currentTarget as HTMLElement)
            "
            @mouseleave="
              ($event.currentTarget as HTMLElement) &&
              removeTilt($event.currentTarget as HTMLElement)
            "
          >
            <div class="card">
              <RouterLink
                :to="{ name: 'lab', params: { experimentID: item.experimentID } }"
                class="router-link"
              >
                <div class="first-content">
                  <ion-icon :name="item.iconName"></ion-icon>
                  <span>{{ item.title }}</span>
                </div>
                <div class="second-content">
                  <ion-icon name="cube-outline"></ion-icon></div
              ></RouterLink>
              <div class="blob"></div>
              <div class="blob"></div>
              <div class="blob"></div>
              <div class="blob"></div>
            </div>
          </div>
        </li>
      </ul>
    </el-card>
  </div>
</template>
<style scoped>
* {
  color: var(--text-color);
}
.labList {
  padding: 2vh 2vw;
  min-height: 60vh;
  background: var(--background-color);
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
  cursor: default;
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
  color: var(--border-color-deep);
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
.labList ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  list-style: none;
  transition: 0.5s;
  background: var(--background-color);
}
.tilt-wrapper {
  transition: none !important;
  transform-style: preserve-3d;
  padding: 30px 17px;
}

.card {
  position: relative;
  width: 190px;
  height: 254px;
  transition: all 0.4s;
  border-radius: 10px;
  font-size: 30px;
  text-decoration: none;
  overflow: hidden;
  z-index: 1;
  background: lightgrey;
  box-shadow: #cdb4db 0 15px 40px -5px;
}

.card:hover {
  border-radius: 15px;
  cursor: pointer;
  transform: scale(1.2);
  background: #8ecae6;
  transform: rotate(-5deg);
}

.card .router-link {
  text-decoration: none;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 1;
}

.first-content {
  height: 100%;
  width: 100%;
  transition: all 0.4s;
  display: flex;
  justify-content: center;
  font-weight: 700;
  align-items: center;
  flex-direction: column;
  opacity: 1;
  border-radius: 15px;
}
.first-content ion-icon {
  font-size: 70px;
  margin-bottom: 10px;
}

.card:hover .first-content {
  height: 0px;
  opacity: 0;
}

.second-content {
  height: 0%;
  width: 100%;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  transition: all 0.4s;
  color: white;
  font-size: 0px;
  transform: translateY(200px);
}

.second-content ion-icon {
  font-size: 70px;
  animation: rotate 5s linear infinite;
}
.card:hover .second-content {
  opacity: 1;
  height: 100%;
  font-size: 16px;
  transform: translateY(0px);
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.card .blob {
  position: absolute;
  z-index: -1;
  border-radius: 5em;
  width: 200px;
  height: 200px;
}

.card .blob:nth-child(2) {
  left: -50px;
  top: -90px;
  background: #fcf6bd;
}

.card .blob:nth-child(3) {
  left: 110px;
  top: -20px;
  z-index: -1;
  background: #e4c1f9;
}

.card .blob:nth-child(4) {
  left: -40px;
  top: 100px;
  background: #ff99c8;
}

.card .blob:nth-child(5) {
  left: 100px;
  top: 180px;
  background: #a9def9;
}
</style>
