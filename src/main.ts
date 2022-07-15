import { createApp } from 'vue'
import App from './App.vue'
import '@/router/permissionRoutes'
import 'virtual:svg-icons-register'; // 注册svg-icon脚本
import { setupGlobalComponent } from './components';
// import { setupStore } from './store';
import { setupRouter } from './router';
// import '@/router/routerGuard' // 路由守卫

const app = createApp(App)

/* 挂载状态 */
// setupStore(app)

/* 挂载路由 */
setupRouter(app)

/* 注册全局组件 */
setupGlobalComponent(app)

app.mount('#app')