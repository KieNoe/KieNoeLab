<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import request from '@/utils/request'
import { ElMessage } from 'element-plus'

// 获取用户状态管理实例
const userStore = useUserStore()

// 路由实例，用于页面导航
const router = useRouter()

// 视图状态控制变量
const isRegisterView = ref(false) // 控制注册/登录视图切换
const isRegistrationSuccessful = ref(false) // 注册成功状态
const isVerificationSuccessful = ref(false) // 验证成功状态
const isVerificationModalOpen = ref(false) // 验证模态框显示状态
const isResetPasswordModalOpen = ref(false) // 重置密码模态框显示状态
const showPassword = ref(false) // 密码显示/隐藏控制

// 表单输入字段 - 用于存储用户输入的各类信息
const username = ref('') // 用户名
const email = ref('') // 邮箱
const password = ref('') // 密码
const confirmPassword = ref('') // 确认密码
const loginId = ref('') // 登录ID（邮箱）
const loginPassword = ref('') // 登录密码
const emailRegister = ref('') // 邮箱验证码

//设置请求方法
const getRegisterVerificationCode = () => {
  return request.Post(
    `/api/users/verification-code`,
    JSON.stringify({
      email: email.value,
      type: 'register'
    })
  )
}
const verifyRegisterEmailCode = () => {
  return request.Post(
    `/api/users/verify-code`,
    JSON.stringify({
      email: email.value,
      code: emailRegister.value,
      type: 'register'
    })
  )
}
const register = () => {
  return request.Post(
    `/api/users/register`,
    JSON.stringify({
      username: username.value,
      email: email.value,
      password: password.value,
      code: emailRegister.value
    })
  )
}
const login = () => {
  return request.Post(
    `/api/users/login`,
    JSON.stringify({
      email: loginId.value,
      password: loginPassword.value
    })
  )
}
const getResetPasswordVerificationCode = () => {
  return request.Post(
    `/api/users/verification-code`,
    JSON.stringify({
      email: loginId.value,
      type: 'password_reset'
    })
  )
}
const verifyResetPasswordEmailCode = () => {
  return request.Post(
    `/api/users/verify-code`,
    JSON.stringify({
      email: email.value,
      code: emailRegister.value,
      type: 'password_reset'
    })
  )
}
const resetUserPassword = () => {
  return request.Post(
    `/api/users/reset-password`,
    JSON.stringify({
      email: email.value,
      newPassword: password.value,
      code: emailRegister.value
    })
  )
}

// 错误提示信息存储
const usernameError = ref('') // 用户名错误提示
const emailError = ref('') // 邮箱错误提示
const passwordError = ref('') // 密码错误提示
const confirmPasswordError = ref('') // 确认密码错误提示
const loginIdError = ref('') // 登录ID错误提示
const loginPasswordError = ref('') // 登录密码错误提示
const emailRegisterError = ref('') // 邮箱验证码错误提示

// 正则表达式验证规则
const usernameRegex = /^[a-zA-Z0-9_-]{4,20}$/ // 用户名：4-20位字符，允许字母数字下划线短横线
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ // 标准邮箱格式验证
const passwordRegex =
  /^(?=.{8,})(?:(?=.*[A-Z])(?=.*[a-z])|(?=.*[A-Z])(?=.*\d)|(?=.*[A-Z])(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?`~])|(?=.*[a-z])(?=.*\d)|(?=.*[a-z])(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?`~])|(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?`~])).*$/ // 密码复杂度要求

// 用户信息接口定义
interface UserInfo {
  name: string
  email: string
  password: string
  id: string
}
let userInfo: UserInfo

// 表单验证函数
/**
 * 验证用户名
 * 检查是否为空及是否符合命名规则
 */
const validateUsername = () => {
  if (!username.value) {
    usernameError.value = '用户名不能为空'
    getShake()
  } else if (!usernameRegex.test(username.value)) {
    usernameError.value = '用户名长度为4-20字符，且只能包含字母、数字、下划线、短横线'
    getShake()
  } else {
    usernameError.value = ''
  }
}

/**
 * 验证邮箱
 * 检查是否为空及格式是否正确
 */
const validateEmail = () => {
  if (!email.value) {
    emailError.value = '邮箱不能为空'
    getShake()
  } else if (!emailRegex.test(email.value)) {
    emailError.value = '请输入有效的邮箱地址'
    getShake()
  } else {
    emailError.value = ''
  }
}

/**
 * 验证密码
 * 检查是否为空、长度及复杂度要求
 */
const validatePassword = () => {
  if (!password.value) {
    passwordError.value = '密码不能为空'
    getShake()
  } else if (password.value.length < 8) {
    passwordError.value = '密码长度至少为8字符'
    getShake()
  } else if (!passwordRegex.test(password.value)) {
    passwordError.value = '密码需要包含至少大写字母、小写字母、数字和特殊字符中的两种'
    getShake()
  } else {
    passwordError.value = ''
  }
}

/**
 * 验证确认密码
 * 检查是否与输入的密码一致
 */
const validateConfirmPassword = () => {
  if (confirmPassword.value !== password.value) {
    confirmPasswordError.value = '确认密码与密码不一致'
    getShake()
  } else {
    confirmPasswordError.value = ''
  }
}

/**
 * 验证邮箱验证码
 * 检查是否为空及是否正确
 */
const emailConfirmError = () => {
  if (!emailRegister.value) {
    emailRegisterError.value = '验证码不能为空'
    return false
  } else {
    emailRegisterError.value = ''
    return true
  }
}

// 表单提交处理函数
/**
 * 注册表单提交
 * 验证所有字段，全部通过后标记注册成功
 */
const submitForm = () => {
  validateUsername()
  validateEmail()
  validatePassword()
  validateConfirmPassword()
  if (
    !usernameError.value &&
    !emailError.value &&
    !passwordError.value &&
    !confirmPasswordError.value
  ) {
    getRegisterVerificationCode()
      .send()
      .then((res) => {
        if (!('error' in (res as { error: string }))) {
          resendVerificationCode()
          ElMessage.success((res as { message: string }).message)
          isRegistrationSuccessful.value = true
        } else {
          ElMessage.error(
            (res as { message: string }).message + ':' + (res as { error: string }).error
          )
        }
      })
      .catch((error) => {
        getShake()
        ElMessage.error(error.message)
      })
  }
}

/**
 * 登录表单提交
 * 验证登录信息，成功后跳转到个人页面
 */
const loginForm = () => {
  if (!loginId.value) {
    loginIdError.value = '邮箱不能为空'
    getShake()
  } else {
    loginIdError.value = ''
  }
  if (!loginPassword.value) {
    loginPasswordError.value = '密码不能为空'
    getShake()
  } else {
    loginPasswordError.value = ''
  }
  if (!loginIdError.value && !loginPasswordError.value) {
    login()
      .send()
      .then((res) => {
        if (!('error' in (res as { error: string }))) {
          ElMessage.success((res as { message: string }).message)
          isResetPasswordModalOpen.value = false
          isVerificationSuccessful.value = true
          userInfo = {
            name: (res as { user: { name: string } }).user.name,
            email: loginId.value,
            password: loginPassword.value,
            id: (res as { user: { id: string } }).user.id
          }
          localStorage.setItem('token', (res as { token: string }).token)
          setTimeout(() => {
            userStore.login(userInfo)
            router.push('/me')
          }, 2000)
        } else {
          ElMessage.error(
            (res as { message: string }).message + ':' + (res as { error: string }).error
          )
        }
      })
      .catch((error) => {
        ElMessage.error(error.message)
      })
  }
}
const loginPasswordInput = ref<HTMLInputElement | null>(null)
const emailInput = ref<HTMLInputElement | null>(null)
const passwordInput = ref<HTMLInputElement | null>(null)
const confirmPasswordInput = ref<HTMLInputElement | null>(null)
const confirmResetPasswordInput = ref<HTMLInputElement | null>(null)

// 登录表单回车处理
const handleLoginIdEnter = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    loginPasswordInput.value?.focus()
  }
}

const handleLoginPasswordEnter = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    loginForm()
  }
}

// 注册表单回车处理
const handleUsernameEnter = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    emailInput.value?.focus()
  }
}

const handleEmailEnter = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    passwordInput.value?.focus()
  }
}

const handlePasswordEnter = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    confirmPasswordInput.value?.focus()
  }
}
const handlePasswordEnter1 = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    confirmResetPasswordInput.value?.focus()
  }
}

const handleConfirmPasswordEnter = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    submitForm()
  }
}
const handleConfirmPasswordEnter1 = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    resetPassword()
  }
}

const handleEmailRegisterEnter = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    confirmEmailVerification()
  }
}

const handleVerifyEmailRegisterEnter = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    verifyEmailCode()
  }
}

// 邮件验证相关功能
const resendCoolDown = ref(0) // 重发冷却时间
const isRotating = ref(false) // 重发按钮旋转动画控制
let resendTimer: ReturnType<typeof setTimeout> | undefined

/**
 * 重新发送验证码
 * 包含60秒冷却时间和动画效果
 */
const resendVerificationCode = () => {
  resendCoolDown.value = 0
  isRotating.value = true
  if (resendTimer) {
    clearTimeout(resendTimer)
  }
  resendTimer = setTimeout(() => {
    resendCoolDown.value = 60
    const timer = setInterval(() => {
      resendCoolDown.value--
      if (resendCoolDown.value === 0) {
        isRotating.value = false
        clearInterval(timer)
      }
    }, 1000)
  }, 500)
}

/**
 * 验证邮箱验证码
 * 验证成功后进行登录并跳转
 */
const verifyEmailCode = () => {
  if (emailConfirmError()) {
    verifyRegisterEmailCode()
      .send()
      .then((res) => {
        if (!('error' in (res as { error: string }))) {
          ElMessage.success((res as { message: string }).message)
          register()
            .send()
            .then((res) => {
              if (!('error' in (res as { error: string }))) {
                ElMessage.success((res as { message: string }).message)
                isVerificationSuccessful.value = true
                localStorage.setItem('token', (res as { token: string }).token)
                userInfo = {
                  name: username.value,
                  email: email.value,
                  password: password.value,
                  id: (res as { user: { id: string } }).user.id
                }
                setTimeout(() => {
                  userStore.login(userInfo)
                  router.push('/me')
                }, 2000)
              } else {
                ElMessage.error(
                  (res as { message: string }).message + ':' + (res as { error: string }).error
                )
              }
            })
            .catch((error) => {
              ElMessage.error(error.message)
            })
        } else {
          ElMessage.error(
            (res as { message: string }).message + ':' + (res as { error: string }).error
          )
        }
      })
      .catch((error) => {
        ElMessage.error(error.message)
      })
  } else {
    getShake()
    isVerificationSuccessful.value = false
  }
}

// UI交互函数
/**
 * 切换密码显示/隐藏
 */
function togglePassword() {
  showPassword.value = !showPassword.value
}

/**
 * 切换登录/注册视图
 */
const toggleAuthView = () => {
  isRegisterView.value = !isRegisterView.value
}

/**
 * 处理忘记密码流程
 * 验证邮箱后打开验证模态框
 */
const toggleForgotPassword = () => {
  if (!loginId.value) {
    loginIdError.value = '请输入邮箱'
    getShake()
  } else if (!emailRegex.test(loginId.value)) {
    loginIdError.value = '请输入有效的邮箱地址'
    getShake()
  } else {
    getResetPasswordVerificationCode()
      .send()
      .then((res) => {
        if (!('error' in (res as { error: string }))) {
          resendVerificationCode()
          ElMessage.success((res as { message: string }).message)
          loginIdError.value = ''
          isVerificationModalOpen.value = true
        } else {
          ElMessage.error(
            (res as { message: string }).message + ':' + (res as { error: string }).error
          )
        }
      })
      .catch((error) => {
        ElMessage.error(error.message)
      })
  }
}

/**
 * 确认邮箱验证
 * 验证成功后打开重置密码模态框
 */
const confirmEmailVerification = () => {
  if (emailConfirmError()) {
    verifyResetPasswordEmailCode()
      .send()
      .then((res) => {
        if (!('error' in (res as { error: string }))) {
          ElMessage.success((res as { message: string }).message)
          isVerificationModalOpen.value = false
          isResetPasswordModalOpen.value = true
        } else {
          ElMessage.error(
            (res as { message: string }).message + ':' + (res as { error: string }).error
          )
        }
      })
      .catch((error) => {
        ElMessage.error(error.message)
      })
  } else {
    getShake()
  }
}

/**
 * 重置密码
 * 验证新密码后更新用户信息
 */
const resetPassword = () => {
  validatePassword()
  validateConfirmPassword()
  if (!passwordError.value && !confirmPasswordError.value) {
    resetUserPassword()
      .send()
      .then((res) => {
        if (!('error' in (res as { error: string }))) {
          ElMessage.success((res as { message: string }).message)
          isResetPasswordModalOpen.value = false
          isVerificationSuccessful.value = true
          userInfo.password = password.value
          setTimeout(() => {
            userStore.login(userInfo)
            router.push('/me')
          }, 2000)
        } else {
          ElMessage.error(
            (res as { message: string }).message + ':' + (res as { error: string }).error
          )
        }
      })
      .catch((error) => {
        ElMessage.error(error.message)
      })
  } else {
    getShake()
  }
}

// 动画效果控制
const isShaking = ref(false) // 控制整体抖动效果
const isInShaking = ref(false) // 控制内部抖动效果

/**
 * 触发抖动动画
 * 用于表单验证失败时的反馈
 */
function getShake() {
  if (isShaking.value) return
  isShaking.value = true
  isInShaking.value = true
  setTimeout(() => {
    isShaking.value = false
    isInShaking.value = false
  }, 500)
}
</script>
<template>
  <div
    class="body"
    :class="{
      registerActive: isRegisterView,
      registrationSuccess: isRegistrationSuccessful,
      verificationSuccess: isVerificationSuccessful,
      verificationModalOpen: isVerificationModalOpen,
      resetPasswordModalOpen: isResetPasswordModalOpen
    }"
  >
    <div class="container">
      <div
        class="blueBg"
        :class="{
          registrationSuccess: isRegistrationSuccessful,
          verificationSuccess: isVerificationSuccessful
        }"
      >
        <div class="box signin">
          <h2>已经有账号了？</h2>
          <button class="signinBtn" @click="toggleAuthView">登录</button>
        </div>
        <div class="box signup">
          <h2>还没有账号？</h2>
          <button class="signupBtn" @click="toggleAuthView">注册</button>
        </div>
      </div>
      <div
        class="formBx"
        :class="{
          registerActive: isRegisterView,
          registrationSuccess: isRegistrationSuccessful,
          verificationSuccess: isVerificationSuccessful,
          verificationModalOpen: isVerificationModalOpen,
          resetPasswordModalOpen: isResetPasswordModalOpen,
          shakeActive: isShaking
        }"
      >
        <div class="getPassword">
          <form>
            <div class="txt">
              <h3>我们向您的邮箱发送了一封邮件</h3>
              <h4>{{ loginId }}</h4>
            </div>
            <div class="input">
              <div class="confirm">
                <input
                  type="text"
                  placeholder="请输入邮箱验证码"
                  v-model="emailRegister"
                  @keydown.enter.prevent="handleEmailRegisterEnter"
                />
                <span :class="{ active: emailRegisterError }">{{ emailRegisterError }}</span>
                <ion-icon
                  v-if="resendCoolDown === 0"
                  :class="{ active: isRotating }"
                  name="reload-outline"
                  @click="resendVerificationCode"
                ></ion-icon>
                <div class="time" :class="{ show: resendCoolDown !== 0 }">{{ resendCoolDown }}</div>
              </div>
              <input @click="confirmEmailVerification" type="button" value="确认" />
            </div>
          </form>
        </div>
        <div class="form resetPassword">
          <form>
            <div class="input-container" :class="passwordError ? 'inputError' : ''">
              <div class="password-container">
                <input
                  v-model="password"
                  id="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="密码"
                  @keydown.enter.prevent="handlePasswordEnter1"
                />
                <span @click="togglePassword">
                  <ion-icon :name="showPassword ? 'eye-off-outline' : 'eye-outline'"></ion-icon>
                </span>
              </div>
              <p class="error">{{ passwordError }}</p>
            </div>
            <div class="input-container" :class="confirmPasswordError ? 'inputError' : ''">
              <div class="password-container">
                <input
                  v-model="confirmPassword"
                  id="confirmPassword"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="确认密码"
                  ref="confirmResetPasswordInput"
                  @keydown.enter.prevent="handleConfirmPasswordEnter1"
                />
                <span @click="togglePassword">
                  <ion-icon :name="showPassword ? 'eye-off-outline' : 'eye-outline'"></ion-icon>
                </span>
              </div>
              <p class="error">{{ confirmPasswordError }}</p>
            </div>
            <input @click="resetPassword" type="button" value="确认" />
          </form>
        </div>
        <div class="form signinForm">
          <form>
            <h3>登录</h3>
            <div class="input-container" :class="loginIdError ? 'inputError' : ''">
              <input
                v-model="loginId"
                type="text"
                placeholder="邮箱"
                @keydown.enter.prevent="handleLoginIdEnter"
              />
              <p class="error">{{ loginIdError }}</p>
            </div>

            <div class="input-container" :class="loginPasswordError ? 'inputError' : ''">
              <div class="password-container">
                <input
                  ref="loginPasswordInput"
                  v-model="loginPassword"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="密码"
                  @keydown.enter.prevent="handleLoginPasswordEnter"
                />
                <span @click="togglePassword">
                  <ion-icon :name="showPassword ? 'eye-off-outline' : 'eye-outline'"></ion-icon>
                </span>
                <p class="error">{{ loginPasswordError }}</p>
              </div>
            </div>
            <input @click="loginForm" type="button" value="登录" />
            <span class="forgot" @click="toggleForgotPassword">忘记密码？</span>
          </form>
        </div>
        <div class="form signupForm">
          <form @submit.prevent="submitForm">
            <h3>注册</h3>
            <div class="input-container" :class="usernameError ? 'inputError' : ''">
              <input
                v-model="username"
                id="username"
                type="text"
                placeholder="请输入用户名"
                @keydown.enter.prevent="handleUsernameEnter"
              />
              <p class="error">{{ usernameError }}</p>
            </div>
            <div class="input-container" :class="emailError ? 'inputError' : ''">
              <input
                ref="emailInput"
                v-model="email"
                id="email"
                type="email"
                placeholder="请输入邮箱"
                @keydown.enter.prevent="handleEmailEnter"
              />
              <p class="error">{{ emailError }}</p>
            </div>
            <div class="input-container" :class="passwordError ? 'inputError' : ''">
              <div class="password-container">
                <input
                  ref="passwordInput"
                  v-model="password"
                  id="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="密码"
                  @keydown.enter.prevent="handlePasswordEnter"
                />
                <span @click="togglePassword">
                  <ion-icon :name="showPassword ? 'eye-off-outline' : 'eye-outline'"></ion-icon>
                </span>
              </div>
              <p class="error">{{ passwordError }}</p>
            </div>
            <div class="input-container" :class="confirmPasswordError ? 'inputError' : ''">
              <div class="password-container">
                <input
                  ref="confirmPasswordInput"
                  v-model="confirmPassword"
                  id="confirmPassword"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="确认密码"
                  @keydown.enter.prevent="handleConfirmPasswordEnter"
                />
                <span @click="togglePassword">
                  <ion-icon :name="showPassword ? 'eye-off-outline' : 'eye-outline'"></ion-icon>
                </span>
              </div>
              <p class="error">{{ confirmPasswordError }}</p>
            </div>
            <input @click="submitForm" type="button" value="注册" />
          </form>
        </div>
        <div class="confirmEmail">
          <form>
            <div class="txt">
              <h3>我们向您的邮箱发送了一封邮件</h3>
              <h4>{{ email }}</h4>
            </div>
            <div class="input">
              <div class="confirm">
                <input
                  type="text"
                  placeholder="请输入邮箱验证码"
                  v-model="emailRegister"
                  @keydown.enter.prevent="handleVerifyEmailRegisterEnter"
                />
                <span :class="{ active: emailRegisterError }">{{ emailRegisterError }}</span>
                <ion-icon
                  v-if="resendCoolDown === 0"
                  :class="{ active: isRotating }"
                  name="reload-outline"
                  @click="resendVerificationCode"
                ></ion-icon>
                <div class="time" :class="{ show: resendCoolDown !== 0 }">{{ resendCoolDown }}</div>
              </div>
              <input @click="verifyEmailCode" type="button" value="确认" />
            </div>
          </form>
        </div>
        <div class="correct">
          <h3><ion-icon name="checkmark-circle-outline"></ion-icon> 成功！</h3>
          <p>正在登录...</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
input {
  transition: 0.5s;
}
input:hover {
  transform: scale(1.1);
}
button {
  transition: 0.5s;
}
button:hover {
  transform: scale(1.15);
}
.body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  background: #03a9f4;
  transition: 0.5s;
}
.body.registerActive {
  background: #f43648;
}
.body.registrationSuccess {
  background: #ffca3a;
}
.body.verificationSuccess {
  background: #80ed99;
}

.body.verificationModalOpen {
  background: #ffca3a;
}
.body.resetPasswordModalOpen {
  background: #ffca3a;
}

.container {
  position: relative;
  width: 800px;
  height: 500px;
  margin: 20px;
}
.blueBg {
  position: absolute;
  top: 40px;
  width: 100%;
  height: 420px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 5px 45px rgba(255, 255, 255, 0.15);
}
.blueBg .box {
  position: relative;
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: 0.5s;
}
.blueBg.registrationSuccess .box {
  opacity: 0;
}
.blueBg.verificationSuccess .box {
  opacity: 0;
}
.blueBg.verificationModalOpen .box {
  opacity: 0;
}
.blueBg.resetPasswordModalOpen .box {
  opacity: 0;
}

.blueBg .box h2 {
  color: #fff;
  font-size: 1.2em;
  font-weight: 500;
  margin-bottom: 10px;
  cursor: default;
  transition: 0.5s;
}
.blueBg .box h2:hover {
  font-size: 1.4em;
}
.blueBg .box button {
  cursor: pointer;
  padding: 10px 20px;
  background: #fff;
  color: #333;
  font-size: 16px;
  font-weight: 500;
  border: none;
}
.formBx {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: #fff;
  border-radius: 5px;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 45px rgba(255, 255, 255, 0.25);
  transition: 0.5s ease-in-out;
  overflow: hidden;
}
.formBx.registerActive {
  left: 50%;
}
.formBx.registrationSuccess {
  width: 75%;
  left: 12.5%;
}
.formBx.verificationSuccess {
  width: 75%;
  left: 12.5%;
}
.formBx.verificationModalOpen {
  width: 75%;
  left: 12.5%;
}
.formBx.resetPasswordModalOpen {
  width: 75%;
  left: 12.5%;
}
.formBx .form {
  position: absolute;
  width: 100%;
  left: 0;
  padding: 50px;
  transition: 0.5s;
}
.formBx .signinForm {
  transition-delay: 0.25s;
}
.formBx.registerActive .signinForm {
  left: -100%;
  transition-delay: 0s;
}
.formBx.registrationSuccess .signinForm {
  left: -100%;
}
.formBx.verificationSuccess .signinForm {
  left: -100%;
}
.formBx.verificationModalOpen .signinForm {
  left: -100%;
}
.formBx.resetPasswordModalOpen .signinForm {
  left: -100%;
}
.signinForm .error {
  position: absolute;
  margin: 0;
}
.formBx .signupForm {
  left: 100%;
  transition-delay: 0s;
}
.formBx.registerActive .signupForm {
  left: 0;
  transition-delay: 0.25s;
}
.formBx.registrationSuccess .signupForm {
  left: 100%;
}
.formBx .form form {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.formBx .form h3 {
  color: #333;
  font-size: 1.5em;
  font-weight: 500;
  margin-bottom: 20px;
  cursor: default;
  transition: 0.5s;
}
.formBx .form h3:hover {
  font-size: 1.9em;
}
.formBx .form input {
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  outline: none;
  font-size: 16px;
  border: 1px solid #333;
}
.formBx .form input[type='button'] {
  background: #03a9f4;
  color: #fff;
  cursor: pointer;
  border: none;
  min-width: 100px;
}
.formBx.registerActive .signupForm input[type='button'] {
  background: #f43648;
}
.formBx .form .forgot {
  color: #333;
  cursor: pointer;
  transition: 0.5s;
}
.formBx .form .forgot:hover {
  transform: scale(1.1) translateX(10px);
}
.password-container {
  position: relative;
  display: flex;
  align-items: center;
}
.password-container span {
  position: absolute;
  right: 10px;
  bottom: 28.25px;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.password-container span ion-icon {
  font-size: 1.5em;
  transition: 0.5s;
}
.password-container span ion-icon:hover {
  transform: scale(1.15);
}
.input-container {
  position: relative;
}
.input-container .error {
  position: absolute;
  bottom: 0;
  color: red;
  font-size: 10px;
  margin-bottom: 7px;
  cursor: default;
  opacity: 0;
  transition: 0.5s;
  transform: translateX(-10px);
}
.input-container .error:hover {
  font-size: 11px;
}
.input-container.inputError .error {
  opacity: 1;
  transform: translateX(0);
}
.input-container.inputError input {
  border: 1px solid red;
}
.correct {
  position: absolute;
  width: 100%;
  right: -100%;
  padding: 50px;
  transition: 0.5s;
  text-align: center;
}
.formBx3 .correct {
  right: 0;
}
.correct h3 {
  display: flex;
  justify-content: center;
  align-items: center;
}
.correct ion-icon {
  color: #80ed99;
}
.formBx.verificationSuccess .correct {
  right: 0;
}
.confirmEmail {
  position: absolute;
  width: 100%;
  right: -100%;
  padding: 50px;
  transition: 0.5s;
  text-align: center;
}
.formBx.registrationSuccess .confirmEmail {
  right: 0;
}
.formBx.verificationSuccess .confirmEmail {
  right: 100%;
}
.confirmEmail h3 {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
  transition: 0.5s;
  font-size: 1.1em;
}
.confirmEmail h3:hover {
  font-size: 1.2em;
}
.confirmEmail .txt {
  margin-bottom: 20px;
  transition: 0.5s;
  font-size: 1.1em;
  cursor: default;
}
.confirmEmail .txt:hover {
  font-size: 1.2em;
}
.confirmEmail .confirm {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.confirmEmail .confirm ion-icon {
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 20px;
  padding: 10px;
  margin-bottom: 20.25px;
  transition: 0.5s;
}
.confirmEmail .confirm ion-icon.active {
  animation: rotate 0.5s infinite;
}
.confirmEmail .confirm ion-icon:hover {
  transform: scale(1.15);
}
.confirmEmail input {
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  outline: none;
  font-size: 16px;
  border: 1px solid #333;
}
.confirmEmail input[type='button'] {
  background: #ffca3a;
  color: #fff;
  cursor: pointer;
  border: none;
  min-width: 100px;
}
.confirmEmail .confirm .time {
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: 30.25px;
  margin-right: 10px;
  opacity: 0;
  cursor: default;
  z-index: 3;
  transition: 0.5s;
}
.confirmEmail .confirm .time:hover {
  transform: scale(1.2);
}
.confirmEmail .confirm .time.show {
  opacity: 1;
}
.confirmEmail .confirm span {
  position: absolute;
  left: 0;
  bottom: 0;
  margin-bottom: 2.5px;
  font-size: 13px;
  color: #f43648;
  cursor: pointer;
  z-index: 3;
  transition: 0.5s;
}
.confirmEmail .confirm span:hover {
  transform: scale(1.2);
}
.getPassword {
  position: absolute;
  width: 100%;
  right: -100%;
  padding: 50px;
  transition: 0.5s;
  text-align: center;
}
.formBx.verificationModalOpen .getPassword {
  right: 0;
}
.formBx.resetPasswordModalOpen .getPassword {
  right: 100%;
}
.getPassword h3 {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
  transition: 0.5s;
  font-size: 1.1em;
}
.getPassword h3:hover {
  font-size: 1.2em;
}
.getPassword .txt {
  margin-bottom: 20px;
  transition: 0.5s;
  font-size: 1.1em;
  cursor: default;
}
.getPassword .txt:hover {
  font-size: 1.2em;
}
.getPassword .confirm {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.getPassword .confirm ion-icon {
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 20px;
  padding: 10px;
  margin-bottom: 20.25px;
  transition: 0.5s;
}
.getPassword .confirm ion-icon.active {
  animation: rotate 0.5s infinite;
}
.getPassword .confirm ion-icon:hover {
  transform: scale(1.15);
}
.getPassword input {
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  outline: none;
  font-size: 16px;
  border: 1px solid #333;
}
.getPassword input[type='button'] {
  background: #03a9f4;
  color: #fff;
  cursor: pointer;
  border: none;
  min-width: 100px;
}
.getPassword .confirm .time {
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: 30.25px;
  margin-right: 10px;
  opacity: 0;
  cursor: default;
  z-index: 3;
  transition: 0.5s;
}
.getPassword .confirm .time:hover {
  transform: scale(1.2);
}
.getPassword .confirm .time.show {
  opacity: 1;
}
.getPassword .confirm span {
  position: absolute;
  left: 0;
  bottom: 0;
  margin-bottom: 2.5px;
  font-size: 13px;
  color: #f43648;
  cursor: pointer;
  z-index: 3;
  opacity: 0;
  transform: translateX(-10px);
  transition: 0.5s;
}
.getPassword .confirm span.active {
  opacity: 1;
  transform: translateX(0);
}
.getPassword .confirm span:hover {
  transform: scale(1.2);
}
.formBx .form.resetPassword {
  position: absolute;
  width: 100%;
  left: -100%;
  padding: 50px;
  transition: 0.5s;
  text-align: center;
}
.formBx.resetPasswordModalOpen .form.resetPassword {
  left: 0;
}
.formBx.verificationModalOpen input[type='button'] {
  background: #ffca3a;
}
.formBx.resetPasswordModalOpen input[type='button'] {
  background: #ffca3a;
}
.shakeActive {
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
}
</style>
