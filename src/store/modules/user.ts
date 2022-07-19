/*
 * @Description: 
 * @Date: 2022-07-19 14:17:29
 * @LastEditTime: 2022-07-19 17:29:04
 * @FilePath: \vite-vue3-admin\src\store\modules\user.ts
 */
import { defineStore } from 'pinia'
import { setToken, removeToken } from '@/utils/auth'
import { UserInfo } from '@/models/userModel'
import menuList from '@/models/MenusModel'
import { removeRoutes } from '@/router'

interface State {
  token: string
  userInfo: UserInfo | null
}

const getUserInfo = (): UserInfo => {
  const random = Math.random()
  return {
    name: random > 0.5 ? '超级管理员' : '普通管理员',
    roles: random > 0.5 ? ['admin'] : ['admin'],
    token: 'sldkfhs892347293kfa234slkdh',
    menuList: menuList
  }
}

const login = (form: {
  username: string
  password: string
}): Promise<UserInfo> => {
  console.log(form)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(getUserInfo())
    }, 1000)
  })
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): State => ({
    token: '',
    userInfo: null,
  }),
  actions: {
    // 登录
    login(form: { username: string; password: string }) {
      let that = this
      return login(form).then(res => {
        setToken(res.token)
        that.token = res.token
        return res
      })
    },
    // 获取用户信息
    getUserInfo(): Promise<UserInfo> {
      return new Promise(resolve => {
        const userInfo = getUserInfo()
        this.token = userInfo.token
        this.userInfo = userInfo
        resolve(userInfo)
      })
    },
    // 退出登录
    logout() {
      return new Promise((resolve) => {
        removeToken()
        removeRoutes()
        this.userInfo = null
        // window.location.reload()
        resolve(null)
      })
    },
  },
})
