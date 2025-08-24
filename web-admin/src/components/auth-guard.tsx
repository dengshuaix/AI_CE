import React, { useState, useEffect, type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface AuthGuardProps {
  children: ReactNode
}

/**
 * 认证守卫组件
 * 检查用户是否已登录，未登录则重定向到登录页
 */
const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const location = useLocation()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token)
  }, [])
  
  // 等待认证状态确定
  if (isAuthenticated === null) {
    return <div>Loading...</div>
  }
  
  // 未认证则重定向到登录页
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  
  // 已认证则渲染子组件
  return <>{children}</>
}

export default AuthGuard


