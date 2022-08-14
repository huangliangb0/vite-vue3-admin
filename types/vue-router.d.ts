export {}

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    /* 路由重定向 */
    redirect?: string

    /* 路由标题 */
    title?: string

    /* assets/icons */
    icon?: string

    /* 排序 */
    sort?: number

    /* 是否缓存 */
    isCache?: boolean

    /* 是否在菜单栏隐藏, 例如详情页 */
    hideInMenu?: boolean

    /* 总是显示在二级菜单，哪怕二级菜单只有一条 */
    alwayShowChildInMenu?: boolean

    /* 为true时，不会出现在标签栏中 */
    hideInTags?: boolean

    /* 为true时， 一直显示在标签栏中 */
    affixInTags?: boolean
  }
}
