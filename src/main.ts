import { createApp } from 'vue'
import App from './App.vue'
import '@/router/permissionRoutes'
import 'virtual:svg-icons-register'; // 注册svg-icon脚本
import { setupGlobalComponent } from './components';
import { setupRouter } from './router';
import '@/styles/index.less';

const app = createApp(App)

/* 挂载路由 */
setupRouter(app)

/* 注册全局组件 */
setupGlobalComponent(app)

app.mount('#app')