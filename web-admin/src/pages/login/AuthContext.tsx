import React, { createContext, useContext, type ReactNode } from 'react'
import { useAuth } from './hooks/useAuth'
import type { LoginState, LoginRequest } from '@/types/authTypes'

interface AuthContextType extends LoginState {
  login: (
    credentials: LoginRequest
  ) => Promise<{ success: boolean; message: string }>
  logout: () => Promise<void>
  checkAuth: () => boolean
  // 新增的状态和方法
  isLoginLoading: boolean
  showLoginModal: boolean
  showLoadingAnimation: boolean
  setShowLoginModal: (show: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuth()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
