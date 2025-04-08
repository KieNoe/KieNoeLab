import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false, // 使用 Vue 3 Composition API
  locale:
    localStorage.getItem('lang') || (navigator.language.toLowerCase().includes('zh') ? 'zh' : 'en'),
  fallbackLocale: 'en',
  messages: {
    en: {
      // 英文语言包
      HomeViewNotification: 'Notification',
      More: 'More',
      msg: 'Experiment',
      version: 'Version Update',
      content1: `Deploy Docker container for better deployment and management`,
      content2: `Optimize login and registration code logic, fix various bugs`,
      content3: `Optimize VanillaTilt performance usage and add free experiment mode`,
      content4: `Fix front-end and back-end interaction bugs, optimize experiment card visual effects`,
      content5: `Configure meta to prevent XSS and click hijacking, add timestamp after request reference`,
      content6: `Add multi-language support and i18n translation component`,
      content7: `Add dark theme and ripple effect on click`,
      content8: `Complete email modification function in settings page`,
      content9: `Improve API interface interaction functionality`,
      content10: `Configure environment variables and request methods`,
      content11: `Set up CI/CD workflow and SSH key authentication`,
      content12: `Initialize experiment page with parameter panel and mouse drag functionality`
    },
    zh: {
      // 中文语言包
      HomeViewNotification: '通知',
      More: '更多',
      msg: '实验样例',
      version: '版本更新',
      content1: `部署 Docker 容器，优化部署管理`,
      content2: `优化登录注册代码逻辑，修复多个BUG`,
      content3: `优化 VanillaTilt 性能占用，添加自由实验模式`,
      content4: `修复前后端交互BUG，优化实验卡片视觉效果`,
      content5: `在引用请求后加入时间戳，优化缓存机制`,
      content6: `增加主页多语言功能，加入翻译组件i18n`,
      content7: `增加黑色主题和点击涟漪效果`,
      content8: `完成设置页面修改邮箱业务`,
      content9: `完善API接口交互功能`,
      content10: `配置环境变量和请求方法`,
      content11: `设置CI/CD工作流和SSH密钥认证`,
      content12: `初始化实验页面，加入参数面板和鼠标拖拽功能`
    }
  }
})

export default i18n
