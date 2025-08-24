import { http } from '@/api/request'
import type { LoginRequest, LoginApiResponse, CheckAgreementRequest, CheckAgreementResponse } from '@/types/authTypes'

// 登录API
export const login = async (data: LoginRequest): Promise<LoginApiResponse> => {
  try {
    const response = await http.post<LoginApiResponse>('/api/auth/login', data)
    return response
  } catch (error: any) {
    // 根据HTTP状态码和响应内容构造错误响应
    let errorResponse: LoginApiResponse = {
      code: 500,
      message: '登录失败，请稍后重试',
      data: {
        access_token: '',
        user_info: {
          user_id: '',
          user_name: '',
          phone: '',
          identity: ''
        }
      }
    }
    
    // 根据HTTP状态码设置不同的错误信息
    if (error.response?.status === 400) {
      // 手机号或密码为空
      errorResponse.code = 400
      errorResponse.message = error.response.data?.msg || '手机号和密码必填'
    } else if (error.response?.status === 401) {
      // 密码错误
      errorResponse.code = 401
      errorResponse.message = error.response.data?.msg || '密码错误'
    } else if (error.response?.status === 404) {
      // 用户不存在
      errorResponse.code = 404
      errorResponse.message = error.response.data?.msg || '用户不存在'
    } else if (error.code === 'ECONNREFUSED' || error.message?.includes('Network Error')) {
      errorResponse.message = '无法连接到服务器，请检查网络连接'
    } else if (error.response?.status === 500) {
      errorResponse.message = '服务器内部错误，请稍后重试'
    } else if (error.response?.data?.msg) {
      errorResponse.message = error.response.data.msg
    } else if (error.message) {
      errorResponse.message = error.message
    }
    
    throw errorResponse
  }
}

// 登出API
export const logout = async (): Promise<void> => {
  try {
    await http.post('/api/auth/logout', null)
  } catch (error) {
    console.error('登出失败:', error)
  } finally {
    // 无论成功失败都清除本地存储
    localStorage.removeItem('access_token')
    localStorage.removeItem('user_info')
  }
}

// 获取用户信息API
export const getUserInfo = async () => {
  const response = await http.get('/api/auth/user-info')
  return response.data
}

// 检查用户协议同意状态API
export const checkAgreement = async (phone: string): Promise<CheckAgreementResponse> => {
  try {
    const requestData: CheckAgreementRequest = { phone }
    const response = await http.post<CheckAgreementResponse>('/api/auth/check_agreement', requestData)
    return response.data
  } catch (error: any) {
    console.error('检查协议状态失败:', error)
    // 如果接口调用失败，默认返回false，不影响用户体验
    return { is_agreed: false }
  }
}
