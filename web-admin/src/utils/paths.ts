/**
 * 路径工具函数
 * 统一管理应用中的各种路径
 */

// 获取基础路径
export const getBasePath = (): string => {
  return (import.meta.env?.BASE_URL || '/').replace(/\/$/, '')
}

// 获取资源路径
export const getAssetPath = (path: string): string => {
  const base = getBasePath()
  // 确保路径以 / 开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${base}${normalizedPath}`
}

// 获取公共资源路径
export const getPublicPath = (path: string): string => {
  const base = getBasePath()
  // 确保路径以 / 开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${base}${normalizedPath}`
}

// 预定义的资源路径
export const ASSETS = {
  // 用户头像
  USER_AVATAR: '/assets/CodeBubbyAssets/digtital/host.png',
  // 测试建筑图片
  TEST_BUILDING: '/data/test_building.png',
  // 登录UI相关
  LOGIN_UI: {
    LOGO: '/assets/loginUi/3_748/1.svg',
  },
  // CodeBubby 资源
  CODEBUBBY: {
    NEW_SESSION: '/assets/CodeBubbyAssets/digtital/2.svg',
    COMMON_DIALOG: '/assets/CodeBubbyAssets/digtital/3.svg',
    HOST: '/assets/CodeBubbyAssets/digtital/host.png',
    USER: '/assets/CodeBubbyAssets/digtital/user.png',
    USER_IM: '/assets/CodeBubbyAssets/digtital/userIm.png',
    BG: '/assets/CodeBubbyAssets/digtital/bg.png',
    CAR_BG: '/assets/CodeBubbyAssets/digtital/carBg.png',
    LOG: '/assets/CodeBubbyAssets/digtital/log.png',
    CLOSE_ICON: '/assets/CodeBubbyAssets/digtital/close_icon.png',
    CLOS: '/assets/CodeBubbyAssets/digtital/clos.png',
    BIG: '/assets/CodeBubbyAssets/digtital/big.png',
  },
  // 其他常用资源
  ZHIPU_LOGO: '/assets/Zhipu_logo.png',
  HELP_ICON: '/assets/help.svg',
  // 动画资源
  SCREEN_ANIMATION: '/assets/screenAnimation.gif',
  // 标题栏资源
  TITLE: {
    LOGOUT: '/assets/title/loginLout.png',
    ME: '/assets/title/me.png',
    ME_NEW: '/assets/title/meNew.png',
  },
  // 消息相关资源
  MESSAGE: {
    NO_DATA: '/assets/noDataMessage.png',
  },
} as const

// 获取预定义资源的完整路径
export const getAsset = (path: string): string => {
  return getAssetPath(path)
}

// 获取预定义公共资源的完整路径
export const getPublicAsset = (path: string): string => {
  return getPublicPath(path)
}
