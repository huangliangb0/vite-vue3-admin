/*
 * @Description:
 * @Date: 2022-07-22 11:41:55
 * @LastEditTime: 2022-07-22 16:30:42
 * @FilePath: \vite-vue3-admin\src\router\helper.ts
 */
import { routesFlat } from '@/utils/routes'
import { isExternal } from '@/utils/validate'
import { Router, RouteRecordRaw } from 'vue-router'

export class RouterHandle {
  private removeRouteGroup: Array<() => void> = []
  private router: Router
  constructor(router: Router) {
    this.router = router
  }
  addRoutes = (dynamicRoutes: RouteRecordRaw[]) => {
    /**
     * 由于keep-alive 只支持二级路由的缓存，所以应该把二级以上（不包括二级）的路由都提升到二级路由中，
     * routesFlat就是对这个做出处理
     * 这里依然存在一个问题，就是等多级路由的父路由的component存在时，缓存会失效。因为父路由存在component，无法对其进行路由提升
     */
    const routes = routesFlat(dynamicRoutes)

    // console.log('扁平后的路由', routes)

    routes.forEach((route: RouteRecordRaw) => {
      if (!isExternal(route.path) && this.router) {
        const removeRoute = this.router.addRoute(route)
        this.removeRouteGroup.push(removeRoute)
      }
    })
  }
  removeRoutes = () => {
    this.removeRouteGroup.forEach((removeRoute) => {
      removeRoute()
    })
    this.removeRouteGroup = []
  }
}
