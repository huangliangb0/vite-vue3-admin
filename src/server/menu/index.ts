import http from '@/utils/http'
import { v4 as uuidv4 } from 'uuid'

export const getMenuList = () => {
  return http.get<Menu.MenuList>({
    url: '/menus',
  })
}

export const createMenu = (data: Omit<Menu.MenuItem, 'id'>) => {
  return http.post({
    url: '/menus',
    data: {
      id: uuidv4(),
      ...data,
    },
  })
}

export const updateMenu = (id: string, data: Omit<Menu.MenuItem, 'id'>) => {
  return http.put({
    url: '/menus/' + id,
    data,
  })
}

export const patchMenu = (
  id: string,
  { prop, value }: { prop: string; value: boolean | string | number },
) => {
  return http.patch({
    url: '/menus/' + id,
    data: {
      [prop]: value,
    },
  })
}

export const deleteMenu = (id: string) => {
  return http.delete({
    url: '/menus/' + id,
  })
}
