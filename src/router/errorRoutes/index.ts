import { RouteRecordRaw } from 'vue-router'
import NotFound from '@/views/error/not-found.vue'
import BasicLayout from '@/layout/basic-layout/index.vue'

const errorRoutes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/not-fount',
    meta: {
      title: '页面找不到',
      hideInMenu: true,
      hideInTags: true,
    },
    component: BasicLayout,
    children: [
      {
        path: 'not-fount',
        name: 'NotFound',
        meta: {
          title: '页面找不到',
          hideInMenu: true,
          hideInTags: true,
        },
        component: NotFound,
      },
    ],
  },
]
export default errorRoutes
