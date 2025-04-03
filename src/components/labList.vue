<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { onMounted } from 'vue'
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
    id: '18eg40',
    tag: '高一',
    subject: '力学',
    title: '牛顿第二定律'
  },
  {
    id: '18eg41',
    tag: '高一',
    subject: '力学',
    title: '牛顿第二定律'
  },
  {
    id: '18eg42',
    tag: '高一',
    subject: '力学',
    title: '牛顿第二定律'
  },
  {
    id: '18eg43',
    tag: '高一',
    subject: '力学',
    title: '牛顿第二定律'
  },
  {
    id: '18eg44',
    tag: '高一',
    subject: '力学',
    title: '牛顿第二定律'
  },
  {
    id: '18eg45',
    tag: '高一',
    subject: '力学',
    title: '牛顿第二定律'
  }
]
onMounted(() => {
  VanillaTilt.init(Array.from(document.querySelectorAll('.tilt-wrapper')), {
    max: 15,
    speed: 400,
    glare: true
  })
})
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
          <!-- 外层容器用于 VanillaTilt -->
          <div class="tilt-wrapper">
            <div class="card">
              <RouterLink to="./lab" class="router-link">
                <img src="/images/experiments/动量守恒定律.png" />
                <div class="content">
                  <p class="card-title">动量守恒定律</p>
                  <p class="description">
                    如果物体受到外力的合力为零，则系统内各物体动量的向量和保持不变，系统质心维持其原本的运动状态
                  </p>
                  <p class="description">
                    迄今物理学界公认，无论会有何种形式物质发现，动量守恒定律将仍然成立。
                  </p>
                </div>
              </RouterLink>
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
  justify-content: space-between;
  list-style: none;
  transition: 0.5s;
  background: var(--background-color);
}
.tilt-wrapper {
  transition: none !important;
  transform-style: preserve-3d;
}
.labList .card {
  position: relative;
  width: 300px;
  height: 200px;
  border-radius: 10px;
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: 0;
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}
.card:hover {
  transform: rotate(-5deg) scale(1.1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}
.card:hover .content {
  transform: translate(-50%, -50%) rotate(0deg);
  opacity: 1;
}
.card .card-title {
  margin: 0;
  font-size: 24px;
  color: #333;
  font-weight: 700;
}
.description {
  margin: 10px 0 0;
  font-size: 14px;
  color: #777;
  line-height: 1.4;
}
</style>
