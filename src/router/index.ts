import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'
// Fix the import path - adjust based on your actual file structure
import { useUserStore } from '../stores/userStore'
import { useGlobalStore } from '../stores/pageLoad'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: () => import('../views/FeedbackView.vue')
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('../views/HelpView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { requireNoLogin: true }
    },
    {
      path: '/me',
      name: 'me',
      component: () => import('../views/MeView.vue')
    },
    {
      path: '/notification',
      name: 'notification',
      component: () => import('../views/NotificationView.vue')
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('../views/SettingView.vue')
    },
    {
      path: '/lab/:experimentID',
      name: 'lab',
      component: () => import('../views/LabView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/labList',
      name: 'labList',
      component: () => import('../views/LabListView.vue')
    },
    {
      path: '/freeLab',
      name: 'freeLab',
      component: () => import('../views/FreeLabView.vue')
    }
  ]
})
// 路由钩子
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.user) {
    next('/login')
  }
  if (to.meta.requireNoLogin && userStore.user) {
    next('/me')
  }
  const globalStore = useGlobalStore()
  globalStore.setPageLoaded(false)
  globalStore.setIRenderName(String(to.name))
  setTimeout(() => {
    next()
  }, 600)
})
router.afterEach(() => {
  nextTick(() => {
    const globalStore = useGlobalStore()
    setTimeout(() => {
      globalStore.setPageLoaded(true)
    }, 500)
  })
})
export default router
