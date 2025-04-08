import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false, // 使用 Vue 3 Composition API
  locale: localStorage.getItem('lang') || 
         (navigator.language.toLowerCase().includes('zh') ? 'zh' : 'en'),
  fallbackLocale: 'en',
  messages: {
    en: {
      // 英文语言包
      HomeViewNotification: 'Notification',
      More: 'More',
      msg: 'Experiment',
      version: 'Version Update',
      content1: `Plan the overall design style to ensure consistency in icons, text, element positions, etc.
      Configure the implementation of routing jumps and page switching functions;`,
      content2: `Design and implement the Banner, SideBar, Loading, etc. core components; Completed`,
      content3: `Design and implement the login and registration pages.`,
      content4: `Optimize the interaction effects of page elements, making operations more natural and fluid, and through a variety of page color schemes to improve visual experience.`
    },
    zh: {
      // 中文语言包
      HomeViewNotification: '通知',
      More: '更多',
      msg: '实验样例',
      version: '版本更新',
      content1: `进行整体设计风格的规划，确保图标、文字、元素位置等方面的一致性；
                  配置路由跳转及页面切换功能的实现；`,
      content2: `  设计并实现 Banner、SideBar、Loading 等核心组件；完成
                  Notification、labList、Content、Footer 等页面的设计与实现。 `,
      content3: `  完成登录与注册页面的设计，实现了邮箱注册与登录功能，以及邮箱找回密码机制 `,
      content4: `  优化页面元素的交互效果，使操作更加流畅自然，并通过多元化的页面配色方案提升视觉体验 `
    }
  }
})

export default i18n
