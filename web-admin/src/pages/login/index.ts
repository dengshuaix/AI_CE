// 认证功能模块入口

// 导出主要组件
// export { default as LoginModal } from './components/LoginModal'

// 导出认证上下文和Hook
export { AuthProvider, useAuthContext } from './AuthContext'
export { useAuth } from './hooks/useAuth'

// 导出类型
export * from '@/types/authTypes'

// 导出API
export * from './auth'

// 导出默认登录页面组件
export { default } from './index.tsx'
