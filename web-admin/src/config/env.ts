// 环境变量配置
interface EnvConfig {
  API_BASE_URL: string
  API_TIMEOUT: number
  APP_NAME: string
  VERSION: string
}

// 根据环境获取配置
const getEnvConfig = (): EnvConfig => {
  const env = import.meta.env.MODE || 'development'
  
  const configs: Record<string, EnvConfig> = {
    development: {
      // API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001',
      API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://39.101.66.62:8080',
      API_TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
      APP_NAME: 'AI Town',
      VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0'
    },
    test: {
      API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://39.101.66.62:8080',
      API_TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
      APP_NAME: 'AI Town',
      VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0'
    },
    production: {
      API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://39.101.66.62:8080',
      API_TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '15000'),
      APP_NAME: 'AI Town',
      VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0'
    }
  }
  
  return configs[env] || configs.development
}

export const envConfig = getEnvConfig()

// 导出单个配置项，方便使用
export const {
  API_BASE_URL,
  API_TIMEOUT,
  APP_NAME,
  VERSION
} = envConfig

// 开发环境配置
export const isDevelopment = import.meta.env.MODE === 'development'
export const isProduction = import.meta.env.MODE === 'production'
export const isTest = import.meta.env.MODE === 'test'
