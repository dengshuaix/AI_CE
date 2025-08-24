import axios from 'axios'
import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const instance: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 15000,
})

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }
  return config
})

instance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

export default instance


