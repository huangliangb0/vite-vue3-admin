import { permissionRouteNames } from '@/router'
import { getMenuList, patchMenu } from '@/server/menu'
import { treeData } from '@/utils/util'
import { defineStore } from 'pinia'

interface State {
  permissionRouteNames: string[]
  menus: Menu.MenuList
  menusTree: Menu.MenuTree
}

const useMenuStore = defineStore({
  id: 'menu',
  state: (): State => ({
    permissionRouteNames: permissionRouteNames,
    menus: [],
    menusTree: [],
  }),
  getters: {
    usablePermissionRouteNames: (state) => {
      return state.permissionRouteNames.map((name) => ({
        label: name,
        value: name,
        disabled: state.menus
          ? state.menus.some((item) => item.name === name)
          : false,
      }))
    },
  },
  actions: {
    setMenus(menus: Menu.MenuList) {
      this.menus = menus.map((item) => {
        // if (item.parentId === undefined) {
        //   item.path = '/' + item.path.replace('/', '')
        // } else {
        //   item.path = item.path.replace('/', '')
        // }

        return item
      })

      this.menusTree = treeData<Menu.MenuItem>(menus)
    },
    getMenuList() {
      return getMenuList().then((res) => {
        this.setMenus(res)
        return res
      })
    },
  },
})

export default useMenuStore
