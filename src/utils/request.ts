import { createAlova } from 'alova'
import VueHook from 'alova/vue' // Vue 适配器
import adapterFetch from 'alova/fetch'
import { ElMessage } from 'element-plus'

const request = createAlova({
  // 设置请求的基础 URL，使用环境变量来动态配置 API 地址
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`, // 使用环境变量来设置 API 基础地址

  // 使用 VueHook 来作为请求的状态管理，管理请求的生命周期
  statesHook: VueHook,

  // 使用 fetch 作为请求适配器
  requestAdapter: adapterFetch(),

  // 请求前的钩子函数，允许在请求发起前做一些自定义处理
  beforeRequest(method) {
    // 从本地存储中获取 Token，如果没有则默认为 null
    const token = localStorage.getItem('token') || null

    // 如果 Token 存在，就将其添加到请求头中（Authorization 字段）
    if (token) {
      method.config.headers = {
        ...method.config.headers, // 保留原有的请求头
        Authorization: `Bearer ${token}` // 添加 Authorization header
      }
    }
    // 创建一个 AbortController 实例用于取消请求
    method.config.signal = method.config.signal || new AbortController().signal
  },

  // 响应处理钩子函数
  responded: {
    // 请求成功后的处理
    onSuccess: async (response) => {
      // 如果响应状态码为 401，表示身份验证失败
      if (response.status === 401) {
        // 显示错误消息，提示用户重新登录
        ElMessage.error('身份验证失败，请重新登录')

        // 清除本地存储中的 Token，强制用户重新登录
        localStorage.removeItem('token')
      }

      // 获取响应的 content-type，检查是否为 JSON 格式
      const contentType = response.headers.get('content-type')

      // 如果响应内容是 JSON，进行解析
      if (contentType && contentType.includes('application/json')) {
        return await response.json() // 解析 JSON 响应
      } else {
        // 如果响应内容不是 JSON，则将其转换为文本并抛出错误
        const text = await response.text()
        console.error('Received non-JSON response:', text.substring(0, 100) + '...')
        throw new Error('服务端没有回应')
      }
    },

    // 请求失败后的处理
    onError: (error) => {
      // 提示请求失败的错误消息
      ElMessage.error('请求失败: ' + error.message)

      // 返回一个被拒绝的 Promise，传递错误信息
      return Promise.reject(error)
    }
  }
})

export default request
