import { useRoute /* useRouter */ } from 'vue-router'
import { fetchTopRoutePath } from '@/utils/util'
import { computed } from 'vue'
import { RouteRecordRaw } from 'vue-router'

export default (menus: RouteRecordRaw[]) => {
  const route = useRoute()
  // const router = useRouter()
  // 当前跳转到的路径
  const activePath = computed(() => route.path)

  // 第一级路由的路径
  const activeTopPath = computed(() => '/' + fetchTopRoutePath(route.path))

  // 当前一级路由的信息 { path, meta, children }
  const activeRoute = computed(() => {
    return (
      menus.find(item => item.path === activeTopPath.value) ||
      ({} as RouteRecordRaw)
    )
  })

  // 是否显示二级侧边栏
  const isShowChildMenu = computed(() => {
    if (!activeRoute.value) {
      return false
    }
    if (activeRoute.value.meta && activeRoute.value.meta.hideInMenu) {
      return false
    }

    if (!Array.isArray(activeRoute.value.children)) {
      return false
    }
    /**
     * 子级路由菜单列表大于1
     * 或者子级路由菜单等于1并且alwayShowChildInMenu为true
     * 就可以显示
     */
    return (
      (activeRoute.value.children.length === 1 &&
        activeRoute.value?.meta?.alwayShowChildInMenu) ||
      activeRoute.value.children.length > 1
    )
  })

  return {
    activePath,
    activeTopPath,
    activeRoute,
    isShowChildMenu,
  }
}
