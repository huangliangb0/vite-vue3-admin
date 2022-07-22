import { RouteRecordRaw } from 'vue-router'
import { cloneDeep } from 'lodash'
import type { MenusType, MenuItemType } from '@/models/MenusModel'
import type { RoutesMap } from '@/router/permissionRoutes'
import { isExternal } from './validate'
import BasicLayout from '@/layout/basic-layout/index.vue'

/**
 * 补全子级路径， 比如 about -> /about/index，如果是外链，就不需要进行补全
 * @param path 当前路径
 * @param p 父级路径
 * @returns [string]
 */
const complementPath = (path: string, p: MenuItemType | null) => {
  if (!p || isExternal(path)) {
    return path
  }

  if (p.path === '/') {
    return p.path + path
  }

  return p.path + '/' + path
}
/**
 * 路由打补丁
 * [{ path: '/home', .... }] => [{ path: '/home', component: BasicLayout, ...., children: [{ path: '/home/index', ... }] }]
 * @param menuList MenusType 菜单列表
 * @returns MenusType
 */
export const patchRoutes = (menuList: MenusType): MenusType => {
  return menuList.map((item) => {
    if (!item.children || item.children.length === 0) {
      const { path, tags_affix, ...reset } = item
      return {
        ...reset,
        path: path,
        component: BasicLayout,
        redirect: isExternal(item.path) ? undefined : item.path + '/index',
        children: [
          {
            ...reset,
            tags_affix,
            path: 'index',
          },
        ],
      }
    }
    return {
      ...item,
      component: BasicLayout,
    }
  })
}

/**
 * 生成权限路由
 * @param dynamicRoutesMap src/router/permissionRoutes
 * @param menuList 后台返回的菜单列表
 * @returns RouteRecordRaw[]
 */
export const generatePermissionRoutes = (
  permissionRoutesMap: RoutesMap,
  menuList: MenusType,
): RouteRecordRaw[] => {
  // 给菜单排序
  handleMenuListSort(menuList)

  // 给路由补全路由，并且一级路由添加 BasicLayout 组件
  const list = patchRoutes(menuList)

  // 递归生产线上 vue-router 的路由格式
  const rec = (
    permissionRoutesMap: RoutesMap,
    menuList: MenusType,
    p: MenuItemType | null = null,
  ): RouteRecordRaw[] => {
    return menuList.map((item) => {
      const { name, path, redirect, children, component, ...meta } = item
      const _path = complementPath(path, p)

      return {
        name,
        path: _path,
        redirect,
        meta,
        component:
          component || (name && permissionRoutesMap[name]) || BasicLayout,
        children: children
          ? rec(permissionRoutesMap, children, item)
          : undefined,
      } as RouteRecordRaw
    })
  }

  return rec(permissionRoutesMap, list)
}

// 对最外层路由的children进行扁平处理
export function routesFlat(routes: RouteRecordRaw[]) {
  const _routes = cloneDeep(routes)

  _routes.forEach((item) => {
    if (item.children && item.children.length >= 1) {
      item.children = flat(item.children)
    }
  })

  return _routes
}
// 扁平处理函数
function flat(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  let arr: RouteRecordRaw[] = []

  routes.forEach((route) => {
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
export const handleMenuListSort = (menuList: MenusType) => {
  menuList.sort((a, b) => {
    return (a.sort ?? 9999999) - (b.sort ?? 9999999)
  })
  menuList.forEach((item) => {
    if (item.children) {
      handleMenuListSort(item.children)
    }
  })
}

/**
 * 路由排序
 * @param routes （例如route.getRoutes())
 */
export const handleRoutesSort = (routes: RouteRecordRaw[]) => {
  routes.sort((a, b) => {
    return (a?.meta?.sort ?? 9999999) - (b?.meta?.sort ?? 9999999)
  })
  routes.forEach((item) => {
    if (item.children) {
      handleRoutesSort(item.children)
    }
  })
}
