# 项目结构说明文档

## 项目概述
海π教学平台门户系统，包含登录页面和首页，采用React + TypeScript + Ant Design技术栈。

## 目录结构

### 核心组件
```
src/
├── components/           # 公共组件
│   ├── Header/          # 顶部导航组件
│   │   ├── Navigation.tsx
│   │   └── Navigation.css
│   ├── Footer/          # 底部组件
│   │   ├── index.tsx
│   │   └── Footer.css
│   └── Hero/            # Hero横幅组件（新增）
│       ├── index.tsx
│       └── Hero.css
├── pages/               # 页面组件
│   ├── home/           # 首页
│   │   ├── index.tsx
│   │   ├── css/
│   │   │   └── HomePage.css
│   │   ├── tabComponent.tsx
│   │   ├── TeacherTabComponent.tsx
│   │   └── supportingEeducation.tsx
│   ├── about/          # 关于我们页面（新增）
│   │   ├── index.tsx
│   │   └── css/
│   │       └── AboutPage.css
│   └── login/          # 登录页面
│       ├── index.tsx
│       ├── auth.ts
│       ├── AuthContext.tsx
│       ├── hooks/
│       │   └── useAuth.ts
│       └── components/
│           ├── LoginModal.tsx
│           ├── LegalDocumentModal.tsx
│           └── PasswordToggleIcon.tsx
├── router/             # 路由配置
│   └── index.tsx
├── services/           # API服务
│   ├── auth.ts
│   └── request.ts
├── api/               # API请求配置
│   └── request.ts
├── types/             # TypeScript类型定义
│   ├── authTypes.ts
│   └── assetTypes.d.ts
├── utils/             # 工具函数
│   ├── paths.ts
│   ├── toast.ts
│   └── README.md
├── config/            # 配置文件
│   └── env.ts
└── assets/            # 静态资源
    ├── logo.png
    ├── banner.png
    ├── about_zhipu.png
    └── ...其他图片资源
```

## 新增功能说明

### 1. Hero组件 (`src/components/Hero/`)
- **功能**: 可复用的Hero横幅组件，支持自定义标题、副标题、描述和背景图片
- **特性**: 
  - 响应式设计，适配不同屏幕尺寸
  - 支持自定义样式类名
  - 使用BEM命名规范
  - 完全可配置的文案和背景

### 2. 关于我们页面 (`src/pages/about/`)
- **功能**: 展示公司简介和相关信息
- **特性**:
  - 使用Hero组件作为页面横幅
  - 响应式布局设计，适配不同屏幕尺寸
  - 包含公司简介区域，展示智谱AI的详细信息
  - 使用Ant Design组件构建现代化UI

### 3. 路由更新
- 新增 `/about` 路由，指向关于我们页面
- 更新导航组件，点击"关于我们"跳转到对应页面
- 智能导航处理：在首页点击导航项滚动到对应区域，在其他页面点击导航项先跳转到首页再滚动

### 4. 首页重构
- 将原有的Hero区域代码替换为Hero组件
- 保持原有功能和样式不变
- 提高代码复用性和可维护性
- 支持从其他页面跳转后的自动滚动功能

## 技术规范

### 命名规范
- 使用BEM命名规范
- 组件名使用PascalCase
- 文件名使用kebab-case
- CSS类名使用BEM规范

### 代码规范
- 使用TypeScript进行类型检查
- 函数式组件 + Hooks
- 使用Ant Design组件库
- 响应式设计，适配移动端和桌面端

### 样式规范
- 使用CSS模块化
- 响应式设计优先
- 使用CSS变量管理主题色彩
- 遵循移动优先的设计原则

## 开发指南

### 添加新页面
1. 在 `src/pages/` 下创建新页面目录
2. 创建页面组件和样式文件
3. 在 `src/router/index.tsx` 中添加路由配置
4. 在导航组件中添加对应的链接

### 使用Hero组件
```tsx
import Hero from '../../components/Hero'

<Hero
  title="页面标题"
  subtitle="页面副标题"
  description="页面描述文字"
  backgroundImage={bannerImg}
  className="custom-hero-class"
/>
```

### 样式开发
- 遵循BEM命名规范
- 使用语义化的类名
- 优先使用flexbox和grid布局
- 确保响应式设计的兼容性

## 部署说明
- 使用Vite作为构建工具
- 支持热重载开发
- 生产环境优化配置
- 静态资源CDN部署
