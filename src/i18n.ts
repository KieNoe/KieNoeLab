import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false, // 使用 Vue 3 Composition API
  locale: localStorage.getItem('lang') || 'zh',
  fallbackLocale: 'en',
  messages: {
    en: {
      // 英文语言包
      HomeViewNotification: 'Notification',
      More: 'More'
    },
    zh: {
      // 中文语言包
      HomeViewNotification: '通知',
      More: '更多'
    }
  }
})

export default i18n
