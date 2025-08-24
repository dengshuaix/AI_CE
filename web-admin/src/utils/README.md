# 路径工具使用说明

## 概述

本项目使用统一的路径管理系统，通过 `@` 别名和路径工具函数来避免硬编码路径，提高代码的可维护性和灵活性。

## 配置

### 1. Vite 配置 (vite.config.ts)
```typescript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
    '@assets': path.resolve(__dirname, './public/assets'),
    '@public': path.resolve(__dirname, './public'),
  },
}
```

### 2. TypeScript 配置 (tsconfig.json)
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@assets/*": ["./public/assets/*"],
      "@public/*": ["./public/*"]
    }
  }
}
```

## 使用方法

### 1. 导入路径别名

#### 组件导入
```typescript
// 旧方式
import ScreenAnimation from '../../components/screenAnimation'
import { useAuth } from '../auth'

// 新方式
import ScreenAnimation from '@/components/screenAnimation'
import { useAuth } from '@/features/auth'
```

#### 类型导入
```typescript
// 旧方式
import { LoginRequest } from '../../../types/authTypes'

// 新方式
import { LoginRequest } from '@/types/authTypes'
```

### 2. 资源路径管理

#### 使用预定义资源
```typescript
import { ASSETS, getAsset } from '@/utils/paths'

// 获取用户头像
<img src={getAsset(ASSETS.USER_AVATAR)} alt="用户头像" />

// 获取登录Logo
<img src={getAsset(ASSETS.LOGIN_UI.LOGO)} alt="Logo" />
```

#### 自定义资源路径
```typescript
import { getAssetPath, getPublicPath } from '@/utils/paths'

// 获取自定义资源路径
const customImage = getAssetPath('/assets/custom/image.png')

// 获取公共资源路径
const publicFile = getPublicPath('/data/config.json')
```

### 3. 预定义资源常量

```typescript
export const ASSETS = {
  // 用户头像
  USER_AVATAR: '/assets/CodeBubbyAssets/digtital/host.png',
  // 测试建筑图片
  TEST_BUILDING: '/data/test_building.png',
  // 登录UI相关
  LOGIN_UI: {
    LOGO: '/assets/loginUi/3_748/1.svg',
  },
  // 其他常用资源
  ZHIPU_LOGO: '/assets/Zhipu_logo.png',
  HELP_ICON: '/assets/help.svg',
} as const
```

## 优势

1. **路径统一管理**: 所有资源路径集中在一个文件中
2. **避免硬编码**: 路径变更时只需修改一处
3. **类型安全**: TypeScript 支持路径别名
4. **环境适配**: 自动处理不同环境的基础路径
5. **易于维护**: 清晰的路径结构和命名规范

## 注意事项

1. 确保在 `tsconfig.json` 中正确配置了路径别名
2. 在 `vite.config.ts` 中配置了相应的别名
3. 使用 `@/` 前缀导入 src 目录下的文件
4. 使用 `@assets/` 前缀导入 public/assets 目录下的资源
5. 使用 `@public/` 前缀导入 public 目录下的文件

## 迁移指南

### 从相对路径迁移
```typescript
// 旧代码
import Component from '../../../components/Component'
<img src="/assets/image.png" />

// 新代码
import Component from '@/components/Component'
<img src={getAsset('/assets/image.png')} />
```

### 从硬编码路径迁移
```typescript
// 旧代码
const BASE = ((import.meta as any).env?.BASE_URL || '/').replace(/\/$/, '')
const imagePath = `${BASE}/assets/image.png`

// 新代码
import { getAsset } from '@/utils/paths'
const imagePath = getAsset('/assets/image.png')
```
