import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAboutStatus = defineStore('aboutStatus', () => {
  const meStatus = ref(false)
  const privacyStatus = ref(false)
  const termsStatus = ref(false)
  const changelogStatus = ref(false)
  const copyrightStatus = ref(false)
  return { meStatus, privacyStatus, termsStatus, changelogStatus, copyrightStatus }
})
