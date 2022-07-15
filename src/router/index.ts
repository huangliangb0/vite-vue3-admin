/**
 * meta 参数说明
    sort： number        排序, 越小越靠前
    roles: Array<'admin' | 'common'> 设置该路由进入的权限，支持多个权限叠加
    icon: string         svg图标
    title: string        标题
    tags_affix: boolean  是否固定在标签栏
    keepAlive: boolean   是否缓存， 目前还无法缓存到第三级
    alwayShowChildInMenu： boolean  是否一直显示子级菜单，哪怕子菜单只有一个
    hideInMenu: boolean,  是否在菜单栏中隐藏，一般是详情页
    activePath: string    当路由设置了该属性，则会高亮相对应的侧边栏。
 */

    import {
        createRouter,
        createWebHashHistory,
        // createWebHistory,
        RouteRecordRaw,
      } from 'vue-router'
      import constantRoutes from './constantRoutes'
      import { generatePermissionRoutes, routesFlat } from '../utils/routes'
      import { isExternal } from '@/utils/validate'
      export { constantRoutes }
      import permissionRoutes from './permissionRoutes'
      import menus from '@/models/MenusModel'
import { RouterHandle } from './helper'

      const asyncRoutes = generatePermissionRoutes(permissionRoutes, menus, null)
      console.log('asyncRoutes', asyncRoutes)

      const routes = [/* ...constantRoutes */] as any[]
      
      
      
      const router = createRouter({
        // history: createWebHashHistory(),
        // history: createWebHistory(import.meta.env.BASE_URL),
        history: createWebHashHistory(import.meta.env.BASE_URL),
        routes: routes as RouteRecordRaw[],
      })
      const handleRouter = new RouterHandle(router)

      export const addRoutes = handleRouter.addRoutes
      export const removeRoutes = handleRouter.removeRoutes
      
      export function setupRouter(app: AppInstance) {
        addRoutes(asyncRoutes)
        app.use(router)
        
      }
      
      export default router
      