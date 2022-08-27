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
import 'ant-design-vue/lib/message/style/index.css'

const app = createApp(App)

setupStore(app)

/* 挂载路由 */
setupRouter(app)

/* 注册全局组件 */
setupGlobalComponent(app)

app.mount('#app')
