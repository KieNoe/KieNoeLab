# KieNoeLab

基于 Vue 3 + TypeScript + Vite 的实验室管理系统前端项目。

## 技术栈

- Vue 3：使用组合式API构建用户界面
- TypeScript：提供类型支持
- Vite：现代前端构建工具
- Vue Router：路由管理
- Pinia：状态管理
- ESLint：代码规范检查

## 推荐的IDE设置

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (并禁用 Vetur)。

## TypeScript的.vue导入类型支持

TypeScript默认无法处理.vue导入的类型信息，因此我们使用`vue-tsc`替代`tsc`进行类型检查。在编辑器中，需要安装[Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)以使TypeScript语言服务能够识别.vue类型。

## 项目结构

```
├── public/              # 静态资源目录
│   └── images/          # 图片资源
├── src/                 # 源代码目录
│   ├── assets/         # 项目资源文件
│   ├── components/     # 公共组件
│   │   ├── Banner     # 横幅组件
│   │   ├── Loading    # 加载组件
│   │   ├── SideBar    # 侧边栏组件
│   │   └── labList    # 实验列表组件
│   ├── router/        # 路由配置
│   ├── stores/        # Pinia状态管理
│   │   ├── aboutStatus  # 关于页状态
│   │   ├── pageLoad    # 页面加载状态
│   │   └── userStore   # 用户状态管理
│   └── views/         # 页面视图组件
│       ├── AboutView    # 关于页面
│       ├── ControlView  # 控制面板
│       ├── LabView      # 实验页面
│       ├── LoginView    # 登录页面
│       └── ...         # 其他页面组件
├── .editorconfig      # 编辑器配置
├── .eslintrc         # ESLint配置
└── vite.config.ts    # Vite配置文件
```

## 主要功能模块

- 用户认证：登录、注册、权限管理
- 实验管理：实验列表、实验详情、实验操作
- 数据统计：历史记录、数据分析
- 系统设置：个人信息、通知管理

## 开发环境设置

```sh
npm install
```

### 开发模式运行（支持热重载）

```sh
npm run dev
```

### 类型检查、编译和生产环境构建

```sh
npm run build
```

### 使用ESLint进行代码检查

```sh
npm run lint
```

## 开发规范

- 组件命名：使用PascalCase
- 文件命名：使用kebab-case
- 代码风格：遵循ESLint配置规范
- 提交规范：使用语义化提交信息
