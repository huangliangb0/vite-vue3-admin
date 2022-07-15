import { defineStore } from 'pinia'
import { asyncRoutes } from '@/router'
import { constantRoutes } from '@/router'
// import { removeRoutes } from '../../router'
import { handleRoutesSort } from '../../utils/routes'
import { Roles } from '@/models/user'
import { isExternal } from '@/utils/validate'
import { RouteRecordRaw } from 'vue-router'

/**
 *  判断是否用用权限
 * 返回true表示拥有权限
 * @param roles
 * @param route
 * @returns
 */
const hasPermission = (roles: Roles, route: RouteRecordRaw) => {
  // 如果meta不存在 或者roles不存在，则表示拥有任何权限
  if (!route.meta || !Array.isArray(route.meta.roles)) return true

  return roles.some(role => route.meta?.roles?.includes(role))
}

/**
 * 过滤路由
 * @param asyncRoutes 所有的动态路由
 * @param roles  角色 [common, admin]
 * @returns
 */
const filterAsyncRoutes = (
  asyncRoutes: RouteRecordRaw[],
  roles: Roles,
): RouteRecordRaw[] => {
  const res: RouteRecordRaw[] = []
  asyncRoutes.forEach(route => {
    const r = { ...route }
    if (hasPermission(roles, r)) {
      if (r.children && r.children.length > 0) {
        /**
         * 补全子级路径
         * 比如 about -> /about/index
         * 如果是外链，就不需要进行补全
         */
        r.children.forEach(item => {
          if (isExternal(item.path)) {
            item.path = item.path
          } else if (r.path !== '/') {
            item.path = r.path + '/' + item.path
          } else {
            item.path = '/' + item.path
          }
        })

        r.children = filterAsyncRoutes(r.children, roles)
      }
      res.push(r)
    }
  })

  return res
}

interface State {
  routes: RouteRecordRaw[]
  dynamicRoutes: RouteRecordRaw[]
}

export const usePermissionStore = defineStore('permission', {
  state: (): State => ({
    // 全部路由
    routes: [],

    // 动态路由 -> 侧边栏路由
    dynamicRoutes: [],
  }),
  actions: {
    setRoutes(roles: Roles): Promise<RouteRecordRaw[]> {
      return new Promise(resolve => {
        handleRoutesSort(asyncRoutes) // 进行路由排序处理
        const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)

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
