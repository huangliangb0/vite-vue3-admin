import { RouteRecordRaw } from 'vue-router'
import _ from 'lodash'
import type { MenusType, MenuItemType } from '@/models/MenusModel'
import type { RoutesMap } from '@/router/permissionRoutes'
import { isExternal } from './validate'
import BasicLayout from '@/layout/basic-layout/index.vue'

/**
 * 生成权限路由
 * @param dynamicRoutesMap src/router/permissionRoutes
 * @param menuList 后台返回的菜单列表
 * @returns RouteRecordRaw[]
 */
export const generatePermissionRoutes = (permissionRoutesMap: RoutesMap, menuList: MenusType, p: MenuItemType | null = null): RouteRecordRaw[] => {
  return menuList.map(item => {
    const { name,path, redirect, children, ...meta } = item
    let _path = path
    /**
         * 补全子级路径
         * 比如 about -> /about/index
         * 如果是外链，就不需要进行补全
         */
     if (isExternal(item.path)) {
      _path = path
    } else if (p) {
      _path = p.path + '/' + _path
    } else if (!_path.startsWith('/')) {
      _path = '/' + _path
    }


    return {
      name,
      path: _path,
      redirect,
      meta,
      component: (name && permissionRoutesMap[name]) || BasicLayout,
      children: children ? generatePermissionRoutes(permissionRoutesMap, children, item) : undefined
    } as RouteRecordRaw
  })
}


// 对最外层路由的children进行扁平处理
export function routesFlat(routes: RouteRecordRaw[]) {
  const _routes = _.cloneDeep(routes)

  _routes.forEach(item => {
    if (item.children && item.children.length >= 1) {
      item.children = flat(item.children)
    }
  })

  return _routes
}
// 扁平处理函数
function flat(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  let arr: RouteRecordRaw[] = []

  routes.forEach(route => {
    const { children, ..._reset } = route
    const reset = _reset as unknown as RouteRecordRaw

    if (children && children.length > 0) {
      // 如果父级存在component，则不需要进行扁平化处理
      if (!reset.component) {
        arr.push(reset)
        arr = arr.concat(...flat(children))
      } else {
        reset.children = ([] as RouteRecordRaw[]).concat(...flat(children))
        arr.push(reset)
      }
    } else {
      arr.push(reset)
    }
  })

  return arr
}


/**
 * 菜单列表排序
 * @param menuList 从后端获取的菜单列表
 */
const handleMunuListSort = (menuList: MenusType) : void => {
  menuList.sort((a,b) => {
    a.sort - (b.meta.sort ?? 9999999)
  })
  menuList.forEach(item => {
    if (item.children) {
      handleMunuListSort(item.children)
    }
  })
}