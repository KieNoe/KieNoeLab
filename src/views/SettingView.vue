<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

// 控制各个管理卡片的显示状态
const activeCard = ref<string | null>(null)

// 切换卡片显示状态
const toggleCard = (cardName: string) => {
  if (activeCard.value === cardName) {
    activeCard.value = null
  } else {
    activeCard.value = cardName
  }
}

// 关闭所有卡片
const closeAllCards = () => {
  activeCard.value = null
  isToggleContractCard.value = false
}

// 头像上传相关
const fileInput = ref<HTMLInputElement | null>(null)
const previewUrl = ref('/images/LOGO.png')

const selectFile = () => {
  if (fileInput.value) fileInput.value.click()
}

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return

  const file = input.files[0]

  // 只允许图片格式
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    ElMessage.error('只支持 jpg、png、gif、webp 格式')
    return
  }

  // 检查文件大小（2MB = 2 * 1024 * 1024 bytes）
  const maxSize = 2 * 1024 * 1024 // 2MB in bytes
  if (file.size > maxSize) {
    ElMessage.error('图片大小不能超过2MB')
    return
  }

  // 读取文件并转换为 Base64
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    // 清除已存在的头像数据
    localStorage.removeItem('userAvatar')
    previewUrl.value = reader.result as string
    // 存入新的头像数据
    localStorage.setItem('userAvatar', previewUrl.value)
    if (localStorage.getItem('userAvatar')) {
      ElMessage({
        message: '头像上传成功！',
        type: 'success'
      })
    }
  }
}
const userLogout = () => {
  userStore.logout()
  ElMessage({
    message: '注销成功！',
    type: 'success'
  })
  setTimeout(() => {
    router.push('/login')
  }, 2000)
}
let lastModified = localStorage.getItem('lastModified')

const isToggleContractCard = ref(false)
const toggleContractCard = () => {
  isToggleContractCard.value = !isToggleContractCard.value
}

// 邮箱修改相关
const newEmail = ref('')
const verificationCode = ref('')
const countdown = ref(0)
const isCountingDown = ref(false)
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

// 发送验证码
const sendVerificationCode = () => {
  if (!newEmail.value) {
    ElMessage.error('请输入邮箱')
    return
  } else if (!emailRegex.test(newEmail.value)) {
    ElMessage.error('请输入正确的邮箱格式')
    return
  } else {
    // TODO: 实现发送验证码的API调用
    ElMessage.success('验证码发送成功')
  }
  if (isCountingDown.value) return
  isCountingDown.value = true
  countdown.value = 60

  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      isCountingDown.value = false
    }
  }, 1000)
}

// 提交新邮箱
const submitNewEmail = () => {
  if (!newEmail.value || !verificationCode.value) {
    ElMessage.error('请填写完整信息')
    return
  }
  // TODO: 实现邮箱修改的API调用
  ElMessage.success('邮箱修改成功')
  localStorage.setItem('lastModified', new Date().toLocaleString())
  userStore.updateEmail(newEmail.value)
  lastModified = localStorage.getItem('lastModified')
  newEmail.value = ''
  verificationCode.value = ''
  toggleContractCard()
}
// 页面加载时从 localStorage 读取头像
onMounted(() => {
  const savedAvatar = localStorage.getItem('userAvatar')
  if (savedAvatar) previewUrl.value = savedAvatar
})
</script>

<template>
  <div class="settings-container">
    <!-- 遮罩层 -->
    <div class="overlay" :class="{ active: activeCard }" @click="closeAllCards"></div>

    <!-- 账号设置区域 -->
    <div class="settings-card">
      <h2 class="card-title">账号</h2>
      <div class="settings-item">
        <span class="item-label">头像</span>
        <img class="avatar-preview" :src="previewUrl" @click="toggleCard('avatar')" />
      </div>
      <div class="settings-item">
        <span class="item-label">账号ID</span>
        <span class="item-value">{{ userStore.user?.id || '未登录' }}</span>
      </div>
      <div class="settings-item">
        <span class="item-label">管理我的账号</span>
        <button class="setting-button" @click="toggleCard('account')">管理</button>
      </div>
      <div class="settings-item">
        <span class="item-label">邮箱与登录方式</span>
        <button class="setting-button" @click="toggleCard('contact')">管理</button>
      </div>
    </div>

    <!-- 通知设置区域 -->
    <div class="settings-card">
      <h2 class="card-title">通知</h2>
      <div class="settings-item">
        <span class="item-label">接收通知的时间与方式</span>
        <button class="setting-button" @click="toggleCard('notification-time')">设置</button>
      </div>
      <div class="settings-item">
        <span class="item-label">电子邮件通知</span>
        <button class="setting-button" @click="toggleCard('notification-email')">设置</button>
      </div>
    </div>

    <!-- 播放与效果设置区域 -->
    <div class="settings-card">
      <h2 class="card-title">播放与效果</h2>
      <div class="settings-item">
        <span class="item-label">预览显示</span>
        <label class="switch">
          <input type="checkbox" />
          <span class="slider"></span>
        </label>
      </div>
      <div class="settings-item">
        <span class="item-label">是否重复播放</span>
        <label class="switch">
          <input type="checkbox" />
          <span class="slider"></span>
        </label>
      </div>
      <div class="settings-item">
        <span class="item-label">智能匹配分辨率</span>
        <label class="switch">
          <input type="checkbox" />
          <span class="slider"></span>
        </label>
      </div>
    </div>

    <!-- 管理卡片 -->
    <div class="management-card" :class="activeCard">
      <div class="card-header">
        <h3>
          {{
            activeCard === 'avatar'
              ? '更换头像'
              : activeCard === 'account'
                ? '账号管理'
                : activeCard === 'contact'
                  ? '联系方式管理'
                  : activeCard === 'notification-time'
                    ? '通知时间设置'
                    : activeCard === 'notification-email'
                      ? '邮件通知设置'
                      : ''
          }}
        </h3>
        <button class="close-button" @click="closeAllCards">×</button>
      </div>
      <div class="card-content">
        <!-- 头像上传卡片内容 -->
        <div
          class="card-content-item avatar-content"
          :class="activeCard === 'avatar' ? 'active' : ''"
        >
          <div class="avatar-upload">
            <div class="avatar-preview-large" @click="selectFile">
              <img v-if="previewUrl" :src="previewUrl" alt="头像预览" />
              <div v-else class="upload-placeholder">
                <ion-icon name="cloud-upload-outline"></ion-icon>
                <span>点击上传头像</span>
              </div>
            </div>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              @change="handleFileChange"
              style="display: none"
            />
            <p class="upload-tip">支持 jpg、png、gif、webp 格式</p>
            <p class="upload-tip">图片大小限2MB以内</p>
            <p class="upload-tip">（头像为本地上传）</p>
          </div>
        </div>
        <!-- 账号管理卡片内容 -->
        <div
          class="card-content-item account-content"
          :class="activeCard === 'account' ? 'active' : ''"
        >
          <div class="account-info">
            <div class="account-avatar">
              <img :src="previewUrl" alt="头像" />
            </div>
            <div class="account-details">
              <div class="info-item">
                <span class="info-label">账号名称</span>
                <span class="info-value">{{ userStore.user?.name || '未登录' }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">账号ID</span>
                <span class="info-value">{{ userStore.user?.id || '未登录' }}</span>
              </div>
            </div>
            <button class="logout-button" @click="userLogout">注销账号</button>
          </div>
        </div>
        <!-- 联系方式管理卡片内容 -->
        <div
          class="card-content-item contact-content"
          :class="activeCard === 'contact' ? 'active' : ''"
        >
          <div class="contact-info" :class="isToggleContractCard ? 'active' : ''">
            <div class="contact-avatar">
              <img :src="previewUrl" alt="头像" />
            </div>
            <div class="contact-details">
              <div class="info-item">
                <span class="info-label">当前邮箱</span>
                <span class="info-value">{{ userStore.user?.email || '未设置' }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">上次修改时间</span>
                <span class="info-value">{{ lastModified ? lastModified : '暂无记录' }}</span>
              </div>
              <button class="modify-button" @click="toggleContractCard">修改邮箱</button>
            </div>
          </div>
          <div class="changeEmail" :class="isToggleContractCard ? 'active' : ''">
            <div class="email-avatar">
              <img :src="previewUrl" alt="头像" />
            </div>
            <div class="email-form">
              <div class="input-group">
                <input
                  type="email"
                  v-model="newEmail"
                  placeholder="请输入新邮箱"
                  class="email-input"
                />
                <button
                  class="send-code-button"
                  :disabled="isCountingDown"
                  @click="sendVerificationCode"
                >
                  {{ isCountingDown ? `${countdown}s` : '发送验证码' }}
                </button>
              </div>
              <input
                type="text"
                v-model="verificationCode"
                placeholder="请输入验证码"
                class="verification-input"
              />
              <button class="submit-button" @click="submitNewEmail">确认修改</button>
            </div>
          </div>
        </div>
        <!-- 通知时间设置卡片内容 -->
        <div
          class="card-content-item notification-time-content"
          :class="activeCard === 'notification-time' ? 'active' : ''"
        >
          <div class="notification-settings">
            <div class="notification-section">
              <h4>时间设置</h4>
              <div class="time-options">
                <label class="radio-option">
                  <input type="radio" name="timePreference" value="anytime" checked />
                  <span>随时接收（默认）</span>
                </label>
                <label class="radio-option">
                  <input type="radio" name="timePreference" value="workHours" />
                  <span>工作时间（09:00-18:00）</span>
                </label>
                <label class="radio-option">
                  <input type="radio" name="timePreference" value="afterWork" />
                  <span>非工作时间（18:00-23:00）</span>
                </label>
                <label class="radio-option">
                  <input type="radio" name="timePreference" value="custom" />
                  <span>自定义时间段</span>
                </label>
                <div class="custom-time-inputs">
                  <input type="time" class="time-input" placeholder="开始时间" />
                  <span>至</span>
                  <input type="time" class="time-input" placeholder="结束时间" />
                </div>
              </div>
            </div>

            <div class="notification-section">
              <h4>频率设置</h4>
              <div class="frequency-options">
                <label class="radio-option">
                  <input type="radio" name="frequencyPreference" value="instant" />
                  <span>即时通知（收到消息立即推送）</span>
                </label>
                <label class="radio-option">
                  <input type="radio" name="frequencyPreference" value="batch" />
                  <span>批量推送（每隔1小时/每天汇总）</span>
                </label>
                <label class="radio-option">
                  <input type="radio" name="frequencyPreference" value="manual" checked />
                  <span>手动查看（不主动推送）</span>
                </label>
              </div>
            </div>

            <button class="save-button">保存设置</button>
          </div>
        </div>
        <!-- 邮件通知设置卡片内容 -->
        <div
          class="card-content-item notification-email-content"
          :class="activeCard === 'notification-email' ? 'active' : ''"
        >
          <div class="notification-settings">
            <div class="notification-section">
              <h4>邮件通知设置</h4>
              <div class="frequency-options">
                <label class="radio-option">
                  <input type="radio" name="emailPreference" value="all" checked />
                  <span>接收所有推送邮件</span>
                </label>
                <label class="radio-option">
                  <input type="radio" name="emailPreference" value="important" />
                  <span>仅接收重要通知</span>
                </label>
                <label class="radio-option">
                  <input type="radio" name="emailPreference" value="none" />
                  <span>不接收推送邮件</span>
                </label>
              </div>
              <button class="save-button">保存设置</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-container {
  width: 100%;
  height: 100%;
  padding: 40px;
  background: #f8f9fa;
  position: relative;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s;
}

.overlay.active {
  opacity: 1;
  pointer-events: auto;
}

.management-card {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -150%) scale(0.95);
  opacity: 0;
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  z-index: 11;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  pointer-events: none;
  transition: all 0.5s;
}

.management-card.avatar,
.management-card.account,
.management-card.contact,
.management-card.notification-time,
.management-card.notification-email {
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
  pointer-events: auto;
}

.settings-card {
  background: white;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: 0.5s;
}

.settings-card:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.card-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  border-bottom: 2px solid #89c2d9;
  padding-bottom: 10px;
  cursor: default;
  transition: 0.5s;
}

.settings-card:hover .card-title {
  border-color: #468faf;
  font-size: 30px;
}

.settings-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.settings-item:hover {
  background-color: rgba(137, 194, 217, 0.1);
}
.settings-item:last-child {
  border-bottom: none;
}

.item-label {
  font-size: 16px;
  color: #333;
  transition: 0.5s;
}

.settings-item:hover .item-label {
  font-size: 19px;
}

.item-value {
  color: #666;
  transition: color 0.3s ease;
}

.setting-button {
  padding: 6px 16px;
  border: 1px solid #89c2d9;
  border-radius: 4px;
  background: transparent;
  color: #468faf;
  cursor: pointer;
  transition: 0.5s ease;
}

.setting-button:hover {
  background: #89c2d9;
  color: white;
  transform: scale(1.05);
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s ease;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: '';
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s ease;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #89c2d9;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.avatar-upload {
  text-align: center;
  padding: 20px;
}

.avatar-preview-large {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 0 auto;
  cursor: pointer;
  background-color: #f0f2f5;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.5s ease;
}

.avatar-preview-large:hover {
  transform: scale(1.15);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.avatar-preview-large img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-preview {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.5s;
}

.avatar-preview:hover {
  transform: scale(1.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #89c2d9;
}

.upload-placeholder ion-icon {
  font-size: 48px;
  margin-bottom: 8px;
}

.upload-tip {
  margin-top: 16px;
  color: #666;
  font-size: 14px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.card-header h3 {
  margin: 0;
  font-size: 20px;
  color: #333;
  cursor: default;
  transition: 0.5s;
}
.card-header h3:hover {
  font-size: 28px;
}

.close-button {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: #666;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.5s ease;
}

.close-button:hover {
  background: rgba(137, 194, 217, 0.2);
  color: #468faf;
  transform: rotate(90deg);
}
.card-content {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: auto;
  overflow-x: hidden;
}

.card-content-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: 0.5s;
  opacity: 0;
  pointer-events: none;
}
.notification-time-content {
  transform: translateY(-100%);
}
.card-content-item.active {
  opacity: 1;
  pointer-events: auto;
}
.notification-time-content.active {
  transform: translateY(0);
}
.card-content-item p {
  cursor: default;
  transition: 0.5s;
}
.card-content-item p:hover {
  font-size: 20px;
}

.notification-settings {
  padding: 20px;
}

.notification-section {
  margin-bottom: 30px;
}

.notification-section h4 {
  font-size: 18px;
  color: #333;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
  cursor: default;
  transition: 0.5s;
}
.notification-section h4:hover {
  font-size: 28px;
}

.time-options,
.frequency-options {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.radio-option:hover {
  background-color: rgba(137, 194, 217, 0.1);
}

.radio-option input[type='radio'] {
  margin: 0;
}

.radio-option span {
  color: #333;
}

.custom-time-inputs {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 25px;
}

.time-input {
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;
}

.time-input:focus {
  border-color: #89c2d9;
}

.save-button {
  width: 100%;
  padding: 12px;
  background-color: #89c2d9;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.3s;
}

.save-button:hover {
  background-color: #468faf;
  transform: scale(1.02);
}
.card-content-item span {
  cursor: default;
  transition: 0.5s;
}
.card-content-item span:hover {
  font-size: 20px;
}
.card-content-item img {
  cursor: default;
  transition: 0.5s;
}
.card-content-item img:hover {
  transform: scale(1.1);
}
.account-info {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.account-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  transition: 0.5s;
}

.account-avatar:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.account-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.notification-email-content .notification-settings {
  padding: 20px;
}

.notification-email-content .notification-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.card-content-item img {
  cursor: default;
  transition: 0.5s;
}
.card-content-item img:hover {
  transform: scale(1.1);
}
.account-info {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.account-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  transition: 0.5s;
}

.account-avatar:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.account-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.account-details {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.info-label {
  color: #666;
  font-size: 14px;
}

.info-value {
  color: #333;
  font-weight: 500;
}

.logout-button {
  padding: 8px 24px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.5s;
}

.logout-button:hover {
  background-color: #ff7875;
  transform: scale(1.3);
}

.contact-content {
  display: flex;
  justify-content: center;
}
.contact-info {
  position: absolute;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  opacity: 1;
  transition: 0.5s;
}
.contact-info.active {
  transform: translateX(200%);
  opacity: 0;
}
.changeEmail {
  position: absolute;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  transition: 0.5s;
  transform: translateX(200%);
  opacity: 0;
}
.changeEmail.active {
  transform: translateX(0);
  opacity: 1;
}

.contact-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: 0.5s;
}

.contact-avatar:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.contact-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.contact-details {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.modify-button {
  padding: 8px 24px;
  background-color: #89c2d9;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.5s;
}

.modify-button:hover {
  background-color: #468faf;
  transform: scale(1.1);
}
.email-form {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-group {
  position: relative;
  width: 100%;
  display: flex;
  gap: 8px;
}

.email-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  transition: 0.5s;
}
.email-input:hover {
  border-color: #89c2d9;
  transform: scale(1.07);
}

.email-input:focus {
  border-color: #89c2d9;
  outline: none;
}

.verification-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  transition: 0.5s;
}
.verification-input:hover {
  border-color: #89c2d9;
  transform: scale(1.07);
}

.verification-input:focus {
  border-color: #89c2d9;
  outline: none;
}

.send-code-button {
  white-space: nowrap;
  padding: 8px 16px;
  background-color: #89c2d9;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.5s;
}

.send-code-button:hover:not(:disabled) {
  background-color: #468faf;
  transform: scale(1.1);
}

.send-code-button:disabled {
  background-color: #c0c4cc;
  cursor: not-allowed;
}

.submit-button {
  width: 100%;
  padding: 8px 24px;
  background-color: #89c2d9;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.5s;
}

.submit-button:hover {
  background-color: #468faf;
  transform: scale(1.1);
}
.changeEmail .email-avatar {
  width: 140px;
  height: 140px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #e0e0e0;
  transition: 0.5s;
}
.changeEmail .email-avatar:hover {
  border-color: #89c2d9;
  transform: scale(1.1);
}

.changeEmail .email-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.changeEmail .email-form {
  margin-top: 20px;
}
</style>
