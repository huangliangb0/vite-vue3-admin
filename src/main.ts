import { createApp } from 'vue'
import App from './App.vue'
import '@/router/permissionRoutes'
import 'virtual:svg-icons-register'; // 注册svg-icon脚本
import { setupGlobalComponent } from './components';
import { setupRouter } from './router';
import '@/styles/index.less';
import { setupStore } from './store';

const app = createApp(App)

setupStore(app)

/* 挂载路由 */
setupRouter(app)

/* 注册全局组件 */
setupGlobalComponent(app)

app.mount('#app')