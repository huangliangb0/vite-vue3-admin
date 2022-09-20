import { request } from '@/utils/request'

export const getStudentList = (): Promise<Menu.MenuList> => {
  return request({
    url: '/student',
    method: 'get',
  })
}
