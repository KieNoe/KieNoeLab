import { createAlova } from 'alova'
import VueHook from 'alova/vue' // Vue 适配器
import adapterFetch from 'alova/fetch'
import { ElMessage } from 'element-plus'

const request = createAlova({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`, // 使用环境变量
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
  responded: {
    onSuccess: async (response) => {
      if (response.status === 401) {
        ElMessage.error('身份验证失败，请重新登录')
        localStorage.removeItem('token') // 清除 Token
      }
      // Check content type to avoid parsing HTML as JSON
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        return await response.json()
      } else {
        // Handle non-JSON responses
        const text = await response.text()
        console.error('Received non-JSON response:', text.substring(0, 100) + '...')
        throw new Error('服务端没有回应')
      }
    },
    onError: (error) => {
      ElMessage.error('请求失败: ' + error.message)
      return Promise.reject(error)
    }
  }
})

export default request
