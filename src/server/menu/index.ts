import { request } from '@/utils/request'
import { v4 as uuidv4 } from 'uuid'

export const getMenuList = (): Promise<Menu.MenuList> => {
  return request({
    url: '/menus',
    method: 'get',
  })
}

export const createMenu = (data: Omit<Menu.MenuItem, 'id'>) => {
  return request({
    url: '/menus',
    method: 'post',
    data: {
      id: uuidv4(),
      ...data,
    },
  })
}

export const updateMenu = (id: string, data: Omit<Menu.MenuItem, 'id'>) => {
  return request({
    url: '/menus/' + id,
    method: 'put',
    data,
  })
}

export const patchMenu = (
  id: string,
  { prop, value }: { prop: string; value: boolean | string | number },
) => {
  return request({
    url: '/menus/' + id,
    method: 'patch',
    data: {
      [prop]: value,
    },
  })
}

export const deleteMenu = (id: string) => {
  return request({
    url: '/menus/' + id,
    method: 'delete',
  })
}
