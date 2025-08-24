// 登录请求参数类型
export interface LoginRequest {
  phone: string
  password: string
  is_agreed: boolean
}

// 用户信息类型
export interface UserInfo {
  user_id: string
  user_name: string
  phone: string
  identity: string
}

// 登录响应数据类型
export interface LoginResponseData {
  access_token: string
  user_info: UserInfo
}

// 登录响应类型 - 标准格式
export interface LoginResponse {
  code: number
  msg: string
  data: LoginResponseData
}

// 登录响应类型 - 直接成功格式
export interface LoginResponseDirect {
  success: boolean
  message: string
  data: LoginResponseData
}

// 登录状态类型
export interface LoginState {
  isLoggedIn: boolean
  userInfo: UserInfo | null
  token: string | null
}

// 联合类型，支持多种响应格式
export type LoginApiResponse = LoginResponse | LoginResponseDirect | any

// 协议检查请求参数类型
export interface CheckAgreementRequest {
  phone: string
}

// 协议检查响应数据类型
export interface CheckAgreementResponse {
  is_agreed: boolean
}
