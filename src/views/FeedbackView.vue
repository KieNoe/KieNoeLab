<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 系统信息接口
interface SystemInfo {
  browser: string
  os: string
  userAgent: string
}

const feedbackContent = ref('')
const systemInfo = ref<SystemInfo>({
  browser: '',
  os: '',
  userAgent: ''
})

// 获取系统信息
const getSystemInfo = () => {
  const ua = navigator.userAgent
  systemInfo.value = {
    browser: detectBrowser(ua),
    os: detectOS(ua),
    userAgent: ua
  }
}

// 检测浏览器
const detectBrowser = (ua: string): string => {
  if (ua.includes('Chrome')) return 'Chrome'
  if (ua.includes('Firefox')) return 'Firefox'
  if (ua.includes('Safari')) return 'Safari'
  return '未知浏览器'
}

// 检测操作系统
const detectOS = (ua: string): string => {
  if (ua.includes('Windows')) return 'Windows'
  if (ua.includes('Mac')) return 'MacOS'
  if (ua.includes('Linux')) return 'Linux'
  if (ua.includes('Android')) return 'Android'
  if (ua.includes('iOS')) return 'iOS'
  return '未知系统'
}

// 提交反馈
const submitFeedback = () => {
  // TODO: 实现提交逻辑
  console.log('提交反馈:', {
    content: feedbackContent.value,
    systemInfo: systemInfo.value
  })
}

onMounted(() => {
  getSystemInfo()
})
</script>

<template>
  <div class="feedback-container">
    <div class="feedback-main">
      <div class="feedback-form">
        <h1>反馈</h1>
        <textarea
          v-model="feedbackContent"
          placeholder="请详细描述您遇到的问题或建议..."
          rows="6"
        ></textarea>
        <div class="system-info">
          <p>系统信息：</p>
          <p>浏览器：{{ systemInfo.browser }}</p>
          <p>操作系统：{{ systemInfo.os }}</p>
        </div>
        <button @click="submitFeedback">提交反馈</button>
        <p class="privacy-notice">您的信息仅用于改进网站</p>
      </div>

      <div class="faq-section">
        <h2>常见问题</h2>
        <div class="faq-card">
          <h3>我什么时候会收到回复？</h3>
          <p>受限于精力，我们会不定期查看反馈，并在第一时间进行回复，感谢您的耐心等待。</p>
        </div>
        <div class="faq-card">
          <h3>反馈后是否有后续沟通？</h3>
          <p>
            一旦您的反馈得到处理，我们会通过邮件或平台消息通知您结果。如果有进一步问题或改进意见，我们会继续保持沟通。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feedback-container {
  background: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.feedback-main {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 2rem;
}

.feedback-form {
  padding: 2rem;
  margin-left: 30px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
  transition: 0.5s;
  cursor: default;
}
h1:hover {
  font-size: 3rem;
}

textarea {
  width: 100%;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  margin-bottom: 1rem;
  transition: 0.5s;
}
textarea:hover {
  font-size: 1.1rem;
  border: 1px solid #3498db;
  box-shadow: 0 0 10px 0 rgba(52, 152, 219, 0.5);
}

.system-info {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  cursor: default;
  transition: 0.5s;
}
.system-info:hover {
  background: #3498db;
  color: white;
  font-size: 1.1rem;
  transform: scale(1.03);
}

button {
  background: #3498db;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.5s;
}

button:hover {
  background: #2980b9;
  transform: scale(1.2);
}

.privacy-notice {
  margin-top: 1rem;
  color: #666;
  font-size: 0.9rem;
  transition: 0.5s;
  cursor: default;
}
.privacy-notice:hover {
  font-size: 1.1rem;
  transform: scale(1.06);
}

.faq-section {
  padding: 2rem;
}

.faq-card {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  transition: 0.5s;
}
.faq-card:hover {
  transform: scale(1.1);
}

h2 {
  margin-bottom: 1.5rem;
  width: 120px;
  color: #333;
  cursor: default;
  transition: 0.5s;
}
h2:hover {
  font-size: 1.5rem;
  transform: scale(1.4) translateX(20px);
}

h3 {
  color: #444;
  margin-bottom: 0.5rem;
}
</style>
