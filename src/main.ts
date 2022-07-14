import { createApp } from 'vue'
import App from './App.vue'
import '@/router/permissionRoutes'

// 注册svg-icon脚本
import 'virtual:svg-icons-register';
import { setupGlobalComponent } from './components';

const app = createApp(App)

setupGlobalComponent(app)

app.mount('#app')