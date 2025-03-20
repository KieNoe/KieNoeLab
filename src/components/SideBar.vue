<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useGlobalStore } from '@/stores/pageLoad'
import { watch, ref } from 'vue'
import { useAboutStatus } from '@/stores/aboutStatus'
import { toRefs } from 'vue'
import { useLabStore } from '@/stores/labStore'

const route = useRoute()
const labStore = useLabStore()

const navigation = ref<HTMLElement | null>(null)
const square = ref<HTMLElement | null>(null)

const globalStore = useGlobalStore()
const aboutStore = useAboutStatus()
const { meStatus, copyrightStatus, privacyStatus, termsStatus, changelogStatus } =
  toRefs(aboutStore)

// 处理关于页面的链接点击
const handleAboutClick = (type: string) => {
  // 重置所有状态
  meStatus.value = false
  copyrightStatus.value = false
  privacyStatus.value = false
  termsStatus.value = false
  changelogStatus.value = false

  // 设置对应状态为true
  switch (type) {
    case 'me':
      meStatus.value = true
      break
    case 'copyright':
      copyrightStatus.value = true
      break
    case 'privacy':
      privacyStatus.value = true
      break
    case 'terms':
      termsStatus.value = true
      break
    case 'changelog':
      changelogStatus.value = true
      break
  }
}
const toggleSquare = () => {
  navigation.value?.classList.toggle('open')
}
onMounted(() => {
  const list = document.querySelectorAll('.list')
  const notLabList = document.querySelectorAll('.notOnLab .list')
  const routerLink = document.querySelectorAll('.router-link') as NodeListOf<HTMLElement>
  function iconRender() {
    list.forEach((item: Element) => {
      item.classList.remove('active')
    })
    document.querySelector(`.${globalStore.iRenderName.name}`)?.classList.add('active')
  }
  iconRender()
  watch(
    () => globalStore.iRenderName.name,
    () => iconRender()
  )
  square.value?.addEventListener('mousemove', () => {
    square.value?.classList.add('active')
  })
  square.value?.addEventListener('mouseleave', () => {
    square.value?.classList.remove('active')
  })
  const activeLink = (e: Event) => {
    list.forEach((item: Element) => item.classList.remove('active'))
    ;(e.currentTarget as HTMLElement).classList.add('active')
  }
  notLabList.forEach((item: Element) => item.addEventListener('click', activeLink))
  routerLink.forEach((item) =>
    item.addEventListener('click', () => {
      if (navigation.value?.classList.contains('open')) {
        navigation.value?.classList.toggle('open')
      }
    })
  )
  list.forEach((item: Element) =>
    item.addEventListener('mouseenter', () => {
      item.classList.add('selected')
    })
  )
  list.forEach((item: Element) =>
    item.addEventListener('mouseleave', () => {
      item.classList.remove('selected')
    })
  )
  document.querySelectorAll('.detail .router-link').forEach((item) =>
    item.addEventListener('mouseenter', () => {
      item.classList.add('active')
    })
  )
  document.querySelectorAll('.detail .router-link').forEach((item) =>
    item.addEventListener('mouseleave', () => {
      item.classList.remove('active')
    })
  )
})
</script>
<template>
  <div class="navigation" ref="navigation">
    <div class="menuToggle"></div>
    <div class="square" ref="square" @click="toggleSquare"></div>
    <ul v-show="route.name !== 'lab'" class="notOnLab">
      <li class="list home active" style="--clr: #f44336">
        <RouterLink ref="router-link" to="/" class="router-link">
          <span class="icon"><ion-icon name="home-outline"></ion-icon></span>
          <span class="text">首页</span>
        </RouterLink>
      </li>
      <li class="list me" style="--clr: #ffa117">
        <RouterLink ref="router-link" to="/me" class="router-link">
          <span class="icon"><ion-icon name="person-outline"></ion-icon></span>
          <span class="text">我</span>
        </RouterLink>
      </li>
      <li class="list more" style="--clr: #0fc70f">
        <RouterLink ref="router-link" to="/more" class="router-link">
          <span class="icon"><ion-icon name="pricetags-outline"></ion-icon></span>
          <span class="text">更多</span>
        </RouterLink>
      </li>
      <li class="list help" style="--clr: #2196f3">
        <RouterLink ref="router-link" to="/help" class="router-link">
          <span class="icon"><ion-icon name="help-circle-outline"></ion-icon></span>
          <span class="text">帮助</span>
        </RouterLink>
      </li>
      <li class="list setting" style="--clr: #b145e9">
        <RouterLink ref="router-link" to="/setting" class="router-link">
          <span class="icon"><ion-icon name="settings-outline"></ion-icon></span>
          <span class="text">设置</span>
        </RouterLink>
      </li>
      <li class="list feedback" style="--clr: #3c6e71">
        <RouterLink ref="router-link" to="/feedback" class="router-link">
          <span class="icon"><ion-icon name="alert-circle-outline"></ion-icon></span>
          <span class="text">反馈</span>
        </RouterLink>
      </li>
    </ul>

    <ul v-show="route.name === 'lab'" class="onLab">
      <li class="list start" style="--clr: #f44336" @click="labStore.toggleLab()">
        <RouterLink ref="router-link" to="/lab" class="router-link">
          <span class="icon"><ion-icon name="power-outline"></ion-icon></span>
          <span class="text">重置事件</span>
        </RouterLink>
      </li>
      <li class="list comment" style="--clr: #2196f3">
        <RouterLink ref="router-link" to="/lab" class="router-link">
          <span class="icon"><ion-icon name="chatbox-outline"></ion-icon></span>
          <span class="text">注释</span>
        </RouterLink>
      </li>
      <li class="list parameter" style="--clr: #b145e9" @click="labStore.toggleParameterModel()">
        <RouterLink ref="router-link" to="/lab" class="router-link">
          <span class="icon"><ion-icon name="cog-outline"></ion-icon></span>
          <span class="text">参数调整</span>
        </RouterLink>
      </li>
      <li class="list changeMod" style="--clr: #0fc70f">
        <RouterLink ref="router-link" to="/lab" class="router-link">
          <span class="icon"><ion-icon name="swap-horizontal-outline"></ion-icon></span>
          <span class="text">模式转换</span>
        </RouterLink>
      </li>
    </ul>
    <div class="detail" v-if="route.name !== 'lab'">
      <p>
        <RouterLink
          ref="router-link"
          to="/about"
          class="router-link"
          @click="handleAboutClick('me')"
          >关于我</RouterLink
        ><RouterLink
          ref="router-link"
          to="/about"
          class="router-link"
          @click="handleAboutClick('copyright')"
          >版权</RouterLink
        >
      </p>
      <p>
        <RouterLink
          ref="router-link"
          to="/about"
          class="router-link"
          @click="handleAboutClick('terms')"
          >条款</RouterLink
        ><RouterLink
          ref="router-link"
          to="/about"
          class="router-link"
          @click="handleAboutClick('privacy')"
          >隐私权</RouterLink
        >
      </p>
      <p>
        <RouterLink
          ref="router-link"
          to="/about"
          class="router-link"
          @click="handleAboutClick('changelog')"
          >更新日志</RouterLink
        >
      </p>
    </div>
  </div>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
.navigation {
  position: fixed;
  height: 100vh;
  width: 75px;
  top: 0;
  left: 0;
  background: #fff;
  border-right: 1px solid rgba(0, 0, 0, 0.25);
  transition: 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
}
.navigation.open {
  width: 250px;
}
.navigation .square {
  position: absolute;
  top: 0;
  left: 5.3px;
  width: 60px;
  height: 60px;
  background: rgba(0, 0, 0, 0.25);
  cursor: pointer;
  border-radius: 50%;
  transition: 0.5s;
  opacity: 0;
}
.navigation .square.active {
  opacity: 1;
}
.navigation .menuToggle {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  border-bottom: 0px solid rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 20px;
}
.navigation.open .menuToggle {
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
}

.navigation .menuToggle::before {
  content: '';
  position: absolute;
  width: 30px;
  height: 2px;
  background: #333;
  transform: translateY(-8px);
  transition: 0.5s;
}
.navigation.open .menuToggle::before {
  transform: translateY(0px) rotate(45deg);
}
.navigation .menuToggle::after {
  content: '';
  position: absolute;
  width: 30px;
  height: 2px;
  background: #333;
  transform: translateY(8px);
  transition: 0.5s;
  box-shadow: 0 -8px 0 #333;
}
.navigation.open .menuToggle::after {
  transform: translateY(0px) rotate(-45deg);
  box-shadow: 0 0 0 #333;
}
.navigation ul {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}
.navigation ul li {
  list-style: none;
  position: relative;
  width: 100%;
  height: 60px;
  padding: 0 10px;
  transition: 0.5s;
}
.navigation ul li .router-link {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  text-decoration: none;
}
.navigation ul li .router-link .icon {
  position: relative;
  display: block;
  min-width: 55px;
  height: 55px;
  line-height: 60px;
  transition: 0.5s;
  color: #222;
  font-size: 1.75em;
  border-radius: 10px;
}
.navigation ul li.active .router-link .icon {
  background: var(--clr);
  color: #fff;
}
.navigation ul li.selected .router-link .icon {
  background: var(--clr);
  color: #fff;
}
.navigation ul li .router-link .icon::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--clr);
  filter: blur(8px);
  opacity: 0;
  transition: 0.5s;
}
.navigation ul li.active .router-link .icon::before {
  opacity: 0.5;
}
.navigation ul li.selected .router-link .icon::before {
  opacity: 0.5;
}
.navigation ul li .router-link .text {
  position: relative;
  padding: 0 15px;
  height: 60px;
  font-size: 20px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  color: #333;
  opacity: 0;
  visibility: hidden;
  transition: 0.5s;
}
.navigation.open ul li .router-link .text {
  opacity: 1;
  visibility: visible;
}
.navigation ul li.active .router-link .text {
  color: var(--clr);
}
.navigation ul li.selected .router-link .text {
  color: var(--clr);
}
.navigation .detail {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, 0.25);
  white-space: nowrap;
  opacity: 0;
  transition: 0.5s;
}
.navigation.open .detail {
  opacity: 1;
}
.navigation .detail p {
  height: 33px;
  line-height: 33px;
  text-align: center;
}
.navigation .detail p:nth-child(1) {
  margin: 10px 0 0 0;
}
.navigation .detail p .router-link {
  padding: 0 20px 0 0;
  text-decoration: none;
  color: #222;
  transition: 0.5s;
}
.navigation .detail p .active {
  font-size: large;
}
</style>
