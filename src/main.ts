/*
 * @Description: 页面入口
 * @Date: 2022-07-19 14:17:29
 * @LastEditTime: 2022-07-19 15:57:55
 * @FilePath: \vite-vue3-admin\src\main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
// import '@/router/permissionRoutes'
import 'virtual:svg-icons-register' // 注册svg-icon脚本
import { setupGlobalComponent } from './components'
import { setupRouter } from './router'
import '@/styles/index.less'

import { setupStore } from './store'
/* 路由守卫 */
import '@/router/route-guard'
import '@/assets'

// ============================ 根据开发环境和生产环境使用不同的方法引入antd的样式 start ==================================================
// 仅在开发环境(vite serve命令)全量引入antd样式，生产环境(vite build命令)使用unplugin-vue-components按需引入(参见：vite.config.js)
/// #if COMMAND === 'serve'
import 'ant-design-vue/dist/antd.less'
/// #else
// unplugin-vue-components 无法按需引入非组件模块的样式，故在此处引入
import 'ant-design-vue/lib/message/style/index.less'
import 'ant-design-vue/lib/notification/style/index.less'
/// #endif
// ============================ 根据开发环境和生产环境使用不同的方法引入antd的样式 end ==================================================

const app = createApp(App)

app.config.performance = true
app.config.errorHandler = (err, vm, info) => {
  // 处理错误
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  console.log('errorHandler info', info)
}

app.config.warnHandler = function (msg, vm, trace) {
  // `trace` 是组件的继承关系追踪
  console.log('warnHandler trace', trace)
}

setupStore(app)

/* 挂载路由 */
setupRouter(app)

/* 注册全局组件 */
setupGlobalComponent(app)

app.mount('#app')
