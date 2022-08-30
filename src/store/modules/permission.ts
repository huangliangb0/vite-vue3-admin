/*
 * @Description: 系统权限 -> 路由、按钮等等
 * @Date: 2022-07-19 14:17:29
 * @LastEditTime: 2022-07-19 16:06:59
 * @FilePath: \vite-vue3-admin\src\store\modules\permission.ts
 */
import { defineStore } from 'pinia'
import { constantRoutes, permissionRoutes } from '@/router'
// import { removeRoutes } from '../../router'
import { generatePermissionRoutes } from '../../utils/routes'
import { RouteRecordRaw } from 'vue-router'
import { MenusType } from '@/models/MenusModel'
interface State {
  routes: RouteRecordRaw[]
  dynamicRoutes: RouteRecordRaw[]
}

const usePermissionStore = defineStore('permission', {
  state: (): State => ({
    // 全部路由
    routes: [],

    // 动态路由 -> 侧边栏路由
    dynamicRoutes: [],
  }),
  actions: {
    setRoutes(menuList: MenusType): Promise<RouteRecordRaw[]> {
      return new Promise((resolve) => {
        const accessedRoutes = generatePermissionRoutes(
          permissionRoutes,
          menuList,
        )

        console.log('accessedRoutes', accessedRoutes)

        this.routes = constantRoutes.concat(accessedRoutes)
        this.dynamicRoutes = accessedRoutes
        resolve(accessedRoutes)
        return accessedRoutes
      })
    },
    resetRoutes() {
      this.routes = []
      this.dynamicRoutes = []
    },
  },
})
export default usePermissionStore
