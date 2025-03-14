import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

// 在 Pinia Store 中管理 pageLoaded 和 iRender
export const useGlobalStore = defineStore('global', () => {
  const pageLoaded = ref(false)
  const iRenderName = reactive({ name: 'home' })
  const setPageLoaded = (status: boolean) => {
    pageLoaded.value = status
  }

  const setIRenderName = (name: string) => {
    iRenderName.name = name
  }
  return { pageLoaded, iRenderName, setPageLoaded, setIRenderName }
})
