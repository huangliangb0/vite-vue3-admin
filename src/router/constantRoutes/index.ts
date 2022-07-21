/*
 * @Description: 导出所有常规路由
 * @Date: 2022-07-19 14:17:29
 * @LastEditTime: 2022-07-19 16:09:39
 * @FilePath: \vite-vue3-admin\src\router\constantRoutes\index.ts
 */
import { RouteRecordRaw } from 'vue-router'

let constantRoutes: RouteRecordRaw[] = []

const modules = import.meta.globEager('./*.ts')

Object.keys(modules).forEach(path => {
  if (path !== './index.ts') {
    const routes = modules[path].default || modules[path]
    if (Array.isArray(routes)) {
      constantRoutes = constantRoutes.concat(...routes)
    }
  }
})

export default [{ path: '/', redirect: '/home' }, ...constantRoutes]
