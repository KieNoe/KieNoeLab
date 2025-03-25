import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLabStore = defineStore('lab', () => {
  const startLab = ref(false)
  const isTextOpen = ref(true)
  const isParameterOpen = ref(false)

  function toggleLab() {
    startLab.value = !startLab.value
  }
  function toggleParameterModel() {
    isParameterOpen.value = !isParameterOpen.value
  }
  function toggleTextModel() {
    isTextOpen.value = !isTextOpen.value
  }

  return { startLab, toggleLab, isParameterOpen, toggleParameterModel, isTextOpen, toggleTextModel }
})
