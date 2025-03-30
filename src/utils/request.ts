import { createAlova } from 'alova'
import VueHook from 'alova/vue' // Vue 适配器
import adapterFetch from 'alova/fetch'
import { ElMessage } from 'element-plus'

const request = createAlova({
  baseURL: 'http://120.26.253.113', // Added http:// protocol
  statesHook: VueHook,
  requestAdapter: adapterFetch(),
  beforeRequest(method) {
    // 读取本地 Token（如果 `DEFAULT_HEADERS` 里已经有 Authorization，就不覆盖）
    const token = localStorage.getItem('token') || null

    if (token) {
      method.config.headers = {
        ...method.config.headers,
        Authorization: `Bearer ${token}`
      }
    }
  },
  responded(response) {
    if (response.status === 401) {
      ElMessage.error('身份验证失败，请重新登录')
      localStorage.removeItem('token') // 清除 Token
    }
    return response.json()
  }
})

export default request
