<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import labList from '@/components/labList.vue'

const msg = '历史记录'
const history = '/history'
const router = useRouter()
const userStore = useUserStore()
// 默认头像路径
const userAvatar = ref('/images/LOGO.png')

const avatar = ref<HTMLImageElement | null>(null)
const toggleLogin = () => {
  router.push('/login')
  userStore.logout()
}
onMounted(() => {
  const savedAvatar = localStorage.getItem('userAvatar')
  if (savedAvatar) userAvatar.value = savedAvatar
  if (avatar.value) {
    avatar.value.addEventListener('click', () => {
      router.push('/setting')
    })
  }
})
</script>

<template>
  <div class="profile-container">
    <!-- 个人信息区域 -->
    <div class="profile-header">
      <div class="avatar-container">
        <img :src="userAvatar" alt="头像" class="avatar" ref="avatar" />
      </div>
      <div class="user-info">
        <p class="username">
          <RouterLink :to="userStore.user ? '/setting' : '/login'" class="router-link">{{
            userStore.user ? userStore.user.name : '请先登录'
          }}</RouterLink>
        </p>
        <button class="switch-account" @click="toggleLogin">
          {{ userStore.user ? '切换账号' : '去登录/注册' }}
        </button>
      </div>
    </div>

    <!-- 历史记录 -->
    <labList :name="msg" :toWhere="history" />
  </div>
</template>

<style scoped>
.profile-container {
  width: 100%;
  height: 100%;
  background: #f8f9fa;
}

.profile-header {
  display: flex;
  align-items: center;
  margin: 0 40px;
  padding: 40px 0;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  display: flex;
}

.avatar-container {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: 0.5s ease-in-out;
}
.avatar-container img {
  width: 148px;
  transition: 0.5s ease-in-out;
}
.avatar-container img:hover {
  width: 180px;
}

.user-info {
  height: 100%;
}

.username {
  font-size: 44px;
  font-weight: bold;
  margin: 0 0 5px 0;
}
.username .router-link {
  color: #000;
  text-decoration: none;
  transition: 0.5s ease-in-out;
}
.username .router-link:hover {
  font-size: 55px;
}

.switch-account {
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  color: rgba(0, 0, 0, 0.8);
  background: #f8f9fa;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
  font-size: 18px;
  height: 40px;
  width: 130px;
  padding: 5px 10px;
  margin-top: 15px;
}

.switch-account:hover {
  border: 1px solid #468faf;
  background: #a9def9;
  color: #1d3557;
  width: 150px;
  height: 50px;
  font-size: 20px;
}

.history-container {
  margin-top: 20px;
}
.history-container header {
  position: relative;
}
</style>
