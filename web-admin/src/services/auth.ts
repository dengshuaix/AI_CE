import request from './request'

export interface LoginParams {
  username: string
  password: string
}

export interface ApiResponse<T = unknown> {
  code: number
  data: T
  message?: string
}

export function login(params: LoginParams) {
  return request.post<ApiResponse>('/user/login', params)
}


