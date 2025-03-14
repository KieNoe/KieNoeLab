<script setup lang="ts">
import { ref } from 'vue'

const helpList = [
  {
    id: 'help1',
    title: '这是什么网站？',
    contents: ['这是一个在线物理实验模拟平台', '提供多种物理实验的虚拟仿真环境']
  },
  {
    id: 'help2',
    title: '网站是开源免费的吗？',
    contents: ['是，本网站完全开源免费', '您可以自由下载、修改和使用代码']
  },
  {
    id: 'help3',
    title: '如何进行模拟实验？',
    contents: ['选择需要进行的实验项目', '按照实验指导书的步骤操作即可完成实验']
  },
  {
    id: 'help4',
    title: '为什么某些实验数值与理论值不同？',
    contents: ['模拟实验会考虑现实中的误差因素', '数值偏差在合理范围内属于正常现象']
  },
  {
    id: 'help5',
    title: '是否可以在手机上使用？',
    contents: ['支持手机等移动设备访问', '建议使用横屏模式以获得更好的操作体验']
  },
  {
    id: 'help6',
    title: '浏览器 & 设备要求？',
    contents: ['推荐使用Chrome、Firefox等现代浏览器', '建议设备内存4GB以上以保证流畅运行']
  },
  {
    id: 'help7',
    title: '联系我们？',
    contents: ['技术支持邮箱：support@kienoelab.com', '服务时间：周一至周五 9:00-18:00']
  }
]

const activeIndex = ref<number | null>(null)

const toggleActive = (index: number) => {
  if (activeIndex.value === index) {
    activeIndex.value = null
  } else {
    activeIndex.value = index
  }
}
</script>

<template>
  <div class="page">
    <div class="help-section">
      <div class="title">
        <span>帮助中心</span>
      </div>
      <el-card :body-style="{ padding: '0' }">
        <ul class="demo-collapse">
          <li
            v-for="(item, index) in helpList"
            :key="item.id"
            :class="{ active: activeIndex === index }"
            @click="toggleActive(index)"
          >
            <div class="all">
              <div class="out">
                {{ item.title }}
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
  </div>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

.page {
  width: 100%;
  min-height: 100vh;
  background: #fff;
  padding-top: 2vh;
}

.help-section {
  margin: 0 2vw;
  min-height: 60vh;
}

.help-section ul li {
  height: 48px;
  list-style: none;
  cursor: pointer;
  overflow: hidden;
  transition: 0.5s;
}

.help-section ul li:hover {
  background: rgba(0, 0, 0, 0.2);
}

.help-section ul li.active {
  height: 120px;
}

.help-section ul li .all {
  border-top: 1px solid rgba(0, 0, 0, 0.25);
  margin: 0 12px;
  height: 48px;
  transition: 0.5s;
}

.help-section ul li.active .all {
  height: 120px;
}

.help-section ul li:nth-child(1) .all {
  border-top: 0 solid #000;
}

.help-section ul li .out {
  height: 48px;
  line-height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 0.5s;
}

.help-section ul li:hover .out {
  font-size: 17px;
}

.help-section ul li .out span {
  color: rgba(0, 0, 0, 0.8);
  padding-right: 5px;
  transition: 0.5s;
}

.help-section ul li.active .out span {
  transform: rotate(90deg);
}

.help-section ul li .in {
  height: 0;
  opacity: 0;
  transition: 0.5s;
}

.help-section ul li:hover .in {
  font-size: 17px;
}

.help-section ul li.active .in {
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
</style>
