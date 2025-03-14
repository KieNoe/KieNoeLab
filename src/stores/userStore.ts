// 地址 '@/stores/userStore'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

interface User {
  name: string
  email: string
  id: string
  password: string
}

// 安全解析 localStorage 数据
const loadUserFromStorage = (): User | null => {
  try {
    const savedUser = localStorage.getItem('user')
    return savedUser ? (JSON.parse(savedUser) as User) : null
  } catch (error) {
    console.error('Failed to parse user data from localStorage:', error)
    return null
  }
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(loadUserFromStorage())

  const login = (userInfo: User) => {
    user.value = userInfo
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('userAvatar')
  }
  const updateEmail = (newEmail: string) => {
    if (user.value) {
      user.value.email = newEmail
    }
  }

  // 监听 user 变化，存储到 localStorage
  watch(
    user,
    (newUser) => {
      if (newUser) {
        localStorage.setItem('user', JSON.stringify(newUser))
      } else {
        localStorage.removeItem('user')
      }
    },
    { deep: true }
  )

  return { user, login, logout, updateEmail }
})
