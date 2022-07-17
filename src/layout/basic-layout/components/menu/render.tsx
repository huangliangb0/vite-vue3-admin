
import { useRoute, useRouter } from 'vue-router'
import { isExternal } from '@/utils/validate'
import { RouteRecordRaw, RouteMeta } from 'vue-router'
import { MenuItem, SubMenu } from 'ant-design-vue'

/**
 * 如果子级显示的数量是1，那就不显示子菜单，子菜单当作父级菜单显示
 * 如果子级显示的数量大于1，那就显示子菜单
 * 什么叫子级显示数量，因为子级存在hideInMenu情况，显示数量不一定等于子级数量
 * @param RouteRecordRaw
 * @returns components组件 number子级数量
 */
function showChildren(children: RouteRecordRaw[] | undefined) {
  if (children) {
    const showChildren = children.filter(item => {
      return !(item.meta && item.meta.hideInMenu)
    })
    return {
      components: showChildren,
      number: showChildren.length,
    }
  }
  return {
    number: 0,
    components: null,
  }
}

/**
 * 菜单项渲染
 * @param path 路由路径
 * @param title 路由标题
 * @returns
 */
function renderLink({ path, title, icon }: RouteMeta & { path: string }) {
  const router = useRouter()
  const route = useRoute()
  const jump = (path: string) => {
    if (isExternal(path)) {
      window.open(path, '_blank')
    } else {
      router.push(path)
    }
  }

  return (
    <MenuItem
      index={path}
      key={path}
      onClick={() => jump(path)}
    >
      <route-content icon={icon} title={title} />
    </MenuItem>
  )
}

/**
 * 生成菜单内容
 * @param child 子级路由
 * @param parent 父级路由
 */
export const renderMenuContent = (
  menus: RouteRecordRaw[],
  parent?: RouteRecordRaw,
) => {
  return menus.map(route => {
    return recursive(route, parent)
  })
}

function recursive(route: RouteRecordRaw, parent?: RouteRecordRaw) {
  const { meta, children, path } = route

  const { components, number: showChildrenNumber } = showChildren(children)

  let alwayShowChildInMenu = false

  let _route = parent || route
  if (_route) {
    alwayShowChildInMenu = Boolean(_route.meta?.alwayShowChildInMenu)
  }

  // 如果 hideInMenu 为true，则什么都不显示
  if (meta?.hideInMenu) {
    return null
  }

  if (
    showChildrenNumber > 1 ||
    (showChildrenNumber === 1 && alwayShowChildInMenu)
  ) {
    return (
      <SubMenu
        index={path}
        key={path}
        v-slots={{
          title: () => <route-content icon={meta?.icon} title={meta?.title} />,
        }}
      >
        {children!.map(item => {
          return recursive(item, route)
        })}
      </SubMenu>
    )
  }

  // 如果显示为一，就显示 renderLink
  if (showChildrenNumber === 1) {
    const { meta, path } = components![0]
    // path = _.resolve(child.path, path)
    return renderLink({ path, ...meta! })
  }

  return renderLink({ path, ...meta! })
}
