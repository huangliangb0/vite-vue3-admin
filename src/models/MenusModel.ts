// interface RoutesItemType {
//     /* 路由名称, 路由匹配将会根据name来匹配 */
//     name?: string;
//     /* 路由路径 */
//     path?: string;
//     /* 路由重定向 */
//     redirect?: string;
//     /* 路由标题 */
//     title?: string;
//     /* assets/icons */
//     icon?: string;
//     /* 排序 */
//     sort?: number
//     /* 是否缓存 */
//     isCache?: Boolean
//     /* 是否在菜单栏隐藏, 例如详情页 */
//     hideInMenu?: boolean
//     /* 总是显示在二级菜单，哪怕二级菜单只有一条 */
//     alwayShowChildInMenu?: boolean
//     /* 为true时，不会出现在标签栏中 */
//     hideInTags?: Boolean
//     /* 为true时， 一直显示在标签栏中 */
//     affixInTags?: Boolean,
//     /* 子路由 */
//     children?: Array<RoutesItemType>
// }

import { RouteMeta } from 'vue-router'

export type MenuItemType = RouteMeta & {
  /* 路由名称, 路由匹配将会根据name来匹配 */
  name?: string
  /* 路由路径 */
  path: string
  /* 路由重定向 */
  redirect?: string
  /* 子路由 */
  children?: Array<MenuItemType>
}

export type MenusType = Array<MenuItemType>

export default [
  {
    name: 'Home',
    path: '/home',
    title: '首页',
    icon: 'home',
    sort: 1,
    isCache: false,
    hideInMenu: false,
    alwayShowChildInMenu: false,
    hideInTags: false,
    affixInTags: true,
  },
  {
    name: 'Row',
    path: '/row',
    title: '响应式布局',
    icon: 'home',
    sort: 5,
    isCache: false,
    hideInMenu: false,
    alwayShowChildInMenu: false,
    hideInTags: false,
    affixInTags: false,
  },
  {
    name: 'Form',
    path: '/form',
    redirect: '/form/edit-form',
    title: '表单',
    icon: 'form',
    sort: 3,
    isCache: false,
    hideInMenu: false,
    alwayShowChildInMenu: false,
    hideInTags: false,
    affixInTags: false,
    children: [
      {
        name: 'EditForm',
        path: 'edit-form',
        title: '编辑表单',
        icon: 'form',
        sort: 1,
        isCache: true,
        hideInMenu: false,
        alwayShowChildInMenu: false,
        hideInTags: false,
        affixInTags: false,
      },
      {
        name: 'FilterForm',
        path: 'filter-form',
        title: '搜索表单',
        icon: 'form',
        sort: 2,
        isCache: false,
        hideInMenu: false,
        alwayShowChildInMenu: false,
        hideInTags: false,
        affixInTags: false,
      },
      {
        name: 'EditFormModal',
        path: 'edit-form-modal',
        title: '编辑表单模态框',
        icon: 'form',
        sort: 3,
        isCache: false,
        hideInMenu: false,
        alwayShowChildInMenu: false,
        hideInTags: false,
        affixInTags: false,
      },
      {
        name: 'FilterSearchModal',
        path: 'filter-search-modal',
        title: '搜索表单模态框',
        icon: 'form',
        sort: 4,
        isCache: false,
        hideInMenu: false,
        alwayShowChildInMenu: false,
        hideInTags: false,
        affixInTags: false,
      },
    ],
  },
  {
    name: 'Table',
    path: '/table',
    redirect: '/table/common-table',
    title: '表格',
    icon: 'table',
    sort: 2,
    isCache: false,
    hideInMenu: false,
    alwayShowChildInMenu: false,
    hideInTags: false,
    affixInTags: false,
    children: [
      {
        name: 'CommonTable',
        path: 'common-table',
        title: '普通表格',
        sort: 1,
        isCache: true,
        hideInMenu: false,
        alwayShowChildInMenu: false,
        hideInTags: false,
        affixInTags: false,
      },
      {
        name: 'EditTable',
        path: 'edit-table',
        title: '编辑表格',
        sort: 1,
        isCache: true,
        hideInMenu: false,
        alwayShowChildInMenu: false,
        hideInTags: false,
        affixInTags: false,
      },
      {
        name: 'SpanRowTable',
        path: 'span-row-table',
        title: '跨行表格',
        sort: 1,
        isCache: true,
        hideInMenu: false,
        alwayShowChildInMenu: false,
        hideInTags: false,
        affixInTags: false,
      },
    ],
  },
  {
    name: 'Modal',
    path: '/modal',
    title: 'Modal模态框',
    icon: 'home',
    sort: 6,
    isCache: false,
    hideInMenu: false,
    alwayShowChildInMenu: false,
    hideInTags: false,
    affixInTags: false,
  },
  {
    name: 'System',
    path: '/system',
    title: '系统管理',
    icon: 'home',
    sort: 7,
    children: [
      {
        name: 'Menu',
        path: 'menu',
        title: '菜单管理',
        icon: 'home',
        sort: 1,
      },
    ],
  },
] as MenusType
