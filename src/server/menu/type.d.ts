declare namespace Menu {
  interface MenuItem {
    parentId?: string
    id: string
    // 组件key值，从permissionRouteNames取
    componentKey?: permissionRouteNames[number]
    //  路由名称
    name?: string
    // 路径
    path: string
    // 重定向
    redirect?: string
    // 路由标题
    title: string
    // 图标，从svg icons取
    icon?: string
    // 排序，越小越靠前
    sort: number
    // keep-alive缓存
    isCache?: boolean
    // 不会在菜单栏显示
    hideInMenu?: boolean
    // 始终显示子菜单，难怕只有一个子菜单那
    alwayShowChildInMenu?: boolean
    // 在标签栏不会显示
    hideInTags?: boolean
    // 始终固定在标签栏，不可删除
    affixInTags?: boolean

    children?: MenuItem[]
  }
  type MenuList = Array<MenuItem>
  type MenuTree = Array<MenuItem & { children?: Array<MenuItem> }>
}
