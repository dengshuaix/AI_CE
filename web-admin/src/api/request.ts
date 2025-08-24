import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { message } from '@/utils/toast'
import { API_BASE_URL, API_TIMEOUT } from '@/config/env'

// 响应数据接口
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  success?: boolean
}

// 创建axios实例
const instance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
instance.interceptors.request.use(
  (config: any) => {
    // 从localStorage获取token
    const token = localStorage.getItem('access_token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // 添加时间戳防止缓存
    if (config.method === 'get') {
      config.params = { ...config.params, _t: Date.now() }
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error) => {
    // 对于登录接口，不拦截错误，让它们能够被正确处理
    if (error.config?.url?.includes('/api/auth/login')) {
      return Promise.reject(error)
    }
    
    // 处理其他接口的错误响应
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 未授权，清除token并跳转到登录页
          localStorage.removeItem('access_token')
          localStorage.removeItem('user_info')
          message.error('登录已过期，请重新登录')
          break
        case 403:
          message.error('权限不足')
          break
        case 404:
          message.error('请求的资源不存在')
          break
        case 500:
          message.error('服务器内部错误')
          break
        default:
          message.error('请求失败')
      }
    } else if (error.request) {
      message.error('网络错误，请检查网络连接')
    } else {
      message.error('请求配置错误')
    }
    
    return Promise.reject(error)
  }
)

// 通用请求方法
export const request = async <T = any>(
  config: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response = await instance.request<ApiResponse<T>>(config)
    return response.data
  } catch (error: any) {
    // 统一错误处理
    const errorMessage = error.response?.data?.message || error.message || '请求失败'
    message.error(errorMessage)
    throw error
  }
}

// 封装常用HTTP方法
export const http = {
  get: <T = any>(url: string, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: 'GET', url }),
    
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: 'POST', url, data }),
    
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: 'PUT', url, data }),
    
  delete: <T = any>(url: string, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: 'DELETE', url }),
    
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: 'PATCH', url, data }),
}

export default instance
