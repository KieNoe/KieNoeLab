import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLabStore = defineStore('lab', () => {
  const startLab = ref(false)
  const isParameterOpen = ref(false)

  function toggleLab() {
    startLab.value = !startLab.value
  }
  function toggleParameterModel() {
    isParameterOpen.value = !isParameterOpen.value
  }

  return { startLab, toggleLab, isParameterOpen, toggleParameterModel }
})
