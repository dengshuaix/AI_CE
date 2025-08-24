import { useState, useEffect, useCallback } from 'react'
import { login as loginApi, logout as logoutApi } from '../auth'
import type { LoginRequest, UserInfo, LoginApiResponse } from '@/types/authTypes'

// 全局状态 - 在 Hook 外部定义，确保所有实例共享同一个状态
let globalAuthState = {
  isLoggedIn: false,
  userInfo: null as UserInfo | null,
  token: null as string | null,
  showLoginModal: true,
  showLoadingAnimation: false,
  isLoginLoading: false
}

// 监听器列表
const listeners: Set<() => void> = new Set()

// 更新全局状态的函数
const updateGlobalState = (updates: Partial<typeof globalAuthState>) => {
  globalAuthState = { ...globalAuthState, ...updates }
  // 通知所有监听器
  listeners.forEach(listener => listener())
}

export const useAuth = () => {
  // 本地状态，用于触发重新渲染
  const [, forceUpdate] = useState({})
  
  // 强制组件重新渲染
  const triggerRerender = useCallback(() => {
    forceUpdate({})
  }, [])
  
  // 注册监听器
  useEffect(() => {
    listeners.add(triggerRerender)
    return () => {
      listeners.delete(triggerRerender)
    }
  }, [triggerRerender])

  // 初始化时检查本地存储的登录状态（只在第一次挂载时执行）
  useEffect(() => {
    // 如果已经初始化过了，就不再执行
    if (globalAuthState.isLoggedIn || !globalAuthState.showLoginModal) return
    
    const token = localStorage.getItem('access_token')
    const userInfoStr = localStorage.getItem('user_info')
    
    if (token && userInfoStr) {
      try {
        const userInfo: UserInfo = JSON.parse(userInfoStr)
        updateGlobalState({
          isLoggedIn: true,
          userInfo,
          token,
          showLoginModal: false
        })
      } catch (error) {
        console.error('解析用户信息失败:', error)
        // 清除无效的本地存储
        localStorage.removeItem('access_token')
        localStorage.removeItem('user_info')
        updateGlobalState({
          isLoggedIn: false,
          userInfo: null,
          token: null,
          showLoginModal: true
        })
      }
    } else {
      updateGlobalState({
        isLoggedIn: false,
        userInfo: null,
        token: null,
        showLoginModal: true
      })
    }
  }, [])

  // 登录
  const login = useCallback(async (credentials: LoginRequest) => {
    updateGlobalState({ isLoginLoading: true })
    
    try {
      const response: LoginApiResponse = await loginApi(credentials)
      
      // 检查响应是否存在且有正确的结构
      if (response && typeof response === 'object') {
        // 如果后端返回的是标准格式 { code, msg, data }
        if ('code' in response && response.code === 200) {
          const { access_token, user_info } = response.data || {}
          
          if (access_token) {
            
            // 如果后端没有返回user_info，构造一个基本的用户信息
            const userInfo = user_info || {
              user_id: 'user_' + Date.now(),
              user_name: '用户',
              phone: credentials.phone,
              identity: 'user'
            }
            
            // 保存到本地存储
            localStorage.setItem('access_token', access_token)
            localStorage.setItem('user_info', JSON.stringify(userInfo))
            
            // 更新全局状态：登录成功
            updateGlobalState({
              isLoggedIn: true,
              userInfo: userInfo,
              token: access_token,
              showLoginModal: false,
              isLoginLoading: false,
              showLoadingAnimation: true  // 立即显示加载动画
            })
            
            // 在加载动画期间预加载数字分身页面的图片
            const preloadImages = [
              '/ai-town/assets/CodeBubbyAssets/digtital/bg.png', // 背景图
              '/ai-town/assets/CodeBubbyAssets/digtital/carBg.png', // 用户卡片背景
              '/ai-town/assets/CodeBubbyAssets/digtital/host.png', // AI头像
              '/ai-town/assets/CodeBubbyAssets/digtital/user.png', // 用户头像
            ]
            
            // 预加载图片
            preloadImages.forEach(src => {
              const img = new Image()
              img.src = src
            })
            
            // 3秒后隐藏加载动画，让AppAdmin处理路由跳转
            setTimeout(() => {
              updateGlobalState({
                showLoadingAnimation: false
              })
              // 不直接跳转，让AppAdmin的useEffect处理路由跳转
            }, 3000)
            
            return { success: true, message: response.msg || '登录成功' }
          } else {
            updateGlobalState({ isLoginLoading: false })
            return { success: false, message: '登录响应数据格式错误' }
          }
        } 
        // 如果后端直接返回成功状态（比如 { success: true, message: 'xxx' }）
        else if ('success' in response && response.success) {
          // 处理直接返回成功的情况
          const { access_token, user_info } = response.data || {}
          
          if (access_token && user_info) {
            localStorage.setItem('access_token', access_token)
            localStorage.setItem('user_info', JSON.stringify(user_info))
            
            updateGlobalState({
              isLoggedIn: true,
              userInfo: user_info,
              token: access_token,
              showLoginModal: false,
              isLoginLoading: false,
              showLoadingAnimation: true
            })
            
            setTimeout(() => {
              updateGlobalState({ showLoadingAnimation: false })
              // 不直接跳转，让AppAdmin的useEffect处理路由跳转
            }, 4000)
            
            return { success: true, message: response.message || '登录成功' }
          }
        }
                // 如果后端直接返回access_token（当前后端返回的格式 - HTTP 200成功）
        else if (response.access_token) {
          // 构造用户信息（因为后端没有返回user_info）
          const userInfo = {
            user_id: 'user_' + Date.now(),
            user_name: '用户',
            phone: credentials.phone,
            identity: 'user'
          }
          
          // 保存到本地存储
          localStorage.setItem('access_token', response.access_token)
          localStorage.setItem('user_info', JSON.stringify(userInfo))
          
          updateGlobalState({
            isLoggedIn: true,
            userInfo: userInfo,
            token: response.access_token,
            showLoginModal: false,
            isLoginLoading: false,
            showLoadingAnimation: true
          })
          
          setTimeout(() => {
            
            updateGlobalState({ showLoadingAnimation: false })
            // 不直接跳转，让AppAdmin的useEffect处理路由跳转
          }, 3000)
          
          return { success: true, message: '登录成功' }
        }
        // 如果后端返回的是其他格式
        else if (response.msg) {
          updateGlobalState({ isLoginLoading: false })
          return { success: false, message: response.msg }
        } else if (response.message) {
          updateGlobalState({ isLoginLoading: false })
          return { success: false, message: response.message }
        }
        
                // 如果响应存在但没有匹配的格式，尝试直接处理
        if (response.access_token && response.user_info) {
          localStorage.setItem('access_token', response.access_token)
          localStorage.setItem('user_info', JSON.stringify(response.user_info))
          
          updateGlobalState({
            isLoggedIn: true,
            userInfo: response.user_info,
            token: response.access_token,
            showLoginModal: false,
            isLoginLoading: false,
            showLoadingAnimation: true
          })
          
          setTimeout(() => {
            
            updateGlobalState({ showLoadingAnimation: false })
            // 不直接跳转，让AppAdmin的useEffect处理路由跳转
          }, 3000)
          
          return { success: true, message: '登录成功' }
        }
      }
      
      // 默认错误处理
      updateGlobalState({ isLoginLoading: false })
      return { success: false, message: '登录失败，响应格式错误' }
      
    } catch (error: any) {
      updateGlobalState({ isLoginLoading: false })
      
      // 如果错误是从auth.ts抛出的，直接使用其message
      if (error && typeof error === 'object' && error.message) {
        return { success: false, message: error.message }
      }
      
      let errorMessage = '登录失败，请稍后重试'
      
      // 检查是否是网络连接问题
      if (error.code === 'ECONNREFUSED' || error.message?.includes('Network Error')) {
        errorMessage = '无法连接到服务器，请检查网络连接或联系管理员'
      } else if (error.response?.status === 404) {
        errorMessage = '登录接口不存在，请检查API配置'
      } else if (error.response?.status === 500) {
        errorMessage = '服务器内部错误，请稍后重试'
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.message) {
        errorMessage = error.message
      }
      
      return { success: false, message: errorMessage }
    }
  }, [])

  // 登出
  const logout = useCallback(async () => {
    try {
      await logoutApi()
    } catch (error) {
      console.error('登出API调用失败:', error)
    } finally {
      // 清除本地存储和状态
      localStorage.removeItem('access_token')
      localStorage.removeItem('user_info')
      updateGlobalState({
        isLoggedIn: false,
        userInfo: null,
        token: null,
        showLoginModal: true,
        showLoadingAnimation: false,
        isLoginLoading: false
      })
      
      // 登出后重定向到根路径
      const basePath = '/ai-town' // 使用固定的基础路径
      if (window.location.pathname !== basePath) {
        window.location.href = basePath
      }
    }
  }, [])

  // 检查是否已登录
  const checkAuth = useCallback(() => {
    const token = localStorage.getItem('access_token')
    return !!token
  }, [])

  // 返回全局状态以及方法
  return {
    // 登录状态
    isLoggedIn: globalAuthState.isLoggedIn,
    userInfo: globalAuthState.userInfo,
    token: globalAuthState.token,
    // UI 状态
    showLoginModal: globalAuthState.showLoginModal,
    showLoadingAnimation: globalAuthState.showLoadingAnimation,
    isLoginLoading: globalAuthState.isLoginLoading,
    // 方法
    login,
    logout,
    checkAuth,
    setShowLoginModal: (show: boolean) => updateGlobalState({ showLoginModal: show }),
  }
}
