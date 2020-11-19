# vue后台管理系统
- 基本环境
  vue-cli 4.5.7 sass(dart编译) 

- 目录文件说明
components：业务组件
base：基础组件（可以跨项目使用的组件）
router：路由
utils：工具函数，包括了ajax请求
common: 项目公用的文件：字体、图片、js、样式
- 组件使用到的样式、图片都就近原则放在组件的同一个目录里，方便维护。
- src/settings.js：项目的全局设置文件；页面标题，是否固定头部，是否显示侧边栏logo；

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
