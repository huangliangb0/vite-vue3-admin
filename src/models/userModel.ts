import { uniqueId } from 'lodash'
import menuList, { MenusType } from './MenusModel'

export enum Role {
  admin = 'admin',
  common = 'common',
}

export type Roles = Array<'admin' | 'common'>

/** @type { name: string, roles: Array<'admin' | 'common'>, token: string } */
export interface UserInfo {
  name: string
  roles: Roles
  token: string
  menuList: MenusType
}

export default {
  name: '超级管理员',
  roles: ['admin'],
  token: uniqueId(),
  menuList: menuList,
} as UserInfo
