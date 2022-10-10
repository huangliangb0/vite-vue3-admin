/*
 * @Description: 路由守卫
 * @Date: 2022-07-19 15:31:45
 * @LastEditTime: 2022-07-19 18:03:29
 * @FilePath: \vite-vue3-admin\src\router\route-guard.ts
 */
import router, { addRoutes } from '.'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import { useStore } from "vuex"
import { getToken } from '@/utils/auth'
import useUserStore from '@/store/modules/user'
import usePermissionStore from '@/store/modules/permission'
import useTagsViewStore from '@/store/modules/tagsView'
import { message } from 'ant-design-vue'
import useMenuStore from '@/store/modules/menu'
import { treeData } from '@/utils/util'

// 白名单
const WhiteList = ['/login']

router.beforeEach(async (to, _from, next) => {
  NProgress.start()
  const token = getToken()
  const userStore = useUserStore()
  const menuStore = useMenuStore()
  const permissionStore = usePermissionStore()
  const TagsStore = useTagsViewStore()
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const userInfo = userStore.userInfo
      if (userInfo) {
        // if (!to.query.t) {
        //   to.query.t = new Date().getTime().toString()
        //   next(to)
        // } else {
        //   next()
        // }
        // to.query.t = new Date().getTime().toString()
        next()
      } else {
        try {
          const res = await userStore.getUserInfo()
          const menus = await menuStore.getMenuList()

          const data = treeData(menus)

          const accessRoutes = await permissionStore.setRoutes(data)

          addRoutes(accessRoutes)

          TagsStore.addAffixTags()

          next({ ...to, replace: true })
        } catch (error) {
          // await store.dispatch('user/resetToken')
          message.error((error as string) || 'Has Error')
          next({
            path: `/login`,
            query: {
              redirect: to.path,
              ...to.query,
              t: new Date().getTime().toString(),
            },
          })
          NProgress.done()
        }
      }
    }
  } else {
    if (WhiteList.includes(to.path)) {
      next()
    } else {
      next({
        path: `/login`,
        query: {
          redirect: to.path,
          ...to.query,
        },
      })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
