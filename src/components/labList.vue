<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { onMounted } from 'vue'
import VanillaTilt from 'vanilla-tilt'

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
    title: '牛顿第二定律',
    imgName: 'swap-horizontal-outline'
  },
  {
    id: '18eg41',
    tag: '高一',
    subject: '力学',
    title: '牛顿第二定律',
    imgName: 'swap-horizontal-outline'
  },
  {
    id: '18eg42',
    tag: '高一',
    subject: '力学',
    title: '牛顿第二定律',
    imgName: 'swap-horizontal-outline'
  },
  {
    id: '18eg43',
    tag: '高一',
    subject: '力学',
    title: '牛顿第二定律',
    imgName: 'swap-horizontal-outline'
  },
  {
    id: '18eg44',
    tag: '高一',
    subject: '力学',
    title: '牛顿第二定律',
    imgName: 'swap-horizontal-outline'
  },
  {
    id: '18eg45',
    tag: '高一',
    subject: '力学',
    title: '牛顿第二定律',
    imgName: 'swap-horizontal-outline'
  }
]
onMounted(() => {
  VanillaTilt.init(Array.from(document.querySelectorAll('.card')), {
    max: 15,
    speed: 400,
    glare: false
  })
})
</script>
<template>
  <div class="labList">
    <div class="title">
      <span>{{ name }}</span>
      <RouterLink v-if="ifMore" :to="{ path: toWhere }" class="router-link"> 更多 </RouterLink>
    </div>
    <el-card :body-style="{ padding: '0' }">
      <ul>
        <li v-for="item in bookList" :key="item.id">
          <div class="card">
            <RouterLink to="./lab" class="router-link">
              <div class="imgBx">
                <ion-icon :name="item.imgName"></ion-icon></div
            ></RouterLink>
            <div class="detail">
              <RouterLink to="./lab" class="router-link">
                <div class="txt">{{ item.title }}</div></RouterLink
              >
              <div class="tags">
                <RouterLink to="./lab" class="router-link">
                  <div class="tag">{{ item.tag }}</div></RouterLink
                >
                <RouterLink to="./lab" class="router-link">
                  <div class="tag subject">{{ item.subject }}</div></RouterLink
                >
              </div>
            </div>
          </div>
        </li>
      </ul>
    </el-card>
  </div>
</template>
<style scoped>
.labList {
  margin: 2vh 2vw;
  /* background: #e4c1f9; */
  min-height: 60vh;
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
  border: 1px solid rgba(0, 0, 0, 0.25);
  color: rgba(0, 0, 0, 0.8);
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
}
.title .router-link:hover {
  border: 1px solid #468faf;
  background: #89c2d9;
  color: #fff;
  width: 80px;
  height: 35px;
}
.labList ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  transition: 0.5s ease-in-out;
}
.labList .card {
  width: 300px;
  height: 250px;
  margin: 10px 25px;
  overflow: hidden;
  display: flex;
  border-radius: 5px;
  flex-direction: column;
  transform-style: preserve-3d;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  transition:
    width 0.5s ease-in-out,
    height 0.5s ease-in-out;
}
.labList .card:hover {
  width: 330px;
  height: 280px;
}
.labList .card .imgBx {
  width: 300px;
  height: 200px;
  background: #bde0fe;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
  transition: 0.5s;
}
.labList .card:hover .imgBx {
  width: 330px;
  height: 230px;
}
.labList .card .imgBx ion-icon {
  font-size: 100px;
  color: #fff;
  transition: 0.5s ease-in-out;
}
.labList .card:hover .imgBx ion-icon {
  transform: rotate(-45deg) scale(1.2);
}
.labList .card .detail {
  width: 100%;
  height: 50px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  transition: 0.5s ease-in-out;
}
.labList .card .detail .router-link {
  text-decoration: none;
  transition: 0.5s ease-in-out;
}
.labList .card .detail .txt {
  font-size: 20px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
  text-decoration: none;
  transition: 0.5s ease-in-out;
}
.labList .card .detail .tags {
  display: flex;
  gap: 10px;
}
.labList .card .detail .tag.subject {
  background: #ff9f1c;
  border: none;
}
.labList .card .detail .tag {
  width: 70px;
  height: 30px;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  font-size: 15px;
  font-weight: 400;
  border: none;
  color: #fff;
  background: #00b4d8;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  transition: 0.5s ease-in-out;
}
</style>
