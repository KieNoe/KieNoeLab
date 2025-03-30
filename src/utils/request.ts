import { createAlova } from 'alova'
import VueHook from 'alova/vue' // Vue 适配器
import adapterFetch from 'alova/fetch'

// 解析环境变量里的默认请求头（如果为空，则默认 `{}`)
const DEFAULT_HEADERS = import.meta.env.VITE_DEFAULT_HEADERS
  ? JSON.parse(import.meta.env.VITE_DEFAULT_HEADERS)
  : {}

const request = createAlova({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  statesHook: VueHook,
  requestAdapter: adapterFetch(),
  beforeRequest(method) {
    // 读取本地 Token（如果 `DEFAULT_HEADERS` 里已经有 Authorization，就不覆盖）
    const token = localStorage.getItem('token')
    if (token && !DEFAULT_HEADERS.Authorization) {
      DEFAULT_HEADERS.Authorization = `Bearer ${token}`
    }

    // 合并默认请求头 + 传入的 headers（如果 headers 里已有值，不会被覆盖）
    method.config.headers = {
      ...DEFAULT_HEADERS,
      ...method.config.headers // 保留用户自定义 headers
    }
  },
  responded(response) {
    if (response.status === 401) {
      console.warn('身份验证失败，请重新登录')
      localStorage.removeItem('token') // 清除 Token
    }
    return response.json()
  }
})

export default request
